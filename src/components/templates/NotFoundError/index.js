"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NotFoundError.module.css";

function NotFoundError() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageWrapper}>
          <Image
            src="/Error TV.png"
            alt="صفحه یافت نشد"
            width={555}
            height={555}
            className={styles.image}
          />
        </div>
        <div className={styles.textWrapper}>
          <h2 className={styles.title}>صفحه مورد نظر یافت نشد!</h2>
          <Link href="/" className={styles.homeButton}>
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundError;
