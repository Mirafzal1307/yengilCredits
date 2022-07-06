import ApiClient from "../HttpClient";

export function postProductOrder(data: any): any {
  return ApiClient().post("/cart/add", data);
}
