// Data fetching utilities with caching strategies

// 1. Request Memoization - Caches results within a single request lifecycle
// React automatically memoizes fetch requests with the same URL and options
export async function getUser(id: string) {
  // This fetch is automatically memoized
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  return res.json();
}

// 2. Data Cache (fetch cache) - Caches responses from fetch requests
export async function getPosts() {
  // force-cache is the default - data is cached indefinitely
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'force-cache', // Default behavior
  });
  return res.json();
}

// Revalidate cached data after a specific time
export async function getPostsWithRevalidation() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// No caching - always fetch fresh data
export async function getPostsNoCache() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', // Always fetch fresh data
  });
  return res.json();
}

// Using tags for on-demand revalidation
export async function getPostsWithTags() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: { tags: ['posts'] }, // Tag for revalidation
  });
  return res.json();
}
