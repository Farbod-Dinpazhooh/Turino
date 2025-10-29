"use client";

import { isValidMobile } from "@/core/utils/validation";
import styles from "./sendOTPForm.module.css";

import { useState } from "react";

function SendOTPForm({ setStep }) {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!isValidMobile(mobile)) return setError("شماره معتبر وارد کنید");
    setError("");
    setStep(2);
  };

  return (
    <div className={styles.container}>
      <h4>ورود به تورینو</h4>
      <form onSubmit={submitHandler} className={styles.form}>
        <lable>شماره موبایل خود را وارد کنید</lable>
        <input
          type="text"
          placeholder="09120000000"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        {!!error && <p className={styles.error_message}>{error}</p>}
        <button className={styles.send_code} type="submit">
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
