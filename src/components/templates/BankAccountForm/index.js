"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./BankAccountForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankFormSchema } from "@/core/schema";
import { useUpdateBankAccount } from "@/core/services/mutation";
import { useGetUserData } from "@/core/services/queries";

function BankAccountForm() {
  const { mutate, isPending } = useUpdateBankAccount();
  const { data: userDataResponse } = useGetUserData();
  const userData = userDataResponse?.data;

  const [formData, setFormData] = useState({
    sheba: "",
    cardNumber: "",
    accountNumber: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // دریافت اطلاعات بانکی از API هنگام بارگذاری
  useEffect(() => {
    if (userData) {
      setFormData({
        sheba: userData?.shaba_code || "",
        cardNumber: userData?.debitCard_code || "",
        accountNumber: userData?.accountIdentifier || "",
      });
    }
  }, [userData]);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bankFormSchema),
    defaultValues: {
      shaba_code: formData.sheba,
      debitCard_code: formData.cardNumber,
      accountIdentifier: formData.accountNumber,
    },
  });

  const submitHandler = (data) => {
    if (isPending) return;

    mutate(data, {
      onSuccess: (response) => {
        // ذخیره در state اصلی بعد از موفقیت API
        setFormData({
          sheba: data.shaba_code,
          cardNumber: data.debitCard_code,
          accountNumber: data.accountIdentifier,
        });
        toast.success("اطلاعات حساب بانکی با موفقیت ذخیره شد");
        setIsEditing(false);
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "خطا در ذخیره اطلاعات حساب بانکی";
        toast.error(message);
      },
    });
  };

  const onError = (errors) => {
    toast.error("لطفاً خطاهای فرم را برطرف کنید");
  };

  const handleCancel = () => {
    // برگرداندن فرم به مقادیر قبلی بدون ذخیره
    reset({
      shaba_code: formData.sheba,
      debitCard_code: formData.cardNumber,
      accountIdentifier: formData.accountNumber,
    });
    setIsEditing(false);
    toast.info("تغییرات لغو شد");
  };

  const handleEdit = () => {
    // تنظیم مقادیر فعلی در فرم هنگام شروع ویرایش
    reset({
      shaba_code: formData.sheba,
      debitCard_code: formData.cardNumber,
      accountIdentifier: formData.accountNumber,
    });
    setIsEditing(true);
  };

  // حالت نمایش (View Mode)
  if (!isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>اطلاعات حساب بانکی</h3>
          <button onClick={handleEdit} className={styles.editBtn}>
            <Image src="/edit-2.svg" alt="edit" width={16} height={16} />
            ویرایش اطلاعات
          </button>
        </div>
        <div className={styles.viewMode}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>شماره شبا</span>
            <span className={styles.infoValue}>{formData.sheba || "-"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>شماره کارت</span>
            <span className={styles.infoValue}>
              {formData.cardNumber || "-"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>شماره حساب</span>
            <span className={styles.infoValue}>
              {formData.accountNumber || "-"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // حالت ویرایش (Edit Mode)
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>اطلاعات حساب بانکی</h3>
      <form onSubmit={onSubmit(submitHandler, onError)} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputWrapper}>
            <input
              {...register("shaba_code")}
              type="text"
              placeholder="شماره شبا"
              maxLength={26}
              className={styles.input}
            />
            {!!errors?.shaba_code && (
              <p className={styles.error}>{errors.shaba_code.message}</p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              {...register("debitCard_code")}
              type="text"
              placeholder="شماره کارت"
              maxLength={19}
              className={styles.input}
            />
            {!!errors?.debitCard_code && (
              <p className={styles.error}>{errors.debitCard_code.message}</p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <input
              {...register("accountIdentifier")}
              type="text"
              placeholder="شماره حساب"
              className={styles.input}
            />
            {!!errors?.accountIdentifier && (
              <p className={styles.error}>{errors.accountIdentifier.message}</p>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitBtn}
          >
            {isPending ? "در حال ذخیره..." : "تایید"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className={styles.cancelBtn}
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}

export default BankAccountForm;
