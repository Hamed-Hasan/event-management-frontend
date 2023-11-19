"use client";

import { getErrorMessage } from "@/utils/schemaValidator";
import { Input, InputNumber, Typography } from "antd";
import { ReactElement, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | number | number[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  suffix?: ReactElement | ReactNode;
  prefix?: ReactElement | ReactNode;
  helperText?: string;
  styleProp?: any;
  disable?: boolean;
  rows?: number;
  onChange?: (value: string | number | undefined) => void;
  min?: number;
  max?: number;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  suffix,
  prefix,
  helperText,
  styleProp,
  disable,
  rows,
  min,
  max,
  onChange,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessage(errors, name);

  const handleOnChange = (value: any) => {
    onChange ? onChange(value) : null;
  };

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
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              value={value ? value : field.value}
              suffix={suffix}
              prefix={prefix}
              style={styleProp}
              disabled={disable}
            />
          ) : type === "text-area" ? (
            <Input.TextArea
              {...field}
              size={size}
              placeholder={placeholder}
              value={value ? value : field.value}
              style={styleProp}
              disabled={disable}
              rows={rows}
            />
          ) : type === "number" ? (
            <InputNumber
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              value={value ? value : field.value}
              suffix={suffix}
              prefix={prefix}
              style={styleProp}
              disabled={disable}
              onChange={handleOnChange}
              defaultValue={value}
              min={min}
              max={max}
            />
          ) : (
            <Input
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              value={value ? value : field.value}
              suffix={suffix}
              prefix={prefix}
              style={styleProp}
              disabled={disable}
            />
          )
        }
      />

      {errorMessage ? (
        <Typography.Paragraph
          style={{
            fontSize: 12,
            lineHeight: "10px",
            marginTop: 5,
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
            marginTop: 5,
          }}
          type="secondary"
        >
          {helperText}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default FormInput;
