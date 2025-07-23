import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const fileDir = path.join(process.cwd(), "data");
const filePath = path.join(fileDir, "products.json");

async function readProducts() {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        if ((err as any).code === "ENOENT") {
            return [];
        }
        throw err;
    }
}

async function writeProducts(products: any[]) {
    await fs.mkdir(fileDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }

        const updatedProduct = await req.json();

        if (
            !updatedProduct.productName ||
            typeof updatedProduct.productName !== "string" ||
            !updatedProduct.description ||
            typeof updatedProduct.description !== "string" ||
            typeof updatedProduct.price !== "number"
        ) {
            return NextResponse.json(
                { error: "داده‌های ارسالی نامعتبر است" },
                { status: 400 }
            );
        }

        const products = await readProducts();

        const productIndex = products.findIndex((p: any) => p.id === id);

        if (productIndex === -1) {
            return NextResponse.json(
                { error: "محصولی با این شناسه پیدا نشد" },
                { status: 404 }
            );
        }

        // جایگزینی محصول قدیمی با محصول جدید
        products[productIndex] = {
            id,
            productName: updatedProduct.productName,
            description: updatedProduct.description,
            price: updatedProduct.price,
        };

        await writeProducts(products);

        return NextResponse.json(products[productIndex], { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "خطا در به‌روزرسانی محصول" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = Number(params.id);
        if (isNaN(id)) {
            return NextResponse.json(
                { error: "شناسه نامعتبر است" },
                { status: 400 }
            );
        }

        const products = await readProducts();
        const filteredProducts = products.filter((p: any) => p.id !== id);

        if (filteredProducts.length === products.length) {
            return NextResponse.json(
                { error: "محصول با این شناسه پیدا نشد" },
                { status: 404 }
            );
        }

        await writeProducts(filteredProducts);

        return NextResponse.json({ message: "محصول با موفقیت حذف شد" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "خطا در حذف محصول" },
            { status: 500 }
        );
    }
}
