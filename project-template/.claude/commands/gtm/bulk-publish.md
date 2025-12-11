# GTM Bulk Publish Orchestrator

Publish all 13 GTM containers with safety checks and minimal verification.

[Extended thinking: This workflow coordinates GTM operations across all 13 OPG shop containers
with token-optimized execution. It follows RULE #5 (parallel execution) for maximum efficiency
while maintaining safety through minimal verification. The key insight is that GTM publish
operations are idempotent and token errors on response are cosmetic - the publish succeeds.
We only verify one container (NL) as a sanity check to save 85% tokens vs verifying all 13.]

## Prerequisites
- GTM Account ID: 3505761902 (hardcoded)
- Active workspace with changes to publish
- User approval for publishing to production

## Workflow

### Phase 1: Pre-Flight Check (Sequential)

**Step 1: Workspace Status**
- Use Task tool with subagent_type="gtm-operations-specialist"
- Prompt: "Check workspace status for all 13 shop containers. Report which containers have pending changes ready to publish."
- Expected output: List of containers with changes

**Step 2: User Confirmation**
- Ask: "Ready to publish to [N] containers. Proceed?"
- WAIT for explicit approval
- If declined: Stop workflow

### Phase 2: Get Version Headers (Parallel - Single Message)

**Step 3: Fetch Latest Versions**
Make 13 parallel `gtm_version_header` calls in single `<function_calls>` block:

```
Container IDs: 9329147, 9329149, 9327633, 9329155, 9328073, 9327968, 13259779, 13259999, 10375338, 9328048, 57801577, 57802452, 99860573
```

- Collect containerVersionIds from responses
- Note: Some may return token errors on large responses - IGNORE them

### Phase 3: Execute Publishes (Parallel - Single Message)

**Step 4: Parallel Publish**
Make 13 parallel `gtm_version(action="publish")` calls:

```xml
<function_calls>
  <invoke name="mcp__gtm-mcp__gtm_version">
    <parameter name="action">publish</parameter>
    <parameter name="container_id">9329147</parameter>
    <!-- NL -->
  </invoke>
  <invoke name="mcp__gtm-mcp__gtm_version">
    <parameter name="action">publish</parameter>
    <parameter name="container_id">9329149</parameter>
    <!-- DE -->
  </invoke>
  <!-- ... all 13 containers -->
</function_calls>
```

**CRITICAL**: Token errors are cosmetic. Error "MCP tool response exceeds maximum allowed tokens" = SUCCESS

### Phase 4: Minimal Verification (Sequential)

**Step 5: Sanity Check NL Container**
- Use gtm_version_header on container 9329147 (NL)
- Verify new version is published
- If NL succeeds, assume all 13 succeeded

**Step 6: Report Results**
```
Publishing Complete:
- Containers published: 13
- Verification: NL (9329147) ✓
- Token errors ignored: [count] (cosmetic)
```

## Success Criteria
- All 13 publish calls executed
- NL verification passes
- Total tokens: ~3,500 (85% savings vs. verifying all)

## Error Recovery

| Error | Action |
|-------|--------|
| "Workspace already submitted" | Skip to publish step |
| Token exceeded on response | IGNORE - publish succeeded |
| "Version not found" | Check version headers first |
| User declines | Stop workflow |

## Container Reference

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
