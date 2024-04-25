import { ProductAttributesProps, PicassoMessageProps } from '../../../BasketPage/BasketPage.d'

export type ProductOverviewItemProps = {
  readonly productTitle: string
  readonly productId: string
  readonly productLineId: string
  readonly productImage: string
  productQuantity: number
  readonly productSubtotal: ProductSubtotal
  readonly productAttributes: Array<ProductAttributesProps>
  readonly productAdditionalFee?: number
  readonly productAdditionalFeeLabel?: string
  readonly productPicassoMessages?: Array<PicassoMessageProps>
  readonly showColumnTitles: boolean
  readonly isFirstItem: boolean
}

type ProductSubtotal = {
  subtotalProductPrice: number | null
  subtotalProductPriceWithoutDiscount: number | null
}
