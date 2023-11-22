"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UploadImage from "@/components/Forms/UploadImage";
import GEDashboardBreadCrumb from "@/components/ui/GEDashboardBreadCrumb";
import { genderOptions } from "@/constants/global";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IUser } from "@/interfaces/global";
import { updateProfileSchema } from "@/schemas/auth";
import uploadImage from "@/utils/uploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Grid, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const EditProfile = () => {
  const [profileData, setProfileData] = useState<IUser>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const screen = useBreakpoint();

  useEffect(() => {
    const getData = async () => {
      const res = (await (
        await axiosInstance.get("/user/profile")
      )?.data) as IApiResponse;
      setProfileData(res?.data);
    };
    getData();
  }, []);

  const handleEditProfile = async (data: any) => {
    setIsLoading(true);
    message.loading("Updating...");
    const image = await uploadImage(data?.profileImg);

    data.profileImg = image;

    const result = await (
      await axiosInstance.patch("/user/profile", data)
    )?.data;

    if (result?.statusCode === 200) {
      message.success(result.message);
      setIsLoading(false);
      router.push("/dashboard/profile");
    } else {
      message.error("Something went wrong, try again");
      setIsLoading(false);
    }
  };

  const defaultValues = {
    firstName: profileData?.firstName,
    lastName: profileData?.lastName,
    email: profileData?.email,
    contactNo: profileData?.contactNo,
    profileImg: profileData?.profileImg,
    gender: profileData?.gender,
  };

  if (!profileData) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
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
      <div className="container">
        <Form
          submitHandler={handleEditProfile}
          defaultValues={defaultValues}
          resolver={yupResolver(updateProfileSchema)}
        >
          <Flex
            style={{
              width: screen.lg ? "50%" : "100%",
              margin: "auto",
              marginTop: 20,
              padding: 20,
              border: "1px solid #EDF4ED",
              borderRadius: 10,
              boxShadow: "5px 5px 40px 0px rgba(0,0,0,0.1)",
            }}
            vertical
            justify="center"
            // align="center"
            gap={6}
          >
            <UploadImage name="profileImg" />
            <FormInput type="text" name="firstName" label="First Name" />
            <FormInput type="text" name="lastName" label="Last Name" />
            <FormInput disable={true} type="email" name="email" label="Email" />
            <FormSelectField
              name="gender"
              label="Gender"
              placeholder="Select Gender"
              size="large"
              options={genderOptions}
            />
            <FormInput type="text" name="contactNo" label="Contact Number" />
            <Button
              loading={isLoading}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>
          </Flex>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
