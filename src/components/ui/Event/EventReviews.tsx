"use client";
import { Avatar, Col, Flex, Grid, List, Row, Typography } from "antd";
import { IReview } from "@/interfaces/global";
import { StarFilled, UserOutlined } from "@ant-design/icons";
import Image from "next/image";

const { useBreakpoint } = Grid;

interface EventReviewsProps {
  reviews: IReview[];
}

const EventReviews = ({ reviews }: EventReviewsProps) => {
  const screen = useBreakpoint();
  return (
    <div
      style={{
        margin: "20px 0",
        borderTop: "1px solid #EDF4ED",
        paddingTop: "20px",
      }}
    >
      <Typography.Title
        style={{
          fontSize: screen.lg ? 24 : 20,
        }}
        level={4}
      >
        Reviews
      </Typography.Title>
      <Row
        style={{
          margin: "20px 0",
        }}
        gutter={[10, 10]}
      >
        {reviews.map((review: IReview) => (
          <Col key={review.id} xs={24}>
            <Flex
              style={{
                border: "1px solid #EDF4ED",
                padding: "10px 20px",
                borderRadius: 10,
              }}
              gap={20}
              align="start"
              justify="start"
            >
              <>
                {review?.user?.profileImg ? (
                  <Image
                    src={review?.user?.profileImg}
                    alt=""
                    width={50}
                    height={50}
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <Avatar size={screen.lg ? 50 : 30} icon={<UserOutlined />} />
                )}
              </>
              <div>
                <Typography.Paragraph
                  style={{ fontSize: screen.lg ? 16 : 14, marginBottom: 5 }}
                  type="success"
                >
                  {review.review}
                </Typography.Paragraph>
                <StarFilled style={{ color: "#FFD700" }} />
                <Typography.Text strong style={{ marginLeft: "5px" }}>
                  {review.rating}
                </Typography.Text>
              </div>
            </Flex>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default EventReviews;
