"use client";
import axiosInstance from "@/helpers/axios/axiosInstance";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "@/components/ui/Event/PdfDocument";
import { IPaymentDetails } from "@/interfaces/global";
import { Button, Grid, Typography } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const { useBreakpoint } = Grid;

interface IDownloadReceiptProps {
  paymentId: string;
}

const DownloadPaymentReceipt = ({ paymentId }: IDownloadReceiptProps) => {
  const [details, setDetails] = useState<IPaymentDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const screen = useBreakpoint();

  useEffect(() => {
    const loadDetails = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/bookings/payment-details/${paymentId}`
      );
      setDetails(response?.data?.data);
      setIsLoading(false);
    };
    loadDetails();
  }, [paymentId]);

  return (
    <div className="container">
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Typography.Title
          style={{
            fontSize: screen.lg ? 20 : 16,
          }}
          level={4}
        >
          Booking Details
        </Typography.Title>
        <Typography.Paragraph>Name: {details?.name}</Typography.Paragraph>
        <Typography.Paragraph>Email: {details?.email}</Typography.Paragraph>
        <Typography.Paragraph>
          Payment ID: {details?.paymentId}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Booking ID: {details?.bookingId}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Amount: {details?.amount} {details?.currency}
        </Typography.Paragraph>
      </div>

      <PDFDownloadLink
        document={<PdfDocument details={details} />}
        fileName="receipt.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <Button loading={isLoading} type="primary">
              Download Receipt
            </Button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPaymentReceipt;
