"use client";

import { getErrorMessage } from "@/utils/schemaValidator";
import { Rate, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;

  value?: string | string[] | undefined;

  label?: string;

  helperText?: string;
  styleProp?: any;
  disable?: boolean;
}

const Rating = ({
  name,

  value,

  label,

  helperText,
  styleProp,
  disable,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  return (
    <div
      style={{
        margin: "10px 0",
      }}
    >
      <Typography.Paragraph
        style={{
          marginBottom: 5,
          display: "block",
        }}
      >
        {label}
      </Typography.Paragraph>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Rate
            {...field}
            value={value ? value : field.value}
            style={styleProp}
            disabled={disable}
            allowHalf={true}
            allowClear={true}
          />
        )}
      />

      {errorMessage ? (
        <Typography.Paragraph
          style={{
            fontSize: 12,
            lineHeight: "10px",
            display: "block",
          }}
          type="danger"
        >
          {errorMessage}
        </Typography.Paragraph>
      ) : (
        <Typography.Paragraph
          style={{
            fontSize: 12,
            lineHeight: "10px",
            display: "block",
          }}
          type="secondary"
        >
          {helperText}
        </Typography.Paragraph>
      )}
    </div>
  );
};

export default Rating;
