import ManageUserBookings from "@/components/ui/Dashboard/User/Bookings/ManageBookings";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Manage bookings - GreenEcovents",
  description: "Manage user bookings of GreenEcovents",
};

const ManageUserBookingsPage = () => {
  return (
    <div>
      <ManageUserBookings />
    </div>
  );
};

export default ManageUserBookingsPage;
