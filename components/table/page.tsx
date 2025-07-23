"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useProductContext } from "../contexts/ProductContext";

export default function DataTable() {
    const { products, addProduct, updateProduct, deleteProduct } = useProductContext();
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleEditClick = (id: number) => {
        setRowModesModel((prev) => ({
            ...prev,
            [id]: { mode: "edit" },
        }));
    };

    const handleProcessRowUpdate = async (newRow: GridRowModel) => {
        const updatedProduct = {
            id: newRow.id,
            productName: newRow.productName,
            description: newRow.description,
            price: Number(newRow.price),
        };

        try {
            // درخواست PUT به API برای ویرایش محصول
            const res = await fetch(`/api/products/${updatedProduct.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
            });

            if (!res.ok) throw new Error("خطا در به‌روزرسانی محصول");

            const savedProduct = await res.json();

            // آپدیت context
            updateProduct(savedProduct);

            setRowModesModel({});

            return savedProduct;
        } catch (error) {
            console.error(error);
            // اگر خطا بود، مقدار اولیه برگرده و حالت ادیت بسته بشه
            setRowModesModel({});
            return newRow;
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("آیا مطمئنید که می‌خواهید حذف کنید؟")) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("خطا در حذف محصول");

            // حذف از context
            deleteProduct(id);
        } catch (error) {
            console.error(error);
            alert("حذف محصول موفقیت‌آمیز نبود.");
        }
    };

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "شناسه محصول",
            width: 150,
            headerAlign: "left",
            align: "right",
        },
        {
            field: "productName",
            headerName: "نام محصول",
            width: 160,
            editable: true,
            headerAlign: "left",
            align: "right",
        },
        {
            field: "price",
            headerName: "قیمت محصول",
            type: "number",
            width: 120,
            editable: true,
            headerAlign: "left",
            align: "right",
        },
        {
            field: "description",
            headerName: "توضیحات محصول",
            sortable: false,
            width: 400,
            editable: true,
            headerAlign: "left",
            align: "right",
        },
        {
            field: "access",
            headerName: "دسترسی",
            width: 100,
            headerAlign: "left",
            align: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => handleEditClick(params.id)}
                        color="info"
                        aria-label="edit"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDelete(params.id)}
                        color="error"
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Paper sx={{ height: 400, width: "100%", borderRadius: 0 }}>
            <DataGrid
                rows={products}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                editMode="row"
                rowModesModel={rowModesModel}
                processRowUpdate={handleProcessRowUpdate}
                onRowEditStop={() => setRowModesModel({})}
                sx={{
                    direction: "rtl",
                    fontFamily: "var(--font-peyda)",
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f5f5f5",
                    },
                    borderRadius: 0,
                }}
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Paper>
    );
}
