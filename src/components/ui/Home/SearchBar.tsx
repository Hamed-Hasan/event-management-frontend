"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { CalendarOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Grid, Row, Typography } from "antd";
import { useRouter } from "next/navigation";

const { useBreakpoint } = Grid;

const SearchBar = () => {
  const router = useRouter();
  const screen = useBreakpoint();
  const handleSearch = (data: any) => {
    if (data?.query) {
      router.push(`/events?query=${data?.query}`);
    }
  };
  return (
    <div
      style={{
        background: "#3BA27A",
        color: "#EDF4ED",
        padding: 20,
      }}
    >
      <div className="container">
        <Form submitHandler={handleSearch}>
          <Row gutter={[10, 10]} justify="center" align="middle">
            <Col xs={24} lg={6}>
              <Flex gap={16} align="center">
                <CalendarOutlined
                  style={{
                    fontSize: screen.lg ? 48 : 60,
                  }}
                />
                <div>
                  <Typography.Title
                    style={{
                      color: "#EDF4ED",
                      fontSize: screen.lg ? 24 : 20,
                    }}
                    level={4}
                  >
                    WHAT YOU WANT
                  </Typography.Title>
                  <Typography.Paragraph
                    style={{
                      color: "#EDF4ED",
                    }}
                  >
                    Find the Best Event for You
                  </Typography.Paragraph>
                </div>
              </Flex>
            </Col>
            <Col xs={24} lg={18}>
              <FormInput
                styleProp={{
                  background: "#EDF4ED",
                }}
                name="query"
                type="search"
                size="large"
                placeholder="Eco friendly wedding"
                suffix={
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    htmlType="submit"
                  >
                    Find Event
                  </Button>
                }
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default SearchBar;
