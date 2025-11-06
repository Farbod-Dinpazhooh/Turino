"use client";

import { useState } from "react";

import { toast } from "react-hot-toast";

import { isValidMobile } from "@/core/utils/validation";
import { useSentOtp } from "@/core/services/mutation";

import styles from "./sendOTPForm.module.css";

function SendOTPForm({ setStep, mobile, setMobile, setSecondsLeft }) {
  const [error, setError] = useState("");

  const { isPending, mutate } = useSentOtp();

  const submitHandler = (event) => {
    event.preventDefault();

    if (isPending) return;

    if (!isValidMobile(mobile)) return setError("شماره معتبر وارد کنید");
    setError("");

    mutate(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message);
          const rawCode = data?.data?.code;
          const fiveDigit = rawCode != null ? String(rawCode).slice(0, 5) : "";
          if (fiveDigit) toast(fiveDigit);
          if (typeof setSecondsLeft === "function") setSecondsLeft(120);
          setStep(2);
        },
        onError: (error) => {
          const message =
            error?.data?.message ||
            error?.message ||
            error?.error ||
            "ارسال کد ناموفق بود";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <h4>ورود به تورینو</h4>
      <form onSubmit={submitHandler} className={styles.form}>
        <label>شماره موبایل خود را وارد کنید</label>
        <input
          type="text"
          placeholder="09120000000"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {!!error && <p className={styles.error_message}>{error}</p>}
        <button disabled={isPending} className={styles.send_code} type="submit">
          {isPending ? "در حال ارسال پیامک کد تایید" : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
