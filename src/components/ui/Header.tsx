"use client";
import { authKey } from "@/constants/storageKey";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IUser } from "@/interfaces/global";
import { removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Row,
  Space,
  Spin,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Header: AntHeader } = Layout;

const Header = () => {
  const [profileData, setProfileData] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const res = (await (
        await axiosInstance.get("/user/profile")
      )?.data) as IApiResponse;
      setProfileData(res?.data);
    };
    getData();
  }, []);

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/signin");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logout} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

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
    <AntHeader
      style={{
        background: "#EDF4ED",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <Dropdown menu={{ items }}>
          <div
            style={{
              cursor: "pointer",
            }}
          >
            <Space align="center" wrap size={16}>
              <Flex align="center" gap={8}>
                <h4>{`${profileData?.firstName} ${profileData?.lastName}`}</h4>
                {profileData?.profileImg ? (
                  <Image
                    src={profileData.profileImg}
                    alt=""
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
              </Flex>
            </Space>
          </div>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
