"use client";
import ContentWriter from "@/components/Forms/ContentWriter";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { sendEmailToSubscribersSchema } from "@/schemas/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SendEmailToSubscribers = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSendEmail = async (data: any) => {
    setIsLoading(true);

    const result = await axiosInstance.post("/subscribers/send", data);

    const response = result?.data;
    if (response?.statusCode === 200) {
      message.success(response.message);
      setIsLoading(false);
      router.push("/dashboard/admin/subscribers");
    }
    // @ts-ignore
    else if (!result?.success) {
      setIsLoading(false);
      message.error(
        // @ts-ignore
        result?.message || "Something went wrong try again later"
      );
    }
  };

  return (
    <div>
      <GEDashboardBreadCrumb
        items={[
          {
            label: "Subscribers",
            link: "/dashboard/admin/subscribers",
          },
        ]}
      />
      <ActionBar title="Send email to all subscribers." />
      <div className="container">
        <div
          style={{
            margin: "auto",
            marginTop: 20,
            padding: 20,
            border: "1px solid #EDF4ED",
            borderRadius: 10,
            boxShadow: "5px 5px 40px 0px rgba(0,0,0,0.1)",
          }}
        >
          <Form
            submitHandler={handleSendEmail}
            resolver={yupResolver(sendEmailToSubscribersSchema)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 16,
              }}
            >
              <Col xs={24} md={24}>
                <FormInput
                  name="subject"
                  type="text"
                  label="Subject"
                  size="large"
                />
              </Col>
              <Col
                style={{
                  margin: "20px 0",
                }}
                xs={24}
                md={24}
              >
                <ContentWriter name="message" label="Message" />
              </Col>
            </Row>

            <div
              style={{
                width: "60%",
                margin: "auto",
                marginTop: 20,
              }}
            >
              <Button
                style={{
                  width: "100%",
                }}
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                Send Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SendEmailToSubscribers;
