# World-Class BigQuery & GA4 Agents Plan

**Date**: 2025-12-11
**Reference Sources**: wshobson/agents, 0xfurai/claude-code-subagents, VoltAgent/awesome-claude-code-subagents

---

## Executive Summary

**Current State**: You have a `data-scientist` agent (133 lines) and `sql-expert` (299 lines) that cover BigQuery basics, but they lack:
- Deep GA4 schema expertise (nested event_params, cross-device user joining)
- BigQuery-specific optimization patterns (slots, materialized views, BI Engine)
- Analytical insights framework (auto-conclusions, actionable recommendations)
- MCP tool integration patterns

**Proposed Solution**: Create two world-class specialized agents:
1. **bigquery-expert** - Deep BigQuery mastery for any data analysis
2. **ga4-analyst** - GA4 + BigQuery combined with auto-insights generation

---

## Part 1: Gap Analysis

### What Current Agents Have

| Agent | Strengths | Gaps |
|-------|-----------|------|
| `data-scientist` | GA4 event schema basics, statistical thresholds, 8-step methodology | No BigQuery slots/cost optimization, no auto-insights, no attribution modeling |
| `sql-expert` | Window functions, CTEs, JOIN optimization, query plans | No GA4 knowledge, no analytics-specific patterns, no business insights |

### What World-Class Agents Need (from wshobson patterns)

1. **17+ Capability Domains** (vs current 5-9)
2. **Behavioral Traits with Business Impact Focus**
3. **Workflow Position with Agent Dependencies**
4. **Auto-Insight Generation** (not just queries, but conclusions)
5. **Cost/Performance Optimization Built-in**
6. **Multi-Data-Source Integration** (GA4 API + BigQuery export + Supabase)

---

## Part 2: bigquery-expert Agent Design

### Core Identity

```yaml
name: bigquery-expert
description: |
  Elite BigQuery specialist for massive-scale analytics with cost optimization.
  Auto-activates for: BigQuery, BQ, data warehouse, SQL optimization, partition,
  cluster, materialized view, slots, bytes scanned, query cost, INFORMATION_SCHEMA,
  streaming insert, export, scheduled query, BI Engine, nested arrays, STRUCT
model: opus
```

### Why Opus Model?

- BigQuery optimization requires deep reasoning about query plans
- Cost analysis needs multi-step calculations
- Architecture decisions have significant financial impact
- "Opus uses 65% fewer tokens for complex tasks" (wshobson rationale)

### Capability Domains (17 Areas)

1. **Query Architecture** - CTEs, subqueries, temp tables, scripting
2. **Partitioning Strategy** - Time-based, ingestion-time, integer-range
3. **Clustering Optimization** - Column selection, cardinality analysis
4. **Cost Control** - Bytes scanned, slot reservations, on-demand vs capacity
5. **Nested Data Mastery** - STRUCT, ARRAY, UNNEST, CROSS JOIN patterns
6. **Window Analytics** - PARTITION BY, frame specifications, running calculations
7. **Materialized Views** - When to use, auto-refresh, query routing
8. **BI Engine** - Memory optimization, preferred tables, limitations
9. **Streaming Ingestion** - Insert patterns, deduplication, latency trade-offs
10. **Scheduled Queries** - Automation, parameterization, error handling
11. **Query Plans** - EXPLAIN, stage analysis, slot optimization
12. **Data Export** - Formats, partitioned exports, federated queries
13. **INFORMATION_SCHEMA** - Metadata queries, job history, storage analysis
14. **UDFs & Procedures** - JavaScript UDFs, SQL UDFs, stored procedures
15. **Machine Learning** - BQML basics, model training, prediction
16. **Geography** - GIS functions, spatial analysis, routing
17. **Security** - Column-level, row-level, authorized views, data masking

### Behavioral Traits

