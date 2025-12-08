"use client";

import { useState } from "react";
import AuthProvider from "@/components/partials/provider/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { setCookie } from "@/core/utils/cookie";
import ConfirmModal from "@/components/templates/ConfirmModal";
import styles from "./layout.module.css";

function ProfileLayout({ children }) {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const queryClient = useQueryClient();

  const handleLogout = () => {
    // پاک کردن cookies
    setCookie("accessToken", "", 0);
    setCookie("refreshToken", "", 0);

    // پاک کردن cache
    queryClient.clear();

    // بستن modal
    setShowLogoutModal(false);

    // هدایت به صفحه اصلی
    window.location.href = "/";
  };

  return (
    <AuthProvider>
      <div className={styles.container}>
        <nav className={styles.sidebar}>
          <ul className={styles.menu}>
            <li
              className={`${styles.menuItem} ${
                pathname === "/profile" ? styles.active : ""
              }`}
            >
              <Image src="/profile.svg" alt="profile" width={20} height={20} />
              <Link href="/profile">پروفایل</Link>
            </li>
            <li
              className={`${styles.menuItem} ${
                pathname === "/profile/my-tours" ? styles.active : ""
              }`}
            >
              <Image src="/tours.svg" alt="tour" width={20} height={20} />
              <Link href="/profile/my-tours">تور های من</Link>
            </li>
            <li
              className={`${styles.menuItem} ${
                pathname === "/profile/transactions" ? styles.active : ""
              }`}
            >
              <Image
                src="/transaction.svg"
                alt="transaction"
                width={20}
                height={20}
              />
              <Link href="/profile/transactions">تراکنش ها</Link>
            </li>
            <li
              className={`${styles.menuItem} ${styles.logoutItem} ${styles.desktopOnly}`}
              onClick={() => setShowLogoutModal(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.logoutIcon}
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                  stroke="#d32f2f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className={styles.logoutText}>خروج از حساب کاربری</span>
            </li>
          </ul>
        </nav>
        <main className={styles.content}>{children}</main>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
        title="خروج از حساب کاربری"
        message="آیا می‌خواهید از حساب خود خارج شوید؟"
        confirmText="بله"
        cancelText="خیر"
      />
    </AuthProvider>
  );
}

export default ProfileLayout;
