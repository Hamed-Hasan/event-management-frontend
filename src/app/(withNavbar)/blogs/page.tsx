import Blogs from "@/components/ui/Blog/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs - GreenEcovents",
  description: "Blogs of GreenEcovents",
};

const BlogsPage = () => {
  return (
    <>
      <Blogs />
    </>
  );
};

export default BlogsPage;
