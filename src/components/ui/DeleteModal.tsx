import axiosInstance from "@/helpers/axios/axiosInstance";
import { IDeleteInfo } from "@/interfaces/global";
import { Modal, Typography, message } from "antd";
import React, { useState } from "react";

interface DeleteModalProps {
  deleteModalOpen: boolean;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  modalText: string;
  deleteInfo: IDeleteInfo | undefined;
}

const DeleteModal = ({
  deleteModalOpen,
  setDeleteModalOpen,
  modalText,
  deleteInfo,
  setIsDeleted,
}: DeleteModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    if (deleteInfo) {
      const result = await axiosInstance.delete(deleteInfo.api);

      const response = result?.data;
      if (response?.statusCode === 200) {
        message.success(response.message);
        setIsDeleted(true);
        setConfirmLoading(false);
        setDeleteModalOpen(false);
      }
      // @ts-ignore
      else if (!result?.success) {
        setConfirmLoading(false);
        message.error(
          // @ts-ignore
          result?.message || "Something went wrong try again later"
        );
      }
    }
  };

  const handleCancel = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Modal
        open={deleteModalOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Delete"
        okType="danger"
      >
        <Typography.Title
          style={{
            padding: 20,
            textAlign: "center",
          }}
          level={4}
          type="warning"
        >
          {modalText}
        </Typography.Title>
      </Modal>
    </>
  );
};

export default DeleteModal;
