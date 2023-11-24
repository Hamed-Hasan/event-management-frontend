"use client";
import { userRole } from "@/constants/role";

import { getUserInfo } from "@/services/auth.service";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const user = getUserInfo();
  useEffect(() => {
    if (user?.role === userRole.USER) {
      return redirect("/dashboard/profile");
    } else {
      return redirect("/dashboard/admin/bookings/summary");
    }
  }, [user]);
};

export default Dashboard;
