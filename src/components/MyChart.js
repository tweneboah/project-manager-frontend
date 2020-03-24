// import React, { useEffect } from "react";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip
// } from "recharts";
// const data = [
//   { name: "Page A", amt: 100 },
//   { name: "Page B", amt: 300 },
//   { name: "Page C", amt: 900 }
// ];

// const MyChart = () => {
//   return (
//     <div style={{ marginTop: "200px" }}>
//       <LineChart
//         width={600}
//         height={300}
//         data={data}
//         margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//         <Line type="monotone" dataKey="amt" stroke="red" />
//         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//       </LineChart>
//     </div>
//   );
// };

// export default MyChart;

import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Money Invested",

    amount: `${6}`
  },
  {
    name: "Money Left",
    amount: 90
  },
  {
    name: "Money Spent",
    amount: 89
  }
];

export default class MyChart extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/7j5bbbum/";

  render() {
    return (
      <div style={{ width: "50%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="amount" stroke="green" fill="red" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
