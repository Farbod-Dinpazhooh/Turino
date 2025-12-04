"use client";

import { useState, useEffect } from "react";
import { useGetUserData } from "@/core/services/queries";
import { useUpdateBankAccount } from "@/core/services/mutation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailFormSchema } from "@/core/schema";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./AccountInfoForm.module.css";

function AccountInfoForm() {
  const { data: userDataResponse } = useGetUserData();
  const userData = userDataResponse?.data;
  const { mutate, isPending } = useUpdateBankAccount();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(emailFormSchema),
    defaultValues: {
      email: userData?.email || "",
    },
  });

  // به‌روزرسانی فرم با اطلاعات API
  useEffect(() => {
    if (userData?.email) {
      reset({ email: userData.email });
    }
  }, [userData, reset]);

  const submitHandler = (data) => {
    if (isPending) return;

    mutate(data, {
      onSuccess: () => {
        toast.success("ایمیل با موفقیت ذخیره شد");
        setIsEditing(false);
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "خطا در ذخیره ایمیل";
        toast.error(message);
      },
    });
  };

  const onError = () => {
    toast.error("لطفاً خطاهای فرم را برطرف کنید");
  };

  const handleEdit = () => {
    reset({ email: userData?.email || "" });
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset({ email: userData?.email || "" });
    setIsEditing(false);
    toast.info("تغییرات لغو شد");
  };

  // حالت نمایش (View Mode)
  if (!isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>اطلاعات حساب کاربری</h3>
        </div>
        <div className={styles.viewMode}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>شماره موبایل</span>
            <span className={styles.infoValue}>{userData?.mobile || ""}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>ایمیل</span>
            <span className={styles.infoValue}>
              {userData?.email || (
                <button onClick={handleEdit} className={styles.addBtn}>
                  <Image src="/edit-2.svg" alt="edit" width={16} height={16} />
                  افزودن
                </button>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // حالت ویرایش (Edit Mode)
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>اطلاعات حساب کاربری</h3>
      <form onSubmit={onSubmit(submitHandler, onError)} className={styles.form}>
        <div className={styles.mobileGroup}>
          <span className={styles.label}>شماره موبایل</span>
          <span className={styles.mobileNumber}>{userData?.mobile || ""}</span>
        </div>

        <div className={styles.inputWrapper}>
          <input
            {...register("email")}
            type="email"
            placeholder="آدرس ایمیل"
            className={styles.input}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
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

export default AccountInfoForm;
