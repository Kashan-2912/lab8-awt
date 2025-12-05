'use client';

import { addToCart } from '@/app/actions/cart-actions';
import { useFormStatus } from 'react-dom';

// Button component that shows loading state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
    >
      {pending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}

// Client component using Server Action
export default function AddToCartButton({ productId }: { productId: string }) {
  return (
    <form action={addToCart} className="inline">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value="1" />
      <SubmitButton />
    </form>
  );
}
