import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar, IndianRupee, Package, GraduationCap, Award, Target, BarChart3 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from "recharts";

interface AnnualAnalysisTabProps {
  onBack: () => void;
}

// School Year Data (April to March)
const schoolYearData = [
  { month: "Apr", revenue: 185000, orders: 280, profit: 37000, students: 420 },
  { month: "May", revenue: 210000, orders: 320, profit: 42000, students: 435 },
  { month: "Jun", revenue: 125000, orders: 180, profit: 25000, students: 280 }, // Summer break
  { month: "Jul", revenue: 245000, orders: 380, profit: 49000, students: 450 },
  { month: "Aug", revenue: 289000, orders: 420, profit: 57800, students: 465 },
  { month: "Sep", revenue: 312000, orders: 460, profit: 62400, students: 480 },
  { month: "Oct", revenue: 335000, orders: 510, profit: 67000, students: 490 },
  { month: "Nov", revenue: 298000, orders: 440, profit: 59600, students: 485 },
  { month: "Dec", revenue: 353000, orders: 508, profit: 70600, students: 492 },
  { month: "Jan", revenue: 278000, orders: 410, profit: 55600, students: 478 },
  { month: "Feb", revenue: 295000, orders: 435, profit: 59000, students: 482 },
  { month: "Mar", revenue: 320000, orders: 480, profit: 64000, students: 488 },
];

// Quarterly breakdown
const quarterlyData = [
  { quarter: "Q1 (Apr-Jun)", revenue: 520000, orders: 780, profit: 104000, growth: 0 },
  { quarter: "Q2 (Jul-Sep)", revenue: 846000, orders: 1260, profit: 169200, growth: 62.7 },
  { quarter: "Q3 (Oct-Dec)", revenue: 986000, orders: 1458, profit: 197200, growth: 16.5 },
  { quarter: "Q4 (Jan-Mar)", revenue: 893000, orders: 1325, profit: 178600, growth: -9.4 },
];

// Category annual performance
const annualCategoryData = [
  { name: "Notebooks", thisYear: 1450000, lastYear: 1280000, growth: 13.3, color: "hsl(var(--primary))" },
  { name: "Writing Supplies", thisYear: 890000, lastYear: 820000, growth: 8.5, color: "hsl(var(--secondary))" },
  { name: "Food & Drinks", thisYear: 520000, lastYear: 480000, growth: 8.3, color: "hsl(var(--accent))" },
  { name: "Bags & Supplies", thisYear: 380000, lastYear: 320000, growth: 18.8, color: "hsl(var(--success))" },
  { name: "Art & Craft", thisYear: 205000, lastYear: 185000, growth: 10.8, color: "hsl(var(--destructive))" },
];

// Monthly comparison (this year vs last year)
const yearOverYearData = [
  { month: "Apr", thisYear: 185000, lastYear: 165000 },
  { month: "May", thisYear: 210000, lastYear: 185000 },
  { month: "Jun", thisYear: 125000, lastYear: 110000 },
  { month: "Jul", thisYear: 245000, lastYear: 220000 },
  { month: "Aug", thisYear: 289000, lastYear: 255000 },
  { month: "Sep", thisYear: 312000, lastYear: 280000 },
  { month: "Oct", thisYear: 335000, lastYear: 295000 },
  { month: "Nov", thisYear: 298000, lastYear: 265000 },
  { month: "Dec", thisYear: 353000, lastYear: 310000 },
  { month: "Jan", thisYear: 278000, lastYear: 250000 },
  { month: "Feb", thisYear: 295000, lastYear: 260000 },
  { month: "Mar", thisYear: 320000, lastYear: 285000 },
];

// Top products of the year
const topProductsAnnual = [
  { rank: 1, product: "Classmate Notebook (200 pages)", units: 4250, revenue: 361250, avgPrice: 85 },
  { rank: 2, product: "Apsara Pencil Set (10 pcs)", units: 3890, revenue: 194500, avgPrice: 50 },
  { rank: 3, product: "School Bag (Premium)", units: 520, revenue: 442000, avgPrice: 850 },
  { rank: 4, product: "Camlin Geometry Box", units: 1200, revenue: 216000, avgPrice: 180 },
  { rank: 5, product: "Reynolds Ball Pen (Pack of 5)", units: 2450, revenue: 147000, avgPrice: 60 },
];

// Monthly milestones
const milestones = [
  { month: "October", achievement: "Highest Monthly Revenue", value: "₹3,35,000", icon: "🏆" },
  { month: "September", achievement: "Most Orders in a Month", value: "510 orders", icon: "📦" },
  { month: "August", achievement: "Highest Student Engagement", value: "465 active", icon: "👨‍🎓" },
  { month: "December", achievement: "Best Profit Margin", value: "20% margin", icon: "💰" },
];

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  orders: { label: "Orders", color: "hsl(var(--secondary))" },
  profit: { label: "Profit", color: "hsl(var(--success))" },
  thisYear: { label: "This Year", color: "hsl(var(--primary))" },
  lastYear: { label: "Last Year", color: "hsl(var(--muted-foreground))" },
};

