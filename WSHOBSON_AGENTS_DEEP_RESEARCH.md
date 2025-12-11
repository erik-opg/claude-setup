# Deep Research: wshobson/agents - Claude Code Multi-Agent System

**Repository**: https://github.com/wshobson/agents
**License**: MIT
**Scale**: 91 agents, 65 plugins, 47 skills, 45 tools across 23 categories
**Research Date**: 2025-12-11

---

## Executive Summary

The **wshobson/agents** repository represents one of the most comprehensive and production-ready Claude Code agent systems available. It implements a sophisticated multi-agent orchestration framework using a **marketplace plugin architecture** that prioritizes token efficiency, modularity, and composability. The system is distinguished by its granular plugin design (averaging 3.4 components per plugin), three-tier progressive disclosure for skills, and strategic model distribution across Opus/Sonnet/Haiku.

**Key Innovation**: Instead of monolithic agent bundles, users install only needed plugins, each loading specific agents/commands/skills into context—preventing bloat while maintaining access to 100% of the agent ecosystem.

---

## Overall Structure & Philosophy

### Core Design Principles

1. **Single Responsibility Principle**: "Each plugin does one thing well" - Unix philosophy applied to AI agents
2. **Composability Over Bundling**: Mix focused plugins vs. install monolithic suites
3. **Progressive Disclosure**: Load information only when needed (metadata → instructions → resources)
4. **Token Optimization**: Granular distribution prevents loading unnecessary components
5. **Production-First**: Emphasis on enterprise-ready implementations, not proof-of-concepts

### Architecture Overview

```
wshobson/agents/
├── .claude-plugin/
│   └── marketplace.json          # Central plugin registry
├── plugins/                      # 65 single-purpose plugins
│   └── [plugin-name]/
│       ├── agents/              # Specialized AI agents (*.md)
│       ├── commands/            # Orchestration workflows (*.md)
│       └── skills/              # Knowledge modules (directories)
│           └── [skill-name]/
│               └── SKILL.md     # Three-tier skill definition
├── docs/
│   ├── agents.md               # Complete agent catalog
│   ├── agent-skills.md         # Skill specifications
│   ├── plugins.md              # Plugin directory
│   ├── architecture.md         # Design philosophy
│   └── usage.md                # Commands & workflows
└── README.md
```

### Installation Model

**Two-command setup**:
```bash
/plugin marketplace add wshobson/agents
/plugin install [plugin-name]  # e.g., python-development
```

**Result**: Only that plugin's agents, commands, and skills load into context (~300 tokens for typical plugins).

---

## Complete Agent Inventory (91 Agents)

### Architecture & System Design (7 agents)

| Agent | Model | Specialization |
|-------|-------|----------------|
| **backend-architect** | Opus | RESTful API design, microservice boundaries, database schemas |
| **frontend-developer** | Sonnet | React components, responsive layouts, client-side state |
| **graphql-architect** | Opus | GraphQL schemas, resolvers, federation architecture |
| **architect-reviewer** | Opus | Validates architectural consistency and design patterns |
| **cloud-architect** | Opus | AWS/Azure/GCP infrastructure design and cost optimization |
| **hybrid-cloud-architect** | Opus | Multi-cloud strategies spanning cloud and on-premises |
| **kubernetes-architect** | Opus | Cloud-native infrastructure with Kubernetes and GitOps |

**+ 5 UI/UX & Mobile agents**: ui-ux-designer, ui-visual-validator, mobile-developer, ios-developer, flutter-expert (all Sonnet)

### Programming Languages (21 agents)

**Systems & Low-Level (Sonnet)**:
- c-pro, cpp-pro, rust-pro, golang-pro

**Web & Application (Sonnet)**:
- javascript-pro, typescript-pro, python-pro, temporal-python-pro, ruby-pro, php-pro

**Enterprise & JVM (Sonnet)**:
- java-pro, scala-pro, csharp-pro

**Specialized Platforms (Sonnet)**:
- elixir-pro, django-pro, fastapi-pro, haskell-pro, unity-developer, minecraft-bukkit-pro, sql-pro

### Infrastructure & Operations (9 agents)

**DevOps & Deployment**:
- devops-troubleshooter (Sonnet): Production debugging, log analysis
- deployment-engineer (Sonnet): CI/CD pipelines, containerization
- terraform-specialist (Sonnet): Infrastructure as Code
- dx-optimizer (Sonnet): Developer experience tooling

**Database Management**:
- database-optimizer (Sonnet): Query optimization, index design
- database-admin (Sonnet): Operations, backup, replication
- database-architect (Opus): Database design from scratch

**Incident Response & Network**:
- incident-responder (Opus): Production incident management
- network-engineer (Sonnet): Network debugging, load balancing

### Quality Assurance & Security (10 agents)

**Code Quality & Review (Opus)**:
- code-reviewer, security-auditor, backend-security-coder, frontend-security-coder, mobile-security-coder

**Testing & Debugging (Sonnet)**:
- test-automator, tdd-orchestrator, debugger, error-detective

**Performance & Observability (Opus)**:
- performance-engineer, observability-engineer

**Search & Research (Haiku)**:
- search-specialist

### Data & AI (6 agents)

**Data Engineering & Analytics**:
- data-scientist (Opus): Data analysis, SQL queries, BigQuery
- data-engineer (Sonnet): ETL pipelines, data warehouses

**Machine Learning & AI (Opus)**:
- ai-engineer, ml-engineer, mlops-engineer, prompt-engineer

