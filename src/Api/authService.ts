import React from "react";
import TokenService from "./tokenService";
import { getToken, getRefreshToken } from "./admin/AdminAuth";

class AuthService {
  login(username: any, password: any): any {
    const data = {
      username,
      password,
    };
    console.log(data, "data-->>");
    return getToken(data).then((response: any) => {
      console.log(response, "response-->>");
      if (response.data.accessToken) {
        TokenService.setAdmin(response.data);
      }
      return response;
    });
  }

  getrefreshToken(data: any): any {
    console.log(data.refreshToken, "data------------------------------->>");
    // debugger;
    return getRefreshToken(data);
  }

  logout(): any {
    TokenService.removeAdmin();
  }
}

export default new AuthService();
