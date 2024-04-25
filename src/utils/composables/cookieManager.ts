
const maxAge = 604800 // 7 days

interface Basket {
  basketId: string
  basketSize: number
  priceWithVat: number
  priceExVat: number
}

export const setCookie = (key: string, value: any): void => {
  const cookies = useCookie(key, { maxAge: maxAge, path: '/' })
  cookies.value = value

}

export const getCookie = (key: string): any => {
  const cookies = useCookie(key)

  return cookies.value
}

export const getBasketCookie = (key: string): any => {
  const basketCookie = useCookie(key)
  return basketCookie.value as any
}

export const deleteCookie = (key: string): void => {
  const cookies = useCookie(key)

  cookies.value = null
}
