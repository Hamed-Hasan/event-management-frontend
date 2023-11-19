import { getErrorMessage } from "@/utils/schemaValidator";
import { DatePicker, DatePickerProps, Flex, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import { Controller, useFormContext } from "react-hook-form";

const { RangePicker } = DatePicker;

type GERangePikerProps = {
  onChange?: (
    valOne: dayjs.Dayjs | RangeValue<dayjs.Dayjs> | undefined,
    valTwo: string | string[]
  ) => void;
  name: string[];
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
  startDate?: Dayjs;
  endDate?: Dayjs;
  isShowtime?: boolean;
  isAllowClear?: boolean;
  helperText?: string;
};

const FormRangePicker = ({
  name,
  label,
  onChange,
  startDate,
  endDate,
  size = "large",
  isShowtime = false,
  isAllowClear = false,
  helperText,
}: GERangePikerProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage1 = getErrorMessage(errors, name[0]);
  const errorMessage2 = getErrorMessage(errors, name[1]);

  const today = dayjs().startOf("day");

  const handleOnChange = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    if (!value) {
      return;
    }
    onChange ? onChange(value, dateString) : null;
    // @ts-ignore
    setValue(name[0], value[0]);
    // @ts-ignore
    setValue(name[1], value[1]);
  };
  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    if (!value) {
      return;
    }
    // @ts-ignore
    setValue(name[0], value[0]);
    // @ts-ignore
    setValue(name[1], value[1]);
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    if (startDate && endDate) {
      return (
        current &&
        (current < today ||
          current < dayjs(startDate).startOf("day") ||
          current > dayjs(endDate).endOf("day"))
      );
    }
    return current && current < today;
  };

  const disabledRangeTime: RangePickerProps["disabledTime"] = (_, type) => {
    if (!startDate || !endDate) {
      return {};
    }
    if (type === "start") {
      return {
        disabledHours: () => range(0, 24)?.splice(0, dayjs(startDate)?.hour()),
        disabledMinutes: () =>
          range(0, 60)?.splice(0, dayjs(startDate)?.minute()),
        disabledSeconds: () =>
          range(0, 60)?.splice(0, dayjs(startDate)?.second()),
      };
    }
    return {
      disabledHours: () => range(0, 24)?.splice(dayjs(endDate)?.hour() + 1),
      disabledMinutes: () => range(0, 60)?.splice(dayjs(endDate)?.minute() + 1),
      disabledSeconds: () => range(0, 60)?.splice(dayjs(endDate)?.second() + 1),
    };
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
      <br />
      <Controller
        name={name[0]}
        control={control}
        render={({ field }) => (
          <RangePicker
            placement="topRight"
            showTime={isShowtime}
            allowClear={isAllowClear}
            size={size}
            onOk={onOk}
            style={{ width: "100%" }}
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            onChange={handleOnChange}
            defaultValue={[today, today.add(2, "day")]}
          />
        )}
      />
      {errorMessage1 || errorMessage2 ? (
        <Flex
          style={{
            marginTop: 5,
          }}
          justify="space-between"
          gap={4}
        >
          <Typography.Paragraph
            style={{
              fontSize: 12,
              lineHeight: "10px",
              marginTop: 5,
            }}
            type="danger"
          >
            {errorMessage1}
          </Typography.Paragraph>
          <Typography.Paragraph
            style={{
              fontSize: 12,
              lineHeight: "10px",
              marginTop: 5,
            }}
            type="danger"
          >
            {errorMessage2}
          </Typography.Paragraph>
        </Flex>
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

export default FormRangePicker;
