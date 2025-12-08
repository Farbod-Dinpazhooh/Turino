"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSentOtp } from "@/core/services/mutation";
import { useGetUserData } from "@/core/services/queries";
import Link from "next/link";
import Image from "next/image";
import ModalContainer from "../container/ModalContainer";
import SendOTPForm from "../../templates/AuthForm/SendOTPForm";
import CheckOTPForm from "../../templates/AuthForm/CheckOTPForm";
import UserMenu from "../../templates/UserMenu";
import styles from "./Header.module.css";

function AuthSection() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // بررسی وضعیت کاربر
  const { data } = useGetUserData();
  const { data: userData } = data || {};
  const { mutate: resendOtp, isPending: isResending } = useSentOtp();

  useEffect(() => {
    if (step !== 2 || secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [step, secondsLeft]);

  // اگر کاربر لاگین کرده
  if (userData) {
    return (
      <>
        {/* Mobile: نمایش UserMenu */}
        <div className={styles.mobileMenu}>
          <UserMenu userData={userData} />
        </div>
        {/* Desktop: نمایش Link مستقیم */}
        <Link href="/profile" className={styles.desktopLink}>
          {userData.mobile}
        </Link>
      </>
    );
  }

  const handleResend = () => {
    if (isResending || secondsLeft > 0) return;
    if (!mobile) return;
    resendOtp(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "کد مجدد ارسال شد");
          const rawCode = data?.data?.code;
          const codeString = rawCode != null ? String(rawCode) : "";
          if (codeString) toast(codeString);
          setSecondsLeft(120);
        },
        onError: (error) => {
          toast.error(
            error?.data?.message || error?.message || "ارسال مجدد ناموفق بود"
          );
        },
      }
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.auth_button}
      >
        ورود | ثبت نام
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className={styles.auth_icon_button}
        aria-label="ورود | ثبت نام"
      >
        <Image
          src="/login.svg"
          alt="ورود | ثبت نام"
          width={40}
          height={40}
          className={styles.auth_icon}
        />
      </button>
      {step === 1 && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          step={step}
          setStep={setStep}
        >
          <SendOTPForm
            setStep={setStep}
            mobile={mobile}
            setMobile={setMobile}
            setSecondsLeft={setSecondsLeft}
          />
        </ModalContainer>
      )}
      {step === 2 && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          step={step}
          setStep={setStep}
        >
          <CheckOTPForm
            setStep={setStep}
            mobile={mobile}
            setIsOpen={setIsOpen}
            secondsLeft={secondsLeft}
            onResend={handleResend}
          />
        </ModalContainer>
      )}
    </>
  );
}

export default AuthSection;

