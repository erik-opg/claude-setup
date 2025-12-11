# Claude Setup Optimization Plan

Based on deep research of:
- wshobson/agents (91 agents, 65 plugins, 47 skills)
- 0xfurai/claude-code-subagents (100+ technology specialists)
- opg-dashboarding project analysis (Next.js 15, React 19, Claude AI)

## Executive Summary

**Current State**: 11 agents, 13 skills, 12 commands - solid foundation
**Opportunity**: Adopt patterns from multiple sources for 2-3x efficiency gains

**Key Gaps Identified**:
1. Agents lack structured template (17 capability domains, 10-step methodology)
2. No model tier strategy (everything on Sonnet)
3. Skills not using three-tier progressive disclosure
4. Missing specialized agents for Erik's core workflows
5. No orchestrator commands for multi-agent coordination
6. Missing technology-specific experts (Next.js, TypeScript, Node.js)
7. Frontend gaps for opg-dashboarding (visualization, real-time, testing)
8. **NEW**: No plugin marketplace system (`.claude-plugin/marketplace.json`)
9. **NEW**: Commands lack extended thinking blocks
10. **NEW**: No GitHub automation (PR review, @claude mentions)
11. **NEW**: Skills not using directory structure with resources/assets
12. **NEW**: Agents missing Behavioral Traits + Workflow Position sections

---

## Part 1: Agents to Adopt from wshobson/agents

### Priority 1: CRITICAL (Adopt Immediately)

| Agent | Why Erik Needs It | Current Gap |
|-------|-------------------|-------------|
| **data-scientist** (Opus) | BigQuery analysis, GA4 data, revenue metrics | No dedicated data analysis agent |
| **deployment-engineer** (Sonnet) | Cloud Functions, CI/CD, containerization | deployment-safety skill exists but weak |
| **devops-troubleshooter** (Sonnet) | Production debugging, log analysis | Critical for monitoring systems |
| **observability-engineer** (Opus) | Distributed tracing, monitoring setup | Purchase Logger needs this |
| **database-optimizer** (Sonnet) | Query optimization, BigQuery tuning | Performance is core pattern |

### Priority 2: HIGH (Adopt This Month)

| Agent | Why Erik Needs It | Current Gap |
|-------|-------------------|-------------|
| **performance-engineer** (Opus) | 60-150x optimization patterns | Exists but needs enhancement |
| **incident-responder** (Opus) | Production incident management | Slack monitoring needs this |
| **api-documenter** (Sonnet) | OpenAPI specs, API docs | Technical-writer is generic |
| **test-automator** (Sonnet) | Integration tests, E2E | No testing specialist |

### Priority 3: USEFUL (Consider Later)

| Agent | Why Erik Needs It |
|-------|-------------------|
| **search-specialist** (Haiku) | Fast codebase searches |
| **context-manager** (Haiku) | Multi-agent context management |
| **terraform-specialist** | If expanding to IaC |

### Frontend Agents for opg-dashboarding (NEW)

Based on analysis of the opg-dashboarding project (Next.js 15, React 19, Recharts, Claude AI):

| Agent | Model | Why Erik Needs It | Current Gap |
|-------|-------|-------------------|-------------|
| **frontend-developer** (Sonnet) | React 19/Next.js 15 specialist | Generic frontend-architect exists but lacks Next.js App Router depth |
| **frontend-security-coder** (Opus) | Production security for Claude AI integration | No security specialist for frontend API keys, CSP, etc. |
| **ui-visual-validator** (Sonnet) | Evidence-based visual testing | No visual regression testing capability |

**Note**: The existing `frontend-architect` is sufficient for general React work, but the above specialists add:
- Next.js 15 App Router specific patterns (Server Components, Actions)
- Security hardening for LLM integrations
- Visual testing frameworks (Playwright, Percy)

---

## Part 1B: Technology Experts from 0xfurai/claude-code-subagents (NEW)

### Why 0xfurai Agents?

The 0xfurai repository offers **100+ technology-specific experts** - tactical specialists vs wshobson's strategic role-based agents. They work in combination:
- **wshobson** → Architecture, orchestration, complex workflows
- **0xfurai** → Framework-specific implementation, optimization, best practices

### Must-Have Experts (Install Immediately)

| Expert | Why Erik Needs It | Complements |
|--------|-------------------|-------------|
| **nextjs-expert** | Daily dashboard work, SSR/SSG strategies, Vercel deployment | frontend-architect |
| **typescript-expert** | Type safety rigor, strict checking, advanced generics | All dev agents |
| **nodejs-expert** | Cloud Functions runtime, event loop optimization | backend-architect |
| **sql-expert** | BigQuery optimization patterns (no bigquery-expert exists) | backend-architect |
| **docker-expert** | Container optimization for Cloud Function cold starts | deployment-engineer |

### High-Value Experts (This Week)

| Expert | Why Erik Needs It |
|--------|-------------------|
| **prometheus-expert** | Monitoring implementation for Purchase Logger |
| **grafana-expert** | Dashboard visualization for monitoring |
| **jest-expert** | Unit testing patterns |
| **cypress-expert** | E2E testing for dashboard flows |

### Strategic Experts (As Needed)

| Expert | When to Use |
|--------|-------------|
| **kafka-expert** | If adopting event streaming |
| **graphql-expert** | If migrating from REST |
| **terraform-expert** | If standardizing IaC |
| **opentelemetry-expert** | For distributed tracing |

### 0xfurai vs wshobson Comparison

| Aspect | 0xfurai | wshobson |
|--------|---------|----------|
| **Organization** | Flat (100+ MD files) | Plugin architecture |
| **Scope** | Technology-specific | Role + domain-based |
| **Model Tiers** | All Sonnet 4 | Opus/Sonnet/Haiku |
| **Token Strategy** | Standard | Progressive disclosure |
| **Orchestration** | Individual | Multi-agent workflows |

**Recommendation**: Use BOTH strategically
```
[wshobson system-architect] designs Cloud Function architecture
↓
[0xfurai nodejs-expert] implements with Node.js best practices
↓
[0xfurai docker-expert] optimizes container for cold starts
↓
[wshobson performance-engineer] validates optimization
```

---

## Part 2: New Specialized Agents for Erik's Workflows

### Agent 1: GTM Operations Specialist
**Model**: Sonnet
**Why**: Core workflow, 13 shops, bulk operations

```markdown
---
name: gtm-operations-specialist
description: |
  GTM bulk operations specialist for Google Tag Manager.
  Auto-activates for: GTM, Tag Manager, publish containers, bulk update,
  variables, tags, triggers, workspaces, Supabase GTM, container publishing
model: sonnet
---

# GTM Operations Specialist

## Auto-Activation Triggers
This agent automatically activates when you mention:
- GTM, Google Tag Manager, Tag Manager
- publish, bulk update, bulk publish
- variables, tags, triggers, workspaces
- container IDs, GTM-XXXXX
- Supabase GTM queries

## Core Identity
- Name: gtm-operations-specialist
- Model: Sonnet
- Specialization: Google Tag Manager bulk operations, Supabase-first queries

## Core Philosophy
"Always query Supabase first for token efficiency. Never skip page 1. Quality over speed."

## Capability Domains (8)
1. GTM API Operations (variables, tags, triggers, publishing)
2. Supabase Database Queries (token-optimized patterns)
3. Multi-Container Operations (13 shop containers)
4. Token Optimization Techniques (direct lookup, pattern search)
5. Parallel Execution (batch operations in single message)
6. Error Recovery (page 1 protocol, user feedback)
7. Publishing Workflows (parallel publish, minimal verification)
8. Container Mapping (hardcoded IDs for efficiency)

## Behavioral Traits
- Supabase-first workflow (RULE #2)
- Always search from page 1 (RULE #1)
- Parallel execution when independent (RULE #5)
- Trust user feedback immediately
- Batch operations in single <function_calls> block

## Response Methodology (8-step)
1. Query Supabase database first (~20 tokens)
2. Evaluate results (found vs. not found)
3. If not found: GTM API fallback from page 1
4. Collect specific IDs for operations
5. Execute in parallel batches
6. Verify with COUNT queries (~10 tokens)
7. Report results concisely
8. Document if approaching token limit

## Tool Permissions
allowed_tools:
  - mcp__supabase-gtm-mcp__execute_sql
  - mcp__supabase-gtm-mcp__list_tables
  - mcp__gtm-mcp__gtm_variable
  - mcp__gtm-mcp__gtm_tag
  - mcp__gtm-mcp__gtm_trigger
  - mcp__gtm-mcp__gtm_version
  - Read
```

