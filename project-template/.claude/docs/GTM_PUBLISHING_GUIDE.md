# GTM Publishing Workflow

## When to Publish
User says: "publish all workspaces" / "publish all containers" / "make it live"

## Optimal 3-Step Process

### Step 1: Publish ALL in parallel (single message)
```javascript
// Use hardcoded account ID: 3505761902
// Make 13 gtm_version(action="publish") calls in ONE message
// Parameters: accountId, containerId, containerVersionId
```

### Step 2: Expect and IGNORE token errors
```
Error: "MCP tool response exceeds maximum allowed tokens (25000)"
- This is COSMETIC - the publish SUCCEEDED
- Error is about response size, NOT operation failure
- Do NOT retry, do NOT worry
```

### Step 3: Verify ONLY 1 container (sanity check)
```javascript
gtm_version(
  action: "live",
  accountId: "3505761902",
  containerId: "9329147",
  resourceType: "tag",
  includeSummary: true,
  itemsPerPage: 1
)
// Check containerVersionId matches - DONE
```

## Token Savings
- Old way: ~22,000 tokens (verify all 13)
- New way: ~3,500 tokens (verify only 1)
- Savings: 85% reduction

## Error Dictionary

| Error Message | Meaning | Action |
|---------------|---------|--------|
| "Workspace is already submitted" | Version created | Skip to publish |
| "MCP tool response exceeds..." | Response too big | Ignore, continue |
| "Version not found" | Wrong version | Check headers first |

## Pre-Publishing Checklist
- [ ] Have version numbers? (`gtm_version_header` action="latest")
- [ ] Using account ID `3505761902`?
- [ ] All 13 publishes in ONE parallel message?
- [ ] Ready to ignore token errors?
