import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MiniLineChartProps {
  data: number[];
  color: string;
}

export const MiniLineChart = ({ data, color }: MiniLineChartProps) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};