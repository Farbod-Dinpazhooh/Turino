"use client";

import { Suspense } from "react";
import SearchForm from "@/components/templates/SearchForm";
import TourList from "@/components/templates/TourList";
import { useGetToursByQuery } from "@/core/services/queries";
import { useSearchParams } from "next/navigation";
import QueryString from "qs";

function SearchContent() {
  const searchParams = useSearchParams();

  // تبدیل searchParams به object
  const queryParams = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });

  // تبدیل به فرمت مورد نیاز برای useGetToursByQuery
  const query = QueryString.parse(QueryString.stringify(queryParams));

  const { data: filteredTours, isPending } = useGetToursByQuery(query);

  // استخراج آرایه تورها از response
  const tours = filteredTours?.data || filteredTours || [];

  return (
    <div>
      <h1>نتایج جستجو</h1>
      <SearchForm />

      {isPending && <p>در حال بارگذاری...</p>}

      {!isPending && <TourList tourData={tours} />}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <SearchContent />
    </Suspense>
  );
}
