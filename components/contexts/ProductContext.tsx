"use client";

import { createContext, useContext, useState } from "react";

type Product = {
    id: number;
    productName: string;
    description: string;
    price: number;
};

type ProductContextType = {
    products: Product[];
    addProduct: (product: Omit<Product, "id">) => void;
    deleteProduct: (id: number) => void; // ✅ اضافه شد
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([

    ]);

    const addProduct = (product: Omit<Product, "id">) => {
        setProducts((prev) => {
            const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            const newProduct = { ...product, id: nextId };
            return [...prev, newProduct];
        });
    };

    const deleteProduct = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context)
        throw new Error("useProductContext must be used inside ProductProvider");
    return context;
};