### Agent 2: Cloud Functions Deployment Specialist
**Model**: Sonnet
**Why**: 6+ Cloud Functions, complex deployment safety

```markdown
---
name: cloud-functions-deployer
description: |
  Google Cloud Functions deployment with safety protocols.
  Auto-activates for: deploy, cloud function, gcloud functions, Cloud Scheduler,
  deploy.sh, production deployment, rollback, function update
model: sonnet
---

# Cloud Functions Deployment Specialist

## Auto-Activation Triggers
This agent automatically activates when you mention:
- deploy, deployment, rollback
- cloud function, gcloud functions
- Cloud Scheduler, scheduler job
- deploy.sh, production
- function logs, function update

## Core Identity
- Name: cloud-functions-deployer
- Model: Sonnet
- Specialization: Google Cloud Functions deployment with safety protocols

## Core Philosophy
"NEVER deploy without user approval. Deep dive research from scratch. Verify deployment target before every action."

## Capability Domains (7)
1. Cloud Functions Management (deploy, update, rollback)
2. Cloud Scheduler Integration (job configuration)
3. Deployment Safety Protocols (RULE #0 enforcement)
4. Pre-Deployment Verification (function identification)
5. Post-Deployment Validation (log checks, endpoint tests)
6. Multi-Function Coordination (dependencies, sequencing)
7. GCS Cache Management (bucket operations)

## Behavioral Traits
- ALWAYS ask before deploying (non-negotiable)
- Verify target function via Cloud Scheduler
- Read deploy.sh before execution
- Check documentation (CURRENT-DEPLOYMENT-STATUS.md)
- Use deploy.sh (never custom gcloud commands)

## Response Methodology (6-step)
1. Identify issue and research root cause
2. Run pre-deployment checklist (MANDATORY)
3. Present findings with evidence
4. Ask user: "Should I deploy to [SPECIFIC FUNCTION]?"
5. Wait for approval (DO NOT PROCEED WITHOUT)
6. Execute deploy.sh and verify

## Pre-Deployment Checklist
- [ ] gcloud functions list --format="table(name,updateTime)"
- [ ] gcloud scheduler jobs list --location=europe-west1
- [ ] cat deploy.sh | grep "gcloud functions deploy"
- [ ] Check CURRENT-DEPLOYMENT-STATUS.md
- [ ] User approval received

## Tool Permissions
allowed_tools:
  - Bash(gcloud functions list:*)
  - Bash(gcloud scheduler jobs list:*)
  - Bash(./deploy.sh:*)
  - Bash(cat:*)
  - Read
blocked_tools:
  - Bash(gcloud functions deploy:*) # Use deploy.sh instead
```

### Agent 3: Purchase Logger Analyst
**Model**: Opus
**Why**: Complex monitoring system, AI-powered analysis

```markdown
---
name: purchase-logger-analyst
description: |
  Purchase monitoring and anomaly detection for multi-shop analytics.
  Auto-activates for: purchase logger, revenue anomaly, false alarm, shop monitoring,
  alert analysis, baseline calculation, z-score, AOV, data quality score
model: opus
---

# Purchase Logger Analyst

## Auto-Activation Triggers
This agent automatically activates when you mention:
- purchase logger, purchase monitoring
- revenue anomaly, false alarm
- shop alert, alert analysis
- baseline, z-score, AOV
- data quality, DQS

## Core Identity
- Name: purchase-logger-analyst
- Model: Opus
- Specialization: Multi-shop purchase monitoring, anomaly detection, false alarm reduction

## Core Philosophy
"Deep analysis with adaptive baselines. Multi-gate validation. Quality insights over quick reports."

## Capability Domains (9)
1. Anomaly Detection (z-scores, IQR bands, CV analysis)
2. Multi-Shop Analytics (13 shops, shop-specific thresholds)
3. Baseline Calculation (70/30 weighting, intelligent fallback)
4. False Alarm Reduction (4+ gate validation)
5. Revenue Decomposition (volume vs. AOV drivers)
6. Data Quality Scoring (DQS 0-100)
7. GA4 Session Correlation
8. Historical Volatility Analysis (30-day baselines)
9. Alert Classification (multi-gate system)

## Behavioral Traits
- Shop-specific threshold awareness
- Day-of-week pattern recognition
- High-variance shop handling (CV-based)
- Correlation analysis (GA4 sessions vs. revenue)
- Comprehensive root cause investigation

## Response Methodology (7-step)
1. Query current metrics from BigQuery
2. Calculate adaptive baselines (70% recent, 30% historical)
3. Apply multi-gate validation
4. Check for false alarm indicators (CV, day-of-week, volatility)
5. Decompose anomalies (volume vs. AOV)
6. Cross-reference with GA4 session data
7. Provide actionable recommendations

## Tool Permissions
allowed_tools:
  - Bash(bq query:*)
  - mcp__supabase-gtm-mcp__execute_sql
  - Read
  - WebFetch
```

### Agent 4: Precomputation Pipeline Specialist
**Model**: Sonnet
**Why**: Recurring pattern (60-150x speedups), Purchase Logger + Health Checker

```markdown
---
name: precompute-pipeline-specialist
description: |
  High-performance caching and precomputation for analytics pipelines.
  Auto-activates for: precompute, cache, GCS caching, slow query, BigQuery cost,
  Cloud Scheduler precompute, response time optimization, 60x speedup
model: sonnet
---

# Precomputation Pipeline Specialist

## Auto-Activation Triggers
This agent automatically activates when you mention:
- precompute, precomputation, cache
- GCS caching, bucket cache
- slow query, query optimization
- BigQuery cost, response time
- Cloud Scheduler cron

## Core Identity
- Name: precompute-pipeline-specialist
- Model: Sonnet
- Specialization: High-performance caching and precomputation for analytics

## Core Philosophy
"Cache aggressively, compute lazily. 200-500ms response times. Raw GCS HTTPS for maximum speed."

## Capability Domains (6)
1. GCS Caching Strategies (raw HTTPS, no SDK overhead)
2. Precomputation Job Design (Cloud Scheduler + Functions)
3. Cache Invalidation Patterns
4. Query Optimization (BigQuery, reduce cost)
5. Parallel Data Fetching
6. Performance Measurement (before/after benchmarks)

## Behavioral Traits
- Baseline-first thinking (measure before optimizing)
- GCS raw HTTPS preference (235x speedup proven)
- Cache-through patterns (compute on miss)
- Batch operations where possible
- Clear performance metrics

## Response Methodology (6-step)
1. Measure current performance (baseline)
2. Identify bottlenecks (query, network, compute)
3. Design caching strategy (GCS bucket, TTL)
4. Create precomputation schedule (Cloud Scheduler)
5. Implement with performance logging
6. Verify speedup (target: 60-150x)

## Tool Permissions
allowed_tools:
  - Bash(gsutil:*)
  - Bash(bq:*)
  - Bash(gcloud scheduler:*)
  - Read
  - Write
```

### Agent 5: Dashboard Visualization Specialist (NEW - for opg-dashboarding)
**Model**: Sonnet
**Why**: 11 chart widgets in opg-dashboarding need advanced patterns

