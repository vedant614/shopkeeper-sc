import { DashboardStats } from "@/components/DashboardStats";
import { DashboardCharts } from "@/components/DashboardCharts";
import { OrdersPanel } from "@/components/OrdersPanel";
import { QuickActions } from "@/components/QuickActions";
import { Sparkles, TrendingUp } from "lucide-react";

interface HomeTabProps {
  onSettingsClick: () => void;
  onMonthlyAnalysisClick: () => void;
  onAnnualAnalysisClick: () => void;
}

export const HomeTab = ({ onSettingsClick, onMonthlyAnalysisClick, onAnnualAnalysisClick }: HomeTabProps) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-6 border border-primary/10 animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold gradient-text">
                Welcome back, Admin
              </h2>
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            </div>
            <p className="text-muted-foreground max-w-md">
              Here's what's happening with your school cart today. You have{" "}
              <span className="font-semibold text-primary">3 pending orders</span> to review.
            </p>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 text-success">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+23% this week</span>
          </div>
        </div>
      </div>

      <DashboardStats />
      <QuickActions 
        onSettingsClick={onSettingsClick} 
        onMonthlyAnalysisClick={onMonthlyAnalysisClick}
        onAnnualAnalysisClick={onAnnualAnalysisClick}
      />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <OrdersPanel />
        <DashboardCharts />
      </div>
    </div>
  );
};