import axios from "axios";
import { API_URL } from "../../../constants/ApiConstants";

export const postPhone = (phone: any): any => {
  const phones = {
    number: phone.phone,
    name: phone.fullName,
  };
  const res = axios.post(`${API_URL}/sms/generate`, phones);
};
