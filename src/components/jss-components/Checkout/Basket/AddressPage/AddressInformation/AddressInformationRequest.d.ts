export type AddressProps = {
  FirstName: string
  LastName: string
  Co: string
  Title: string
  Telephone: string
  Cellphone: string
  Password: string
  Email: string
  Email2: string
  HouseNumber: string
  ZipCode: string
  Street1: string
  Street2: string
  Street3: string
  Street4: string
  City: string
  County: string
  Country: string
  Company: string
  Tax1: string
  Tax2: string
  Tax4: string
  PECEmail: string
  TelephonePrefix: string
  CellPhonePrefix: string
  Vat: string
  IsPickup: boolean
  YourProjectReference: string
  LongDeliveryInstruction: string
  LegalForm: string
}

export type Address = {
  basketId: string
  billingAddress: AddressProps
  deliveryAddress: AddressProps
}
