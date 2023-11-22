"use client";
import ActionBar from "@/components/ui/ActionBar";
import DeleteModal from "@/components/ui/DeleteModal";
import GETable from "@/components/ui/GETable";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IDeleteInfo, IFeedback, IUser } from "@/interfaces/global";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState<IDeleteInfo>();
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    const loadFeedbacks = async () => {
      setIsLoading(true);
      const res = (await axiosInstance.get("/feedbacks"))?.data as IApiResponse;
      setFeedbacks(res?.data);
      setIsLoading(false);
      setIsDeleted(false);
    };
    loadFeedbacks();
  }, [isDeleted]);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      render: function (data: IUser) {
        return <>{data.email}</>;
      },
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      render: function (data: string) {
        return (
          <div
            style={{
              maxWidth: 400,
              maxHeight: 200,
              overflow: "auto",
            }}
          >
            {data}
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
                  api: `/feedbacks/${data}`,
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
      <ActionBar title="Feedbacks List" />

      <GETable
        loading={isLoading}
        columns={columns}
        dataSource={feedbacks}
        showSizeChanger={true}
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

export default Feedbacks;
