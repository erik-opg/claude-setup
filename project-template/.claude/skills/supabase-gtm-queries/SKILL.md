---
name: supabase-gtm-queries
description: |
  Execute optimized Supabase queries for GTM backup database with token-efficient patterns.
  Handles tag/variable/trigger lookups, container mappings, and verification queries.
  Part of the GTM bulk operations workflow. Triggers: GTM database, container lookup,
  Supabase GTM, backup verification.
allowed-tools:
  - mcp__supabase-gtm__execute_sql
  - mcp__supabase-gtm__list_tables
  - Read
---

# Supabase GTM Query Skill

Optimized database queries for GTM backup with token efficiency.

## Database Schema

```
accounts → containers → workspaces
├── tags
├── triggers
├── variables
└── built_in_variables
```

## Token-Efficient Query Patterns

### Priority 1: Direct Lookup (~20 tokens)
```sql
SELECT container_id, id, name
FROM variables
WHERE name = 'exact-variable-name'
AND container_id::int IN (9329147, 9329149, ...);
```

### Priority 2: Pattern Search (~40 tokens)
```sql
SELECT container_id, id, name
FROM tags
WHERE name ILIKE '%pattern%'
AND container_id::int IN (...)
LIMIT 20;
```

### Priority 3: Quick Verification (~10 tokens)
```sql
SELECT COUNT(*) FROM triggers WHERE name = 'trigger-name';
```

## Always Use Container ID Array

Never query without container filter - use the 13 shop container IDs.

## Batch ID Collection

```sql
SELECT container_id, array_agg(id) as tag_ids
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (...)
GROUP BY container_id;
```

Returns IDs ready for GTM API calls.
