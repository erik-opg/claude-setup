# Project Instructions - GTM Bulk Operations

## CRITICAL: Read This Before Any GTM Work

These instructions are automatically loaded for every session. Follow them strictly.

---

## 🚨 RULE #1: Always Search GTM Variables from Page 1 First

### Background
On 2025-01-21, I made a critical error: I searched for GTM variables starting from page 2, skipping page 1 entirely. This caused me to incorrectly report that variables didn't exist in BE, UK, and DE shops when they were actually on page 1.

### The Rule
**NEVER skip page 1 when searching for GTM variables.**

**Required search protocol:**
1. **Always start from page 1** (not page 2, not page 3)
2. Search sequentially: page 1 → page 2 → page 3 → etc.
3. Use correct pagination: `page: 1, itemsPerPage: 20`
4. Only report "not found" after searching ALL pages
5. Variables named like `cJS - SD - *` are typically on page 1

### When User Says "I Can See It"
If the user says they can see an item in the GTM UI:
- **BELIEVE THEM** - they have direct access
- **RE-SEARCH FROM PAGE 1** immediately
- **DON'T ARGUE** - change strategy
- **ACKNOWLEDGE** the mistake quickly

---

## 🚀 RULE #2: Token Efficiency - Always Query Supabase First

### Overview
Help Erik perform bulk operations in Google Tag Manager using MCP tools efficiently. **Always minimize token usage** by smart ID retrieval from Supabase backup database **before** using GTM tools.

### Core Workflow: Database → Filter → Execute (with Fallback)

**PRIMARY PATH (Token Efficient):**
1. **Query Supabase** to get specific IDs (uses ~20-50 tokens)
2. **Filter results** in database
3. **Execute GTM operations** with specific IDs (efficient)

