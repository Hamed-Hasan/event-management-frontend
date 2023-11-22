"use client";
import ContentWriter from "@/components/Forms/ContentWriter";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UploadImage from "@/components/Forms/UploadImage";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IUserInfo } from "@/interfaces/global";
import { addBlogSchema } from "@/schemas/global";
import { getUserInfo } from "@/services/auth.service";
import uploadImage from "@/utils/uploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddBlog = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = getUserInfo() as IUserInfo;

  const router = useRouter();

  const handleAddBlog = async (data: any) => {
    if (user?.id) {
      setIsLoading(true);
      if (data.image) {
        const image = await uploadImage(data?.image);
        data.image = image;
      }

      data.userId = user.id;

      const result = await axiosInstance.post("/blogs", data);

      const response = result?.data;
      if (response?.statusCode === 200) {
        message.success(response.message);
        setIsLoading(false);
        router.push("/dashboard/admin/blogs");
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
      <GEDashboardBreadCrumb
        items={[
          {
            label: "Blog",
            link: "/dashboard/admin/blogs",
          },
        ]}
      />
      <ActionBar title="Add Blog" />
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
            submitHandler={handleAddBlog}
            resolver={yupResolver(addBlogSchema)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 16,
              }}
            >
              <Col xs={24} md={24}>
                <Typography.Paragraph
                  style={{
                    marginBottom: 10,
                    display: "inline-block",
                  }}
                >
                  Blog Cover
                </Typography.Paragraph>
                <UploadImage name="image" />
              </Col>
              <Col xs={24} md={24}>
                <FormInput
                  name="title"
                  type="text"
                  label="Blog title"
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
                <ContentWriter name="content" label="Content" />
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
                Add Blog
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
