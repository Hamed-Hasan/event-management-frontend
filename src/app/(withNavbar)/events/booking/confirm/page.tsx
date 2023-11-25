import BookingConfirm from "@/components/ui/Event/BookingConfirm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirm - GreenEcovents",
  description: "Booking Confirm",
};

const BookingConfirmPage = () => {
  return (
    <>
      <BookingConfirm />
    </>
  );
};

export default BookingConfirm;
