"use client";

import styles from "./TransactionsList.module.css";

function TransactionsList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className={styles.emptyTransactions}>
        <div className={styles.emptyIcon}>📋</div>
        <h3 className={styles.emptyTitle}>تراکنشی یافت نشد</h3>
        <p className={styles.emptyMessage}>
          هنوز هیچ تراکنشی ثبت نشده است. پس از انجام پرداخت، تراکنش‌های شما
          در اینجا نمایش داده می‌شوند.
        </p>
      </div>
    );
  }

  // فرمت تاریخ و ساعت
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      
      // تبدیل به شمسی (ساده - می‌تواند بهتر شود)
      const persianYear = year - 621;
      return `${persianYear}/${month}/${day} - ${hours}:${minutes}`;
    } catch {
      return dateString;
    }
  };

  // فرمت مبلغ
  const formatAmount = (amount) => {
    if (!amount) return "0";
    return amount.toLocaleString("fa-IR");
  };

  // فرمت شماره سفارش
  const formatOrderNumber = (id) => {
    if (!id) return "-";
    const number = String(id).replace(/\D/g, ""); // فقط اعداد
    return `سفارش ${number}`;
  };

  // نوع تراکنش
  const getTransactionType = (transaction) => {
    return transaction.type || 
           transaction.transactionType || 
           transaction.description ||
           "ثبت نام در تور گردشگری";
  };

  return (
    <div className={styles.transactionsTableWrapper}>
      <table className={styles.transactionsTable}>
        <thead>
          <tr>
            <th>شماره سفارش</th>
            <th className={styles.desktopOnly}>نوع تراکنش</th>
            <th>مبلغ (تومان)</th>
            <th>تاریخ و ساعت</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id || transaction._id}>
              <td>{formatOrderNumber(transaction.id || transaction._id || transaction.orderNumber)}</td>
              <td className={styles.desktopOnly}>{getTransactionType(transaction)}</td>
              <td>{formatAmount(transaction.amount || transaction.price || 0)}</td>
              <td>
                {formatDateTime(
                  transaction.createdAt ||
                    transaction.date ||
                    transaction.created_at ||
                    transaction.paymentDate
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList;
