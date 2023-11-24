import ManagePages from "@/components/ui/Dashboard/Admin/Pages/ManagePages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage pages - GreenEcovents",
  description: "Manage pages of GreenEcovents",
};

const ManagePagesPage = () => {
  return (
    <>
      <ManagePages />
    </>
  );
};

export default ManagePagesPage;
