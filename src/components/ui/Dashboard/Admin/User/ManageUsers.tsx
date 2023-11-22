"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import DeleteModal from "@/components/ui/DeleteModal";
import GETable from "@/components/ui/GETable";
import UpdateModal from "@/components/ui/UpdateModal";
import { genderOptions } from "@/constants/global";
import { userRole } from "@/constants/role";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import {
  IDeleteInfo,
  IMeta,
  IQuery,
  IUpdateInfo,
  IUser,
} from "@/interfaces/global";
import { updateProfileSchema } from "@/schemas/auth";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>();
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
    const loadUsers = async () => {
      setIsLoading(true);
      const res = (
        await axiosInstance.get("/user/get-all", {
          params: { ...query, role: userRole.USER },
        })
      )?.data as IApiResponse;
      setUsers(res?.data);
      setMeta(res?.meta);
      setIsLoading(false);
      setIsDeleted(false);
      setIsUpdated(false);
    };
    loadUsers();
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
    firstName: updateInfo?.data?.firstName,
    lastName: updateInfo?.data?.lastName,
    email: updateInfo?.data?.email,
    gender: updateInfo?.data?.gender,
    contactNo: updateInfo?.data?.contactNo,
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Gender",
      dataIndex: "gender",
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
      title: "Contact no.",
      dataIndex: "contactNo",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <Flex gap={2}>
            <Button
              style={{
                margin: "0px 5px",
              }}
              type="primary"
              onClick={() => {
                setUpdateModalOpen(true);
                setUpdateInfo({
                  api: `/user/${data}`,
                  id: data,
                  data: users?.find((user) => user.id === data),
                });
              }}
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteInfo({
                  api: `/user/${data}`,
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
      <ActionBar title="Users List">
        <Form submitHandler={handleSearch}>
          <Row>
            <Col>
              <FormInput
                name="query"
                type="search"
                size="large"
                placeholder="John"
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
        dataSource={users}
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
          modalText="Are you sure want to delete? Deleting will delete all related to this user."
        />
        <UpdateModal
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          updateInfo={updateInfo}
          setIsUpdated={setIsUpdated}
          modalText="Update User"
          defaultValues={updateDefaultValue}
          schema={updateProfileSchema}
        >
          <FormInput type="text" name="firstName" label="First Name" />
          <FormInput type="text" name="lastName" label="Last Name" />
          <FormInput disable={true} type="email" name="email" label="Email" />
          <FormSelectField
            name="gender"
            label="Gender"
            placeholder="Select Gender"
            size="large"
            options={genderOptions}
          />
          <FormInput type="text" name="contactNo" label="Contact Number" />
        </UpdateModal>
      </div>
    </div>
  );
};

export default ManageUsers;
