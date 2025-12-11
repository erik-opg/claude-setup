---
name: deployment-safety
description: |
  Enforce production deployment safety protocols for Google Cloud Functions and services.
  Prevents unauthorized deployments, ensures verification, and maintains quality standards.
  Triggers: deploy, push to production, update cloud function, release, ship code, gcloud deploy,
  deployment request, production push, cloud function update.
allowed-tools:
  - Bash(gcloud functions list:*)
  - Bash(gcloud scheduler jobs list:*)
  - Bash(gcloud run:*)
  - Bash(cat:*)
  - Bash(grep:*)
  - Bash(./deploy.sh:*)
  - Bash(git:*)
  - Read
  - Grep
  - AskUserQuestion
---

# Deployment Safety Protocol

**🔴 CRITICAL RULE**: NEVER DEPLOY ANYTHING WITHOUT ASKING USER FIRST

## The Protocol

1. **Identify Issue**: Find bug/problem
2. **Research & Fix**: Create solution
3. **Verify Target**: Which function/service needs deployment?
4. **STOP & ASK**: Request permission with evidence
5. **Wait for Approval**: User must confirm
6. **Deploy Safely**: Use deploy.sh only (never custom gcloud commands)
7. **Verify Success**: Check logs and functionality

## Why This Protocol Exists

- User may want to check the fix first
- Prevents fake/incomplete fixes from going live
- Gives user control over production changes
- Production systems are delicate and require approval
- **Prevents deploying to wrong function/service**

## Pre-Deployment Checklist (MANDATORY - DO NOT SKIP!)

### Step 1: Identify Active Functions (2 min)

```bash
# List all functions
gcloud functions list --format="table(name,updateTime)"

# Check Cloud Scheduler to see which are actively used
gcloud scheduler jobs list --location=europe-west1 --format="table(name,schedule,httpTarget.uri)"

# Check Cloud Run services
gcloud run services list --platform=managed --format="table(name,region,url)"
```

### Step 2: Verify Deployment Target (2 min)

```bash
# What does deploy.sh say?
cd [function-directory]
cat deploy.sh | grep "gcloud functions deploy"
# OR
cat deploy.sh | grep "gcloud run deploy"
```

**Example output**:
```
gcloud functions deploy slack-purchase-logger-monitor-v2
```

### Step 3: Read Documentation (3 min)

Check these files for context:
- `/docs/CURRENT-DEPLOYMENT-STATUS.md` (if exists)
- Most recent `SESSION_LOG_*.md` (if exists)
- Function's `PROGRESS.md` or `README.md` (if exists)

### Step 4: Ask User for Confirmation (MANDATORY)

**Required Format**:
```
I found the issue: [EXPLAIN ISSUE]

My analysis shows:
- Function [X] is used for [PURPOSE] (evidence: Cloud Scheduler / deploy.sh / docs)
- I should deploy to: [SPECIFIC FUNCTION NAME]
- Changes: [LIST CHANGES]

Should I deploy to [SPECIFIC FUNCTION NAME]?
```

Use `AskUserQuestion` tool to formally request approval:

```typescript
AskUserQuestion({
  questions: [{
    question: "Should I deploy to [SPECIFIC FUNCTION NAME]?",
    header: "Deploy?",
    multiSelect: false,
    options: [
      {
        label: "Yes, deploy the fix",
        description: "Deploy to production now"
      },
      {
        label: "No, let me review first",
        description: "I want to check the code before deployment"
      },
      {
        label: "Show me the diff",
        description: "Show exact changes before deciding"
      }
    ]
  }]
})
```

### Step 5: Deploy & Verify

```bash
# Use deploy.sh - DON'T write custom gcloud commands
cd [function-directory]
./deploy.sh

# Check logs after deployment
gcloud functions logs read [FUNCTION-NAME] --limit=50
# OR
gcloud run services logs read [SERVICE-NAME] --limit=50

# Verify endpoint responds correctly
curl [ENDPOINT-URL]
```

## Deep Dive Research Protocol

For EVERY deployment problem, do deep dive research from scratch:

