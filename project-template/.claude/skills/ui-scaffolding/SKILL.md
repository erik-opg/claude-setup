---
name: ui-scaffolding
description: |
  Complete UI development workflow for Next.js 15 and React 19 applications. Creates
  components and pages with TypeScript, modern patterns, and accessibility.
  Triggers: create component, new component, build UI, create page, new page, React component.
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
---

# UI Scaffolding Skill

Complete workflow for building production-ready Next.js UI with modern React patterns.

## Tier 1: Core Concepts (Always Loaded)

### Progressive Workflow
1. **Create Component** → 2. **Add to Page** → 3. **Add Tests/Storybook**

### Server vs Client Components

| Use Server Component (default) | Use Client Component ('use client') |
|-------------------------------|-------------------------------------|
| Data fetching | Event listeners (onClick) |
| Backend access | State hooks (useState) |
| Sensitive data | Effect hooks (useEffect) |
| Large dependencies | Browser APIs (localStorage) |

### File Structure
```
app/
  [route]/
    page.tsx      # Main page
    loading.tsx   # Loading UI
    error.tsx     # Error UI
components/
  [component]/
    index.tsx     # Component
    types.ts      # TypeScript types
```

### Essential Patterns

**Client Component:**
```typescript
'use client'
import { useState } from 'react'

interface Props { title: string }

export function Counter({ title }: Props) {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{title}: {count}</button>
}
```

**Server Component (default):**
```typescript
interface Props { userId: string }

export async function UserProfile({ userId }: Props) {
  const user = await fetchUser(userId)
  return <div>{user.name}</div>
}
```

## Tier 2: Patterns & Techniques (Loaded on Activation)

### Page with Metadata
```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'User dashboard'
}

export default async function DashboardPage() {
  const data = await fetchData()
  return <Dashboard data={data} />
}
```

### Streaming with Suspense
```typescript
import { Suspense } from 'react'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  )
}
```

### React 19 Forms
```typescript
'use client'
import { useActionState, useFormStatus } from 'react'

function SubmitButton() {
  const { pending } = useFormStatus()
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
}

function Form() {
  const [state, action] = useActionState(submitAction, null)
  return <form action={action}><SubmitButton /></form>
}
```

### Accessibility Essentials
```typescript
// ARIA labels
<button aria-label="Close dialog"><XIcon /></button>

// Keyboard navigation
<div role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onClick()}>

// Focus management
const ref = useRef<HTMLElement>(null)
useEffect(() => ref.current?.focus(), [])
```

### Performance
```typescript
// Lazy loading
const Heavy = lazy(() => import('./Heavy'))

// Memoization
const value = useMemo(() => expensive(), [dep])
const handler = useCallback(() => action(), [dep])
```

## Tier 3: Resources (Load on Demand)

For detailed implementations, load these resources:

- **references/react-19-patterns.md** - All React 19 hooks (use, useActionState, useOptimistic)
- **references/accessibility-guide.md** - Complete ARIA patterns, keyboard nav, focus management
- **references/performance-optimization.md** - Code splitting, lazy loading, memoization strategies
- **references/data-fetching-patterns.md** - Server/Client patterns, SWR, React Query
- **assets/server-component-template.tsx** - Complete server component template
- **assets/client-component-template.tsx** - Complete client component template
- **assets/page-template.tsx** - Page with metadata, loading, error handling
