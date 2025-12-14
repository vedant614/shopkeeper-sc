import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cake, PartyPopper, Sparkles } from "lucide-react";
import { useStudents } from "@/contexts/StudentContext";

interface BirthdayDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  manualTrigger?: boolean;
}

export const BirthdayDialog = ({ open: externalOpen, onOpenChange, manualTrigger = false }: BirthdayDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const { getTodaysBirthdays } = useStudents();

  const birthdays = getTodaysBirthdays();
  const hasBirthdays = birthdays.length > 0;

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  useEffect(() => {
    if (!manualTrigger && hasBirthdays) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [manualTrigger, hasBirthdays, setOpen]);

  if (!hasBirthdays) {
    if (manualTrigger && open) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md animate-scale-in">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-primary">
                <Cake className="h-5 w-5" />
                <span>No Birthdays Today</span>
              </DialogTitle>
              <DialogDescription>
                There are no birthdays scheduled for today. Check back tomorrow!
              </DialogDescription>
            </DialogHeader>
            <Button onClick={() => setOpen(false)} className="w-full btn-press">
              Close
            </Button>
          </DialogContent>
        </Dialog>
      );
    }
    return null;
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      student: "Student",
      staff: "Staff",
      admin: "Admin",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getTypeBadgeVariant = (type: string) => {
    if (type === "admin") return "default";
    if (type === "staff") return "secondary";
    return "outline";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <PartyPopper className="h-5 w-5 animate-bounce" />
            <span className="gradient-text">Birthday Today!</span>
            <Cake className="h-5 w-5 animate-bounce" />
          </DialogTitle>
          <DialogDescription>
            Let's wish them a wonderful birthday! 🎉
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-custom">
          {birthdays.map((person, index) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg border border-primary/20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{person.name}</p>
                  <Badge variant={getTypeBadgeVariant(person.type)} className="mt-1">
                    {getTypeLabel(person.type)}
                  </Badge>
                </div>
              </div>
              <Cake className="h-6 w-6 text-accent" />
            </div>
          ))}
        </div>

        <Button
          onClick={() => setOpen(false)}
          className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 btn-press"
        >
          🎂 Send Birthday Wishes!
        </Button>
      </DialogContent>
    </Dialog>
  );
};