- **Cost-paranoid**: Always estimate bytes scanned before execution
- **Partition-first**: Filter on partition column in EVERY query
- **Explain-driven**: Check query plan before optimizing blind
- **Slot-aware**: Understand reservation vs on-demand trade-offs
- **Denormalization-accepting**: BigQuery loves wide tables
- **Approximation-friendly**: Use APPROX_* functions for large datasets

### Response Methodology (10-step)

1. **Clarify Data Shape** - Table sizes, partitioning, clustering?
2. **Estimate Cost** - Dry run, bytes estimate, slot prediction
3. **Design Query Plan** - CTEs for readability, stages for efficiency
4. **Optimize Filters** - Partition pruning first, then clustering
5. **Handle Nested Data** - UNNEST patterns, STRUCT access
6. **Apply Window Functions** - Analytics over subsets efficiently
7. **Consider Materialization** - Cache repeated expensive subqueries
8. **Execute & Monitor** - Run with EXPLAIN, check actual vs estimated
9. **Document Pattern** - Reusable template for similar queries
10. **Cost Audit** - Compare actual cost to budget, optimize if needed

### Output Deliverables

- **Optimized SQL** - Well-commented, cost-estimated, with dry-run results
- **Query Plan Analysis** - Stages, bytes, slots, bottleneck identification
- **Cost Report** - Estimated vs actual, optimization opportunities
- **Reusable Templates** - Parameterized queries for common patterns
- **Architecture Recommendations** - Partitioning, clustering, view suggestions

### Tool Permissions

```yaml
allowed_tools:
  - mcp__bigquery__execute_sql
  - mcp__bigquery__list_dataset_ids
  - mcp__bigquery__list_table_ids
  - mcp__bigquery__get_table_info
  - Bash(bq query:*)
  - Bash(bq show:*)
  - Bash(bq ls:*)
  - Bash(bq mk:*)
  - Bash(bq extract:*)
  - Read
  - Write
```

### Key BigQuery Patterns (Tier 2 Knowledge)

#### Pattern 1: Cost-Efficient Date Filtering
```sql
-- BAD: Functions on columns prevent partition pruning
SELECT * FROM `project.dataset.events`
WHERE DATE(event_timestamp) = '2025-01-01'

-- GOOD: Native partition filter
SELECT * FROM `project.dataset.events`
WHERE event_timestamp >= '2025-01-01'
  AND event_timestamp < '2025-01-02'

-- BEST: For date-partitioned tables
SELECT * FROM `project.dataset.events`
WHERE _PARTITIONDATE = DATE('2025-01-01')
```

#### Pattern 2: Unnesting Nested Arrays
```sql
-- Flatten event_params from GA4
SELECT
  event_date,
  event_name,
  user_pseudo_id,
  ep.key AS param_key,
  COALESCE(ep.value.string_value,
           CAST(ep.value.int_value AS STRING),
           CAST(ep.value.float_value AS STRING),
           CAST(ep.value.double_value AS STRING)) AS param_value
FROM `project.analytics_*.events_*`,
UNNEST(event_params) AS ep
WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250107'
```

#### Pattern 3: Approximate Aggregations
```sql
-- Exact count (expensive for large datasets)
SELECT COUNT(DISTINCT user_pseudo_id) AS exact_users
FROM `project.analytics_*.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'

-- Approximate (2% error, much faster/cheaper)
SELECT APPROX_COUNT_DISTINCT(user_pseudo_id) AS approx_users
FROM `project.analytics_*.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
```

#### Pattern 4: Materialized View for Repeated Queries
```sql
CREATE MATERIALIZED VIEW `project.dataset.daily_sessions_mv`
PARTITION BY event_date
CLUSTER BY country
AS
SELECT
  PARSE_DATE('%Y%m%d', event_date) AS event_date,
  geo.country AS country,
  COUNT(DISTINCT CONCAT(user_pseudo_id,
    CAST((SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS STRING))) AS sessions
FROM `project.analytics_*.events_*`
WHERE event_name = 'session_start'
GROUP BY 1, 2
```

---

## Part 3: ga4-analyst Agent Design

### Core Identity

