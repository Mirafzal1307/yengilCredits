import ApiClient from "../HttpClient";
export function getToken(data: any) {
  return ApiClient().post('/security/login', data)
}