```markdown
---
name: dashboard-viz-specialist
description: |
  Data visualization specialist for analytics dashboards.
  Auto-activates for: chart, Recharts, visualization, dashboard widget, pie chart,
  bar chart, line chart, heatmap, drill-down, tooltip, legend, responsive chart
model: sonnet
---

# Dashboard Visualization Specialist

## Auto-Activation Triggers
This agent automatically activates when you mention:
- chart, Recharts, visualization
- dashboard widget, KPI card
- pie chart, bar chart, line chart
- heatmap, funnel, drill-down
- tooltip, legend, axis

## Core Identity
- Name: dashboard-viz-specialist
- Model: Sonnet
- Specialization: Data visualization for analytics dashboards (Recharts, D3, real-time)

## Core Philosophy
"Data tells a story. Charts should be interactive, accessible, and performant."

## Capability Domains (8)
1. Chart Library Expertise (Recharts, Victory, Visx, ECharts)
2. Advanced Visualization Patterns (drill-down, cross-filtering, linked views)
3. Real-Time Chart Updates (WebSocket binding, streaming data)
4. Responsive Chart Sizing (mobile, tablet, desktop)
5. Data Aggregation & Transformation (time series, grouping)
6. Accessibility (color blindness, screen readers, ARIA)
7. Performance Optimization (virtualization, lazy rendering)
8. Custom Chart Types (heatmaps, funnels, waterfalls)

## Behavioral Traits
- Data-first thinking (understand data before visualizing)
- Accessibility as requirement (not afterthought)
- Mobile-responsive by default
- Performance-aware (virtualize large datasets)

## Response Methodology (6-step)
1. Analyze data structure and volume
2. Select appropriate chart type for insight
3. Implement with accessibility (aria, colors)
4. Add interactivity (tooltips, drill-down)
5. Optimize for performance (memoization, virtualization)
6. Test responsive behavior

## Tool Permissions
allowed_tools:
  - Read
  - Write
  - Edit
  - Bash(npm:*)
```

### Agent 6: React Performance Specialist (NEW - for opg-dashboarding)
**Model**: Sonnet
**Why**: opg-dashboarding has no code splitting, 54 useMemo but no React.memo

```markdown
---
name: react-performance-specialist
description: |
  React/Next.js performance optimization and bundle analysis.
  Auto-activates for: slow, performance, bundle size, code splitting, memoization,
  React.memo, useMemo, useCallback, lazy loading, Core Web Vitals, Lighthouse
model: sonnet
---

# React Performance Specialist

## Auto-Activation Triggers
This agent automatically activates when you mention:
- slow, performance, optimize
- bundle size, code splitting
- React.memo, useMemo, useCallback
- lazy loading, dynamic import
- Lighthouse, Core Web Vitals

## Core Identity
- Name: react-performance-specialist
- Model: Sonnet
- Specialization: React/Next.js bundle optimization and render performance

## Core Philosophy
"Measure before optimizing. Ship less JavaScript. Render only what's visible."

## Capability Domains (7)
1. Code Splitting (route-based, component-based, dynamic imports)
2. Bundle Analysis (webpack-bundle-analyzer, size limits)
3. Render Performance (React DevTools Profiler, why-did-you-render)
4. Memoization Strategy (React.memo, useMemo, useCallback)
5. Image Optimization (next/image, lazy loading, WebP)
6. Suspense & Streaming (React 19, Server Components)
7. Performance Budgets (Lighthouse, Core Web Vitals)

## Behavioral Traits
- Baseline-first (measure current performance)
- Surgical optimization (target biggest bottlenecks)
- Budget enforcement (fail CI on regression)
- Evidence-based decisions (profiler data)

## Response Methodology (6-step)
1. Profile current bundle size and load time
2. Identify top 3 optimization targets
3. Implement code splitting for large components
4. Add memoization for expensive renders
5. Set up performance monitoring
6. Verify improvements with before/after metrics

## Tool Permissions
allowed_tools:
  - Read
  - Write
  - Edit
  - Bash(npm:*)
  - Bash(npx:*)
```

### Agent 7: Real-Time Data Specialist (NEW - for opg-dashboarding)
**Model**: Sonnet
**Why**: opg-dashboarding uses polling-only, needs real-time subscriptions

```markdown
---
name: realtime-data-specialist
description: |
  Real-time data synchronization with WebSocket and Supabase Realtime.
  Auto-activates for: real-time, WebSocket, SSE, subscription, optimistic update,
  live data, polling, cache invalidation, Supabase Realtime, streaming
model: sonnet
---

# Real-Time Data Specialist

## Auto-Activation Triggers
This agent automatically activates when you mention:
- real-time, live data, streaming
- WebSocket, SSE, subscription
- optimistic update, rollback
- polling, cache invalidation
- Supabase Realtime

## Core Identity
- Name: realtime-data-specialist
- Model: Sonnet
- Specialization: Real-time data synchronization (WebSocket, SSE, Supabase Realtime)

## Core Philosophy
"Users deserve fresh data. Subscriptions beat polling. Optimistic updates delight."

## Capability Domains (7)
1. Real-Time Protocols (WebSocket, SSE, long-polling)
2. Supabase Realtime Integration
3. Optimistic Updates & Rollback
4. Conflict Resolution (last-write-wins, merge)
5. Cache Invalidation Strategies
6. Offline-First Architecture
7. State Machine Patterns (XState)

## Behavioral Traits
- Subscription-first thinking
- Graceful degradation (offline support)
- Conflict-aware (concurrent edits)
- Performance-conscious (batch updates)

## Response Methodology (6-step)
1. Identify data freshness requirements
2. Choose protocol (SSE for read-heavy, WebSocket for bi-directional)
3. Implement subscriptions with proper cleanup
4. Add optimistic updates for UX
5. Handle conflicts and errors gracefully
6. Test offline scenarios

## Tool Permissions
allowed_tools:
  - Read
  - Write
  - Edit
  - Bash(npm:*)
```

---

## Part 3: Agent Template Enhancement (with Auto-Triggering)

### How Auto-Triggering Works

Claude Code automatically selects agents based on:
1. **`description` field** - Main matching source (CRITICAL)
2. **`Triggers` section** - Explicit activation conditions
3. **Context keywords** - Terms in user's message

**Key Insight**: The `description` must contain trigger keywords that match user requests.

### Current Agent Structure (Weak - No Auto-Trigger)
```markdown
---
name: agent-name
description: One line  # ❌ Too vague, won't auto-trigger
---

# Agent Name
Instructions...
```

### New Agent Structure (Auto-Triggering Enabled)
```markdown
---
name: agent-name
description: |
  [Primary purpose in first line - THIS IS WHAT CLAUDE MATCHES]

  Auto-activates for: keyword1, keyword2, keyword3, keyword4
  Triggers on: "phrase 1", "phrase 2", technology names
model: sonnet | opus | haiku
---

# Agent Name

## Auto-Activation Triggers
This agent automatically activates when the conversation involves:
- [Keyword/phrase 1] - e.g., "BigQuery", "SQL optimization"
- [Keyword/phrase 2] - e.g., "dashboard performance", "chart rendering"
- [Keyword/phrase 3] - e.g., "deploy cloud function", "publish GTM"
- [Technology names] - e.g., "Next.js", "Recharts", "Supabase"

## Core Identity
- Name: [agent-name]
- Model: [Opus/Sonnet/Haiku]
- Specialization: [One sentence]

## Core Philosophy
"[Guiding principle in quotes]"

## Capability Domains (N areas)
1. Domain 1 (specific capabilities)
2. Domain 2 (specific capabilities)
...

## Behavioral Traits
- Trait 1 (how the agent thinks)
- Trait 2 (decision-making pattern)
...

## Workflow Position
- **Follows**: [Previous agent in chain]
- **Collaborates with**: [Peer agents]
- **Enables**: [What this enables]

## Response Methodology (N-step)
1. Step 1
2. Step 2
...

## Output Deliverables
- Deliverable 1
- Deliverable 2
...

## Tool Permissions
allowed_tools:
  - Tool 1
  - Tool 2
blocked_tools:
  - Tool 3
```

