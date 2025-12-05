import { headers } from 'next/headers';
import Link from 'next/link';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';

export default async function DynamicPage() {
  // Using dynamic functions forces dynamic rendering
  const headersList = await headers();
  
  const userAgent = headersList.get('user-agent') || 'Unknown';

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dynamic Page Demo</h1>
      
      <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg mb-6">
        <h2 className="font-semibold text-orange-800 dark:text-orange-200">Force Dynamic</h2>
        <p className="text-orange-700 dark:text-orange-300 text-sm">
          This page is always rendered dynamically on each request.
          Using cookies(), headers(), or searchParams forces dynamic rendering.
        </p>
        <code className="block mt-2 bg-orange-200 dark:bg-orange-800 p-2 rounded text-sm">
          export const dynamic = &apos;force-dynamic&apos;;
        </code>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold">Request Headers</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
            User-Agent: {userAgent.substring(0, 100)}...
          </p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold">Current Time</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {new Date().toISOString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            (This changes on every request because the page is dynamic)
          </p>
        </div>
      </div>

      <Link 
        href="/"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
