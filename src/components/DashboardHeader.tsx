import { useState, useEffect } from "react";
import { Bell, Search, User, Sparkles, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NotificationsPanel } from "./NotificationsPanel";
import schoolCartLogo from "@/assets/school-cart-logo.jpg";
import { format } from "date-fns";

interface DashboardHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardHeader = ({ activeTab, onTabChange }: DashboardHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: "home", label: "Home" },
    { id: "add-product", label: "Add Product" },
    { id: "inventory", label: "Inventory" },
    { id: "sales", label: "Sales" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b glass animate-fade-in">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl overflow-hidden shadow-glow-sm transition-all duration-500 group-hover:scale-110 group-hover:shadow-glow group-hover:rotate-3">
              <img 
                src={schoolCartLogo} 
                alt="SchoolCart Logo" 
                className="w-full h-full object-cover"
              />
              <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </div>
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <h1 className="text-lg font-bold gradient-text">
                SchoolCart
              </h1>
              <p className="text-[10px] text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-muted/50">
            {tabs.map((tab, index) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`relative btn-press transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                    : "hover:bg-background/80"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
                )}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Combined Date & Time Display */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/30">
            <CalendarClock className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {format(currentTime, "EEE, dd MMM")}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm font-mono font-medium text-foreground">
              {format(currentTime, "hh:mm a")}
            </span>
          </div>

          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-all duration-300 group-focus-within:text-primary group-focus-within:scale-110" />
            <Input
              placeholder="Search..."
              className="pl-10 w-48 transition-all duration-300 focus:w-56 focus:shadow-lg focus:border-primary/50 bg-muted/30"
            />
          </div>

          <NotificationsPanel />

          <Button 
            variant="outline" 
            size="icon" 
            className="btn-press hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-300 h-9 w-9"
          >
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile tabs */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
            className={`btn-press transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                : "hover:bg-muted"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </header>
  );
};