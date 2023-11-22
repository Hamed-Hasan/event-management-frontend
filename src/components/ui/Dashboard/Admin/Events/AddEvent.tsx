"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SelectOptions } from "@/components/Forms/FormMultiSelectField";
import FormRangePicker from "@/components/Forms/FormRangePicker";
import FormSelectField from "@/components/Forms/FormSelectField";
import UploadImage from "@/components/Forms/UploadImage";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { ICategory, IUserInfo } from "@/interfaces/global";
import { addEventSchema } from "@/schemas/events";
import { getUserInfo } from "@/services/auth.service";
import uploadImage from "@/utils/uploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddEvent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>();

  const router = useRouter();

  const user = getUserInfo() as IUserInfo;

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      const res = (await axiosInstance.get("/categories"))
        ?.data as IApiResponse;
      setCategories(res?.data);
      setIsLoading(false);
    };
    loadCategories();
  }, []);

  const handleAddEvent = async (data: any) => {
    if (user?.id) {
      setIsLoading(true);

      const image = await uploadImage(data?.image);

      data.userId = user.id;
      data.image = image;

      data.price = Number(data.price);

      const result = await axiosInstance.post("/events", data);

      const response = result?.data;
      if (response?.statusCode === 200) {
        message.success(response.message);
        setIsLoading(false);
        router.push("/dashboard/admin/events");
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

  const categoryOptions: SelectOptions[] = [];

  if (categories?.length) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      categoryOptions.push({
        label: category.name,
        value: category.id,
      });
    }
  }

  return (
    <div>
      <GEDashboardBreadCrumb
        items={[
          {
            label: "Events",
            link: "/dashboard/admin/events",
          },
        ]}
      />
      <ActionBar title="Add Event" />
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
            submitHandler={handleAddEvent}
            resolver={yupResolver(addEventSchema)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 16,
              }}
            >
              <Col xs={24} md={24}>
                <UploadImage name="image" />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  name="title"
                  type="text"
                  label="Event title"
                  placeholder="Eco-Chic Garden Wedding"
                  size="large"
                />
              </Col>
              <Col xs={24} md={12}>
                <FormSelectField
                  name="categoryId"
                  label="Category"
                  placeholder="Select category"
                  size="large"
                  options={categoryOptions}
                />
              </Col>

              <Col xs={24} md={24}>
                <FormRangePicker
                  name={["startDate", "endDate"]}
                  label="Select Date Range"
                  size="large"
                />
              </Col>
              <Col xs={24} md={24}>
                <FormInput
                  name="location"
                  type="text"
                  label="Event Location"
                  placeholder="Dhaka"
                  size="large"
                />
              </Col>
              <Col xs={24} md={24}>
                <FormInput
                  name="price"
                  type="text"
                  label="Price"
                  placeholder="99.9"
                  size="large"
                />
              </Col>
              <Col xs={24} md={24}>
                <FormInput
                  name="description"
                  type="text-area"
                  label="Event description"
                  size="large"
                  rows={4}
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
                Add Event
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
