import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  image?: string;
  description?: string;
  profitMargin?: number;
}

export interface Category {
  id: string;
  name: string;
  value: string;
}

interface ProductContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, "id" | "status">) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
  getLowStockProducts: () => Product[];
  getOutOfStockProducts: () => Product[];
}

const initialProducts: Product[] = [
  // Stationary Items
  { id: "1", name: "Classmate Notebook (200 pages)", category: "notebooks", price: 85, stock: 120, status: "in-stock", profitMargin: 25 },
  { id: "2", name: "Apsara Pencil Set (10 pcs)", category: "writing", price: 50, stock: 95, status: "in-stock", profitMargin: 35 },
  { id: "3", name: "Camlin Geometry Box", category: "supplies", price: 180, stock: 12, status: "low-stock", profitMargin: 30 },
  { id: "4", name: "Reynolds Ball Pen (Pack of 5)", category: "writing", price: 60, stock: 0, status: "out-of-stock", profitMargin: 40 },
  { id: "5", name: "School Bag (Premium)", category: "bags", price: 850, stock: 25, status: "in-stock", profitMargin: 20 },
  { id: "6", name: "Water Bottle (1L)", category: "supplies", price: 150, stock: 45, status: "in-stock", profitMargin: 30 },
  { id: "7", name: "Lunch Box Set", category: "supplies", price: 250, stock: 8, status: "low-stock", profitMargin: 25 },
  // Food Items
  { id: "8", name: "Vegetable Thali", category: "lunch", price: 180, stock: 45, status: "in-stock", profitMargin: 25 },
  { id: "9", name: "Samosa (2 pcs)", category: "snacks", price: 40, stock: 78, status: "in-stock", profitMargin: 40 },
  { id: "10", name: "Masala Chai", category: "drinks", price: 25, stock: 55, status: "in-stock", profitMargin: 50 },
  { id: "11", name: "Cold Coffee", category: "drinks", price: 60, stock: 35, status: "in-stock", profitMargin: 45 },
  { id: "12", name: "Art & Craft Kit", category: "art", price: 320, stock: 18, status: "in-stock", profitMargin: 28 },
];

const initialCategories: Category[] = [
  // Stationary Categories
  { id: "1", name: "Notebooks", value: "notebooks" },
  { id: "2", name: "Writing", value: "writing" },
  { id: "3", name: "School Supplies", value: "supplies" },
  { id: "4", name: "Bags", value: "bags" },
  { id: "5", name: "Art & Craft", value: "art" },
  // Food Categories
  { id: "6", name: "Lunch", value: "lunch" },
  { id: "7", name: "Snacks", value: "snacks" },
  { id: "8", name: "Drinks", value: "drinks" },
];

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const getStatus = (stock: number): Product["status"] => {
    if (stock === 0) return "out-of-stock";
    if (stock <= 15) return "low-stock";
    return "in-stock";
  };

  const addProduct = (product: Omit<Product, "id" | "status">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      status: getStatus(product.stock),
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          if (updates.stock !== undefined) {
            updated.status = getStatus(updates.stock);
          }
          return updated;
        }
        return p;
      })
    );
  };

  const addCategory = (name: string) => {
    const value = name.toLowerCase().replace(/\s+/g, "-");
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      value,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const getLowStockProducts = () => products.filter((p) => p.status === "low-stock");
  const getOutOfStockProducts = () => products.filter((p) => p.status === "out-of-stock");

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        deleteProduct,
        updateProduct,
        addCategory,
        deleteCategory,
        getLowStockProducts,
        getOutOfStockProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
