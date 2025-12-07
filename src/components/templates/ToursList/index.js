"use client";

import TourCard from "../TourCard";

function ToursList({ tours }) {
  if (!tours || tours.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3 className="empty-title">هیچ توری یافت نشد</h3>
        <p className="empty-description">
          شما هنوز هیچ توری خریداری نکرده‌اید
        </p>
      </div>
    );
  }

  return (
    <div className="tours-list">
      <div className="tours-header">
        <h2 className="tours-title">تورهای من</h2>
        <span className="tours-count">
          {tours.length} تور
        </span>
      </div>
      
      <div className="tours-grid">
        {tours.map((tour) => (
          <TourCard key={tour.id || tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default ToursList;

