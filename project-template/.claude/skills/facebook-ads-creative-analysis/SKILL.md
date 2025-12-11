---
name: facebook-ads-creative-analysis
description: |
  Analyze Facebook ad creatives by ID or asset URL with comprehensive performance insights.
  Handles image and video creatives with visual analysis, messaging evaluation, and psychology
  assessment. Triggers: Facebook creative, ad analysis, Facebook ad, creative review, ad performance.
allowed-tools:
  - mcp__gomarble__facebook_analyze_ad_creative_by_id_or_url
  - mcp__gomarble__facebook_get_adaccount_insights
  - mcp__gomarble__facebook_get_details_of_ad_account
  - Read
  - Write
---

# Facebook Ads Creative Analysis Skill

Comprehensive Facebook ad creative analysis with performance insights.

## Usage

### By Ad ID
```typescript
facebook_analyze_ad_creative_by_id_or_url({
  ad_id: "123456789",
  platform: "facebook"
})
```

### By Asset URL
```typescript
facebook_analyze_ad_creative_by_id_or_url({
  assetUrl: "https://cdn.example.com/image.jpg",
  assetType: "image",
  platform: "facebook"
})
```

## Analysis Includes

1. **Visual Elements** - Design, composition, colors
2. **Messaging** - Copy, hooks, CTAs
3. **Psychology** - Emotional triggers, persuasion
4. **Performance** - Engagement indicators
5. **Recommendations** - Optimization suggestions

## Best Practices

- Always get account details first for currency context
- Use `ad_id` when available (gets full metadata)
- Use `assetUrl` for direct visual analysis
- Consider platform context (Facebook vs Instagram)
