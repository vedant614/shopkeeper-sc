import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Clock, IndianRupee, CheckCircle, X, Package } from "lucide-react";

interface Notification {
  id: string;
  orderId: string;
  customer: string;
  items: string;
  amount: number;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: "1", orderId: "#1234", customer: "Emma Wilson", items: "Notebook Set + Pen Pack", amount: 250, time: "5 min ago", read: false },
  { id: "2", orderId: "#1235", customer: "James Smith", items: "Geometry Box + Eraser", amount: 195, time: "12 min ago", read: false },
  { id: "3", orderId: "#1237", customer: "Liam Johnson", items: "School Bag (Premium)", amount: 850, time: "38 min ago", read: false },
];

export const NotificationsPanel = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative btn-press hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
        >
          <Bell className={`h-5 w-5 transition-all duration-300 ${unreadCount > 0 ? 'text-primary' : ''}`} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-gradient-to-r from-accent to-accent/80 text-[10px] font-bold text-accent-foreground flex items-center justify-center shadow-glow-sm animate-pulse">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-l-primary/10">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-xl gradient-text">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllRead}
                className="text-xs hover:text-primary transition-colors btn-press"
              >
                Mark all read
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              <Package className="h-3 w-3 mr-1" />
              {unreadCount} pending orders
            </Badge>
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-140px)] mt-6 pr-4 scrollbar-custom">
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border transition-all duration-300 ease-out hover:scale-[1.02] animate-slide-up cursor-pointer ${
                    notification.read
                      ? "bg-muted/20 border-border hover:bg-muted/40"
                      : "bg-gradient-to-r from-accent/10 to-transparent border-accent/20 hover:border-accent/40"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        notification.read ? "bg-muted" : "bg-accent/20"
                      }`}>
                        <Clock className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-accent"}`} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">New Order {notification.orderId}</p>
                        <p className="text-sm text-foreground mt-0.5">{notification.customer}</p>
                        <p className="text-xs text-muted-foreground">{notification.items}</p>
                        <div className="flex items-center gap-1 mt-2 font-semibold text-primary gradient-text">
                          <IndianRupee className="h-3 w-3 text-primary" />
                          {notification.amount}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 btn-press"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissNotification(notification.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <span className="text-[10px] text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="relative inline-block">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success/30" />
                  <div className="absolute inset-0 bg-success/10 rounded-full blur-xl animate-pulse" />
                </div>
                <p className="font-medium text-foreground">All caught up!</p>
                <p className="text-sm text-muted-foreground mt-1">No pending notifications</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
