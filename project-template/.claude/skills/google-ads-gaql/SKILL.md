---
name: google-ads-gaql
description: |
  Execute efficient Google Ads GAQL queries with correct field names and token optimization.
  Handles campaign analysis, shopping performance, creative extraction, and ROAS calculations.
  Triggers: Google Ads, GAQL query, campaign metrics, ad performance, shopping feed, ROAS.
allowed-tools:
  - mcp__gomarble__google_ads_run_gaql
  - mcp__gomarble__google_ads_get_currency
  - mcp__gomarble__google_ads_list_accounts
  - mcp__gomarble__google_ads_get_change_logs
  - Read
  - Write
---

# Google Ads GAQL Query Skill

Specialized skill for Google Ads queries using GAQL (Google Ads Query Language).

## Tier 1: Core Concepts (Always Loaded)

### Critical Rules
1. **customer_id as STRING** (even though it looks like a number)
2. **Include campaign.id** when querying ad_group, keyword_view, etc.
3. **LIMIT 200 max** to prevent token waste
4. **Use LIKE '%x%'** not CONTAINS (not supported)
5. **Get currency FIRST** before reporting costs

### Workflow
```
1. google_ads_get_currency() → Get currency code
2. google_ads_run_gaql() → Execute query with LIMIT 200
3. Convert micros → cost_micros / 1,000,000
4. Calculate ROAS → conversions_value / cost
```

### Revenue Metrics
- `metrics.conversions_value` = Direct revenue (primary for ROI)
- `metrics.cost_micros` = Cost in micros (divide by 1M)
- ROAS = conversions_value / (cost_micros / 1,000,000)

### Campaign Types
```sql
WHERE campaign.advertising_channel_type = 'SEARCH'      -- Search
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX' -- PMax
WHERE campaign.advertising_channel_type = 'SHOPPING'    -- Shopping
WHERE campaign.advertising_channel_type = 'VIDEO'       -- YouTube
WHERE campaign.advertising_channel_type = 'DEMAND_GEN'  -- Demand Gen
```

### Common Field Errors

| Wrong | Correct |
|-------|---------|
| `campaign.campaign_budget.amount_micros` | Query `campaign_budget` resource |
| `keyword.text` | `ad_group_criterion.keyword.text` |
| `shopping_performance_view.product_title` | `segments.product_title` |

## Tier 2: Patterns & Techniques (Loaded on Activation)

### Campaign Performance with ROAS
```sql
SELECT
  campaign.id, campaign.name, campaign.status,
  metrics.impressions, metrics.clicks, metrics.cost_micros,
  metrics.conversions, metrics.conversions_value
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200
```

### Search Keywords
```sql
SELECT
  campaign.id, campaign.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  metrics.impressions, metrics.clicks, metrics.conversions
FROM keyword_view
WHERE campaign.advertising_channel_type = 'SEARCH'
  AND segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 0
ORDER BY metrics.impressions DESC
LIMIT 200
```

### PMax Product Performance
```sql
SELECT
  campaign.id, campaign.name,
  segments.product_title, segments.product_item_id,
  metrics.clicks, metrics.cost_micros, metrics.conversions_value
FROM shopping_performance_view
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 0
ORDER BY metrics.cost_micros DESC
LIMIT 200
```

### Managed Accounts
```typescript
// Check if managed account
const accounts = await google_ads_list_accounts()
// If access_type='managed', use parent_id as manager_id
google_ads_run_gaql({
  customer_id: "3270365362",
  manager_id: "5594273470", // parent_id
  query: "..."
})
```

### Date Ranges
- `DURING LAST_7_DAYS` / `LAST_30_DAYS` / `LAST_90_DAYS`
- `DURING THIS_MONTH` / `LAST_MONTH`
- `BETWEEN '2024-01-01' AND '2024-01-31'`

## Tier 3: Resources (Load on Demand)

For detailed implementations, load these resources:

- **references/field-reference.md** - Complete field names for all resources
- **references/campaign-types.md** - Deep dive on each campaign type query patterns
- **references/revenue-attribution.md** - Conversion tracking, attribution models
- **references/error-recovery.md** - Common errors and solutions
- **assets/query-templates.sql** - Copy-paste query templates for all use cases
