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
    addProduct: (product: Omit<Product, "id">) => void; // ورودی بدون id
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            productName: "نعناع تستی",
            description: "این محصول ساخت عرق سازان جنوب میباشد",
            price: 150000,
        },
    ]);

    const addProduct = (product: Omit<Product, "id">) => {
        setProducts((prev) => {
            // تولید id به صورت عدد بعدی بزرگترین id موجود
            const nextId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
            const newProduct = { ...product, id: nextId };
            return [...prev, newProduct];
        });
    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
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
