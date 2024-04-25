import BASKET from '@/constants/basketConstants'

import { dataFetcher } from '@/dataFetcher'
import { deleteCookie, getBasketCookie, setCookie } from '@/utils/composables/cookieManager'
import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/GlobalStore'
import { replaceTokensInString } from '@/utils/stringUtils'
import { VoucherResponse } from '@/components/jss-components/Checkout/Basket/Voucher/Voucher.d'

export const useBasketStore = defineStore('BasketStore', {
  state: () => ({
    basketPageUrl: '/basket',
    hasBasket: false,
    basket: {
      items: [],
      basketSize: null,
      basketTotalVat: null,
      basketTotalExVat: null,
      totalAdditionalFee: null,
      basketPriceConfig: {},
      expectedDeliveryTime: '',
      basketRestrictions: [],
      defaultMessage: null
    },
    showPricesWithVat: true,
    isLoading: false
  }),
  getters: {
    basketSize(): number {
      return this.basket.basketSize ?? this.basketSizeFromCookie ?? 0
    },
    basketTotal(): number {
      return this.basketTotalFromState ?? this.basketTotalFromCookie ?? 0
    },
    basketSizeFromCookie(): number {
      const basket = getBasketCookie(BASKET.BASKET)
      return basket?.basketSize ?? null
    },
    basketTotalFromState(): number| null {
      return this.showPricesWithVat
        ? this.basket?.basketTotalVat ?? null
        : this.basket?.basketTotalExVat ?? null
    },
    basketTotalFromCookie(): number {
      const basket = getBasketCookie(BASKET.BASKET)
      return this.showPricesWithVat ? basket?.priceWithVat ?? null : basket?.priceExVat ?? null
    },
    basketId(): string {
      const basket = getBasketCookie(BASKET.BASKET)
      return basket?.basketId ?? null
    },
    getBasketFee(): number {
      return this.basket?.totalAdditionalFee ?? 0
    }
  },
  actions: {
    setLoading(state: Boolean) {
      this.isLoading = state
    },
    addToBasket(productId: string) {
      return new Promise((resolve) => {
        const basket = getBasketCookie(BASKET.BASKET)
        const basketId = basket?.basketId ?? null
        const productLines = [
          {
            productIds: [productId],
            quantity: 1
          }
        ]
        const requestData = { basketId, productLines }
        this.isLoading = true
        const globalStore = useGlobalStore()

        const tokens = {
          SHOPNAME: globalStore.siteName
        }

        const requestUrl = replaceTokensInString(BASKET.API.ADD_PRODUCTS, tokens)

        dataFetcher<string>(requestUrl, requestData)
          .then((response) => {
            this.updateBasketState(response)
            resolve(true)
          })
          .catch((error) => {
            console.error('Error:', error)
            resolve(false)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    updateBasketState(data: any) {
      this.setBasketPageUrl(data.Core.BasketPage.Url)

      if (data.BasketContent != null) {
        const priceVat = this.getPrice(
          data.BasketContent.ProductsPrice.HasDiscount,
          data.BasketContent.ProductsPrice.PriceWithVat,
          data.BasketContent.ProductsPrice.DiscountedPriceWithVat
        )

        const priceExVat = this.getPrice(
          data.BasketContent.ProductsPrice.HasDiscount,
          data.BasketContent.ProductsPrice.PriceExVat,
          data.BasketContent.ProductsPrice.DiscountedPriceExVat
        )

        this.setBasketCookies(
          data.Core.BasketId,
          data.BasketContent.ItemsCount,
          priceVat,
          priceExVat
        )

        this.setBasketItems(
          data.BasketContent.LineItems,
          data.BasketContent.ItemsCount,
          priceVat,
          priceExVat,
          data.BasketContent.TotalAdditionalFee,
          {
            TotalDeliveryFee: data.BasketContent.TotalDeliveryFee,
            TotalPrice: data.BasketContent.TotalPrice,
            AdditionalFeeGeneralLabel: data.BasketContent.AdditionalFeeGeneralLabel,
            ProductsPrice: data.BasketContent.ProductsPrice
          },
          data.BasketContent.ExpectedDeliveryTime
        )

        this.setBasketRestrictions(
          data.BasketContent.Restrictions,
          data.BasketContent.Settings.DefaultMessage
        )
      }

      if (data.Voucher != null) {
        this.setVoucherData(data.Voucher)
      }
    },
    getPrice(hasDiscount: boolean, price: number, priceWithDiscount: number) {
      return hasDiscount ? priceWithDiscount : price
    },
    setBasketItems(
      lineItems: any[],
      basketSize: number,
      basketTotalVat: number,
      basketTotalExVat: number,
      totalAdditionalFee: number,
      basketPriceConfig: Object,
      expectedDeliveryTime: string
    ) {
      this.basket.items = []
      this.basket.items.push(...lineItems)
      this.basket.basketSize = basketSize
      this.basket.basketTotalVat = basketTotalVat
      this.basket.basketTotalExVat = basketTotalExVat
      this.basket.totalAdditionalFee = totalAdditionalFee
      this.basket.basketPriceConfig = { ...this.basket.basketPriceConfig, ...basketPriceConfig }
      this.basket.expectedDeliveryTime = expectedDeliveryTime
      this.hasBasket = true
    },
    setVoucherData(data: any) {
      this.basket.voucher = data
    },
    setVoucherValidationRule(data: any) {
      this.basket.voucher = { ...this.basket.voucher, ...data }
    },
    setBasketRestrictions(data: any, defaultMessage: any) {
      this.basket.basketRestrictions = data
      this.basket.basketRestrictionsDefaultMessage = defaultMessage
    },
    setBasketCookies(
      basketId: string,
      basketSize: number,
      priceWithVat: number,
      priceExVat: number
    ) {
      const basketData = {
        basketId,
        basketSize,
        priceWithVat,
        priceExVat
      }
      setCookie(BASKET.BASKET, JSON.stringify(basketData))
    },
    clearBasket() {
      this.basket.items = []
      this.basket.basketSize = 0
      this.hasBasket = false
      deleteCookie(BASKET.BASKET)
    },
    setBasketPageUrl(url: string) {
      this.basketPageUrl = url
    },
    getBasketPageUrl() {
      return this.basketPageUrl
    },
    setShowPricesWithVat(enabled: boolean) {
      this.showPricesWithVat = enabled
    },
    async processingVoucher({ data, apiUrl, isDeleteMethod }) {
      const basket = getBasketCookie(BASKET.BASKET)
      const basketId = basket?.basketId ?? null

      if (basketId === null) {
        return
      }

      const globalStore = useGlobalStore()

      const tokens = {
        SHOPNAME: globalStore.siteName,
        BASKET_ID: basketId
      }

      const requestUrl = replaceTokensInString(apiUrl, tokens)
      const requestData = { basketId, ...data }

      this.isLoading = true
      try {
        const response = await dataFetcher(requestUrl, requestData, '', isDeleteMethod)

        this.updateBasketState(response)
        return response.Voucher as VoucherResponse
      } catch (error) {
        console.log('Processing Voucher Request:', error)
      } finally {
        this.isLoading = false
      }
    },
    applyVoucher(voucherCode: string) {
      this.processingVoucher({ data: { voucherCode }, apiUrl: BASKET.API.APPLY_VOUCHER })
    },
    deleteVoucher() {
      this.processingVoucher({ apiUrl: BASKET.API.DELETE_VOUCHER, isDeleteMethod: true })
    }
  }
})
