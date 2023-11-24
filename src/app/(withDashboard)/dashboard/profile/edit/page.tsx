import EditProfile from "@/components/ui/Dashboard/Profile/EditProfile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Edit Profile - GreenEcovents",
  description: "Edit Profile of GreenEcovents",
};

const EditProfilePage = () => {
  return (
    <>
      <EditProfile />
    </>
  );
};

export default EditProfilePage;
