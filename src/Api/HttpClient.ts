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



// let accessToken = localStorage.getItem('auth')
// console.log(user);



// console.log(`------${accessToken}`)
class ApiClient {
  instance: AxiosInstance;
  user: any;
  constructor(baseURL: any) {
    this.user = JSON.parse(JSON.stringify(localStorage.getItem('auth') || '{}'));
    // const token = this.user;
    console.log(this.user);
    
    this.instance = axios.create({
      baseURL,
      headers: {
        "Authorization": `Bearer ${this.user}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

      }
  });
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
