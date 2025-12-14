import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, IndianRupee, ShoppingCart, CreditCard, ArrowUpRight, ArrowDownRight, Calendar, Clock, User, Package, CheckCircle, AlertCircle } from "lucide-react";

const salesData = [
  { date: "01 Dec", revenue: 12500, orders: 45 },
  { date: "02 Dec", revenue: 18200, orders: 62 },
  { date: "03 Dec", revenue: 15800, orders: 51 },
  { date: "04 Dec", revenue: 22100, orders: 78 },
  { date: "05 Dec", revenue: 19500, orders: 65 },
  { date: "06 Dec", revenue: 25800, orders: 89 },
  { date: "07 Dec", revenue: 21200, orders: 72 },
];

const paymentMethods = [
  { name: "UPI", value: 55, color: "hsl(270, 70%, 55%)" },
  { name: "Card", value: 25, color: "hsl(200, 80%, 60%)" },
  { name: "Cash", value: 15, color: "hsl(50, 95%, 55%)" },
  { name: "Wallet", value: 5, color: "hsl(150, 70%, 50%)" },
];

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  method: string;
  time: string;
  status: "success" | "pending";
  type: "student" | "staff";
  items: string;
  date: string;
  dueDate?: string;
  avatar?: string;
}

const recentTransactions: Transaction[] = [
  { id: "#TXN001", customer: "Emma Wilson", amount: 250, method: "UPI", time: "10:30 AM", status: "success", type: "student", items: "Notebook Set + Pen Pack", date: "11 Dec 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
  { id: "#TXN002", customer: "James Smith", amount: 180, method: "Card", time: "10:45 AM", status: "success", type: "staff", items: "Geometry Box + Eraser", date: "11 Dec 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
  { id: "#TXN003", customer: "Sophia Brown", amount: 95, method: "Cash", time: "11:00 AM", status: "success", type: "student", items: "Samosa + Cold Coffee", date: "11 Dec 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia" },
  { id: "#TXN004", customer: "Liam Johnson", amount: 350, method: "UPI", time: "11:15 AM", status: "pending", type: "student", items: "School Bag (Premium)", date: "11 Dec 2024", dueDate: "15 Dec 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam" },
  { id: "#TXN005", customer: "Olivia Davis", amount: 120, method: "Wallet", time: "11:30 AM", status: "pending", type: "staff", items: "Art Kit + Pencil Set", date: "11 Dec 2024", dueDate: "13 Dec 2024", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" },
];

const chartConfig = {
  revenue: {
    label: "Revenue (₹)",
    color: "hsl(270, 70%, 55%)",
  },
};

export const SalesTab = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const totalRevenue = salesData.reduce((acc, day) => acc + day.revenue, 0);
  const totalOrders = salesData.reduce((acc, day) => acc + day.orders, 0);
  const avgOrderValue = Math.round(totalRevenue / totalOrders);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Sales Analytics
        </h2>
        <p className="text-muted-foreground">
          Track your sales performance and revenue metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <IndianRupee className="h-5 w-5" />
                  {totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-1 text-xs text-primary mt-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +18.5% vs last week
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <div className="flex items-center gap-1 text-xs text-primary mt-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +12.3% vs last week
                </div>
              </div>
              <div className="p-3 rounded-lg bg-secondary/10">
                <ShoppingCart className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <div className="flex items-center gap-1 text-2xl font-bold">
                  <IndianRupee className="h-5 w-5" />
                  {avgOrderValue}
                </div>
                <div className="flex items-center gap-1 text-xs text-destructive mt-1">
                  <ArrowDownRight className="h-3 w-3" />
                  -2.1% vs last week
                </div>
              </div>
              <div className="p-3 rounded-lg bg-accent/10">
                <CreditCard className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">68.5%</p>
                <div className="flex items-center gap-1 text-xs text-primary mt-1">
                  <ArrowUpRight className="h-3 w-3" />
                  +5.2% vs last week
                </div>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-2 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend (This Week)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(270, 70%, 55%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(270, 70%, 55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip
                  content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(270, 70%, 55%)"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-secondary" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {paymentMethods.map((method) => (
                <div key={method.name} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: method.color }}
                  />
                  <span>{method.name}</span>
                  <span className="text-muted-foreground ml-auto">{method.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-accent" />
            Recent Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((txn, index) => (
                  <TableRow
                    key={txn.id}
                    className="hover:bg-muted/50 transition-all duration-200 animate-fade-in cursor-pointer hover:shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
                    style={{ animationDelay: `${index * 0.05}s` }}
                    onClick={() => {
                      setSelectedTransaction(txn);
                      setDialogOpen(true);
                    }}
                  >
                    <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={txn.avatar} />
                          <AvatarFallback>{txn.customer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {txn.customer}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-medium">
                        <IndianRupee className="h-3 w-3" />
                        {txn.amount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{txn.method}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{txn.time}</TableCell>
                    <TableCell>
                      <Badge variant={txn.status === "success" ? "default" : "secondary"}>
                        {txn.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Transaction Details
            </DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={selectedTransaction.avatar} />
                  <AvatarFallback className="text-lg">
                    {selectedTransaction.customer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedTransaction.customer}</h3>
                  <Badge variant="outline" className="mt-1">
                    <User className="h-3 w-3 mr-1" />
                    {selectedTransaction.type === "student" ? "Student" : "Staff"}
                  </Badge>
                </div>
              </div>

              {/* Transaction Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Items</span>
                  </div>
                  <span className="font-medium">{selectedTransaction.items}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <IndianRupee className="h-4 w-4" />
                    <span>Amount</span>
                  </div>
                  <span className="font-bold text-lg gradient-text">₹{selectedTransaction.amount}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>Payment Method</span>
                  </div>
                  <Badge variant="outline">{selectedTransaction.method}</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Transaction Date</span>
                  </div>
                  <span className="font-medium">{selectedTransaction.date}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Time</span>
                  </div>
                  <span className="font-medium">{selectedTransaction.time}</span>
                </div>

                {selectedTransaction.dueDate && (
                  <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 text-accent">
                      <AlertCircle className="h-4 w-4" />
                      <span>Due Date</span>
                    </div>
                    <span className="font-semibold text-accent">{selectedTransaction.dueDate}</span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {selectedTransaction.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-accent" />
                    )}
                    <span>Status</span>
                  </div>
                  <Badge variant={selectedTransaction.status === "success" ? "default" : "secondary"}>
                    {selectedTransaction.status === "success" ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </div>

              <Button
                onClick={() => setDialogOpen(false)}
                className="w-full bg-gradient-to-r from-primary to-secondary btn-press"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
