"use client";

function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <div className="tour-image">
        {tour.image ? (
          <img src={tour.image} alt={tour.title} />
        ) : (
          <div>تصویر تور</div>
        )}
      </div>

      <div className="tour-info">
        <h3 className="tour-title">{tour.title}</h3>

        <div className="tour-details">
          <div className="detail-item">
            <span className="label">تاریخ رفت:</span>
            <span className="value">{tour.startDate || "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">تاریخ برگشت:</span>
            <span className="value">{tour.endDate || "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">مدت سفر:</span>
            <span className="value">{tour.duration || "-"}</span>
          </div>

          <div className="detail-item">
            <span className="label">مبدا:</span>
            <span className="value">
              {tour.origin?.name || tour.origin || "-"}
            </span>
          </div>

          <div className="detail-item">
            <span className="label">مقصد:</span>
            <span className="value">
              {tour.destination?.name || tour.destination || "-"}
            </span>
          </div>
        </div>

        <div className="tour-footer">
          <div className="price">
            <span className="price-label">قیمت:</span>
            <span className="price-value">
              {tour.price?.toLocaleString() || "0"} تومان
            </span>
          </div>

          <div className="status">
            <span className="status-label">وضعیت:</span>
            <span className={`status-badge ${tour.status}`}>
              {tour.status === "in_basket" && "در سبد خرید"}
              {tour.status === "completed" && "تکمیل شده"}
              {tour.status === "pending" && "در انتظار"}
              {tour.status === "cancelled" && "لغو شده"}
              {!tour.status && "نامشخص"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
