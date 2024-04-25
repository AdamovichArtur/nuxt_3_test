import countryToCurrency from 'country-to-currency'

/**
 * Returns the currency code for the given locale.
 * @param locale The locale to get the currency code for.
 * @returns The currency code for the given locale.
 */
function getCurrencyFromLocale(locale: string): string {
  let country: string
  const localeParts: string[] = locale.split('-')
  if (locale === 'en') country = 'US'
  else country = localeParts[1] || localeParts[0]?.toUpperCase()
  return countryToCurrency[country]
}

/**
 * Returns the currency format for the given locale.
 * @param locale The locale to get the currency format for.
 * @returns The currency format for the given locale.
 */
export function currencyFormat(locale: string) {
  return {
    currency: {
      style: 'currency',
      currency: getCurrencyFromLocale(locale)
    }
  }
}
