import ScrollCount from "@/utils/ScrollCount";
import { Col, Row } from "antd";
import events from "@/assets/calendar.png";
import clients from "@/assets/rating.png";
import trophy from "@/assets/trophy.png";
import comments from "@/assets/bubble-chat.png";

const CountUp = () => (
  <div className="container">
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} lg={6}>
        <ScrollCount target={150} label="Featured Events" icon={events} />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <ScrollCount target={50} label="Happy Clients" icon={clients} />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <ScrollCount target={40} label="Good Comments" icon={comments} />
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <ScrollCount target={17} label="Trophies Won" icon={trophy} />
      </Col>
    </Row>
  </div>
);

export default CountUp;
