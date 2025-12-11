/**
 * API Route Template - Next.js 15 App Router
 *
 * Copy this template and customize for your endpoint.
 * Includes: validation, error handling, authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

// =============================================================================
// VALIDATION SCHEMAS
// =============================================================================

const createSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name too long'),
  description: z.string().optional(),
})

const updateSchema = z.object({
  id: z.string().uuid('Invalid ID'),
  name: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
})

const idSchema = z.object({
  id: z.string().uuid('Invalid ID'),
})

// =============================================================================
// TYPES
// =============================================================================

type CreateInput = z.infer<typeof createSchema>
type UpdateInput = z.infer<typeof updateSchema>

interface ApiResponse<T> {
  data?: T
  error?: string
  details?: unknown
  success: boolean
}

// =============================================================================
// HELPERS
// =============================================================================

function jsonResponse<T>(data: ApiResponse<T>, status: number = 200) {
  return NextResponse.json(data, { status })
}

function errorResponse(error: string, status: number, details?: unknown) {
  return jsonResponse({ error, details, success: false }, status)
}

async function getAuthenticatedUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return null
  }

  return user
}

// =============================================================================
// ROUTE HANDLERS
// =============================================================================

/**
 * GET /api/resource
 * Fetch resources for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Authentication
    const user = await getAuthenticatedUser()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    // 2. Fetch data
    const supabase = createClient()
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return errorResponse('Failed to fetch resources', 500)
    }

    // 3. Return success
    return jsonResponse({ data, success: true })

  } catch (error) {
    console.error('GET /api/resource error:', error)
    return errorResponse('Internal server error', 500)
  }
}

/**
 * POST /api/resource
 * Create new resource
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Authentication
    const user = await getAuthenticatedUser()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    // 2. Parse and validate input
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON', 400)
    }

    const result = createSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('Validation failed', 400, result.error.errors)
    }

    const input: CreateInput = result.data

    // 3. Create resource
    const supabase = createClient()
    const { data, error } = await supabase
      .from('resources')
      .insert({
        ...input,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return errorResponse('Failed to create resource', 500)
    }

    // 4. Return success
    return jsonResponse({ data, success: true }, 201)

  } catch (error) {
    console.error('POST /api/resource error:', error)
    return errorResponse('Internal server error', 500)
  }
}

/**
 * PUT /api/resource
 * Update existing resource
 */
export async function PUT(request: NextRequest) {
  try {
    // 1. Authentication
    const user = await getAuthenticatedUser()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    // 2. Parse and validate input
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return errorResponse('Invalid JSON', 400)
    }

    const result = updateSchema.safeParse(body)
    if (!result.success) {
      return errorResponse('Validation failed', 400, result.error.errors)
    }

    const { id, ...updates }: UpdateInput = result.data

    // 3. Verify ownership
    const supabase = createClient()
    const { data: existing } = await supabase
      .from('resources')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!existing) {
      return errorResponse('Resource not found', 404)
    }

    if (existing.user_id !== user.id) {
      return errorResponse('Forbidden', 403)
    }

    // 4. Update resource
    const { data, error } = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return errorResponse('Failed to update resource', 500)
    }

    // 5. Return success
    return jsonResponse({ data, success: true })

  } catch (error) {
    console.error('PUT /api/resource error:', error)
    return errorResponse('Internal server error', 500)
  }
}

/**
 * DELETE /api/resource
 * Delete resource
 */
export async function DELETE(request: NextRequest) {
  try {
    // 1. Authentication
    const user = await getAuthenticatedUser()
    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    // 2. Get ID from query params or body
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const result = idSchema.safeParse({ id })
    if (!result.success) {
      return errorResponse('Invalid ID', 400, result.error.errors)
    }

    // 3. Verify ownership
    const supabase = createClient()
    const { data: existing } = await supabase
      .from('resources')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!existing) {
      return errorResponse('Resource not found', 404)
    }

    if (existing.user_id !== user.id) {
      return errorResponse('Forbidden', 403)
    }

    // 4. Delete resource
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return errorResponse('Failed to delete resource', 500)
    }

    // 5. Return success
    return jsonResponse({ data: { id }, success: true })

  } catch (error) {
    console.error('DELETE /api/resource error:', error)
    return errorResponse('Internal server error', 500)
  }
}
