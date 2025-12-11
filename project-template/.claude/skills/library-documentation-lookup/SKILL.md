---
name: library-documentation-lookup
description: |
  Retrieve up-to-date documentation for libraries using Context7. Automatically resolves
  library names to IDs and fetches relevant docs with examples. Triggers: documentation,
  library docs, how to use, API reference, check docs, library help.
allowed-tools:
  - mcp__plugin_edmunds-claude-code_context7__resolve-library-id
  - mcp__plugin_edmunds-claude-code_context7__get-library-docs
  - mcp__context7__resolve-library-id
  - mcp__context7__get-library-docs
---

# Library Documentation Lookup Skill

Quick access to up-to-date library documentation and code examples.

## Workflow

1. **Resolve library ID** (unless user provides `/org/project` format)
2. **Fetch focused documentation** with topic parameter
3. **Present examples** relevant to user's question
4. **Cite version** if multiple available

## Common Libraries (Shortcuts)

- Next.js: `/vercel/next.js`
- React: `/facebook/react`
- Supabase: `/supabase/supabase`
- TailwindCSS: `/tailwindlabs/tailwindcss`
- TypeScript: `/microsoft/TypeScript`
- Zod: `/colinhacks/zod`

## Token Optimization

Use `topic` parameter for focused docs:
- "routing" for Next.js navigation
- "hooks" for React state management
- "auth" for Supabase authentication
- Default tokens: 5000 (increase for complex topics)

## Example Usage

User: "How do I use Supabase RLS?"
→ resolve-library-id("supabase")
→ get-library-docs("/supabase/supabase", topic="rls")
→ Present RLS examples and patterns
