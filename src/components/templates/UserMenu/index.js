"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { setCookie } from "@/core/utils/cookie";
import ConfirmModal from "../ConfirmModal";
import styles from "./UserMenu.module.css";

function UserMenu({ userData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  // بستن منو با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.dropdownMenu}`)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    // پاک کردن cookies
    setCookie("accessToken", "", 0);
    setCookie("refreshToken", "", 0);

    // پاک کردن cache
    queryClient.clear();

    // بستن منو و modal
    setIsOpen(false);
    setShowLogoutModal(false);

    // هدایت به صفحه اصلی
    window.location.href = "/";
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    setShowLogoutModal(true);
  };

  const handleToggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    setIsOpen(!isOpen);
  };

  const dropdownMenu =
    isOpen && mounted ? (
      <div
        className={styles.dropdownMenu}
        style={{
          top: `${menuPosition.top}px`,
          right: `${menuPosition.right}px`,
        }}
      >
        <div className={styles.menuItem}>
          <Image
            src="/profile.svg"
            alt="profile"
            width={20}
            height={20}
            className={styles.menuIcon}
          />
          <span className={styles.menuText}>{userData?.mobile}</span>
        </div>

        <Link
          href="/profile"
          className={styles.menuItem}
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/profile.svg"
            alt="account"
            width={20}
            height={20}
            className={styles.menuIcon}
          />
          <span className={styles.menuText}>اطلاعات حساب کاربری</span>
        </Link>

        <button
          onClick={handleLogoutClick}
          className={`${styles.menuItem} ${styles.logoutItem}`}
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
        </button>
      </div>
    ) : null;

  return (
    <>
      <div className={styles.userMenuContainer} ref={menuRef}>
        <button
          ref={buttonRef}
          onClick={handleToggleMenu}
          className={styles.mobileButton}
          type="button"
        >
          <span className={styles.mobileNumber}>{userData?.mobile}</span>
          <Image
            src="/profile.svg"
            alt="profile"
            width={20}
            height={20}
            className={styles.profileIcon}
          />
          <span className={styles.chevron}>▼</span>
        </button>
      </div>

      {mounted && dropdownMenu && createPortal(dropdownMenu, document.body)}

      <ConfirmModal
        isOpen={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
        title="خروج از حساب کاربری"
        message="آیا می‌خواهید از حساب خود خارج شوید؟"
        confirmText="بله"
        cancelText="خیر"
      />
    </>
  );
}

export default UserMenu;
