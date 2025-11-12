// "use client";

import AuthForm from "@/components/templates/AuthForm";
import TourList from "@/components/templates/TourList";
import serverFetch from "@/core/services/http";

export default async function Home() {
  const data = await serverFetch("/tour", {}, { cache: "no-store" });


  return (
    <div>
      <p>This is turino</p>
      <AuthForm />
      <TourList tourData={data}/> 
    </div>
  );
}
