export function calculatePrice(productPrices, basketStore) {
  if (!productPrices) return 0

  if (productPrices?.HasDiscount) {
    return basketStore?.showPricesWithVat
      ? productPrices?.DiscountedPrice?.PriceWithVat
      : productPrices?.DiscountedPrice?.PriceExVat || 0
  }
  return basketStore?.showPricesWithVat
    ? productPrices?.Price?.PriceWithVat
    : productPrices?.Price?.PriceExVat || 0
}
