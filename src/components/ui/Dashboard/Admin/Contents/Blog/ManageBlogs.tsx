"use client";
import ContentWriter from "@/components/Forms/ContentWriter";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UploadImage from "@/components/Forms/UploadImage";
import ActionBar from "@/components/ui/ActionBar";
import DeleteModal from "@/components/ui/DeleteModal";
import GETable from "@/components/ui/GETable";
import UpdateModal from "@/components/ui/UpdateModal";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import {
  IBlog,
  IDeleteInfo,
  IMeta,
  IQuery,
  IUpdateInfo,
} from "@/interfaces/global";
import { updateBlogSchema } from "@/schemas/global";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ManageBlogs = () => {
  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [blogs, setBlogs] = useState<IBlog[]>();
  const [meta, setMeta] = useState<IMeta>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<IDeleteInfo>();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<IUpdateInfo>();

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
      setIsDeleted(false);
      setIsUpdated(false);
    };
    loadBlogs();
  }, [query, isDeleted, isUpdated]);

  useEffect(() => {
    setQuery({
      page,
      limit: size,
      sortBy,
      sortOrder,
    });
  }, [page, size, sortBy, sortOrder]);

  const handleSearch = (data: any) => {
    if (data?.query) {
      setQuery({
        query: data?.query,
      });
      setSearchTerm(data?.query);
    }
  };

  const updateDefaultValue = {
    title: updateInfo?.data?.title,
    content: updateInfo?.data?.content,
    image: updateInfo?.data?.image,
  };

  const renderHTML = (rawHTML: any) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
    });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      render: function (data: string) {
        return (
          <div
            style={{
              minWidth: 300,
              maxWidth: 400,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            {renderHTML(data.slice(0, 200))}...
          </div>
        );
      },
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <Flex gap={2}>
            <Link href={`/blogs/${data}`} target="_blank">
              <Button
                style={{
                  margin: "0px 5px",
                }}
                type="default"
              >
                <EyeOutlined />
              </Button>
            </Link>
            <Button
              style={{
                margin: "0px 5px",
              }}
              type="primary"
              onClick={() => {
                setUpdateModalOpen(true);
                setUpdateInfo({
                  api: `/blogs/${data}`,
                  id: data,
                  data: blogs?.find((blog) => blog.id === data),
                });
              }}
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteInfo({
                  api: `/blogs/${data}`,
                  id: data,
                });
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </Flex>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setQuery({});
  };

  return (
    <div>
      <ActionBar title="Blogs List">
        <Form submitHandler={handleSearch}>
          <Row>
            <Col>
              <FormInput
                name="query"
                type="search"
                size="large"
                placeholder="Eco friendly"
                suffix={
                  <Button type="primary" htmlType="submit">
                    <SearchOutlined />
                  </Button>
                }
              />
            </Col>
          </Row>
        </Form>
        {(!!sortBy || !!sortOrder || !!searchTerm) && (
          <Button
            style={{ margin: "0px 5px" }}
            type="primary"
            onClick={resetFilters}
            title="Reset"
          >
            <ReloadOutlined />
          </Button>
        )}
      </ActionBar>
      <GETable
        loading={isLoading}
        columns={columns}
        dataSource={blogs}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
      <div>
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          deleteInfo={deleteInfo}
          setIsDeleted={setIsDeleted}
          modalText="Are you sure want to delete?"
        />

        <UpdateModal
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          updateInfo={updateInfo}
          setIsUpdated={setIsUpdated}
          modalText="Update Event"
          defaultValues={updateDefaultValue}
          schema={updateBlogSchema}
        >
          <UploadImage name="image" />
          <FormInput name="title" type="text" label="Blog title" size="large" />
          <div
            style={{
              margin: "20px 0",
            }}
          >
            <ContentWriter name="content" label="Content" />
          </div>
        </UpdateModal>
      </div>
    </div>
  );
};

export default ManageBlogs;
