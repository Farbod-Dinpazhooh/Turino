"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "zaman";
import { useGetTours, useGetToursByQuery } from "@/core/services/queries";
import QueryString from "qs";

import { flattenObject } from "@/core/utils/helpers";
import { useQuery } from "@/core/hooks/query";

// Mapping نام‌های انگلیسی به فارسی
const cityNameMap = {
  Tehran: "تهران",
  Sananndaj: "سنندج",
  Madrid: "مادرید",
  Isfahan: "اصفهان",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Gilan: "گیلان",
  Italy: "ایتالیا",
};

// تابع برای تبدیل نام شهر به فارسی
const getPersianName = (city) => {
  if (city?.nameFa) return city.nameFa;
  if (city?.name && cityNameMap[city.name]) return cityNameMap[city.name];
  return city?.name || "";
};

function SearchForm() {
  const [query, setQuery] = useState({});

  const router = useRouter();
  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      originId: "",
      destinationId: "",
      date: null,
    },
  });
  const { data: filteredTours, isPending: isFiltering } =
    useGetToursByQuery(query);
  const { getQuery } = useQuery();
  const { data: toursData, isLoading } = useGetTours();
  const searchParams = useSearchParams();

  // استخراج مقادیر query string از URL
  const originIdFromUrl = searchParams.get("originId");
  const destinationIdFromUrl = searchParams.get("destinationId");
  const dateStartDateFromUrl = searchParams.get("date.startDate");
  const dateEndDateFromUrl = searchParams.get("date.endDate");

  // وقتی URL تغییر می‌کند، فرم را با مقادیر query string به‌روزرسانی کن
  useEffect(() => {
    // ساخت object برای reset کردن فرم
    const formValues = {};

    // اضافه کردن originId اگر در URL وجود دارد
    if (originIdFromUrl) {
      formValues.originId = originIdFromUrl;
    } else {
      formValues.originId = "";
    }

    // اضافه کردن destinationId اگر در URL وجود دارد
    if (destinationIdFromUrl) {
      formValues.destinationId = destinationIdFromUrl;
    } else {
      formValues.destinationId = "";
    }

    // اگر تاریخ در URL وجود دارد، آن را به فرم اضافه کن
    if (dateStartDateFromUrl || dateEndDateFromUrl) {
      try {
        const startDate = dateStartDateFromUrl
          ? new Date(dateStartDateFromUrl)
          : null;
        const endDate = dateEndDateFromUrl
          ? new Date(dateEndDateFromUrl)
          : null;

        // بررسی اینکه تاریخ‌ها معتبر هستند
        const isValidStartDate = startDate && !isNaN(startDate.getTime());
        const isValidEndDate = endDate && !isNaN(endDate.getTime());

        if (isValidStartDate || isValidEndDate) {
          formValues.date = {
            startDate: isValidStartDate ? startDate : null,
            endDate: isValidEndDate ? endDate : null,
          };
        } else {
          formValues.date = null;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error parsing date from URL:", error);
        formValues.date = null;
      }
    } else {
      formValues.date = null;
    }

    // همیشه فرم را reset کن
    reset(formValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    originIdFromUrl,
    destinationIdFromUrl,
    dateStartDateFromUrl,
    dateEndDateFromUrl,
  ]); // فقط وقتی مقادیر واقعی تغییر می‌کنند اجرا می‌شود

  // مشاهده تغییرات originId
  const selectedOriginId = watch("originId");

  // استخراج لیست منحصر به فرد همه شهرها (هم از origin و هم از destination)
  const allCities = useMemo(() => {
    // response یک آرایه مستقیم است یا در data قرار دارد
    const tours = toursData?.data || toursData || [];
    if (!Array.isArray(tours) || tours.length === 0) return [];

    const uniqueCities = new Map();

    // اضافه کردن همه origin ها
    tours.forEach((tour) => {
      if (tour.origin && !uniqueCities.has(tour.origin.id)) {
        uniqueCities.set(tour.origin.id, tour.origin);
      }
    });

    // اضافه کردن همه destination ها
    tours.forEach((tour) => {
      if (tour.destination && !uniqueCities.has(tour.destination.id)) {
        uniqueCities.set(tour.destination.id, tour.destination);
      }
    });

    return Array.from(uniqueCities.values());
  }, [toursData]);

  // فیلتر کردن مقصدها بر اساس مبدای انتخاب شده
  const destinations = useMemo(() => {
    // response یک آرایه مستقیم است یا در data قرار دارد
    const tours = toursData?.data || toursData || [];
    if (!Array.isArray(tours) || tours.length === 0) return [];

    // اگر مبدا انتخاب نشده، همه مقصدها را نشان بده
    if (!selectedOriginId) {
      const allDestinations = new Map();
      tours.forEach((tour) => {
        if (tour.destination?.id) {
          const destId = String(tour.destination.id);
          if (!allDestinations.has(destId)) {
            allDestinations.set(destId, tour.destination);
          }
        }
      });
      return Array.from(allDestinations.values());
    }

    // پیدا کردن تمام تورهایی که مبدایشان با originId انتخاب شده یکسان است
    const filteredTours = tours.filter(
      (tour) =>
        tour.origin?.id && String(tour.origin.id) === String(selectedOriginId)
    );

    // استخراج مقصدهای منحصر به فرد از تورهای فیلتر شده
    const uniqueDestinations = new Map();
    filteredTours.forEach((tour) => {
      if (tour.destination?.id) {
        const destId = String(tour.destination.id);
        if (!uniqueDestinations.has(destId)) {
          uniqueDestinations.set(destId, tour.destination);
        }
      }
    });

    return Array.from(uniqueDestinations.values());
  }, [toursData, selectedOriginId]);

  // وقتی مبدا تغییر می‌کند، مقصد را ریست کن
  const handleOriginChange = (e) => {
    const value = e.target.value;
    setValue("originId", value);
    setValue("destinationId", ""); // ریست کردن مقصد
  };

  const submitHandler = (formData) => {
    if (!formData || typeof formData !== "object") return;

    // حذف فیلدهای undefined و null از formData
    const cleanedData = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];

      // اگر value undefined یا null است، آن را نادیده بگیر
      if (value === undefined || value === null) return;

      // اگر date است، بررسی کن که آیا startDate یا endDate وجود دارد
      if (key === "date") {
        // بررسی اینکه آیا date یک object معتبر است و startDate یا endDate دارد
        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          (value.startDate || value.endDate) &&
          (value.startDate !== null || value.endDate !== null)
        ) {
          cleanedData[key] = value;
        }
        // اگر date null یا undefined است یا ساختار معتبر ندارد، آن را اضافه نکن
      } else {
        // برای سایر فیلدها، اگر مقدار معتبر است اضافه کن
        if (value !== "" && value !== "undefined" && value !== "null") {
          cleanedData[key] = value;
        }
      }
    });

    const flattened = flattenObject(cleanedData);

    // تنظیم query برای state
    setQuery(flattened || cleanedData);

    // ساخت query string برای URL (فقط مقادیر معتبر)
    const queryString = QueryString.stringify(flattened || cleanedData);

    // اضافه کردن query به URL
    router.push(queryString ? `/search?${queryString}` : `/search`);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {/* Select مبدا - همه شهرها */}
      <select
        {...register("originId", { onChange: handleOriginChange })}
        disabled={isLoading}
        value={watch("originId") || ""}
      >
        <option value="">انتخاب مبدا</option>
        {allCities.map((city) => (
          <option key={city.id} value={city.id}>
            {getPersianName(city)}
          </option>
        ))}
      </select>

      {/* Select مقصد - اگر مبدا انتخاب شده فقط مقصدهای مرتبط، وگرنه همه مقصدها */}
      <select
        key={selectedOriginId || "empty"}
        {...register("destinationId")}
        disabled={isLoading || (selectedOriginId && destinations.length === 0)}
        value={watch("destinationId") || ""}
      >
        <option value="">انتخاب مقصد</option>
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {getPersianName(destination)}
            </option>
          ))
        ) : selectedOriginId ? (
          <option value="" disabled>
            مقصدی برای این مبدا یافت نشد
          </option>
        ) : null}
      </select>

      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              onChange={(e) => {
                // zaman DatePicker در range mode مقدار را به صورت { from, to } برمی‌گرداند
                const startDate = e?.from || null;
                const endDate = e?.to || null;

                if (startDate || endDate) {
                  onChange({
                    startDate: startDate,
                    endDate: endDate,
                  });
                } else {
                  onChange(null);
                }
              }}
              range
              value={
                value &&
                typeof value === "object" &&
                !Array.isArray(value) &&
                (value.startDate || value.endDate)
                  ? {
                      from: value.startDate || null,
                      to: value.endDate || null,
                    }
                  : undefined
              }
            />
          );
        }}
      />
      <input type="submit" className="bg-green-500 text-white p-2 rounded-md" />
    </form>
  );
}

export default SearchForm;
