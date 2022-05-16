
import ApiClient from '../HttpClient'

export function  getCategoryList(page: string, data: object = {}) {
    return ApiClient().get(`/category/admin/list?parent=true&page=${page}`, data)
}
export function  getCategoryListCreate(data: object = {}) {
    return ApiClient().get(`/category/admin/create-page`, data)
}

export function getCategoryByParentCategory(id: any) {
    return ApiClient().get(`/category/by-id/${id}`)
}
export function getCategorySearch(name: string, data: object = {}) {
    return ApiClient().get(`/category/admin/search/?name=${name}`, data)
}

export function getCategoryItem(id: string) {
    return ApiClient().get(`/categories/${id}`)
}

export function getCategoryById(id: any){
    return ApiClient().get(`/category/admin/edit-page/${id}`)
}

export function postCategoryCreate(data: object) {
    return ApiClient().post(`/category/admin/create`, data)
}

export function putCategoryEdit(id: any, data: any) {
    return ApiClient().put(`/category/admin/edit/${id}`, data)
}

export function deleteCategoryItem(id: string) {
    return ApiClient().delete(`/category/admin/delete/${id}`)
}