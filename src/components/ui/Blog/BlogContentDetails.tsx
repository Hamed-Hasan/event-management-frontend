"use client";

import { IBlog } from "@/interfaces/global";
import { Grid, Typography } from "antd";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

const { useBreakpoint } = Grid;

interface EventDetailsProps {
  blog: IBlog;
}

const BlogContentDetails = ({ blog }: EventDetailsProps) => {
  const screen = useBreakpoint();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const renderHTML = (rawHTML: any) =>
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: rawHTML },
      style: {
        whiteSpace: "pre-line",
      },
    });
  return (
    <div
      style={{
        margin: "20px 0",
      }}
    >
      <Typography.Title
        style={{
          fontSize: screen.lg ? 28 : 22,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 20,
        }}
        level={2}
        type="success"
      >
        {blog?.title}
      </Typography.Title>
      <div>
        <ReactQuill value={blog.content} readOnly={true} theme={"bubble"} />
      </div>
      <Typography.Title
        style={{
          margin: "20px 0",
        }}
        level={4}
        type="secondary"
      >
        Author: {blog?.user?.firstName} {blog?.user?.lastName || ""}
      </Typography.Title>
    </div>
  );
};

export default BlogContentDetails;
