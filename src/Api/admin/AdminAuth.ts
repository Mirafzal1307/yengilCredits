import ApiClient from "../HttpClient";

export function getToken(data: any): any {
  return ApiClient().post("/security/login", data);
}
