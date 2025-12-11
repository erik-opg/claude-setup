---
name: feature-planning
description: |
  Create detailed feature implementation plans with technical specifications, risk assessment,
  and realistic estimates. Breaks down features into phases with clear success criteria.
  Triggers: plan feature, feature spec, implementation plan, technical design, architecture plan.
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
---

# Feature Planning Skill

Comprehensive feature planning for solo developers with realistic estimates.

## Planning Framework

### 1. Feature Breakdown
- User stories
- Technical requirements
- Dependencies
- Edge cases
- Success criteria

### 2. Technical Specification
- Architecture overview
- Component/page changes
- Database schema changes
- API endpoints needed
- Technology choices with trade-offs

### 3. Implementation Steps
1. Setup - Dependencies, configuration
2. Database - Schema, migrations, RLS
3. Backend - API routes, validation
4. Frontend - Components, pages, forms
5. Integration - Connect pieces
6. Testing - Unit, integration, E2E
7. Polish - Error handling, loading states

### 4. Risk Assessment
- Technical risks
- Time risks
- Dependency risks
- Data risks

### 5. Estimation (Solo Developer)
- Small: 1-2 hours
- Medium: Half day
- Large: 1-2 days
- Complex: 3-5 days
- **Rule: Double initial estimate**

### 6. Success Criteria
- ✅ Feature works as specified
- ✅ Tests pass
- ✅ No console errors
- ✅ Accessible & responsive
- ✅ Error handling & loading states
- ✅ Documentation updated

## Output Format

```markdown
# Feature: [Name]

## Overview
- Problem: [What problem does this solve?]
- Users: [Who is it for?]
- Key functionality: [What it does]

## Technical Design
- Frontend: [Components needed]
- API: [Endpoints]
- Database: [Schema changes]
- State: [Management approach]

## Implementation Plan

### Phase 1: Foundation (Day 1)
- [ ] Task 1
- [ ] Task 2

### Phase 2: Core (Day 2-3)
- [ ] Task 3
- [ ] Task 4

### Phase 3: Polish (Day 4)
- [ ] Task 5
- [ ] Task 6

## File Changes
- New: [Files to create]
- Modified: [Files to update]

## Dependencies
npm install [packages]

## Testing Strategy
- Unit tests
- Integration tests
- E2E tests

## Rollout
- Feature flag
- Monitoring
- Rollback plan
```