### Documentation & Technical Writing (9 agents)

- docs-architect (Opus): Comprehensive technical documentation
- api-documenter (Sonnet): OpenAPI/Swagger specifications
- reference-builder (Haiku): Technical references
- tutorial-engineer (Sonnet): Step-by-step tutorials
- mermaid-expert (Sonnet): Diagram creation
- c4-code, c4-component, c4-container, c4-context (Haiku/Sonnet): C4 architecture documentation levels

### Business & Operations (7 agents)

**Business Analysis & Finance**:
- business-analyst (Sonnet), quant-analyst (Opus), risk-manager (Sonnet)

**Marketing & Sales**:
- content-marketer (Sonnet), sales-automator (Haiku)

**Support & Legal**:
- customer-support (Sonnet), hr-pro (Opus), legal-advisor (Opus)

### SEO & Content Optimization (10 agents)

All Haiku/Sonnet mix:
- seo-content-auditor, seo-meta-optimizer, seo-keyword-strategist, seo-structure-architect
- seo-snippet-hunter, seo-content-refresher, seo-cannibalization-detector
- seo-authority-builder, seo-content-writer, seo-content-planner

### Specialized Domains (5 agents)

- arm-cortex-expert (Sonnet): ARM Cortex-M firmware development
- blockchain-developer (Sonnet): Web3 apps, smart contracts
- payment-integration (Sonnet): Stripe, PayPal integration
- legacy-modernizer (Sonnet): Legacy code refactoring
- context-manager (Haiku): Multi-agent context management

### Model Distribution

- **Opus 4.5**: 15 agents (architecture, security, critical reviews)
- **Sonnet 4.5**: 59 agents (language expertise, complex orchestration)
- **Haiku 4.5**: 17 agents (fast execution, deterministic tasks)

**Rationale**: Opus's "65% fewer tokens for complex tasks" and "80.9% SWE-bench" justify premium tier for critical decisions. Haiku's "90% of Sonnet performance at 2x speed, 3x cost savings" enables frequent invocations.

---

## Agent Skills System (47 Skills)

### Three-Tier Progressive Disclosure Architecture

**Tier 1 - Metadata (Always Loaded)**:
```yaml
name: async-python-patterns
description: Use when building async APIs, concurrent systems, or I/O-bound applications
```

**Tier 2 - Instructions (Loaded When Activated)**:
- Core concepts and vocabulary
- Quick start minimal examples
- Fundamental patterns (5 essential techniques)
- Advanced patterns (5 sophisticated approaches)

**Tier 3 - Resources (Loaded On Demand)**:
- Concrete implementations (web scraping, databases, WebSockets)
- Performance optimization techniques
- Pitfall mitigation strategies
- Testing patterns
- External documentation links

### Activation Mechanism

Skills activate automatically via pattern detection:

**Explicit Triggers**:
- "Set up Kubernetes deployment with Helm chart" → helm-chart-scaffolding + k8s-manifest-generator
- "Build a RAG system" → rag-implementation + prompt-engineering-patterns
- "Optimize Python async performance" → async-python-patterns + python-performance-optimization

**Implicit Triggers**:
- Keywords: "non-blocking", "concurrent", "I/O-bound"
- Framework names: FastAPI, aiohttp, React, GraphQL
- Performance requirements: "high-performance", "scalable"

### Complete Skills Directory (47 Skills)

**Kubernetes Operations (4)**:
- k8s-manifest-generator, helm-chart-scaffolding, gitops-workflow, k8s-security-policies

**LLM Development (4)**:
- langchain-architecture, prompt-engineering-patterns, rag-implementation, llm-evaluation

**Backend Development (5)**:
- api-design-principles, architecture-patterns, microservices-patterns
- workflow-orchestration-patterns, temporal-python-testing

**Developer Essentials (8)**:
- git-advanced-workflows, sql-optimization-patterns, error-handling-patterns
- code-review-excellence, e2e-testing-patterns, auth-implementation-patterns
- debugging-strategies, monorepo-management

**Blockchain/Web3 (4)**:
- defi-protocol-templates, nft-standards, solidity-security, web3-testing

**CI/CD (4)**:
- deployment-pipeline-design, github-actions-templates, gitlab-ci-patterns, secrets-management

**Cloud Infrastructure (4)**:
- terraform-module-library, multi-cloud-architecture, hybrid-cloud-networking, cost-optimization

**Framework Migration (4)**:
- react-modernization, angular-migration, database-migration, dependency-upgrade

**Observability (4)**:
- prometheus-configuration, grafana-dashboards, distributed-tracing, slo-implementation

**Payment Processing (4)**:
- stripe-integration, paypal-integration, pci-compliance, billing-automation

**Python Development (5)**:
- async-python-patterns, python-testing-patterns, python-packaging
- python-performance-optimization, uv-package-manager

**JavaScript/TypeScript (4)**:
- typescript-advanced-types, nodejs-backend-patterns, javascript-testing-patterns
- modern-javascript-patterns

**Specialized (3)**:
- fastapi-templates, ml-pipeline-workflow, sast-configuration

### Agent-Skill Integration

**Hierarchical workflow**:
```
Backend architect agent (high-level reasoning)
    ↓
API design skill (best practices knowledge)
    ↓
FastAPI templates skill (production code)
```

Skills provide "specialized knowledge and implementation patterns" while agents handle "orchestration and decision-making."

---

## Plugin Catalog (65 Plugins Across 23 Categories)

