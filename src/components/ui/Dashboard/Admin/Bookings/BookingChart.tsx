import { IBookingData } from "@/interfaces/global";
import { Empty } from "antd";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IBookingChartProps {
  bookingData: IBookingData[] | undefined;
}

const BookingChart = ({ bookingData }: IBookingChartProps) => {
  if (!bookingData?.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 0",
        }}
      >
        <Empty
          description={
            <h3
              style={{
                color: "#F14947",
                fontSize: 24,
              }}
            >
              No booking found
            </h3>
          }
        />
      </div>
    );
  }

  return (
    <div
      style={{
        height: 500,
        margin: "30px 0",
      }}
    >
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <AreaChart
          data={bookingData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorTotalRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3BA27A" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3BA27A" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTotalBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#446DB7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#446DB7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="totalBookings"
            stroke="#446DB7"
            fillOpacity={1}
            fill="url(#colorTotalBookings)"
          />
          <Area
            type="monotone"
            dataKey="totalRevenue"
            stroke="#3BA27A"
            fillOpacity={1}
            fill="url(#colorTotalRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
