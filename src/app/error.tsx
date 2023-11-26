"use client";

import { Button, Typography } from "antd";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Typography.Title level={1} type="danger">
        Something went wrong!
      </Typography.Title>
      <Button type="primary" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
