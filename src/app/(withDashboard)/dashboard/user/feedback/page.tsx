import ProvideFeedback from "@/components/ui/Dashboard/User/Feedback/ProvideFeedback";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Provide feedback - GreenEcovents",
  description: "Provide feedback of GreenEcovents",
};

const ProvideFeedbackPage = () => {
  return (
    <>
      <ProvideFeedback />
    </>
  );
};

export default ProvideFeedbackPage;