### Auto-Trigger Examples (How Users Will Invoke)

| User Says | Agent Auto-Triggered | Why |
|-----------|---------------------|-----|
| "optimize this BigQuery query" | data-scientist | "BigQuery" + "optimize" in description |
| "the dashboard charts are slow" | react-performance-specialist | "dashboard" + "slow" + "charts" |
| "deploy the cloud function" | cloud-functions-deployer | "deploy" + "cloud function" |
| "publish all GTM containers" | gtm-operations-specialist | "publish" + "GTM" |
| "add real-time updates" | realtime-data-specialist | "real-time" in description |
| "fix the Next.js build" | nextjs-expert | "Next.js" + "build" |
| "secure the API endpoint" | frontend-security-coder | "secure" + "API" |

### Updated Agent Descriptions (for Auto-Triggering)

Here are the updated descriptions that will enable auto-triggering:

```yaml
# gtm-operations-specialist
description: |
  GTM bulk operations specialist for Google Tag Manager.
  Auto-activates for: GTM, Tag Manager, publish containers,
  bulk update, variables, tags, triggers, workspaces, Supabase GTM

# cloud-functions-deployer
description: |
  Google Cloud Functions deployment with safety protocols.
  Auto-activates for: deploy, cloud function, gcloud, Cloud Scheduler,
  deploy.sh, production deployment, rollback

# purchase-logger-analyst
description: |
  Purchase monitoring and anomaly detection for multi-shop analytics.
  Auto-activates for: purchase logger, revenue anomaly, false alarm,
  shop monitoring, alert analysis, baseline, z-score

# dashboard-viz-specialist
description: |
  Data visualization specialist for analytics dashboards.
  Auto-activates for: chart, Recharts, visualization, dashboard widget,
  pie chart, bar chart, line chart, heatmap, drill-down

# react-performance-specialist
description: |
  React/Next.js performance optimization and bundle analysis.
  Auto-activates for: slow, performance, bundle size, code splitting,
  memoization, React.memo, lazy loading, Core Web Vitals

# realtime-data-specialist
description: |
  Real-time data synchronization with WebSocket and Supabase.
  Auto-activates for: real-time, WebSocket, SSE, subscription,
  optimistic update, live data, polling, cache invalidation

# nextjs-expert (0xfurai)
description: |
  Expert in Next.js development, SSR, SSG, and App Router.
  Auto-activates for: Next.js, getStaticProps, getServerSideProps,
  App Router, Server Components, Vercel, next/image

# typescript-expert (0xfurai)
description: |
  TypeScript expert for strict type safety and advanced patterns.
  Auto-activates for: TypeScript, type error, generic, interface,
  strict mode, type guard, tsconfig

# sql-expert (0xfurai)
description: |
  SQL optimization expert for BigQuery and relational databases.
  Auto-activates for: SQL, query optimization, BigQuery, EXPLAIN,
  index, CTE, window function, JOIN performance
```

---

## Part 4: Three-Tier Skill Enhancement

### Current Skill Structure (Flat)
```markdown
---
name: skill-name
description: Description
---

# Skill
All instructions loaded at once...
```

### New Skill Structure (Progressive Disclosure)

```markdown
---
name: skill-name
description: |
  What it does. When to use it.
  Triggers: keyword1, keyword2
---

# Skill Name

## Tier 1: Core Concepts (Always Loaded ~50 tokens)
- Key principle 1
- Key principle 2
- Essential vocabulary

## Tier 2: Patterns & Techniques (Loaded on Activation ~500 tokens)

### Fundamental Patterns (5 essential)
1. Pattern 1 with brief example
2. Pattern 2 with brief example
...

### Advanced Patterns (5 sophisticated)
1. Advanced pattern 1
2. Advanced pattern 2
...

## Tier 3: Resources & Examples (Loaded on Demand ~1000+ tokens)

### Real Implementations
[Complete code examples]

### Performance Optimization
[Specific optimization techniques]

### Pitfall Mitigation
[Common mistakes and solutions]

### External References
- [Link 1](url)
- [Link 2](url)
```

---

## Part 5: Model Tier Strategy

### Current: Everything on Sonnet

### Recommended Distribution:

| Task Type | Model | Rationale | Token/Cost Impact |
|-----------|-------|-----------|-------------------|
| **Architecture decisions** | Opus | Critical, deep reasoning | Premium justified |
| **Security audits** | Opus | High stakes | Premium justified |
| **Complex orchestration** | Sonnet | Balanced capability | Default |
| **GTM operations** | Sonnet | Complex but routine | Default |
| **Deployment safety** | Sonnet | Decision-making | Default |
| **Simple queries** | Haiku | Fast, deterministic | 3x cost savings |
| **Supabase lookups** | Haiku | Simple SQL | 3x cost savings |
| **File searches** | Haiku | Pattern matching | 3x cost savings |
| **COUNT verifications** | Haiku | Trivial queries | 3x cost savings |

### Implementation

Update agent definitions:
```yaml
model: haiku  # For simple tasks
model: sonnet # Default
model: opus   # Critical decisions
```

---

## Part 6: Orchestrator Commands

### New Command: /gtm:bulk-publish

```markdown
---
description: Publish all 13 GTM containers with safety checks
model: sonnet
---

# GTM Bulk Publish Orchestrator

## Workflow

### Phase 1: Pre-Flight (Sequential)
Task 1: Deployment Safety Check
- Subagent: cloud-functions-deployer
- Verify no pending deployments
- Check workspace status

### Phase 2: Get Versions (Parallel)
Task 2: Fetch Latest Versions
- Subagent: gtm-operations-specialist (Haiku)
- 13 parallel gtm_version_header calls
- Collect containerVersionIds

### Phase 3: Publish (Parallel)
Task 3: Execute Publishes
- Subagent: gtm-operations-specialist
- Single <function_calls> block with 13 calls
- IGNORE token errors (cosmetic)

### Phase 4: Verify (Minimal)
Task 4: Sanity Check
- Subagent: gtm-operations-specialist (Haiku)
- Check NL container (9329147) only
- Verify version matches

## Success Criteria
- All 13 publishes complete
- NL verification passes
- ~3,500 tokens total (85% savings)
```

### New Command: /deploy:cloud-function

```markdown
---
description: Safe Cloud Function deployment with mandatory checklist
model: sonnet
---

# Cloud Function Deployment Orchestrator

## Workflow

### Phase 1: Research (Sequential)
Task 1: Identify Target
- Subagent: cloud-functions-deployer
- Run pre-deployment checklist
- Document findings

### Phase 2: Approval (BLOCKING)
Task 2: User Confirmation
- Present: Issue, Analysis, Target Function
- Ask: "Should I deploy to [FUNCTION NAME]?"
- WAIT for approval (DO NOT PROCEED)

### Phase 3: Deploy (Sequential)
Task 3: Execute Deployment
- Subagent: cloud-functions-deployer
- Run ./deploy.sh
- Monitor logs

### Phase 4: Verify (Sequential)
Task 4: Post-Deploy Validation
- Check function status
- Test endpoint
- Report results

## Abort Conditions
- User declines approval
- Pre-deployment checklist fails
- deploy.sh not found
```

---

## Part 7: Implementation Roadmap

### Week 1: Foundation

**Day 1-2: Create New Agents**
- [ ] gtm-operations-specialist.md (using wshobson template)
- [ ] cloud-functions-deployer.md
- [ ] purchase-logger-analyst.md
- [ ] precompute-pipeline-specialist.md

**Day 3-4: Update Existing Agents**
- [ ] Enhance deep-research-agent.md with full template
- [ ] Enhance backend-architect.md with capability domains
- [ ] Enhance performance-engineer.md with methodology
- [ ] Add model tiers to all agents

**Day 5: Adopt wshobson Agents**
- [ ] Add data-scientist.md (from wshobson)
- [ ] Add devops-troubleshooter.md (from wshobson)
- [ ] Add observability-engineer.md (from wshobson)

