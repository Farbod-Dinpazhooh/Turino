import Link from "next/link";

function PaymentPage({ searchParams }) {
  if (searchParams.status === "success")
    return (
      <div>
        <p>پرداخت با موفقیت انجام شد</p>
        <Link href="/profile">بازگشت به صفحه اصلی</Link>
      </div>
    );

  return (
    <div>
      <p>پرداخت با شکست مواجه شد</p>
    </div>
  );
}

export default PaymentPage;
