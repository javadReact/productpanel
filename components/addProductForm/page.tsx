"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useProductContext } from "../contexts/ProductContext";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
    const { addProduct } = useProductContext();
    const router = useRouter();

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const priceNumber = parseInt(price, 10);
        if (!productName || !price || isNaN(priceNumber) || priceNumber <= 0) {
            setError("لطفا نام محصول و قیمت معتبر وارد کنید");
            return;
        }

        setLoading(true);

        const newProduct = {
            id: Date.now(),
            productName,
            description,
            price: priceNumber,
        };

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) throw new Error("خطا در ذخیره‌سازی محصول");

            const savedProduct = await res.json();
            addProduct(savedProduct);

            setProductName("");
            setDescription("");
            setPrice("");
            setSuccessMessage("محصول با موفقیت ذخیره شد!");

            // بعد از 2 ثانیه به صفحه اصلی برگرد
            setTimeout(() => {
                router.push("/");
            }, 2000);

        } catch (err: any) {
            setError(err.message || "خطای ناشناخته");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 4,
                direction: "rtl",
                fontFamily: "var(--font-peyda)",
            }}
        >
            <Typography variant="h6">افزودن محصول جدید</Typography>

            <TextField
                label="نام محصول"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullWidth
                required
            />

            <TextField
                label="توضیحات"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
            />

            <TextField
                label="قیمت (تومان)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
                fullWidth
            />

            {error && <Typography color="error">{error}</Typography>}
            {successMessage && <Typography color="success.main">{successMessage}</Typography>}

            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading ? "در حال ذخیره‌سازی..." : "افزودن محصول"}
            </Button>
        </Box>
    );
}
