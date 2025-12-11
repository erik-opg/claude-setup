---
name: api-development
description: |
  Complete API development workflow for Next.js applications. Creates new API routes with
  validation, adds authentication and security layers, and generates comprehensive tests.
  Triggers: create API, new endpoint, API route, add auth, protect endpoint, secure API, test API.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(npm:*)
  - Bash(npx:*)
---

# API Development Skill

Complete workflow for building production-ready Next.js API routes.

## Tier 1: Core Concepts (Always Loaded)

### Progressive Workflow
1. **Create Route** → 2. **Add Security** → 3. **Generate Tests**

### Essential Principles
- Use Zod for runtime validation
- Early validation before expensive operations
- Consistent error response format: `{ data, success: true }` or `{ error, success: false }`
- TypeScript strict mode, no `any` types
- Minimal logic in routes (extract to services)

### File Structure
```
app/api/[endpoint]/route.ts     # Handler
lib/api/error-handler.ts        # Shared errors
__tests__/api/[endpoint].test.ts # Tests
```

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Server Error |

## Tier 2: Patterns & Techniques (Loaded on Activation)

### Route Handler Pattern
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(1) })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = schema.parse(body)
    // Business logic here
    return NextResponse.json({ data: result, success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors, success: false }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal error', success: false }, { status: 500 })
  }
}
```

### Authentication Patterns

**Supabase Auth:**
```typescript
const supabase = createClient()
const { data: { user } } = await supabase.auth.getUser()
if (!user) return new Response('Unauthorized', { status: 401 })
```

**NextAuth.js:**
```typescript
const session = await getServerSession(authOptions)
if (!session) return new Response('Unauthorized', { status: 401 })
```

**Simple Token:**
```typescript
const token = request.headers.get('authorization')
if (token !== process.env.ADMIN_TOKEN) return new Response('Unauthorized', { status: 401 })
```

### Security Checklist
- [ ] Validate all inputs with Zod
- [ ] Verify authentication tokens
- [ ] Check authorization/ownership
- [ ] Rate limit endpoints
- [ ] Don't expose stack traces
- [ ] Sanitize SQL/NoSQL inputs

## Tier 3: Resources (Load on Demand)

For detailed implementations, load these resources:

- **references/security-patterns.md** - Full authentication implementations, RBAC, CORS
- **references/testing-strategies.md** - Complete test suite patterns, mocking, fixtures
- **references/error-handling-patterns.md** - Centralized error handling, logging
- **assets/api-route-template.ts** - Complete route handler template
- **assets/validation-schema.ts** - Common Zod schema patterns
- **assets/test-suite-template.ts** - Test file template with all scenarios
