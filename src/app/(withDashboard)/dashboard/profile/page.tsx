import ViewProfile from "@/components/ui/Dashboard/Profile/ViewProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Profile - GreenEcovents",
  description: "View Profile of GreenEcovents",
};

const ViewProfilePage = () => {
  return (
    <>
      <ViewProfile />
    </>
  );
};

export default ViewProfilePage;
