import DownloadPaymentReceipt from "@/components/ui/Dashboard/User/Bookings/DownloadPaymentReceipt";
import { Spin } from "antd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Payment Receipt",
  description: "Download Payment Receipt",
};

interface IDownloadPaymentReceiptProps {
  params: { paymentId: string };
}

const DownloadPaymentReceiptPage = ({
  params,
}: IDownloadPaymentReceiptProps) => {
  if (!params.paymentId) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <>
      <DownloadPaymentReceipt paymentId={params.paymentId} />
    </>
  );
};

export default DownloadPaymentReceiptPage;
