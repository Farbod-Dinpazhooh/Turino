import { useRouter, useSearchParams } from "next/navigation";

const useQuery = () => {
  const router = useRouter();

  // searchParams: پارامترهای query string از URL را دریافت می‌کند
  const searchParams = useSearchParams();

  // params: یک URLSearchParams object برای مدیریت query parameters ایجاد می‌کند
  const params = new URLSearchParams(String(searchParams));

  // addQuery: یک query parameter جدید به URL اضافه می‌کند یا مقدار موجود را به‌روزرسانی می‌کند
  const addQuery = (key, value) => {
    value = String(value);
    params.set(key, value);
    router.replace(`?${params}`);
  };

  // removeQuery: یک query parameter را از URL حذف می‌کند
  const removeQuery = (key) => {
    params.delete(key);
    router.replace(`?${params}`);
  };

  // getQuery: مقدار یک query parameter را از URL برمی‌گرداند
  const getQuery = (key) => {
    return params.get(key);
  };

  return { addQuery, removeQuery, getQuery };
};

export { useQuery };
export default useQuery;
