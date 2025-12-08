"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSentOtp } from "@/core/services/mutation";

import ModalContainer from "../../partials/container/ModalContainer";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useGetUserData } from "@/core/services/queries";
import Link from "next/link";
import UserMenu from "../UserMenu";
import styles from "./AuthForm.module.css";

function AuthForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // ✅ همه hooks را ابتدا فراخوانی می‌کنیم
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
      <div className={styles.auth_container}>
        {/* Mobile: نمایش UserMenu */}
        <div className={styles.mobileMenu}>
          <UserMenu userData={userData} />
        </div>
        {/* Desktop: نمایش Link مستقیم */}
        <Link href="/profile" className={styles.desktopLink}>
          {userData.mobile}
        </Link>
      </div>
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
          // TODO: Backend کد 6 رقمی می‌فرستد و چک می‌کند - موقتاً کل کد را استفاده می‌کنیم
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
    <div className={styles.auth_container}>
      <button onClick={() => setIsOpen(true)} className={styles.auth_button}>
        ورود | ثبت نام
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
    </div>
  );
}

export default AuthForm;
