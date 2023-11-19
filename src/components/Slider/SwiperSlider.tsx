"use client";
import { IEvent } from "@/interfaces/global";
import { Button, Col, Flex, Grid, Row } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const { useBreakpoint } = Grid;

interface SwiperSliderProps {
  events: IEvent[];
}

const SwiperSlider = ({ events }: SwiperSliderProps) => {
  const screen = useBreakpoint();
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      grabCursor={true}
      modules={[Autoplay, Navigation]}
      navigation={true}
      slidesPerView={1}
      className="hero-slider"
    >
      {events?.length &&
        events.map((event) => (
          <SwiperSlide className="container" key={event?.id}>
            <Row gutter={[20, 20]} align="middle">
              <Col xs={24} md={8}>
                <Image
                  src={event?.image}
                  alt={event?.title}
                  width={screen.lg ? 300 : 200}
                  height={screen.lg ? 300 : 200}
                  style={{
                    border: "solid 5px #b9b6bf",
                    borderRadius: 9,
                  }}
                />
              </Col>
              <Col
                xs={24}
                md={16}
                style={{
                  textAlign: screen.lg ? "left" : "center",
                }}
              >
                <h2
                  style={{
                    fontSize: screen.lg ? 48 : screen.md ? 30 : 24,
                  }}
                >
                  {event?.title}
                </h2>
                <Flex
                  gap={screen.lg ? 20 : 4}
                  align="center"
                  justify={screen.lg ? "flex-start" : "center"}
                  wrap="wrap"
                  style={{
                    margin: "10px 0",
                  }}
                >
                  <h4
                    style={{
                      fontSize: screen.lg ? 34 : screen.md ? 20 : 18,
                      fontWeight: "500",
                    }}
                  >
                    From {dayjs(event?.startDate).format("MMM D, YYYY")}{" "}
                  </h4>
                  <h4
                    style={{
                      fontSize: screen.lg ? 34 : screen.md ? 20 : 18,

                      fontWeight: "500",
                    }}
                  >
                    To {dayjs(event?.endDate).format("MMM D, YYYY")} {"  "}
                  </h4>
                  <h4
                    style={{
                      fontSize: screen.lg ? 34 : screen.md ? 20 : 18,

                      fontWeight: "500",
                    }}
                  >
                    On {event?.location}
                  </h4>
                </Flex>
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <Link href={`/events/${event.id}`}>
                    <Button type="primary">View Details</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperSlider;
