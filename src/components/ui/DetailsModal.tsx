import Form from "@/components/Forms/Form";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IUpdateInfo } from "@/interfaces/global";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Flex, Modal } from "antd";
import React, { ReactElement, ReactNode, useEffect, useState } from "react";

interface DetailsModalProps {
  detailsModalOpen: boolean;
  setDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalText?: string;
  detailsInfo: IUpdateInfo | undefined;
  children?: ReactElement | ReactNode;
  defaultValues?: any;
  schema?: any;
}

const DetailsModal = ({
  detailsModalOpen,
  setDetailsModalOpen,
  modalText,
  detailsInfo,
  children,
  defaultValues,
  schema,
}: DetailsModalProps) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    const loadDetails = async () => {
      if (detailsInfo) {
        const result = await (await axiosInstance.get(detailsInfo.api))?.data;

        setDetails(result?.data);
      }
    };
    loadDetails();
  }, [detailsInfo]);

  const handleUpdate = async (data: any) => {
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setDetailsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={modalText}
        open={detailsModalOpen}
        confirmLoading={confirmLoading}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          submitHandler={handleUpdate}
          defaultValues={defaultValues}
          resolver={yupResolver(schema)}
        >
          {children}

          <Flex
            style={{
              marginTop: 30,
            }}
            justify="end"
            gap={8}
          >
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button loading={confirmLoading} type="primary" htmlType="submit">
              Update
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default DetailsModal;
