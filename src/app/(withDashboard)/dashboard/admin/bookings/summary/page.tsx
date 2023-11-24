import BookingSummary from "@/components/ui/Dashboard/Admin/Bookings/BookingSummary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Summary - GreenEcovents",
  description: "Booking Summary of GreenEcovents",
};

const BookingSummaryPage = () => {
  return (
    <>
      <BookingSummary />
    </>
  );
};

export default BookingSummaryPage;
