import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* بخش بالا: ستون‌های تورینو و خدمات مشتریان */}
        <div className={styles.footer_top}>
          {/* ستون راست: تورینو */}
          <div className={styles.footer_section}>
            <h3 className={styles.footer_title}>تورينو</h3>
            <ul className={styles.footer_list}>
              <li>
                <Link href="/about" className={styles.footer_link}>
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.footer_link}>
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/why-torino" className={styles.footer_link}>
                  چرا تورینو
                </Link>
              </li>
              <li>
                <Link href="/insurance" className={styles.footer_link}>
                  بیمه مسافرتی
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون چپ: خدمات مشتریان */}
          <div className={styles.footer_section}>
            <h3 className={styles.footer_title}>خدمات مشتریان</h3>
            <ul className={styles.footer_list}>
              <li>
                <Link href="/support" className={styles.footer_link}>
                  پشتیبانی آنلاین
                </Link>
              </li>
              <li>
                <Link href="/guide" className={styles.footer_link}>
                  راهنمای خرید
                </Link>
              </li>
              <li>
                <Link href="/refund" className={styles.footer_link}>
                  راهنمای استرداد
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.footer_link}>
                  پرسش و پاسخ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* بخش پایین: لوگو و اطلاعات و بج‌ها */}
        <div className={styles.footer_bottom_section}>
          <div className={styles.badges_section}>
            <div className={styles.badge_item}>
              <div className={styles.badge_logo}>
                <Image
                  src="/bilit.svg"
                  alt="دامنه نرخ بلیط"
                  width={60}
                  height={60}
                  className={styles.badge_image}
                />
              </div>
              <div className={styles.badge_text}>
                <p>دامنه نرخ بلیط شرکت های هواپیمایی</p>
                <a
                  href="https://www.aira.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.aira.ir
                </a>
              </div>
            </div>
            <div className={styles.badge_item}>
              <div className={styles.badge_logo}>
                <Image
                  src="/samandehi-6e2b448a.svg"
                  alt="samandehi.ir"
                  width={60}
                  height={60}
                  className={styles.badge_image}
                />
              </div>
              <div className={styles.badge_text}>
                <p>samandehi.ir</p>
              </div>
            </div>
            <div className={styles.badge_item}>
              <div className={styles.badge_qr}>
                <Image
                  src="/QR-code.svg"
                  alt="QR Code"
                  width={60}
                  height={60}
                  className={styles.qr_image}
                />
              </div>
              <div className={styles.badge_text}>
                <p>عضو اتحادیه کشوری کسب و کارهای مجازی</p>
              </div>
            </div>
            <div className={styles.badge_item}>
              <div className={styles.badge_logo}>
                <Image
                  src="/hoghogh-mosafer.svg"
                  alt="حقوق مسافر"
                  width={60}
                  height={60}
                  className={styles.badge_image}
                />
              </div>
              <div className={styles.badge_text}>
                <p>حقوق مسافر</p>
              </div>
            </div>
            <div className={styles.badge_item}>
              <div className={styles.badge_logo}>
                <Image
                  src="/sazman-havapeimai.svg"
                  alt="سازمان هواپیمایی کشوری"
                  width={60}
                  height={60}
                  className={styles.badge_image}
                />
              </div>
              <div className={styles.badge_text}>
                <p>سازمان هواپیمایی کشوری</p>
              </div>
            </div>
          </div>
          <div className={styles.footer_left}>
            <div className={styles.logo_section}>
              <Image
                src="/Torino.svg"
                alt="Torino"
                width={100}
                height={30}
                className={styles.logo_image}
              />
            </div>
            <div className={styles.support_phone}>
              <span>تلفن پشتیبانی: ۰۲۱-۸۵۷۴</span>
            </div>
          </div>
        </div>

        {/* خط جداکننده و کپی‌رایت */}
        <div className={styles.footer_copyright}>
          <div className={styles.divider}></div>
          <div className={styles.copyright}>
            <p>کلیه حقوق این وب سایت متعلق به تورینو میباشد.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
