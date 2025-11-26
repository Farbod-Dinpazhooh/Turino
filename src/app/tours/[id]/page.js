import serverFetch from "@/core/services/http";
import ReserveButton from "@/components/atoms/ReserveButton";
import Image from "next/image";
import styles from "./page.module.css";

async function TourDetails({ params }) {
  // در Next.js 15، params باید await شود
  const { id } = await params;

  const data = await serverFetch(`/tour/${id}`, null, {
    cache: "no-store",
    method: "GET",
  });

  if (!data || data === false) {
    return (
      <div className={styles.error_container}>
        <h1>تور یافت نشد</h1>
      </div>
    );
  }

  // دریافت تصویر تور
  const tourImage =
    data?.image ||
    data?.imageUrl ||
    data?.images?.[0] ||
    data?.destination?.image ||
    "/placeholder-tour.jpg";

  // محاسبه مدت زمان (روز و شب)
  let duration = data?.duration || data?.days || data?.dayCount || 0;

  // اگر duration وجود ندارد، از startDate و endDate محاسبه کن
  if (duration === 0 && data?.startDate && data?.endDate) {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    duration = diffDays;
  }

  const days = duration;
  const nights = duration > 0 ? duration - 1 : 0;

  // ویژگی‌های تور - همیشه نمایش داده می‌شوند
  const features = [
    { icon: "/leader.svg", label: "تور لیدر از مبدا" },
    { icon: "/plan.svg", label: "برنامه سفر" },
    { icon: "/zemanat.svg", label: "تضمین کیفیت" },
  ];

  // قیمت
  const price =
    data?.price ||
    data?.cost ||
    data?.amount ||
    data?.totalPrice ||
    data?.basePrice ||
    0;
  const formattedPrice =
    price > 0 ? new Intl.NumberFormat("fa-IR").format(price) : "0";

  return (
    <div className={styles.container}>
      {/* تصویر تور */}
      <div className={styles.image_container}>
        <Image
          src={tourImage}
          alt={data.title || "تور"}
          fill
          className={styles.image}
          priority
          sizes="100vw"
        />
      </div>

      {/* عنوان و مدت زمان */}
      <div className={styles.header}>
        <h1 className={styles.title}>{data.title || "تور"}</h1>
        {duration > 0 ? (
          <div className={styles.duration}>
            {days} روز و {nights} شب
          </div>
        ) : (
          <div className={styles.duration}>مدت زمان مشخص نشده</div>
        )}
      </div>

      {/* ویژگی‌های تور */}
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature_item}>
            <Image
              src={feature.icon}
              alt={feature.label}
              width={20}
              height={20}
              className={styles.feature_icon}
            />
            <span className={styles.feature_label}>{feature.label}</span>
          </div>
        ))}
      </div>

      {/* قیمت و دکمه رزرو */}
      <div className={styles.footer}>
        <div className={styles.price_section}>
          <div className={styles.price}>{formattedPrice}</div>
          <div className={styles.currency}>تومان</div>
        </div>
        <div className={styles.button_section}>
          <ReserveButton id={id} />
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
