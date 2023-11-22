"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import Rating from "@/components/Forms/Rating";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IUserInfo } from "@/interfaces/global";
import { giveReviewSchema } from "@/schemas/global";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const GiveReview = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const user = getUserInfo() as IUserInfo;

  const { id } = useParams();

  const handleGiveReview = async (data: any) => {
    if (user?.id) {
      setIsLoading(true);

      data.userId = user.id;
      data.eventId = id;

      const result = await axiosInstance.post("/reviews", data);

      const response = result?.data;
      if (response?.statusCode === 200) {
        message.success(response.message);
        setIsLoading(false);
        router.push("/dashboard/user/bookings");
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
      message.error("You have to login to give review");
    }
  };

  return (
    <div>
      <GEDashboardBreadCrumb
        items={[
          {
            label: "Bookings",
            link: "/dashboard/user/bookings",
          },
        ]}
      />
      <ActionBar title="Give Review" />
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
            submitHandler={handleGiveReview}
            resolver={yupResolver(giveReviewSchema)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 16,
              }}
            >
              <Col xs={24} md={24}>
                <FormInput
                  name="review"
                  label="Review"
                  type="text-area"
                  rows={4}
                />
              </Col>
              <Col xs={24} md={24}>
                <Rating name="rating" label="Rating" />
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
                Give Review
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GiveReview;
