// "use client";

import AuthForm from "@/components/templates/AuthForm";
import TourList from "@/components/templates/TourList";
import SearchForm from "@/components/templates/SearchForm";
import serverFetch from "@/core/services/http";

export default async function Home({ searchParams }) {
  // در Next.js 15، searchParams باید await شود
  const params = await searchParams;
  const data = await serverFetch("/tour", params, { cache: "no-store" });

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <p>This is turino</p>
      <AuthForm />
      <SearchForm />
      <TourList tourData={data} />
    </div>
  );
}
