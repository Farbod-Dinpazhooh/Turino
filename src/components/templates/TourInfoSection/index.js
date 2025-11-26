"use client";

import Image from "next/image";
import styles from "./TourInfoSection.module.css";

function TourInfoSection({ origin, startDate, endDate }) {
  // تبدیل اعداد انگلیسی به فارسی
  const toPersianNumbers = (str) => {
    if (!str) return "";
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return str.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };

  // فرمت کردن تاریخ به فارسی
  const formatPersianDate = (dateString) => {
    if (!dateString) return "مشخص نشده";
    try {
      const date = new Date(dateString);
      const monthNames = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const persianYear = year - 621;
      // تبدیل اعداد به فارسی
      return `${toPersianNumbers(day)} ${month} ${toPersianNumbers(
        persianYear
      )}`;
    } catch (e) {
      return dateString;
    }
  };

  // تبدیل نام شهرها از انگلیسی به فارسی
  const translateCityName = (cityName) => {
    if (!cityName) return "";

    const cityMap = {
      Tehran: "تهران",
      Isfahan: "اصفهان",
      Shiraz: "شیراز",
      Mashhad: "مشهد",
      Tabriz: "تبریز",
      Yazd: "یزد",
      Kerman: "کرمان",
      Ahvaz: "اهواز",
      Qom: "قم",
      Kermanshah: "کرمانشاه",
      Rasht: "رشت",
      Zahedan: "زاهدان",
      Hamadan: "همدان",
      Khorramabad: "خرم‌آباد",
      Sanandaj: "سنندج",
      Ardabil: "اردبیل",
      "Bandar Abbas": "بندرعباس",
      Arak: "اراک",
      Urmia: "ارومیه",
      Zanjan: "زنجان",
      Sari: "ساری",
      Birjand: "بیرجند",
      Gorgan: "گرگان",
      Shahrekord: "شهرکرد",
      Ilam: "ایلام",
      Bojnurd: "بجنورد",
      Yasuj: "یاسوج",
      Semnan: "سمنان",
      Kashan: "کاشان",
      Qazvin: "قزوین",
      Gonbad: "گنبد",
      "Bandar-e Anzali": "بندر انزلی",
      Khoy: "خوی",
      Maragheh: "مراغه",
      Sabzevar: "سبزوار",
      Amol: "آمل",
      Babol: "بابل",
      Qaemshahr: "قائم‌شهر",
      Saveh: "ساوه",
      Abadan: "آبادان",
      Dezful: "دزفول",
      Khorramshahr: "خرمشهر",
      Behbahan: "بهبهان",
      Borujerd: "بروجرد",
      Malayer: "ملایر",
      Nahavand: "نهاوند",
      Kangavar: "کنگاور",
      Hamedan: "همدان",
      "Torbat-e Heydarieh": "تربت حیدریه",
      "Torbat-e Jam": "تربت جام",
      Neyshabur: "نیشابور",
      Sabzevar: "سبزوار",
      Gonabad: "گناباد",
      Kashmar: "کاشمر",
      "Torbat-e Jam": "تربت جام",
      Taybad: "تایباد",
      Bojnurd: "بجنورد",
      Esfarayen: "اسفراین",
      Shirvan: "شیروان",
      Fariman: "فریمان",
      Chenaran: "چناران",
      Quchan: "قوچان",
      Bojnurd: "بجنورد",
    };

    // بررسی در mapping
    if (cityMap[cityName]) {
      return cityMap[cityName];
    }

    // اگر نام از قبل فارسی است، همان را برگردان
    return cityName;
  };

  // استخراج نام مبدا اگر object باشد و تبدیل به فارسی
  const getOriginName = () => {
    if (!origin) return "مشخص نشده";
    let originName = "";

    if (typeof origin === "string") {
      originName = origin;
    } else if (typeof origin === "object") {
      originName =
        origin.name ||
        origin.title ||
        origin.faName ||
        origin.persianName ||
        "";
    }

    if (!originName) return "مشخص نشده";

    // تبدیل نام شهر به فارسی
    return translateCityName(originName);
  };

  return (
    <div className={styles.tour_info_section}>
      <div className={styles.info_item}>
        <div className={styles.info_label}>مبدا</div>
        <div className={styles.info_value}>{getOriginName()}</div>
      </div>
      <div className={styles.info_divider}></div>
      <div className={styles.info_item}>
        <div className={styles.info_label}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.calendar_icon}
          >
            <path
              d="M12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4C14 2.89543 13.1046 2 12 2Z"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 6H14"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 2V6"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 2V6"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          تاریخ رفت
        </div>
        <div className={styles.info_value}>
          {startDate ? formatPersianDate(startDate) : "مشخص نشده"}
        </div>
      </div>
      <div className={styles.info_divider}></div>
      <div className={styles.info_item}>
        <div className={styles.info_label}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.calendar_icon}
          >
            <path
              d="M12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4C14 2.89543 13.1046 2 12 2Z"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 6H14"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 2V6"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 2V6"
              stroke="#7d7d7d"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          تاریخ برگشت
        </div>
        <div className={styles.info_value}>
          {endDate ? formatPersianDate(endDate) : "مشخص نشده"}
        </div>
      </div>
    </div>
  );
}

export default TourInfoSection;