### Core Development (4)
- debugging-toolkit, backend-development, frontend-mobile-development, multi-platform-apps

### Documentation (3)
- code-documentation, documentation-generation, c4-architecture

### Workflows (3)
- git-pr-workflows, full-stack-orchestration, tdd-workflows

### Testing & Quality (5)
- unit-testing, tdd-workflows, code-review-ai, comprehensive-review, performance-testing-review

### Utilities (4)
- code-refactoring, dependency-management, error-debugging, team-collaboration

### AI & ML (4)
- llm-application-dev, agent-orchestration, context-management, machine-learning-ops

### Data & Database (4)
- data-engineering, data-validation-suite, database-design, database-migrations

### Operations (4)
- incident-response, error-diagnostics, distributed-debugging, observability-monitoring

### Performance (2)
- application-performance, database-cloud-optimization

### Infrastructure (5)
- deployment-strategies, deployment-validation, kubernetes-operations, cloud-infrastructure, cicd-automation

### Security (4)
- security-scanning, security-compliance, backend-api-security, frontend-mobile-security

### Modernization (2)
- framework-migration, codebase-cleanup

### APIs (2)
- api-scaffolding, api-testing-observability

### Languages (7)
- python-development, javascript-typescript, systems-programming, jvm-languages
- web-scripting, functional-programming, arm-cortex-microcontrollers

### Marketing (4)
- seo-content-creation, seo-technical-optimization, seo-analysis-monitoring, content-marketing

### Business (3)
- business-analytics, hr-legal-compliance, customer-sales-automation

### Specialized Domains (5)
- blockchain-web3, quantitative-trading, payment-processing, game-development, accessibility-compliance

### Example Plugin Structure

**backend-development** plugin contains:

**Agents (4 files)**:
- backend-architect.md (18,151 bytes)
- graphql-architect.md (6,784 bytes)
- tdd-orchestrator.md (9,824 bytes)
- temporal-python-pro.md (10,050 bytes)

**Commands (1 file)**:
- feature-development.md (10,055 bytes)

**Skills (5 directories)**:
- api-design-principles/, architecture-patterns/, microservices-patterns/
- workflow-orchestration-patterns/, temporal-python-testing/

**marketplace.json entry**:
```json
{
  "name": "backend-development",
  "source": "./plugins/backend-development",
  "description": "Backend API design, GraphQL architecture, workflow orchestration...",
  "version": "1.2.3",
  "category": "development",
  "commands": ["./commands/feature-development.md"],
  "agents": [
    "./agents/backend-architect.md",
    "./agents/graphql-architect.md",
    "./agents/tdd-orchestrator.md",
    "./agents/temporal-python-pro.md"
  ],
  "skills": [
    "./skills/api-design-principles",
    "./skills/architecture-patterns",
    "./skills/microservices-patterns",
    "./skills/workflow-orchestration-patterns",
    "./skills/temporal-python-testing"
  ]
}
```

---

## Commands & Orchestration Patterns

### Command Structure

**Namespace pattern**: `/plugin-name:command-name [arguments]`

**Example commands**:
```bash
/backend-development:feature-development OAuth2 integration
/full-stack-orchestration:full-stack-feature "user dashboard with real-time analytics"
/security-scanning:security-hardening --level comprehensive
/unit-testing:test-generate src/api/users.py
/tdd-workflows:tdd-cycle
/python-development:python-scaffold fastapi-microservice
/c4-architecture:c4-architecture
```

### Command Parameters

Commands accept structured parameters for precision:

**Required**:
- `--feature`: Feature name and description
- `--methodology`: traditional, tdd, bdd, or ddd
- `--complexity`: simple, medium, complex, or epic

**Optional**:
- `--deployment-strategy`: direct, canary, feature-flag, blue-green, a-b-test
- `--test-coverage-min`: Minimum coverage threshold (default: 80%)
- `--performance-budget`: Performance targets
- `--rollout-percentage`: Initial traffic percentage (default: 5%)

### Multi-Agent Orchestration Workflows

#### 1. Full-Stack Feature Development

**Command**: `/full-stack-orchestration:full-stack-feature "payment processing"`

**12 Sequential/Parallel Tasks Across 4 Phases**:

**Phase 1 - Architecture & Design** (parallel):
- Database architect: Schemas and data models
- Backend architect: Service boundaries and API contracts
- Frontend developer: Component hierarchy and state management

**Phase 2 - Implementation** (parallel):
- Python/Go/Node developer: Backend services with observability
- Frontend developer: React/Next.js components with accessibility
- Database specialist: Query optimization and migrations

**Phase 3 - Integration & Testing** (sequential):
- Test automator: Contract and integration tests
- Test automator: E2E tests across critical journeys
- Security auditor: Vulnerability assessments

**Phase 4 - Deployment & Operations** (sequential):
- Deployment engineer: Containers, Kubernetes, CI/CD pipelines
- Deployment engineer: Distributed tracing and monitoring
- Performance engineer: Stack-wide optimization

**Key coordination**: Each task uses Task tool with `subagent_type`, outputs become inputs for downstream tasks, feature flags enable progressive rollout, correlation IDs for distributed tracing.

#### 2. Security Hardening Workflow

**Command**: `/security-scanning:security-hardening --level comprehensive`

**Defense-in-Depth Strategy**:

**Phase 1 - Assessment**:
- security-auditor: Vulnerability scanning
- security-auditor: STRIDE threat modeling
- architect-reviewer: Architecture security review