### ✅ Do This (Deep Dive):
- Check the WHOLE flow, not just surface-level
- Trace data from source to destination
- Verify assumptions with actual queries/tests
- Look for root causes, not symptoms
- Check related systems that might be affected

### ❌ Don't Do This (Shallow):
- Make quick assumptions
- Apply band-aid fixes without context
- Skip verification steps
- Rush to deploy

### Example Deep Dive

**Problem**: "/check shows wrong data quality metrics"

**❌ SHALLOW FIX**:
1. Assume calculation is wrong
2. Change formula
3. Deploy

**✅ DEEP DIVE**:
1. What data is /check querying? (Check actual query)
2. What table/schema is it using? (Verify against BigQuery)
3. Run the same query manually - what results?
4. Compare /check output vs manual query results
5. Check if schema changed recently (V1 vs V2)
6. Trace full flow: ingestion → storage → query → display
7. **Root cause**: Using OLD schema (nl_purchases) instead of NEW (all_events)
8. Fix: Update to V2 schema
9. **Ask user before deploying**

## Quality Over Speed

**Take your time - we need GOOD output, not QUICK sloppy output**

### Quality Standards
- ✅ Thorough investigation before proposing solutions
- ✅ Test queries manually before deployment
- ✅ Verify assumptions with actual data
- ✅ Consider edge cases and side effects
- ✅ Explain findings clearly to user
- ❌ Don't rush to "fix" without understanding
- ❌ Don't deploy untested changes
- ❌ Don't make assumptions without verification

### Time Investment Priority
1. Understanding the problem (30% of time)
2. Researching full context (30% of time)
3. Developing solution (20% of time)
4. Testing and verification (15% of time)
5. Getting user approval (5% of time)

### Remember
- Delicate production code requires careful handling
- One well-researched fix > three quick patches
- User trust is built on quality, not speed

## NEVER

- ❌ Assume which function is production
- ❌ Deploy without checking Cloud Scheduler
- ❌ Deploy without reading deploy.sh
- ❌ Deploy without user confirmation
- ❌ Use custom gcloud commands instead of deploy.sh
- ❌ Skip verification steps after deployment

## Deployment Decision Tree

```
Issue Found
    ↓
Research & Create Fix
    ↓
Which function needs deployment?
    ↓
Run Step 1-3 Checklist
    ↓
Have evidence which function?
    ↓─NO → Re-research, check docs
    ↓
   YES
    ↓
Ask user with evidence (Step 4)
    ↓
User approves?
    ↓─NO → Don't deploy, explain reasoning
    ↓
   YES
    ↓
Deploy via deploy.sh
    ↓
Verify success
    ↓
Report results to user
```

## Example Approval Request

**Good Example**:
```
I found the bug in queryShopsOptimizedFast().

**Issue**: Function returns cached data even when cache is stale because
TTL check uses `>` instead of `>=`.

**Root Cause**: Line 145 in index.js: `if (age > TTL)` should be `if (age >= TTL)`

**Fix**: Change comparison operator to include equality case.

**Deployment Target Analysis**:
- Cloud Scheduler shows `slack-purchase-logger-monitor-v2` is used for /check endpoint
- deploy.sh in purchase-logger/ targets `slack-purchase-logger-monitor-v2`
- CURRENT-DEPLOYMENT-STATUS.md confirms v2 is production

**Should I deploy to slack-purchase-logger-monitor-v2?**
```

**Bad Example**:
```
❌ "I found the bug, fixed it, and deployed revision 00024"
❌ "I should deploy to slack-purchase-logger-monitor, correct?" (assuming without verifying)
```

## Post-Deployment Verification

After deployment succeeds:

1. **Check logs** for any immediate errors
2. **Test endpoint** with real request
3. **Verify behavior** matches expected fix
4. **Monitor** for 5-10 minutes
5. **Report success** to user with evidence

## Rollback Protocol

If deployment causes issues:

1. **Immediately inform user**
2. **Describe the problem** observed
3. **Ask permission to rollback** (don't assume)
4. **Use previous revision** if approved
5. **Document what went wrong** for learning
