"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import { genderOptions, roleOptions } from "@/constants/global";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { addUserSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleAddUser = async (data: any) => {
    setIsLoading(true);
    delete data.confirmPassword;

    const result = await axiosInstance.post("/auth/signup", data);

    const response = result?.data;
    if (response?.statusCode === 200) {
      message.success(response.message);
      setIsLoading(false);
      router.push("/dashboard/admin/users");
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
            label: "Users",
            link: "/dashboard/admin/users",
          },
        ]}
      />
      <ActionBar title="Add User" />
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
            submitHandler={handleAddUser}
            resolver={yupResolver(addUserSchema)}
          >
            <Row
              gutter={{
                xs: 6,
                md: 12,
              }}
            >
              <Col xs={24} md={12}>
                <FormInput
                  name="firstName"
                  type="text"
                  label="First Name"
                  placeholder="John"
                  size="large"
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  name="lastName"
                  type="text"
                  label="Last Name"
                  placeholder="Doe"
                  size="large"
                />
              </Col>
            </Row>
            <Row
              style={{
                margin: "10px 0",
              }}
              gutter={{
                xs: 6,
                md: 12,
              }}
            >
              <Col xs={24} md={12}>
                <FormInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  size="large"
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  name="contactNo"
                  type="text"
                  label="Contact Number"
                  placeholder="+88017855555"
                  size="large"
                />
              </Col>
            </Row>
            <Row
              style={{
                margin: "10px 0",
              }}
              gutter={{
                xs: 6,
                md: 12,
              }}
            >
              <Col xs={24} md={12}>
                <FormSelectField
                  name="gender"
                  label="Gender"
                  placeholder="Select Gender"
                  size="large"
                  options={genderOptions}
                />
              </Col>
              <Col xs={24} md={12}>
                <FormSelectField
                  name="role"
                  label="User Role"
                  placeholder="Select Role"
                  size="large"
                  options={roleOptions.slice(1, 3)}
                />
              </Col>
            </Row>
            <Row
              style={{
                margin: "10px 0",
              }}
              gutter={{
                xs: 6,
                md: 12,
              }}
            >
              <Col xs={24} md={12}>
                <FormInput
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="********"
                  size="large"
                  helperText="Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters."
                />
              </Col>
              <Col xs={24} md={12}>
                <FormInput
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="********"
                  size="large"
                  helperText="Re type password"
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
                Add User
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
