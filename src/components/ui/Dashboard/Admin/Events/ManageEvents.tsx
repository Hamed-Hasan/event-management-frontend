"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SelectOptions } from "@/components/Forms/FormMultiSelectField";
import FormRangePicker from "@/components/Forms/FormRangePicker";
import FormSelectField from "@/components/Forms/FormSelectField";
import UploadImage from "@/components/Forms/UploadImage";
import ActionBar from "@/components/ui/ActionBar";
import DeleteModal from "@/components/ui/DeleteModal";
import GETable from "@/components/ui/GETable";
import UpdateModal from "@/components/ui/UpdateModal";
import { eventStatusOptions } from "@/constants/global";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import {
  ICategory,
  IDeleteInfo,
  IEvent,
  IMeta,
  IQuery,
  IReview,
  IUpdateInfo,
} from "@/interfaces/global";
import { updateEventSchema } from "@/schemas/events";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManageEvents = () => {
  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [events, setEvents] = useState<IEvent[]>();
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
  const [categories, setCategories] = useState<ICategory[]>();

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoading(true);
      const res = (await axiosInstance.get("/categories"))
        ?.data as IApiResponse;
      setCategories(res?.data);
      setIsLoading(false);
    };
    loadCategories();
  }, []);

  const categoryOptions: SelectOptions[] = [];

  if (categories?.length) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      categoryOptions.push({
        label: category.name,
        value: category.id,
      });
    }
  }

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      const res = (
        await axiosInstance.get("/events", {
          params: query,
        })
      )?.data as IApiResponse;
      setEvents(res?.data);
      setMeta(res?.meta);
      setIsLoading(false);
      setIsDeleted(false);
      setIsUpdated(false);
    };
    loadEvents();
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

  const updateDefaultValue = {
    title: updateInfo?.data?.title,
    categoryId: updateInfo?.data?.categoryId,
    startDate: updateInfo?.data?.startDate,
    endDate: updateInfo?.data?.endDate,
    location: updateInfo?.data?.location,
    price: updateInfo?.data?.price,
    description: updateInfo?.data?.description,
    status: updateInfo?.data?.status,
  };

  const columns = [
    {
      title: "Event Title",
      dataIndex: "title",
      render: function (data: string) {
        return <>{data.slice(0, 10)}..</>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      render: function (data: string) {
        return <>{data.slice(0, 10)}..</>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY");
      },
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY");
      },
      sorter: true,
    },
    {
      title: "Bookings",
      dataIndex: "bookings",
      render: function (data: any) {
        return data.length ? <span>{data?.length}</span> : <span>0</span>;
      },
      sorter: true,
    },

    {
      title: "Reviews",
      dataIndex: "reviews",
      render: function (data: IReview[]) {
        const totalRating = data?.reduce((acc, review) => {
          return acc + review?.rating;
        }, 0);
        let averageRating = 0;
        if (totalRating === 0) {
          averageRating = 0;
        } else if (totalRating > 0) {
          averageRating = totalRating / data?.length;
        }
        return (
          <>
            <StarFilled /> {averageRating} ({data?.length})
          </>
        );
      },
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      // render: function (data: any) {
      //   return data.length ? <span>{data?.length}</span> : <span>0</span>;
      // },
      sorter: true,
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
            <Link href={`/events/${data}`} target="_blank">
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
                  api: `/events/${data}`,
                  id: data,
                  data: events?.find((event) => event.id === data),
                });
              }}
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => {
                setDeleteModalOpen(true);
                setDeleteInfo({
                  api: `/events/${data}`,
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

  return (
    <div>
      <ActionBar title="Events List">
        <Form submitHandler={handleSearch}>
          <Row>
            <Col>
              <FormInput
                name="query"
                type="search"
                size="large"
                placeholder="Eco friendly wedding"
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
        dataSource={events}
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
          modalText="Are you sure want to delete? Deleting will delete all related to this event."
        />

        <UpdateModal
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          updateInfo={updateInfo}
          setIsUpdated={setIsUpdated}
          modalText="Update Event"
          defaultValues={updateDefaultValue}
          schema={updateEventSchema}
        >
          <UploadImage name="image" />
          <FormInput
            name="title"
            type="text"
            label="Event title"
            placeholder="Eco-Chic Garden Wedding"
            size="large"
          />
          <FormSelectField
            name="status"
            label="Status"
            placeholder="Select status"
            size="large"
            options={eventStatusOptions}
          />
          <FormSelectField
            name="categoryId"
            label="Category"
            placeholder="Select category"
            size="large"
            options={categoryOptions}
          />

          <FormRangePicker
            name={["startDate", "endDate"]}
            label="Select Date Range"
            // placeholder="Eco-Chic Garden Wedding"
            size="large"
          />
          <FormInput
            name="location"
            type="text"
            label="Event Location"
            placeholder="Dhaka"
            size="large"
          />
          <FormInput
            name="price"
            type="text"
            label="Price"
            placeholder="99.9"
            size="large"
          />
          <FormInput
            name="description"
            type="text-area"
            label="Event description"
            size="large"
            rows={4}
          />
        </UpdateModal>
      </div>
    </div>
  );
};

export default ManageEvents;