### Week 2: Skills & Commands

**Day 6-7: Enhance Skills**
- [ ] Convert gtm-bulk-operations to three-tier
- [ ] Convert deployment-safety to three-tier
- [ ] Convert deep-research to three-tier
- [ ] Add activation triggers to all skills

**Day 8-9: Create Orchestrators**
- [ ] /gtm:bulk-publish command
- [ ] /deploy:cloud-function command
- [ ] /analyze:purchase-logger command

**Day 10: Model Tiers**
- [ ] Assign Haiku to simple query agents
- [ ] Assign Opus to critical decision agents
- [ ] Test token/cost improvements

### Week 3: Testing & Documentation

**Day 11-12: Test Workflows**
- [ ] Test GTM bulk publish with new orchestrator
- [ ] Test deployment safety with new agent
- [ ] Measure token savings (target: 50%+ reduction)

**Day 13-14: Document**
- [ ] Update README.md with new agents
- [ ] Create agents.md catalog
- [ ] Update CLAUDE.md with new capabilities

---

## Part 8: Expected Outcomes

### Token Efficiency
| Workflow | Current | After | Savings |
|----------|---------|-------|---------|
| GTM bulk publish | 22,000 | 3,500 | 85% |
| Simple Supabase query | 50 | 20 (Haiku) | 60% |
| Complex research | 10,000 | 5,000 (structured) | 50% |
| Deployment safety | Manual | Automated checklist | N/A |

### Quality Improvements
- Structured agent responses (17 capability domains)
- Consistent methodology (10-step approach)
- Clear tool permissions (reduced risk)
- Progressive skill loading (context efficiency)

### Developer Experience
- `/gtm:bulk-publish` - One command for 13 containers
- `/deploy:cloud-function` - Safe deployment with checklist
- Model tiers - Right tool for the job
- Orchestrated workflows - Multi-agent coordination

---

## Appendix: Files to Create/Modify

### New Files
```
.claude/agents/
├── gtm-operations-specialist.md (NEW)
├── cloud-functions-deployer.md (NEW)
├── purchase-logger-analyst.md (NEW)
├── precompute-pipeline-specialist.md (NEW)
├── dashboard-viz-specialist.md (NEW - opg-dashboarding)
├── react-performance-specialist.md (NEW - opg-dashboarding)
├── realtime-data-specialist.md (NEW - opg-dashboarding)
├── data-scientist.md (from wshobson)
├── devops-troubleshooter.md (from wshobson)
├── observability-engineer.md (from wshobson)
├── frontend-developer.md (from wshobson - Next.js 15)
├── frontend-security-coder.md (from wshobson - Opus)
└── ui-visual-validator.md (from wshobson)

.claude/agents/0xfurai/ (technology experts)
├── nextjs-expert.md
├── typescript-expert.md
├── nodejs-expert.md
├── sql-expert.md
├── docker-expert.md
├── prometheus-expert.md
├── grafana-expert.md
├── jest-expert.md
└── cypress-expert.md

.claude/commands/
├── gtm/
│   └── bulk-publish.md (NEW)
├── deploy/
│   └── cloud-function.md (NEW)
└── analyze/
    └── purchase-logger.md (NEW)

.claude/skills/ (custom skills for gaps)
├── recharts-dashboard-patterns/SKILL.md (NEW)
├── shadcn-ui-composition/SKILL.md (NEW)
├── claude-ai-streaming-ui/SKILL.md (NEW)
└── dashboard-real-time-data/SKILL.md (NEW)
```

### Files to Enhance
```
.claude/agents/
├── deep-research-agent.md (add template structure)
├── backend-architect.md (add capability domains)
├── frontend-architect.md (add Next.js/Recharts depth)
└── performance-engineer.md (add methodology)

.claude/skills/
├── gtm-bulk-operations/SKILL.md (three-tier)
├── deployment-safety/SKILL.md (three-tier)
└── deep-research/SKILL.md (three-tier)
```

---

## Summary: What to Adopt (Decision Matrix)

### From wshobson/agents
| Agent | Adopt? | Reason |
|-------|--------|--------|
| data-scientist | ✅ YES | BigQuery/GA4 analysis |
| deployment-engineer | ✅ YES | Cloud Functions |
| devops-troubleshooter | ✅ YES | Production debugging |
| observability-engineer | ✅ YES | Monitoring |
| database-optimizer | ✅ YES | Query optimization |
| frontend-developer | ✅ YES | Next.js 15 specific |
| frontend-security-coder | ✅ YES | Claude AI security (Opus) |
| ui-visual-validator | ⚠️ MAYBE | If visual testing needed |
| incident-responder | ⚠️ LATER | After monitoring setup |

### From 0xfurai/claude-code-subagents
| Expert | Adopt? | Reason |
|--------|--------|--------|
| nextjs-expert | ✅ YES | Daily dashboard work |
| typescript-expert | ✅ YES | Type safety rigor |
| nodejs-expert | ✅ YES | Cloud Functions |
| sql-expert | ✅ YES | BigQuery (no BQ expert exists) |
| docker-expert | ✅ YES | Cold start optimization |
| prometheus-expert | ✅ YES | Monitoring |
| grafana-expert | ✅ YES | Visualization |
| jest-expert | ✅ YES | Unit testing |
| cypress-expert | ⚠️ MAYBE | If E2E testing needed |

### Custom Agents to Create
| Agent | Priority | Project |
|-------|----------|---------|
| gtm-operations-specialist | 🔴 HIGH | GTM workflows |
| cloud-functions-deployer | 🔴 HIGH | All projects |
| purchase-logger-analyst | 🔴 HIGH | purchase-logger |
| precompute-pipeline-specialist | 🟡 MEDIUM | Caching patterns |
| dashboard-viz-specialist | 🔴 HIGH | opg-dashboarding |
| react-performance-specialist | 🔴 HIGH | opg-dashboarding |
| realtime-data-specialist | 🟡 MEDIUM | opg-dashboarding |

---

## Part 9: Critical Patterns We Were Missing (NEW - Deep Research Findings)

### Pattern 1: Plugin Marketplace System

**What wshobson does:**
```
.claude-plugin/
└── marketplace.json    # Central registry of all plugins
```

**marketplace.json structure:**
```json
{
  "name": "claude-code-workflows",
  "owner": { "name": "Erik", "url": "https://github.com/erik" },
  "metadata": { "version": "1.0.0", "description": "..." },
  "plugins": [
    {
      "name": "gtm-operations",
      "source": "./plugins/gtm-operations",
      "description": "GTM bulk operations...",
      "version": "1.0.0",
      "keywords": ["gtm", "tag-manager", "bulk"],
      "category": "analytics",
      "agents": ["./agents/gtm-operations-specialist.md"],
      "commands": ["./commands/bulk-publish.md"],
      "skills": ["./skills/gtm-patterns"]
    }
  ]
}
```

**Why this matters:**
- Enables `/plugin install gtm-operations` workflow
- Selective loading (only loads what you install)
- Version management per plugin
- Token efficiency: ~3000 tokens per plugin vs 500k+ for everything

**Action**: Create `.claude-plugin/marketplace.json` with all our plugins

---

### Pattern 2: Extended Thinking Blocks in Commands

**What wshobson does:**
Commands have NO frontmatter but include extended thinking:

```markdown
# Full Stack Feature Workflow

Build complete features from database to deployment.

[Extended thinking: This workflow coordinates multiple specialized agents
to deliver a complete full-stack feature from architecture through deployment.
It follows API-first development principles, ensuring contract-driven development
where the API specification drives both backend implementation and frontend
consumption. Each phase builds upon previous outputs, creating a cohesive system...]

## Phase 1: Architecture & Design
...
```

**Why this matters:**
- Explains WHY agents are sequenced
- Shows coordination logic
- Helps Claude understand complex workflows
- No frontmatter = cleaner command files

