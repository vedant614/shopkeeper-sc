import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, GraduationCap, Briefcase, Shield, TrendingUp } from "lucide-react";

interface UserCategory {
  type: string;
  count: number;
  trend: string;
  icon: React.ReactNode;
  color: string;
  items: { name: string; email: string; status: "active" | "inactive" }[];
}

const userCategories: UserCategory[] = [
  {
    type: "Students",
    count: 2547,
    trend: "+12.5%",
    color: "primary",
    icon: <GraduationCap className="h-4 w-4" />,
    items: [
      { name: "Emma Wilson", email: "emma@school.edu", status: "active" },
      { name: "James Smith", email: "james@school.edu", status: "active" },
      { name: "Sophia Brown", email: "sophia@school.edu", status: "inactive" },
    ],
  },
  {
    type: "Staff",
    count: 187,
    trend: "+3.2%",
    color: "secondary",
    icon: <Briefcase className="h-4 w-4" />,
    items: [
      { name: "Dr. Robert Chen", email: "r.chen@school.edu", status: "active" },
      { name: "Ms. Sarah Parker", email: "s.parker@school.edu", status: "active" },
      { name: "Mr. David Lee", email: "d.lee@school.edu", status: "active" },
    ],
  },
  {
    type: "Admins",
    count: 12,
    trend: "+0%",
    color: "accent",
    icon: <Shield className="h-4 w-4" />,
    items: [
      { name: "Admin John", email: "admin@school.edu", status: "active" },
      { name: "Super Admin", email: "super@school.edu", status: "active" },
    ],
  },
];

export const UsersStats = () => {
  const [activeTab, setActiveTab] = useState("students");
  const totalUsers = userCategories.reduce((acc, cat) => acc + cat.count, 0);

  return (
    <Card className="group overflow-hidden border hover-lift card-glow animate-slide-up" style={{ animationDelay: "0.05s" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Total Users
          </CardTitle>
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
            <Users className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold gradient-text tracking-tight">
            {totalUsers.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1 text-success">
            <TrendingUp className="h-3 w-3" />
            <span className="text-xs font-medium">+8.5%</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/50">
            {userCategories.map((category) => (
              <TabsTrigger
                key={category.type.toLowerCase()}
                value={category.type.toLowerCase()}
                className="flex flex-col gap-0.5 py-2 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-1">
                  <span className={`text-${category.color}`}>{category.icon}</span>
                  <span className="hidden sm:inline font-medium">{category.type}</span>
                </div>
                <span className="font-bold text-foreground">{category.count.toLocaleString('en-IN')}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {userCategories.map((category) => (
            <TabsContent
              key={category.type.toLowerCase()}
              value={category.type.toLowerCase()}
              className="mt-3 space-y-2 animate-fade-in"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Recent {category.type}</span>
                <span className="text-success font-medium flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {category.trend}
                </span>
              </div>
              <div className="space-y-1.5">
                {category.items.slice(0, 2).map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-200 text-xs group/item"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium group-hover/item:text-primary transition-colors">{user.name}</p>
                        <p className="text-muted-foreground text-[10px]">{user.email}</p>
                      </div>
                    </div>
                    <div className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      user.status === "active" 
                        ? "bg-success shadow-[0_0_8px_hsl(var(--success)/0.5)]" 
                        : "bg-muted-foreground"
                    }`} />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
