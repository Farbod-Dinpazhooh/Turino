"use client";

import AuthProvider from "@/components/partials/provider/AuthProvider";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

function ProfileLayout({ children }) {
  const pathname = usePathname();

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
          </ul>
        </nav>
        <main className={styles.content}>{children}</main>
      </div>
    </AuthProvider>
  );
}

export default ProfileLayout;
