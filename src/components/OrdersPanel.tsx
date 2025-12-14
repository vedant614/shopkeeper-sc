import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Package, IndianRupee, ArrowRight } from "lucide-react";
import { OrderCompletionDialog } from "./OrderCompletionDialog";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customer: string;
  items: string;
  amount: number;
  time: string;
  status: "pending" | "completed";
  type: "student" | "staff";
  avatar?: string;
}

const initialOrders: Order[] = [
  { id: "#1234", customer: "Emma Wilson", items: "Notebook Set + Pen Pack", amount: 250, time: "5 min ago", status: "pending", type: "student" },
  { id: "#1235", customer: "James Smith", items: "Geometry Box + Eraser", amount: 195, time: "12 min ago", status: "pending", type: "staff" },
  { id: "#1236", customer: "Sophia Brown", items: "Samosa + Cold Coffee", amount: 100, time: "25 min ago", status: "completed", type: "student" },
  { id: "#1237", customer: "Liam Johnson", items: "School Bag (Premium)", amount: 850, time: "38 min ago", status: "pending", type: "student" },
  { id: "#1238", customer: "Olivia Davis", items: "Art Kit + Lunch Thali", amount: 500, time: "1 hour ago", status: "completed", type: "staff" },
  { id: "#1239", customer: "Arjun Patel", items: "Pencil Set + Sharpener", amount: 75, time: "1.5 hours ago", status: "completed", type: "student" },
];

export const OrdersPanel = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pendingOrders = orders.filter(order => order.status === "pending");
  const completedOrders = orders.filter(order => order.status === "completed");

  const handleCompleteClick = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleConfirmComplete = () => {
    if (selectedOrder) {
      setOrders(prev =>
        prev.map(order =>
          order.id === selectedOrder.id
            ? { ...order, status: "completed" as const }
            : order
        )
      );
      toast({
        title: "Order Completed!",
        description: `Order ${selectedOrder.id} for ${selectedOrder.customer} has been completed.`,
      });
    }
  };

  const OrderCard = ({ order, index }: { order: Order; index: number }) => (
    <div 
      className="group flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 ease-out hover:scale-[1.01] animate-fade-in border border-transparent hover:border-primary/10 hover:shadow-[0_0_15px_hsl(var(--primary)/0.1)]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-all duration-300 ${
          order.status === "pending" 
            ? "bg-accent/15 group-hover:bg-accent/25 group-hover:scale-110" 
            : "bg-success/15 group-hover:bg-success/25 group-hover:scale-110"
        }`}>
          {order.status === "pending" ? (
            <Clock className="h-4 w-4 text-accent" />
          ) : (
            <CheckCircle className="h-4 w-4 text-success" />
          )}
        </div>
        <div>
          <p className="font-medium text-sm group-hover:text-primary transition-colors">{order.customer}</p>
          <p className="text-xs text-muted-foreground">{order.items}</p>
        </div>
      </div>
      <div className="text-right flex flex-col items-end gap-1">
        <div className="flex items-center gap-0.5 font-bold text-sm gradient-text">
          <IndianRupee className="h-3 w-3 text-primary" />
          {order.amount}
        </div>
        <p className="text-[10px] text-muted-foreground">{order.time}</p>
        {order.status === "pending" && (
          <Button 
            size="sm" 
            onClick={() => handleCompleteClick(order)}
            className="mt-1 h-6 text-[10px] px-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 btn-press hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
          >
            Complete
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <Card className="overflow-hidden border animate-slide-up lg:col-span-1" style={{ animationDelay: "0.3s" }}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Orders
          <Badge variant="secondary" className="ml-auto text-xs">
            {pendingOrders.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-3 p-1 h-auto bg-muted/50">
            <TabsTrigger 
              value="pending"
              className="text-xs py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-accent/10 data-[state=active]:text-accent-foreground transition-all duration-300"
            >
              <Clock className="h-3 w-3 mr-1.5" />
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="text-xs py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-success/20 data-[state=active]:to-success/10 data-[state=active]:text-success transition-all duration-300"
            >
              <CheckCircle className="h-3 w-3 mr-1.5" />
              Done ({completedOrders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-2 mt-0 max-h-[280px] overflow-y-auto scrollbar-custom">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order, index) => (
                <OrderCard key={order.id} order={order} index={index} />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground animate-fade-in">
                <CheckCircle className="h-10 w-10 mx-auto mb-2 text-success/50" />
                <p className="text-sm">All caught up!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-2 mt-0 max-h-[280px] overflow-y-auto scrollbar-custom">
            {completedOrders.map((order, index) => (
              <OrderCard key={order.id} order={order} index={index} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Order Completion Dialog */}
      <OrderCompletionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        order={selectedOrder}
        onConfirm={handleConfirmComplete}
      />
    </Card>
  );
};
