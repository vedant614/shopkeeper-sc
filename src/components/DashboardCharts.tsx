import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

const salesData = [
  { name: "Mon", sales: 4500 },
  { name: "Tue", sales: 3200 },
  { name: "Wed", sales: 5800 },
  { name: "Thu", sales: 4100 },
  { name: "Fri", sales: 6200 },
  { name: "Sat", sales: 2800 },
  { name: "Sun", sales: 1900 },
];

const categoryData = [
  { name: "Notebooks", value: 30, color: "hsl(270, 70%, 55%)" },
  { name: "Writing", value: 25, color: "hsl(200, 80%, 60%)" },
  { name: "Food & Drinks", value: 25, color: "hsl(45, 100%, 55%)" },
  { name: "Bags & Supplies", value: 20, color: "hsl(150, 70%, 45%)" },
];

const chartConfig = {
  sales: {
    label: "Sales (₹)",
    color: "hsl(270, 70%, 55%)",
  },
};

export const DashboardCharts = () => {
  return (
    <div className="space-y-4 lg:col-span-1">
      {/* Weekly Sales Bar Chart */}
      <Card className="overflow-hidden border animate-slide-up" style={{ animationDelay: "0.35s" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Weekly Sales
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[180px] w-full">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/50" vertical={false} />
              <XAxis dataKey="name" className="text-muted-foreground" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis className="text-muted-foreground" tickLine={false} axisLine={false} fontSize={11} tickFormatter={(value) => `₹${value / 1000}k`} />
              <ChartTooltip 
                content={<ChartTooltipContent formatter={(value) => `₹${value}`} />} 
              />
              <Bar 
                dataKey="sales" 
                fill="url(#barGradient)" 
                radius={[6, 6, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(270, 70%, 55%)" />
                  <stop offset="100%" stopColor="hsl(200, 80%, 60%)" />
                </linearGradient>
              </defs>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Pie Chart */}
      <Card className="overflow-hidden border animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Sales by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <ChartContainer config={chartConfig} className="h-[140px] w-[140px]">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={60}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex-1 space-y-2">
              {categoryData.map((item, index) => (
                <div 
                  key={item.name} 
                  className="flex items-center justify-between text-sm animate-fade-in"
                  style={{ animationDelay: `${0.45 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
