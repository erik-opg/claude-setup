# GTM Query Patterns Reference

SQL patterns for Supabase GTM backup database. Use these for token-efficient operations.

## Shop Container ID Array

```sql
-- Use this array for all shop queries
WHERE container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
```

## Priority 1: Direct Lookup (~20 tokens)

```sql
-- Exact name search
SELECT container_id, id as tag_id, name
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573);

-- Bulk ID retrieval
SELECT container_id, array_agg(id) as tag_ids
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
GROUP BY container_id;
```

## Priority 2: Pattern Search (~40 tokens)

```sql
-- Fuzzy search
SELECT container_id, id, name
FROM tags
WHERE name ILIKE '%blogpost%'
AND container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
LIMIT 20;
```

## Priority 3: Container-Specific (~30 tokens)

```sql
-- Single container by type
SELECT id, name
FROM tags
WHERE container_id = '9329149'
AND type = 'html'
AND name ILIKE '%tracking%';
```

## Priority 4: Quick Verification (~10 tokens)

```sql
-- Existence check
SELECT COUNT(*) FROM tags WHERE name = 'cHTML - SD - Blogpost';

-- Container status
SELECT COUNT(*) as tag_count FROM tags WHERE container_id = '9329147';
```

## Legacy Patterns (Use sparingly)

```sql
-- Find container by name
SELECT id, name FROM containers WHERE name = 'Kunststofplatenshop.nl';

-- Find by public ID
SELECT id, name FROM containers WHERE public_id = 'GTM-5BFJP5G';

-- Variables by pattern
SELECT id, name, type FROM variables
WHERE container_id = '9328073'
AND name ILIKE '%ga4%';

-- Triggers by type
SELECT id, name, type FROM triggers
WHERE container_id = '9329149'
AND type = 'pageview';
```

## Database Structure

```
accounts → containers → workspaces
├── tags
├── triggers
├── variables
└── built_in_variables
```

## Token Usage Comparison

| Method | Tokens | Use Case |
|--------|--------|----------|
| Direct name + IDs | ~20 | Known tag name |
| Container-specific | ~30 | Single container |
| Pattern matching | ~50 | Fuzzy search |
| Legacy JOINs | ~150 | Complex queries |
| Full parameters | ~500+ | Deep analysis |
