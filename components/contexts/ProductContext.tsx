'use client';

import { createContext, useContext, useState } from "react";

type Product = {
    id: number;
    productName: string;
    description: string;
    price: number;
};

type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, productName: 'نعناع تستی', description: 'این محصول ساخت عرق سازان جنوب میباشد', price: 150000 },
    ]);

    const addProduct = (product: Product) => {
        setProducts(prev => [...prev, product]);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) throw new Error("useProductContext must be used inside ProductProvider");
    return context;
};
