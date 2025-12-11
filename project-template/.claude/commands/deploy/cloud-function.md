# Cloud Function Deployment Orchestrator

Safe Cloud Function deployment with mandatory checklist and approval gates.

[Extended thinking: This workflow enforces RULE #0 (never deploy without asking) through
mandatory pre-deployment research and explicit user approval. The key insight is that
deployment mistakes are costly and often irreversible, so we invest time upfront in
verification. The workflow uses deep research to trace the full flow and identify the
correct deployment target, preventing the common mistake of deploying to the wrong function.]

## CRITICAL: Deployment Safety Protocol

**NEVER** deploy without:
1. Running pre-deployment checklist
2. Identifying correct function via Cloud Scheduler
3. Reading deploy.sh contents
4. Receiving explicit user approval

## Prerequisites
- Google Cloud SDK configured
- Active project with Cloud Functions
- deploy.sh script in project root
- User approval for production deployment

## Workflow

### Phase 1: Research & Identification (Sequential)

**Step 1: Inventory Cloud Functions**
```bash
gcloud functions list --format="table(name,updateTime)"
```
- Document all available functions
- Note last update times

**Step 2: Identify Scheduler Target**
```bash
gcloud scheduler jobs list --location=europe-west1
```
- Find which function Cloud Scheduler calls
- This is the PRODUCTION function

**Step 3: Read deploy.sh**
```bash
cat deploy.sh | grep "gcloud functions deploy"
```
- Verify deploy.sh targets the correct function
- Document what deploy.sh will do

**Step 4: Check Documentation**
- Read CURRENT-DEPLOYMENT-STATUS.md (if exists)
- Read relevant README or docs
- Understand the system architecture

### Phase 2: Analysis & Approval (BLOCKING)

**Step 5: Present Findings**
```
## Deployment Analysis

### Issue Identified
[What triggered the need for deployment]

### Root Cause
[Deep investigation results]

### Deployment Target
Function: [FUNCTION_NAME]
Scheduler Job: [JOB_NAME]
deploy.sh Target: [TARGET_FUNCTION]

### Changes to Deploy
- [Change 1]
- [Change 2]

### Risk Assessment
- [Low/Medium/High]
- [Potential impact]
```

**Step 6: Request Approval**
"Should I deploy to **[SPECIFIC_FUNCTION_NAME]**?"

- WAIT for explicit "yes"
- If user says "no" or is unsure: STOP
- If user asks questions: Answer, then re-ask for approval

### Phase 3: Deployment (Sequential)

**Step 7: Execute deploy.sh**
```bash
./deploy.sh
```
- Monitor output
- Watch for errors

**Step 8: Verify Deployment**
```bash
gcloud functions describe [FUNCTION_NAME] --format="value(updateTime)"
```
- Confirm function was updated
- Check for errors in deployment

### Phase 4: Post-Deployment Validation (Sequential)

**Step 9: Check Logs**
```bash
gcloud functions logs read [FUNCTION_NAME] --limit=10
```
- Look for startup errors
- Verify function is healthy

**Step 10: Test Endpoint (if applicable)**
```bash
curl -X POST https://[REGION]-[PROJECT].cloudfunctions.net/[FUNCTION_NAME]
```
- Verify endpoint responds
- Check for expected behavior

**Step 11: Report Results**
```
## Deployment Complete

Function: [FUNCTION_NAME]
Status: [SUCCESS/FAILED]
Updated: [TIMESTAMP]
Logs: [HEALTHY/ERRORS]

### Next Steps
- [Monitor for issues]
- [Verify downstream systems]
```

## Abort Conditions

| Condition | Action |
|-----------|--------|
| User declines approval | Stop immediately |
| deploy.sh not found | Stop, ask user |
| Function mismatch | Stop, clarify target |
| Scheduler mismatch | Stop, investigate |
| Deployment error | Report, propose fix |

## Pre-Deployment Checklist

- [ ] `gcloud functions list` executed
- [ ] `gcloud scheduler jobs list` executed
- [ ] Cloud Scheduler target identified
- [ ] `deploy.sh` read and understood
- [ ] deploy.sh targets correct function
- [ ] CURRENT-DEPLOYMENT-STATUS.md checked (if exists)
- [ ] Issue and root cause documented
- [ ] User approval received

## NEVER Do These

- ❌ Deploy without user approval
- ❌ Use `gcloud functions deploy` directly (use deploy.sh)
- ❌ Skip pre-deployment checklist
- ❌ Assume function name without verification
- ❌ Deploy to function not in Cloud Scheduler
- ❌ Skip post-deployment verification

## Common Functions Reference

Document your project's Cloud Functions here:

```
# Example entries
purchase-logger-monitor-v2    # Production (Cloud Scheduler calls this)
purchase-logger-monitor       # Legacy (DO NOT deploy)
tracking-health-checker       # Health monitoring
precompute-dashboard-data     # Dashboard precomputation
```
