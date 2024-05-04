import axios from "axios"; // นำเข้า Axios library

const API_URL = "http://localhost:5555";

export const ruleAPI = {
  getAllType_rule: (categoryValue) => {
    const apiUrl = `${API_URL}/rules?category_id=${categoryValue}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.get(apiUrl, headers);
  },
  add_rule: (data) => {
    const apiUrl = `${API_URL}/rules`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(apiUrl,data,headers);
  },
  edit_rule: (id,data) => {
    const apiUrl = `${API_URL}/rules/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(apiUrl,data ,headers);
  },
  delete_rule: (id) => {
    const apiUrl = `${API_URL}/rules/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.delete(apiUrl, headers);
  },
  
};