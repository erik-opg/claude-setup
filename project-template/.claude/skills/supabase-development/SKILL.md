---
name: supabase-development
description: |
  Complete Supabase development workflow for Edge Functions and type generation.
  Handles Deno-based Edge Functions, TypeScript type generation from schema, and
  database integration. Triggers: Supabase, Edge Function, generate types, Deno function,
  serverless function.
allowed-tools:
  - Bash(npx supabase:*)
  - Bash(npm:*)
  - Read
  - Write
  - Edit
  - Glob
---

# Supabase Development Skill

Streamlined workflow for Supabase Edge Functions and type generation.

## Edge Functions (Deno-based)

### Quick Create
```bash
npx supabase functions new function-name
```

### Function Template
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req: Request) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return new Response('Unauthorized', { status: 401 })

  // Business logic here

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
})
```

### Deploy & Test
```bash
npx supabase functions serve function-name  # Local
npx supabase functions deploy function-name  # Production
```

## Type Generation

### Generate Types
```bash
npx supabase gen types typescript --project-id PROJECT_ID > lib/database.types.ts
# OR local
npx supabase gen types typescript --local > lib/database.types.ts
```

### Usage
```typescript
import type { Database } from '@/lib/database.types'

type User = Database['public']['Tables']['users']['Row']
const supabase = createClient<Database>(url, key)
```

## Best Practices

- ✅ Verify user authentication in Edge Functions
- ✅ Use RLS policies for data access
- ✅ Regenerate types after schema changes
- ✅ Test locally before deploying
- ✅ Use service role key sparingly
