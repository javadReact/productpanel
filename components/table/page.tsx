"use client";

import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useProductContext } from "../contexts/ProductContext";

const columns: GridColDef[] = [
    { field: "id", headerName: "شناسه محصول", width: 150, headerAlign: "left", align: "right" },
    { field: "productName", headerName: "نام محصول", width: 160, headerAlign: "left", align: "right" },
    {
        field: "price",
        headerName: "قیمت محصول",
        type: "number",
        width: 120,
        headerAlign: "left",
        align: "right",
    },
    {
        field: "description",
        headerName: "توضیحات محصول",
        description: "این فیلد برای توضیحات محصول می‌باشد",
        sortable: false,
        width: 400,
        headerAlign: "left",
        align: "right",
    },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
    const { products } = useProductContext();

    return (
        <Paper sx={{ height: 400, width: "100%", borderRadius: 0 }}>
            <DataGrid
                rows={products}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                checkboxSelection
                sx={{
                    direction: "rtl",
                    fontFamily: "var(--font-peyda)",
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f5f5f5",
                    },
                    borderRadius: 0,
                }}
            />
        </Paper>
    );
}
