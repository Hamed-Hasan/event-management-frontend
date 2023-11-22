"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormSelectField from "@/components/Forms/FormSelectField";
import ActionBar from "@/components/ui/ActionBar";
import { bookingDataFilterOptions } from "@/constants/global";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IBookingData, IGetBookingsData } from "@/interfaces/global";
import { Button, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import BookingChart from "./BookingChart";

const BookingSummary = () => {
  const [bookingData, setBookingData] = useState<IBookingData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string>("");
  const [query, setQuery] = useState<IGetBookingsData>({
    timeRange: "7days",
  });

  useEffect(() => {
    const loadBookingData = async () => {
      setIsLoading(true);
      const result = await axiosInstance.post(`/bookings/get-data`, query);
      setBookingData(result?.data?.data);
      setIsLoading(false);
    };
    loadBookingData();
  }, [query]);

  const handleChartFilter = (data: any) => {
    if (data.year) {
      // get the year
      const year = dayjs(data.year).format("YYYY");
      data.year = parseInt(year);
    }
    if (data.timeRange) {
      setQuery(data);
    }
  };
  const handle = (data: string) => {
    setTimeRange(data);
  };

  return (
    <div className="container">
      <Form submitHandler={handleChartFilter}>
        <ActionBar
          title={`
          Booking Summary of ${query.timeRange}
          `}
        >
          <div>
            <FormSelectField
              name="timeRange"
              label="Time Range for Bookings"
              options={bookingDataFilterOptions}
              placeholder="Select time range"
              size="large"
              onFieldChange={handle}
            />
          </div>
          {timeRange === "year" && (
            <div>
              <FormDatePicker
                name="year"
                label="Year"
                size="large"
                picker="year"
              />
            </div>
          )}
          <div>
            <Button
              style={{
                marginTop: 20,
                width: 100,
              }}
              loading={isLoading}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Filter
            </Button>
          </div>
        </ActionBar>
      </Form>
      <>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <BookingChart bookingData={bookingData} />
        )}
      </>
    </div>
  );
};

export default BookingSummary;
