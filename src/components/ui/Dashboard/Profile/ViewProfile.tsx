"use client";
import { userRole } from "@/constants/role";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IUser } from "@/interfaces/global";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Grid, Spin, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const { useBreakpoint } = Grid;

const ViewProfile = () => {
  const [profileData, setProfileData] = useState<IUser>();
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
      {!profileData && (
        <Typography.Title
          style={{
            textAlign: "center",
          }}
          level={3}
          type="danger"
        >
          Something went wrong, Try again later.
        </Typography.Title>
      )}
      <div className="container">
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
          align="center"
          gap={6}
        >
          {profileData?.profileImg ? (
            <Image
              src={profileData.profileImg}
              alt=""
              width={100}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<UserOutlined />}
            />
          )}
          <Typography.Title
            level={2}
          >{`${profileData?.firstName} ${profileData?.lastName}`}</Typography.Title>
          {profileData.role !== userRole.USER && (
            <Typography.Paragraph>
              Role: {profileData?.role}{" "}
            </Typography.Paragraph>
          )}
          <Typography.Paragraph>{profileData?.email} </Typography.Paragraph>
          <Typography.Paragraph>{profileData?.contactNo} </Typography.Paragraph>
          <Link href="/dashboard/profile/edit">
            <Button style={{}} type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      </div>
    </div>
  );
};

export default ViewProfile;
