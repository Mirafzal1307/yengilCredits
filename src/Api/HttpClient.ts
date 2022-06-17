import { API_URL } from "../constants/ApiConstants";

import axios, { AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

class ApiClient {
  instance: AxiosInstance;
  user: any;
  constructor(baseURL: any) {
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('auth') || '{}'));
    this.instance = axios.create({
      baseURL,
      headers: {
        "Authorization": `Bearer ${this.user}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

      }});
      this.instance.interceptors.response.use(
        (config) => {
          console.log( "--- Axios: request use success ---" , config);
          
          return config;
        },
        (error) => {
          console.log( "--- Axios: request use error ---" , error);
          return Promise.reject(error);
        }
      );
      this.instance.interceptors.request.use(
        (response) => {}
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
export default () =>
  new ApiClient(API_URL)
