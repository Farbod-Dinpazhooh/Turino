"use client";

import { useState, useEffect, useRef } from "react";
import { useGetUserData } from "@/core/services/queries";
import { useUpdateBankAccount } from "@/core/services/mutation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalInfoSchema } from "@/core/schema";
import { DatePicker } from "zaman";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "./PersonalInfoForm.module.css";

function DatePickerField({ value, onChange }) {
  const datePickerRef = useRef(null);

  useEffect(() => {
    const setPlaceholder = () => {
      if (datePickerRef.current) {
        const input = datePickerRef.current.querySelector("input");
        if (input) {
          input.setAttribute("placeholder", "تاریخ تولد");
        }
      }
    };

    setPlaceholder();
    const timer = setTimeout(setPlaceholder, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.datepickerWrapper} ref={datePickerRef}>
      <DatePicker
        onChange={onChange}
        value={value || undefined}
        placeholder="تاریخ تولد"
      />
      <span className={styles.calendarIcon}>📅</span>
    </div>
  );
}

function PersonalInfoForm() {
  const { data: userDataResponse } = useGetUserData();
  const userData = userDataResponse?.data;
  const { mutate, isPending } = useUpdateBankAccount();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit: onSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(personalInfoSchema),
    defaultValues: {
      fullName: "",
      nationalId: "",
      birthDate: "",
      gender: "male",
    },
  });

  // به‌روزرسانی فرم با اطلاعات API
  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData?.name || "",
        nationalId: userData?.nationalId || "",
        birthDate: userData?.birthDate || "",
        gender: userData?.gender || "male",
      });
    }
  }, [userData, reset]);

  const submitHandler = (data) => {
    if (isPending) return;

    mutate(data, {
      onSuccess: () => {
        toast.success("اطلاعات شخصی با موفقیت ذخیره شد");
        setIsEditing(false);
      },
      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "خطا در ذخیره اطلاعات شخصی";
        toast.error(message);
      },
    });
  };

  const onError = () => {
    toast.error("لطفاً خطاهای فرم را برطرف کنید");
  };

  const handleCancel = () => {
    reset({
      fullName: userData?.name || "",
      nationalId: userData?.nationalId || "",
      birthDate: userData?.birthDate || "",
      gender: userData?.gender || "male",
    });
    setIsEditing(false);
    toast.info("تغییرات لغو شد");
  };

  const handleEdit = () => {
    reset({
      fullName: userData?.name || "",
      nationalId: userData?.nationalId || "",
      birthDate: userData?.birthDate || "",
      gender: userData?.gender || "male",
    });
    setIsEditing(true);
  };

  // حالت نمایش (View Mode)
  if (!isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>اطلاعات شخصی</h3>
          <button onClick={handleEdit} className={styles.editBtn}>
            <Image src="/edit-2.svg" alt="edit" width={16} height={16} />
            ویرایش اطلاعات
          </button>
        </div>
        <div className={styles.viewMode}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>نام و نام خانوادگی</span>
            <span className={styles.infoValue}>{userData?.name || "-"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>کدملی</span>
            <span className={styles.infoValue}>{userData?.nationalId || "-"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>جنسیت</span>
            <span className={styles.infoValue}>
              {userData?.gender === "male" ? "مرد" : userData?.gender === "female" ? "زن" : "-"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>تاریخ تولد</span>
            <span className={styles.infoValue}>{userData?.birthDate || "-"}</span>
          </div>
        </div>
      </div>
    );
  }

  // حالت ویرایش (Edit Mode)
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>اطلاعات شخصی</h3>
      <form onSubmit={onSubmit(submitHandler, onError)} className={styles.form}>
        <div className={styles.row}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="نام و نام خانوادگی"
            className={styles.input}
          />
          {errors.fullName && (
            <span className={styles.error}>{errors.fullName.message}</span>
          )}
          <input
            {...register("nationalId")}
            type="text"
            placeholder="کدملی"
            maxLength={10}
            className={styles.input}
          />
          {errors.nationalId && (
            <span className={styles.error}>{errors.nationalId.message}</span>
          )}
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, value } }) => (
              <DatePickerField value={value} onChange={onChange} />
            )}
          />
          {errors.birthDate && (
            <span className={styles.error}>{errors.birthDate.message}</span>
          )}
        </div>

        <div className={styles.row}>
          <select
            {...register("gender")}
            className={styles.select}
          >
            <option value="male">مرد</option>
            <option value="female">زن</option>
          </select>
          {errors.gender && (
            <span className={styles.error}>{errors.gender.message}</span>
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

export default PersonalInfoForm;
