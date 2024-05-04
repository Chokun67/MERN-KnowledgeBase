import axios from "axios"; // นำเข้า Axios library

const API_URL = "http://localhost:5555";

export const factAPI = {
  loginAPI: async (username, password) => {
    const apiUrl = `${API_URL}/auth/login`;
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      email: username,
      password: password,
    };

    try {
      const response = await axios.post(apiUrl, data, { headers: headers });
      if (!response.status === 200) {
        throw new Error("Login failed");
      }
      return response.data; // หรือสามารถ return response ตรงๆ ก็ได้
    } catch (error) {
      throw new Error(`Login API error: ${error.message}`);
    }
  },
  getAllType_fact: (categoryValue) => {
    const apiUrl = `${API_URL}/facts?category_id=${categoryValue}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.get(apiUrl, headers);
  },
  getById_fact: (id) => {
    const apiUrl = `${API_URL}/facts/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.get(apiUrl, headers);
  },

  add_fact: async (formData) => {
    const apiUrl = `${API_URL}/facts`;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(apiUrl, formData, { headers: headers });

      if (response.status !== 201) {
        throw new Error("Failed to post form data");
      }

      return response.data; // หรือแก้ไขตามการใช้งานต่อไป
    } catch (error) {
      throw new Error(`Post form data error: ${error.message}`);
    }
  },
  edit_fact: (id, data) => {
    const apiUrl = `${API_URL}/facts/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.put(apiUrl, data, headers);
  },
  delete_fact: (id) => {
    const apiUrl = `${API_URL}/facts/${id}`;
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.delete(apiUrl, headers);
  },
};
