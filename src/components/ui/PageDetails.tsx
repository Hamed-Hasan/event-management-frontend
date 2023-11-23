"use client";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
interface PageDetailsProps {
  content: string;
}

const PageDetails = ({ content }: PageDetailsProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  if (!content) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Spin size="large" />
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        margin: "20px 0",
      }}
    >
      <ReactQuill value={content} readOnly={true} theme={"bubble"} />
    </div>
  );
};

export default PageDetails;