**Phase 2 - Remediation**:
- security-auditor: CVSS 7+ critical fixes
- backend-security-coder: Backend controls
- frontend-security-coder: XSS/CSP implementation
- mobile-security-coder: Mobile security patterns

**Phase 3 - Controls**:
- devops-troubleshooter: Infrastructure security
- deployment-engineer: Secrets management
- backend-architect: Authentication systems

**Phase 4 - Validation**:
- security-auditor: Penetration testing
- security-auditor: OWASP/CIS compliance verification
- observability-engineer: SIEM integration

**Success criteria**: "Incident response time < 15 minutes", "Zero high-risk findings in penetration testing"

#### 3. ML Pipeline Workflow

**Command**: `/machine-learning-ops:ml-pipeline "customer churn prediction model"`

**Agent sequence**:
- data-scientist → data-engineer → ml-engineer → mlops-engineer → performance-engineer

#### 4. C4 Architecture Documentation

**Command**: `/c4-architecture:c4-architecture`

**Multi-level orchestration**:
- **Code Level (c4-code)**: Bottom-up analysis, function signatures, dependencies
- **Component Level (c4-component)**: Synthesis into logical components with interfaces
- **Container Level (c4-container)**: Deployment container mapping with APIs
- **Context Level (c4-context)**: System overview with personas and dependencies

**Output**: Complete C4 documentation with Mermaid diagrams in `C4-Documentation/` directory

### Natural Language Alternative

**Conversational invocation** (no slash commands needed):
- "Use backend-architect to design the authentication API"
- "Have security-auditor scan for OWASP vulnerabilities"
- "Implement user dashboard with real-time analytics"

Claude automatically selects appropriate agents based on context.

---

## Agent Definition Template

### Backend Architect Example

**Core Structure**:

**1. Core Identity**:
- Name: backend-architect
- Model: Opus
- Specialization: "Scalable API design, microservices architecture, distributed systems"

**2. Purpose Statement**:
Expert in contemporary API design, microservices patterns, distributed systems, and event-driven methodologies

**3. Core Philosophy**:
"Clear boundaries, well-defined contracts, and resilience patterns built in from the start"

