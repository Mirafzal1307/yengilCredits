import ApiClient from "../HttpClient";

export function getToken(data: any): any {
  return ApiClient().post("/security/login", data);
}
export function getRefreshToken(data: any): any {
  console.log(data, "data------------------------------->>");
  return ApiClient().post(
    `/security/login/refresh?refresh_token=${data.refreshToken}`,
    data,
  );
}
