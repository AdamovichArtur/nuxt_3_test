import { ProductAttributesProps } from '../BasketPage/BasketPage.d'

export type ProductOverviewInfoProps = {
  readonly productTitle: string
  readonly productId: string
  readonly productAttributes?: Array<ProductAttributesProps>
  readonly productPicassoMessage?: Array<string>
}
