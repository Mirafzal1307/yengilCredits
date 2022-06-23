import ApiClient from "../HttpClient";

export function getProductByBrand(page: any, id: any): any {
  return ApiClient().get(`/product/by-brand/${id}?page=${page}`);
}
