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
