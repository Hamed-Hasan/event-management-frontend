import AddCategory from "@/components/ui/Dashboard/Admin/Events/AddCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add a category - GreenEcovents",
  description: "Add a category of GreenEcovents",
};

const AddCategoryPage = () => {
  return (
    <>
      <AddCategory />
    </>
  );
};

export default AddCategoryPage;
