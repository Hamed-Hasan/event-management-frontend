"use client";
import logo from "@/assets/logo-2.png";
import { SidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();

  const role = getUserInfo()?.role as any;
  if (!role) {
    router.push("/signin");
  }

  return (
    <Sider
      theme="dark"
      collapsible
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
          padding: 10,
        }}
      >
        <Image src={logo} alt="" width={160} height={80} priority />
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={SidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;
