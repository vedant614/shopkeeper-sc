import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Package, Search, Edit2, Trash2, IndianRupee, AlertTriangle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts, Product } from "@/contexts/ProductContext";
import { OffersSection } from "@/components/OffersSection";

export const InventoryTab = () => {
  const { toast } = useToast();
  const { products, deleteProduct, updateProduct, categories } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Product["status"]) => {
    const variants = {
      "in-stock": "default",
      "low-stock": "secondary",
      "out-of-stock": "destructive",
    } as const;

    const labels = {
      "in-stock": "In Stock",
      "low-stock": "Low Stock",
      "out-of-stock": "Out of Stock",
    };

    return (
      <Badge variant={variants[status]} className="transition-all duration-200">
        {status === "low-stock" && <AlertTriangle className="h-3 w-3 mr-1" />}
        {labels[status]}
      </Badge>
    );
  };

  const getCategoryLabel = (categoryValue: string) => {
    const category = categories.find((c) => c.value === categoryValue);
    return category?.name || categoryValue;
  };

  const handleDelete = (id: string, name: string) => {
    deleteProduct(id);
    toast({
      title: "Product Deleted",
      description: `${name} has been removed from inventory.`,
      variant: "destructive",
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct({ ...product });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: editingProduct.price,
      stock: editingProduct.stock,
    });

    toast({
      title: "Product Updated",
      description: `${editingProduct.name} has been updated.`,
    });

    setEditDialogOpen(false);
    setEditingProduct(null);
  };

  const lowStockCount = products.filter((p) => p.status === "low-stock").length;
  const outOfStockCount = products.filter((p) => p.status === "out-of-stock").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
          Inventory Management
        </h2>
        <p className="text-muted-foreground">
          Manage and track your product inventory.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-accent/30 hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold text-accent">{lowStockCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300 border-destructive/30 hover-lift">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-destructive">{outOfStockCount}</p>
              </div>
              <Package className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              Product List
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No products found. Add some products to get started!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product, index) => (
                    <TableRow
                      key={product.id}
                      className="hover:bg-muted/50 transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-md object-cover"
                            />
                          )}
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getCategoryLabel(product.category)}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" />
                          {product.price}
                        </div>
                      </TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                            onClick={() => handleDelete(product.id, product.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Offers Section */}
      <OffersSection />

      {/* Edit Product Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-primary" />
              Edit Product
            </DialogTitle>
          </DialogHeader>

          {editingProduct && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    min="0"
                    value={editingProduct.stock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary btn-press"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
