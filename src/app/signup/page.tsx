import SignUp from "@/components/ui/Authentication/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - GreenEcovents",
  description: "Sign Up to GreenEcovents",
};

const SignUpPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
