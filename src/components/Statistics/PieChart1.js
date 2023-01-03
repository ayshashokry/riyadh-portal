import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 30,    precent: 30,
  name1: "المعاملات تحت الدراسة" },
  { name: 'Group B', value: 70 ,   precent: 70,
  name1: "المعاملات المنجزة", },

];

const COLORS = [ '#ada9ae','#08a76c'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chartTooltip">
        {console.log(payload)}
        <p className="tooltipLabel">{payload[0].payload?.name1}</p>
        <p className="tooltipLabelPrecent">{payload[0].payload?.precent}% </p>
      </div>
    );
  }

  return null;
};

export default class PieChart1 extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%" className='pieChart1'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            // fill="#8884d8"
            label
          >
         {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}</Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
