import { DatePicker, DatePickerProps, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type GEDatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
  startDate?: Dayjs;
  endDate?: Dayjs;
  picker?: "date" | "week" | "month" | "quarter" | "year";
  isDisabled?: boolean;
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size = "large",
  value,
  startDate,
  endDate,
  picker,
  isDisabled = false,
}: GEDatePikerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, date);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = dayjs().startOf("day");

    if (startDate) {
      return (
        current &&
        (current < today || current < dayjs(startDate).startOf("day"))
      );
    } else if (endDate) {
      return (
        current && (current < today || current > dayjs(endDate).endOf("day"))
      );
    }

    return current && current < today;
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledDateTime = () => {
    return {
      disabledHours: () => range(0, 24).splice(dayjs(value).hour(), 20),
      disabledMinutes: () => range(dayjs(value).minute(), 60),
      disabledSeconds: () => [55, 56],
    };
  };

  return (
    <div>
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
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            showTime
            placement="topRight"
            defaultValue={dayjs(field.value) || Date.now()}
            size={size}
            onChange={handleOnChange}
            style={{ width: "100%" }}
            disabledDate={isDisabled ? disabledDate : undefined}
            disabledTime={isDisabled ? disabledDateTime : undefined}
            picker={picker}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
