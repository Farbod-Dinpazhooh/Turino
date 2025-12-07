"use client";

import { useGetUserOrders } from "@/core/services/queries";
import ToursList from "../ToursList";

function MyToursPage() {
  const {
    data: ordersResponse,
    isLoading,
    error,
    isError,
  } = useGetUserOrders();

  // فقط تورهای خریداری شده
  const purchasedTours = ordersResponse?.data || [];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">در حال بارگذاری...</p>
      </div>
    );
  }

  if (isError || error) {
    const errorMessage =
      error?.message?.includes("token") || error?.message?.includes("401")
        ? "لطفاً ابتدا وارد حساب کاربری خود شوید"
        : error?.message || "خطا در دریافت اطلاعات";

    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">خطا در بارگذاری اطلاعات</h3>
        <p className="error-message">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="my-tours-page">
      <ToursList tours={purchasedTours} />
    </div>
  );
}

export default MyToursPage;
