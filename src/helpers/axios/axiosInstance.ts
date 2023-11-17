import { baseApi } from "@/config/api";
import { authKey } from "@/constants/storageKey";
import { getNewAccessToken, removeUserInfo } from "@/services/auth.service";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: baseApi,
  timeout: 60000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // access token
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  async function (error) {
    const config = error?.config;
    if (error?.response?.data?.message === "jwt malformed") {
      removeUserInfo(authKey);
    }
    if (error?.response?.data?.message === "jwt expired") {
      removeUserInfo(authKey);
    }

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const response = await getNewAccessToken();
      const accessToken = response?.data?.data?.accessToken;

      config.headers.Authorization = accessToken;
      Cookies.set(authKey, accessToken);
      setToLocalStorage(authKey, accessToken);

      return axiosInstance(config);
    } else {
      return error?.response?.data;
    }
  }
);
axiosInstance.interceptors.response.use(
  function (config) {
    // access token
    return config;
  },
  async function (error) {
    if (error?.response?.data?.message === "jwt malformed") {
      removeUserInfo(authKey);
    }
    if (error?.response?.data?.message === "jwt expired") {
      removeUserInfo(authKey);
    }
    const config = error?.config;
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const response = await getNewAccessToken();
      const accessToken = response?.data?.data?.accessToken;

      config.headers.Authorization = accessToken;
      setToLocalStorage(authKey, accessToken);

      return axiosInstance(config);
    } else {
      return error?.response?.data;
    }
  }
);

export default axiosInstance;
