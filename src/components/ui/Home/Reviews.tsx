"use client";
import axiosInstance from "@/helpers/axios/axiosInstance";
import { IApiResponse } from "@/interfaces/apiResponse";
import { IReview } from "@/interfaces/global";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Grid, Rate, Typography } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const { Meta } = Card;
const { useBreakpoint } = Grid;

const Reviews = () => {
  const screen = useBreakpoint();
  const [reviews, setReviews] = useState<IReview[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      const res = (await axiosInstance.get("/reviews"))?.data as IApiResponse;
      setReviews(res?.data);
      setIsLoading(false);
    };
    loadReviews();
  }, []);

  if (!reviews) return null;

  return (
    <div className="container">
      <h3 className="section-title">Client Feedbacks</h3>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        grabCursor={true}
        modules={[Autoplay, Navigation]}
        navigation={true}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {reviews?.length &&
          reviews.map((review) => (
            <SwiperSlide className="container" key={review?.id}>
              <Card
                hoverable
                style={{
                  height: "100%",
                }}
                loading={isLoading}
              >
                <div
                  style={{
                    margin: "10px 0",
                  }}
                >
                  {review.user?.profileImg ? (
                    <Image
                      src={review.user.profileImg}
                      alt=""
                      width={64}
                      height={64}
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        maxWidth: "100%",
                        border: "1px solid #ccc",
                      }}
                    />
                  ) : (
                    <Avatar size={64} icon={<UserOutlined />} />
                  )}
                </div>

                <Typography.Title
                  level={4}
                  style={{
                    fontSize: screen.lg ? 20 : 18,
                  }}
                  type="success"
                >
                  {review.user?.firstName} {review.user?.lastName}
                </Typography.Title>

                <Typography.Paragraph
                  style={{
                    fontSize: screen.lg ? 16 : 14,
                    maxHeight: 100,
                    overflowY: "auto",
                  }}
                  type="secondary"
                >
                  {review.review}
                </Typography.Paragraph>
                <Rate defaultValue={review.rating} disabled={true} allowHalf />
              </Card>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
