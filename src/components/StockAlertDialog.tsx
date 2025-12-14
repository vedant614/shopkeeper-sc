import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, IndianRupee } from "lucide-react";
import { useProducts } from "@/contexts/ProductContext";

interface StockAlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  manualTrigger?: boolean;
}

export const StockAlertDialog = ({ open: externalOpen, onOpenChange, manualTrigger = false }: StockAlertDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const { getLowStockProducts, getOutOfStockProducts } = useProducts();

  const lowStock = getLowStockProducts();
  const outOfStock = getOutOfStockProducts();
  const hasAlerts = lowStock.length > 0 || outOfStock.length > 0;

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;

  useEffect(() => {
    if (!manualTrigger && hasAlerts) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [manualTrigger, hasAlerts, setOpen]);

  if (!hasAlerts && manualTrigger && open) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-success">
              <Package className="h-5 w-5" />
              All Stock Healthy!
            </DialogTitle>
            <DialogDescription>
              No stock alerts at this time. All products are well-stocked.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setOpen(false)} className="w-full btn-press">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  if (!hasAlerts) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5 animate-pulse" />
            Stock Alert!
          </DialogTitle>
          <DialogDescription>
            Some products require your attention.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[300px] overflow-y-auto scrollbar-custom">
          {outOfStock.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-destructive flex items-center gap-2">
                <Package className="h-4 w-4" />
                Out of Stock ({outOfStock.length})
              </h4>
              <div className="space-y-2">
                {outOfStock.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20"
                  >
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <IndianRupee className="h-3 w-3" />
                        {product.price}
                      </div>
                    </div>
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lowStock.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-accent flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Low Stock ({lowStock.length})
              </h4>
              <div className="space-y-2">
                {lowStock.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-accent/10 rounded-lg border border-accent/20"
                  >
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Only {product.stock} left
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                      Low Stock
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button onClick={() => setOpen(false)} className="w-full btn-press">
          Got it, I'll check inventory
        </Button>
      </DialogContent>
    </Dialog>
  );
};
