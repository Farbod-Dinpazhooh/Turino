import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../utils/cookie";

import api from "../config/api";
import QueryString from "qs";

export const useGetUserData = () => {
  // queryFn باید یک تابع باشد نه Promise
  const queryFn = () => api.get("/user/profile");
  const queryKey = ["user-data"];

  // بررسی وجود توکن برای جلوگیری از خطای 401
  const hasToken =
    typeof window !== "undefined" ? !!getCookie("accessToken") : false;

  return useQuery({
    queryFn,
    queryKey,
    enabled: hasToken, // فقط زمانی که توکن وجود دارد query را اجرا کن
    retry: false, // در صورت خطا دوباره تلاش نکن
    staleTime: 1000 * 60 * 5, // 5 دقیقه
  });
};

// Hook برای گرفتن لیست تورها (مبدا و مقصد)
export const useGetTours = () => {
  const queryFn = () => api.get("/tour");
  const queryKey = ["tours"];

  return useQuery({
    queryFn,
    queryKey,
    staleTime: 1000 * 60 * 10, // 10 دقیقه
  });
};

export const useGetToursByQuery = (query) => {
  // بررسی اینکه query خالی نیست
  const hasQuery = query && Object.keys(query).length > 0;

  // ساخت query string - اگر query خالی است، رشته خالی برگردان
  const queryString = hasQuery ? `?${QueryString.stringify(query)}` : "";

  const url = `/tour${queryString}`;

  const queryFn = () => api.get(url);
  const queryKey = ["tours-by-query", query];

  return useQuery({
    queryFn,
    queryKey,
    enabled: hasQuery, // فقط زمانی که query وجود دارد
    staleTime: 1000 * 60 * 5, // 5 دقیقه
  });
};
