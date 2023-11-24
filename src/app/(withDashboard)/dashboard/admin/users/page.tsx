import ManageUsers from "@/components/ui/Dashboard/Admin/User/ManageUsers";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manage users - GreenEcovents",
  description: "Manage users of GreenEcovents",
};
const ManageUsersPage = () => {
  return (
    <>
      <ManageUsers />
    </>
  );
};

export default ManageUsersPage;
