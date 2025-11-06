import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const normalizeBaseUrl = (url) =>
  typeof url === "string" ? url.replace(/\/$/, "") : url;

let BASE_URL = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL);

if (!BASE_URL) {
  // پیش‌فرض پایدار برای توسعه
  BASE_URL = "http://localhost:6500";
  // eslint-disable-next-line no-console
  console.warn(
    "NEXT_PUBLIC_BASE_URL تنظیم نشده؛ مقدار پیش‌فرض استفاده شد:",
    BASE_URL
  );
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config || {};

    const status = error?.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await getNewToken();

      if (res?.status === 200) {
        setCookie("accessToken", res?.data?.accessToken, 30);
        return api(originalRequest);
      } else {
        setCookie("accessToken", "", 0);
        setCookie("refreshToken", "", 0);
      }
    }
    return Promise.reject(
      error?.response?.data || { message: error?.message || "خطای نامشخص" }
    );
  }
);

export default api;

const getNewToken = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;

  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });
    return response;
  } catch (error) {
    return error?.response || error;
  }
};
