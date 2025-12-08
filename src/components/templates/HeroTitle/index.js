"use client";

import styles from "./HeroTitle.module.css";

function HeroTitle() {
  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>
        <span className={styles.torinoText}>تورینو</span>
        <span className={styles.restText}>
          {" "}
          برگزار کننده بهترین تور های داخلی و خارجی
        </span>
      </h1>
    </div>
  );
}

export default HeroTitle;
