"use client";

import api from "../config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "../utils/cookie";

// ارسال کد OTP به شماره موبایل
export const useSentOtp = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post("/auth/send-otp", data);

  return useMutation({ mutationFn });
};

// بررسی کد OTP
export const useCheckOtp = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post("/auth/check-otp", data);

  const onSuccess = (data) => {
    setCookie("accessToken", data?.data?.accessToken, 30);
    setCookie("refreshToken", data?.data?.refreshToken, 365);
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export const useAddToBasket = () => {
  const mutationFn = (data) => {
    // پشتیبانی از object با tourId یا id، یا string مستقیم
    const tourId = data?.tourId || data?.id || data;

    if (!tourId) {
      return Promise.reject(new Error("شناسه تور یافت نشد"));
    }

    return api.put(`/basket/${tourId}`);
  };

  return useMutation({ mutationFn });
};

// ایجاد سفارش با اطلاعات کاربر
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.post("/order", data);

  const onSuccess = () => {
    // بعد از ایجاد سفارش، سبد خرید را به‌روزرسانی کن
    queryClient.invalidateQueries({ queryKey: ["user-basket"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();

  const mutationFn = (data) => api.put("/user/profile", data);

  const onSuccess = () => {
    // به‌روزرسانی اطلاعات کاربر بعد از ذخیره موفق
    queryClient.invalidateQueries({ queryKey: ["user-data"] });
  };

  return useMutation({ mutationFn, onSuccess });
};
