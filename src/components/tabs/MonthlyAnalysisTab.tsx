import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, IndianRupee, Package, ShoppingBag, BarChart3, Users } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

interface MonthlyAnalysisTabProps {
  onBack: () => void;
}

// Current month daily data
const dailyData = [
  { day: "1", revenue: 12500, orders: 18 },
  { day: "5", revenue: 18200, orders: 25 },
  { day: "10", revenue: 15800, orders: 22 },
  { day: "15", revenue: 22100, orders: 32 },
  { day: "20", revenue: 19500, orders: 28 },
  { day: "25", revenue: 25300, orders: 38 },
  { day: "30", revenue: 28600, orders: 42 },
];

// Weekly breakdown
const weeklyData = [
  { week: "Week 1", revenue: 85000, orders: 120, profit: 17000, topProduct: "Classmate Notebook" },
  { week: "Week 2", revenue: 92000, orders: 135, profit: 18400, topProduct: "Apsara Pencil Set" },
  { week: "Week 3", revenue: 78000, orders: 108, profit: 15600, topProduct: "Samosa" },
  { week: "Week 4", revenue: 98000, orders: 145, profit: 19600, topProduct: "School Bag Premium" },
];

// Top purchases this month
const topPurchases = [
  { id: 1, product: "Classmate Notebook (200 pages)", quantity: 245, revenue: 20825, growth: 18.5 },
  { id: 2, product: "Apsara Pencil Set (10 pcs)", quantity: 189, revenue: 9450, growth: 12.3 },
  { id: 3, product: "Camlin Geometry Box", quantity: 85, revenue: 15300, growth: 8.2 },
  { id: 4, product: "School Bag (Premium)", quantity: 42, revenue: 35700, growth: 25.8 },
  { id: 5, product: "Samosa (2 pcs)", quantity: 320, revenue: 12800, growth: 15.2 },
];

// Category breakdown
const categoryData = [
  { name: "Notebooks", value: 30, revenue: 105000, color: "hsl(var(--primary))" },
  { name: "Writing Supplies", value: 25, revenue: 87500, color: "hsl(var(--secondary))" },
  { name: "Food & Drinks", value: 22, revenue: 77000, color: "hsl(var(--accent))" },
  { name: "Bags & Supplies", value: 15, revenue: 52500, color: "hsl(var(--success))" },
  { name: "Art & Craft", value: 8, revenue: 28000, color: "hsl(var(--destructive))" },
];

// Customer segments
const customerSegments = [
  { segment: "Students", orders: 385, percentage: 65 },
  { segment: "Staff", orders: 148, percentage: 25 },
  { segment: "Visitors", orders: 59, percentage: 10 },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  orders: { label: "Orders", color: "hsl(var(--secondary))" },
  profit: { label: "Profit", color: "hsl(var(--success))" },
};

export const MonthlyAnalysisTab = ({ onBack }: MonthlyAnalysisTabProps) => {
  const currentMonthRevenue = weeklyData.reduce((sum, w) => sum + w.revenue, 0);
  const currentMonthOrders = weeklyData.reduce((sum, w) => sum + w.orders, 0);
  const currentMonthProfit = weeklyData.reduce((sum, w) => sum + w.profit, 0);
  const avgOrderValue = currentMonthRevenue / currentMonthOrders;

  // Simulated previous month for comparison
  const prevMonthRevenue = 320000;
  const prevMonthOrders = 480;
  
  const revenueChange = ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue * 100).toFixed(1);
  const ordersChange = ((currentMonthOrders - prevMonthOrders) / prevMonthOrders * 100).toFixed(1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onBack}
          className="btn-press hover:bg-primary/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold gradient-text">Monthly Analysis - December 2024</h2>
          <p className="text-muted-foreground">Detailed breakdown of this month's performance</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift card-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-2xl font-bold gradient-text">₹{currentMonthRevenue.toLocaleString()}</p>
                <Badge variant={Number(revenueChange) > 0 ? "default" : "destructive"} className="mt-2 gap-1">
                  {Number(revenueChange) > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {revenueChange}% vs last month
                </Badge>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <IndianRupee className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-secondary">{currentMonthOrders}</p>
                <Badge variant={Number(ordersChange) > 0 ? "default" : "destructive"} className="mt-2 gap-1">
                  {Number(ordersChange) > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {ordersChange}% vs last month
                </Badge>
              </div>
              <div className="p-3 rounded-xl bg-secondary/10">
                <Package className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Profit</p>
                <p className="text-2xl font-bold text-success">₹{currentMonthProfit.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {((currentMonthProfit / currentMonthRevenue) * 100).toFixed(1)}% margin
                </p>
              </div>
              <div className="p-3 rounded-xl bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold text-accent">₹{avgOrderValue.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground mt-2">Per transaction</p>
              </div>
              <div className="p-3 rounded-xl bg-accent/10">
                <ShoppingBag className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Revenue Trend */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Daily Revenue Trend
            </CardTitle>
            <CardDescription>Revenue pattern throughout the month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="dailyRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}K`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#dailyRevenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Product category breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <ChartContainer config={chartConfig} className="h-[200px] w-[200px]">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="space-y-3 flex-1">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{cat.value}%</span>
                      <p className="text-xs text-muted-foreground">₹{(cat.revenue/1000).toFixed(0)}K</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Breakdown */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-secondary" />
            Weekly Breakdown
          </CardTitle>
          <CardDescription>Week by week performance summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {weeklyData.map((week, index) => (
              <Card key={week.week} className="bg-muted/30 border animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-3">{week.week}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Revenue</span>
                      <span className="text-sm font-medium">₹{(week.revenue/1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Orders</span>
                      <span className="text-sm font-medium">{week.orders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Profit</span>
                      <span className="text-sm font-medium text-success">₹{(week.profit/1000).toFixed(0)}K</span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-xs text-muted-foreground">Top: </span>
                      <span className="text-xs font-medium">{week.topProduct}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Purchases & Customer Segments */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Purchases */}
        <Card className="lg:col-span-2 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-accent" />
              Top Purchases This Month
            </CardTitle>
            <CardDescription>Best performing products</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Qty Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPurchases.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">₹{item.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={item.growth > 0 ? "default" : "destructive"} className="gap-1">
                        {item.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {item.growth > 0 ? "+" : ""}{item.growth}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Customer Segments */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Customer Segments
            </CardTitle>
            <CardDescription>Order distribution by user type</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {customerSegments.map((seg) => (
              <div key={seg.segment} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{seg.segment}</span>
                  <span className="font-medium">{seg.orders} orders</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                    style={{ width: `${seg.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">{seg.percentage}% of total</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Summary Insights */}
      <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle>📊 Monthly Summary & Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold text-success mb-2">✅ Highlights</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Revenue up {revenueChange}% from last month</li>
                <li>• School Bag sales grew 25.8%</li>
                <li>• Week 4 was the strongest week</li>
              </ul>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold text-accent mb-2">⚠️ Areas to Watch</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Art supplies need restocking</li>
                <li>• Week 3 underperformed</li>
                <li>• Visitor orders only 10%</li>
              </ul>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">💡 Recommendations</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Promote notebook bundles midweek</li>
                <li>• Run back-to-school specials</li>
                <li>• Stock up on geometry boxes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};