import notFound from "@/assets/not-found.svg";
import { Button } from "antd";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found - GreenEcovents",
  description: "Page Not Found",
};

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          maxWidth: "100%",
        }}
        src={notFound}
        alt="not-found"
        width={500}
        height={500}
      />
      <div>
        <Link href="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
