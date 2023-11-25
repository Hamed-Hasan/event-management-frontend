import Celebrate from "@/components/ui/AboutUs/Celebrate";
import CountUp from "@/components/ui/AboutUs/CountUp";
import FAQs from "@/components/ui/AboutUs/FAQs";
import OurApproach from "@/components/ui/AboutUs/OurApproach";
import Team from "@/components/ui/AboutUs/Team";
import WhyChooseUs from "@/components/ui/AboutUs/WhyChooseUs";
import GEBreadCrumb from "@/components/ui/GEBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - GreenEcovents",
  description: "About Us of GreenEcovents",
};

const AboutUs = () => {
  return (
    <div>
      <GEBreadCrumb
        title="Who We Are"
        items={[
          {
            label: "About Us",
          },
        ]}
      />
      <>
        <OurApproach />
        <WhyChooseUs />
        <CountUp />
        <Celebrate />
        <Team />
        <FAQs />
      </>
    </div>
  );
};

export default AboutUs;
