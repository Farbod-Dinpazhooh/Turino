"use client";

import AccountInfoForm from "@/components/templates/AccountInfoForm";
import PersonalInfoForm from "@/components/templates/PersonalInfoForm";
import BankAccountForm from "@/components/templates/BankAccountForm";
import { useGetUserData } from "@/core/services/queries";

function ProfilePage() {
  
  const { data } = useGetUserData();

  return (
    <div>
      <AccountInfoForm />
      <PersonalInfoForm />
      <BankAccountForm />
    </div>
  );
}

export default ProfilePage;
