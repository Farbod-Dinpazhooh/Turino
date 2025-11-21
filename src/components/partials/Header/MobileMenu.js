"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // بستن منو وقتی روی overlay کلیک می‌شود
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* دکمه Hamburger */}
      <button
        className={styles.mobile_menu_button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="منوی موبایل"
      >
        <Image
          src="/Hamburger menu.svg"
          alt="منو"
          width={24}
          height={24}
          className={styles.hamburger_icon}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.mobile_menu_overlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* منوی سایدبار */}
      <div
        className={`${styles.mobile_menu} ${
          isOpen ? styles.mobile_menu_open : ""
        }`}
      >
        <div className={styles.mobile_menu_header}>
          <Link
            href="/"
            className={styles.mobile_menu_logo}
            onClick={handleLinkClick}
          >
            <Image
              src="/Torino.svg"
              alt="Torino"
              width={120}
              height={40}
              className={styles.mobile_menu_logo_image}
              priority
            />
          </Link>
          <button
            className={styles.mobile_menu_close}
            onClick={() => setIsOpen(false)}
            aria-label="بستن منو"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <nav className={styles.mobile_menu_nav}>
          <ul className={styles.mobile_menu_list}>
            <li>
              <Link
                href="/"
                className={`${styles.mobile_menu_link} ${styles.mobile_menu_link_active}`}
                onClick={handleLinkClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.mobile_menu_icon}
                >
                  <path
                    d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 22V12H15V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                href="/tours"
                className={styles.mobile_menu_link}
                onClick={handleLinkClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.mobile_menu_icon}
                >
                  <path
                    d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                خدمات گردشگری
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={styles.mobile_menu_link}
                onClick={handleLinkClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.mobile_menu_icon}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 16V12M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                درباره ما
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={styles.mobile_menu_link}
                onClick={handleLinkClick}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.mobile_menu_icon}
                >
                  <path
                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2128 21.352 21.3992C21.1467 21.5856 20.9046 21.7257 20.6397 21.811C20.3748 21.8962 20.0932 21.9247 19.815 21.8942C16.7421 21.5856 13.787 20.5341 11.19 18.8242C8.77382 17.2921 6.72533 15.2436 5.19318 12.8274C3.48324 10.2307 2.43178 7.27596 2.12318 4.20318C2.09269 3.92489 2.12119 3.64329 2.20641 3.37843C2.29163 3.11357 2.43172 2.87151 2.61812 2.66618C2.80452 2.46085 3.03312 2.29728 3.28812 2.18567C3.54312 2.07407 3.81879 2.01711 4.09718 2.01818H7.09718C7.55718 2.01726 8.00494 2.16713 8.37618 2.44718C8.74742 2.72723 9.02318 3.12318 9.16318 3.57818L10.6832 8.51818C10.8059 8.96515 10.8111 9.44133 10.6982 9.89118C10.5853 10.341 10.359 10.7481 10.0432 11.0682L8.40318 12.7082C9.77118 15.1082 11.8832 17.2202 14.2832 18.5882L15.9232 16.9482C16.2433 16.6324 16.6504 16.4061 17.1002 16.2932C17.5501 16.1803 18.0263 16.1855 18.4732 16.3082L23.4132 17.8282C23.8682 17.9682 24.2642 18.244 24.5442 18.6152C24.8243 18.9865 24.9742 19.4342 24.9732 19.8942L22 16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                تماس با ما
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default MobileMenu;
