import ChangePassword from "@/components/ui/Dashboard/Profile/ChangePassword";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password - GreenEcovents",
  description: "Change Password of GreenEcovents",
};

const ChangePasswordPage = () => {
  return (
    <div>
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
