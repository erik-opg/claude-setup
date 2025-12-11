# Security Patterns for API Development

## Authentication Implementations

### Supabase Auth (Recommended for Supabase projects)
```typescript
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function withAuth(
  request: NextRequest,
  handler: (user: User) => Promise<NextResponse>
) {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return NextResponse.json(
      { error: 'Unauthorized', success: false },
      { status: 401 }
    )
  }

  return handler(user)
}

// Usage
export async function GET(request: NextRequest) {
  return withAuth(request, async (user) => {
    // user is guaranteed to exist here
    const data = await fetchUserData(user.id)
    return NextResponse.json({ data, success: true })
  })
}
```

### NextAuth.js Implementation
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function withSession(
  handler: (session: Session) => Promise<NextResponse>
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized', success: false },
      { status: 401 }
    )
  }

  return handler(session)
}
```

### JWT Validation
```typescript
import { verify, JwtPayload } from 'jsonwebtoken'

export function validateJWT(token: string): JwtPayload | null {
  try {
    const payload = verify(token, process.env.JWT_SECRET!)
    return payload as JwtPayload
  } catch {
    return null
  }
}

export async function withJWT(
  request: NextRequest,
  handler: (payload: JwtPayload) => Promise<NextResponse>
) {
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')

  if (!token) {
    return NextResponse.json(
      { error: 'Missing token', success: false },
      { status: 401 }
    )
  }

  const payload = validateJWT(token)
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid token', success: false },
      { status: 401 }
    )
  }

  return handler(payload)
}
```

## Authorization (RBAC)

### Role-Based Access Control
```typescript
type Role = 'admin' | 'editor' | 'viewer'

interface User {
  id: string
  role: Role
}

const rolePermissions: Record<Role, string[]> = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read']
}

export function hasPermission(user: User, permission: string): boolean {
  return rolePermissions[user.role]?.includes(permission) ?? false
}

export function requirePermission(permission: string) {
  return async (
    request: NextRequest,
    handler: (user: User) => Promise<NextResponse>
  ) => {
    return withAuth(request, async (user) => {
      if (!hasPermission(user, permission)) {
        return NextResponse.json(
          { error: 'Forbidden', success: false },
          { status: 403 }
        )
      }
      return handler(user)
    })
  }
}
```

### Resource Ownership
```typescript
export async function verifyOwnership(
  userId: string,
  resourceId: string,
  resourceTable: string
): Promise<boolean> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(resourceTable)
    .select('user_id')
    .eq('id', resourceId)
    .single()

  return !error && data?.user_id === userId
}
```

## Rate Limiting

### In-Memory Rate Limiter
```typescript
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs })
    return { success: true, remaining: limit - 1, reset: now + windowMs }
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, reset: record.resetTime }
  }

  record.count++
  return { success: true, remaining: limit - record.count, reset: record.resetTime }
}

// Usage in route
export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { success, remaining, reset } = rateLimit(ip, 10, 60000) // 10 req/min

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', success: false },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': reset.toString(),
          'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString()
        }
      }
    )
  }

  // Handle request...
}
```

## CORS Configuration

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedOrigins = [
  'https://yourdomain.com',
  'https://app.yourdomain.com'
]

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const response = NextResponse.next()

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400')
  }

  return response
}

export const config = {
  matcher: '/api/:path*'
}
```

## Input Sanitization

```typescript
import { z } from 'zod'
import DOMPurify from 'isomorphic-dompurify'

// Sanitize HTML content
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href']
  })
}

// Zod schema with sanitization
export const createPostSchema = z.object({
  title: z.string().min(1).max(200).transform(s => s.trim()),
  content: z.string().transform(sanitizeHtml),
  slug: z.string().regex(/^[a-z0-9-]+$/),
})

// SQL injection prevention (use parameterized queries)
// NEVER do: `SELECT * FROM users WHERE id = '${userId}'`
// ALWAYS do: supabase.from('users').select().eq('id', userId)
```
