import { ComponentRendering, Field } from '@sitecore-jss/sitecore-jss-vue'
import { LinkField } from '@sitecore-jss/sitecore-jss-vue/types/components/Link'
import ProductOverview from '../ProductOverview/ProductOverview.vue'

export type BasketPageProps = {
  fields: {
    PageTitle: Field<string>
    ContinueShoppingLink: LinkField
    BasketEmptyText: Field<string>
  }
  rendering: ComponentRendering
}

export type ComponentNamesConfigProps = {
  ProductOverview: {
    props: {
      productItems: Array<LineItemsProps> | []
    }
    component: ProductOverview
  }
}

export type BasketDataApi = {
  BasketContent: {
    LineItems: LineItemsProps
  }
}

export type LineItemsProps = Array<ProductLineItem>

type ProductLineItem = {
  ProductId: string
  Color: string
  ProductImageSet: ProductImageSetProps
  Quantity: number
  DeliveryTime: number
  Plant: string
  InboundLeadTime: number
  Currency: string
  UnitPrice: UnitPriceProps
  SumPrice: SumPriceProps
  VatPercentage: number
  AdditionalFee: number
  AdditionalFeeId: string
  AdditionalFee: number
  AdditionalFeeId: string
  Messages: Array<PicassoMessageProps>
  Size: string
  Type: string
  Variant: string
  LineId: string
  Name: string
  Attributes: Array<ProductAttributesProps>
  Group: string
  Category: string
  MaterialGroup: string
  Operation: string
  Pane: string
  Generation: string
  FamilyId: string
  Vce: string
  Ean: string
  ListColor: string
}

export type PicassoMessageProps = {
  readonly Id?: string
  readonly Name?: string
  readonly Description?: string
  readonly IsActive?: boolean
}

export type ProductAttributesProps = {
  readonly Label: string
  readonly Value: string
}

export type SumPriceProps = {
  PriceWithVat: number
  PriceExVat: number
  PriceVat: number
  DiscountedPriceWithVat: number
  DiscountedPriceExVat: number
  HasDiscount: false
}

export type UnitPriceProps = {
  PriceWithVat: number
  PriceExVat: number
  PriceVat: number
  DiscountedPriceWithVat: number
  DiscountedPriceExVat: number
  HasDiscount: boolean
}

export type ProductImageSetProps = {
  ProductId: string
  InsideViewUrl: string
}
