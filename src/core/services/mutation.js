"use client";

import { useMutation } from "@tanstack/react-query";

import api from "../config/api";
import { setCookie } from "../utils/cookie";

export const useSentOtp = () => {
  const mutationFn = (data) => {
    // دیباگ URL نهایی برای رفع 404
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.debug(
        "Sending OTP to:",
        `${api?.defaults?.baseURL || ""}/auth/send-otp`
      );
    }
    return api.post("/auth/send-otp", data);
  };

  return useMutation({ mutationFn });
};

// **
export const useCheckOtp = () => {
  const mutationFn = (data) => api.post("/auth/check-otp", data);

  const onSuccess = (data) => {
    setCookie("accessToken", data?.data?.accessToken, 30);
    setCookie("refreshToken", data?.data?.refreshToken, 365);
  };

  return useMutation({ mutationFn, onSuccess });
};
