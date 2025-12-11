# Project Instructions

## Team Charter (Summary)
- **PM**: Clarifies requirements, breaks into tasks, opens PRs
- **BE/FE**: Implement with tests, respect code style
- **Reviewer**: Block merges that skip requirements
- Branching: `feature/`, `fix/`, `chore/`
- Commits: conventional style (feat:, fix:, chore:)
- PRs: small, testable, include summary + test plan

---

## RULE #0: DEPLOYMENT PROTOCOL

**NEVER DEPLOY WITHOUT ASKING USER FIRST**

1. Find bug → Research fix → **VERIFY deployment target**
2. **ASK**: "Should I deploy to [FUNCTION NAME]?"
3. Wait for approval → Use `./deploy.sh` → Verify

**Pre-deployment checklist:**
```bash
gcloud functions list --format="table(name,updateTime)"
gcloud scheduler jobs list --location=europe-west1
cat deploy.sh | grep "gcloud functions deploy"
```

**Deep dive research**: Trace full flow, verify assumptions with queries, find root cause not symptoms.

---

## RULE #1: GTM Search from Page 1

**NEVER skip page 1 when searching GTM variables.**

- Always start from page 1, search sequentially
- Use `page: 1, itemsPerPage: 20`
- Only report "not found" after ALL pages checked
- If user says "I can see it" → BELIEVE THEM, re-search from page 1

---

## RULE #2: Token Efficiency - Supabase First

**PRIMARY**: Query Supabase → Get IDs → Execute GTM ops (~20-50 tokens)
**FALLBACK**: If not in Supabase → Search GTM API from page 1

```
Query Supabase → Found? → YES → Use IDs
                       → NO  → GTM API from page 1
```

**NEVER**: Skip Supabase, repeat queries, use GTM for discovery

---

## RULE #3: Session Documentation

Create `SESSION_LOG_[DATE].md` when:
- Token usage ~180k-190k (90-95% limit)
- Before complex/delicate changes
- End of work session

Template: See `@.claude/docs/SESSION_LOG_TEMPLATE.md`

---

## RULE #4: Plan-Based Continuity

**For complex multi-session work, create plans BEFORE executing:**

```
.docs/plans/[feature]/
├── requirements.md      # What to build
├── parallel-plan.md     # Task breakdown with dependencies
└── shared.md            # Cross-task context
```

**Benefits:**
- Reference plan (200 tokens) vs re-explain (2000+ tokens)
- Survives across sessions/days/weeks
- Enables parallel task execution

**When to Create Plans:**
- ✅ Multi-step features (3+ distinct tasks)
- ✅ Work spanning multiple sessions
- ✅ Parallel-eligible tasks
- ❌ Single simple tasks (just do them)

Template: See `@.docs/plans/TEMPLATE.md`

---

## RULE #5: Parallel Execution Protocol

**Deploy ALL operations in SINGLE `<function_calls>` block when independent.**

**Examples:**
- 13 GTM container publishes → one message
- Multiple file reads → batch upfront
- Independent Supabase queries → parallel

**Pattern:**
```xml
<function_calls>
  <invoke name="tool1">...</invoke>
  <invoke name="tool2">...</invoke>
  <invoke name="tool3">...</invoke>
</function_calls>
```

**Only serialize when dependencies require it.**

---

## Available Subagents

Use Task tool with these specialized agents:

### Data & Analytics Specialists (Opus)
| Agent | Use When |
|-------|----------|
| `bigquery-expert` | BigQuery optimization, cost analysis, partitioning, slots, materialized views |
| `ga4-analyst` | GA4 analysis with insights, attribution, funnels, cohorts, recommendations |
| `data-scientist` | Statistical analysis, hypothesis testing, experiment design |

### Architecture & Design (Sonnet/Opus)
| Agent | Use When |
|-------|----------|
| `backend-architect` | API/database design, system architecture |
| `frontend-architect` | React/Next.js patterns, UI architecture |
| `system-architect` | High-level system design, technology decisions |

### Operations & DevOps
| Agent | Use When |
|-------|----------|
| `gtm-operations-specialist` | GTM bulk operations, container publishing |
| `cloud-functions-deployer` | Cloud Functions deployment with safety protocols |
| `precompute-pipeline-specialist` | GCS caching, precomputation, performance optimization |
| `devops-troubleshooter` | Production debugging, log analysis |
| `observability-engineer` | Monitoring, tracing, alerting setup |

### Domain Specialists
| Agent | Use When |
|-------|----------|
| `purchase-logger-analyst` | Purchase monitoring, anomaly detection, alert analysis |
| `dashboard-viz-specialist` | Chart design, Recharts, data visualization |
| `react-performance-specialist` | Bundle optimization, code splitting, memoization |
| `realtime-data-specialist` | WebSocket, SSE, Supabase Realtime integration |

