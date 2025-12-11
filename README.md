# Erik's Claude Code Setup

A comprehensive, token-optimized Claude Code configuration designed for efficient GTM operations, production deployments, and modern full-stack development.

## Quick Start

```bash
# 1. Clone this repo
git clone https://github.com/yourusername/claude-setup.git

# 2. Copy global config
cp global-config/settings.json ~/.claude/settings.json
cp global-config/mcp.json ~/.claude/mcp.json

# 3. Copy project template to your project
cp -r project-template/.claude /path/to/your/project/
cp project-template/CLAUDE.md /path/to/your/project/

# 4. (Optional) Create .docs structure for plan-based continuity
cp -r project-template/.docs /path/to/your/project/
```

## What's Included

### Global Configuration (`~/.claude/`)
- `settings.json` - Model settings (Opus/Sonnet)
- `mcp.json` - MCP server configurations (GTM, Supabase, GoMarble, etc.)

### Project Configuration (`.claude/`)
- `agents/` - 11 specialized agents (deep-research, backend-architect, etc.)
- `commands/` - 12 slash commands for common workflows
- `skills/` - 13 auto-activating skills (GTM, deployment-safety, etc.)
- `docs/` - Reference documentation (loaded on-demand)
- `settings.local.json` - Project-specific permissions

### Documentation Structure (`.docs/`)
- `plans/` - Persistent task plans (survive across sessions)
- `internal-docs/` - Codebase research documentation
- `tmp/` - Throwaway investigation notes

## Architecture Overview

```
~/.claude/
├── settings.json          # Global model settings
└── mcp.json               # MCP server configs

your-project/
├── CLAUDE.md              # Core rules (~4KB, always loaded)
├── .claude/
│   ├── agents/            # 11 behavioral agents
│   ├── commands/          # 12 slash commands
│   ├── skills/            # 13 auto-activating skills
│   ├── docs/              # Reference docs (loaded on-demand)
│   └── settings.local.json
└── .docs/
    ├── plans/             # Persistent task plans
    ├── internal-docs/     # Codebase documentation
    └── tmp/               # Throwaway notes
```

## Key Features

### 1. Token-Optimized CLAUDE.md (~4KB)
Core rules only, reference docs loaded on-demand via `@` mentions:
- RULE #0: Deployment Protocol (never deploy without approval)
- RULE #1: GTM Search from Page 1
- RULE #2: Supabase-First Token Efficiency
- RULE #3: Session Documentation
- RULE #4: Plan-Based Continuity (NEW)
- RULE #5: Parallel Execution Protocol (NEW)

### 2. Agent System (11 Agents)
Specialized behavioral personas:
- `deep-research-agent` - Multi-hop research with adaptive strategies
- `backend-architect` - API/database design
- `frontend-architect` - React/Next.js patterns
- `requirements-analyst` - Scope clarification
- `security-engineer` - Security-focused analysis
- `performance-engineer` - Performance optimization
- `refactoring-expert` - Code cleanup
- `system-architect` - System design
- `tech-stack-researcher` - Technology evaluation
- `technical-writer` - Documentation
- `learning-guide` - Teaching/explaining

### 3. Skills System (13 Skills)
Auto-activating domain expertise:
- `gtm-bulk-operations` - GTM container management (85-97% token savings)
- `deployment-safety` - Production deployment protocols
- `deep-research` - Comprehensive investigation
- `api-development` - Next.js API routes
- `ui-scaffolding` - React components
- `supabase-development` - Edge Functions
- `google-ads-gaql` - GAQL queries
- And more...

### 4. Slash Commands (12 Commands)
Quick-access workflows:
- `/new-task` - Task analysis and planning
- `/api:api-new` - Create API routes
- `/ui:component-new` - Create React components
- `/misc:code-optimize` - Performance optimization
- And more...

### 5. Plan-Based Continuity
Multi-session workflows without context loss:
```
Session 1: Create .docs/plans/feature/parallel-plan.md
Session 2: Reference @.docs/plans/feature/parallel-plan.md (200 tokens vs 2000+ re-explain)
```

## MCP Servers

Configured MCP servers (enable/disable per session):

| Server | Purpose | Command |
|--------|---------|---------|
| gomarble | Google Analytics, Ads | `/mcp enable gomarble` |
| gtm-mcp | GTM operations | `/mcp enable gtm-mcp` |
| supabase-gtm-mcp | Supabase queries | `/mcp enable supabase-gtm-mcp` |
| bigquery | BigQuery queries | Use `bq` CLI instead |

**Tip**: Disable unused MCPs to save context: `/mcp disable bigquery`

## Token Efficiency Comparison

| Scenario | Before | After | Savings |
|----------|--------|-------|---------|
| CLAUDE.md size | 28KB | 4KB | 87% |
| Non-GTM session | 500 tokens | 30 tokens | 94% |
| Multi-session work | Re-explain (2000+) | Reference plan (200) | 90% |
| GTM publishing | 22,000 tokens | 3,500 tokens | 85% |

## Customization

### Adding New Agents
```bash
# Create agent file
touch .claude/agents/my-agent.md
```

```markdown
---
name: my-agent
description: What this agent does
category: category
---

# My Agent

## Triggers
- When to activate

## Behavioral Mindset
How to think...

## Boundaries
What to do / not do...
```

### Adding New Skills
```bash
mkdir .claude/skills/my-skill
touch .claude/skills/my-skill/SKILL.md
```

```markdown
---
name: my-skill
description: |
  What it does. When it activates.
  Triggers: keyword1, keyword2
allowed-tools:
  - Tool1
  - Tool2
---

# My Skill

Instructions in conversational tone...
```

### Adding Slash Commands
```bash
touch .claude/commands/my-command.md
```

```markdown
---
description: What this command does
model: claude-sonnet-4-5
---

Instructions for the command...

## Arguments
$ARGUMENTS
```

## Best Practices

### 1. Use Subagents for Complex Tasks
```
User: "Research authentication options"
→ Claude launches deep-research-agent in separate context
→ Returns findings without filling main context
```

### 2. Plan Before Executing
```
User: "Implement user profiles"
→ Create .docs/plans/user-profiles/parallel-plan.md
→ Execute tasks referencing plan
→ Continue next session with same plan
```

### 3. Parallel Operations
```
User: "Publish all GTM containers"
→ All 13 publishes in single <function_calls> block
→ 5-10x faster, same token cost
```

### 4. Reference Docs On-Demand
```
User: "How do I query GTM?"
→ @.claude/docs/GTM_QUERY_PATTERNS.md loads
→ Only when needed, not always
```

## Maintenance

### Update API Keys
Edit `~/.claude/mcp.json` with new credentials.

### Rotate Supabase Token
```json
{
  "supabase-gtm-mcp": {
    "env": {
      "SUPABASE_ACCESS_TOKEN": "new-token-here"
    }
  }
}
```

### Clean Up Permissions
Periodically review `.claude/settings.local.json` for obsolete entries.

## Troubleshooting

### Skill Not Activating
- Check trigger keywords in SKILL.md description
- Restart Claude Code after changes

### High Token Usage
- Verify skills activate only when needed
- Check if reference docs are loading unnecessarily

### MCP Connection Failed
- Check credentials in `~/.claude/mcp.json`
- Try `/mcp disable <name>` then `/mcp enable <name>`

## Credits

Inspired by [TheTinkeringIdiot's Claude setup](https://github.com/TheTinkeringIdiot/claude) for subagent patterns and plan-based continuity.

## License

MIT
