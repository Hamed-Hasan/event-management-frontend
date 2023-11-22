"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IUserInfo } from "@/interfaces/global";
import { addFeedback } from "@/schemas/global";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const ProvideFeedback = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = getUserInfo() as IUserInfo;

  const handleAddFeedback = async (data: any) => {
    if (user?.id) {
      setIsLoading(true);

      data.userId = user.id;

      const result = await axiosInstance.post("/feedbacks", data);

      const response = result?.data;
      if (response?.statusCode === 200) {
        message.success(response.message);
        setIsLoading(false);
      }
      // @ts-ignore
      else if (!result?.success) {
        setIsLoading(false);
        message.error(
          // @ts-ignore
          result?.message || "Something went wrong try again later"
        );
      }
    } else {
      message.error("You have to login to create event");
    }
  };

  return (
    <div>
      <ActionBar title="Provide Feedback" />
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
            submitHandler={handleAddFeedback}
            resolver={yupResolver(addFeedback)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 16,
              }}
            >
              <Col xs={24} md={24}>
                <FormInput
                  name="feedback"
                  label="Your feedback"
                  size="large"
                  type="text-area"
                  rows={8}
                />
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
                Provide Feedback
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProvideFeedback;
