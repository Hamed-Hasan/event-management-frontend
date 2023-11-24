import GiveReview from "@/components/ui/Dashboard/User/Review/GiveReview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give review - GreenEcovents",
  description: "Give review of GreenEcovents",
};

const GiveReviewPage = () => {
  return (
    <>
      <GiveReview />
    </>
  );
};

export default GiveReviewPage;
