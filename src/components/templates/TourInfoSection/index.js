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

    // تبدیل به string و trim کردن
    const normalizedName = String(cityName).trim();

    const cityMap = {
      Tehran: "تهران",
      tehran: "تهران",
      Isfahan: "اصفهان",
      isfahan: "اصفهان",
      Shiraz: "شیراز",
      shiraz: "شیراز",
      Mashhad: "مشهد",
      mashhad: "مشهد",
      Tabriz: "تبریز",
      tabriz: "تبریز",
      Yazd: "یزد",
      yazd: "یزد",
      Kerman: "کرمان",
      kerman: "کرمان",
      Ahvaz: "اهواز",
      ahvaz: "اهواز",
      Qom: "قم",
      qom: "قم",
      Kermanshah: "کرمانشاه",
      kermanshah: "کرمانشاه",
      Rasht: "رشت",
      rasht: "رشت",
      Zahedan: "زاهدان",
      zahedan: "زاهدان",
      Hamadan: "همدان",
      hamadan: "همدان",
      Hamedan: "همدان",
      hamedan: "همدان",
      Khorramabad: "خرم‌آباد",
      khorramabad: "خرم‌آباد",
      Sanandaj: "سنندج",
      sanandaj: "سنندج",
      Sananndaj: "سنندج",
      sananndaj: "سنندج",
      Ardabil: "اردبیل",
      ardabil: "اردبیل",
      "Bandar Abbas": "بندرعباس",
      "bandar abbas": "بندرعباس",
      Arak: "اراک",
      arak: "اراک",
      Urmia: "ارومیه",
      urmia: "ارومیه",
      Zanjan: "زنجان",
      zanjan: "زنجان",
      Sari: "ساری",
      sari: "ساری",
      Birjand: "بیرجند",
      birjand: "بیرجند",
      Gorgan: "گرگان",
      gorgan: "گرگان",
      Shahrekord: "شهرکرد",
      shahrekord: "شهرکرد",
      Ilam: "ایلام",
      ilam: "ایلام",
      Bojnurd: "بجنورد",
      bojnurd: "بجنورد",
      Yasuj: "یاسوج",
      yasuj: "یاسوج",
      Semnan: "سمنان",
      semnan: "سمنان",
      Kashan: "کاشان",
      kashan: "کاشان",
      Qazvin: "قزوین",
      qazvin: "قزوین",
      Gonbad: "گنبد",
      gonbad: "گنبد",
      "Bandar-e Anzali": "بندر انزلی",
      "bandar-e anzali": "بندر انزلی",
      Khoy: "خوی",
      khoy: "خوی",
      Maragheh: "مراغه",
      maragheh: "مراغه",
      Sabzevar: "سبزوار",
      sabzevar: "سبزوار",
      Amol: "آمل",
      amol: "آمل",
      Babol: "بابل",
      babol: "بابل",
      Qaemshahr: "قائم‌شهر",
      qaemshahr: "قائم‌شهر",
      Saveh: "ساوه",
      saveh: "ساوه",
      Abadan: "آبادان",
      abadan: "آبادان",
      Dezful: "دزفول",
      dezful: "دزفول",
      Khorramshahr: "خرمشهر",
      khorramshahr: "خرمشهر",
      Behbahan: "بهبهان",
      behbahan: "بهبهان",
      Borujerd: "بروجرد",
      borujerd: "بروجرد",
      Malayer: "ملایر",
      malayer: "ملایر",
      Nahavand: "نهاوند",
      nahavand: "نهاوند",
      Kangavar: "کنگاور",
      kangavar: "کنگاور",
      "Torbat-e Heydarieh": "تربت حیدریه",
      "torbat-e heydarieh": "تربت حیدریه",
      "Torbat-e Jam": "تربت جام",
      "torbat-e jam": "تربت جام",
      Neyshabur: "نیشابور",
      neyshabur: "نیشابور",
      Gonabad: "گناباد",
      gonabad: "گناباد",
      Kashmar: "کاشمر",
      kashmar: "کاشمر",
      Taybad: "تایباد",
      taybad: "تایباد",
      Esfarayen: "اسفراین",
      esfarayen: "اسفراین",
      Shirvan: "شیروان",
      shirvan: "شیروان",
      Fariman: "فریمان",
      fariman: "فریمان",
      Chenaran: "چناران",
      chenaran: "چناران",
      Quchan: "قوچان",
      quchan: "قوچان",
    };

    // بررسی در mapping (case-insensitive)
    const lowerName = normalizedName.toLowerCase();
    if (cityMap[normalizedName]) {
      return cityMap[normalizedName];
    }
    if (cityMap[lowerName]) {
      return cityMap[lowerName];
    }

    // بررسی اگر نام شهر در object است (مثل {name: "Sanandaj"})
    if (typeof cityName === "object" && cityName.name) {
      const objName = String(cityName.name).trim().toLowerCase();
      if (cityMap[objName]) {
        return cityMap[objName];
      }
    }

    // اگر نام از قبل فارسی است، همان را برگردان
    return normalizedName;
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
