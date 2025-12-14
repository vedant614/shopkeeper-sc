import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Moon, Sun, Bell, BellOff, Lock, Eye, EyeOff, Save, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotifications = localStorage.getItem("notifications");
    
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    
    if (savedNotifications === "false") {
      setNotificationsEnabled(false);
    }
  }, []);

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    toast({
      title: checked ? "Dark Mode Enabled" : "Light Mode Enabled",
      description: `Theme has been changed to ${checked ? "dark" : "light"} mode.`,
    });
  };

  const handleNotificationsToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem("notifications", checked.toString());
    toast({
      title: checked ? "Notifications Enabled" : "Notifications Disabled",
      description: `You will ${checked ? "now" : "no longer"} receive notifications.`,
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.new.length < 8) {
      toast({
        title: "Password Too Short",
        description: "New password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }

    // Simulate password change
    toast({
      title: "Password Updated!",
      description: "Your password has been changed successfully.",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
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
          <h2 className="text-3xl font-bold gradient-text">Settings</h2>
          <p className="text-muted-foreground">Manage your preferences</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance Card */}
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDarkMode ? <Moon className="h-5 w-5 text-secondary" /> : <Sun className="h-5 w-5 text-accent" />}
              Appearance
            </CardTitle>
            <CardDescription>Customize how SchoolCart looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? "bg-secondary/20" : "bg-accent/20"}`}>
                  {isDarkMode ? <Moon className="h-5 w-5 text-secondary" /> : <Sun className="h-5 w-5 text-accent" />}
                </div>
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    {isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
                  </p>
                </div>
              </div>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleThemeToggle}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {notificationsEnabled ? <Bell className="h-5 w-5 text-primary" /> : <BellOff className="h-5 w-5 text-muted-foreground" />}
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${notificationsEnabled ? "bg-primary/20" : "bg-muted"}`}>
                  {notificationsEnabled ? <Bell className="h-5 w-5 text-primary" /> : <BellOff className="h-5 w-5 text-muted-foreground" />}
                </div>
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    {notificationsEnabled ? "Receiving notifications" : "Notifications are off"}
                  </p>
                </div>
              </div>
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={handleNotificationsToggle}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-secondary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-destructive" />
              Change Password
            </CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 btn-press"
              >
                <Save className="h-4 w-4 mr-2" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};