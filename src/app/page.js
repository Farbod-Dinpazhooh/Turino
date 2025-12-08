// "use client";

import TourList from "@/components/templates/TourList";
import SearchForm from "@/components/templates/SearchForm";
import HeroBanner from "@/components/templates/HeroBanner";
import HeroTitle from "@/components/templates/HeroTitle";
import serverFetch from "@/core/services/http";

export default async function Home({ searchParams }) {
  // در Next.js 15، searchParams باید await شود
  const params = await searchParams;
  const data = await serverFetch("/tour", params, { cache: "no-store" });

  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <HeroBanner />
      <HeroTitle />
      <div style={{ padding: "0 1rem", boxSizing: "border-box" }}>
        <SearchForm />
        <TourList tourData={data} />
      </div>
    </div>
  );
}