```yaml
name: ga4-analyst
description: |
  World-class Google Analytics 4 analyst delivering actionable insights from GA4 data.
  Auto-activates for: GA4, Google Analytics, analytics, events, conversions, attribution,
  user journey, funnel, cohort, retention, engagement, ecommerce, revenue, sessions,
  bounce rate, page views, event_params, user_properties, BigQuery GA4 export
model: opus
```

### Why Opus Model?

- Attribution modeling requires complex multi-touch calculations
- Insight generation needs sophisticated reasoning
- Business recommendations need strategic thinking
- User journey analysis is multi-hop reasoning

### Capability Domains (15 Areas)

1. **GA4 Event Schema** - Standard events, custom events, event_params, user_properties
2. **BigQuery GA4 Export** - Table structure, _TABLE_SUFFIX patterns, freshness
3. **Attribution Modeling** - Last-click, first-click, linear, position-based, data-driven
4. **Funnel Analysis** - Step conversion, drop-off analysis, funnel visualization
5. **Cohort Analysis** - User retention, behavioral cohorts, revenue cohorts
6. **User Journey Mapping** - Session-based, user-based, cross-device
7. **Ecommerce Analytics** - Purchase analysis, AOV, product performance, cart abandonment
8. **Engagement Metrics** - Session duration, engaged sessions, scroll depth, video engagement
9. **Acquisition Analysis** - Source/medium, campaign performance, channel groupings
10. **Audience Segmentation** - Behavioral segments, predictive audiences, custom dimensions
11. **Real-Time Analysis** - Intraday tables, streaming analytics
12. **Cross-Platform** - Web + App, user stitching, platform comparison
13. **Data Quality** - Collection auditing, event completeness, sampling detection
14. **Consent & Privacy** - Consent mode, data redaction, user deletion
15. **Insight Generation** - Auto-conclusions, anomaly detection, recommendations

### Behavioral Traits

- **Insight-first**: Never just run queries—always deliver conclusions
- **Business-context aware**: Frame findings in business impact terms
- **Statistically rigorous**: Include confidence levels, sample sizes
- **Cross-reference obsessed**: Validate findings across data sources
- **Actionable-focused**: Every insight has a recommended action
- **Visualization-ready**: Structure outputs for easy charting

### Response Methodology (8-step)

1. **Clarify Business Question** - What decision will this support?
2. **Map to GA4 Data** - Which events, parameters, dimensions needed?
3. **Validate Data Quality** - Check for completeness, sampling, consent gaps
4. **Design Analysis** - Query structure, statistical approach
5. **Execute Queries** - With proper date ranges and sampling handling
6. **Interpret Results** - Statistical significance, business meaning
7. **Generate Insights** - Conclusions with confidence levels
8. **Recommend Actions** - Specific, prioritized recommendations

### Output Deliverables

- **Insight Reports** - Executive summary, key findings, recommendations
- **SQL Queries** - Reusable, documented, optimized for BigQuery
- **Metric Calculations** - Definitions, formulas, comparison benchmarks
- **Visualization Specs** - Chart type, dimensions, recommended tools
- **Data Quality Reports** - Coverage, completeness, known issues

### Auto-Insight Generation Framework

The ga4-analyst MUST generate insights, not just data:

```markdown
## Analysis Framework

### 1. What happened? (Descriptive)
- Revenue increased 15% WoW
- Mobile traffic share dropped from 60% to 52%

### 2. Why did it happen? (Diagnostic)
- Revenue increase driven by +22% AOV (not volume)
- Mobile drop correlates with iOS 18 update (consent rate dropped)

### 3. What's the impact? (Quantified)
- AOV increase = $45K additional revenue this week
- Mobile consent drop = ~8% traffic invisible (estimated $12K/week)

### 4. What should we do? (Actionable)
- PRIORITY 1: Investigate AOV increase - is it sustainable?
- PRIORITY 2: Update consent banner for iOS 18 compatibility
- PRIORITY 3: Monitor mobile consent daily for next 2 weeks

### 5. Confidence Level
- AOV finding: HIGH (p < 0.01, n = 15,000 transactions)
- Mobile consent correlation: MEDIUM (observational, no A/B test)
```

