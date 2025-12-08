"use client";

import Image from "next/image";
import styles from "./HeroBanner.module.css";

function HeroBanner() {
  return (
    <div className={styles.bannerContainer}>
      <Image
        src="/image.png"
        alt="تورینو - برگزار کننده بهترین تورهای داخلی و خارجی"
        width={1200}
        height={400}
        className={styles.bannerImage}
        priority
      />
    </div>
  );
}

export default HeroBanner;