**4. Major Capability Domains (17 areas)**:
1. API Design & Patterns (REST, GraphQL, gRPC, WebSocket, SSE, webhooks)
2. API Contracts & Documentation (OpenAPI, Swagger, API-first)
3. Microservices Architecture (DDD, service mesh, BFF, sagas, CQRS)
4. Event-Driven Architecture (queues, streaming, pub/sub, event sourcing)
5. Authentication & Authorization (OAuth 2.0, JWT, RBAC/ABAC, SSO)
6. Security Patterns (validation, rate limiting, CORS, CSRF, injection prevention)
7. Resilience & Fault Tolerance (circuit breakers, retries, timeouts, bulkheads)
8. Observability & Monitoring (logging, metrics, tracing, APM)
9. Data Integration Patterns (repository, DAO, ORM, CDC, transactions)
10. Caching Strategies (multi-layer, Redis, Memcached, invalidation)
11. Asynchronous Processing (job queues, workers, batch processing)
12. Framework Expertise (Node.js, Python, Java, Go, C#, Ruby, Rust)
13. Gateway & Load Balancing (Kong, Traefik, Envoy, routing, traffic management)
14. Performance Optimization (query optimization, pooling, async, compression, CDN)
15. Testing Strategies (unit, integration, contract, e2e, load, security, chaos)
16. Deployment & Operations (containers, Kubernetes, CI/CD, feature flags)
17. Documentation & Developer Experience (API docs, diagrams, portals, ADRs)

**5. Behavioral Traits**:
- Requirements-first thinking (domain, scalability, consistency, latency)
- Contract-first API design philosophy
- DDD-based service boundary definition
- Defers database schema to database-architect
- Embeds resilience patterns from inception
- Prioritizes observability as foundational
- Values simplicity over premature optimization
- Documents architectural decisions with rationale

**6. Workflow Position**:
- **Follows**: database-architect (receives data layer foundation)
- **Collaborates with**: cloud-architect, security-auditor, performance-engineer
- **Enables**: Backend service development on solid foundation

**7. Response Methodology (10-step approach)**:
1. Understand requirements
2. Define service boundaries
3. Design API contracts
4. Plan inter-service communication
5. Build resilience mechanisms
6. Design observability
7. Architecture security
8. Performance strategy
9. Testing approach
10. Documentation and ADRs

**8. Output Deliverables**:
Service definitions, API contract specifications, Mermaid diagrams, security strategies, communication patterns, resilience mechanisms, observability approaches, caching architecture, technology rationale, deployment plans, testing strategies, documented trade-offs

**File size**: 18,151 bytes of comprehensive guidance

---

## Unique Patterns & Techniques

### 1. Marketplace Plugin Architecture

**Innovation**: Central `marketplace.json` registry with plugin metadata enables:
- Granular installation (install only what you need)
- Version management per plugin
- Category-based discovery
- Cross-plugin agent sharing (code-reviewer.md used by multiple plugins)

**Benefit**: ~300 tokens per typical plugin vs. thousands for monolithic bundles

### 2. Three-Tier Skill Progressive Disclosure

**Pattern**:
```
Tier 1 (Metadata/Frontmatter) - ALWAYS loaded
    ↓
Tier 2 (Instructions) - Loaded on activation
    ↓
Tier 3 (Resources) - Loaded on demand
```

**Example** (async-python-patterns):
- **Tier 1**: Name, description, activation triggers (50 tokens)
- **Tier 2**: Core concepts, quick start, fundamental patterns, advanced patterns (500 tokens)
- **Tier 3**: Real implementations, performance optimization, testing, external links (1000+ tokens)

**Benefit**: Skills provide deep expertise without bloating context until needed

### 3. Strategic Model Distribution

**Tiered assignment based on task characteristics**:

| Tier | Model | Task Type | Token Efficiency |
|------|-------|-----------|------------------|
| 1 | Opus 4.5 | Architecture, security, critical reviews | 65% fewer tokens for complex tasks |
| 2 | Inherit | Complex tasks—user chooses | Flexibility |
| 3 | Sonnet 4.5 | Development, orchestration | Balanced capability/cost |
| 4 | Haiku 4.5 | Fast ops, deterministic tasks | 90% Sonnet performance, 3x cost savings |

**Innovation**: Right-size model to task complexity vs. one-size-fits-all

### 4. Hybrid Orchestration (Sequential + Parallel)

**Pattern**: Commands coordinate agents across phases with mixed execution:

```
Phase 1 (Parallel)
├── database-architect ┐
├── backend-architect  ├─> All run simultaneously
└── frontend-developer ┘
         ↓
Phase 2 (Sequential)
├── implementation
├── testing            (Each waits for previous)
└── deployment
```

**Benefit**: Maximize parallelization where no dependencies exist, enforce order where dependencies matter

### 5. Task Tool with subagent_type Parameter

**Mechanism**: Commands invoke specialized agents via:
```markdown
Task tool: subagent_type="backend-architect"
Context: Previous phase outputs
Deliverable: API contract specification
```

**Benefit**: Explicit agent routing with context passing, creating dependency chains

### 6. Agent Specialization Levels

**Hierarchy**:
1. **Domain experts** (python-pro, rust-pro): Language-specific
2. **Architectural agents** (backend-architect, cloud-architect): System design
3. **Orchestrators** (tdd-orchestrator, full-stack-orchestration): Multi-agent coordination
4. **Reviewers** (code-reviewer, architect-reviewer): Quality validation
5. **Utilities** (context-manager, search-specialist): Support functions

**Benefit**: Clear role boundaries prevent overlap and confusion

### 7. Compliance with Anthropic Agent Skills Specification

**Requirements**:
- Hyphen-case naming (async-python-patterns, not async_python_patterns)
- Descriptions under 1024 characters including activation triggers
- Complete, non-truncated content
- Proper YAML frontmatter formatting

**Benefit**: Standardized interfaces across all 47 skills ensure consistent behavior

### 8. Component Coverage Guarantee

**Principle**: "100% agent availability across 91 specialized agents"

**Implementation**: Agents can be referenced by multiple plugins, ensuring:
- No orphaned agents
- Composability without duplication
- Shared resources (code-reviewer used by 5+ plugins)

### 9. Permission Scoping per Agent

**Pattern**: Each agent receives explicit tool allowlists

**Example**:
```yaml
tools:
  - file_read
  - file_write
  - bash_execute
# Excludes: git_push, infrastructure_modify
```

**Benefit**: "Permission sprawl is fastest path to unsafe autonomy"—minimizes risk

### 10. Workflow Composition Strategy

**Sequential chaining for complex scenarios**:
```bash
1. /backend-development:feature-development
2. /security-scanning:security-hardening
3. /unit-testing:test-generate
4. /code-review-ai:ai-review
5. /cicd-automation:workflow-automate
6. /observability-monitoring:monitor-setup
```

**Benefit**: Build complex workflows from focused, composable plugins

---

## Comparison to Typical Claude Code Setups

### Standard Claude Code Setup

**Typical structure**:
```
.claude/
├── commands/
│   ├── debug.md
│   ├── review.md
│   └── test.md
├── agents/
│   ├── backend.md
│   └── frontend.md
└── CLAUDE.md (project instructions)
```

**Characteristics**:
- 3-10 custom commands
- 2-5 agents for project-specific needs
- Single CLAUDE.md with conventions
- ~1,000-5,000 tokens loaded per session
- Project-specific, not reusable
- Manual orchestration via user prompts

### wshobson/agents Setup

**Enterprise structure**:
```
marketplace → 65 plugins → 91 agents + 47 skills + 45 tools
```

**Characteristics**:
- 65 installable plugins across 23 categories
- 91 domain-expert agents with deep specialization
- 47 progressive disclosure skills
- ~300-500 tokens per installed plugin
- **Reusable across all projects** via marketplace
- **Built-in multi-agent orchestration** via commands
- Strategic model distribution (Opus/Sonnet/Haiku)
- Three-tier skill architecture
- Permission scoping per agent

### Key Differentiators

| Aspect | Typical Setup | wshobson/agents |
|--------|---------------|-----------------|
| **Scale** | 2-5 agents | 91 agents |
| **Organization** | Flat directory | Marketplace plugin system |
| **Reusability** | Project-specific | Cross-project via marketplace |
| **Orchestration** | Manual prompts | Pre-configured workflows |
| **Token efficiency** | Load everything | Granular plugin loading |
| **Model strategy** | Single model | Tiered Opus/Sonnet/Haiku |
| **Skills** | Implicit in agents | Explicit progressive disclosure |
| **Discovery** | Read .claude/ directory | Category-based marketplace |
| **Maintenance** | Per-project updates | Centralized plugin updates |
| **Community** | Private | MIT open-source |

### What Makes wshobson/agents Popular

1. **Comprehensive Coverage**: 91 agents span virtually every development domain
2. **Production-Ready**: Enterprise-focused vs. toy examples
3. **Token Optimized**: Granular loading prevents context bloat
4. **Composable**: Mix plugins for custom workflows
5. **Well-Documented**: Complete agent catalog, usage examples, architecture guide
6. **Active Orchestration**: Pre-built multi-agent workflows (not just agents)
7. **Strategic Modeling**: Right model for right task (Opus/Sonnet/Haiku)
8. **Open Source**: MIT license enables community contributions
9. **Marketplace Model**: Install-what-you-need vs. all-or-nothing
10. **Specification Compliance**: Follows Anthropic Agent Skills Specification

---

## Specific Recommendations for Adoption

### For Your GTM Bulk Operations Project

#### 1. **Adopt the Agent Template Structure**

**Current**: Simple agent definitions in project root
**Recommended**: Use wshobson backend-architect.md template structure

**Benefits**:
- Comprehensive capability domains (17 for backend-architect)
- Clear behavioral traits (requirements-first, contract-first)
- Explicit workflow position (follows, collaborates with, enables)
- Structured 10-step response methodology
- Defined output deliverables

**Implementation**:
```markdown
# GTM Operations Specialist Agent

## Core Identity
- Name: gtm-operations-specialist
- Model: Sonnet
- Specialization: "Google Tag Manager bulk operations, Supabase queries, token optimization"

## Core Philosophy
"Always query Supabase first for token efficiency, deep dive research from scratch, quality over speed"

## Major Capability Domains
1. GTM API Operations (variables, tags, triggers, publishing)
2. Supabase Database Queries (token-optimized patterns)
3. Token Optimization Techniques (direct lookup, pattern-based search)
4. Multi-Container Operations (13 shop containers)
5. Deployment Safety Protocols (pre-deployment checklist)
6. Session Documentation (context preservation)

## Behavioral Traits
- Supabase-first workflow (fallback to GTM API)
- Always search from page 1 (RULE #1)
- Never deploy without asking (RULE #0)
- Deep dive research from scratch (no quick fixes)
- Quality over speed (take time for good output)

## Response Methodology
1. Query Supabase database first
2. Evaluate results (found vs. not found)
3. Fallback to GTM API if needed (start page 1)
4. Execute operations with specific IDs
5. Verify with COUNT queries
6. Ask permission before deployment
7. Use deploy.sh (never custom commands)
8. Document session when approaching token limits
```

#### 2. **Implement Three-Tier Skills for GTM Operations**

**Create skills directory**:
```
.claude/skills/
├── gtm-token-optimization/
│   └── SKILL.md (Tier 1: Metadata, Tier 2: Patterns, Tier 3: Examples)
├── supabase-query-patterns/
│   └── SKILL.md
├── deployment-safety-protocols/
│   └── SKILL.md
└── session-documentation/
    └── SKILL.md
```

**Example**: `gtm-token-optimization/SKILL.md`
```yaml
---
name: gtm-token-optimization
description: Use when performing GTM bulk operations requiring Supabase queries and token efficiency
---

# When to Use This Skill
- GTM variable/tag searches across multiple containers
- Token budget concerns (approaching 180k/200k limit)
- Bulk update operations

# Tier 1: Core Concepts
- Supabase-first workflow
- Direct lookup vs. pattern matching
- Container ID hardcoding

# Tier 2: Query Patterns
## Priority 1: Direct Lookup (~20 tokens)
[SQL examples]

## Priority 2: Pattern-Based Search (~40 tokens)
[SQL examples]

# Tier 3: Real-World Examples
[Complete workflows with actual queries]
```

**Activation triggers**: "Search GTM variables", "bulk operation", "token efficient"

#### 3. **Create Orchestrator Commands**

**Structure**:
```
.claude/commands/
├── gtm-bulk-publish.md (orchestrator)
├── gtm-variable-search.md (orchestrator)
└── gtm-deployment-safety.md (orchestrator)
```

**Example**: `gtm-bulk-publish.md`
```markdown
# GTM Bulk Publish Orchestrator

## Command
/gtm:bulk-publish [--verify-level minimal|standard|comprehensive]

## Workflow
### Phase 1: Pre-Deployment Checks
- Task: Verify deployment targets
  - Subagent: deployment-safety-checker
  - Check Cloud Scheduler for active functions
  - Verify deploy.sh targets
  - Read documentation (CURRENT-DEPLOYMENT-STATUS.md)

### Phase 2: Publish All Containers
- Task: Parallel publish to 13 containers
  - Subagent: gtm-operations-specialist
  - Single message with 13 gtm_version calls
  - Ignore token errors (cosmetic)

### Phase 3: Verification
- Task: Sanity check first container
  - Subagent: gtm-operations-specialist
  - Verify NL container (9329147)
  - Check containerVersionId matches

## Success Criteria
- All 13 publishes complete (even with token errors)
- First container verification passes
- ~3,500 tokens total (85% savings vs. full verification)
```

#### 4. **Adopt Strategic Model Distribution**

**Current**: Likely using Sonnet for everything
**Recommended**:

| Task | Model | Rationale |
|------|-------|-----------|
| GTM variable searches | Haiku | Fast, deterministic, 90% Sonnet performance |
| Supabase queries | Haiku | Simple SQL, 3x cost savings |
| Deployment safety checks | Sonnet | Complex decision-making |
| Session documentation | Sonnet | Comprehensive analysis |
| Architecture decisions | Opus | Critical, requires deep reasoning |

**Implementation**: Update agent definitions with model tiers

#### 5. **Create Marketplace Structure for Team Reusability**

**If working with team**:
```
gtm-operations-marketplace/
├── .claude-plugin/
│   └── marketplace.json
├── plugins/
│   ├── gtm-bulk-operations/
│   │   ├── agents/
│   │   │   └── gtm-operations-specialist.md
│   │   ├── commands/
│   │   │   ├── bulk-publish.md
│   │   │   └── variable-search.md
│   │   └── skills/
│   │       ├── gtm-token-optimization/
│   │       └── supabase-query-patterns/
│   └── deployment-safety/
│       ├── agents/
│       │   └── deployment-safety-checker.md
│       └── skills/
│           └── deployment-safety-protocols/
└── README.md
```

**marketplace.json**:
```json
{
  "name": "gtm-operations",
  "owner": {
    "name": "Your Team",
    "url": "https://github.com/your-org"
  },
  "plugins": [
    {
      "name": "gtm-bulk-operations",
      "source": "./plugins/gtm-bulk-operations",
      "description": "GTM bulk operations with token optimization and Supabase-first workflow",
      "version": "1.0.0",
      "category": "operations",
      "commands": [
        "./commands/bulk-publish.md",
        "./commands/variable-search.md"
      ],
      "agents": [
        "./agents/gtm-operations-specialist.md"
      ],
      "skills": [
        "./skills/gtm-token-optimization",
        "./skills/supabase-query-patterns"
      ]
    }
  ]
}
```

#### 6. **Implement Session Documentation Automation**

**Current**: Manual SESSION_LOG creation at token limits
**Recommended**: Create session-documenter agent

**Agent**: `session-documenter.md`
```markdown
# Session Documenter Agent

## Core Identity
- Model: Sonnet
- Specialization: "Automated session documentation at token limits"

## Activation Triggers
- Token usage > 180k/200k (90%)
- User says "document session"
- Before complex refactoring
- End of work day

## Response Methodology
1. Analyze current session context
2. Extract changes made (files, queries, deployments)
3. Document successful approaches with exact commands
4. Capture failed attempts with lessons learned
5. Record current state and next steps
6. Write SESSION_LOG_[DATE].md
7. Verify completeness
```

**Command**: `/gtm:document-session`

#### 7. **Add Permission Scoping**

**Current**: No explicit tool restrictions
**Recommended**: Define tool allowlists per agent

**Example**:
```yaml
# gtm-operations-specialist.md

## Tool Permissions
allowed_tools:
  - mcp__supabase-gtm-mcp__execute_sql
  - mcp__supabase-gtm-mcp__list_tables
  - Bash (read-only, no deploy)
  - Read
  - Write (only for session logs)

blocked_tools:
  - mcp__supabase-gtm-mcp__apply_migration (use deployment agent)
  - Bash with deploy commands (requires deployment agent)
```

#### 8. **Create Pre-Flight Checklist Skills**

**Structure**: `deployment-safety-protocols/SKILL.md`

**Tier 1 - Metadata**:
```yaml
name: deployment-safety-protocols
description: Use before ANY deployment to production systems
```

**Tier 2 - Checklist**:
```markdown
## Pre-Deployment Checklist (Mandatory - DO NOT SKIP!)

### Step 1: Identify Active Functions (2 min)
- [ ] gcloud functions list --format="table(name,updateTime)"
- [ ] gcloud scheduler jobs list --location=europe-west1

### Step 2: Verify Deployment Target (2 min)
- [ ] cat deploy.sh | grep "gcloud functions deploy"
- [ ] Match against Cloud Scheduler

### Step 3: Read Documentation (3 min)
- [ ] Check CURRENT-DEPLOYMENT-STATUS.md
- [ ] Check most recent SESSION_LOG_*.md
- [ ] Check function's PROGRESS.md

### Step 4: Ask User Confirmation (MANDATORY)
- [ ] Explain issue found
- [ ] Show analysis (function name, evidence, changes)
- [ ] Ask: "Should I deploy to [SPECIFIC FUNCTION NAME]?"
- [ ] Wait for approval

### Step 5: Deploy & Verify
- [ ] Use ./deploy.sh (not custom gcloud)
- [ ] Check logs after deployment
- [ ] Test endpoint/functionality
- [ ] Ask user to verify
```

**Tier 3 - Examples**: Real deployment scenarios with checklist outcomes

#### 9. **Implement Task Tool Orchestration**

**Pattern**: Use Task tool like wshobson for multi-step operations

**Example**: Variable search workflow
```markdown
## Variable Search Orchestrator

### Task 1: Database Query
- Subagent: supabase-query-specialist
- Tool: execute_sql
- Query: Direct name lookup with container IDs
- Output: List of matching variables

### Task 2: Evaluate Results
- Subagent: gtm-operations-specialist
- If found (>0 results): Proceed to Task 4
- If not found (0 results): Proceed to Task 3

### Task 3: GTM API Fallback
- Subagent: gtm-api-searcher
- Search from page 1 (RULE #1)
- Continue through all pages
- Output: List of found variables

### Task 4: Execute Updates
- Subagent: gtm-operations-specialist
- Use collected IDs
- Apply updates
- Verify with COUNT query
```

#### 10. **Adopt Contributing Guidelines**

**From wshobson/agents CONTRIBUTING.md**:

**Quality standards**:
- Clear, specific domain expertise
- Well-structured prompt engineering
- Practical examples included
- Accurate, consistently formatted documentation

**For agents**:
- Clear specialization (GTM operations, deployment safety)
- Proper safety considerations (never deploy without asking)
- Integration with existing workflows (Supabase-first)
- Examples and use cases

**For documentation**:
- Technical accuracy (exact SQL queries, gcloud commands)
- Clear formatting (checklists, tables, code blocks)
- Practical illustrations (real SESSION_LOG examples)

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)

