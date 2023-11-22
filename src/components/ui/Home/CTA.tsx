import { Button, Col, Row } from "antd";
import eventPlanner from "@/assets/event-planner.svg";
import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <div
      style={{
        marginTop: 50,
      }}
      className="container"
    >
      <Row
        style={{
          background: "#3BA27A",
          color: "#EDF4ED",
          padding: "40px 60px",
          borderRadius: 10,
          // width: "80%",
          margin: "auto",
        }}
        align="middle"
      >
        <Col xs={0} sm={0} lg={6}>
          <Image
            style={{
              marginTop: -150,
            }}
            width={200}
            height={200}
            src={eventPlanner}
            alt=""
          />
        </Col>
        <Col xs={24} sm={24} lg={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h3
                style={{
                  marginBottom: 6,
                }}
              >
                WHAT YOU WANT
              </h3>
              <p>Find the Best Event for You</p>
            </div>
            <div>
              <Link href="/events">
                <Button type="dashed">Find Event</Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CTA;