export const AnnualAnalysisTab = ({ onBack }: AnnualAnalysisTabProps) => {
  const totalRevenue = schoolYearData.reduce((sum, m) => sum + m.revenue, 0);
  const totalOrders = schoolYearData.reduce((sum, m) => sum + m.orders, 0);
  const totalProfit = schoolYearData.reduce((sum, m) => sum + m.profit, 0);
  const avgMonthlyRevenue = totalRevenue / 12;
  
  // Last year totals (simulated)
  const lastYearRevenue = 2880000;
  const lastYearOrders = 4200;
  
  const revenueGrowth = ((totalRevenue - lastYearRevenue) / lastYearRevenue * 100).toFixed(1);
  const ordersGrowth = ((totalOrders - lastYearOrders) / lastYearOrders * 100).toFixed(1);

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
          <h2 className="text-3xl font-bold gradient-text">Annual Analysis - School Year 2024-25</h2>
          <p className="text-muted-foreground">Complete overview from April 2024 to March 2025</p>
        </div>
      </div>

      {/* Annual Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover-lift card-glow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Annual Revenue</p>
                <p className="text-xl font-bold gradient-text">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                <Badge variant="default" className="mt-1 gap-1 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  {revenueGrowth}% YoY
                </Badge>
              </div>
              <div className="p-2 rounded-xl bg-primary/10">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="text-xl font-bold text-secondary">{totalOrders.toLocaleString()}</p>
                <Badge variant="default" className="mt-1 gap-1 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  {ordersGrowth}% YoY
                </Badge>
              </div>
              <div className="p-2 rounded-xl bg-secondary/10">
                <Package className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Annual Profit</p>
                <p className="text-xl font-bold text-success">₹{(totalProfit / 100000).toFixed(1)}L</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
                </p>
              </div>
              <div className="p-2 rounded-xl bg-success/10">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Monthly</p>
                <p className="text-xl font-bold text-accent">₹{(avgMonthlyRevenue / 1000).toFixed(0)}K</p>
                <p className="text-xs text-muted-foreground mt-1">Per month avg</p>
              </div>
              <div className="p-2 rounded-xl bg-accent/10">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift card-glow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Students</p>
                <p className="text-xl font-bold text-primary">492</p>
                <p className="text-xs text-muted-foreground mt-1">Peak this year</p>
              </div>
              <div className="p-2 rounded-xl bg-primary/10">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Year Over Year Comparison Chart */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Year Over Year Comparison
          </CardTitle>
          <CardDescription>Monthly revenue: This year vs Last year</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ComposedChart data={yearOverYearData}>
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}K`} />
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
              <Bar dataKey="lastYear" fill="hsl(var(--muted-foreground))" opacity={0.4} radius={[4, 4, 0, 0]} name="Last Year" />
              <Bar dataKey="thisYear" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="This Year" />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quarterly Performance & Revenue Trend */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quarterly Cards */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Quarterly Performance
            </CardTitle>
            <CardDescription>School year broken down by quarters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quarterlyData.map((q, index) => (
              <div 
                key={q.quarter} 
                className="p-4 bg-muted/30 rounded-lg border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{q.quarter}</h4>
                  {q.growth !== 0 && (
                    <Badge variant={q.growth > 0 ? "default" : "destructive"} className="gap-1">
                      {q.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {q.growth > 0 ? "+" : ""}{q.growth}%
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Revenue</p>
                    <p className="font-medium">₹{(q.revenue / 100000).toFixed(1)}L</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Orders</p>
                    <p className="font-medium">{q.orders.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Profit</p>
                    <p className="font-medium text-success">₹{(q.profit / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Revenue & Profit Trend */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Revenue & Profit Trend</CardTitle>
            <CardDescription>Monthly progression throughout the school year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[320px] w-full">
              <AreaChart data={schoolYearData}>
                <defs>
                  <linearGradient id="annualRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="annualProfitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}K`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#annualRevenueGrad)" strokeWidth={2} name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="hsl(var(--success))" fill="url(#annualProfitGrad)" strokeWidth={2} name="Profit" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>Category Annual Performance</CardTitle>
          <CardDescription>Year over year comparison by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {annualCategoryData.map((cat, index) => (
              <Card 
                key={cat.name} 
                className="bg-muted/30 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <h4 className="font-medium text-sm">{cat.name}</h4>
                  </div>
                  <p className="text-lg font-bold">₹{(cat.thisYear / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-muted-foreground">vs ₹{(cat.lastYear / 100000).toFixed(1)}L last year</p>
                  <Badge variant={cat.growth > 0 ? "default" : "destructive"} className="mt-2 gap-1 text-xs">
                    {cat.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {cat.growth > 0 ? "+" : ""}{cat.growth}%
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones & Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Milestones */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Year Highlights & Milestones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {milestones.map((m, index) => (
              <div 
                key={m.month}
                className="flex items-center gap-4 p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{m.achievement}</p>
                  <p className="text-sm text-muted-foreground">{m.month}</p>
                </div>
                <Badge variant="secondary" className="text-sm">{m.value}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              Top Products of the Year
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProductsAnnual.map((item) => (
                  <TableRow key={item.rank} className="hover:bg-muted/50">
                    <TableCell>
                      <Badge variant={item.rank <= 3 ? "default" : "outline"}>
                        {item.rank}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell className="text-right">{item.units.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">₹{(item.revenue / 1000).toFixed(0)}K</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Annual Summary */}
      <Card className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle>🎓 School Year Summary & Outlook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold text-success mb-2">🏆 Key Achievements</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Revenue grew {revenueGrowth}% vs last year</li>
                <li>• October was record-breaking month</li>
                <li>• Combo category grew 23.5%</li>
                <li>• Student engagement at all-time high</li>
              </ul>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold text-accent mb-2">📈 Growth Opportunities</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• June performance dips (summer break)</li>
                <li>• Q4 showed slight decline</li>
                <li>• Breakfast category underutilized</li>
                <li>• Weekend traffic potential</li>
              </ul>
            </div>
            <div className="p-4 bg-background/50 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">🎯 Goals for Next Year</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Target ₹40L annual revenue</li>
                <li>• Expand breakfast offerings</li>
                <li>• Summer special promotions</li>
                <li>• Improve Q4 performance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};