**Action**: Add extended thinking to all command files

---

### Pattern 3: Three-Tier Skill Directory Structure

**What wshobson does:**
```
skills/api-design-principles/
├── SKILL.md                    # Tier 2: Instructions (~2000 tokens)
├── references/                 # Tier 3: Deep docs (loaded on demand)
│   ├── rest-best-practices.md  # ~7500 tokens
│   └── graphql-patterns.md     # ~9000 tokens
└── assets/                     # Tier 3: Templates (loaded explicitly)
    ├── api-checklist.md        # ~3800 tokens
    └── rest-template.py        # ~4600 tokens
```

**Token savings:**
- Without progressive: 24,900 tokens (everything loaded)
- With progressive: ~2,000 tokens (only SKILL.md until needed)
- **12x reduction in context usage**

**Action**: Restructure all skills to directory format with references/ and assets/

---

### Pattern 4: Behavioral Traits + Workflow Position Sections

**What wshobson agents include:**

```markdown
## Behavioral Traits
- Starts with understanding business requirements before technical design
- Designs APIs contract-first (OpenAPI spec before implementation)
- Builds resilience patterns from the start (circuit breakers, retries)
- Values simplicity over complexity (YAGNI principle)
- Documents architectural decisions with ADRs

## Workflow Position
- **After**: requirements-analyst, database-architect
- **Complements**: frontend-developer, security-auditor
- **Enables**: Backend implementation, API consumption
```

**Why this matters:**
- Behavioral traits define HOW agents approach work (not just what they know)
- Workflow position shows agent dependencies and sequencing
- Enables automatic orchestration

**Action**: Add these sections to all agent definitions

---

### Pattern 5: Phase-Based Orchestration with Parallel Execution

**What wshobson does:**

```markdown
## Phase 1: Architecture & Design (Sequential)
### 1. Database Design
- Use Task tool with subagent_type="database-design::database-architect"
- Prompt: "Design schema for: $ARGUMENTS"
- Expected output: ERD, schemas, migrations

### 2. Backend Architecture
- Use Task tool with subagent_type="backend-development::backend-architect"
- Prompt: "Design backend using database from step 1"
- Expected output: OpenAPI spec, service boundaries

## Phase 2: Implementation (Parallel)
[Multiple agents work concurrently - single message, multiple Task calls]

## Phase 3: Integration (Sequential)
[Validation and quality checks]

## Phase 4: Deployment (Sequential)
[Production readiness]
```

**Key coordination patterns:**
- `subagent_type="plugin-name::agent-name"` format
- Sequential dependencies: "Using the database design from previous step..."
- Parallel execution: Phase 2 runs multiple agents in single message
- Context passing: Each phase's outputs feed into next phase

**Action**: Structure all orchestrator commands with phases

---

### Pattern 6: GitHub Automation Workflows

**What wshobson does:**

`.github/workflows/claude-code-review.yml`:
```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          prompt: |
            Review this PR for:
            - Code quality
            - Security vulnerabilities
            - Test coverage
          tools: |
            Bash(gh pr view:*),
            Bash(gh pr diff:*)
```

`.github/workflows/claude.yml` (for @claude mentions):
```yaml
name: Claude Integration
on:
  issue_comment:
    types: [created]
jobs:
  claude-assist:
    if: contains(github.event.comment.body, '@claude')
    steps:
      - uses: anthropics/claude-code-action@v1
```

**Action**: Create GitHub workflows for auto PR review

---

### Pattern 7: Minimal Agent Frontmatter (Only 3 Fields)

**What wshobson uses:**
```yaml
---
name: backend-architect
description: Expert backend architect specializing in scalable API design... Use PROACTIVELY when creating new backend services or APIs.
model: inherit
---
```

**Only 3 fields:**
- `name`: kebab-case identifier
- `description`: Capabilities + trigger keywords + "Use PROACTIVELY when..."
- `model`: opus | sonnet | haiku | inherit

**No other frontmatter fields.** Everything else goes in markdown body.

**Action**: Simplify our agent frontmatter to only these 3 fields

---

### Pattern 8: Subagent Type Notation

**What wshobson uses:**
```markdown
Use Task tool with subagent_type="plugin-name::agent-name"
```

Examples:
- `subagent_type="database-design::database-architect"`
- `subagent_type="backend-development::backend-architect"`
- `subagent_type="security-compliance::security-auditor"`

**Why this matters:**
- Clear plugin scoping
- Explicit agent handoffs
- Matches plugin installation system

**Action**: Use `::` notation in all orchestrator commands

---

### Pattern 9: Model Tier Distribution

**wshobson's distribution across 91 agents:**

