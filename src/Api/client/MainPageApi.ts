import ApiClient from "../HttpClient";

export function addProductToCart(data: any): any {
  return ApiClient().post("/cart/add?id=", data);
}
export function addMoreProductToCart(data: object = {}): any {
  return ApiClient().post("/cart/add-more", data);
}
export function confirmCart(data: object = {}): any {
  return ApiClient().post("/cart/confirm", data);
}
export function deleteProductsFromCart(id: number): any {
  return ApiClient().delete("/cart/delete", id);
}
export function updateCart(data: object = {}): any {
  return ApiClient().put("/cart/add", data);
}
export function searchProduct(param: string | undefined): any {
  return ApiClient().get(`/product/search?param=${param}`);
}
