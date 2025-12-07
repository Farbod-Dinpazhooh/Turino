"use client";

import styles from "./TransactionCard.module.css";

function TransactionCard({ transaction }) {
  // فرمت تاریخ
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // فرمت مبلغ
  const formatAmount = (amount) => {
    if (!amount) return "0";
    return amount.toLocaleString("fa-IR");
  };

  // وضعیت تراکنش
  const getStatusText = (status) => {
    switch (status) {
      case "success":
      case "completed":
        return "موفق";
      case "pending":
        return "در انتظار";
      case "failed":
      case "rejected":
        return "ناموفق";
      default:
        return status || "نامشخص";
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "success":
      case "completed":
        return "success";
      case "pending":
        return "pending";
      case "failed":
      case "rejected":
        return "failed";
      default:
        return "unknown";
    }
  };

  return (
    <div className={styles.transactionCard}>
      <div className={styles.transactionHeader}>
        <div className={styles.transactionId}>
          <span className={styles.label}>شناسه تراکنش:</span>
          <span className={styles.value}>
            {transaction.id || transaction._id || transaction.transactionId || "-"}
          </span>
        </div>
        <div className={`${styles.transactionStatus} ${styles[getStatusClass(transaction.status)]}`}>
          {getStatusText(transaction.status)}
        </div>
      </div>

      <div className={styles.transactionBody}>
        <div className={styles.transactionItem}>
          <span className={styles.label}>مبلغ:</span>
          <span className={styles.value}>
            {formatAmount(transaction.amount || transaction.price || 0)} تومان
          </span>
        </div>

        <div className={styles.transactionItem}>
          <span className={styles.label}>تاریخ:</span>
          <span className={styles.value}>
            {formatDate(transaction.createdAt || transaction.date || transaction.created_at)}
          </span>
        </div>

        {transaction.tourTitle && (
          <div className={styles.transactionItem}>
            <span className={styles.label}>تور:</span>
            <span className={styles.value}>{transaction.tourTitle}</span>
          </div>
        )}

        {transaction.description && (
          <div className={styles.transactionItem}>
            <span className={styles.label}>توضیحات:</span>
            <span className={styles.value}>{transaction.description}</span>
          </div>
        )}

        {transaction.paymentMethod && (
          <div className={styles.transactionItem}>
            <span className={styles.label}>روش پرداخت:</span>
            <span className={styles.value}>{transaction.paymentMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionCard;

