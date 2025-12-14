import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Plus, Package, IndianRupee, ImagePlus, FolderPlus, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/contexts/ProductContext";
import { Badge } from "@/components/ui/badge";

export const AddProductTab = () => {
  const { toast } = useToast();
  const { addProduct, categories, addCategory, deleteCategory } = useProducts();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    profitMargin: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    addProduct({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      description: formData.description,
      image: imagePreview || undefined,
      profitMargin: formData.profitMargin ? parseFloat(formData.profitMargin) : 20,
    });

    toast({
      title: "Product Added Successfully!",
      description: `${formData.name} has been added to inventory.`,
    });

    setFormData({ name: "", category: "", price: "", stock: "", description: "", profitMargin: "" });
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Category name required",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    const exists = categories.some(
      (c) => c.name.toLowerCase() === newCategoryName.trim().toLowerCase()
    );

    if (exists) {
      toast({
        title: "Category exists",
        description: "This category already exists.",
        variant: "destructive",
      });
      return;
    }

    addCategory(newCategoryName.trim());
    toast({
      title: "Category Added!",
      description: `${newCategoryName} has been added to categories.`,
    });
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id: string, name: string) => {
    deleteCategory(id);
    toast({
      title: "Category Deleted",
      description: `${name} has been removed.`,
    });
    if (formData.category === name.toLowerCase().replace(/\s+/g, "-")) {
      setFormData({ ...formData, category: "" });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Add New Product
          </h2>
          <p className="text-muted-foreground">
            Add a new item to your school cart inventory.
          </p>
        </div>

        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 btn-press">
              <FolderPlus className="h-4 w-4 mr-2" />
              Manage Categories
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-primary" />
                Manage Categories
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="New category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                />
                <Button onClick={handleAddCategory} className="btn-press">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-custom">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Badge variant="outline" className="text-sm">
                      {category.name}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all"
                      onClick={() => handleDeleteCategory(category.id, category.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogClose asChild>
              <Button variant="outline" className="w-full mt-2">
                Done
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-secondary" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Classmate Notebook, Apsara Pencil Set"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="transition-all duration-200 focus:scale-[1.02]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.value}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="pl-10 transition-all duration-200 focus:scale-[1.02]"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Initial Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="transition-all duration-200 focus:scale-[1.02]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profitMargin">Profit Margin (%)</Label>
                  <Input
                    id="profitMargin"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="20"
                    value={formData.profitMargin}
                    onChange={(e) => setFormData({ ...formData, profitMargin: e.target.value })}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] transition-all duration-200 focus:scale-[1.01]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-all duration-300 hover:scale-[1.02] btn-press"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-[var(--shadow-hover)] transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-accent" />
              Product Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/png,image/jpeg,image/jpg,image/webp"
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-full h-64 object-cover rounded-lg border-2 border-primary/20"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-center pb-4">
                  <Button variant="secondary" onClick={handleImageClick} className="btn-press">
                    Change Image
                  </Button>
                </div>
              </div>
            ) : (
              <div
                onClick={handleImageClick}
                className="border-2 border-dashed border-muted rounded-lg p-12 text-center hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-all duration-300">
                    <ImagePlus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click to upload image</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
