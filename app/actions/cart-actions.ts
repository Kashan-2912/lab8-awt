// Server Actions - The new way to handle form submissions in Next.js
'use server';

import { revalidatePath } from 'next/cache';

// Simulated cart data
let cart: { productId: string; quantity: number }[] = [];

// Server Action to add item to cart
export async function addToCart(formData: FormData) {
  const productId = formData.get('productId') as string;
  const quantity = parseInt(formData.get('quantity') as string) || 1;

  // Simulate adding to cart in DB
  cart.push({ productId, quantity });

  // Revalidate the cart page to show updated data
  revalidatePath('/cart');
}

// Server Action to remove item from cart
export async function removeFromCart(formData: FormData) {
  const productId = formData.get('productId') as string;

  // Simulate removing from cart in DB
  cart = cart.filter((item) => item.productId !== productId);

  // Revalidate the cart page
  revalidatePath('/cart');

  return { success: true, message: `Removed product ${productId} from cart` };
}

// Server Action to get cart items
export async function getCartItems() {
  return cart;
}
