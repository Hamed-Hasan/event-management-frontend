"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import DeleteModal from "@/components/ui/DeleteModal";
import GETable from "@/components/ui/GETable";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IDeleteInfo, IMeta, IQuery, ISubscriber } from "@/interfaces/global";
import {
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ManageSubscribers = () => {
  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [subscribers, setSubscribers] = useState<ISubscriber[]>();
  const [meta, setMeta] = useState<IMeta>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<IDeleteInfo>();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    const loadSubscribers = async () => {
      setIsLoading(true);
      const res = (
        await axiosInstance.get("/subscribers", {
          params: query,
        })
      )?.data as IApiResponse;
      setSubscribers(res?.data);
      setMeta(res?.meta);
      setIsLoading(false);
      setIsDeleted(false);
    };
    loadSubscribers();
  }, [query, isDeleted]);

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

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YY, hh A");
      },
      sorter: true,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YY, hh A");
      },
      sorter: true,
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <Flex gap={2}>
            <Button
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteInfo({
                  api: `/subscribers/${data}`,
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
      <ActionBar title="Subscribers List">
        <Form submitHandler={handleSearch}>
          <Row>
            <Col>
              <FormInput
                name="query"
                type="search"
                size="large"
                placeholder="Search by email"
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
        dataSource={subscribers}
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
      </div>
    </div>
  );
};

export default ManageSubscribers;
