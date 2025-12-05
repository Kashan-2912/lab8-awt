import { NextResponse } from 'next/server';

// Edge Runtime for low-latency responses
export const runtime = 'edge';

// Simulated products data
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 699.99 },
  { id: 3, name: 'Headphones', price: 199.99 },
];

// GET - Fetching Products (Edge Runtime)
export async function GET() {
  return NextResponse.json(products);
}

// POST - Adding Product (Edge Runtime)
export async function POST(request: Request) {
  const body = await request.json();
  const newProduct = {
    id: products.length + 1,
    name: body.name,
    price: body.price,
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
