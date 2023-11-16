"use client";

import { ConfigProvider, message } from "antd";
import StyledComponentsRegistry from "./AntdRegistry";
import theme from "@/theme/themeConfig";
import {
  getUserInfo,
  getUserSessionInfo,
  removeUserInfo,
} from "@/services/auth.service";
import { useEffect } from "react";
import { authKey } from "@/constants/storageKey";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const user = getUserSessionInfo();
  // show a message if user token is expired
  useEffect(() => {
    if (user?.exp && user?.exp < Date.now() / 1000) {
      removeUserInfo(authKey);
      message.info("Your session has expired. Please login again.");
    }
  }, [user]);
  return (
    <ConfigProvider theme={theme}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </ConfigProvider>
  );
};

export default Providers;