**Day 1-2: Agent Templates**
- [ ] Convert existing CLAUDE.md rules to agent definitions
- [ ] Create gtm-operations-specialist.md using backend-architect template
- [ ] Create deployment-safety-checker.md agent
- [ ] Define tool permissions for each agent

**Day 3-4: Skills Structure**
- [ ] Create .claude/skills/ directory
- [ ] Implement gtm-token-optimization/SKILL.md (3 tiers)
- [ ] Implement supabase-query-patterns/SKILL.md
- [ ] Implement deployment-safety-protocols/SKILL.md

**Day 5-7: Commands**
- [ ] Create .claude/commands/ directory
- [ ] Implement /gtm:bulk-publish orchestrator
- [ ] Implement /gtm:variable-search orchestrator
- [ ] Implement /gtm:document-session command

### Phase 2: Optimization (Week 2)

**Day 8-10: Model Distribution**
- [ ] Update agents with model tiers (Opus/Sonnet/Haiku)
- [ ] Test Haiku for simple queries (compare token usage)
- [ ] Keep Sonnet for complex orchestration
- [ ] Reserve Opus for critical architecture decisions

**Day 11-12: Orchestration**
- [ ] Implement Task tool patterns for multi-step workflows
- [ ] Create agent dependency chains (database → specialist → deployer)
- [ ] Add explicit context passing between tasks

