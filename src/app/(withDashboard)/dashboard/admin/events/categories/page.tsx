import ManageCategories from "@/components/ui/Dashboard/Admin/Events/ManageCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage categories - GreenEcovents",
  description: "Manage categories of GreenEcovents",
};

const ManageCategoriesPage = () => {
  return (
    <>
      <ManageCategories />
    </>
  );
};

export default ManageCategoriesPage;