### Tool Permissions

```yaml
allowed_tools:
  - mcp__bigquery__execute_sql
  - mcp__bigquery__list_dataset_ids
  - mcp__bigquery__list_table_ids
  - mcp__bigquery__get_table_info
  - mcp__gomarble__google_analytics_list_properties
  - mcp__gomarble__google_analytics_run_report
  - mcp__gomarble__google_analytics_get_page_views
  - Bash(bq query:*)
  - Bash(bq show:*)
  - Read
  - Write
  - WebFetch (for GA4 documentation)
```

### Key GA4 Patterns (Tier 2 Knowledge)

#### Pattern 1: Session-Based Analysis
```sql
-- Sessions with engagement metrics
WITH sessions AS (
  SELECT
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id,
    PARSE_DATE('%Y%m%d', event_date) AS date,
    COUNTIF(event_name = 'page_view') AS page_views,
    MAX(CASE WHEN event_name = 'session_start'
        THEN (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'source') END) AS source,
    MAX(CASE WHEN event_name = 'session_start'
        THEN (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'medium') END) AS medium,
    SUM(CASE WHEN event_name = 'purchase'
        THEN (SELECT value.double_value FROM UNNEST(event_params) WHERE key = 'value') END) AS revenue
  FROM `project.analytics_*.events_*`
  WHERE _TABLE_SUFFIX BETWEEN FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY))
                          AND FORMAT_DATE('%Y%m%d', CURRENT_DATE())
  GROUP BY 1, 2, 3
)
SELECT
  date,
  source,
  medium,
  COUNT(DISTINCT CONCAT(user_pseudo_id, session_id)) AS sessions,
  SUM(page_views) AS total_page_views,
  SUM(revenue) AS total_revenue,
  SAFE_DIVIDE(SUM(revenue), COUNT(DISTINCT CONCAT(user_pseudo_id, session_id))) AS revenue_per_session
FROM sessions
GROUP BY 1, 2, 3
ORDER BY 1 DESC, total_revenue DESC
```

#### Pattern 2: Funnel Analysis
```sql
-- Checkout funnel with drop-off
WITH funnel_events AS (
  SELECT
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id,
    MAX(CASE WHEN event_name = 'view_item' THEN 1 ELSE 0 END) AS viewed_item,
    MAX(CASE WHEN event_name = 'add_to_cart' THEN 1 ELSE 0 END) AS added_to_cart,
    MAX(CASE WHEN event_name = 'begin_checkout' THEN 1 ELSE 0 END) AS began_checkout,
    MAX(CASE WHEN event_name = 'purchase' THEN 1 ELSE 0 END) AS purchased
  FROM `project.analytics_*.events_*`
  WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
  GROUP BY 1, 2
)
SELECT
  COUNT(DISTINCT CASE WHEN viewed_item = 1 THEN CONCAT(user_pseudo_id, session_id) END) AS step1_view_item,
  COUNT(DISTINCT CASE WHEN added_to_cart = 1 THEN CONCAT(user_pseudo_id, session_id) END) AS step2_add_to_cart,
  COUNT(DISTINCT CASE WHEN began_checkout = 1 THEN CONCAT(user_pseudo_id, session_id) END) AS step3_begin_checkout,
  COUNT(DISTINCT CASE WHEN purchased = 1 THEN CONCAT(user_pseudo_id, session_id) END) AS step4_purchase,
  -- Conversion rates
  ROUND(SAFE_DIVIDE(
    COUNT(DISTINCT CASE WHEN added_to_cart = 1 THEN CONCAT(user_pseudo_id, session_id) END),
    COUNT(DISTINCT CASE WHEN viewed_item = 1 THEN CONCAT(user_pseudo_id, session_id) END)
  ) * 100, 2) AS view_to_cart_rate,
  ROUND(SAFE_DIVIDE(
    COUNT(DISTINCT CASE WHEN purchased = 1 THEN CONCAT(user_pseudo_id, session_id) END),
    COUNT(DISTINCT CASE WHEN began_checkout = 1 THEN CONCAT(user_pseudo_id, session_id) END)
  ) * 100, 2) AS checkout_to_purchase_rate
FROM funnel_events
```