### Research & Analysis
| Agent | Use When |
|-------|----------|
| `deep-research-agent` | Complex investigations, multi-hop reasoning |
| `requirements-analyst` | Scope clarification, requirement discovery |
| `tech-stack-researcher` | Technology evaluation, library comparison |

### Quality & Documentation
| Agent | Use When |
|-------|----------|
| `security-engineer` | Security analysis, vulnerability assessment |
| `performance-engineer` | Performance optimization, bottleneck analysis |
| `refactoring-expert` | Code cleanup, technical debt reduction |
| `technical-writer` | Documentation, technical writing |

### Technology Experts
| Agent | Use When |
|-------|----------|
| `sql-expert` | SQL optimization, BigQuery/Postgres patterns |
| `typescript-expert` | TypeScript strict mode, generics, type safety |
| `nextjs-expert` | Next.js App Router, Server Components, SSR/SSG |
| `nodejs-expert` | Node.js runtime, event loop, Cloud Functions |
| `docker-expert` | Container optimization, cold start reduction |

**Subagent Benefits:**
- Separate context window (doesn't fill main context)
- Specialized expertise with deep domain knowledge
- Parallel execution possible
- Auto-insights generation (analytics agents deliver conclusions, not just data)

---

## Available Skills (Auto-Activate)

These skills load automatically based on keywords:

| Skill | Triggers | Token Cost |
|-------|----------|-----------|
| `gtm-bulk-operations` | GTM, container, publish, variable | 30→500 tokens |
| `deployment-safety` | deploy, production, release | 35→535 tokens |
| `deep-research` | research, investigate, analyze | 40→10K tokens |
| `google-ads-gaql` | Google Ads, GAQL, campaign | On-demand |
| `supabase-development` | Edge Function, Supabase | On-demand |
| `api-development` | API route, endpoint | On-demand |
| `ui-scaffolding` | component, React, page | On-demand |

**Manual Activation:** `skill: skill-name`

---

## GTM Containers (OPG Account)

**Account ID**: `3505761902` (use for ALL GTM operations)

### Shop Containers
| Country | Public ID | Container ID |
|---------|-----------|--------------|
| NL | GTM-5BFJP5G | 9329147 |
| DE | GTM-MX445N5 | 9329149 |
| DE-HPL | GTM-KSFGL3H | 9327633 |
| DE-PMMA | GTM-TGVXNLD | 9329155 |
| UK | GTM-WJWM255 | 9328073 |
| BE | GTM-WB7PFTB | 9327968 |
| BE-FR | GTM-N2364FW | 13259779 |
| FR | GTM-MM5KQCF | 13259999 |
| FR-PMMA | GTM-N7XKQ7L | 10375338 |
| AT | GTM-57VFD3Z | 9328048 |
| IT | GTM-NKZ9QM7 | 57801577 |
| ES | GTM-NBGPKB7 | 57802452 |
| PL | GTM-N5Q2VS5 | 99860573 |

### Shop Container Array (SQL)
```sql
WHERE container_id::int IN (9329147,9329149,9327633,9329155,9328073,9327968,13259779,13259999,10375338,9328048,57801577,57802452,99860573)
```

### Other Containers
- Corporate: GTM-TZXC6BH (30653906)
- Server-side: GTM-5HBP2524 (219819287)
- Shops SS: GTM-TT92MV9W (171906003)

---

## Quick Reference

### Publishing (Most Common)
1. Make 13 parallel `gtm_version(action="publish")` calls
2. **IGNORE token errors** - they're cosmetic, publishes succeed
3. Verify ONLY 1 container (NL: 9329147) as sanity check

Details: See `@.claude/docs/GTM_PUBLISHING_GUIDE.md`

### Query Patterns
See `@.claude/docs/GTM_QUERY_PATTERNS.md` for SQL templates

### Best Practices & Workflows
See `@.claude/docs/GTM_BEST_PRACTICES.md`

---

## Query Optimization (Quick Rules)

**DO:**
- Use hardcoded container IDs
- `SELECT id, name` (not SELECT *)
- `LIMIT 20` on searches
- `COUNT(*)` for existence checks

**DON'T:**
- SELECT * without WHERE
- Fetch `parameters_json` unless necessary
- Use GTM tools for discovery - use Supabase

---

## Communication Protocol

**Conciseness Standards:**
- Responses: 1-4 lines preferred (facts and code)
- No preambles: Skip "Let me help you" or "I'll explain"
- Challenge immediately: No diplomatic buffering

**Example:**
```
User: "Should I deploy to slack-purchase-logger-monitor?"
❌ Bad: "Let me verify which function is production..."
✅ Good: "No. Deploy to slack-purchase-logger-monitor-v2 (Cloud Scheduler uses this)."
```

---

**Last Updated**: 2025-12-11
**Rules**: #0 Deployment, #1 Page 1, #2 Supabase-first, #3 Session docs, #4 Plan-based, #5 Parallel
**Working Dir**: `/Users/erik/Documents/look/`
