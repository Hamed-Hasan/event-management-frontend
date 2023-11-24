import ManageEvents from "@/components/ui/Dashboard/Admin/Events/ManageEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage events - GreenEcovents",
  description: "Manage events of GreenEcovents",
};

const ManageEventsPage = () => {
  return (
    <div>
      <ManageEvents />
    </div>
  );
};

export default ManageEventsPage;
