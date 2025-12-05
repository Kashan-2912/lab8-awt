# 🚀 Next.js 15 Advanced Features Lab

A comprehensive demonstration of Next.js 15's powerful features including API Routes, Server Actions, Middleware, and Advanced Caching Strategies.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Feature Demonstrations](#-feature-demonstrations)
  - [API Routes](#1-api-routes-route-handlers)
  - [Server Actions](#2-server-actions)
  - [Middleware](#3-middleware)
  - [Next.js Optimizations](#4-nextjs-optimizations)
  - [Caching Strategies](#5-advanced-caching-strategies)
- [Demo Pages](#-demo-pages)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔗 **API Routes** | Modern route handlers with GET/POST endpoints |
| ⚡ **Edge Runtime** | Low-latency API endpoints using Edge Runtime |
| 🎯 **Server Actions** | Form handling without API routes |
| 🛡️ **Middleware** | Request interception and modification |
| 🖼️ **next/image** | Optimized image loading |
| 🔤 **next/font** | Zero layout shift fonts |
| 📜 **next/script** | Optimized third-party scripts |
| 💾 **Caching** | Four-layer caching system |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Kashan-2912/lab8-awt.git

# Navigate to project directory
cd lab8-awt

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
lab8/
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   └── route.ts          # Users API (GET/POST)
│   │   └── products/
│   │       └── route.ts          # Products API (Edge Runtime)
│   ├── actions/
│   │   └── cart-actions.ts       # Server Actions
│   ├── components/
│   │   └── AddToCartButton.tsx   # Client Component with Server Action
│   ├── lib/
│   │   └── data.ts               # Data fetching with caching
│   ├── cached-page/
│   │   └── page.tsx              # Static cached page demo
│   ├── dynamic-page/
│   │   └── page.tsx              # Dynamic page demo
│   ├── layout.tsx                # Root layout with fonts
│   └── page.tsx                  # Main demo page
├── middleware.ts                  # Middleware configuration
└── package.json
```

---

## 📚 Feature Demonstrations

### 1. API Routes (Route Handlers)

Modern API routes using the App Router pattern.

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}
```

#### Edge Runtime Support

```typescript
// app/api/products/route.ts
export const runtime = 'edge'; // Low-latency global distribution

export async function GET() {
  return NextResponse.json(products);
}
```

**Endpoints:**
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user
- `GET /api/products` - Fetch products (Edge Runtime)

---

### 2. Server Actions

Handle form submissions directly from server-side code.

```typescript
// app/actions/cart-actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function addToCart(formData: FormData) {
  const productId = formData.get('productId') as string;
  // Add to cart in DB
  revalidatePath('/cart');
}
```

#### Using in Client Components

```tsx
'use client';
import { addToCart } from '@/app/actions/cart-actions';
import { useFormStatus } from 'react-dom';

export default function AddButton() {
  const { pending } = useFormStatus();
  
  return (
    <form action={addToCart}>
      <button disabled={pending}>
        {pending ? 'Adding...' : 'Add to Cart'}
      </button>
    </form>
  );
}
```

---

### 3. Middleware

Intercept and modify requests before they reach your routes.

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add custom headers
  response.headers.set('x-middleware-cache', 'no-cache');
  response.headers.set('x-request-time', new Date().toISOString());
  
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

### 4. Next.js Optimizations

#### 🖼️ next/image
```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```
- Automatic optimization
- Lazy loading
- Responsive sizing
- WebP/AVIF conversion

#### 🔤 next/font
```tsx
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
```
- Self-hosted fonts
- Zero layout shift
- Automatic optimization

#### 📜 next/script
```tsx
import Script from 'next/script';

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"
/>
```
Strategies: `beforeInteractive` | `afterInteractive` | `lazyOnload`

---

### 5. Advanced Caching Strategies

Next.js provides a four-layer caching system:

| Layer | Description | Scope |
|-------|-------------|-------|
| 🧠 **Request Memoization** | Deduplicates fetch requests | Single request |
| 💾 **Data Cache** | Caches fetch responses | Persistent |
| 📄 **Full Route Cache** | Caches entire HTML pages | Build time |
| 🔄 **Router Cache** | Client-side navigation cache | Session |

#### Examples

```typescript
// Force cache (default) - cached indefinitely
fetch(url, { cache: 'force-cache' });

// Revalidate after 1 hour
fetch(url, { next: { revalidate: 3600 } });

// No caching - always fresh
fetch(url, { cache: 'no-store' });

// Tag-based revalidation
fetch(url, { next: { tags: ['posts'] } });
```

#### Page-level Configuration

```typescript
// Static page (cached)
export const dynamic = 'force-static';
export const revalidate = 3600;

// Dynamic page (no cache)
export const dynamic = 'force-dynamic';
```

---

## 🎮 Demo Pages

| Page | URL | Description |
|------|-----|-------------|
| 🏠 Home | `/` | Main demo showcasing all features |
| 📦 Cached Page | `/cached-page` | Static shell caching demo |
| ⚡ Dynamic Page | `/dynamic-page` | Force dynamic rendering demo |
| 👥 Users API | `/api/users` | REST API endpoint |
| 🛍️ Products API | `/api/products` | Edge Runtime API |

---

## 🛠️ Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
- [Caching](https://nextjs.org/docs/app/building-your-application/caching)

---

## 👨‍💻 Author

**Kashan**

---

<p align="center">
  Made with ❤️ using Next.js 15
</p>
