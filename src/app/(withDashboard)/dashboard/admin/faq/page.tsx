import ManageFAQs from "@/components/ui/Dashboard/Admin/Contents/Faq/ManageFaqs";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manage FAQs - GreenEcovents",
  description: "Manage Faqs of GreenEcovents",
};

const ManageFAQsPage = () => {
  return (
    <>
      <ManageFAQs />
    </>
  );
};

export default ManageFAQsPage;
