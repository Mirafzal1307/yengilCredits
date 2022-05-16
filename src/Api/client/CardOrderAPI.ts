import ApiClient from '../HttpClient'

export function postProductOrder(data: any) {
    return ApiClient().post(`/cart/add` , data)
}