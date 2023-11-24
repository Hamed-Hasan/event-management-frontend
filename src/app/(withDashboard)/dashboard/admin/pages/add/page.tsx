import AddPage from "@/components/ui/Dashboard/Admin/Pages/AddPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a page - GreenEcovents",
  description: "Add a page of GreenEcovents",
};

const AddAPage = () => {
  return (
    <div>
      <AddPage />
    </div>
  );
};

export default AddAPage;
