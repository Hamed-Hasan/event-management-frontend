"use client";
import BlogCard from "@/components/ui/Card/BlogCard";
import GEBreadCrumb from "@/components/ui/GEBreadCrumb";
import GEPagination from "@/components/ui/Pagination";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IBlog, IMeta, IQuery } from "@/interfaces/global";
import { Col, Empty, PaginationProps, Row, Typography } from "antd";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(9);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [meta, setMeta] = useState<IMeta>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      const res = (
        await axiosInstance.get("/blogs", {
          params: query,
        })
      )?.data as IApiResponse;
      setBlogs(res?.data);
      setMeta(res.meta);
      setIsLoading(false);
    };
    loadBlogs();
  }, [query]);

  useEffect(() => {
    setQuery({
      page,
      limit: size,
      sortBy,
      sortOrder,
    });
  }, [page, size, sortBy, sortOrder]);

  const onChange: PaginationProps["onChange"] = (
    page: number,
    pageSize: number
  ) => {
    setPage(page);
    setSize(pageSize);
  };

  return (
    <div>
      <GEBreadCrumb
        title="Blogs"
        items={[
          {
            label: "Blogs",
          },
        ]}
      />
      <div className="container">
        <div
          style={{
            marginBottom: 30,
          }}
        ></div>
        <Row gutter={[16, 16]}>
          {blogs?.map((blog) => (
            <Col key={blog.id} xs={24} sm={12} lg={8}>
              <BlogCard blog={blog} loading={isLoading} />
            </Col>
          ))}
          {blogs?.length === 0 && (
            <Col xs={24}>
              <Empty
                description={
                  <Typography.Title
                    style={{
                      textAlign: "center",
                    }}
                    level={4}
                    type="danger"
                  >
                    No blogs found! Try again later
                  </Typography.Title>
                }
              />
            </Col>
          )}
        </Row>

        {blogs && blogs?.length > 0 && (
          <div>
            <GEPagination
              onChange={onChange}
              meta={meta}
              page={page}
              size={size}
              pageSizeOptions={[10, 20, 30]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
