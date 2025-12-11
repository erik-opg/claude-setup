# Agent Registry

Central reference for all available agents. Used by BigBoss for routing decisions.

## Quick Reference

| Agent | Model | Primary Keywords | Use Case |
|-------|-------|------------------|----------|
| `bigboss` | Haiku | route, delegate, which agent | Request classification & routing |
| `sql-expert` | Sonnet | SQL, query, joins, optimization | SQL/database questions |
| `bigquery-expert` | Opus | BigQuery, BQ, slots, partitioning | BQ-specific optimization |
| `ga4-analyst` | Opus | GA4, analytics, attribution, funnels | GA4 data analysis |
| `data-scientist` | Opus | statistics, ML, hypothesis, correlation | Statistical analysis |
| `gtm-operations-specialist` | Sonnet | GTM, containers, publish, variables | GTM bulk operations |
| `cloud-functions-deployer` | Sonnet | deploy, Cloud Functions, scheduler | Function deployment |
| `devops-troubleshooter` | Sonnet | logs, errors, production, debug | Production debugging |
| `observability-engineer` | Sonnet | monitoring, alerts, traces | Observability setup |
| `docker-expert` | Sonnet | Docker, containers, compose | Containerization |
| `backend-architect` | Sonnet | API, database, schema, backend | Backend design |
| `frontend-architect` | Sonnet | React, components, UI, patterns | Frontend architecture |
| `system-architect` | Sonnet | architecture, scalability, design | System design |
| `purchase-logger-analyst` | Sonnet | purchase logger, revenue, anomalies | Purchase monitoring |
| `dashboard-viz-specialist` | Sonnet | dashboard, charts, Recharts | Data visualization |
| `react-performance-specialist` | Sonnet | React performance, bundle, lazy | React optimization |
| `realtime-data-specialist` | Sonnet | realtime, streaming, websockets | Real-time systems |
| `precompute-pipeline-specialist` | Sonnet | precompute, pipeline, batch | Data pipelines |
| `deep-research-agent` | Sonnet | research, investigate, analyze | Deep research |
| `requirements-analyst` | Sonnet | requirements, PRD, scope | Requirement gathering |
| `tech-stack-researcher` | Sonnet | compare, library, evaluate | Tech evaluation |
| `query-clarifier` | Haiku | unclear, ambiguous, clarify | Disambiguation |
| `security-engineer` | Sonnet | security, vulnerability, audit | Security analysis |
| `performance-engineer` | Sonnet | performance, optimize, bottleneck | Performance tuning |
| `refactoring-expert` | Sonnet | refactor, cleanup, debt | Code refactoring |
| `technical-writer` | Sonnet | documentation, docs, README | Documentation |
| `typescript-expert` | Sonnet | TypeScript, types, interfaces | TypeScript |
| `nodejs-expert` | Sonnet | Node.js, npm, async | Node.js |
| `nextjs-expert` | Sonnet | Next.js, SSR, App Router | Next.js |
| `project-supervisor` | Sonnet | orchestrate, multi-step, coordinate | Multi-agent workflows |
| `context-manager` | Sonnet | context, session, continuity | Context management |
| `learning-guide` | Sonnet | learn, explain, teach | Education |

## Routing Priority

### Tier 1: Direct Route (Single Agent)
When request clearly matches ONE agent's domain.

### Tier 2: Orchestrated (Multi-Agent)
When request requires multiple specialists:
- Route to `project-supervisor`
- Supervisor coordinates sequential/parallel agent calls

### Tier 3: Clarification Needed
When request is ambiguous:
- Route to `query-clarifier`
- Clarifier asks user for more context

### Tier 4: No Agent Needed
Simple questions that don't require specialist knowledge:
- Handle directly without routing

## Keyword → Agent Mapping

### Data Keywords
```
BigQuery, BQ, query cost, slots → bigquery-expert
SQL, query, joins, subquery → sql-expert
GA4, analytics, attribution → ga4-analyst
statistics, hypothesis, ML → data-scientist
```

### Operations Keywords
```
GTM, Tag Manager, publish → gtm-operations-specialist
deploy, Cloud Functions → cloud-functions-deployer
logs, errors, debug → devops-troubleshooter
monitoring, alerts → observability-engineer
Docker, container → docker-expert
```

### Architecture Keywords
```
API design, database schema → backend-architect
React patterns, components → frontend-architect
system design, scalability → system-architect
```

### Domain Keywords
```
purchase logger, revenue → purchase-logger-analyst
dashboard, charts → dashboard-viz-specialist
React performance → react-performance-specialist
realtime, streaming → realtime-data-specialist
precompute, pipeline → precompute-pipeline-specialist
```

### Research Keywords
```
research, investigate → deep-research-agent
requirements, PRD → requirements-analyst
compare libraries → tech-stack-researcher
unclear, clarify → query-clarifier
```

### Quality Keywords
```
security, vulnerability → security-engineer
performance, optimize → performance-engineer
refactor, cleanup → refactoring-expert
documentation → technical-writer
```

### Technology Keywords
```
TypeScript, types → typescript-expert
Node.js, npm → nodejs-expert
Next.js, SSR → nextjs-expert
```

### Meta Keywords
```
multi-step, coordinate → project-supervisor
context, session → context-manager
learn, explain → learning-guide
which agent, route → bigboss
```

## Safety-Critical Agents

These agents enforce CLAUDE.md rules:

| Agent | Rule | Enforcement |
|-------|------|-------------|
| `cloud-functions-deployer` | RULE #0 | Always asks before deploying |
| `gtm-operations-specialist` | RULE #1 | Searches from page 1 |
| `gtm-operations-specialist` | RULE #5 | Parallel execution |

## Model Selection Guide

| Model | Cost | Speed | Use For |
|-------|------|-------|---------|
| **Haiku** | Low | Fast | Classification, simple tasks |
| **Sonnet** | Medium | Medium | Most specialist work |
| **Opus** | High | Slow | Complex analysis, deep reasoning |

Current Opus agents (use sparingly):
- `bigquery-expert` - Complex query optimization
- `ga4-analyst` - Deep GA4 analysis
- `data-scientist` - Statistical analysis

## Adding New Agents

When creating a new agent:

1. Create `.claude/agents/[agent-name].md`
2. Add to this REGISTRY.md
3. Define clear keywords that don't overlap with existing agents
4. Specify model (default: Sonnet)
5. Test routing with BigBoss

## Last Updated

2025-12-11 - Initial registry with 31 agents
