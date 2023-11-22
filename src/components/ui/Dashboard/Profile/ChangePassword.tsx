"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { changePasswordSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Grid, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { useBreakpoint } = Grid;

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const screen = useBreakpoint();

  const handlePasswordChange = async (data: any) => {
    setIsLoading(true);
    message.loading("Changing password");

    const result = await axiosInstance.patch("/auth/change-password", data);

    const response = result?.data;
    if (response?.statusCode === 200) {
      message.success(response.message);
      setIsLoading(false);
      router.push("/dashboard/profile");
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
            label: "profile",
            link: "/dashboard/profile",
          },
        ]}
      />
      <Form
        submitHandler={handlePasswordChange}
        resolver={yupResolver(changePasswordSchema)}
      >
        <Flex
          style={{
            width: screen.lg ? "50%" : "100%",
            margin: "auto",
            marginTop: 50,
            padding: 20,
            border: "1px solid #EDF4ED",
            borderRadius: 10,
            boxShadow: "5px 5px 40px 0px rgba(0,0,0,0.1)",
          }}
          vertical
          justify="center"
          gap={6}
        >
          <div style={{ margin: "5px 0" }}>
            <FormInput
              name="currentPassword"
              label="Current Password"
              type="password"
            />
          </div>
          <div style={{ margin: "5px 0" }}>
            <FormInput
              name="newPassword"
              label="New Password"
              type="password"
            />
          </div>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Change Password
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default ChangePassword;
