/**
 * Next.js 15 Page Template
 *
 * Complete page setup with metadata, error handling, and loading states.
 * Copy and customize for your routes.
 */

// =============================================================================
// page.tsx - Main Page Component
// =============================================================================

import { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

// SEO Metadata
export const metadata: Metadata = {
  title: 'Page Title | Site Name',
  description: 'Page description for SEO (150-160 characters)',
  openGraph: {
    title: 'Page Title | Site Name',
    description: 'Page description for social sharing',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title | Site Name',
    description: 'Page description for Twitter',
  },
}

// Optional: Dynamic metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = await fetchItem(params.id)

  if (!item) {
    return { title: 'Not Found' }
  }

  return {
    title: `${item.name} | Site Name`,
    description: item.description,
  }
}

// Optional: Static params for dynamic routes
export async function generateStaticParams() {
  const items = await fetchAllItems()
  return items.map((item) => ({ id: item.id }))
}

// Optional: Revalidation
export const revalidate = 60 // Revalidate every 60 seconds

// Page Component
interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  const item = await fetchItem(params.id)

  if (!item) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{item.name}</h1>

      {/* Fast-loading content */}
      <section className="mb-8">
        <p>{item.description}</p>
      </section>

      {/* Slow-loading content with Suspense */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics itemId={params.id} />
      </Suspense>

      <Suspense fallback={<RelatedItemsSkeleton />}>
        <RelatedItems itemId={params.id} />
      </Suspense>
    </main>
  )
}

// =============================================================================
// loading.tsx - Loading State
// =============================================================================

export function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded w-1/3 mb-6" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    </main>
  )
}

// =============================================================================
// error.tsx - Error Boundary
// =============================================================================

'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorProps) {
  return (
    <main className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
      <p className="text-gray-600 mb-6">
        We encountered an error loading this page.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </main>
  )
}

// =============================================================================
// not-found.tsx - 404 Page
// =============================================================================

import Link from 'next/link'

export function NotFound() {
  return (
    <main className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go Home
      </Link>
    </main>
  )
}

// =============================================================================
// Skeleton Components
// =============================================================================

function AnalyticsSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg p-6 mb-8">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
        <div className="h-24 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

function RelatedItemsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// Async Components (for Suspense)
// =============================================================================

async function Analytics({ itemId }: { itemId: string }) {
  const analytics = await fetchAnalytics(itemId)

  return (
    <section className="bg-gray-50 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Analytics</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{analytics.views}</div>
          <div className="text-gray-600">Views</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{analytics.likes}</div>
          <div className="text-gray-600">Likes</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-2xl font-bold">{analytics.shares}</div>
          <div className="text-gray-600">Shares</div>
        </div>
      </div>
    </section>
  )
}

async function RelatedItems({ itemId }: { itemId: string }) {
  const related = await fetchRelatedItems(itemId)

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Related Items</h2>
      <div className="grid grid-cols-4 gap-4">
        {related.map((item) => (
          <Link
            key={item.id}
            href={`/items/${item.id}`}
            className="block bg-white rounded shadow hover:shadow-md transition"
          >
            <div className="p-4">
              <div className="font-medium">{item.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// =============================================================================
// Mock Data Fetchers (replace with real implementations)
// =============================================================================

async function fetchItem(id: string) {
  // Replace with actual data fetching
  return { id, name: 'Item Name', description: 'Item description' }
}

async function fetchAllItems() {
  // Replace with actual data fetching
  return [{ id: '1' }, { id: '2' }]
}

async function fetchAnalytics(itemId: string) {
  // Simulate slow API
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { views: 1234, likes: 56, shares: 12 }
}

async function fetchRelatedItems(itemId: string) {
  // Simulate slow API
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return [
    { id: '2', name: 'Related 1' },
    { id: '3', name: 'Related 2' },
    { id: '4', name: 'Related 3' },
    { id: '5', name: 'Related 4' },
  ]
}
