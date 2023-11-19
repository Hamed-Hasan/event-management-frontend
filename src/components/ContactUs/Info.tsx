"use client";
import location from "@/assets/location.png";
import phone from "@/assets/phone-call.png";
import email from "@/assets/email.png";
import { Card, Col, Grid, Row, Typography } from "antd";
import Image from "next/image";

const { useBreakpoint } = Grid;

const infos = [
  {
    id: 1,
    icon: location,
    title: "Address",
    description: "Dhaka, Bangladesh",
  },
  {
    id: 2,
    icon: phone,
    title: "Phone",
    description: "+8801791490304",
  },
  {
    id: 3,
    icon: email,
    title: "Email",
    description: "contact@greenecovents.com",
  },
];

const Info = () => {
  const screen = useBreakpoint();
  return (
    <div className="container">
      <Typography.Paragraph
        style={{
          fontSize: screen.lg ? 18 : 16,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        Contact us if you need our services. We will be happy to make your
        events memorable!
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        {infos.map((info) => (
          <Col key={info.id} xs={24} sm={24} md={12} lg={8} xl={8}>
            <Card
              style={{
                textAlign: "center",
              }}
            >
              <Image src={info.icon} alt={info.title} width={50} height={50} />
              <div>
                <Typography.Title
                  style={{
                    fontSize: screen.lg ? 24 : 20,
                  }}
                  level={4}
                  type="success"
                >
                  {info.title}
                </Typography.Title>
                <Typography.Paragraph
                  style={{
                    fontSize: screen.lg ? 18 : 16,
                  }}
                >
                  {info.description}
                </Typography.Paragraph>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Info;
