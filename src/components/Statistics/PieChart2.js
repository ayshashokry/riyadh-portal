import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const chart2021 = [
  {
    name: "Group B",
    value: 300,
    textValue: "",
    precent: 0,
    name1: "مرافق بلدية",
  },
  {
    name: "Group C",
    value: 300,
    textValue: "",
    precent: 0.08,
    name1: "مرافق مساحية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 0,
    name1: "مرافق أمنية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 0.26,
    name1: "استثمارات بلدية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 4.94,
    name1: "الحدائق",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 2.67,
    name1: "مرافق دينية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 1.02,
    name1: "مرافق تعليمية",
  },
  { name: "Group D", value: 200, textValue: "", precent: 'no', name1: "تجاري" },
  {
    name: "Group A",
    value: 1500,
    textValue: "سكني",
    precent: 48.2,
    name1: "سكني",
  },
];

const chart2022 = [
  {
    name: "Group B",
    value: 300,
    textValue: "",
    precent: 0.45,
    name1: "مرافق بلدية",
  },
  {
    name: "Group C",
    value: 300,
    textValue: "",
    precent: 0.15,
    name1: "مرافق صحية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 0.15,
    name1: "مرافق أمنية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 0.39,
    name1: "استثمارات بلدية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 18.23,
    name1: "الحدائق",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 2.11,
    name1: "مرافق دينية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 1.91,
    name1: "مرافق تعليمية",
  },
  {
    name: "Group D",
    value: 200,
    textValue: "",
    precent: 11.68,
    name1: "تجاري",
  },
  {
    name: "Group A",
    value: 1500,
    textValue: "سكني",
    precent: 52.11,
    name1: "سكني",
  },
];

const COLORS = [
  "#ADA9AE",
  "#929BA2",
  "#698EA7",
  "#79C8FE",
  "#A2B6D1",
  "#87B9FE",
  "#7BACD4",
  "#ACCFE7",
  "#08a76c",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  textValue,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {textValue}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chartTooltip">
        {console.log(payload)}
        <p className="tooltipLabel">{payload[0].payload?.name1}</p>
        <p className="tooltipLabelPrecent">{payload[0].payload?.precent!=='no'&&payload[0].payload?.precent+"%"} </p>
      </div>
    );
  }

  return null;
};
export default class PieChart2 extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" className="pieChart2">
        <PieChart width={400} height={400}>
          <Pie
            data={this.props.selectedDate == 1 ? chart2021 : chart2022}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {this.props.selectedDate == 1
              ? chart2021.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              : chart2022.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
