import React, { createContext, useContext, useState, ReactNode } from "react";

export type OfferType = "percentage" | "fixed" | "buy-x-get-y" | "bundle";

export interface Offer {
  id: string;
  name: string;
  offerType: OfferType;
  discountValue: number; // percentage or fixed amount
  buyQuantity?: number; // for buy-x-get-y
  getQuantity?: number; // for buy-x-get-y
  bundlePrice?: number; // for bundle offers
  minPurchase?: number;
  description?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableProducts: string[]; // product IDs
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id">) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  toggleOfferStatus: (id: string) => void;
  getActiveOffers: () => Offer[];
  getOfferForProduct: (productId: string) => Offer | undefined;
}

const initialOffers: Offer[] = [
  {
    id: "1",
    name: "Back to School Sale",
    offerType: "percentage",
    discountValue: 25,
    minPurchase: 100,
    description: "25% off on selected school supplies",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    isActive: true,
    applicableProducts: ["1", "2", "3"],
  },
  {
    id: "2",
    name: "Notebook Bundle",
    offerType: "bundle",
    discountValue: 0,
    bundlePrice: 200,
    description: "Get 3 notebooks for ₹200",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isActive: true,
    applicableProducts: ["1"],
  },
  {
    id: "3",
    name: "Buy 2 Get 1 Free",
    offerType: "buy-x-get-y",
    discountValue: 0,
    buyQuantity: 2,
    getQuantity: 1,
    description: "Buy 2 pencil sets, get 1 free",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    isActive: false,
    applicableProducts: ["2"],
  },
];

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>(initialOffers);

  const addOffer = (offer: Omit<Offer, "id">) => {
    const newOffer: Offer = {
      ...offer,
      id: Date.now().toString(),
    };
    setOffers((prev) => [...prev, newOffer]);
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers((prev) =>
      prev.map((offer) => (offer.id === id ? { ...offer, ...updates } : offer))
    );
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((offer) => offer.id !== id));
  };

  const toggleOfferStatus = (id: string) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === id ? { ...offer, isActive: !offer.isActive } : offer
      )
    );
  };

  const getActiveOffers = () => offers.filter((offer) => offer.isActive);

  const getOfferForProduct = (productId: string) => {
    return offers.find(
      (offer) => offer.isActive && offer.applicableProducts.includes(productId)
    );
  };

  return (
    <OffersContext.Provider
      value={{
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferStatus,
        getActiveOffers,
        getOfferForProduct,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (!context) {
    throw new Error("useOffers must be used within an OffersProvider");
  }
  return context;
};