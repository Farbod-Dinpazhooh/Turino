import { useQuery } from "@tanstack/react-query";
import { getCookie } from "../utils/cookie";

import api from "../config/api";

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
