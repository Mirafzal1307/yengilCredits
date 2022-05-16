import ApiClient from '../HttpClient';

export function  getProductCards() {
    return ApiClient().get(`/main/`)
}

export function getAllCards(id: any, page: any) {
    return ApiClient().get(`/main/products/more/${id}?page=${page}`)
}