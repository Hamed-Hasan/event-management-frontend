"use client";
import Contents from "@/components/ui/Contents";
import { Layout } from "antd";

const WithNavbarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default WithNavbarLayout;
