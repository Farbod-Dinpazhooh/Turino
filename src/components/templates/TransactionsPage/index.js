"use client";

import { useGetUserTransactions } from "@/core/services/queries";
import TransactionsList from "../TransactionsList";
import InternetError from "../InternetError";
import { useOnlineStatus } from "@/core/hooks/useOnlineStatus";
import styles from "./TransactionsPage.module.css";

function TransactionsPage() {
  const isOnline = useOnlineStatus();
  const {
    data: transactionsResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useGetUserTransactions();

  const transactions = transactionsResponse?.data || [];

  // بررسی خطای اینترنت
  if (!isOnline || error?.isInternetError) {
    return <InternetError onRetry={() => refetch()} />;
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles.loadingText}>در حال بارگذاری تراکنش‌ها...</p>
      </div>
    );
  }

  if (isError || error) {
    const errorMessage =
      error?.message?.includes("token") || error?.message?.includes("401")
        ? "لطفاً ابتدا وارد حساب کاربری خود شوید"
        : error?.message || "خطا در دریافت تراکنش‌ها";

    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>خطا در بارگذاری تراکنش‌ها</h3>
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.transactionsPage}>
      <h2 className={styles.transactionsTitle}>تراکنش‌های من</h2>
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default TransactionsPage;
