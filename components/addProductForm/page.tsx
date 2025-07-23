"use client";

import { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Divider,
    Alert,
    CircularProgress,
    Stack,
    FormHelperText,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useProductContext } from "../contexts/ProductContext";

export default function AddProductForm() {
    const { addProduct, products } = useProductContext();
    const router = useRouter();

    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setErrors({});

        const newErrors: { [key: string]: string } = {};
        const priceNumber = parseInt(price, 10);

        if (!productName.trim()) newErrors.productName = "این فیلد الزامی است";
        if (!price || isNaN(priceNumber) || priceNumber <= 0)
            newErrors.price = "لطفاً عدد معتبر وارد کنید";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        // ساخت محصول جدید بدون id چون id باید در سرور ساخته شود
        const newProduct = {
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

            // افزودن محصول به context
            addProduct(savedProduct);

            setProductName("");
            setDescription("");
            setPrice("");
            setSuccessMessage("محصول با موفقیت ذخیره شد!");

            setTimeout(() => router.push("/"), 1500);
        } catch (err: any) {
            setError(err.message || "خطای ناشناخته");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 700,
                mx: "auto",
                mt: 8,
                px: 2,
                direction: "rtl",
                fontFamily: "var(--font-peyda)",
                minHeight: "100vh",
                py: 5,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    backgroundColor: "#2a2a40",
                    color: "#fff",
                }}
            >
                <Typography variant="h5" fontWeight="bold" color="#90caf9" mb={2}>
                    🛒 افزودن محصول جدید
                </Typography>

                <Divider sx={{ mb: 3, borderColor: "#444" }} />

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="نام محصول"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            fullWidth
                            error={!!errors.productName}
                            InputLabelProps={{ style: { color: "#bbb" } }}
                            InputProps={{
                                style: {
                                    color: "#fff",
                                    backgroundColor: "#3a3a55",
                                    textAlign: "right",
                                },
                            }}
                            inputProps={{ style: { textAlign: "right" } }}
                        />
                        {errors.productName && (
                            <FormHelperText sx={{ color: "#f44336", mr: 1 }}>
                                {errors.productName}
                            </FormHelperText>
                        )}

                        <TextField
                            label="توضیحات"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            InputLabelProps={{ style: { color: "#bbb" } }}
                            InputProps={{
                                style: {
                                    color: "#fff",
                                    backgroundColor: "#3a3a55",
                                    textAlign: "right",
                                },
                            }}
                            inputProps={{ style: { textAlign: "right" } }}
                        />

                        <TextField
                            label="قیمت (تومان)"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="text"
                            fullWidth
                            error={!!errors.price}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            InputLabelProps={{ style: { color: "#bbb" } }}
                            InputProps={{
                                style: {
                                    color: "#fff",
                                    backgroundColor: "#3a3a55",
                                    textAlign: "right",
                                },
                            }}
                            inputProps={{
                                style: { textAlign: "right" },
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                            }}
                        />
                        {errors.price && (
                            <FormHelperText sx={{ color: "#f44336", mr: 1 }}>
                                {errors.price}
                            </FormHelperText>
                        )}

                        {error && <Alert severity="error">{error}</Alert>}
                        {successMessage && <Alert severity="success">{successMessage}</Alert>}

                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: "bold",
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "ذخیره محصول"
                                )}
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
