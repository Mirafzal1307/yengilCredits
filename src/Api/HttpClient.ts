import { API_URL } from "../constants/ApiConstants";

import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

const accessToken = localStorage.getItem("auth");

// function authHeader() {
//   // return authorization header with basic auth credentials
//   // let user = JSON.parse(localStorage.getItem('auth'));

//   if (user && user.token) {
//       return { Authorization: `Bearer ${user.token}` };
//   } else {
//       return {};
//   }
// }

// let user = JSON.parse()
// let user = JSON.parse(localStorage.getItem("auth") || '{}');
// console.log(user);

// const defaultOptions = {
//   baseURL: baseURL
//   method: 'get',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };

class ApiClient {
  instance: AxiosInstance;
  constructor(baseURL: any) {
    this.instance = axios.create({
      baseURL,
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    this.instance.interceptors.request.use(
      function (config) {
        console.info("AXIOS: request use success --", config);
        config.headers = {
          'Authorization': `Bearer ${accessToken}`
        }
        return config;
      },
      function (error: AxiosError) {
        console.error(
          "AXIOS: request use error --",
          error.message,
          error.response,
          error.stack
        );
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }

  fetch<T>(config: AxiosRequestConfig): AxiosPromise<T> {
    return this.instance({
      ...config,
      headers: {
        ...config.headers,
      },
    });
  }
  get<T>(url: string, params?: any): AxiosPromise<T> {
    return this.fetch<T>({ method: "GET", url, params });
  }

  delete<T>(url: string, data?: any): AxiosPromise<T> {
    return this.fetch<T>({ method: "DELETE", url, data });
  }

  post<T>(url: string, data: any): AxiosPromise<T> {
    return this.fetch<T>({ method: "POST", url, data });
  }

  put<T>(url: string, data: any): AxiosPromise<T> {
    return this.fetch<T>({ method: "PUT", url, data });
  }
}
export default () => new ApiClient(API_URL);
