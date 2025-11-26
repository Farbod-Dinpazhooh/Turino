"use client";

import { useAddToBasket } from "@/core/services/mutation";
import { useGetUserData } from "@/core/services/queries";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import styles from "./ReserveButton.module.css";

function ReserveButton({ id }) {
  const { mutate, isPending } = useAddToBasket();

const router = useRouter();

  const { data: userDataResponse } = useGetUserData();
  const userData = userDataResponse?.data;

  const cartHandler = () => {
    if (isPending) return;

    // بررسی اینکه id وجود دارد
    if (!id) {
      toast.error("شناسه تور یافت نشد");
      return;
    }

    // بررسی اینکه کاربر لاگین کرده باشد
    if (!userData) {
      toast.error("لطفاً ابتدا وارد حساب کاربری خود شوید");
      return;
    }

    mutate(
      { tourId: id },
      {
        onSuccess: (data) => {
          const message =
            data?.data?.message ||
            data?.message ||
            "تور با موفقیت به سبد خرید اضافه شد";
          toast.success(message);
          router.push("/checkout");
        },
        onError: (error) => {
          const message =
            error?.response?.data?.message ||
            error?.data?.message ||
            error?.message ||
            "خطا در افزودن تور به سبد خرید";
          toast.error(message);
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={cartHandler}
        disabled={isPending}
      >
        {isPending ? "در حال پردازش..." : "رزرو و خرید"}
      </button>
    </div>
  );
}

export default ReserveButton;
