import logo from "@/assets/logo-2.png";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import axiosInstance from "@/helpers/axios/axiosInstance";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Col, Flex, List, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  {
    label: "About Us",
    link: "/about-us",
  },
  {
    label: "Contact Us",
    link: "/contact-us",
  },
  {
    label: "FAQs",
    link: "/faqs",
  },
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
];

const Footer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubscribe = async (data: any) => {
    setIsLoading(true);
    const result = await axiosInstance.post("/subscribers", data);

    const response = result?.data;
    if (response?.statusCode === 200) {
      message.success(response.message);
      setIsLoading(false);
    }
    // @ts-ignore
    else if (!result?.success) {
      setIsLoading(false);
      message.error(
        // @ts-ignore
        result?.message || "Something went wrong try again later"
      );
    }
  };

  return (
    <div
      style={{
        background: "#1F3C4A",
        color: "#EDF4ED",
      }}
    >
      <div className="container">
        <Row gutter={[20, 20]}>
          <Col xs={24} sm={12} md={12} lg={8}>
            <div>
              <div
                style={{
                  marginBottom: 20,
                }}
              >
                <Link href="/">
                  <Image src={logo} alt="logo" width={180} height={90} />
                </Link>
                <p>GreenEcovents - Where Sustainability Meets Celebration</p>
              </div>
              <div>
                <Flex gap="middle">
                  <Link
                    className="footerLink"
                    href="https://twitter.com"
                    target="_blank"
                  >
                    <TwitterOutlined />
                  </Link>
                  <Link
                    className="footerLink"
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <FacebookOutlined />
                  </Link>
                  <Link
                    className="footerLink"
                    href="https://linkedin.com"
                    target="_blank"
                  >
                    <LinkedinOutlined />
                  </Link>
                  <Link
                    className="footerLink"
                    href="https://instagram.com"
                    target="_blank"
                  >
                    <InstagramOutlined />
                  </Link>
                </Flex>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <div>
              <h3>Important Links</h3>
              <List
                dataSource={links}
                renderItem={(item) => (
                  <Link href={item.link}>
                    <List.Item
                      style={{
                        color: "#EDF4ED",
                      }}
                    >
                      {item.label}
                    </List.Item>
                  </Link>
                )}
              />
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <div>
              <h3
                style={{
                  marginBottom: 10,
                }}
              >
                Subscribe to our Newsletter
              </h3>
              <Form submitHandler={handleSubscribe}>
                <Row gutter={10}>
                  <Col xs={24} md={18}>
                    <FormInput
                      name="email"
                      type="email"
                      size="large"
                      placeholder="Enter your email"
                      prefix={<MailOutlined />}
                      styleProp={{
                        background: "#EDF4ED",
                      }}
                    />
                  </Col>
                  <Col xs={24} md={6}>
                    <Button
                      loading={isLoading}
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      Subscribe
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
