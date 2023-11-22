import EventCard from "@/components/ui/Card/EventCard";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { EventStatus, IEvent } from "@/interfaces/global";
import { Button, Col, Empty, Flex, Row } from "antd";
import Link from "next/link";

const UpcomingEvents = async () => {
  const query = {
    page: 1,
    limit: 3,
  };

  const result = (
    await axiosInstance.get("/events", {
      params: { ...query, status: EventStatus.upcoming },
    })
  )?.data as IApiResponse;
  const events = result?.data;

  return (
    <div className="container">
      <div
        style={{
          marginBottom: 30,
        }}
      >
        <h3 className="section-title">Upcoming Events</h3>
      </div>
      <Row gutter={[16, 16]}>
        {events?.map((event: IEvent) => (
          <Col key={event.id} xs={24} sm={12} lg={8}>
            <EventCard event={event} />
          </Col>
        ))}
        {!events?.length && (
          <Col
            xs={24}
            sm={24}
            lg={24}
            style={{
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            <Empty
              description={
                <h3
                  style={{
                    color: "#F14947",
                    fontSize: 24,
                  }}
                >
                  No upcoming events
                </h3>
              }
            />
          </Col>
        )}
      </Row>
      <Flex
        style={{
          margin: "30px 0",
        }}
        justify="center"
      >
        <Link href="/events">
          <Button type="primary">View All</Button>
        </Link>
      </Flex>
    </div>
  );
};

export default UpcomingEvents;
