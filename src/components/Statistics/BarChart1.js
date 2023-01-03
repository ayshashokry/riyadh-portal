import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data2021 = [
  {
    name: "1",
    pv: 54,
    amt: 2400,
  },
  {
    name: "2",
    pv: 41,
    amt: 2210,
  },
  {
    name: "3",
    pv: 47,
    amt: 2290,
  },
  {
    name: "4",
    pv: 42,
    amt: 2000,
  },
  {
    name: "5",
    pv: 34,
    amt: 2000,
  },
  {
    name: "6",
    pv: 76,
    amt: 2000,
  },
  {
    name: "7",
    pv: 33,
    amt: 2000,
  },
  {
    name: "8",
    pv: 55,
    amt: 2000,
  },
  {
    name: "9",
    pv: 51,
    amt: 2000,
  },
  {
    name: "10",
    pv: 69,
    amt: 2000,
  },
  {
    name: "11",
    pv: 55,
    amt: 2000,
  },
  {
    name: "12",
    pv: 80,
    amt: 2000,
  },
];

const data2022 = [
  {
    name: "1",
    pv: 50,
    amt: 2400,
  },
  {
    name: "2",
    pv: 46,
    amt: 2210,
  },
  {
    name: "3",
    pv: 62,
    amt: 2290,
  },
  {
    name: "4",
    pv: 33,
    amt: 2000,
  },
  {
    name: "5",
    pv: 66,
    amt: 2000,
  },
  {
    name: "6",
    pv: 67,
    amt: 2000,
  },
  {
    name: "7",
    pv: 17,
    amt: 2000,
  },
  {
    name: "8",
    pv: 70,
    amt: 2000,
  },
  {
    name: "9",
    pv: 51,
    amt: 2000,
  },
  {
    name: "10",
    pv: 31,
    amt: 2000,
  },
  {
    name: "11",
    pv: 63,
    amt: 2000,
  },
  {
    name: "12",
    pv: 26,
    amt: 2000,
  },
];
export default class BarChart1 extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="barChart1"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={5}>
        <BarChart
          width={500}
          height={300}
          data={this.props.selectedDate == 1 ? data2021 : data2022}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            dx={1}
            minTickGap={5}
            width={30}
            padding={{ left: 8 }}
            // label={{
            //   value: "معاملة",
            //   offset: "-4",
            //   position: "insideTopRight",
            // }}
            tickMargin={30}
          />
          {/* <Tooltip /> */}
          {/* <Legend /> */}
          <Bar dataKey="pv" fill="#08a76c" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
