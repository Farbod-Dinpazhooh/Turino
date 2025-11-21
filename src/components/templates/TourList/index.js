import Link from "next/link";
import React from "react";
import styles from "./TourList.module.css";

// تابع برای ساخت جزئیات تور
const buildTourDetails = (tour) => {
  const details = [];

  // ماه و تاریخ
  if (tour?.date?.startDate) {
    const date = new Date(tour.date.startDate);
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
    const month = monthNames[date.getMonth()];
    details.push(`${month} ماه .`);
  } else if (tour?.month) {
    details.push(`${tour.month} ماه .`);
  }

  // تعداد روزها
  if (tour?.duration) {
    details.push(`${tour.duration} روزه`);
  } else if (tour?.days) {
    details.push(`${tour.days} روزه`);
  }

  // نوع حمل و نقل
  if (tour?.transportation) {
    details.push(tour.transportation);
  } else if (tour?.flight) {
    details.push("پرواز");
  }

  // نوع هتل
  if (tour?.hotel) {
    const hotelText =
      typeof tour.hotel === "string"
        ? `هتل ${tour.hotel}`
        : `هتل ${tour.hotel.stars || tour.hotel.rating || ""} ستاره`;
    details.push(hotelText);
  } else if (tour?.hotelStars) {
    details.push(`هتل ${tour.hotelStars} ستاره`);
  }

  // اگر جزئیات از قبل آماده است
  if (tour?.details && details.length === 0) {
    return tour.details;
  }

  return details.join(" - ") || "";
};

// تابع برای دریافت تصویر تور
const getTourImage = (tour) => {
  return (
    tour?.image ||
    tour?.imageUrl ||
    tour?.images?.[0] ||
    tour?.destination?.image ||
    "/placeholder-tour.jpg"
  );
};

// Mapping نام‌های انگلیسی به فارسی
const cityNameMap = {
  Tehran: "تهران",
  Sananndaj: "سنندج",
  Madrid: "مادرید",
  Isfahan: "اصفهان",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولر",
  Erbil: "هولير",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
  Kurdistan: "کردستان",
  Shiraz: "شیراز",
  Dubai: "دبی",
  Tabriz: "تبریز",
  Yazd: "یزد",
  Kashan: "کاشان",
  Qom: "قم",
  Mashhad: "مشهد",
  Kerman: "کرمان",
  BandarAbbas: "بندرعباس",
  Kish: "کیش",
  Qeshm: "قشم",
};

// تابع برای تبدیل نام شهر به فارسی
const getPersianName = (city) => {
  if (city?.nameFa) return city.nameFa;
  if (city?.name && cityNameMap[city.name]) return cityNameMap[city.name];
  return city?.name || "";
};

// تابع برای دریافت نام مقصد به فارسی
const getDestinationName = (tour) => {
  // اولویت 1: nameFa در destination
  if (tour?.destination?.nameFa) {
    return tour.destination.nameFa;
  }

  // اولویت 2: استفاده از getPersianName برای destination
  if (tour?.destination) {
    const persianName = getPersianName(tour.destination);
    if (persianName) return persianName;
  }

  // اولویت 3: بررسی title
  if (tour?.title) {
    // اگر title فارسی است (حاوی کاراکترهای فارسی)، مستقیماً استفاده کن
    const hasPersianChars = /[\u0600-\u06FF]/.test(tour.title);
    if (hasPersianChars) {
      return tour.title;
    }
    
    // اگر انگلیسی است، از cityNameMap استفاده کن
    const titleKey = tour.title.trim();
    if (cityNameMap[titleKey]) {
      return cityNameMap[titleKey];
    }
    
    // اگر title شامل "تور" است، آن را حذف کن و دوباره بررسی کن
    const titleWithoutTour = titleKey.replace(/^تور\s*/i, "").trim();
    if (titleWithoutTour && cityNameMap[titleWithoutTour]) {
      return cityNameMap[titleWithoutTour];
    }
  }

  // اولویت 4: استفاده از name در destination
  if (tour?.destination?.name) {
    const persianName = getPersianName({ name: tour.destination.name });
    if (persianName) return persianName;
  }

  // اولویت 5: اگر origin هم nameFa دارد، از آن استفاده کن
  if (tour?.origin?.nameFa) {
    return tour.origin.nameFa;
  }

  // در نهایت اگر هیچ کدام نبود
  return tour?.title || tour?.destination?.name || "تور";
};

function TourList({ tourData }) {
  if (!tourData?.length)
    return <p className={styles.tour_list_empty}>نتیجه ای یافت نشد</p>;

  return (
    <div className={styles.tour_list_container}>
      <h1 className={styles.tour_list_title}>همه تورها</h1>
      <main className={styles.tour_list}>
      {tourData?.map((tour) => (
          <section key={tour?.id} className={styles.tour_card}>
            <div className={styles.tour_image_wrapper}>
              <img
                src={getTourImage(tour)}
                alt={getDestinationName(tour)}
                className={styles.tour_image}
              />
            </div>
            <div className={styles.tour_content}>
              <h2 className={styles.tour_title}>{getDestinationName(tour)}</h2>
              <div className={styles.tour_details}>
                {buildTourDetails(tour) || "جزئیات تور در دسترس نیست"}
              </div>
              <div className={styles.tour_divider}></div>
              <div className={styles.tour_footer}>
                {tour?.price ? (
                  <div className={styles.tour_price_wrapper}>
                    <span className={styles.tour_price_number}>
                      {typeof tour.price === "number"
                        ? tour.price.toLocaleString("fa-IR")
                        : tour.price}
                    </span>
                    <span className={styles.tour_price_unit}>تومان</span>
                  </div>
                ) : (
                  <div className={styles.tour_price_wrapper}>
                    <span className={styles.tour_price_number}>قیمت نامشخص</span>
                  </div>
                )}
                <div className={styles.tour_button_wrapper}>
                  <Link
                    href={`/tours/${tour?.id}`}
                    className={styles.tour_button}
                  >
                    رزرو
                  </Link>
                </div>
              </div>
            </div>
        </section>
      ))}
    </main>
    </div>
  );
}

export default TourList;
