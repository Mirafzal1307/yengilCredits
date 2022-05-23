import ApiClient from "../HttpClient";

export function createBrandData(data: Object) {
  return ApiClient().post(`/brand/admin/create`, data);
}

export function getAllBrandData(data: object = {}) {
  return ApiClient().get(`/brand/get`, data);
}

export function  getBrand(id: any) {
  return ApiClient().get(`/brand/admin/edit-page/${id}`);
}

export function updateBrandData(id: any, data: any) {
  return ApiClient().put(`/brand/admin/edit/${id}`, data);
}

export function deleteBrandData(id: any) {
  return ApiClient().delete(`/brand/admin/delete/${id}`);
}
