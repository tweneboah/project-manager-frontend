import React from "react";
import DashboardChat from "../DashboardChat";

const data = [
  {
    id: "python",
    label: "python",
    value: 49,
    color: "hsl(209, 70%, 50%)"
  },
  {
    id: "hack",
    label: "hack",
    value: 341,
    color: "hsl(110, 70%, 50%)"
  },
  {
    id: "haskell",
    label: "haskell",
    value: 158,
    color: "hsl(84, 70%, 50%)"
  }
];

const ChartContainer = () => {
  return (
    <div style={{ height: "50vh" }}>
      <DashboardChat data={data} />
    </div>
  );
};

export default ChartContainer;
