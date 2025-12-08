"use client";

import Image from "next/image";
import styles from "./InternetError.module.css";

function InternetError({ onRetry }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src="/Internet error.png"
            alt="خطای اتصال به اینترنت"
            width={555}
            height={555}
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>اتصال با سرور برقرار نیست!</h2>
          <p className={styles.message}>لطفا بعدا دوباره امتحان کنید.</p>
          {onRetry && (
            <button onClick={onRetry} className={styles.retryButton}>
              تلاش مجدد
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default InternetError;
