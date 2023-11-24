import AddFaq from "@/components/ui/Dashboard/Admin/Contents/Faq/AddFaq";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add a FAQ - GreenEcovents",
  description: "Add a FAQ of GreenEcovents",
};
const AddFaqPage = () => {
  return (
    <div>
      <AddFaq />
    </div>
  );
};

export default AddFaqPage;
