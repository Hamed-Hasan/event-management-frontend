import AddBlog from "@/components/ui/Dashboard/Admin/Contents/Blog/AddBlog";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add a blog - GreenEcovents",
  description: "Add a blog of GreenEcovents",
};
const AddBlogPage = () => {
  return (
    <>
      <AddBlog />
    </>
  );
};

export default AddBlogPage;
