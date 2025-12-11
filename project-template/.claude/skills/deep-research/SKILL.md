---
name: deep-research
description: |
  Comprehensive research with multi-hop reasoning, adaptive strategies, and evidence synthesis.
  Handles complex investigations, technical documentation analysis, competitive research,
  and academic-style inquiry. Triggers: research, investigate, analyze comprehensively,
  compare options, find documentation, explain in-depth, gather information, study topic.
allowed-tools:
  - WebSearch
  - WebFetch
  - mcp__plugin_edmunds-claude-code_playwright__*
  - mcp__plugin_edmunds-claude-code_context7__*
  - mcp__context7__*
  - Read
  - Grep
  - Glob
---

# Deep Research Skill

Think like a research scientist crossed with an investigative journalist. Apply
systematic methodology, follow evidence chains, question sources critically, and
synthesize findings coherently.

## Adaptive Planning Strategies

### Planning-Only (Simple/Clear Queries)
- Direct execution without clarification
- Single-pass investigation
- Straightforward synthesis

### Intent-Planning (Ambiguous Queries)
- Generate clarifying questions first
- Refine scope through interaction
- Iterative query development

### Unified Planning (Complex/Collaborative)
- Present investigation plan
- Seek user confirmation
- Adjust based on feedback

## Multi-Hop Reasoning Patterns

**Entity Expansion**
```
Person → Affiliations → Related work → Impact
Company → Products → Competitors → Market position
Concept → Applications → Implications → Future trends
```

**Temporal Progression**
```
Current state → Recent changes → Historical context → Future trajectory
Event → Causes → Consequences → Lessons learned
```

**Conceptual Deepening**
```
Overview → Details → Examples → Edge cases
Theory → Practice → Results → Limitations
```

**Causal Chains**
```
Observation → Immediate cause → Root cause
Problem → Contributing factors → Solutions
```

**Maximum hop depth**: 5 levels
**Track hop genealogy**: Maintain evidence chain for coherence

## Tool Orchestration

### Search Strategy
1. **Broad initial searches** (WebSearch)
   - Cast wide net
   - Identify information landscape
   - Find authoritative sources
2. **Identify key sources**
   - Assess credibility
   - Check recency
   - Note bias
3. **Deep extraction** (WebFetch or Playwright)
   - Static HTML → WebFetch
   - JavaScript content → Playwright
   - Technical docs → Context7
4. **Follow interesting leads**
   - Multi-hop exploration
   - Cross-reference findings
5. **Synthesize findings**
   - Build coherent narrative
   - Connect evidence chains

### Extraction Routing
- **Static HTML** → WebFetch (fast, efficient)
- **JavaScript content** → Playwright (full browser rendering)
- **Technical docs** → Context7 (library documentation)
- **Local files** → Read/Grep/Glob (codebase search)

### Parallel Optimization
- Batch similar searches in single message
- Concurrent extractions when independent
- Never sequential without dependency reason
- Maximize tool call parallelization

## Self-Reflective Mechanisms

### Progress Assessment (After Each Major Step)
- Have I addressed the core question?
- What gaps remain?
- Is my confidence improving?
- Should I adjust strategy?

### Quality Monitoring
- **Source credibility**: Check author, publication, date
- **Information consistency**: Cross-reference claims
- **Bias detection**: Identify potential bias
- **Completeness**: Assess coverage of topic

### Replanning Triggers
- Confidence below 60% → Adjust approach
- Contradictory information >30% → Investigate conflicts
- Dead ends encountered → Try new search angle
- Time/resource constraints → Prioritize high-value sources

## Research Workflow

### 1. Discovery Phase
- Map information landscape
- Identify authoritative sources
- Detect patterns and themes
- Find knowledge boundaries

### 2. Investigation Phase
- Deep dive into specifics
- Cross-reference information
- Resolve contradictions
- Extract insights

### 3. Synthesis Phase
- Build coherent narrative
- Create evidence chains
- Identify remaining gaps
- Generate recommendations

### 4. Reporting Phase
- Executive summary (3-5 key findings)
- Methodology description
- Key findings with evidence
- Analysis and synthesis
- Conclusions with confidence levels
- Complete source list

## Quality Standards

### Information Quality
- Verify key claims when possible
- Prefer recent sources for current topics
- Assess source reliability (academic > blog)
- Detect and mitigate bias

### Synthesis Requirements
- Clear fact vs interpretation
- Transparent contradiction handling
- Explicit confidence statements
- Traceable reasoning chains

### Report Structure

```markdown
# [Research Topic]

## Executive Summary
[3-5 key findings in bullet points]

## Methodology
[How research was conducted: tools used, search strategies, sources consulted]

## Key Findings

### Finding 1: [Title]
[Evidence] [Source citation]
**Confidence**: High/Medium/Low

### Finding 2: [Title]
[Evidence] [Source citation]
**Confidence**: High/Medium/Low

## Analysis
[Synthesis and implications]
[Patterns and themes]
[Contradictions and how resolved]

## Confidence Assessment
- **High confidence**: [Claims with multiple authoritative sources]
- **Medium confidence**: [Single authoritative source or dated info]
- **Low confidence**: [Speculative or unverified claims]

## Remaining Gaps
- [Question 1 not fully answered]
- [Area needing more research]

## Recommendations
1. [Actionable recommendation based on findings]
2. [Next steps for further investigation]

## Sources
1. [URL] - [Description] - [Date accessed]
2. [URL] - [Description] - [Date accessed]
```

## Evidence Management

### Result Evaluation
- Assess information relevance to query
- Check for completeness of answer
- Identify gaps in knowledge
- Note limitations clearly

### Citation Requirements
- Provide sources when available
- Use inline citations for clarity
- Note when information is uncertain
- Link to original sources

### Contradiction Handling
When sources conflict:
1. Note the contradiction explicitly
2. Assess credibility of each source
3. Look for additional sources
4. Present both views if unresolved
5. State which is more credible (if determinable)

## Performance Optimization

- **Cache search results** for related queries
- **Reuse successful patterns** from previous research
- **Prioritize high-value sources** (academic, official docs)
- **Balance depth with time** - know when to stop

## Boundaries

**Excel at**:
- Current events and real-time information
- Technical documentation research
- Competitive analysis
- Evidence-based synthesis
- Multi-source cross-referencing

**Limitations**:
- No paywall bypass
- No private data access
- No speculation without evidence
- No fabrication of sources

## Example Queries This Skill Handles

- "Research the latest trends in serverless architecture"
- "Investigate how major companies handle rate limiting"
- "Compare Next.js 15 vs Remix for our use case"
- "Find best practices for Supabase Row Level Security"
- "What are the trade-offs between REST and GraphQL?"
- "Analyze the performance implications of React Server Components"
