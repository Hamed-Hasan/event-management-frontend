import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IBlog } from "@/interfaces/global";
import { Col, Empty, Row, Spin } from "antd";
import Image from "next/image";

import BlogContentDetails from "@/components/ui/Blog/BlogContentDetails";
import GEBreadCrumb from "@/components/ui/GEBreadCrumb";
import { Metadata, ResolvingMetadata } from "next";

interface IBlogDetailsProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: IBlogDetailsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = (await axiosInstance.get(`/blogs/${params.id}`))
    ?.data as IApiResponse;
  const blog: IBlog = result?.data;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${blog.title} - GreenEcovents`,
    description: blog.content,
    openGraph: {
      images: [
        {
          url: blog.image,
          width: 800,
          height: 600,
          alt: blog.title,
        },
        ...previousImages,
      ],
    },
  };
}

const BlogDetails = async ({ params }: IBlogDetailsProps) => {
  const result = (await axiosInstance.get(`/blogs/${params.id}`))
    ?.data as IApiResponse;
  const blog: IBlog = result?.data;

  if (!blog) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Spin size="large" />
        </div>
        <div
          style={{
            display: "block",
            marginTop: 20,
          }}
        >
          <Empty />
        </div>
      </div>
    );
  }

  return (
    <div>
      <GEBreadCrumb
        title="Blog Details"
        items={[
          {
            label: "Blogs",
            link: "/blogs",
          },
          {
            label: blog?.title,
          },
        ]}
      />
      <div className="container">
        <Row gutter={20}>
          <Col xs={24} md={24}>
            <div
              style={{
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              <Image
                alt={blog?.title}
                src={blog?.image}
                width={800}
                height={400}
                style={{
                  maxWidth: "100%",
                  border: "2px solid #b9b6bf",
                  borderRadius: 10,
                }}
              />
            </div>
          </Col>
          <Col xs={24} md={24}>
            <BlogContentDetails blog={blog} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BlogDetails;
