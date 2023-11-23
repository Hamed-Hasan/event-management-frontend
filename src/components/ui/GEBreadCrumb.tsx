import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { DoubleRightOutlined } from "@ant-design/icons";

type BreadcrumbItems = {
  items: {
    label: string;
    link?: string;
  }[];
};

type BreadcrumbProps = {
  title?: string;
} & BreadcrumbItems;

const GEBreadCrumb = ({ items, title }: BreadcrumbProps) => {
  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined
            style={{
              color: "#edf4ed",
            }}
          />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link
            className="bread-crumb-link"
            style={{
              color: "#edf4ed",
              fontWeight: "500",
            }}
            href={item.link}
          >
            {item.label}
          </Link>
        ) : (
          <span
            style={{
              color: "#edf4ed",
              fontWeight: "500",
            }}
          >
            {item.label}
          </span>
        ),
      };
    }),
  ];
  return (
    <div className="bread-crumb">
      <h3>{title}</h3>
      <Breadcrumb
        style={{
          padding: 20,
          color: "#edf4ed",
        }}
        items={breadCrumbItems}
        separator={
          <span
            style={{
              color: "#edf4ed",
            }}
          >
            <DoubleRightOutlined />
          </span>
        }
      />
    </div>
  );
};

export default GEBreadCrumb;
