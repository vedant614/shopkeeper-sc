import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cake, AlertTriangle, BarChart3, Settings, Zap, CalendarDays } from "lucide-react";
import { BirthdayDialog } from "./BirthdayDialog";
import { StockAlertDialog } from "./StockAlertDialog";

interface QuickActionsProps {
  onSettingsClick: () => void;
  onMonthlyAnalysisClick: () => void;
  onAnnualAnalysisClick: () => void;
}

export const QuickActions = ({ onSettingsClick, onMonthlyAnalysisClick, onAnnualAnalysisClick }: QuickActionsProps) => {
  const [showBirthdayDialog, setShowBirthdayDialog] = useState(false);
  const [showStockDialog, setShowStockDialog] = useState(false);

  const actions = [
    { 
      label: "Birthdays", 
      icon: Cake, 
      gradient: "from-primary to-secondary",
      hoverGlow: "group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]",
      onClick: () => setShowBirthdayDialog(true),
    },
    { 
      label: "Stock Alerts", 
      icon: AlertTriangle, 
      gradient: "from-destructive to-accent",
      hoverGlow: "group-hover:shadow-[0_0_30px_hsl(var(--destructive)/0.3)]",
      onClick: () => setShowStockDialog(true),
    },
    { 
      label: "Monthly Analysis", 
      icon: BarChart3, 
      gradient: "from-secondary to-accent",
      hoverGlow: "group-hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]",
      onClick: onMonthlyAnalysisClick,
    },
    { 
      label: "Annual Analysis", 
      icon: CalendarDays, 
      gradient: "from-success to-secondary",
      hoverGlow: "group-hover:shadow-[0_0_30px_hsl(var(--success)/0.3)]",
      onClick: onAnnualAnalysisClick,
    },
    { 
      label: "Settings", 
      icon: Settings, 
      gradient: "from-muted-foreground/50 to-muted-foreground/30",
      hoverGlow: "group-hover:shadow-card-hover",
      onClick: onSettingsClick,
    },
  ];

  return (
    <>
      <Card className="overflow-hidden border animate-slide-up" style={{ animationDelay: "0.25s" }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={action.onClick}
                className={`group relative flex flex-col items-center justify-center h-24 gap-2 rounded-xl bg-gradient-to-br ${action.gradient} text-primary-foreground transition-all duration-300 btn-press hover:scale-105 ${action.hoverGlow} animate-fade-in overflow-hidden`}
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon className="h-6 w-6 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                <span className="text-sm font-medium relative z-10 text-center px-1">{action.label}</span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Birthday Dialog - Manual Trigger */}
      <BirthdayDialog open={showBirthdayDialog} onOpenChange={setShowBirthdayDialog} manualTrigger />
      
      {/* Stock Alert Dialog - Manual Trigger */}
      <StockAlertDialog open={showStockDialog} onOpenChange={setShowStockDialog} manualTrigger />
    </>
  );
};