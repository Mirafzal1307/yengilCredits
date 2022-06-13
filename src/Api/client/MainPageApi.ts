import ApiClient from '../HttpClient';
export function  addProductToCart(data: any) {
    return ApiClient().post(`/cart/add?id=` , data)
}
export function  addMoreProductToCart(data: object = {}) {
    return ApiClient().post(`/cart/add-more`, data)
}
export function  confirmCart(data: object = {}) {
    return ApiClient().post(`/cart/confirm`, data)
}
export function  deleteProductsFromCart(id: number) {
    return ApiClient().delete(`/cart/delete`, id)
}
export function  updateCart(data: object = {}) {
    return ApiClient().put(`/cart/add`, data)
}
export function searchProduct(param: string | undefined) {
    return ApiClient().get(`/product/search?param=${param}`);
}