import ManageAdmins from "@/components/ui/Dashboard/SuperAdmin/Admin/ManageAdmins";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage admins - GreenEcovents",
  description: "Manage admins of GreenEcovents",
};

const ManageAdminsPage = () => {
  return (
    <>
      <ManageAdmins />
    </>
  );
};

export default ManageAdminsPage;
