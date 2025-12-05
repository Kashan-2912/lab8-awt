import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import AddToCartButton from './components/AddToCartButton';

// This page demonstrates all Next.js features for the lab
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* next/script - Load external scripts optimally */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>

      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* next/image - Optimized image loading */}
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={100}
            height={24}
            priority
            className="dark:invert"
          />
          <h1 className="text-xl font-bold">Lab 8 - Next.js Features Demo</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Feature 1: API Routes */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">1. API Routes (Route Handlers)</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Modern API routes using the App Router. Located in <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">app/api/</code>
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-green-600">GET /api/users</h3>
              <p className="text-sm text-gray-500">Fetches all users</p>
              <Link href="/api/users" className="text-blue-500 hover:underline text-sm">
                Test API →
              </Link>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold text-yellow-600">GET /api/products (Edge Runtime)</h3>
              <p className="text-sm text-gray-500">Edge runtime for low-latency</p>
              <Link href="/api/products" className="text-blue-500 hover:underline text-sm">
                Test API →
              </Link>
            </div>
          </div>
          <pre className="mt-4 p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}`}
          </pre>
        </section>

        {/* Feature 2: Server Actions */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">2. Server Actions Revolution</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Handle form submissions directly from server-side code. No API routes needed!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {['Product 1', 'Product 2', 'Product 3'].map((product, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold">{product}</h3>
                <p className="text-sm text-gray-500 mb-2">$99.99</p>
                <AddToCartButton productId={`prod-${i + 1}`} />
              </div>
            ))}
          </div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`// app/actions/cart-actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function addToCart(formData: FormData) {
  const productId = formData.get('productId') as string;
  // Add to cart in DB
  revalidatePath('/cart');
}`}
          </pre>
        </section>

        {/* Feature 3: Middleware */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-red-600">3. Middleware</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Runs before every request. Use for authentication, redirects, headers, and more.
            Located in <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">middleware.ts</code>
          </p>
          <pre className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('x-middleware-cache', 'no-cache');
  response.headers.set('x-request-time', new Date().toISOString());
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};`}
          </pre>
        </section>

        {/* Feature 4: next/image, next/font, next/script */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-teal-600">4. next/image, next/font, next/script</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">next/image</h3>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={80}
                height={20}
                className="dark:invert mb-2"
              />
              <p className="text-xs text-gray-500">
                Automatic image optimization, lazy loading, and responsive sizing
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">next/font</h3>
              <p className="font-sans">Geist Sans Font</p>
              <p className="font-mono">Geist Mono Font</p>
              <p className="text-xs text-gray-500 mt-2">
                Self-hosted fonts with zero layout shift
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">next/script</h3>
              <p className="text-xs text-gray-500">
                Load third-party scripts with different strategies:
                <br />• beforeInteractive
                <br />• afterInteractive
                <br />• lazyOnload
              </p>
            </div>
          </div>
        </section>

        {/* Feature 5: Caching Strategies */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">5. Advanced Caching Strategies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Four-layer caching system for optimal performance
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold">1. Request Memoization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Caches results within a single request lifecycle
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold">2. Data Cache (fetch cache)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Caches responses from fetch requests
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold">3. Full Route Cache (static shell)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Caches entire route segments
              </p>
              <Link href="/cached-page" className="text-purple-600 hover:underline text-sm">
                View Demo →
              </Link>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold">4. Router Cache (client-side)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Caches client-side navigation states
              </p>
              <Link href="/dynamic-page" className="text-orange-600 hover:underline text-sm">
                View Dynamic Demo →
              </Link>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">How to force dynamic:</p>
            <code className="text-green-400">
              export const dynamic = &apos;force-dynamic&apos;; // or use cookies(), headers(), searchParams
            </code>
          </div>
        </section>

        {/* Navigation to demo pages */}
        <section className="p-6 bg-linear-to-r from-blue-500 to-purple-600 rounded-xl shadow text-white">
          <h2 className="text-2xl font-bold mb-4">Demo Pages</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/cached-page" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
              Static Cached Page
            </Link>
            <Link href="/dynamic-page" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
              Dynamic Page
            </Link>
            <Link href="/api/users" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
              API: Users
            </Link>
            <Link href="/api/products" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition">
              API: Products (Edge)
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
          <p>Lab 8 - Next.js Advanced Features Demo</p>
        </div>
      </footer>
    </div>
  );
}
