import ApiClient from "../HttpClient";
export function getProductList(data: object = {}) {
  return ApiClient().get(`/cart/get`, data);
}
export function getAllOrders(page: any, data: object = {}) {
  return ApiClient().get(`/admin/all/?page=${page}`, data);
}
export function getStatuses(data: object = {}) {
  return ApiClient().get(`/status/admin/get`, data);
}
export function getBuyerData(buyer_id: any) {
  return ApiClient().get(`/admin/by-buyer-id?buyer_id=${buyer_id}`);
}
export function editOrderStatus(data: any) {
  return ApiClient().put(`/admin/update-status`, data);
}
export function searchUsers(data: any) {
  return ApiClient().get(`/admin/search?param=${data}`);
}
