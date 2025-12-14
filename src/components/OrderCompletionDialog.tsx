import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IndianRupee, ShoppingBag, User, CheckCircle } from "lucide-react";

interface OrderDetails {
  id: string;
  customer: string;
  items: string;
  amount: number;
  time: string;
  type: "student" | "staff";
  avatar?: string;
}

interface OrderCompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderDetails | null;
  onConfirm: () => void;
}

export const OrderCompletionDialog = ({
  open,
  onOpenChange,
  order,
  onConfirm,
}: OrderCompletionDialogProps) => {
  if (!order) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <ShoppingBag className="h-5 w-5" />
            Complete Order {order.id}
          </DialogTitle>
          <DialogDescription>
            Review the order details before completing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Info */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <Avatar className="h-16 w-16 border-2 border-primary/30 shadow-glow-sm">
              <AvatarImage src={order.avatar} alt={order.customer} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-lg font-bold">
                {getInitials(order.customer)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground">{order.customer}</h3>
              <Badge
                variant={order.type === "staff" ? "secondary" : "outline"}
                className="mt-1"
              >
                <User className="h-3 w-3 mr-1" />
                {order.type === "staff" ? "Staff Member" : "Student"}
              </Badge>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-3 p-4 rounded-xl bg-muted/50 border border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Order Items</span>
              <span className="font-medium text-foreground">{order.items}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Order Time</span>
              <span className="text-sm text-foreground">{order.time}</span>
            </div>
            <div className="h-px bg-border my-2" />
            <div className="flex justify-between items-center">
              <span className="font-medium text-foreground">Total Amount</span>
              <div className="flex items-center gap-1 text-xl font-bold gradient-text">
                <IndianRupee className="h-5 w-5 text-primary" />
                {order.amount}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 btn-press"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-gradient-to-r from-success to-secondary hover:opacity-90 btn-press"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Proceed & Complete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
