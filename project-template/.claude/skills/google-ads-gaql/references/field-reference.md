# Google Ads GAQL Field Reference

## Campaign Resource Fields

### Core Fields
```sql
campaign.id                          -- Campaign ID
campaign.name                        -- Campaign name
campaign.status                      -- ENABLED, PAUSED, REMOVED
campaign.advertising_channel_type    -- SEARCH, SHOPPING, PERFORMANCE_MAX, VIDEO, DISPLAY, DEMAND_GEN
campaign.advertising_channel_sub_type -- Further classification
campaign.bidding_strategy_type       -- MAXIMIZE_CONVERSIONS, TARGET_CPA, TARGET_ROAS, etc.
campaign.campaign_budget             -- Budget resource reference (not the amount!)
campaign.start_date                  -- Start date YYYY-MM-DD
campaign.end_date                    -- End date YYYY-MM-DD
```

### Budget (Separate Resource!)
```sql
-- Query campaign_budget resource, NOT campaign
SELECT
  campaign_budget.id,
  campaign_budget.amount_micros,
  campaign_budget.delivery_method,
  campaign_budget.period
FROM campaign_budget
WHERE campaign_budget.id IN ('budget_id_1', 'budget_id_2')
```

## Ad Group Resource Fields

```sql
ad_group.id                          -- Ad group ID
ad_group.name                        -- Ad group name
ad_group.status                      -- ENABLED, PAUSED, REMOVED
ad_group.type                        -- SEARCH_STANDARD, DISPLAY_STANDARD, etc.
ad_group.campaign                    -- Parent campaign reference
ad_group.cpc_bid_micros              -- CPC bid in micros
ad_group.target_cpa_micros           -- Target CPA in micros
```

## Keyword View Fields

**CRITICAL**: Use `ad_group_criterion` prefix, NOT `keyword`

```sql
-- CORRECT
ad_group_criterion.keyword.text           -- Keyword text
ad_group_criterion.keyword.match_type     -- EXACT, PHRASE, BROAD
ad_group_criterion.criterion_id           -- Keyword criterion ID
ad_group_criterion.status                 -- ENABLED, PAUSED, REMOVED
ad_group_criterion.quality_info.quality_score -- Quality score (1-10)

-- WRONG (will fail)
keyword.text
keyword.match_type
```

## Shopping Performance View Fields

**CRITICAL**: Product fields use `segments` prefix

```sql
-- CORRECT
segments.product_title                    -- Product title
segments.product_item_id                  -- Product ID (SKU)
segments.product_brand                    -- Product brand
segments.product_category_level1          -- Category level 1
segments.product_category_level2          -- Category level 2
segments.product_custom_attribute0        -- Custom label 0
segments.product_type_l1                  -- Product type level 1

-- WRONG (will fail)
shopping_performance_view.product_title
product.title
```

## Performance Max Asset Fields

```sql
-- Asset Group
asset_group.id                            -- Asset group ID
asset_group.name                          -- Asset group name
asset_group.status                        -- Status
asset_group.campaign                      -- Parent campaign

-- Asset Group Asset (linking table)
asset_group_asset.field_type              -- HEADLINE, DESCRIPTION, MARKETING_IMAGE, etc.
asset_group_asset.status                  -- APPROVED, DISAPPROVED, etc.
asset_group_asset.asset                   -- Asset reference

-- Asset
asset.id                                  -- Asset ID
asset.type                                -- IMAGE, YOUTUBE_VIDEO, TEXT, etc.
asset.name                                -- Asset name
asset.image_asset.full_size.url           -- Full image URL
asset.youtube_video_asset.youtube_video_id -- YouTube video ID
asset.text_asset.text                     -- Text content
```

## Metrics Reference

### Core Performance Metrics
```sql
metrics.impressions                       -- Impressions
metrics.clicks                            -- Clicks
metrics.cost_micros                       -- Cost in micros (÷1M for currency)
metrics.conversions                       -- Conversions (primary action)
metrics.conversions_value                 -- Conversion value (revenue)
metrics.all_conversions                   -- All conversions (including cross-device)
metrics.all_conversions_value             -- All conversion value
```

### Rate Metrics
```sql
metrics.ctr                               -- Click-through rate (0.0-1.0)
metrics.average_cpc                       -- Average CPC in micros
metrics.average_cpm                       -- Average CPM in micros
metrics.conversion_rate                   -- Conversion rate
```

### Interaction Metrics
```sql
metrics.interactions                      -- Interactions (clicks, views, etc.)
metrics.interaction_rate                  -- Interaction rate
metrics.engagements                       -- Engagements
metrics.engagement_rate                   -- Engagement rate
```

### Video Metrics
```sql
metrics.video_views                       -- Video views
metrics.video_view_rate                   -- Video view rate
metrics.video_quartile_p25_rate           -- % watched 25%
metrics.video_quartile_p50_rate           -- % watched 50%
metrics.video_quartile_p75_rate           -- % watched 75%
metrics.video_quartile_p100_rate          -- % watched 100%
```

### Quality Metrics
```sql
metrics.search_impression_share           -- Search impression share
metrics.search_top_impression_share       -- Top impression share
metrics.search_absolute_top_impression_share -- Absolute top share
metrics.search_budget_lost_impression_share  -- Lost due to budget
metrics.search_rank_lost_impression_share    -- Lost due to rank
```

## Segments Reference

### Time Segments
```sql
segments.date                             -- Date (YYYY-MM-DD)
segments.week                             -- Week start date
segments.month                            -- Month (YYYY-MM-01)
segments.quarter                          -- Quarter
segments.year                             -- Year
segments.day_of_week                      -- MONDAY, TUESDAY, etc.
segments.hour                             -- Hour (0-23)
```

### Device Segments
```sql
segments.device                           -- MOBILE, DESKTOP, TABLET, CONNECTED_TV
```

### Network Segments
```sql
segments.ad_network_type                  -- SEARCH, SEARCH_PARTNERS, CONTENT, YOUTUBE_SEARCH, etc.
```

### Geo Segments
```sql
segments.geo_target_country               -- Country code
segments.geo_target_region                -- Region
segments.geo_target_city                  -- City
```

## Resource Relationships

```
customer
├── campaign
│   ├── campaign_budget
│   ├── ad_group
│   │   ├── ad_group_ad
│   │   │   └── asset
│   │   └── ad_group_criterion (keywords, etc.)
│   ├── asset_group (PMax)
│   │   └── asset_group_asset
│   │       └── asset
│   └── campaign_criterion
├── keyword_view (aggregate keyword data)
├── shopping_performance_view (product data)
└── campaign_search_term_insight
```

## Field Compatibility

### Cannot Combine
- Item-scoped fields with attribution segments
- `segments.product_*` with non-shopping campaigns
- `keyword_view` with non-search campaigns

### Always Include Together
- `campaign.id` when querying ad_group, keyword_view, etc.
- `ad_group.id` when querying ad_group_ad, ad_group_criterion
