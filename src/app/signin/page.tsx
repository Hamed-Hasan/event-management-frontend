import SignIn from "@/components/ui/Authentication/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - GreenEcovents",
  description: "Sign In to GreenEcovents",
};
const SignInPage = () => {
  return (
    <>
      <SignIn />
    </>
  );
};

export default SignInPage;
