# Claude Code Skills Library

**Created**: 2025-11-08
**Total Skills**: 13 specialized skills
**Optimization Goal**: Token efficiency, autonomous workflows, MCP tool routing

---

## 📚 Skills Overview

This library contains production-ready Claude Code skills optimized for modern full-stack development with emphasis on GTM operations, Google Ads GAQL queries, and Next.js/React/Supabase workflows.

### High-Impact Skills (Token Optimized)

#### 1. **gtm-bulk-operations** ⭐⭐⭐⭐⭐
- **Purpose**: Efficient Google Tag Manager bulk operations across 13 OPG containers
- **Token Savings**: 85-97% (loads only when GTM work detected)
- **Key Features**:
  - Supabase-first query optimization
  - RULE #1: Always search from page 1
  - Parallel publishing workflow
  - Hardcoded container mappings
- **Triggers**: GTM edits, container queries, publishing requests, variable searches

#### 2. **deployment-safety** ⭐⭐⭐⭐⭐
- **Purpose**: Production deployment safety protocol for Google Cloud Functions
- **Token Savings**: 93% (activates only on deployment keywords)
- **Key Features**:
  - NEVER deploy without user approval
  - Deep dive research protocol
  - Pre-deployment checklist (mandatory)
  - Quality over speed enforcement
- **Triggers**: deploy, production push, cloud function update, release

#### 3. **deep-research** ⭐⭐⭐⭐⭐
- **Purpose**: Comprehensive research with multi-hop reasoning
- **Token Savings**: 23% overall, 99% in non-research sessions
- **Key Features**:
  - Adaptive planning strategies
  - Multi-hop reasoning (max 5 levels)
  - Self-reflective mechanisms
  - Tool orchestration (WebSearch → WebFetch → Playwright)
- **Triggers**: research, investigate, analyze comprehensively

### Development Workflow Skills

#### 4. **api-development** ⭐⭐⭐⭐
- **Purpose**: Complete API route creation for Next.js 15
- **Consolidates**: `/api:api-new`, `/api:api-protect`, `/api:api-test`
- **Progressive Workflow**: Create → Secure → Test
- **Features**:
  - Zod validation
  - Supabase/NextAuth integration
  - Comprehensive test generation
  - Error handling patterns

#### 5. **ui-scaffolding** ⭐⭐⭐⭐
- **Purpose**: React components & Next.js pages with modern patterns
- **Consolidates**: `/ui:component-new`, `/ui:page-new`
- **Features**:
  - Server/Client component patterns
  - React 19 features (use(), useActionState, useOptimistic)
  - Accessibility best practices
  - TypeScript strict mode

#### 6. **supabase-development** ⭐⭐⭐
- **Purpose**: Supabase Edge Functions & type generation
- **Consolidates**: `/supabase:edge-function-new`, `/supabase:types-gen`
- **Features**:
  - Deno-based Edge Functions
  - Auto-generate TypeScript types
  - RLS integration patterns
  - Local testing workflow

#### 7. **feature-planning** ⭐⭐⭐
- **Purpose**: Detailed implementation plans with realistic estimates
- **Features**:
  - Phased implementation breakdown
  - Risk assessment
  - Time estimation (solo dev focused)
  - Success criteria definition

### MCP Tool-Specific Skills

#### 8. **google-ads-gaql** ⭐⭐⭐⭐⭐
- **Purpose**: Google Ads GAQL queries with correct field names
- **Token Savings**: Prevents API confusion, correct queries on first try
- **Restricts To**: `mcp__gomarble__google_ads_*` tools only
- **Key Features**:
  - Field error prevention (common mistakes documented)
  - GAQL query templates
  - Revenue metrics (conversions_value vs all_conversions_value)
  - Campaign type detection
  - Managed account handling
- **Triggers**: Google Ads, GAQL, campaign metrics, ad performance

