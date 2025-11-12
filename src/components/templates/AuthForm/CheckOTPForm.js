"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react18-input-otp";

import styles from "./CheckOTPForm.module.css";

import { useCheckOtp } from "@/core/services/mutation";

function CheckOTPForm({
  mobile,
  setStep,
  setIsOpen,
  secondsLeft = 0,
  onResend,
}) {
  const [code, setCode] = useState("");

  const { isPending, mutate } = useCheckOtp();

  const handleChange = (otp) => setCode(otp); //one-time-password

  const submitHandler = (event) => {
    event.preventDefault();

    if (isPending) return;
    // TODO: Backend کد 6 رقمی را چک می‌کند
    if (code.length !== 6) return toast.error("کد تایید باید ۶ رقمی باشد");

    mutate(
      { mobile, code },
      {
        onSuccess: () => {
          // بستن مودال و بازگشت به مرحله اول
          setStep(1);
          setIsOpen(false);
          toast.success("ورود موفق! خوش آمدید");
        },
        onError: (error) => {
          const message =
            error?.response?.data?.message ||
            error?.data?.message ||
            error?.message ||
            error?.error ||
            "کد تایید نامعتبر است";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <h4>کد تایید را وارد کنید</h4>
      <form onSubmit={submitHandler} className={styles.form}>
        <label>کد تایید به شماره موبایل {mobile} ارسال شد</label>
        <div className={styles.otp_wrapper}>
          <OtpInput
            className={styles.input}
            value={code}
            onChange={handleChange}
            numInputs={6} // TODO: Backend کد 6 رقمی را چک می‌کند
            inputStyle={{
              border: "1px solid rgba(0,0,0,0.25)",
              borderRadius: "6px",
              width: "50px",
              height: "45px",
              margin: "0 3px",
            }}
          />
        </div>
        <p className={styles.timer}>
          {secondsLeft > 0 ? (
            `${Math.floor(secondsLeft / 60)}:${String(
              secondsLeft % 60
            ).padStart(2, "0")} ثانیه تا ارسال کد مجدد`
          ) : (
            <button
              type="button"
              className={styles.resend_btn}
              onClick={onResend}
            >
              ارسال کد مجدد
            </button>
          )}
        </p>
        <button disabled={isPending} type="submit" className={styles.enter}>
          {isPending ? "در حال اعتبار سنجی" : "ورود به تورینو"}
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
