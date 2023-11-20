"use client";
import { EventStatus, IEvent } from "@/interfaces/global";
import { Button, Card, Flex, Grid, Statistic, Typography } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { StarFilled } from "@ant-design/icons";
import type { CountdownProps } from "antd";

const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

interface EventCardProps {
  event: IEvent;
  loading?: boolean;
}

const EventCard = ({ event, loading }: EventCardProps) => {
  const screen = useBreakpoint();
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    if (event.reviews.length > 0) {
      const totalRating = event.reviews.reduce((acc, review) => {
        return acc + review.rating;
      }, 0);
      setAverageRating(totalRating / event.reviews.length);
    }
  }, [event.reviews]);

  const actions = [
    <Link
      style={{
        paddingLeft: screen.lg ? 5 : 0,
      }}
      key="view"
      href={`/events/${event.id}`}
    >
      <Button type="primary">Details</Button>
    </Link>,
  ];

  if (event.status === EventStatus.ongoing) {
    actions.push(
      <Link key="book" href={`/events/booking/${event.id}`}>
        <Button type="primary">Book</Button>
      </Link>
    );
  }
  if (event.status === EventStatus.upcoming) {
    actions.push(
      <Countdown
        style={{
          fontSize: screen.lg ? 16 : 14,
        }}
        valueStyle={{
          fontSize: screen.lg ? 16 : 14,
        }}
        key="countdown"
        title="Event starts in"
        value={event?.startDate}
        format="DD day HH hr"
      />
    );
  }

  if (event.reviews.length > 0) {
    actions.push(
      <Typography.Title
        key="rating"
        style={{
          fontSize: screen.lg ? 16 : 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
        level={4}
        type="success"
      >
        <StarFilled /> {averageRating} ({event.reviews.length})
      </Typography.Title>
    );
  }

  return (
    <Card
      hoverable
      style={{ height: "100%" }}
      cover={
        <Image
          src={event?.image || ""}
          alt={event?.title}
          width={400}
          height={300}
        />
      }
      loading={loading}
      actions={actions}
    >
      <Typography.Title
        style={{
          fontSize: screen.lg ? 20 : 16,
        }}
        level={3}
        type="success"
      >
        {event?.title}
      </Typography.Title>
      <Typography.Paragraph type="secondary">
        {event?.description.slice(0, 50)}...
      </Typography.Paragraph>

      <Typography.Title
        style={{
          fontSize: screen.lg ? 18 : 14,
        }}
        level={4}
        type="success"
      >
        ${event?.price} / person
      </Typography.Title>
      <Flex gap={screen.lg ? 4 : 2} align="center" justify="start" wrap="wrap">
        <p
          style={{
            fontSize: screen.lg ? 16 : 14,
          }}
        >
          From {dayjs(event?.startDate).format("MMM D YYYY")}{" "}
        </p>
        <p
          style={{
            fontSize: screen.lg ? 16 : 14,
          }}
        >
          To {dayjs(event?.endDate).format("MMM D, YYYY")} {"  "}
        </p>
        <p
          style={{
            fontSize: screen.lg ? 16 : 14,
          }}
        >
          On {event?.location}
        </p>
      </Flex>
    </Card>
  );
};

export default EventCard;