**Day 13-14: Documentation**
- [ ] Create comprehensive docs/ directory
- [ ] Write agents.md catalog
- [ ] Write usage.md with command examples
- [ ] Document architecture.md (Supabase-first, token optimization)

### Phase 3: Marketplace (Week 3) - Optional

**Day 15-17: Plugin Structure**
- [ ] Create marketplace repository structure
- [ ] Move agents/commands/skills to plugins/
- [ ] Create marketplace.json registry
- [ ] Test plugin installation workflow

**Day 18-19: Additional Plugins**
- [ ] Create deployment-safety plugin
- [ ] Create session-documentation plugin
- [ ] Define cross-plugin dependencies

**Day 20-21: Team Rollout**
- [ ] Share marketplace with team
- [ ] Create team training guide
- [ ] Collect feedback and iterate

---

## Key Takeaways

### What Makes wshobson/agents Effective

1. **Granular modularity**: 65 focused plugins vs. monolithic bundles
2. **Token efficiency**: ~300 tokens per plugin via progressive disclosure
3. **Production focus**: Enterprise-ready patterns, not toy examples
4. **Strategic modeling**: Right model for right task (Opus/Sonnet/Haiku)
5. **Active orchestration**: Pre-built multi-agent workflows
6. **Open ecosystem**: MIT license, community contributions
7. **Specification compliance**: Follows Anthropic Agent Skills Specification
8. **Comprehensive coverage**: 91 agents across 23 categories
9. **Reusable infrastructure**: Marketplace model enables cross-project use
10. **Well-documented**: Complete catalog, architecture, usage guides

