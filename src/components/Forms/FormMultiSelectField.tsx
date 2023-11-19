"use client";

import { Select, Typography } from "antd";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectOptions {
  label: string;
  value: string;
}

interface SelectFieldProps {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  isLoading?: boolean;
}

const FormMultiSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  isLoading,
}: SelectFieldProps) => {
  const { control } = useFormContext();

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
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={onChange}
            size={size}
            options={options}
            value={value}
            style={{ width: "100%" }}
            placeholder={placeholder}
            allowClear
            mode="multiple"
            loading={isLoading}
          />
        )}
      />
    </>
  );
};

export default FormMultiSelectField;
