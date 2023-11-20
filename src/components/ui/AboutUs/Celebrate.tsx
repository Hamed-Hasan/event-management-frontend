"use client";
import styles from "@/styles/About.module.css";
import { Button, Flex, Grid, Typography } from "antd";
import Link from "next/link";

const { useBreakpoint } = Grid;

const Celebrate = () => {
  const screen = useBreakpoint();
  return (
    <div className={styles.celebrate}>
      <div className="container">
        <Flex
          justify="center"
          style={{
            flexDirection: "column",
            width: screen.lg ? "50%" : "100%",
            textAlign: "center",
            margin: "auto",
          }}
        >
          <Link href="/contact-us">
            <Button type="primary">Celebrate with GreenEcovents</Button>
          </Link>
          <Typography.Title
            style={{
              color: "#EDF4ED",
              marginTop: 20,
              fontSize: screen.lg ? 24 : 18,
            }}
            level={3}
          >
            Plan your Birthday Celebration with us!
          </Typography.Title>
          <Typography.Paragraph
            style={{
              color: "#EDF4ED",
              fontSize: screen.lg ? 18 : 14,
            }}
          >
            We will distribute FREE GIFTS to every single kid - That’s Our
            Promise!
          </Typography.Paragraph>
        </Flex>
      </div>
    </div>
  );
};

export default Celebrate;