| Model | Count | Use Case |
|-------|-------|----------|
| **Opus** | 42 | Architecture, security, critical decisions |
| **Inherit** | 42 | User flexibility (defaults to user's selected model) |
| **Sonnet** | 51 | Complex development, analysis |
| **Haiku** | 18 | Fast operations, deterministic tasks |

**Key insight:** "Opus uses 65% fewer tokens for complex tasks" despite higher per-token cost.

**Our recommended distribution:**
```yaml
# Opus (critical decisions)
- purchase-logger-analyst       # Production monitoring
- frontend-security-coder       # Security-sensitive
- system-architect              # Architecture decisions

# Sonnet (complex development)
- gtm-operations-specialist     # Complex orchestration
- cloud-functions-deployer      # Multi-step workflows
- dashboard-viz-specialist      # Complex UI patterns
- react-performance-specialist  # Analysis required
- realtime-data-specialist      # Architecture patterns

# Haiku (fast operations)
- search-specialist             # Quick codebase searches
- database-query-runner         # Simple SQL execution
- template-generator            # Deterministic output
```

---

### Pattern 10: Resource References in Skills

**What wshobson does in SKILL.md:**

```markdown
## Resources

Load these on-demand when deeper information is needed:

- **references/rest-best-practices.md**: Comprehensive REST API design guide
- **references/graphql-schema-design.md**: GraphQL schema patterns
- **assets/api-design-checklist.md**: Pre-deployment checklist
- **assets/rest-api-template.py**: FastAPI starter template
```

**Why this matters:**
- Users can explicitly request deep resources
- Claude knows what's available without loading it
- Massive token savings (5000+ tokens per resource)

---

## Part 10: Updated File Structure (Complete)

### New Directory Layout

```
.claude/
├── .claude-plugin/
│   └── marketplace.json              # NEW: Plugin registry
├── agents/
│   ├── gtm-operations-specialist.md  # Updated with 3-field frontmatter
│   ├── cloud-functions-deployer.md   # + Behavioral Traits
│   ├── purchase-logger-analyst.md    # + Workflow Position
│   └── [other agents...]
├── commands/
│   ├── gtm/
│   │   └── bulk-publish.md           # Updated with extended thinking
│   ├── deploy/
│   │   └── cloud-function.md         # Phase-based orchestration
│   └── [other commands...]
├── skills/
│   ├── gtm-patterns/                 # NEW: Directory structure
│   │   ├── SKILL.md                  # Main instructions
│   │   ├── references/
│   │   │   ├── container-structure.md
│   │   │   └── publishing-workflow.md
│   │   └── assets/
│   │       ├── bulk-query-template.sql
│   │       └── container-ids.json
│   ├── supabase-schema/              # NEW: Directory structure
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── rls-patterns.md
│   │   │   └── migration-strategies.md
│   │   └── assets/
│   │       ├── rls-template.sql
│   │       └── migration-checklist.md
│   └── [other skills...]
├── docs/                             # NEW: Documentation
│   ├── plugins.md
│   ├── agents.md
│   ├── skills.md
│   └── usage.md
└── [existing files...]

.github/
└── workflows/
    ├── claude-code-review.yml        # NEW: Auto PR review
    └── claude.yml                    # NEW: @claude mentions
```

---

## Part 11: Implementation Checklist (Prioritized)

### Week 1: Foundation (Critical)

- [ ] **Create `.claude-plugin/marketplace.json`**
  - Register all plugins with metadata
  - Add version, keywords, category for each
  - Enable plugin installation workflow

- [ ] **Update all agent frontmatter** to 3-field format:
  ```yaml
  ---
  name: agent-name
  description: [capabilities + triggers + "Use PROACTIVELY when..."]
  model: sonnet | opus | haiku
  ---
  ```

- [ ] **Add `## Behavioral Traits` to all agents**
  - How the agent approaches work
  - Decision-making principles
  - Trade-off preferences

- [ ] **Add `## Workflow Position` to all agents**
  - After: prerequisite agents
  - Complements: peer agents
  - Enables: downstream work

### Week 2: Skills & Commands

- [ ] **Restructure skills to directory format**
  ```
  skills/skill-name/
  ├── SKILL.md
  ├── references/
  └── assets/
  ```

- [ ] **Add extended thinking to all commands**
  - Explain coordination logic
  - Show why agents are sequenced
  - Clarify dependencies

- [ ] **Add phase-based orchestration to complex commands**
  - Phase 1: Foundation (sequential)
  - Phase 2: Implementation (parallel)
  - Phase 3: Integration (sequential)
  - Phase 4: Deployment (sequential)

- [ ] **Use subagent_type notation**
  - Format: `"plugin-name::agent-name"`
  - Make handoffs explicit

### Week 3: Automation & Documentation

- [ ] **Create GitHub workflows**
  - `.github/workflows/claude-code-review.yml`
  - `.github/workflows/claude.yml`
  - Restrict bash to safe commands only

- [ ] **Create documentation files**
  - `docs/plugins.md` - Plugin reference
  - `docs/agents.md` - Agent catalog
  - `docs/skills.md` - Skills documentation
  - `docs/usage.md` - Usage patterns

- [ ] **Update README.md**
  - Quick start guide
  - Plugin installation instructions
  - Popular use cases

### Week 4: Optimization & Testing

- [ ] **Break monolithic skills** into focused plugins (2-8 components each)

- [ ] **Test auto-triggering** for all agents

- [ ] **Measure token savings** (target: 50%+ reduction)

- [ ] **Document unique strengths** we have that wshobson doesn't:
  - Production safety (Rule #0)
  - Session logging (SESSION_LOG)
  - Deep GTM/Supabase expertise
  - MCP integrations

---

## Summary: What Makes World-Class Setup

| Component | wshobson Pattern | Our Implementation |
|-----------|------------------|-------------------|
| **Plugin System** | marketplace.json registry | ✅ Create `.claude-plugin/marketplace.json` |
| **Agent Frontmatter** | 3 fields only (name, description, model) | ✅ Simplify to 3 fields |
| **Agent Structure** | Behavioral Traits + Workflow Position | ✅ Add these sections |
| **Auto-Triggering** | "Use PROACTIVELY when..." in description | ✅ Add trigger phrases |
| **Model Tiers** | Opus/Sonnet/Haiku/Inherit | ✅ Assign per agent |
| **Skills** | Directory with SKILL.md + references/ + assets/ | ✅ Restructure all skills |
| **Commands** | Extended thinking + phases + no frontmatter | ✅ Update all commands |
| **Orchestration** | Phase-based + parallel execution | ✅ Add to complex workflows |
| **Subagent Notation** | `"plugin::agent"` format | ✅ Standardize handoffs |
| **GitHub Automation** | Auto PR review + @claude mentions | ✅ Create workflows |
| **Documentation** | plugins.md, agents.md, skills.md, usage.md | ✅ Create docs/ |

---

---

## Part 12: Additional Research Findings (davepoon + VoltAgent)

### From davepoon/claude-code-subagents-collection

**Overall Assessment**: ⭐⭐⭐☆☆ (3.5/5)
- Infrastructure: World-class (Web UI, CLI, MCP)
- Agents: 90% conventional, 10% unique gems
- Commands: Simulation/decision-support commands are excellent

#### World-Class Agents to Adopt

**1. Context Manager** ⭐⭐⭐⭐⭐ (MUST ADOPT)
```markdown
Three-tier context system:
- Quick (<500 tokens): Essential facts only
- Full (comprehensive): Complete context
- Archived (historical): Past sessions

Features:
- Proactive memory pruning
- Agent-specific briefings
- Rolling summaries (2000 token cap)
- Integration point tracking
```
**Why**: Solves the #1 problem in multi-agent systems - context management across sessions. Better than our session logs.

**2. Project Supervisor Orchestrator** ⭐⭐⭐⭐⭐ (MUST ADOPT)
```markdown
Meta-coordinator pattern:
- Routes to specialists (doesn't execute)
- Conditional delegation based on info completeness
- Output aggregation with data flow preservation
- Traceability tracking (invocation sequences)
- JSON error responses
```
**Why**: Missing orchestration layer for complex multi-step workflows.

**3. Query Clarifier** ⭐⭐⭐⭐☆ (HIGHLY VALUABLE)
```markdown
Pre-research validation:
- Proactive ambiguity resolution
- Interpretive options with confidence ratings
- Targeted questions to narrow scope
- Prevents downstream waste
```
**Why**: Gate before deep-research agent prevents wasted effort.

#### Valuable Decision-Support Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| **Decision Tree Explorer** | 10-phase structured approach with probability weighting | Strategic technical decisions |
| **Architecture Scenario Explorer** | 9-phase evaluation, ADR generation | System design choices |
| **Code Permutation Tester** | Multi-criteria evaluation, Pareto frontier | Comparing algorithms |
| **Constraint Modeler** | Hierarchical constraint classification | Complex planning |
| **Digital Twin Creator** | Data quality validation, drift detection | Predictive models |

#### Infrastructure to Leverage (Don't Rebuild)
- **buildwithclaude.com** - Browse agents visually
- **bwc-cli** - `npm install -g bwc-cli` for installation
- **100+ MCP servers** - Containerized tools

---

### From VoltAgent/awesome-claude-code-subagents

**Overall Assessment**: ⭐⭐⭐☆☆ (3/5)
- Mostly derivative of wshobson + 0xfurai
- BUT has valuable hidden gems from linked resources

#### Genuinely Unique Patterns (from linked resources)

**1. "Think" Variants for Extended Reasoning** (from Anthropic)
```
"think"       → Basic reasoning
"think hard"  → Deeper analysis
"think harder"→ Maximum depth
"ultrathink"  → Extended reasoning mode
```
**Use**: Add to complex prompts for better reasoning.

**2. Document & Clear Pattern** (from Shrivu's blog)
```
For complex tasks approaching token limits:
1. Claude dumps progress to markdown file
2. /clear to reset context
3. Resume from documentation
```
**Why**: Creates durable external memory vs opaque `/compact`.

**3. Multi-Claude Parallel Workflows** (from Anthropic)
```bash
# Separate checkout folders or git worktrees
# One Claude writes, another reviews
# Breaks single-context bottleneck
```

**4. Block-at-Submit Hooks** (from PubNub)
```json
{
  "command": "test -f .tests-passed",
  "onFail": "block"
}
```
**Why**: Forces test-and-fix loops before commits.

**5. Slug-Based Audit Trails** (from PubNub)
```json
{
  "slug": "use-case-presets",
  "status": "READY_FOR_ARCH",
  "artifacts": ["spec.md", "adr.md"]
}
```
**Why**: Enables diff-based reviews and parallel-safe conflict detection.

**6. Session History Mining**
```
Analyze ~/.claude/projects/ logs for:
- Common exceptions
- Permission patterns
- Error trends
→ Iteratively improve CLAUDE.md
```

---

### Skip These (Derivative/Not Valuable)

| Resource | Reason |
|----------|--------|
| VoltAgent agent list | Overlaps with wshobson + 0xfurai |
| davepoon 90% of agents | Standard role definitions |
| davepoon 80% of commands | Conventional Git/DevOps workflows |
| Connection/Metadata agents | Only for Obsidian/knowledge vaults |

---

## Part 13: Current Skills Analysis & Optimization

### Current State

| Skill | Tokens | Structure | Priority |
|-------|--------|-----------|----------|
| api-development | 1,364 | Monolithic | 🔴 HIGH |
| ui-scaffolding | 1,372 | Monolithic | 🔴 HIGH |
| google-ads-gaql | 1,047 | Monolithic | 🔴 HIGH |
| deployment-safety | 1,095 | 2-tier ✓ | 🟡 MEDIUM |
| deep-research | 971 | 2-tier ✓ | 🟡 MEDIUM |
| gtm-bulk-operations | 872 | 2-tier ✓ | 🟡 MEDIUM |
| feature-planning | 365 | Monolithic | 🟢 LOW |
| supabase-development | 262 | Monolithic | 🟢 LOW |
| supabase-gtm-queries | 204 | Lean ✓ | ✅ DONE |
| architecture-design | 183 | Minimal ✓ | ✅ DONE |
| library-documentation-lookup | 168 | Minimal ✓ | ✅ DONE |
| facebook-ads-creative-analysis | 162 | Minimal ✓ | ✅ DONE |

**Total**: 9,360 tokens → Target: 6,800 tokens (**27% reduction**)

### Skills Already Optimized (Good Examples)

**1. deployment-safety** ✅
```
skills/deployment-safety/
├── SKILL.md (1,095 tokens)
└── scripts/verify-deployment-target.sh
```

**2. gtm-bulk-operations** ✅
```
skills/gtm-bulk-operations/
├── SKILL.md (872 tokens)
└── resources/container-mapping.json
```

**3. deep-research** ✅
```
skills/deep-research/
├── SKILL.md (971 tokens)
└── templates/research-report-template.md
```

### Skills Needing Restructure (Priority 1)

**1. api-development** (1,364 → 600 tokens, 56% reduction)
```
skills/api-development/
├── SKILL.md (~600 tokens)
├── references/
│   ├── security-patterns.md
│   ├── testing-strategies.md
│   ├── error-handling-patterns.md
│   └── next-js-app-router-setup.md
└── assets/
    ├── templates/api-route-template.ts
    ├── templates/validation-schema.ts
    └── templates/test-suite.ts
```

**2. ui-scaffolding** (1,372 → 700 tokens, 49% reduction)
```
skills/ui-scaffolding/
├── SKILL.md (~700 tokens)
├── references/
│   ├── accessibility-guide.md
│   ├── styling-approaches.md
│   ├── performance-optimization.md
│   ├── data-fetching-patterns.md
│   └── react-19-deep-dive.md
└── assets/
    ├── templates/server-component.tsx
    ├── templates/client-component.tsx
    ├── templates/form-with-actions.tsx
    └── checklists/accessibility-checklist.md
```

**3. google-ads-gaql** (1,047 → 650 tokens, 38% reduction)
```
skills/google-ads-gaql/
├── SKILL.md (~650 tokens)
├── references/
│   ├── field-reference.md
│   ├── campaign-types.md
│   ├── revenue-metrics.md
│   └── error-recovery.md
└── assets/
    ├── templates/basic-query.sql
    ├── templates/campaign-performance.sql
    └── query-builder.json
```

### Token Savings Summary

| Skill | Current | Target | Savings |
|-------|---------|--------|---------|
| api-development | 1,364 | 600 | 764 (56%) |
| ui-scaffolding | 1,372 | 700 | 672 (49%) |
| google-ads-gaql | 1,047 | 650 | 397 (38%) |
| deployment-safety | 1,095 | 850 | 245 (22%) |
| deep-research | 971 | 750 | 221 (23%) |
| gtm-bulk-operations | 872 | 750 | 122 (14%) |
| **Total** | **9,360** | **6,800** | **2,560 (27%)** |

**First-load savings**: 27% reduction
**Lazy-load efficiency**: Additional 30-40% when navigating tier 3

---

## Part 14: Updated Implementation Checklist

### Week 1: Foundation + Critical Agents

- [ ] Create `.claude-plugin/marketplace.json`
- [ ] Update all agents to 3-field frontmatter + Behavioral Traits + Workflow Position
- [ ] **NEW**: Add Context Manager agent (from davepoon)
- [ ] **NEW**: Add Project Supervisor Orchestrator (from davepoon)
- [ ] **NEW**: Add Query Clarifier (pre-research gate)

### Week 2: Skills Restructuring

- [ ] Restructure api-development (56% token reduction)
- [ ] Restructure ui-scaffolding (49% token reduction)
- [ ] Restructure google-ads-gaql (38% token reduction)
- [ ] Add references/ to deployment-safety, deep-research, gtm-bulk-operations

### Week 3: Commands & Automation

- [ ] Add extended thinking to all commands
- [ ] Create GitHub workflows (PR review, @claude mentions)
- [ ] **NEW**: Add "think harder" prompt variants
- [ ] **NEW**: Add block-at-submit hooks for quality gates

### Week 4: Testing & Documentation

- [ ] Test auto-triggering for all agents
- [ ] Create docs/ (plugins.md, agents.md, skills.md, usage.md)
- [ ] **NEW**: Implement session history mining for CLAUDE.md improvements
- [ ] Measure token savings (target: 27% skills, 50-85% workflows)

---

## Summary: World-Class Setup Components

### Agents to Add (Final List)

| Agent | Source | Priority | Model |
|-------|--------|----------|-------|
| **Context Manager** | davepoon | 🔴 CRITICAL | Sonnet |
| **Project Supervisor Orchestrator** | davepoon | 🔴 CRITICAL | Sonnet |
| **Query Clarifier** | davepoon | 🔴 HIGH | Haiku |
| gtm-operations-specialist | Custom | 🔴 HIGH | Sonnet |
| cloud-functions-deployer | Custom | 🔴 HIGH | Sonnet |
| purchase-logger-analyst | Custom | 🔴 HIGH | Opus |
| dashboard-viz-specialist | Custom | 🔴 HIGH | Sonnet |
| react-performance-specialist | Custom | 🔴 HIGH | Sonnet |
| data-scientist | wshobson | 🟡 MEDIUM | Opus |
| devops-troubleshooter | wshobson | 🟡 MEDIUM | Sonnet |
| nextjs-expert | 0xfurai | 🟡 MEDIUM | Sonnet |
| typescript-expert | 0xfurai | 🟡 MEDIUM | Sonnet |
| sql-expert | 0xfurai | 🟡 MEDIUM | Sonnet |

### Patterns to Implement

| Pattern | Source | Impact |
|---------|--------|--------|
| Plugin Marketplace | wshobson | Selective loading |
| 3-Tier Skills | wshobson | 27% token reduction |
| Extended Thinking | wshobson | Better orchestration |
| Context Manager | davepoon | Session continuity |
| "Think harder" variants | Anthropic | Better reasoning |
| Block-at-submit hooks | PubNub | Quality gates |
| Session history mining | Community | Continuous improvement |

---

**Plan Created**: 2025-12-11
**Plan Updated**: 2025-12-11 (davepoon + VoltAgent + skills analysis)
**Research Sources**:
- wshobson/agents (91 agents, 65 plugins, 47 skills) - **EXHAUSTIVE**
- 0xfurai/claude-code-subagents (100+ technology experts)
- davepoon/claude-code-subagents-collection (Context Manager, Orchestrator)
- VoltAgent/awesome-claude-code-subagents (linked resources)
- Anthropic Best Practices ("think harder", multi-Claude workflows)
- PubNub (hooks, slug-based audit trails)
- opg-dashboarding analysis
- Current skills analysis (12 skills, 9,360 tokens)
**Estimated Implementation**: 4 weeks
**Expected Token Savings**:
- Skills: 27% first-load, 30-40% lazy-load
- Workflows: 50-85%
**New Agents Count**: 13 (7 custom + 3 davepoon + 6 wshobson/0xfurai)
**Critical Patterns**: 17 total
