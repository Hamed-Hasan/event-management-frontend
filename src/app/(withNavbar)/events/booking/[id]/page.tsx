import EventBooking from "@/components/ui/Event/EventBooking";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IEvent } from "@/interfaces/global";
import { Metadata, ResolvingMetadata } from "next";

interface IEventBookingProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: IEventBookingProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = (await axiosInstance.get(`/events/${params.id}`))
    ?.data as IApiResponse;
  const event: IEvent = result?.data;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `Booking of ${event?.title} - GreenEcovents`,
    description: event?.description,
    openGraph: {
      images: [
        {
          url: event?.image,
          width: 800,
          height: 600,
          alt: event?.title,
        },
        ...previousImages,
      ],
    },
  };
}

const EventBookingPage = () => {
  return (
    <>
      <EventBooking />
    </>
  );
};

export default EventBookingPage;
