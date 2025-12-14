import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Package, IndianRupee, TrendingUp, Percent } from "lucide-react";
import { UsersStats } from "./UsersStats";
import { MiniLineChart } from "./MiniLineChart";
import { useProducts } from "@/contexts/ProductContext";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  delay?: string;
  gradient?: string;
  chartData?: number[];
  chartColor?: string;
}

const StatCard = ({ title, value, icon, trend, trendUp = true, delay, gradient, chartData, chartColor }: StatCardProps) => (
  <Card 
    className="group overflow-hidden border hover-lift card-glow bg-gradient-to-br from-card via-card to-muted/20 animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
      <div className={`p-2.5 rounded-xl ${gradient || 'bg-gradient-to-br from-primary/10 to-secondary/10'} transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="text-3xl font-bold gradient-text tracking-tight">
        {value}
      </div>
      {chartData && chartColor && (
        <div className="h-12 w-full">
          <MiniLineChart data={chartData} color={chartColor} />
        </div>
      )}
      {trend && (
        <div className="flex items-center gap-1">
          <TrendingUp className={`h-3 w-3 ${trendUp ? 'text-success' : 'text-destructive rotate-180'}`} />
          <span className={`text-xs font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
            {trend}
          </span>
          <span className="text-xs text-muted-foreground">from last month</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  const { products } = useProducts();
  
  // Calculate total profit revenue (price * profit margin for all products)
  const totalProfitRevenue = products.reduce((sum, product) => {
    const profitMargin = product.profitMargin || 20; // Default 20% if not set
    return sum + (product.price * product.stock * (profitMargin / 100));
  }, 0);

  const stats = [
    {
      title: "Active Carts",
      value: "156",
      icon: <ShoppingCart className="h-5 w-5 text-secondary" />,
      trend: "+8.2%",
      trendUp: true,
      delay: "0.1s",
      gradient: "bg-gradient-to-br from-secondary/15 to-secondary/5",
      chartData: [45, 52, 38, 65, 48, 72, 56, 78],
      chartColor: "hsl(var(--secondary))",
    },
    {
      title: "Total Orders",
      value: "4,392",
      icon: <Package className="h-5 w-5 text-accent" />,
      trend: "+18.7%",
      trendUp: true,
      delay: "0.15s",
      gradient: "bg-gradient-to-br from-accent/15 to-accent/5",
      chartData: [120, 145, 132, 168, 155, 189, 172, 195],
      chartColor: "hsl(var(--accent))",
    },
    {
      title: "Revenue",
      value: "₹3,45,670",
      icon: <IndianRupee className="h-5 w-5 text-primary" />,
      trend: "+23.1%",
      trendUp: true,
      delay: "0.2s",
      gradient: "bg-gradient-to-br from-primary/15 to-primary/5",
      chartData: [28000, 32000, 29000, 38000, 35000, 42000, 39000, 45000],
      chartColor: "hsl(var(--primary))",
    },
    {
      title: "Profit Revenue",
      value: `₹${totalProfitRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: <Percent className="h-5 w-5 text-success" />,
      trend: "+15.3%",
      trendUp: true,
      delay: "0.25s",
      gradient: "bg-gradient-to-br from-success/15 to-success/5",
      chartData: [5600, 6200, 5800, 7200, 6800, 8100, 7500, 8800],
      chartColor: "hsl(var(--success))",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <UsersStats />
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};
