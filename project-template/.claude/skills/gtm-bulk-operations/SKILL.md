---
name: gtm-bulk-operations
description: |
  Efficiently manage Google Tag Manager bulk operations across 13 OPG shop containers
  with Supabase-first token optimization. Handles variable/tag/trigger searches, updates,
  and workspace publishing. Auto-activates for GTM edits, container queries, publishing
  requests, cross-shop synchronization, GTM variable searches, tag updates.
allowed-tools:
  - mcp__gomarble__*
  - mcp__supabase-gtm__*
  - mcp__bigquery__execute_sql
  - Read
  - Write
  - Glob
  - Grep
---

# GTM Bulk Operations Skill

You are specialized in performing efficient Google Tag Manager operations across
the OPG account (ID: 3505761902) with 13 shop containers.

## Core Principles

1. **Supabase First**: Always query Supabase backup database before GTM API
2. **Token Efficiency**: Use direct lookups with hardcoded container arrays
3. **Page 1 Protocol**: NEVER skip page 1 when searching GTM variables (RULE #1)
4. **Parallel Execution**: Batch operations across containers in single message

## Shop Container Mapping

```sql
-- Hardcoded container IDs for maximum efficiency
WHERE container_id::int IN (
  9329147,  -- NL: Kunststofplatenshop.nl (GTM-5BFJP5G)
  9329149,  -- DE: Kunststoffplattenonline.de (GTM-MX445N5)
  9327633,  -- DE-HPL: Hplplattenshop.de (GTM-KSFGL3H)
  9329155,  -- DE-PMMA: Acrylglasplattenshop.de (GTM-TGVXNLD)
  9328073,  -- UK: Plasticsheetsshop.co.uk (GTM-WJWM255)
  9327968,  -- BE: Kunststofplaten.be (GTM-WB7PFTB)
  13259779, -- BE-FR: Plaqueplastique.be (GTM-N2364FW)
  13259999, -- FR: Plaqueplastique.fr (GTM-MM5KQCF)
  10375338, -- FR-PMMA: Plexiglasssurmesure.fr (GTM-N7XKQ7L)
  9328048,  -- AT: Kunststoffplatten.at (GTM-57VFD3Z)
  57801577, -- IT: Pannelliplastica.it (GTM-NKZ9QM7)
  57802452, -- ES: Planchasdeplastico.es (GTM-NBGPKB7)
  99860573  -- PL: Plytyplastikowe.pl (GTM-N5Q2VS5)
)
```

## Optimized Workflows

### Variable/Tag/Trigger Search

**PRIMARY PATH: Supabase Direct Lookup** (~20 tokens)
```sql
SELECT container_id, id, name
FROM variables  -- or tags, triggers
WHERE name = 'exact-variable-name'
AND container_id::int IN (9329147, 9329149, ...);
```

**FALLBACK PATH: GTM API Search** (When not found in Supabase)
1. Search GTM API **starting from PAGE 1** (CRITICAL - RULE #1)
2. Sequential pagination: page 1 → page 2 → page 3
3. **NEVER assume item doesn't exist until ALL pages checked**
4. If user says "I can see it" - BELIEVE THEM, re-search from page 1

**RULE #1 Context (Never Forget This)**:
On 2025-01-21, I made a critical error: I searched for GTM variables starting from page 2,
skipping page 1 entirely. This caused me to incorrectly report that variables didn't exist
when they were actually on page 1. Variables named like `cJS - SD - *` are typically on page 1.

**Step 3: Execute Operations**
- Use specific IDs from Step 1 or 2
- Batch updates in parallel when possible

### Publishing Workflow (Optimized)

**Account ID**: `3505761902` (hardcoded, never query)

**When user says**: "publish all workspaces" / "publish all containers" / "make it live"

1. **Parallel Publish** (single message, all 13 containers)
   - Make 13 `gtm_version(action="publish")` calls
   - Expect token errors - **IGNORE THEM** (cosmetic only, publishes succeed)
   - Error "MCP tool response exceeds maximum allowed tokens" = SUCCESS

2. **Minimal Verification** (only 1 container)
   - Check NL container (9329147) as sanity check
   - Verify containerVersionId matches
   - Done - saves 85% tokens vs verifying all 13

**Token Cost**: ~3,500 tokens (vs 22,000 old way)

## Query Optimization Patterns

**Priority 1: Direct Lookup** (~20 tokens)
```sql
SELECT container_id, id, name
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (...);
```

**Priority 2: Pattern Search** (~40 tokens)
```sql
SELECT container_id, id, name
FROM variables
WHERE name ILIKE '%structured-data%'
AND container_id::int IN (...)
LIMIT 20;
```

**Priority 3: Quick Verification** (~10 tokens)
```sql
SELECT COUNT(*) FROM triggers WHERE name = 'pageview-trigger';
```

**Priority 4: Batch ID Collection**
```sql
SELECT container_id, array_agg(id) as tag_ids
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (...)
GROUP BY container_id;
```

## Error Recovery Protocol

When GTM operations fail:
1. **STOP** - don't continue with flawed approach
2. **READ user feedback** - they have GTM UI access
3. **RESET** - start from page 1, basic search
4. **BELIEVE user** if they say "I can see it" - re-search immediately from page 1
5. **DON'T ARGUE** - change strategy

## Pre-Flight Checklist

Before ANY GTM operation:
- [ ] Queried Supabase database first?
- [ ] Used efficient query pattern (direct preferred)?
- [ ] Limited results to necessary data only?
- [ ] Have specific IDs ready for GTM tools?

Before ANY GTM variable search:
- [ ] Starting from page 1? (not page 2+)
- [ ] Using sequential pagination?
- [ ] Ready to adjust if user corrects?
- [ ] Will search ALL pages before saying "not found"?

## Token Usage Reference

| Method | Tokens | Performance | Use Case |
|--------|--------|-------------|----------|
| Direct name + container IDs | ~20 | ⚡⚡⚡ | Known name |
| Container-specific | ~30 | ⚡⚡⚡ | Single container |
| Pattern matching | ~50 | ⚡⚡ | Fuzzy search |
| GTM API fallback | ~500-137K | 🐌 | Not in Supabase |

Always aim for ~20-50 token range by using Supabase first.

## Publishing Error Dictionary

| Error Message | Meaning | Action |
|---------------|---------|--------|
| "Workspace is already submitted" | Version already created | Skip to publish step |
| "MCP tool response exceeds..." | Response too big (publish **succeeded**) | Ignore, continue |
| "Version not found" | Wrong version number | Check version headers first |

## Workspace Selection Priority

When selecting workspaces:
1. "SD update workspace" (if exists)
2. "Default Workspace" (fallback)
3. Verify workspace exists before searching variables
