import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { EventStatus, IEvent } from "@/interfaces/global";
import { Button, Col, Row, Spin } from "antd";
import Image from "next/image";
import EventContentDetails from "@/components/ui/Event/EventContentDetails";
import Link from "next/link";
import GEBreadCrumb from "@/components/ui/GEBreadCrumb";
import type { Metadata, ResolvingMetadata } from "next";
import EventReviews from "@/components/ui/Event/EventReviews";

interface IEventDetailsProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: IEventDetailsProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const result = (await axiosInstance.get(`/events/${params.id}`))
    ?.data as IApiResponse;
  const event: IEvent = result?.data;

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${event?.title} - GreenEcovents`,
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

const EventDetails = async ({ params }: IEventDetailsProps) => {
  const result = (await axiosInstance.get(`/events/${params.id}`))
    ?.data as IApiResponse;
  const event: IEvent = result?.data;

  if (!event) {
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
    <div>
      <GEBreadCrumb
        title="Events"
        items={[
          {
            label: "Events",
            link: "/events",
          },
          {
            label: event?.title,
          },
        ]}
      />
      <div className="container">
        <Row gutter={20}>
          <Col xs={24} md={10}>
            <Image
              alt={event?.title}
              src={event?.image}
              width={600}
              height={400}
              style={{
                maxWidth: "100%",
                border: "2px solid #b9b6bf",
                borderRadius: 10,
              }}
            />
          </Col>
          <Col xs={24} md={14}>
            <EventContentDetails event={event} />
            {event.status === EventStatus.ongoing && (
              <Link key={event.id} href={`/events/booking/${event.id}`}>
                <Button type="primary">Book Now</Button>
              </Link>
            )}
          </Col>
          {event?.reviews?.length > 0 && (
            <Col xs={24} md={24}>
              <EventReviews reviews={event?.reviews} />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default EventDetails;
