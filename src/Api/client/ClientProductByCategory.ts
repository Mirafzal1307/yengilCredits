import ApiClient from '../HttpClient'
export function getProductByCategory(id: any) {
    return ApiClient().get(`/product/product-by-category/${id}`)
}