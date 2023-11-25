import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IPage } from "@/interfaces/global";
import { Spin } from "antd";

import GEBreadCrumb from "@/components/ui/GEBreadCrumb";
import PageDetails from "@/components/ui/PageDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - GreenEcovents",
  description: "Terms and Conditions of GreenEcovents",
};

const PrivacyPolicy = async () => {
  const result = (
    await axiosInstance.get(`/pages/b80f046f-a109-43c7-b804-ad462bf1c171`)
  )?.data as IApiResponse;
  const page: IPage = result?.data;

  if (!page) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <GEBreadCrumb
        title="Terms and Conditions"
        items={[
          {
            label: "Terms and Conditions",
          },
        ]}
      />
      <div className="container">
        <PageDetails content={page.content} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
