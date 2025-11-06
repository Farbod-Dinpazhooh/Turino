"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import ModalContainer from "../../partials/container/ModalContainer";
import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { useSentOtp } from "@/core/services/mutation";

function AuthForm() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  //Resend OTP
  const { mutate: resendOtp, isPending: isResending } = useSentOtp();

  useEffect(() => {
    if (step !== 2 || secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [step, secondsLeft]);

  const handleResend = () => {
    if (isResending || secondsLeft > 0) return;
    if (!mobile) return;
    resendOtp(
      { mobile },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "کد مجدد ارسال شد");
          const rawCode = data?.data?.code;
          const fiveDigit = rawCode != null ? String(rawCode).slice(0, 5) : "";
          if (fiveDigit) toast(fiveDigit);
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
    <div>
      <button onClick={() => setIsOpen(true)}>ورود</button>
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