### Core Innovations to Adopt

1. **Three-tier skill architecture**: Metadata → Instructions → Resources
2. **Marketplace plugin system**: Install-what-you-need granularity
3. **Agent template structure**: 17 capability domains, 10-step methodology
4. **Task tool orchestration**: Explicit agent routing with context passing
5. **Permission scoping**: Tool allowlists per agent
6. **Hybrid execution**: Sequential + parallel task coordination
7. **Model tier assignment**: Opus/Sonnet/Haiku based on complexity
8. **Progressive disclosure**: Load information only when needed
9. **100% agent availability**: Cross-plugin agent sharing
10. **Specification compliance**: Standardized interfaces

### Immediate Actions

**For GTM project**:
1. ✅ Convert CLAUDE.md rules to agent definitions (use backend-architect template)
2. ✅ Create three-tier skills for GTM operations, deployment safety
3. ✅ Implement orchestrator commands for bulk operations
4. ✅ Add model tier assignments (Haiku for queries, Sonnet for orchestration)
5. ✅ Implement session-documenter agent
6. ✅ Add tool permission scoping
7. ✅ Create pre-deployment checklist skill
8. ✅ Test token savings (Supabase direct lookup: 20 tokens vs. GTM search: 137k)

**For future**:
- Build team marketplace repository
- Contribute back to wshobson/agents (GTM operations plugin)
- Expand to other operation domains (BigQuery, Cloud Functions)

---

## Sources

- [wshobson/agents GitHub Repository](https://github.com/wshobson/agents)
- [Claude Code: Best practices for agentic coding](https://www.anthropic.com/engineering/claude-code-best-practices)
- [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- [Best practices for Claude Code subagents](https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/)
- [Claude Agent SDK Best Practices for AI Agent Development (2025)](https://skywork.ai/blog/claude-agent-sdk-best-practices-ai-agents-2025/)
- [Subagents - Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

---

**Research completed**: 2025-12-11
**Total tokens analyzed**: ~50,000
**Files examined**: 15+ (README, docs/, plugin examples, agent templates, skill examples)
**Depth**: Comprehensive (structure, philosophy, all 91 agents, 47 skills, orchestration patterns, unique techniques)
