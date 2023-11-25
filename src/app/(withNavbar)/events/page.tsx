import Events from "@/components/ui/Event/Events";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Events - GreenEcovents",
  description: "Events of GreenEcovents",
};

const EventsPage = () => {
  return (
    <>
      <Events />
    </>
  );
};

export default EventsPage;
