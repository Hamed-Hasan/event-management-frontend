"use client";

import couple from "@/assets/couple.png";
import fireworks from "@/assets/fireworks.png";
import events from "@/assets/people.png";
import { Col, Flex, Grid, Row, Typography } from "antd";
import Image from "next/image";
import styles from "@/styles/About.module.css";

const items = [
  {
    id: 1,
    title: "The Events Specialists",
    icon: couple,
    description: "We are the events specialists that you can trust.",
  },
  {
    id: 2,
    title: "Dedicated Venues and Arrangements",
    icon: fireworks,
    description:
      "We have dedicated venues and arrangements for all types of events.",
  },
  {
    id: 3,
    title: "All Types of Events",
    icon: events,
    description:
      "We can arrange all types of events from weddings to corporate events.",
  },
];

const { useBreakpoint } = Grid;

const WhyChooseUs = () => {
  const screen = useBreakpoint();
  return (
    <div
      style={{
        background: "#EDF4ED",
        overflow: "hidden",
      }}
    >
      <div>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <div
              style={{
                paddingLeft: screen.md ? 80 : 20,
              }}
            >
              <Typography.Title
                style={{
                  fontSize: screen.lg ? 24 : 18,
                }}
                level={3}
                type="success"
              >
                Why Choose Us?
              </Typography.Title>
              <Typography.Paragraph
                style={{
                  fontSize: screen.lg ? 18 : 14,
                  width: screen.lg ? "80%" : "100%",
                }}
                type="secondary"
              >
                We offer a wide range of event management services to suit every
                need and budget. Whether you are planning a wedding, birthday
                party, corporate event, or any other type of event, we can help
                you make it a success. Our team of experienced professionals
                will work with you from start to finish to ensure that your
                event is a success.
              </Typography.Paragraph>
              {items.map((item) => (
                <Flex key={item.id} gap={20} style={{ padding: 20 }}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                  <div>
                    <Typography.Title
                      style={{
                        fontSize: screen.lg ? 20 : 18,
                      }}
                      level={4}
                      type="success"
                    >
                      {item.title}
                    </Typography.Title>
                    <Typography.Paragraph type="secondary">
                      {item.description}
                    </Typography.Paragraph>
                  </div>
                </Flex>
              ))}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                height: screen.lg ? 800 : 400,
              }}
              className={styles.whyChooseUs}
            ></div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WhyChooseUs;
