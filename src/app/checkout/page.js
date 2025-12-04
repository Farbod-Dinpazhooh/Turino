"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "zaman";
import { useGetUserBasket, useGetUserData } from "@/core/services/queries";
import { useCreateOrder } from "@/core/services/mutation";
import toast from "react-hot-toast";
import styles from "./page.module.css";

function CheckoutPage() {
  const router = useRouter();
  const { data: basketData } = useGetUserBasket();
  const { data: userDataResponse } = useGetUserData();
  const userData = userDataResponse?.data;
  const { mutate: createOrder, isPending } = useCreateOrder();

  const checkoutHandler = () => {
    mutate(mockData, {
      onSuccess: () => {
        toast.success("سفارش شما با موفقیت ثبت شد");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      gender: "",
      nationalId: "",
      birthDate: "",
    },
  });

  // به‌روزرسانی فرم هنگام بارگذاری اطلاعات کاربر
  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData?.name || "",
        gender: "",
        nationalId: "",
        birthDate: "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (formData) => {
    if (!basketData?.data) {
      toast.error("سبد خرید شما خالی است");
      return;
    }

    // ارسال اطلاعات کاربر و سبد خرید به /order
    createOrder(
      {
        ...formData,
        basketId: basketData?.data?.id || basketData?.data?._id,
      },
      {
        onSuccess: (response) => {
          toast.success("سفارش شما با موفقیت ثبت شد");
          console.log("Order created:", response);
          // هدایت به صفحه پرداخت با وضعیت موفقیت
          router.push("/payment?status=success");
        },
        onError: (error) => {
          const message =
            error?.response?.data?.message ||
            error?.data?.message ||
            error?.message ||
            "خطا در ثبت سفارش";
          toast.error(message);
          // هدایت به صفحه پرداخت با وضعیت خطا
          router.push("/payment?status=failed");
        },
      }
    );
  };

  const basket = basketData?.data;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.page_container}>
      {/* بخش مشخصات مسافر */}
      <div className={styles.passenger_section}>
        <div className={styles.section_header}>
          <img
            src="/user icon.svg"
            alt="user icon"
            className={styles.user_icon}
          />
          <h2 className={styles.section_title}>مشخصات مسافر</h2>
        </div>

        <div className={styles.form}>
          <div className={styles.input_wrapper}>
            <input
              type="text"
              {...register("fullName", {
                required: "نام و نام خانوادگی الزامی است",
              })}
              placeholder="نام و نام خانوادگی"
              className={styles.input}
            />
            {errors.fullName && (
              <span className={styles.error}>{errors.fullName.message}</span>
            )}
          </div>

          <div className={styles.input_wrapper}>
            <select
              {...register("gender", {
                required: "جنسیت الزامی است",
              })}
              className={styles.select}
            >
              <option value="">جنسیت</option>
              <option value="male">مرد</option>
              <option value="female">زن</option>
            </select>
            {errors.gender && (
              <span className={styles.error}>{errors.gender.message}</span>
            )}
          </div>

          <div className={styles.input_wrapper}>
            <input
              type="text"
              {...register("nationalId", {
                required: "کد ملی الزامی است",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "کد ملی باید ۱۰ رقم باشد",
                },
              })}
              placeholder="کد ملی"
              className={styles.input}
              maxLength={10}
            />
            {errors.nationalId && (
              <span className={styles.error}>{errors.nationalId.message}</span>
            )}
          </div>

          <div className={styles.input_wrapper}>
            <Controller
              control={control}
              name="birthDate"
              rules={{ required: "تاریخ تولد الزامی است" }}
              render={({ field: { onChange, value } }) => {
                const datePickerRef = useRef(null);

                useEffect(() => {
                  const setPlaceholder = () => {
                    if (datePickerRef.current) {
                      const input =
                        datePickerRef.current.querySelector("input");
                      if (input) {
                        input.setAttribute("placeholder", "yyyy/mm/dd");
                      }
                    }
                  };

                  setPlaceholder();
                  const timer = setTimeout(setPlaceholder, 100);
                  return () => clearTimeout(timer);
                }, []);

                return (
                  <div
                    className={styles.datepicker_container}
                    ref={datePickerRef}
                  >
                    <DatePicker
                      placeholder="yyyy/mm/dd"
                      onChange={(e) => {
                        onChange(e || null);
                      }}
                      value={value || undefined}
                    />
                    <span className={styles.calendar_icon}>📅</span>
                  </div>
                );
              }}
            />
            {errors.birthDate && (
              <span className={styles.error}>{errors.birthDate.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* بخش جزئیات تور */}
      {basket && (
        <div className={styles.tour_section}>
          <div className={styles.tour_header}>
            <h3 className={styles.tour_title}>{basket.title || "تور"}</h3>
            <p className={styles.tour_duration}>۵ روز و ۴ شب</p>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.price_section}>
            <span className={styles.price_label}>قیمت نهایی</span>
            <div className={styles.price_wrapper}>
              <span className={styles.price_value}>
                {basket.price?.toLocaleString() || "0"}
              </span>
              <span className={styles.currency}>تومان</span>
            </div>
          </div>

          <div className={styles.buttons_wrapper}>
            <button
              type="button"
              onClick={handleBack}
              className={styles.back_button}
            >
              بازگشت
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={styles.submit_button}
              onClick={checkoutHandler}
            >
              {isPending ? "در حال ثبت..." : "ثبت و خرید نهایی"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default CheckoutPage;
