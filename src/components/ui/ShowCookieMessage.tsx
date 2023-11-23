"use client";
import cookie from "@/assets/cookie.png";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/localStorage";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShowCookieMessage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setToLocalStorage("cookie", "true");
    setShow(false);
  };

  useEffect(() => {
    const cookie = getFromLocalStorage("cookie");
    if (!cookie) {
      setShow(true);
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div>
      <Flex
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "10px 20px",
          background: "#3BA27A",
          color: "#EDF4ED",
        }}
        justify="center"
        align="start"
        gap={20}
        wrap="wrap"
      >
        <Image src={cookie} alt="" width={32} height={32} />
        <div>
          <h3>Cookie Notice</h3>
          <Flex align="center" wrap="wrap">
            <p style={{ marginRight: 5 }}>
              We use cookies to ensure you get the best experience on our
              website.
            </p>
            <Link href="/privacy-policy" style={{ color: "#EDF4ED" }}>
              Learn more
            </Link>
          </Flex>
        </div>

        <Button type="dashed" onClick={handleClose}>
          Accept
          <CheckCircleOutlined />
        </Button>
      </Flex>
    </div>
  );
};

export default ShowCookieMessage;
