"use client";
import { Grid, Typography } from "antd";

const { useBreakpoint } = Grid;

type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
};

const ActionBar = ({ title, children }: ActionBarProps) => {
  const screen = useBreakpoint();
  return (
    <div
      style={{
        margin: screen.lg ? "10px 20px" : "10px 10px",
      }}
    >
      <Typography.Title level={3}>{title}</Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
