import {
  LineChart,
  PieChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  type TooltipProps,
  type LegendProps,
  Pie,
} from "recharts";

const lineData = [
  {
    name: "Sunday",
    TI: 4000,
    PS: 2400,
    amt: 2400,
  },
  {
    name: "Monday",
    TI: 3000,
    PS: 1398,
    amt: 2210,
  },
  {
    name: "Tuesday",
    TI: 2000,
    PS: 9800,
    amt: 2290,
  },
  {
    name: "Wednesday",
    TI: 2780,
    PS: 3908,
    amt: 2000,
  },
  {
    name: "Thursday",
    TI: 1890,
    PS: 4800,
    amt: 2181,
  },
  {
    name: "Friday",
    TI: 2390,
    PS: 3800,
    amt: 2500,
  },
  {
    name: "Saturday",
    TI: 3490,
    PS: 4300,
    amt: 2100,
  },
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend: React.FC<LegendProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <div className="flex justify-start gap-4 mb-6 select-none">
      {payload.map((entry, index) => (
        <div
          key={`legend-item-${index}`}
          className="flex items-center cursor-pointer transition-colors hover:text-indigo-600"
          onClick={() => {
            // Optional: toggle series or add interaction
            console.log(`Clicked legend for ${entry.value}`);
          }}
        >
          <div
            className="w-4 h-4 rounded-sm mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-semibold text-sm text-gray-600">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export function LineChartView() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={600}
          height={300}
          data={lineData}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="#ccc"
            strokeLinejoin="round"
          />

          <XAxis dataKey="name" axisLine={false} tickLine={false} />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={<CustomLegend />}
            verticalAlign="top"
            align="left"
            layout="horizontal"
          />
          <Line
            type="monotone"
            dataKey="TI"
            name="Total Income"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="PS"
            name="Product Sold"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const pieData1 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const pieData2 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];
export function RaderChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Tooltip />
          <Pie
            data={pieData1}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
          />
          <Pie
            data={pieData2}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
