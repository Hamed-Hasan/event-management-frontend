import AddAdmin from "@/components/ui/Dashboard/SuperAdmin/Admin/AddAdmin";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add a admin - GreenEcovents",
  description: "Add a admin of GreenEcovents",
};

const AddAdminPage = () => {
  return (
    <>
      <AddAdmin />
    </>
  );
};

export default AddAdminPage;
