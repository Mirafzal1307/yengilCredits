import ApiClient from "../HttpClient";

export function getProductList(page: string, data: object = {}): any {
  return ApiClient().get(`/product/admin/list?page=${page}`, data);
}
export function getProductItem(id: string): any {
  return ApiClient().get(`/product/by-id/${id}`);
}
export function getProductSearch(name: string, data: object = {}): any {
  return ApiClient().get(`/product/search?param=${name}`, data);
}
export function getProductCreate(data: object = {}): any {
  return ApiClient().get("/product/admin/create-page", data);
}
export function getProductById(id: any): any {
  return ApiClient().get(`/product/admin/edit-product-page/${id}`);
}
export function updateProduct(id: number, data: object = {}): any {
  return ApiClient().get(`/product/admin/edit-param/${id}`, data);
}
export function postProductCreate(data: object): any {
  return ApiClient().post("/product/admin/create", data);
}
export function putProductEdit(id: any, data: any): any {
  return ApiClient().put(`/product/admin/edit-param/${id}`, data);
}
export function deleteProductItem(id: any): any {
  return ApiClient().delete(`/product/admin/delete/${id}`);
}
