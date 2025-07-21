import fs from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const fileDir = path.join(process.cwd(), 'data');
const filePath = path.join(fileDir, 'products.json');

async function readProducts() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        // اگر فایل وجود نداشت، آرایه خالی برگردان
        if ((err as any).code === 'ENOENT') {
            return [];
        }
        throw err;
    }
}

async function writeProducts(products: any[]) {
    try {
        // اگر پوشه وجود نداشت، بسازش
        await fs.mkdir(fileDir, { recursive: true });
        await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    } catch (err) {
        throw err;
    }
}

export async function GET() {
    try {
        const products = await readProducts();
        return NextResponse.json(products);
    } catch (err) {
        return NextResponse.json({ error: 'خطا در خواندن محصولات' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const newProduct = await req.json();
        const products = await readProducts();

        const newItem = {
            id: Date.now(),
            ...newProduct,
        };

        products.push(newItem);
        await writeProducts(products);

        return NextResponse.json(newItem, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: 'خطا در ذخیره محصول' }, { status: 500 });
    }
}
