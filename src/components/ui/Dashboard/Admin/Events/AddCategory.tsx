"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { addCategorySchema } from "@/schemas/events";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAddCategory = async (data: any) => {
    setIsLoading(true);

    const result = await axiosInstance.post("/categories", data);

    const response = result?.data;
    if (response?.statusCode === 200) {
      message.success(response.message);
      setIsLoading(false);
      router.push("/dashboard/admin/events/categories");
    }
    // @ts-ignore
    else if (!result?.success) {
      setIsLoading(false);
      // @ts-ignore
      message.error(result?.message || "Something went wrong try again later");
    }
  };

  return (
    <div>
      <GEDashboardBreadCrumb
        items={[
          {
            label: "Categories",
            link: "/dashboard/admin/events/categories",
          },
        ]}
      />
      <ActionBar title="Add Category" />
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
            submitHandler={handleAddCategory}
            resolver={yupResolver(addCategorySchema)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 12,
              }}
            >
              <Col xs={24} md={24}>
                <FormInput
                  name="name"
                  type="text"
                  label="Category Name"
                  placeholder="Zero-Waste Parties"
                  size="large"
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
                Add Category
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