#### 9. **facebook-ads-creative-analysis** ⭐⭐⭐
- **Purpose**: Analyze Facebook ad creatives with performance insights
- **Restricts To**: `mcp__gomarble__facebook_*` tools only
- **Features**:
  - Visual element analysis
  - Messaging evaluation
  - Psychology assessment
  - By ad_id or assetUrl
- **Triggers**: Facebook creative, ad analysis, creative review

#### 10. **supabase-gtm-queries** ⭐⭐⭐
- **Purpose**: Optimized GTM backup database queries
- **Restricts To**: `mcp__supabase-gtm__*` tools only
- **Token Savings**: Direct lookups use ~20 tokens vs 500+ GTM API
- **Features**:
  - 3 priority query patterns
  - Container ID array filtering
  - Batch ID collection

### Specialized Skills

#### 11. **architecture-design** ⭐⭐⭐⭐
- **Purpose**: System architecture with 10x growth mindset
- **Features**:
  - Component boundary definition
  - Scalability planning
  - Dependency analysis
  - Technology selection guidance

#### 12. **library-documentation-lookup** ⭐⭐⭐
- **Purpose**: Quick access to up-to-date library docs via Context7
- **Restricts To**: `mcp__context7__*` tools only
- **Features**:
  - Auto-resolve library IDs
  - Topic-focused docs (token optimized)
  - Common library shortcuts

---

## 🎯 How Skills Work

### Autonomous Activation

Skills are **model-invoked** (Claude activates them based on task context):

```
User: "Publish all GTM workspaces"
→ gtm-bulk-operations skill activates automatically
→ Uses Supabase-first workflow
→ Parallel publish with token error handling
```

### Lazy Loading

Skills load **only when needed** (~30-50 tokens until activated):

```
Normal session: gtm-bulk-operations costs 30 tokens (not used)
GTM session: gtm-bulk-operations fully loads when detected
```

### Tool Restrictions

Skills can restrict which tools they use (prevents API confusion):

```yaml
allowed-tools:
  - mcp__gomarble__google_ads_*  # Only Google Ads tools
  - Read
  - Write
```

---

## 📊 Token Efficiency Impact

### Current vs Optimized

| Scenario | Before Skills | With Skills | Savings |
|----------|--------------|-------------|---------|
| Non-GTM session | 500 tokens (CLAUDE.md loaded) | 30 tokens | 94% |
| GTM session | 500 tokens | 500-530 tokens | 0-6% |
| Non-research session | 3K tokens (agent loaded) | 40 tokens | 99% |
| Research session | 13K tokens | 10K tokens | 23% |
| Non-deployment session | 500 tokens | 35 tokens | 93% |
| Deployment session | 500 tokens | 535 tokens | -7% |

### Monthly Projection

**Conservative estimate**: 2-20% monthly token reduction
- Real value: Autonomous workflow orchestration
- Prevents loading irrelevant context 90% of sessions
- Better MCP tool routing (no more API confusion)

---

## 🚀 Usage Examples

### Example 1: GTM Operations

```
User: "Update the cHTML - SD - Blogpost tag across all shops"

✅ Skills Activated:
1. gtm-bulk-operations
2. supabase-gtm-queries

Workflow:
1. Query Supabase for tag IDs (~20 tokens)
2. If found → Execute GTM updates
3. If not found → Search GTM API from page 1
4. Update tags in parallel
```

### Example 2: Google Ads Analysis

```
User: "Show me Performance Max campaigns with ROAS"

✅ Skills Activated:
1. google-ads-gaql

Workflow:
1. Get currency first
2. Execute optimized GAQL query:
   - Correct field names
   - LIMIT 200
   - Proper aggregation
3. Calculate ROAS
4. Present in correct currency
```

### Example 3: Feature Development

