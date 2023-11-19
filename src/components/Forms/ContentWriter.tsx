"use client";

import { Typography } from "antd";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

interface IInput {
  name: string;
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
}

const ContentWriter = ({ name, value, label, placeholder }: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "align",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <Typography.Paragraph
        style={{
          marginBottom: 5,
          display: "inline-block",
        }}
      >
        {label}
      </Typography.Paragraph>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactQuill
            className="blog-writer"
            theme="snow"
            {...field}
            placeholder={placeholder}
            value={value ? value : field.value}
            modules={modules}
            formats={formats}
          />
        )}
      />
    </>
  );
};

export default ContentWriter;