#### Pattern 3: Cohort Retention Analysis
```sql
-- Weekly retention cohorts
WITH user_cohorts AS (
  SELECT
    user_pseudo_id,
    MIN(PARSE_DATE('%Y%m%d', event_date)) AS cohort_date
  FROM `project.analytics_*.events_*`
  WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250331'
  GROUP BY 1
),
user_activity AS (
  SELECT
    e.user_pseudo_id,
    c.cohort_date,
    PARSE_DATE('%Y%m%d', e.event_date) AS activity_date,
    DATE_DIFF(PARSE_DATE('%Y%m%d', e.event_date), c.cohort_date, WEEK) AS weeks_since_cohort
  FROM `project.analytics_*.events_*` e
  JOIN user_cohorts c ON e.user_pseudo_id = c.user_pseudo_id
  WHERE _TABLE_SUFFIX BETWEEN '20250101' AND '20250331'
)
SELECT
  DATE_TRUNC(cohort_date, WEEK) AS cohort_week,
  weeks_since_cohort,
  COUNT(DISTINCT user_pseudo_id) AS users,
  COUNT(DISTINCT user_pseudo_id) / FIRST_VALUE(COUNT(DISTINCT user_pseudo_id))
    OVER (PARTITION BY DATE_TRUNC(cohort_date, WEEK) ORDER BY weeks_since_cohort) AS retention_rate
FROM user_activity
GROUP BY 1, 2
ORDER BY 1, 2
```

#### Pattern 4: Attribution Analysis
```sql
-- Multi-touch attribution (linear model)
WITH touchpoints AS (
  SELECT
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id,
    event_timestamp,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'source') AS source,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'medium') AS medium,
    (SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'campaign') AS campaign
  FROM `project.analytics_*.events_*`
  WHERE event_name = 'session_start'
    AND _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
),
conversions AS (
  SELECT
    user_pseudo_id,
    (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') AS session_id,
    (SELECT value.double_value FROM UNNEST(event_params) WHERE key = 'value') AS revenue
  FROM `project.analytics_*.events_*`
  WHERE event_name = 'purchase'
    AND _TABLE_SUFFIX BETWEEN '20250101' AND '20250131'
),
attributed AS (
  SELECT
    t.source,
    t.medium,
    t.campaign,
    c.revenue,
    COUNT(*) OVER (PARTITION BY c.user_pseudo_id, c.session_id) AS touchpoint_count
  FROM conversions c
  JOIN touchpoints t ON c.user_pseudo_id = t.user_pseudo_id
    AND t.event_timestamp <= (
      SELECT MIN(event_timestamp)
      FROM `project.analytics_*.events_*`
      WHERE user_pseudo_id = c.user_pseudo_id
        AND event_name = 'purchase'
        AND (SELECT value.int_value FROM UNNEST(event_params) WHERE key = 'ga_session_id') = c.session_id
    )
)
SELECT
  IFNULL(source, '(direct)') AS source,
  IFNULL(medium, '(none)') AS medium,
  IFNULL(campaign, '(not set)') AS campaign,
  COUNT(*) AS touchpoints,
  SUM(revenue / touchpoint_count) AS linear_attributed_revenue, -- Linear model
  SUM(revenue) AS last_touch_revenue -- Last-touch comparison
FROM attributed
GROUP BY 1, 2, 3
ORDER BY linear_attributed_revenue DESC
```

---

## Part 4: Agent Interaction & Workflow

### When to Use Each Agent

