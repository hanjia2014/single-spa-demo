import axios from "axios";

const get = <T>(url: string) => {
  return axios.get<T>(url);
}

export default {
  get
}