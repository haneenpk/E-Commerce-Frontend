import axios from "axios";

const Axios = axios.create({
  baseURL: `${import.meta.env.VITE_AXIOS_BASE_URL}`,
});

Axios.interceptors.request.use(
  (config) => {
    let jwtToken;
    const pathName = window.location.pathname;

    if (pathName.startsWith("/admin/")) {
      jwtToken = localStorage.getItem("adminJwtToken");
    } else {
      jwtToken = localStorage.getItem("userJwtToken");
    }
    
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;