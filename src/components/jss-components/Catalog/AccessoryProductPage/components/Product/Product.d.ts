export type ProductCardFieldsProps = {
  ProductSetName?: Field<string>
  ProductCardDescription?: Field<string>
  ProductPageUrl?: Null | String
  ProductData?: Object
  Prices?: Object
  ProductUspList?: Field<string[]>
}

export type ProductCardProps = {
  fields: ProductCardFieldsProps
}