**FALLBACK PATH (When Not Found in Supabase):**
1. **If Supabase returns no results** → Switch to GTM API search
2. **CRITICAL**: When using GTM API, **ALWAYS start from page 1** (see RULE #1)
3. Search sequentially through pages until found or all pages exhausted
4. Execute GTM operations with found IDs

**Why Fallback is Necessary:**
- Supabase might be out of sync with live GTM
- New variables/tags created recently might not be in backup yet
- User might have made manual changes in GTM UI

**Decision Tree:**
```
Start Task
    ↓
Query Supabase First (20-50 tokens)
    ↓
  Found?
    ↓─YES→ Use IDs, Execute GTM ops (efficient!)
    ↓
   NO
    ↓
Search GTM API from PAGE 1 (RULE #1)
    ↓
Continue until found or all pages checked
    ↓
Execute GTM operations
```

**NEVER:**
- Skip Supabase and go straight to GTM API (wastes tokens)
- Use GTM tools for discovery when Supabase has the data
- Repeat database queries in same session

---

## 📋 Available GTM Containers (OPG Account)

### Country-Specific Shops
- **NL**: Kunststofplatenshop.nl (`GTM-5BFJP5G`, ID: 9329147)
- **DE**: Kunststoffplattenonline.de (`GTM-MX445N5`, ID: 9329149)
- **DE-HPL**: Hplplattenshop.de (`GTM-KSFGL3H`, ID: 9327633)
- **DE-PMMA**: Acrylglasplattenshop.de (`GTM-TGVXNLD`, ID: 9329155)
- **UK**: Plasticsheetsshop.co.uk (`GTM-WJWM255`, ID: 9328073)
- **BE**: Kunststofplaten.be (`GTM-WB7PFTB`, ID: 9327968)
- **BE-FR**: Plaqueplastique.be (`GTM-N2364FW`, ID: 13259779)
- **FR**: Plaqueplastique.fr (`GTM-MM5KQCF`, ID: 13259999)
- **FR-PMMA**: Plexiglasssurmesure.fr (`GTM-N7XKQ7L`, ID: 10375338)
- **AT**: Kunststoffplatten.at (`GTM-57VFD3Z`, ID: 9328048)
- **IT**: Pannelliplastica.it (`GTM-NKZ9QM7`, ID: 57801577)
- **ES**: Planchasdeplastico.es (`GTM-NBGPKB7`, ID: 57802452)
- **PL**: Plytyplastikowe.pl (`GTM-N5Q2VS5`, ID: 99860573)

### Corporate & Server-side
- **OPG Corporate**: Onlineplasticsgroup.com (`GTM-TZXC6BH`, ID: 30653906)
- **OPG Server-side**: Onlineplasticsgroup.com - Serverside (`GTM-5HBP2524`, ID: 219819287)
- **Shops Server-side**: OPG Shops - Serverside (`GTM-TT92MV9W`, ID: 171906003)
- **Test Container**: OPG - MP Test container (`GTM-P6QK5DC4`, ID: 220406758)

### Shop Container ID Array (Use This)
```sql
-- Predefined shop container array for maximum efficiency
WHERE container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
```

---

## ⚡ Ultra Token-Efficient Query Patterns

### Priority 1: Direct Lookup (Most Efficient - ~20 tokens)
```sql
-- BEST: Direct tag/variable/trigger search by exact name
SELECT container_id, id as tag_id, name
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573);
```

```sql
-- Bulk ID retrieval for GTM operations
SELECT container_id, array_agg(id) as tag_ids
FROM tags
WHERE name = 'cHTML - SD - Blogpost'
AND container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
GROUP BY container_id;
```

### Priority 2: Pattern-Based Search (~40 tokens)
```sql
-- Fuzzy search across shop containers
SELECT container_id, id, name
FROM tags
WHERE name ILIKE '%blogpost%'
AND container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
LIMIT 20;
```

### Priority 3: Container-Specific Operations (~30 tokens)
```sql
-- Find all tags of specific type in container
SELECT id, name
FROM tags
WHERE container_id = '9329149'
AND type = 'html'
AND name ILIKE '%tracking%';
```

### Priority 4: Quick Verification (~10 tokens)
```sql
-- Verify tag exists
SELECT COUNT(*) FROM tags WHERE name = 'cHTML - SD - Blogpost';

-- Check container status
SELECT COUNT(*) as tag_count FROM tags WHERE container_id = '9329147';
```

---

## 📊 Database Structure

```
accounts → containers → workspaces
├── tags
├── triggers
├── variables
└── built_in_variables
```

### Legacy Query Patterns (Use only when above methods insufficient)

**1. Find Container IDs First**
```sql
-- By container name
SELECT id, name FROM containers WHERE name = 'Kunststofplatenshop.nl';

-- Multiple containers by pattern
SELECT id, name, public_id FROM containers
WHERE name ILIKE '%kunststof%' OR name ILIKE '%plastic%';

-- By public ID (GTM-XXXXX format)
SELECT id, name FROM containers WHERE public_id = 'GTM-5BFJP5G';
```

**2. Filter GTM Entities**
```sql
-- Variables by name pattern
SELECT id, name, type FROM variables
WHERE container_id = '9328073'
AND name ILIKE '%ga4%';

-- Triggers by type
SELECT id, name, type FROM triggers
WHERE container_id = '9329149'
AND type = 'pageview';
```

---

## ✅ Query Optimization Rules

### DO - Ultra Efficient Patterns (Save 90%+ tokens)
- ✅ **Use hardcoded container IDs**: `WHERE container_id::int IN (...)`
- ✅ **Direct name filtering**: `WHERE name = 'exact tag name'`
- ✅ **SELECT only needed columns**: `SELECT id, name` (not SELECT *)
- ✅ **Use array_agg()** for ID collections
- ✅ **Filter by type** when known: `WHERE type = 'html'`
- ✅ **Limit results**: Add `LIMIT 20` to prevent large responses
- ✅ **Use COUNT(*)** for quick existence checks

### DON'T - Token Wasteful Patterns (Avoid These)
- ❌ Don't SELECT * without WHERE clause
- ❌ Don't use JOINs when direct filtering works
- ❌ Don't fetch `parameters_json` unless absolutely necessary
- ❌ Don't list all containers/tags without filtering
- ❌ Don't use GTM tools for discovery - use Supabase
- ❌ Don't repeat database queries in same session

---

## 📈 Token Usage Comparison

| Method | Tokens Used | Performance | Use Case |
|--------|-------------|-------------|----------|
| Direct name + container IDs | ~20 | ⚡⚡⚡ | Known tag name |
| Container-specific search | ~30 | ⚡⚡⚡ | Single container ops |
| Pattern matching | ~50 | ⚡⚡ | Fuzzy search |
| Legacy JOIN queries | ~150 | ⚡ | Complex relationships |
| Full parameter retrieval | ~500+ | 🐌 | Deep analysis only |

---

## 🎯 Recommended Workflow for Maximum Efficiency

1. **Step 1**: Use direct name lookup with container ID array (~20 tokens)
2. **Step 2**: If no results, try pattern matching with LIMIT (~40 tokens)
3. **Step 3**: Only then use legacy container name queries (~150 tokens)
4. **Step 4**: Execute GTM operations with specific IDs
5. **Step 5**: Quick verification with COUNT queries (~10 tokens)

---

## 🔧 GTM Workspace Selection

Priority order when selecting workspaces:
1. "SD update workspace" (if exists)
2. "Default Workspace" (fallback)
3. Verify workspace exists before searching variables

---

## 🛡️ Error Recovery Protocol

When things go wrong:
1. **STOP** - don't continue with flawed approach
2. **READ user feedback** - they're giving you the answer
3. **RESET** - start from page 1, basic search
4. **UPDATE** this file if it's a new mistake pattern

---

## 📝 GTM Search Best Practices

### For Variables (When Using GTM Tools)
```
1. List workspaces for container
2. Select appropriate workspace
3. Search variables from page 1 ← CRITICAL
4. Check name patterns: "cJS - SD - *", "cHTML - SD - *"
5. Continue through pages sequentially
6. Only report "not found" after all pages checked
```

### Pagination Handling
- `currentPage`: Track where you are
- `totalPages`: Know total available pages
- `hasNextPage`: Check if more pages exist
- `itemsPerPage`: Standard is 20

### Common Patterns
- Structured Data variables: Often on page 1
- Custom JavaScript (type: `jsm`): Check early pages first
- Recently modified: Typically on earlier pages

---

## 🚦 Pre-Flight Checklists

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

---

## 📚 Example Workflows

### Bulk Tag Update (Token Optimized)
1. **Quick Check**: `SELECT COUNT(*) FROM tags WHERE name = 'cHTML - SD - Blogpost';`
2. **Get IDs**: `SELECT container_id, id FROM tags WHERE name = 'cHTML - SD - Blogpost' AND container_id::int IN (...);`
3. **GTM Operation**: Use returned IDs with GTM tools
4. **Verify**: Quick count check

**Token Usage**: ~30 tokens (vs 500+ with old method)

### Cross-Container Variable Search (with Fallback)
**Step 1 - Try Supabase First:**
```sql
SELECT container_id, id, name, fingerprint
FROM variables
WHERE name = 'cJS - SD - dateModified'
AND container_id::int IN (9329147,9329149,...);
```

**Step 2 - Evaluate Results:**
- ✅ **If found (14 results)**: Use IDs directly, execute GTM updates (~4,000 tokens total)
- ❌ **If not found (0 results)**: Proceed to Step 3

**Step 3 - Fallback to GTM API Search:**
- For each container, search GTM API **starting from page 1** (RULE #1)
- Search sequentially: page 1 → page 2 → page 3, etc.
- Collect IDs as found
- Execute GTM updates with collected IDs (~137,000 tokens total)

**Key Point**: Even when falling back to GTM API, you SAVE tokens by trying Supabase first (20 tokens vs immediate 137K tokens)

---

## 📋 Mistake Log Protocol

When you make a mistake with GTM operations:
1. Update this file immediately
2. Add a new RULE # with date
3. Explain what happened and why
4. Provide prevention steps
5. Add warning signs to watch for

---

**Last Updated**: 2025-01-21
**Critical Mistakes Documented**: 1 (Page 1 search skip)
**Auto-loaded**: Yes (via .claude/instructions.md)
**Token Optimization**: Active (Supabase-first workflow)
