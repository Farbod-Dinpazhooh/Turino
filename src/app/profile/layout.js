import AuthProvider from "@/components/partials/provider/AuthProvider";

function ProfileLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ProfileLayout;
