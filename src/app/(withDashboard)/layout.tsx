"use client";
import DashboardContents from "@/components/ui/DashobardContents";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WithDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/signin");
    }
    setIsLoading(true);
  }, [router, userLoggedIn]);

  if (!isLoading) {
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
    <Layout hasSider>
      <Sidebar />
      <DashboardContents>{children}</DashboardContents>
    </Layout>
  );
};

export default WithDashboardLayout;
