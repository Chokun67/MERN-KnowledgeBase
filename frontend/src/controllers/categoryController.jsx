import axios from "axios"; // นำเข้า Axios library

const API_URL = "http://localhost:5555";

export const categoryAPI = {
  getAll_category: () => {
    const apiUrl = `${API_URL}/category`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.get(apiUrl, headers);
  },
  getById_category: (id) => {
    const apiUrl = `${API_URL}/category/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.get(apiUrl, headers);
  },
  delete_category: (id) => {
    const apiUrl = `${API_URL}/category/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.delete(apiUrl, headers);
  },
  add_category: (data) => {
    const apiUrl = `${API_URL}/category`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(apiUrl,{ category_name: data },headers);
  },
  edit_category: (id,data) => {
    const apiUrl = `${API_URL}/category/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(apiUrl,{ category_name: data },headers);
  },
  
};