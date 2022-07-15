import ApiClient from "../HttpClient";

export function createBrandData(data: any): any {
  return ApiClient().post("/brand/admin/create", data);
}
export function getAllBrandData(data: object = {}): any {
  return ApiClient().get("/brand/get", data);
}
export function getBrand(id: any): any {
  return ApiClient().get(`/brand/admin/edit-page/${id}`);
}
export function updateBrandData(id: any, data: any): any {
  return ApiClient().put(`/brand/admin/edit/${id}`, data);
}
export function deleteBrandData(id: any): any {
  return ApiClient().delete(`/brand/admin/delete/${id}`);
}
