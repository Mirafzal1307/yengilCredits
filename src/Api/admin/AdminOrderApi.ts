import ApiClient from "../HttpClient";

export function getProductList(data: object = {}): any {
  return ApiClient().get("/cart/get", data);
}
export function getAllOrders(page: any, data: object = {}): any {
  return ApiClient().get(`/admin/all/?page=${page}`, data);
}
export function getStatuses(data: object = {}): any {
  return ApiClient().get("/status/admin/get", data);
}
export function getBuyerData(buyerId: any): any {
  return ApiClient().get(`/admin/by-buyer-id?buyer_id=${buyerId}`);
}
export function editOrderStatus(data: any): any {
  return ApiClient().put("/admin/update-status", data);
}
export function searchUsers(data: any): any {
  return ApiClient().get(`/admin/search?param=${data}`);
}
