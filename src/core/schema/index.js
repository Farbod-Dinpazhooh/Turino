import { object, string } from "yup";

export const bankFormSchema = object({
  shaba_code: string().required("شماره شبا الزامی است"),
  debitCard_code: string()
    .length(16, "شماره کارت باید 16 رقم باشد")
    .required("شماره کارت الزامی است"),
  accountIdentifier: string()
    .min(8, "شماره حساب باید حداقل 8 رقم باشد")
    .max(16, "شماره حساب باید حداکثر 16 رقم باشد")
    .required("شماره حساب الزامی است"),
});

export const emailFormSchema = object({
  email: string()
    .email("فرمت ایمیل صحیح نیست")
    .required("ایمیل الزامی است"),
});

export const personalInfoSchema = object({
  fullName: string().required("نام و نام خانوادگی الزامی است"),
  nationalId: string()
    .matches(/^[0-9]{10}$/, "کد ملی باید 10 رقم باشد")
    .required("کد ملی الزامی است"),
  gender: string()
    .oneOf(["male", "female"], "جنسیت معتبر نیست")
    .required("جنسیت الزامی است"),
  birthDate: string().required("تاریخ تولد الزامی است"),
});
