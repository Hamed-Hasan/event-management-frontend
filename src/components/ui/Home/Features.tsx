"use client";
/* 


Feature: User-Friendly Booking

Icon: CalendarOutlined
Description: Easily book your desired services with our intuitive booking system. Choose dates, times, and options effortlessly.
Feature: Eco-Friendly Events

Icon: EnvironmentOutlined
Description: Discover and book eco-conscious events and services that prioritize sustainability and environmental responsibility.
Feature: User Ratings and Reviews

Icon: StarOutlined
Description: Leave ratings and reviews for services you've booked and read feedback from other users to make informed decisions.
Feature: Personalized Recommendations

Icon: GiftOutlined
Description: Receive personalized service recommendations based on your preferences and past bookings, ensuring a tailored experience.
*/

import styles from "@/styles/Home.module.css";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Col, Grid, Row, Typography } from "antd";

const { useBreakpoint } = Grid;

const Features = () => {
  const screen = useBreakpoint();
  return (
    <div className="container">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={12} lg={6}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <CalendarOutlined />
            </div>
            <Typography.Title
              style={{
                fontSize: screen.lg ? 20 : 16,
              }}
              level={4}
              type="success"
            >
              User-Friendly Booking
            </Typography.Title>
            <Typography.Paragraph
              style={{
                fontSize: screen.lg ? 16 : 14,
              }}
              type="secondary"
            >
              Easily book your desired services with our intuitive booking
              system. Choose dates, times, and options effortlessly.
            </Typography.Paragraph>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <EnvironmentOutlined />
            </div>
            <Typography.Title
              style={{
                fontSize: screen.lg ? 20 : 16,
              }}
              level={4}
              type="success"
            >
              Eco-Friendly Events
            </Typography.Title>
            <Typography.Paragraph
              style={{
                fontSize: screen.lg ? 16 : 14,
              }}
              type="secondary"
            >
              Discover and book eco-conscious events and services that
              prioritize sustainability and environmental responsibility.
            </Typography.Paragraph>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <StarOutlined />
            </div>
            <Typography.Title
              style={{
                fontSize: screen.lg ? 20 : 16,
              }}
              level={4}
              type="success"
            >
              User Ratings and Reviews
            </Typography.Title>
            <Typography.Paragraph
              style={{
                fontSize: screen.lg ? 16 : 14,
              }}
              type="secondary"
            >
              Leave ratings and reviews for services you&apos;ve booked and read
              feedback from other users to make informed decisions.
            </Typography.Paragraph>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <GiftOutlined />
            </div>
            <Typography.Title
              style={{
                fontSize: screen.lg ? 20 : 16,
              }}
              level={4}
              type="success"
            >
              Personalized Recommendations
            </Typography.Title>
            <Typography.Paragraph
              style={{
                fontSize: screen.lg ? 16 : 14,
              }}
              type="secondary"
            >
              Receive personalized service recommendations based on your
              preferences and past bookings, ensuring a tailored experience.
            </Typography.Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Features;
