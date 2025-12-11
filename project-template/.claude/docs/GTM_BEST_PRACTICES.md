# GTM Best Practices & Workflows

## GTM Search Best Practices

### For Variables (When Using GTM Tools)
1. List workspaces for container
2. Select appropriate workspace
3. **Search variables from page 1** (CRITICAL)
4. Check name patterns: "cJS - SD - *", "cHTML - SD - *"
5. Continue through pages sequentially
6. Only report "not found" after all pages checked

### Pagination Handling
- `currentPage`: Track where you are
- `totalPages`: Know total available pages
- `hasNextPage`: Check if more pages exist
- `itemsPerPage`: Standard is 20

### Common Patterns
- Structured Data variables: Often on page 1
- Custom JavaScript (type: `jsm`): Check early pages first
- Recently modified: Typically on earlier pages

## Pre-Flight Checklists

### Before ANY GTM Operation:
- [ ] Queried Supabase database first for IDs?
- [ ] Used efficient query pattern (direct lookup preferred)?
- [ ] Limited results to necessary data only?
- [ ] Have specific IDs ready for GTM tools?

### Before ANY GTM Variable Search:
- [ ] Starting from page 1? (not page 2+)
- [ ] Using sequential page search?
- [ ] Listening to user feedback?
- [ ] Ready to adjust if user says "it's there"?
- [ ] Will search ALL pages before saying "not found"?

## Example Workflows

### Bulk Tag Update (Token Optimized)
1. **Quick Check**: `SELECT COUNT(*) FROM tags WHERE name = '...';`
2. **Get IDs**: `SELECT container_id, id FROM tags WHERE name = '...' AND container_id::int IN (...);`
3. **GTM Operation**: Use returned IDs with GTM tools
4. **Verify**: Quick count check

**Token Usage**: ~30 tokens (vs 500+ with old method)

### Cross-Container Variable Search (with Fallback)

**Step 1 - Try Supabase First:**
```sql
SELECT container_id, id, name, fingerprint
FROM variables
WHERE name = 'cJS - SD - dateModified'
AND container_id::int IN (...);
```

**Step 2 - Evaluate Results:**
- **If found**: Use IDs directly (~4,000 tokens total)
- **If not found**: Proceed to GTM API fallback

**Step 3 - Fallback to GTM API:**
- Search GTM API **starting from page 1**
- Search sequentially: page 1 → page 2 → page 3
- Collect IDs as found
- Execute GTM updates

## GTM Workspace Selection

Priority order:
1. "SD update workspace" (if exists)
2. "Default Workspace" (fallback)
3. Verify workspace exists before searching

## Error Recovery Protocol

When things go wrong:
1. **STOP** - don't continue with flawed approach
2. **READ user feedback** - they're giving you the answer
3. **RESET** - start from page 1, basic search
4. **UPDATE** CLAUDE.md if it's a new mistake pattern

## Mistake Log Protocol

When you make a mistake:
1. Update CLAUDE.md immediately
2. Add a new RULE # with date
3. Explain what happened and why
4. Provide prevention steps
5. Add warning signs to watch for
