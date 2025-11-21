import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import AuthSection from "./AuthSection";
import MobileMenu from "./MobileMenu";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logo_link}>
            <Image
              src="/Torino.svg"
              alt="Torino"
              width={150}
              height={50}
              className={styles.logo_image}
              priority
            />
          </Link>
        </div>
        {/* منوی موبایل */}
        <div className={styles.mobile_menu_wrapper}>
          <MobileMenu />
        </div>
        {/* منوی دسکتاپ */}
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li>
              <Link href="/" className={styles.nav_link}>
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link href="/tours" className={styles.nav_link}>
                خدمات گردشگری
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.nav_link}>
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.nav_link}>
                تماس با ما
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.auth_section}>
          <AuthSection />
        </div>
      </div>
    </header>
  );
}

export default Header;
