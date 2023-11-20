"use client";
import { Card, Col, Grid, Row, Typography } from "antd";
import vision from "@/assets/vision.jpg";
import approach from "@/assets/approach.jpg";
import goals from "@/assets/goals.jpg";
import Image from "next/image";

const items = [
  {
    id: 1,
    title: "Our Vision",
    image: vision,
    description:
      "Our vision is to be the leading event management company in the world by meeting and exceeding our clients’ expectations, as well as fostering a culture of professionalism and trust among our clients and partners.",
  },
  {
    id: 2,
    title: "Our Approach",
    image: approach,
    description:
      "Our approach is to provide our clients with an enjoyable, honest service by satisfying individual customers practical transportation needs with a quality product.",
  },
  {
    id: 3,
    title: "Our Goals",
    image: goals,
    description:
      "Our goal is to provide our clients with an enjoyable, honest service by satisfying individual customers practical transportation needs with a quality product.",
  },
];

const { useBreakpoint } = Grid;
const OurApproach = () => {
  const screen = useBreakpoint();
  return (
    <div className="container">
      <h3 className="section-title">
        We Create Events That Leave A Lasting Impression
      </h3>
      <Typography.Paragraph
        style={{
          fontSize: screen.lg ? 18 : 14,
          textAlign: "center",
          width: screen.lg ? "70%" : "100%",
          margin: "20px auto",
        }}
        type="secondary"
      >
        We are a full-service event management company based in Dhaka,
        Bangladesh that was created by pairing together our passion for business
        and events with a desire to help others who share the same dreams. Our
        team of visionaries, strategists, planners, and creators have worked
        tirelessly to bring our vision to life: creating unforgettable moments
        and lifelong memories.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.id} xs={24} sm={12} lg={8}>
            <Card
              style={{
                height: "100%",
              }}
              cover={
                <Image
                  width={200}
                  height={200}
                  src={item.image}
                  alt={item.title}
                />
              }
            >
              <Card.Meta
                style={{
                  textAlign: "center",
                }}
                title={item.title}
                description={item.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OurApproach;
