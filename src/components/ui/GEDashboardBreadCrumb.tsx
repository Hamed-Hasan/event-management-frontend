import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";

type BreadcrumbItems = {
  items: {
    label: string;
    link: string;
  }[];
};

const GEDashboardBreadCrumb = ({ items }: BreadcrumbItems) => {
  const breadCrumbItems = [
    {
      title: (
        <Link href="/dashboard">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link href={item.link}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];
  return <Breadcrumb style={{ margin: "10px 15px" }} items={breadCrumbItems} />;
};

export default GEDashboardBreadCrumb;
