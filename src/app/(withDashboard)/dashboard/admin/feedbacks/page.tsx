import Feedbacks from "@/components/ui/Dashboard/Admin/feedbacks/FeedbackList";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Feedbacks - GreenEcovents",
  description: "Feedbacks of GreenEcovents",
};
const FeedbackPage = () => {
  return (
    <>
      <Feedbacks />
    </>
  );
};

export default FeedbackPage;