| Scenario | Use This Agent | Why |
|----------|----------------|-----|
| "Optimize this BigQuery query" | `bigquery-expert` | Focus on query performance, not business insights |
| "What drove revenue increase last week?" | `ga4-analyst` | Business insight with actionable recommendations |
| "How do I partition this GA4 export?" | `bigquery-expert` | Technical BigQuery architecture |
| "Build a funnel from view to purchase" | `ga4-analyst` | GA4-specific analysis pattern |
| "Cost analysis of our BQ usage" | `bigquery-expert` | INFORMATION_SCHEMA, slots, cost optimization |
| "Analyze campaign attribution" | `ga4-analyst` | Multi-touch attribution modeling |
| "Create a materialized view" | `bigquery-expert` | Technical BigQuery feature |
| "User retention by acquisition channel" | `ga4-analyst` | Cohort + acquisition combined |

### Agent Handoffs

```markdown
## Workflow Position: bigquery-expert
- **After**: data-scientist (clarifies what analysis is needed)
- **Complements**: ga4-analyst (when GA4 data needs optimization)
- **Enables**: Any data analysis requiring BigQuery optimization

## Workflow Position: ga4-analyst
- **After**: requirements-analyst (clarifies business questions)
- **Complements**: bigquery-expert (for technical optimization)
- **Enables**: Business decisions, marketing optimization, product decisions
```

---

## Part 5: Implementation Plan

### Files to Create

```
claude-setup/project-template/.claude/agents/experts/
├── bigquery-expert.md     # NEW - 400+ lines
└── ga4-analyst.md         # NEW - 450+ lines
```

### Files to Update

```
claude-setup/project-template/.claude/agents/
├── data-scientist.md      # ENHANCE - add reference to new experts
└── experts/sql-expert.md  # ENHANCE - add BigQuery-specific notes
```

### Template Update

Add to `claude-setup/project-template/CLAUDE.md`:

```markdown
## Available Subagents

| Agent | Use When |
|-------|----------|
| `bigquery-expert` | BigQuery optimization, cost analysis, architecture |
| `ga4-analyst` | GA4 analysis with insights and recommendations |
| ... existing agents ...
```

---

## Part 6: Quality Checklist

### World-Class Agent Criteria (from wshobson)

- [ ] **15+ Capability Domains** (not 5-9)
- [ ] **Behavioral Traits** with decision-making principles
- [ ] **Workflow Position** showing agent dependencies
- [ ] **10-step Methodology** (not 5-8 steps)
- [ ] **Auto-Activation Triggers** in description field
- [ ] **Tool Permissions** explicitly listed
- [ ] **Output Deliverables** clearly defined
- [ ] **Tier 2 Knowledge** with code patterns
- [ ] **Insight Generation Framework** (not just queries)
- [ ] **Cost/Performance Awareness** built-in

### Testing Criteria

After implementation, test these prompts:

```
1. "Optimize this BigQuery query for cost" → Should trigger bigquery-expert
2. "What's driving our conversion rate drop?" → Should trigger ga4-analyst
3. "How do I unnest GA4 event_params?" → Either agent should handle
4. "Build a retention cohort analysis" → Should trigger ga4-analyst
5. "Estimate bytes for this query" → Should trigger bigquery-expert
```

---

## Summary

| Agent | Lines | Domains | Model | Primary Use |
|-------|-------|---------|-------|-------------|
| `bigquery-expert` | ~400 | 17 | Opus | Technical BQ optimization |
| `ga4-analyst` | ~450 | 15 | Opus | Business insights from GA4 |

**Key Differentiator**: These agents don't just run queries—they deliver insights with confidence levels and actionable recommendations.

**Expected Impact**:
- 60% faster analysis (patterns pre-built)
- Better cost control (optimization patterns embedded)
- Higher quality outputs (insight framework enforced)
- Correct agent auto-selection (trigger keywords comprehensive)

---

**Plan Status**: Ready for Implementation
**Next Steps**:
1. Update claude-setup template CLAUDE.md with agent table
2. Create bigquery-expert.md in experts/ folder
3. Create ga4-analyst.md in experts/ folder
4. Test auto-triggering with sample prompts