```
User: "Create a user profile API endpoint"

✅ Skills Activated:
1. api-development
2. feature-planning (if needed)

Progressive Workflow:
1. Create basic API route with validation
2. Ask: "Add authentication?"
3. Ask: "Generate tests?"
4. Complete workflow with all pieces
```

---

## 🛠 Skill Structure

Each skill follows this structure:

```
.claude/skills/
  skill-name/
    SKILL.md              # Main skill definition (required)
    templates/            # Code/config templates (optional)
    scripts/              # Automation scripts (optional)
    resources/            # Reference docs, data files (optional)
```

### SKILL.md Format

```markdown
---
name: skill-name
description: |
  What it does, when it activates.
  Triggers: keywords that activate it.
allowed-tools:
  - Tool1
  - Tool2
---

# Skill Name

[Instructions in conversational tone]
```

---

## 📖 Learning Resources

- **Official Docs**: https://code.claude.com/docs/en/skills
- **Community**: https://github.com/travisvn/awesome-claude-skills
- **Analysis**: See `CLAUDE-SKILLS-OPTIMIZATION-ANALYSIS.md` for full research

---

## 🔄 Migrated from Commands/Agents

### Deprecated Commands (Now Skills)
- `/api:api-new` → `api-development` skill
- `/api:api-protect` → `api-development` skill
- `/api:api-test` → `api-development` skill
- `/ui:component-new` → `ui-scaffolding` skill
- `/ui:page-new` → `ui-scaffolding` skill
- `/supabase:edge-function-new` → `supabase-development` skill
- `/supabase:types-gen` → `supabase-development` skill
- `/misc:feature-plan` → `feature-planning` skill

### Deprecated Agents (Now Skills)
- `deep-research-agent` → `deep-research` skill
- `system-architect` → `architecture-design` skill

### Kept as Commands (Simple Utilities)
- `/misc:lint` - One-off action
- `/misc:code-explain` - User-triggered
- `/new-task` - Explicit analysis

### Kept as Agents (Behavioral/Stylistic)
- `refactoring-expert` - Subjective code quality
- `learning-guide` - Pedagogical approach
- `technical-writer` - Writing style consistency
- `security-engineer` - Security-specific mindset
- `performance-engineer` - Performance-specific analysis

---

## ✅ Hybrid Strategy (Best Practice)

Don't convert everything—use each for its strengths:

- **Skills**: Complex autonomous workflows, MCP tool routing
- **Commands**: Simple user-initiated actions
- **Agents**: Behavioral personas, stylistic guidance

---

## 📝 Adding New Skills

1. Create directory: `.claude/skills/skill-name/`
2. Create `SKILL.md` with YAML frontmatter
3. Add instructions in conversational tone
4. (Optional) Add templates, scripts, resources
5. Restart Claude Code to load

### Naming Convention
- Lowercase with hyphens: `api-development`
- Descriptive, not generic: `google-ads-gaql` not `ads-query`

---

## 🎓 Token Optimization Tips

1. **Use tool restrictions** - Prevents loading wrong MCP tools
2. **Hardcode common data** - Container IDs, account IDs
3. **Bundle templates** - Reduce repeated generation
4. **Clear triggers** - Activate only when needed

---

## 🔍 Troubleshooting

### Skill Not Activating
- Check trigger keywords in description
- Ensure YAML frontmatter is valid
- Restart Claude Code after changes

### Wrong Tools Used
- Add `allowed-tools` restrictions
- Make triggers more specific
- Check for overlapping skill descriptions

### High Token Usage
- Verify skill activates only when needed
- Check if instructions are too verbose
- Consider splitting into multiple skills

---

## 📈 Next Steps

1. **Monitor activation** - Track which skills activate most
2. **Measure savings** - Compare token usage before/after
3. **Iterate** - Refine instructions based on usage
4. **Expand** - Add more MCP-specific skills as needed

---

**Last Updated**: 2025-11-08
**Total Skills**: 13
**Token Optimization**: Active
**MCP Integration**: Full
