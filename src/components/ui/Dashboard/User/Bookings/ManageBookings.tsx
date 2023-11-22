"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar";
import GETable from "@/components/ui/GETable";
import UpdateModal from "@/components/ui/UpdateModal";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import {
  BookingStatus,
  IBooking,
  IEvent,
  IMeta,
  IQuery,
  IUpdateInfo,
} from "@/interfaces/global";
import { cancelBookingSchema } from "@/schemas/events";
import { getUserInfo } from "@/services/auth.service";
import {
  CloseOutlined,
  FilePdfOutlined,
  ReloadOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const ManageUserBookings = () => {
  const [query, setQuery] = useState<IQuery>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [bookings, setBookings] = useState<IBooking[]>();
  const [meta, setMeta] = useState<IMeta>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // modal
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [updateInfo, setUpdateInfo] = useState<IUpdateInfo>();

  const user = getUserInfo() as any;

  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      const res = (
        await axiosInstance.get("/bookings/user", {
          params: query,
        })
      )?.data as IApiResponse;
      setBookings(res?.data);
      setMeta(res?.meta);
      setIsLoading(false);
      setIsDeleted(false);
      setIsUpdated(false);
    };
    loadBookings();
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
    status: updateInfo?.data?.status,
    startDate: updateInfo?.data?.startDate,
    endDate: updateInfo?.data?.endDate,
  };

  const columns = [
    {
      title: "Event Title",
      dataIndex: "event",
      render: function (data: IEvent) {
        return <>{data?.title}</>;
      },
    },

    {
      title: "Category",
      dataIndex: "event",
      render: function (data: IEvent) {
        return <>{data?.categories.name}</>;
      },
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YY, hh A");
      },
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YY, hh A");
      },
      sorter: true,
    },

    {
      title: "Attendees",
      render: function (data: any) {
        return (
          <>
            <p>
              Adults: <strong>{data?.adults}</strong>
            </p>
            <p>
              Children&apos;s: <strong>{data?.childrens}</strong>
            </p>
          </>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Amount$",
      dataIndex: "totalAmount",
      sorter: true,
    },
    {
      title: "Review",
      dataIndex: "event",
      render: function (data: IEvent, record: IBooking) {
        const isReviewed = data?.reviews?.find(
          (review) =>
            review.userId === user?.id && review.eventId === record.eventId
        );

        return (
          <Link href={`/dashboard/user/review/${data?.id}`}>
            <Button
              style={{
                margin: "0px 5px",
              }}
              type="primary"
              disabled={
                isReviewed
                  ? true
                  : record.status === BookingStatus.canceled
                  ? true
                  : false
              }
            >
              {isReviewed ? <StarFilled /> : <StarOutlined />}
            </Button>
          </Link>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any, record: IBooking) {
        const paymentInfo = record?.payments?.find(
          (payment) => payment.bookingId === data
        );

        return (
          <Flex gap={2} justify="flex-end">
            {paymentInfo?.paymentId && (
              <Link
                href={`/dashboard/user/bookings/download-receipt/${paymentInfo?.paymentId}`}
              >
                <Button
                  style={{
                    margin: "0px 5px",
                  }}
                  type="primary"
                >
                  <FilePdfOutlined />
                </Button>
              </Link>
            )}

            <Button
              style={{
                margin: "0px 5px",
              }}
              type="primary"
              danger
              onClick={() => {
                setUpdateModalOpen(true);
                setUpdateInfo({
                  api: `/bookings/user/${data}`,
                  id: data,
                });
              }}
            >
              <CloseOutlined />
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <div>
      <ActionBar title="Bookings List">
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
        dataSource={bookings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <div>
        <UpdateModal
          updateModalOpen={updateModalOpen}
          setUpdateModalOpen={setUpdateModalOpen}
          updateInfo={updateInfo}
          setIsUpdated={setIsUpdated}
          modalText="Are you sure want to cancel?"
          defaultValues={updateDefaultValue}
          schema={cancelBookingSchema}
          buttonText="Cancel Booking"
        ></UpdateModal>
      </div>
    </div>
  );
};

export default ManageUserBookings;
