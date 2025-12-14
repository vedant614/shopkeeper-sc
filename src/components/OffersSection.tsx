import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Edit2,
  Percent,
  Calendar,
  Tag,
  IndianRupee,
  Sparkles,
  Gift,
  Package,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useOffers, Offer, OfferType } from "@/contexts/OffersContext";
import { useProducts } from "@/contexts/ProductContext";

export const OffersSection = () => {
  const { toast } = useToast();
  const { offers, addOffer, updateOffer, deleteOffer, toggleOfferStatus } = useOffers();
  const { products, categories } = useProducts();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [productSearch, setProductSearch] = useState("");
  
  const [formData, setFormData] = useState<Omit<Offer, "id">>({
    name: "",
    offerType: "percentage",
    discountValue: 10,
    buyQuantity: 2,
    getQuantity: 1,
    bundlePrice: 0,
    minPurchase: 0,
    description: "",
    startDate: "",
    endDate: "",
    isActive: true,
    applicableProducts: [],
  });

  const offerTypes: { value: OfferType; label: string; icon: string }[] = [
    { value: "percentage", label: "Percentage Off", icon: "%" },
    { value: "fixed", label: "Fixed Discount", icon: "₹" },
    { value: "buy-x-get-y", label: "Buy X Get Y Free", icon: "🎁" },
    { value: "bundle", label: "Bundle Price", icon: "📦" },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase())
    );
  }, [products, productSearch]);

  const getCategoryName = (categoryValue: string) => {
    return categories.find((c) => c.value === categoryValue)?.name || categoryValue;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      offerType: "percentage",
      discountValue: 10,
      buyQuantity: 2,
      getQuantity: 1,
      bundlePrice: 0,
      minPurchase: 0,
      description: "",
      startDate: "",
      endDate: "",
      isActive: true,
      applicableProducts: [],
    });
    setEditingOffer(null);
    setProductSearch("");
  };

  const openCreateDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEditDialog = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      name: offer.name,
      offerType: offer.offerType,
      discountValue: offer.discountValue,
      buyQuantity: offer.buyQuantity || 2,
      getQuantity: offer.getQuantity || 1,
      bundlePrice: offer.bundlePrice || 0,
      minPurchase: offer.minPurchase || 0,
      description: offer.description || "",
      startDate: offer.startDate,
      endDate: offer.endDate,
      isActive: offer.isActive,
      applicableProducts: offer.applicableProducts,
    });
    setDialogOpen(true);
  };

  const handleProductToggle = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      applicableProducts: prev.applicableProducts.includes(productId)
        ? prev.applicableProducts.filter((id) => id !== productId)
        : [...prev.applicableProducts, productId],
    }));
  };

  const selectAllProducts = () => {
    setFormData((prev) => ({
      ...prev,
      applicableProducts: products.map((p) => p.id),
    }));
  };

  const clearAllProducts = () => {
    setFormData((prev) => ({
      ...prev,
      applicableProducts: [],
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill in name and dates.",
        variant: "destructive",
      });
      return;
    }

    if (formData.applicableProducts.length === 0) {
      toast({
        title: "No Products Selected",
        description: "Please select at least one product.",
        variant: "destructive",
      });
      return;
    }

    if (editingOffer) {
      updateOffer(editingOffer.id, formData);
      toast({
        title: "Offer Updated",
        description: `${formData.name} has been updated.`,
      });
    } else {
      addOffer(formData);
      toast({
        title: "Offer Created",
        description: `${formData.name} has been added.`,
      });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string, name: string) => {
    deleteOffer(id);
    toast({
      title: "Offer Deleted",
      description: `${name} has been removed.`,
      variant: "destructive",
    });
  };

  const getOfferTypeLabel = (type: OfferType) => {
    return offerTypes.find((t) => t.value === type)?.label || type;
  };

  const getOfferSummary = (offer: Offer) => {
    switch (offer.offerType) {
      case "percentage":
        return `${offer.discountValue}% off`;
      case "fixed":
        return `₹${offer.discountValue} off`;
      case "buy-x-get-y":
        return `Buy ${offer.buyQuantity}, Get ${offer.getQuantity} Free`;
      case "bundle":
        return `Bundle: ₹${offer.bundlePrice}`;
      default:
        return "";
    }
  };

  const activeOffersCount = offers.filter((o) => o.isActive).length;

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="h-5 w-5 text-primary" />
            Offers & Discounts
            <Badge variant="secondary" className="ml-1">
              {activeOffersCount} Active
            </Badge>
          </CardTitle>
          <Button
            onClick={openCreateDialog}
            size="sm"
            className="bg-gradient-to-r from-primary to-secondary btn-press"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Offer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {offers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Gift className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No offers yet. Create your first offer!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {offers.map((offer, index) => (
              <div
                key={offer.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 hover:shadow-md animate-fade-in ${
                  offer.isActive
                    ? "bg-primary/5 border-primary/20"
                    : "bg-muted/30 border-border opacity-60"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-foreground truncate">
                      {offer.name}
                    </span>
                    <Badge variant="outline" className="text-xs shrink-0">
                      {getOfferTypeLabel(offer.offerType)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 text-accent font-semibold">
                      {offer.offerType === "percentage" && <Percent className="h-3 w-3" />}
                      {offer.offerType === "fixed" && <IndianRupee className="h-3 w-3" />}
                      {getOfferSummary(offer)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {offer.applicableProducts.length} items
                    </span>
                    <span className="flex items-center gap-1 hidden sm:flex">
                      <Calendar className="h-3 w-3" />
                      {offer.startDate} - {offer.endDate}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-3">
                  <Switch
                    checked={offer.isActive}
                    onCheckedChange={() => toggleOfferStatus(offer.id)}
                    className="scale-90"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-primary/10"
                    onClick={() => openEditDialog(offer)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/10 text-destructive"
                    onClick={() => handleDelete(offer.id, offer.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {editingOffer ? "Edit Offer" : "Create Offer"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-custom">
            <div className="space-y-2">
              <Label>Offer Name *</Label>
              <Input
                placeholder="e.g., Summer Sale"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Offer Type *</Label>
              <Select
                value={formData.offerType}
                onValueChange={(value: OfferType) =>
                  setFormData({ ...formData, offerType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {offerTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dynamic fields based on offer type */}
            {formData.offerType === "percentage" && (
              <div className="space-y-2">
                <Label>Discount Percentage</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountValue}
                    onChange={(e) =>
                      setFormData({ ...formData, discountValue: parseInt(e.target.value) || 0 })
                    }
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
              </div>
            )}

            {formData.offerType === "fixed" && (
              <div className="space-y-2">
                <Label>Discount Amount (₹)</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData({ ...formData, discountValue: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            )}

            {formData.offerType === "buy-x-get-y" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Buy Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.buyQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, buyQuantity: parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Get Free</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.getQuantity}
                    onChange={(e) =>
                      setFormData({ ...formData, getQuantity: parseInt(e.target.value) || 1 })
                    }
                  />
                </div>
              </div>
            )}

            {formData.offerType === "bundle" && (
              <div className="space-y-2">
                <Label>Bundle Price (₹)</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.bundlePrice}
                  onChange={(e) =>
                    setFormData({ ...formData, bundlePrice: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            )}

            {(formData.offerType === "percentage" || formData.offerType === "fixed") && (
              <div className="space-y-2">
                <Label>Minimum Purchase (₹)</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0 for no minimum"
                  value={formData.minPurchase}
                  onChange={(e) =>
                    setFormData({ ...formData, minPurchase: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Apply to Products *</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={selectAllProducts}
                  >
                    Select All
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={clearAllProducts}
                  >
                    Clear
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="pl-9 h-9"
                />
              </div>

              <ScrollArea className="h-40 border rounded-lg p-2 bg-muted/20">
                <div className="space-y-1">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                        formData.applicableProducts.includes(product.id)
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => handleProductToggle(product.id)}
                    >
                      <Checkbox
                        checked={formData.applicableProducts.includes(product.id)}
                        onCheckedChange={() => handleProductToggle(product.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {getCategoryName(product.category)} • ₹{product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <p className="text-xs text-muted-foreground">
                {formData.applicableProducts.length} product(s) selected
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label>Activate immediately</Label>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-primary to-secondary btn-press"
            >
              {editingOffer ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};