import axios from "axios";
import Cookies from "js-cookie";

// custom Axios instance with default settings
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // API base URL
});

// function to get the token from the cookie
const getToken = () => {
  const cookieValue = Cookies.get("token");
  return cookieValue;
  
};

// interceptor to the custom Axios instance
axiosClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
