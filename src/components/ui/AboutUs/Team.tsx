"use client";
import user1 from "@/assets/user1.jpg";
import user2 from "@/assets/user2.jpg";
import user3 from "@/assets/user3.jpg";
import user4 from "@/assets/user4.jpg";
import { Card, Col, Flex, Grid, Row, Typography } from "antd";
import Image from "next/image";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Link from "next/link";
const { useBreakpoint } = Grid;

const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO",
    img: user1,
  },
  {
    id: 2,
    name: "Ava Taylor",
    role: "Supervisor",
    img: user2,
  },
  {
    id: 3,
    name: "Katie Smith",
    role: "Events Manager",
    img: user3,
  },
  {
    id: 4,
    name: "Mark Johnson",
    role: "Events Manager",
    img: user4,
  },
];

const Team = () => {
  const screen = useBreakpoint();
  return (
    <div className="container">
      <h3 className="section-title">Meet Our Team</h3>
      <Row
        style={{
          margin: "40px 0",
        }}
        gutter={[16, 16]}
      >
        {teamMembers.map((member) => (
          <Col key={member.id} xs={24} sm={12} lg={6}>
            <Card>
              <Flex
                style={{
                  flexDirection: screen.xxl ? "row" : "column",
                  textAlign: screen.xxl ? "left" : "center",
                }}
                gap={20}
                align={
                  screen.xl ? "middle" : screen.lg ? "flex-start" : "middle"
                }
              >
                <div
                  style={{
                    textAlign: screen.xxl ? "left" : "center",
                  }}
                >
                  <Image
                    width={120}
                    height={120}
                    src={member.img}
                    alt={member.name}
                    style={{
                      borderRadius: 10,
                    }}
                  />
                </div>
                <div>
                  <Typography.Title
                    level={4}
                    style={{
                      fontSize: screen.lg ? 20 : 18,
                    }}
                  >
                    {member.name}
                  </Typography.Title>
                  <Typography.Paragraph
                    style={{
                      fontSize: screen.lg ? 16 : 14,
                    }}
                    type="secondary"
                  >
                    {member.role}
                  </Typography.Paragraph>
                  <Flex
                    gap="middle"
                    justify={screen.xxl ? "flex-start" : "center"}
                    wrap="wrap"
                  >
                    <Link href="https://twitter.com" target="_blank">
                      <TwitterOutlined />
                    </Link>
                    <Link href="https://facebook.com" target="_blank">
                      <FacebookOutlined />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank">
                      <LinkedinOutlined />
                    </Link>
                    <Link href="https://instagram.com" target="_blank">
                      <InstagramOutlined />
                    </Link>
                  </Flex>
                </div>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Team;
