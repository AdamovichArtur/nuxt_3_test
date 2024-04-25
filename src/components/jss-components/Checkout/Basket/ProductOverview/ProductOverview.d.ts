import {
  ProductImageSetProps,
  SumPriceProps,
  ProductAttributesProps,
  PicassoMessageProps
} from '../BasketPage/BasketPage.d'

import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-vue'

export type ProductOverviewItemProps = {
  fields?: {
    ShowHeaders: Field<boolean>
  }
  rendering: ComponentRendering
}
export type ProductBasketItemsProps = {
  items?: Array<ProductItemProps>
}

export type GroupedProductItemsProps = Record<string, ProductItemProps>

export type ProductApiProps = {
  readonly productLineId: string
  quantity: number
}

type ProductItemProps = {
  readonly Name: string
  readonly LineId: string
  readonly ProductId: string
  readonly ProductImageSet: ProductImageSetProps
  readonly AdditionalFee?: number
  readonly AdditionalFeeId?: string
  readonly Messages: Array<PicassoMessageProps>
  Quantity: number
  SumPrice: SumPriceProps
  readonly Attributes: Array<ProductAttributesProps>
}
