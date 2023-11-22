"use client";
import axiosInstance from "@/helpers/axios/axiosInstance";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button, Grid, Spin, Typography, message } from "antd";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import PdfDocument from "./PdfDocument";
import dynamic from "next/dynamic";
import { IPaymentDetails } from "@/interfaces/global";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const { useBreakpoint } = Grid;

const BookingConfirm = () => {
  const params = useSearchParams();
  const [details, setDetails] = useState<IPaymentDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const screen = useBreakpoint();

  useEffect(() => {
    message.success("Thank you for your booking!");
    const loadDetails = async () => {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/bookings/payment-details/${params.get("payment_intent")}`
      );
      setDetails(response.data.data);
      setIsLoading(false);
    };
    loadDetails();
  }, [params]);

  if (isLoading) {
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
            fontSize: screen.lg ? 24 : 20,
          }}
          level={2}
        >
          Booking Confirmed
        </Typography.Title>
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

export default BookingConfirm;
