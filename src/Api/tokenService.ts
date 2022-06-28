class TokenService {
  getLocalRefreshToken(): any {
    const admin = localStorage.getItem("refreshToken");
    return admin;
  }

  getLocalAccessToken(): any {
    return localStorage.getItem("accessToken");
  }

  updateLocalAccessToken(token: any): any {
    localStorage.setItem("accessToken", token);
  }

  setAdmin(admin: any): any {
    localStorage.setItem("accessToken", admin.accessToken);
    localStorage.setItem("refreshToken", admin.refreshToken);
  }

  removeAdmin(): any {
    localStorage.removeItem("admin");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default new TokenService();
