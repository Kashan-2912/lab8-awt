import { Suspense } from 'react';
import { getPosts } from '@/app/lib/data';

// 3. Full Route Cache (static shell) - Caches entire route segments
// This page will be statically generated at build time

// Force static generation (default behavior for pages without dynamic functions)
export const dynamic = 'force-static';

// Revalidate the entire page every hour
export const revalidate = 3600;

async function PostsList() {
  const posts = await getPosts();
  return (
    <div className="grid gap-4">
      {posts.slice(0, 5).map((post: { id: number; title: string; body: string }) => (
        <div key={post.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function CachedPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Full Route Cache Demo</h1>
      
      <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg mb-6">
        <h2 className="font-semibold text-green-800 dark:text-green-200">Static Shell Caching</h2>
        <p className="text-green-700 dark:text-green-300 text-sm">
          This entire page is cached as a static shell. The HTML is generated at build time
          and served from the cache for all requests.
        </p>
        <code className="block mt-2 bg-green-200 dark:bg-green-800 p-2 rounded text-sm">
          export const dynamic = &apos;force-static&apos;;
        </code>
      </div>

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>

      <p className="mt-6 text-sm text-gray-500">
        Page generated at: {new Date().toISOString()}
      </p>
    </div>
  );
}
