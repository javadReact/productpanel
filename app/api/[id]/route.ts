import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const filePath = path.join(process.cwd(), 'data', 'products.json');

async function readProducts() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeProducts(products: any[]) {
    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const updatedProductData = await req.json();

    const products = await readProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }

    const updatedProduct = { ...products[productIndex], ...updatedProductData };
    products[productIndex] = updatedProduct;

    await writeProducts(products);

    return NextResponse.json(updatedProduct);
}
