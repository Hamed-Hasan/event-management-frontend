import google from "@/assets/google.svg";
import grab from "@/assets/grab.svg";
import medium from "@/assets/medium.svg";
import microsoft from "@/assets/microsoft.svg";
import spotify from "@/assets/spotify.svg";
import stripe from "@/assets/stripe.svg";
import uber from "@/assets/uber.svg";
import youtube from "@/assets/youtube.svg";
import zoom from "@/assets/zoom.svg";
import { Col, Row } from "antd";
import Image from "next/image";

const Partners = () => {
  const partners = [
    {
      name: "Google",
      image: google,
    },
    {
      name: "Microsoft",
      image: microsoft,
    },
    {
      name: "Grab",
      image: grab,
    },
    {
      name: "Medium",
      image: medium,
    },
    {
      name: "Uber",
      image: uber,
    },
    {
      name: "Stripe",
      image: stripe,
    },
    {
      name: "Youtube",
      image: youtube,
    },
    {
      name: "Spotify",
      image: spotify,
    },
    {
      name: "Zoom",
      image: zoom,
    },
  ];
  return (
    <div className="container">
      <h3 className="section-title">Join these brands</h3>
      <p
        style={{
          textAlign: "center",
          marginTop: 10,
          marginBottom: 30,
        }}
      >
        We&apos;ve had the pleasure of working with industry-defining brands.
        These are just some of them.
      </p>
      <Row gutter={[10, 10]}>
        {partners.map((partner) => (
          <Col key={partner.name} xs={12} sm={8} md={4}>
            <Image
              width={120}
              height={50}
              src={partner.image}
              alt={partner.name}
              draggable={false}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Partners;
