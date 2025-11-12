import Link from "next/link";
import React from "react";

function TourList({ tourData }) {
  if (!tourData?.length) return <p>نتیجه ای یافت نشد</p>;
  return (
    <main>
      {tourData?.map((tour) => (
        <section key={tour?.id}>
          <h2>{tour?.title}</h2>
          <Link href={`/tours/${tour?.id}`}>رزرو</Link>
        </section>
      ))}
    </main>
  );
}

export default TourList;
