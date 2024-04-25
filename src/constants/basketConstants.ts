export default {
  BASKET: 'basket',
  API: {
    // TODO: Get site context from the api
    ADD_PRODUCTS: '/api/checkout/addproducts?sc_site={SHOPNAME}',
    APPLY_VOUCHER: '/api/checkout/applyvoucher?sc_site={SHOPNAME}',
    DELETE_VOUCHER: '/api/checkout/deletevoucher?sc_site={SHOPNAME}&basketId={BASKET_ID}',
    GET_BASKET: '/api/checkout/getBasket?sc_site={SHOPNAME}&basketId={BASKET_ID}',
    UPDATE_PRODUCT_QUANTITY: '/api/checkout/updateProductQuantity?sc_site={SHOPNAME}&basketId={BASKET_ID}',
    DELETE_BASKET: '/api/checkout/deleteBasket?sc_site={SHOPNAME}&basketId={BASKET_ID}',
    SAVE_ADDRESSES: '/api/address/saveAddresses?sc_site={SHOPNAME}'
  }
}
