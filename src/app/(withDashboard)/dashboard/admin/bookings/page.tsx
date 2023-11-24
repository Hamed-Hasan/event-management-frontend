import ManageBookings from "@/components/ui/Dashboard/Admin/Bookings/ManageBookings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage bookings - GreenEcovents",
  description: "Manage bookings of GreenEcovents",
};

const ManageBookingPage = () => {
  return (
    <div>
      <ManageBookings />
    </div>
  );
};

export default ManageBookingPage;
