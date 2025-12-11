-- =============================================================================
-- GOOGLE ADS GAQL QUERY TEMPLATES
-- Copy and customize these templates for your queries
-- =============================================================================

-- =============================================================================
-- ACCOUNT LEVEL
-- =============================================================================

-- Account Summary (Last 30 Days)
SELECT
  customer.id,
  customer.descriptive_name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM customer
WHERE segments.date DURING LAST_30_DAYS
LIMIT 1

-- =============================================================================
-- CAMPAIGN LEVEL
-- =============================================================================

-- All Campaigns with Performance
SELECT
  campaign.id,
  campaign.name,
  campaign.status,
  campaign.advertising_channel_type,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- Active Campaigns Only
SELECT
  campaign.id,
  campaign.name,
  campaign.advertising_channel_type,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- Campaign Daily Performance
SELECT
  campaign.id,
  campaign.name,
  segments.date,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.id = 'YOUR_CAMPAIGN_ID'
ORDER BY segments.date DESC
LIMIT 200

-- =============================================================================
-- SEARCH CAMPAIGNS
-- =============================================================================

-- Search Campaigns Overview
SELECT
  campaign.id,
  campaign.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value,
  metrics.search_impression_share
FROM campaign
WHERE campaign.advertising_channel_type = 'SEARCH'
  AND segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- Search Keywords Performance
SELECT
  campaign.id,
  campaign.name,
  ad_group.id,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.quality_info.quality_score,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM keyword_view
WHERE campaign.advertising_channel_type = 'SEARCH'
  AND segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 0
ORDER BY metrics.impressions DESC
LIMIT 200

-- Search Terms (Category Insights)
SELECT
  campaign.id,
  campaign.name,
  campaign_search_term_insight.category_label,
  metrics.clicks,
  metrics.impressions,
  metrics.conversions,
  metrics.cost_micros
FROM campaign_search_term_insight
WHERE campaign_search_term_insight.campaign_id = 'YOUR_CAMPAIGN_ID'
  AND segments.date DURING LAST_30_DAYS
ORDER BY metrics.impressions DESC
LIMIT 200

-- =============================================================================
-- PERFORMANCE MAX CAMPAIGNS
-- =============================================================================

-- PMax Campaigns Overview
SELECT
  campaign.id,
  campaign.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- PMax Product Performance
SELECT
  campaign.id,
  campaign.name,
  segments.product_title,
  segments.product_item_id,
  segments.product_brand,
  metrics.clicks,
  metrics.impressions,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM shopping_performance_view
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 0
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- PMax Asset Groups
SELECT
  campaign.id,
  campaign.name,
  asset_group.id,
  asset_group.name,
  asset_group.status
FROM asset_group
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
LIMIT 200

-- PMax Creative Assets (Images & Videos)
SELECT
  campaign.id,
  campaign.name,
  asset_group.name,
  asset_group_asset.field_type,
  asset.type,
  asset.image_asset.full_size.url,
  asset.youtube_video_asset.youtube_video_id
FROM asset_group_asset
WHERE campaign.advertising_channel_type = 'PERFORMANCE_MAX'
  AND asset.type IN ('IMAGE', 'YOUTUBE_VIDEO')
LIMIT 200

-- =============================================================================
-- SHOPPING CAMPAIGNS
-- =============================================================================

-- Shopping Campaigns Overview
SELECT
  campaign.id,
  campaign.name,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM campaign
WHERE campaign.advertising_channel_type = 'SHOPPING'
  AND segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- Shopping Product Performance
SELECT
  campaign.id,
  campaign.name,
  segments.product_title,
  segments.product_item_id,
  segments.product_brand,
  segments.product_category_level1,
  metrics.clicks,
  metrics.impressions,
  metrics.cost_micros,
  metrics.conversions,
  metrics.conversions_value
FROM shopping_performance_view
WHERE campaign.advertising_channel_type = 'SHOPPING'
  AND segments.date DURING LAST_30_DAYS
  AND metrics.impressions > 0
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- =============================================================================
-- VIDEO CAMPAIGNS
-- =============================================================================

-- Video Campaigns Overview
SELECT
  campaign.id,
  campaign.name,
  metrics.impressions,
  metrics.video_views,
  metrics.video_view_rate,
  metrics.cost_micros,
  metrics.conversions
FROM campaign
WHERE campaign.advertising_channel_type = 'VIDEO'
  AND segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- Video Ad Assets (Step 1: Get asset references)
SELECT
  campaign.id,
  campaign.name,
  ad_group_ad.ad.id,
  ad_group_ad.ad.video_ad.video.asset
FROM ad_group_ad
WHERE campaign.advertising_channel_type = 'VIDEO'
  AND campaign.status IN ('ENABLED', 'PAUSED')
LIMIT 200

-- Video Asset Details (Step 2: Use asset IDs from Step 1)
SELECT
  asset.id,
  asset.youtube_video_asset.youtube_video_id,
  asset.youtube_video_asset.youtube_video_title
FROM asset
WHERE asset.type = 'YOUTUBE_VIDEO'
  AND asset.id IN ('asset_id_1', 'asset_id_2')
LIMIT 200

-- =============================================================================
-- BUDGET INFORMATION
-- =============================================================================

-- Campaign Budget References
SELECT
  campaign.id,
  campaign.name,
  campaign.campaign_budget
FROM campaign
WHERE campaign.id IN ('campaign_id_1', 'campaign_id_2')
LIMIT 200

-- Budget Amounts (use budget IDs from above)
SELECT
  campaign_budget.id,
  campaign_budget.amount_micros,
  campaign_budget.delivery_method
FROM campaign_budget
WHERE campaign_budget.id IN ('budget_id_1', 'budget_id_2')
LIMIT 200

-- =============================================================================
-- AD GROUP LEVEL
-- =============================================================================

-- Ad Groups Performance
SELECT
  campaign.id,
  campaign.name,
  ad_group.id,
  ad_group.name,
  ad_group.status,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM ad_group
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.id = 'YOUR_CAMPAIGN_ID'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- =============================================================================
-- DEVICE & GEO BREAKDOWNS
-- =============================================================================

-- Performance by Device
SELECT
  campaign.id,
  campaign.name,
  segments.device,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200

-- Performance by Country
SELECT
  campaign.id,
  campaign.name,
  segments.geo_target_country,
  metrics.impressions,
  metrics.clicks,
  metrics.cost_micros,
  metrics.conversions
FROM campaign
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.status = 'ENABLED'
ORDER BY metrics.cost_micros DESC
LIMIT 200
