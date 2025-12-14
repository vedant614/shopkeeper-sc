import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { HomeTab } from "@/components/tabs/HomeTab";
import { AddProductTab } from "@/components/tabs/AddProductTab";
import { InventoryTab } from "@/components/tabs/InventoryTab";
import { SalesTab } from "@/components/tabs/SalesTab";
import { MonthlyAnalysisTab } from "@/components/tabs/MonthlyAnalysisTab";
import { AnnualAnalysisTab } from "@/components/tabs/AnnualAnalysisTab";
import { Settings } from "@/pages/Settings";
import { StockAlertDialog } from "@/components/StockAlertDialog";
import { BirthdayDialog } from "@/components/BirthdayDialog";
import { StarryBackground } from "@/components/StarryBackground";
import { ProductProvider } from "@/contexts/ProductContext";
import { StudentProvider } from "@/contexts/StudentContext";
import { OffersProvider } from "@/contexts/OffersContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSettingsClick = () => setActiveTab("settings");
  const handleMonthlyAnalysisClick = () => setActiveTab("monthly-analysis");
  const handleAnnualAnalysisClick = () => setActiveTab("annual-analysis");
  const handleBackToHome = () => setActiveTab("home");

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab 
            onSettingsClick={handleSettingsClick} 
            onMonthlyAnalysisClick={handleMonthlyAnalysisClick}
            onAnnualAnalysisClick={handleAnnualAnalysisClick}
          />
        );
      case "add-product":
        return <AddProductTab />;
      case "inventory":
        return <InventoryTab />;
      case "sales":
        return <SalesTab />;
      case "monthly-analysis":
        return <MonthlyAnalysisTab onBack={handleBackToHome} />;
      case "annual-analysis":
        return <AnnualAnalysisTab onBack={handleBackToHome} />;
      case "settings":
        return <Settings onBack={handleBackToHome} />;
      default:
        return (
          <HomeTab 
            onSettingsClick={handleSettingsClick} 
            onMonthlyAnalysisClick={handleMonthlyAnalysisClick}
            onAnnualAnalysisClick={handleAnnualAnalysisClick}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen animated-bg flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-spin-slow mx-auto" />
            <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-xl opacity-50 animate-pulse mx-auto" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">SchoolCart</h1>
            <p className="text-muted-foreground animate-pulse">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProductProvider>
      <StudentProvider>
        <OffersProvider>
          <div className="min-h-screen animated-bg animate-dashboard-enter relative">
            {/* Starry background effect */}
            <StarryBackground />
            
            <DashboardHeader activeTab={activeTab} onTabChange={setActiveTab} />
            
            <main className="container px-6 py-8 relative z-10">
              {renderTab()}
            </main>

            <StockAlertDialog />
            <BirthdayDialog />
          </div>
        </OffersProvider>
      </StudentProvider>
    </ProductProvider>
  );
};

export default Index;