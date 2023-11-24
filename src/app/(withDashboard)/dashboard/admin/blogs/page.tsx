import ManageBlogs from "@/components/ui/Dashboard/Admin/Contents/Blog/ManageBlogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage blogs - GreenEcovents",
  description: "Manage blogs of GreenEcovents",
};

const ManageBlogsPage = () => {
  return (
    <>
      <ManageBlogs />
    </>
  );
};

export default ManageBlogsPage;
