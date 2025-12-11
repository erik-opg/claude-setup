# Testing Strategies for API Development

## Test Framework Setup

### Vitest (Recommended)
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### Test Setup
```typescript
// tests/setup.ts
import { beforeAll, afterAll, afterEach } from 'vitest'
import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
```

## Complete Test Suite Template

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET, POST, PUT, DELETE } from '@/app/api/resource/route'

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'user-123', email: 'test@example.com' } },
        error: null
      })
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: mockData, error: null })
    }))
  })
}))

const mockData = {
  id: 'resource-123',
  name: 'Test Resource',
  user_id: 'user-123'
}

function createRequest(method: string, body?: object): NextRequest {
  return new NextRequest('http://localhost/api/resource', {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer valid-token'
    }
  })
}

describe('API: /api/resource', () => {
  describe('GET /api/resource', () => {
    it('should return resource for authenticated user', async () => {
      const request = createRequest('GET')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toBeDefined()
    })

    it('should return 401 for unauthenticated request', async () => {
      // Override mock for this test
      vi.mocked(createClient).mockReturnValueOnce({
        auth: {
          getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: { message: 'Not authenticated' } })
        }
      } as any)

      const request = createRequest('GET')
      const response = await GET(request)

      expect(response.status).toBe(401)
    })
  })

  describe('POST /api/resource', () => {
    it('should create resource with valid data', async () => {
      const request = createRequest('POST', { name: 'New Resource' })
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
    })

    it('should return 400 for invalid data', async () => {
      const request = createRequest('POST', { name: '' }) // Empty name
      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Validation')
    })

    it('should return 400 for missing required fields', async () => {
      const request = createRequest('POST', {}) // Missing name
      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })

  describe('PUT /api/resource', () => {
    it('should update resource owned by user', async () => {
      const request = createRequest('PUT', { id: 'resource-123', name: 'Updated' })
      const response = await PUT(request)

      expect(response.status).toBe(200)
    })

    it('should return 403 for resource not owned by user', async () => {
      // Mock ownership check failure
      const request = createRequest('PUT', { id: 'other-resource', name: 'Hacked' })
      const response = await PUT(request)

      expect(response.status).toBe(403)
    })
  })

  describe('DELETE /api/resource', () => {
    it('should delete resource owned by user', async () => {
      const request = createRequest('DELETE')
      // Add id as query param or in body based on your API design
      const response = await DELETE(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Error Handling', () => {
    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost/api/resource', {
        method: 'POST',
        body: 'not-json',
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('should not expose internal errors', async () => {
      // Mock database error
      vi.mocked(createClient).mockReturnValueOnce({
        auth: { getUser: vi.fn().mockResolvedValue({ data: { user: mockData }, error: null }) },
        from: vi.fn(() => ({ select: vi.fn().mockRejectedValue(new Error('DB Connection Failed')) }))
      } as any)

      const request = createRequest('GET')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).not.toContain('DB Connection')
    })
  })

  describe('Rate Limiting', () => {
    it('should return 429 after exceeding limit', async () => {
      // Make requests up to limit
      for (let i = 0; i < 10; i++) {
        await POST(createRequest('POST', { name: `Test ${i}` }))
      }

      // Next request should be rate limited
      const response = await POST(createRequest('POST', { name: 'One more' }))
      expect(response.status).toBe(429)
      expect(response.headers.get('Retry-After')).toBeDefined()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty request body', async () => {
      const request = new NextRequest('http://localhost/api/resource', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('should handle special characters in input', async () => {
      const request = createRequest('POST', {
        name: '<script>alert("xss")</script>'
      })

      const response = await POST(request)
      // Should either sanitize or reject
      expect([200, 400]).toContain(response.status)
    })

    it('should handle very long input', async () => {
      const request = createRequest('POST', {
        name: 'a'.repeat(10000)
      })

      const response = await POST(request)
      expect(response.status).toBe(400) // Should reject oversized input
    })
  })
})
```

## Mock Service Worker (MSW) Setup

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/external-service', () => {
    return HttpResponse.json({ data: 'mocked' })
  }),

  http.post('/api/external-service', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({ received: body })
  }),
]

// tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

## Test Fixtures

```typescript
// tests/fixtures/users.ts
export const mockUser = {
  id: 'user-123',
  email: 'test@example.com',
  role: 'user',
  created_at: '2025-01-01T00:00:00Z'
}

export const mockAdminUser = {
  ...mockUser,
  id: 'admin-456',
  email: 'admin@example.com',
  role: 'admin'
}

// tests/fixtures/resources.ts
export const mockResource = {
  id: 'resource-123',
  name: 'Test Resource',
  user_id: 'user-123',
  created_at: '2025-01-01T00:00:00Z'
}

export const createMockResource = (overrides = {}) => ({
  ...mockResource,
  id: `resource-${Date.now()}`,
  ...overrides
})
```
