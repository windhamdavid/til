# Greenwood Calendar

## Log 

- **25/07/08**
  - stripped down database
  - converted all tables to InnoDB and ut8mb4_unicode_ci ( or 520_ci )
  - localhost version running
- **25/07/07**
  - fixed CloudFlare DNS
  - migrated DNS back to host
  - removed unused files and databases
  - removed unused databases
  - archived and zip'd all removals
  - down from **50 to 30GB**
- **25/06/28** 
  - accepted tech admin account on bluehost
  - modified existing user to administrator
  - inventoried site
  - inspected logs
  - installed query monitor to inspect performance and errors
  - billed two(2) hours


## Info 
162.241.216.248

ns1.bluehost.com
ns2.bluehost.com

CARTER.NS.CLOUDFLARE.COM
KEYLA.NS.CLOUDFLARE.COM


**48.78 GB of the 50 GB of storage available**



:::danger[Fault Summary]

The slowness on the front and backend is a combination of these factors:  
```15+ sec pages loads on back and 6+ on front```
- database is bloated with unused tables
- PHP errors on all pages including the admin areas 
  - mostly coming from plugins and theme
- mis-configured W3 Cache plugin
  - many of the slow database queries are coming from ```\W3TCCache_WpdbNEW```
- Cloudflare is not configured but activated
- low powered host


Other items:
- unused files scattered in the ```http``` directory
- FTP users (37)?
- unused databases (14)?
- formatting and display errors on site
  - broken links/images - would need to put a crawler on it to find all and repair. 
- slow page performance
  - Lighthouse Core Vitals fail ( 47 ) in majority of tests - https://pagespeed.web.dev/analysis/https-greenwoodcalendar-com/risk18pcla?form_factor=mobile

**NO changes were made because I'd want to get a full backup beforehand.**

:::



:::tip[Recommendations]

Since you mentioned that you installed w3 total cache as the last step before the noticeable slowdown  
 I would recommend disabling it as a good start. You're also likely seeing slowness from the shared hosting downgrade. You might consider rebuilding the database using imports and reversing out all existing plugins to eliminate errors. Considering your budget and the lifespan of the project  
 but for now you could start backing out some of the unused plugins and database tables as a more simple method of improving performance. 

I could test some some minor changes in about ```5``` **hours**  
 but it would take me ```20+``` **hours** to get it tuned up. The database cleanup is mostly manual and I'd need to run a localhost version to test the plugin and theme dependencies as I clean them. Your site theme is also no longer available via [Envato](https://themeforest.net/item/the-issue-most-versatile-magazine-theme/23448818) -  [(author)](https://themeforest.net/user/fuelthemes/portfolio) which means it's not being updated and will likely incure more errors. To have it back in tip top shape with a new theme it's likely ```40+``` hours of work. 



:::

You can now inspect the load times  
 errors  
 and performance on each page using the query monitor tool.  
![greenwood-calendar](/img/gwcal.jpg)

### Overview 

CPanel is also very slow which indicates that you've got memory issues. The solution is to lesson your memory usage or increase the memory on your host. I'm getting a consistent 6.78s load time on the home page. A load time of more than 2 seconds is considered bad both from a user experience perspective and crawlers. Search engine results are also affected by performance. 

### Errors

Backend:
- W3-Total Cache has a misconfigured CDN engine ( nothing set ) 
- Deprecated	Creation of dynamic property TheIssue_plugin::$plugin_name is deprecated	+ wp-content/plugins/theissue-plugin/plugin.php:43
- Deprecated	Constant FILTER_SANITIZE_STRING is deprecated	+
wp-content/themes/theissue/inc/admin/welcome/fuelthemes.php:788
- Deprecated	Constant FILTER_SANITIZE_STRING is deprecated	+
wp-content/plugins/theissue-plugin/inc/one-click-demo-import/inc/OneClickDemoImport.php:536
- Deprecated	strpos(): Passing null to parameter #1 ($haystack) of type string is deprecated	+
wp-content/plugins/theissue-plugin/inc/one-click-demo-import/inc/OneClickDemoImport.php:537
- Deprecated	strpos(): Passing null to parameter #1 ($haystack) of type string is deprecated	+
wp-includes/functions.php:7360
1	Plugin: the-events-calendar
- Deprecated	str_replace(): Passing null to parameter #3 ($subject) of type array|string is deprecated	+
wp-includes/functions.php:2195
1	Plugin: the-events-calendar
- Deprecated	Constant FILTER_SANITIZE_STRING is deprecated	+
wp-content/plugins/theissue-plugin/inc/misc.php:5
- Function _load_textdomain_just_in_time was called incorrectly. Translation loading for the js_composer domain was triggered too early. This is usually an indicator for some code in the plugin or theme running too early. Translations should be loaded at the init action or later. (This message was added in version 6.7.0.)	+
_load_textdomain_just_in_time()
Plugin: js_composer
- Function register_sidebar was called incorrectly. No id was set in the arguments array for the "" sidebar. Defaulting to "". Manually set the id to "" to silence this notice and keep existing sidebar content. (This message was added in version 4.2.0.)	+
register_sidebar() Theme


Frontend:
```sh
Deprecated	Creation of dynamic property TheIssue_plugin::$plugin_name is deprecated	+
wp-content/plugins/theissue-plugin/plugin.php:43
1	Plugin: theissue-plugin
Deprecated	Creation of dynamic property thb_ShareCount::$raw_url is deprecated	+
wp-content/themes/theissue/inc/framework/thb-social-shares/social-share-api.php:32
17	Plugin: theissue-plugin
Deprecated	Automatic conversion of false to array is deprecated	+
wp-content/themes/theissue/inc/framework/thb-social-shares/social-share-functions.php:25
1	Plugin: theissue-plugin
```


## Host
- BlueHost ( shared )
- Pin ********

### FTP/SSH

user@ ***.***.***.***  
user / @greenwoodcalendar.com    
pass ******************  
wp-user: ********/******* *******  
ID: 3197

### User

wp-user: *****/*****************  
ID: *****



## Server

- IP ( shared ) - 162.241.216.248
- Linux Kernal - 4.19.286-203.ELK.el7.x86_64
- Apache - 2.4.59
- MySQL -	5.7.23-23
- CPanel - 110.0 (build 68)
- 37 FTP accounts 
  - vast majority are random strings e.g. - ss-91a264361fe511e6@greenwoodcalender.com
- Logs
  - last logs stored are from 2023??


### Crawler 

```sh
./crawler \
--url=https://greenwoodcalendar.com \
  --disable-javascript  \
  --disable-styles \
  --disable-fonts \
  --disable-images \
  --disable-files
```

### Files 

- .website_e2abb3a4
- dev
- hemlockct
- fequeronandsons
- heritagecompany
- /home/greenwood/www/www
- igreenwoodsc
- 👉🏻 landerfilmfestival
- robertfstevenson
- robertfstevenson-old2
- robertfstevenson-old
- robertsellsgreenwood
- springfieldcalendar
- staging
- staging_backup
- website_9f50938f
- wordpress



### Database

- db: greenwx6_greenwood_calendar2013
- prefix: wp_Gc13_
- size: 1.12GB
- Majority of tables are formatted with MyISAM --> Need to be converted to InnoDB
- Duplicated sets of tables: other prefix wpstg0  
 
- unused tables - old gravity forms  
 BuddyPress  
 IG contacts  
 MLW quizzes  
 totalsoft  
 etc. 

databases: 
  - greenwx6_337 - N/A
  - greenwx6_boMvsx3 - http://dev.heritagecompany.com
  - greenwx6_calendar - N/A
  - greenwx6_classifieds - http://greenwoodcalendar.com/classifieds
  - greenwx6_d8c - N/A
  - 👉🏻 greenwx6_greenwood_calendar2013 👉🏻 GreenwoodCalendar
  - greenwx6_jzhkSvt - http://heritagecompany.com
  - greenwx6_ss_dbname46d - http://www.igreenwoodsc.com/
  - greenwx6_ss_dbnamec0c - https://www.robertfstevenson.com
  - greenwx6_surebuilder - N/A
  - greenwx6_wordpress8b5 - http://www.greenwoodcalendar.com/
  - greenwx6_WP034 - http://greenwoodcalendarmedia.com
  - greenwx6_wp215 - https://greenwoodcalendar.com/staging/1676341279623
  - greenwx6_WPAVL - https://greenwoodcalendar.com/1676341279623
  - 👉🏻 greenwx6_WPQ4D 👉🏻 LanderFilmFestival
  - greenwx6_wp_u9y3 - http://greenwoodcalendar.com





### Query Monitor

slow queries:
```sql
SELECT P.ID
FROM wp_Gc13_posts AS P
WHERE P.post_type IN ('post'  
 'page'  
 'attachment'  
 'eventbrite_events'  
 'facebook_events'  
 'tribe_events'  
 'jetpack-portfolio'  
 'jetpack-testimonial')
AND P.post_status NOT IN ('auto-draft')
AND P.ID not in (
SELECT I.object_id from wp_Gc13_yoast_indexable as I
WHERE I.object_type = 'post'
AND I.version = 2 )
LIMIT 2	+
W3TC\DbCache_WpdbNew->default_query
0.1298
SELECT COUNT(P.ID)
FROM wp_Gc13_posts AS P
LEFT JOIN wp_Gc13_yoast_indexable AS I
ON P.ID = I.object_id
AND I.link_count IS NOT NULL
AND I.object_type = 'post'
LEFT JOIN wp_Gc13_yoast_seo_links AS L
ON L.post_id = P.ID
AND L.target_indexable_id IS NULL
AND L.type = 'internal'
AND L.target_post_id IS NOT NULL
AND L.target_post_id != 0
WHERE ( I.object_id IS NULL
OR L.post_id IS NOT NULL )
AND P.post_status = 'publish'
AND P.post_type IN ('post'  
 'page'  
 'attachment'  
 'eventbrite_events'  
 'facebook_events'  
 'tribe_events'  
 'jetpack-portfolio'  
 'jetpack-testimonial')
```

duplicate queries
```sql
3	0.0015	W3TC\DbCache_WpdbNew->default_query
3 calls
wfUtils::getIPAndServerVariable
1 call
wordfence::veryFirstAction
1 call
wordfence::admin_menus
1 call
SELECT *
FROM wp_Gc13_wfNotifications
WHERE new = 1
AND ctime > 0
ORDER BY priority ASC  
 ctime DESC	2	0.0018	W3TC\DbCache_WpdbNew->default_query
2 calls
wordfence::admin_menus
1 call
wordfence::admin_menus_20
1 call
SELECT name  
 val  
 autoload
FROM wp_Gc13_wfConfig
WHERE name = 'onboardingAttempt3'	10	0.0054	W3TC\DbCache_WpdbNew->default_query
10 calls
wfOnboardingController::shouldShowAttempt1
5 calls
wfOnboardingController::shouldShowAttempt2
5 calls
SELECT name  
 val  
 autoload
FROM wp_Gc13_wfConfig
WHERE name = 'onboardingAttempt2'	5	0.0016	W3TC\DbCache_WpdbNew->default_query
5 calls
wfOnboardingController::shouldShowAnyAttempt
3 calls
wfOnboardingController::_enqueue_scripts
1 call
wfOnboardingController::_pre_plugins
1 call
SELECT autoload
FROM wp_Gc13_options
WHERE option_name = 'wpseo'
LIMIT 1	4	0.0013	W3TC\DbCache_WpdbNew->default_query
4 calls
Yoast\WP\SEO\Actions\Indexing\Indexable_Post_Type_Archive_Indexation_Action->get_total_unindexed
1 call
Yoast\WP\SEO\Actions\Indexing\Indexable_General_Indexation_Action->get_total_unindexed
1 call
Yoast\WP\SEO\Actions\Indexing\Abstract_Indexing_Action->get_total_unindexed
2 calls
SELECT option_value
FROM wp_Gc13_options
WHERE option_name = 'home'
LIMIT 1	3	0.0055	W3TC\DbCache_WpdbNew->default_query
3 calls
Automattic\Jetpack\My_Jetpack\Product::get_site_features_from_wpcom
1 call
Automattic\Jetpack\Current_Plan::refresh_from_wpcom
1 call
Automattic\Jetpack\My_Jetpack\Wpcom_Products::get_site_current_purchases
1 call
SELECT option_value
FROM wp_Gc13_options
WHERE option_name = 'siteurl'
LIMIT 1	3	0.0013	W3TC\DbCache_WpdbNew->default_query
3 calls
Automattic\Jetpack\My_Jetpack\Product::get_site_features_from_wpcom
1 call
Automattic\Jetpack\Current_Plan::refresh_from_wpcom
1 call
Automattic\Jetpack\My_Jetpack\Wpcom_Products::get_site_current_purchases
```

## WordPress

### User

### Plugins

I think you could get rid of the Bakery  
 Boost  
 W3 Cache  
 Social Settings  
 Cloudflare  
 Jetpack  
 wp-Optimize  
 & image optimizer without sacrificing functionality or impacting performance. 

- deleted
  - admin-block-country
  - wfcache
- MU
  - Endurance page/browser cache
  - SSO
  - wp-staging optimizer
  - ai1wm-backups
  - boost-cache
  - envato-backups
  - ewww
  - flagallery
  - infinitewp
  - jefpack-waf
- askimet
- cloudflare
  - don't have account
- events-calendar
- ewww-image-optimizer
- flagallery-skins
- import-eventbrite-events
- import-facebook-events
- jetpack
- jetpack-boost
- js_composer
- pdf-embedder
- theissue-plugin
- w3-total-cache
  - disk cache 
- wordfence
- wordpress-seo
- wp-optimize


### Theme

- theissue


### Content

#### Pages 

26 Total 

#### Posts

3829 Published

### Tables

```sql
ALTER TABLE wp_Gc13_commentmeta ENGINE=InnoDB;
ALTER TABLE wp_Gc13_comments ENGINE=InnoDB;
ALTER TABLE wp_Gc13_links ENGINE=InnoDB;
ALTER TABLE wp_Gc13_options ENGINE=InnoDB;
ALTER TABLE wp_Gc13_postmeta ENGINE=InnoDB;
ALTER TABLE wp_Gc13_posts ENGINE=InnoDB;
ALTER TABLE wp_Gc13_users ENGINE=InnoDB;
ALTER TABLE wp_Gc13_usermeta ENGINE=InnoDB;


ALTER TABLE wp_Gc13_links ENGINE=InnoDB;
ALTER TABLE wp_Gc13_terms ENGINE=InnoDB;
ALTER TABLE wp_Gc13_term_taxonomy ENGINE=InnoDB;
ALTER TABLE wp_Gc13_term_relationships ENGINE=InnoDB;
ALTER TABLE wp_Gc13_commentmeta ENGINE=InnoDB;

alter table wp_Gc13_ewwwio_queue convert to character set utf8mb4 collate utf8mb4_unicode_ci;

```

### DB Tables

```wp_Gc13_ ``` is production prefix
```wpstg0``` looks like it was created by a staging plugin

❌ remove, ⚠️ maybe, ✅ keep, & ❇️ system


⚠️ wp_Gc13_actionscheduler_actions  
⚠️ wp_Gc13_actionscheduler_claims  
⚠️ wp_Gc13_actionscheduler_groups  
⚠️ wp_Gc13_actionscheduler_logs  

❌ wp_Gc13_advps_optionset  
❌ wp_Gc13_advps_thumbnail  

❌ wp_Gc13_aioseo_cache  
❌ wp_Gc13_aioseo_notifications  
❌ wp_Gc13_aioseo_posts  

❌ wp_Gc13_awpcp_ad_regions  
❌ wp_Gc13_awpcp_adfees  
❌ wp_Gc13_awpcp_admeta  
❌ wp_Gc13_awpcp_ads  
❌ wp_Gc13_awpcp_categories  
❌ wp_Gc13_awpcp_credit_plans  
❌ wp_Gc13_awpcp_media  
❌ wp_Gc13_awpcp_payments  
❌ wp_Gc13_awpcp_tasks  

❌ wp_Gc13_bp_activity  
❌ wp_Gc13_bp_activity_meta  
❌ wp_Gc13_bp_friends  
❌ wp_Gc13_bp_groups  
❌ wp_Gc13_bp_groups_groupmeta  
❌ wp_Gc13_bp_groups_members  
❌ wp_Gc13_bp_messages_messages  
❌ wp_Gc13_bp_messages_meta  
❌ wp_Gc13_bp_messages_notices  
❌ wp_Gc13_bp_messages_recipients  
❌ wp_Gc13_bp_notifications  
❌ wp_Gc13_bp_notifications_meta  
❌ wp_Gc13_bp_user_blogs  
❌ wp_Gc13_bp_user_blogs_blogmeta  
❌ wp_Gc13_bp_xprofile_data  
❌ wp_Gc13_bp_xprofile_fields  
❌ wp_Gc13_bp_xprofile_groups  
❌ wp_Gc13_bp_xprofile_meta  

❌ wp_Gc13_bv_activities_store  

❌ wp_Gc13_cartflows_ca_cart_abandonment  
❌ wp_Gc13_cartflows_ca_email_history  
❌ wp_Gc13_cartflows_ca_email_templates  
❌ wp_Gc13_cartflows_ca_email_templates_meta 

❌ wp_Gc13_ce4wp_abandoned_checkout  
❌ wp_Gc13_ce4wp_contacts  

❇️ wp_Gc13_commentmeta  
❇️ wp_Gc13_comments  

❌ wp_Gc13_cpk_wpcsv_export_queue  
❌ wp_Gc13_cpk_wpcsv_log  

❌ wp_Gc13_crw_crosswords  
❌ wp_Gc13_crw_editors  
❌ wp_Gc13_crw_projects  

❌ wp_Gc13_ctf_feeds_posts  
❌ wp_Gc13_ctf_posts  

❌ wp_Gc13_e_events  

❌ wp_Gc13_em_bookings  
❌ wp_Gc13_em_events  
❌ wp_Gc13_em_locations  
❌ wp_Gc13_em_meta  
❌ wp_Gc13_em_tickets  
❌ wp_Gc13_em_tickets_bookings  

⚠️ wp_Gc13_ewwwio_images  
⚠️ wp_Gc13_ewwwio_queue  

❌ wp_Gc13_flag_album  
❌ wp_Gc13_flag_comments  
❌ wp_Gc13_flag_gallery  
❌ wp_Gc13_flag_pictures  

❌ wp_Gc13_frm_fields  
❌ wp_Gc13_frm_forms  
❌ wp_Gc13_frm_item_metas  
❌ wp_Gc13_frm_items  

⚠️ ✅ awp_Gc13_gf_addon_feed  
⚠️ ✅ awp_Gc13_gf_addon_payment_callback  
⚠️ ✅ awp_Gc13_gf_addon_payment_transaction  
⚠️ ✅ awp_Gc13_gf_draft_submissions  
⚠️ ✅ awp_Gc13_gf_entry  
⚠️ ✅ awp_Gc13_gf_entry_meta  
⚠️ ✅ awp_Gc13_gf_entry_notes  
⚠️ ✅ awp_Gc13_gf_form  
⚠️ ✅ awp_Gc13_gf_form_meta  
⚠️ ✅ awp_Gc13_gf_form_revisions  
⚠️ ✅ awp_Gc13_gf_form_view  
⚠️ ✅ awp_Gc13_gf_rest_api_keys  

❌ wp_Gc13_gg_folders  
❌ wp_Gc13_gg_galleries  
❌ wp_Gc13_gg_galleries_excluded  
❌ wp_Gc13_gg_galleries_resources  
❌ wp_Gc13_gg_photos  
❌ wp_Gc13_gg_photos_pos  
❌ wp_Gc13_gg_photos_settings  
❌ wp_Gc13_gg_settings_presets  
❌ wp_Gc13_gg_settings_sets  
❌ wp_Gc13_gg_stats  
❌ wp_Gc13_gg_tags  

❌ wp_Gc13_ig_actions  
❌ wp_Gc13_ig_blocked_emails  
❌ wp_Gc13_ig_campaigns  
❌ wp_Gc13_ig_contact_meta  
❌ wp_Gc13_ig_contactmeta  
❌ wp_Gc13_ig_contacts  
❌ wp_Gc13_ig_contacts_ips  
❌ wp_Gc13_ig_forms  
❌ wp_Gc13_ig_links  
❌ wp_Gc13_ig_lists  
❌ wp_Gc13_ig_lists_contacts  
❌ wp_Gc13_ig_mailing_queue  
❌ wp_Gc13_ig_queue  
❌ wp_Gc13_ig_sending_queue  
❌ wp_Gc13_ig_workflows  
❌ wp_Gc13_ig_workflows_queue 

❌ wp_Gc13_iwp_backup_status 

❌ wp_Gc13_jetpack_sync_queue  

❇️ wp_Gc13_links  

❌ wp_Gc13_mlw_qm_audit_trail  
❌ wp_Gc13_mlw_question_terms  
❌ wp_Gc13_mlw_questions  
❌ wp_Gc13_mlw_quiz_theme_settings  
❌ wp_Gc13_mlw_quizzes  
❌ wp_Gc13_mlw_results  
❌ wp_Gc13_mlw_themes  

❌ wp_Gc13_ms_snippets  

❌ wp_Gc13_mwai_filemeta  
❌ wp_Gc13_mwai_files  

❌ wp_Gc13_my_calendar  
❌ wp_Gc13_my_calendar_categories  
❌ wp_Gc13_my_calendar_category_relationships  
❌ wp_Gc13_my_calendar_events  
❌ wp_Gc13_my_calendar_location_relationships  
❌ wp_Gc13_my_calendar_locations  
❌ wp_Gc13_my_calendar_payments  

❇️ wp_Gc13_options  

❌ wp_Gc13_pmxe_exports  
❌ wp_Gc13_pmxe_google_cats  
❌ wp_Gc13_pmxe_posts  
❌ wp_Gc13_pmxe_templates  

❇️ wp_Gc13_postmeta  
❇️ wp_Gc13_posts  

❌ wp_Gc13_posts_backup  

❌ wp_Gc13_presto_player_audio_presets  
❌ wp_Gc13_presto_player_email_collection  
❌ wp_Gc13_presto_player_presets  
❌ wp_Gc13_presto_player_videos  
❌ wp_Gc13_presto_player_visits  
❌ wp_Gc13_presto_player_webhooks  

❌ wp_Gc13_rank_math_internal_links  
❌ wp_Gc13_rank_math_internal_meta  
❌ wp_Gc13_rank_math_redirections  
❌ wp_Gc13_rank_math_redirections_cache 

❌ wp_Gc13_rg_form  
❌ wp_Gc13_rg_form_meta  
❌ wp_Gc13_rg_form_view  
❌ wp_Gc13_rg_incomplete_submissions  
❌ wp_Gc13_rg_lead  
❌ wp_Gc13_rg_lead_detail  
❌ wp_Gc13_rg_lead_detail_long  
❌ wp_Gc13_rg_lead_meta  
❌ wp_Gc13_rg_lead_notes  
❌ wp_Gc13_rg_stripe  
❌ wp_Gc13_rg_stripe_transaction  
❌ wp_Gc13_rg_userregistration  

❌ wp_Gc13_rotating_ad  
❌ wp_Gc13_rotating_ad_groups 

❌ wp_Gc13_rs_exclude  
❌ wp_Gc13_rs_folders  
❌ wp_Gc13_rs_maps  
❌ wp_Gc13_rs_membership_presets  
❌ wp_Gc13_rs_photos  
❌ wp_Gc13_rs_photos_pos  
❌ wp_Gc13_rs_resources  
❌ wp_Gc13_rs_settings_presets  
❌ wp_Gc13_rs_settings_sets  
❌ wp_Gc13_rs_sliders  
❌ wp_Gc13_rs_sorting  
❌ wp_Gc13_rs_stats  
❌ wp_Gc13_rs_tags  
❌ wp_Gc13_rs_videos  

❌ wp_Gc13_sbr_feed_caches  
❌ wp_Gc13_sbr_feed_locator  
❌ wp_Gc13_sbr_feeds  
❌ wp_Gc13_sbr_reviews_posts  
❌ wp_Gc13_sbr_sources  

❌ wp_Gc13_shslider  

❌ wp_Gc13_signups  

❌ wp_Gc13_snippets  

❌ wp_Gc13_suretriggers_webhook_requests  

❌ wp_Gc13_taxonomymeta  

✅ wp_Gc13_tec_events  
✅ wp_Gc13_tec_occurrences  
✅ wp_Gc13_tec_series_relationships  

❇️ wp_Gc13_term_relationships  
❇️ wp_Gc13_term_taxonomy  
❇️ wp_Gc13_termmeta  
❇️ wp_Gc13_terms  

❌ wp_Gc13_tm_taskmeta  
❌ wp_Gc13_tm_tasks  

❌ wp_Gc13_totalsoft_fonts  
❌ wp_Gc13_totalsoft_poll_answers  
❌ wp_Gc13_totalsoft_poll_dbt  
❌ wp_Gc13_totalsoft_poll_id  
❌ wp_Gc13_totalsoft_poll_iminqu  
❌ wp_Gc13_totalsoft_poll_iminqu_1  
❌ wp_Gc13_totalsoft_poll_impoll  
❌ wp_Gc13_totalsoft_poll_impoll_1  
❌ wp_Gc13_totalsoft_poll_imwibu  
❌ wp_Gc13_totalsoft_poll_imwibu_1  
❌ wp_Gc13_totalsoft_poll_inform  
❌ wp_Gc13_totalsoft_poll_manager  
❌ wp_Gc13_totalsoft_poll_quest_im  
❌ wp_Gc13_totalsoft_poll_results  
❌ wp_Gc13_totalsoft_poll_stpoll  
❌ wp_Gc13_totalsoft_poll_stpoll_1  
❌ wp_Gc13_totalsoft_poll_stwibu  
❌ wp_Gc13_totalsoft_poll_stwibu_1  

❌ wp_Gc13_trustreviews_biz  
❌ wp_Gc13_trustreviews_review  
❌ wp_Gc13_trustreviews_stats  

❇️ wp_Gc13_usermeta  
❇️ wp_Gc13_users  

❌ wp_Gc13_w3tc_cdn_pathmap  
❌ wp_Gc13_w3tc_cdn_queue  

❌ wp_Gc13_wc_admin_note_actions  
❌ wp_Gc13_wc_admin_notes  
❌ wp_Gc13_wc_category_lookup  
❌ wp_Gc13_wc_customer_lookup  
❌ wp_Gc13_wc_download_log  
❌ wp_Gc13_wc_order_addresses  
❌ wp_Gc13_wc_order_coupon_lookup  
❌ wp_Gc13_wc_order_operational_data  
❌ wp_Gc13_wc_order_product_lookup  
❌ wp_Gc13_wc_order_stats  
❌ wp_Gc13_wc_order_tax_lookup  
❌ wp_Gc13_wc_orders  
❌ wp_Gc13_wc_orders_meta  
❌ wp_Gc13_wc_product_attributes_lookup  
❌ wp_Gc13_wc_product_download_directories  
❌ wp_Gc13_wc_product_meta_lookup  
❌ wp_Gc13_wc_rate_limits  
❌ wp_Gc13_wc_reserved_stock  
❌ wp_Gc13_wc_tax_rate_classes  
❌ wp_Gc13_wc_webhooks  

⚠️ ✅ wp_Gc13_wfAuditEvents  
⚠️ ✅ wp_Gc13_wfBlockedIPLog  
⚠️ ✅ wp_Gc13_wfBlocks7  
⚠️ ✅ wp_Gc13_wfConfig  
⚠️ ✅ wp_Gc13_wfCrawlers  
⚠️ ✅ wp_Gc13_wfFileChanges  
⚠️ ✅ wp_Gc13_wfFileMods  
⚠️ ✅ wp_Gc13_wfHits  
⚠️ ✅ wp_Gc13_wfHoover  
⚠️ ✅ wp_Gc13_wfIssues  
⚠️ ✅ wp_Gc13_wfKnownFileList  
⚠️ ✅ wp_Gc13_wfLiveTrafficHuman  
⚠️ ✅ wp_Gc13_wfLocs  
⚠️ ✅ wp_Gc13_wfLogins  
⚠️ ✅ wp_Gc13_wfls_2fa_secrets  
⚠️ ✅ wp_Gc13_wfls_role_counts  
⚠️ ✅ wp_Gc13_wfls_settings  
⚠️ ✅ wp_Gc13_wfNotifications  
⚠️ ✅ wp_Gc13_wfPendingIssues  
⚠️ ✅ wp_Gc13_wfReverseCache  
⚠️ ✅ wp_Gc13_wfSecurityEvents  
⚠️ ✅ wp_Gc13_wfSNIPCache  
⚠️ ✅ wp_Gc13_wfStatus  
⚠️ ✅ wp_Gc13_wfTrafficRates  
⚠️ ✅ wp_Gc13_wfWafFailures  

❌ wp_Gc13_woocommerce_api_keys  
❌ wp_Gc13_woocommerce_attribute_taxonomies  
❌ wp_Gc13_woocommerce_downloadable_product_permissions  
❌ wp_Gc13_woocommerce_log  
❌ wp_Gc13_woocommerce_order_itemmeta  
❌ wp_Gc13_woocommerce_order_items  
❌ wp_Gc13_woocommerce_payment_tokenmeta  
❌ wp_Gc13_woocommerce_payment_tokens  
❌ wp_Gc13_woocommerce_sessions  
❌ wp_Gc13_woocommerce_shipping_zone_locations  
❌ wp_Gc13_woocommerce_shipping_zone_methods  
❌ wp_Gc13_woocommerce_shipping_zones  
❌ wp_Gc13_woocommerce_tax_rate_locations  
❌ wp_Gc13_woocommerce_tax_rates  
❌ wp_Gc13_woocommerce_termmeta  

❌ wp_Gc13_wpforms_logs  
❌ wp_Gc13_wpforms_payment_meta  
❌ wp_Gc13_wpforms_payments  
❌ wp_Gc13_wpforms_tasks_meta  

❌ wp_Gc13_wplc_chat_msgs  
❌ wp_Gc13_wplc_chat_sessions  
❌ wp_Gc13_wplc_offline_messages  
❌ wp_Gc13_wplc_webhooks  

❌ wp_Gc13_wpo_404_detector  

❌ wp_Gc13_wpstg_queue  

✅ wp_Gc13_yoast_indexable  
✅ wp_Gc13_yoast_indexable_hierarchy  
✅ wp_Gc13_yoast_migrations  
✅ wp_Gc13_yoast_primary_term  
✅ wp_Gc13_yoast_prominent_words  
✅ wp_Gc13_yoast_seo_links  
✅ wp_Gc13_yoast_seo_meta  

❌ wp_Gc13_zbs_admlog  
❌ wp_Gc13_zbs_aka  
❌ wp_Gc13_zbs_companies  
❌ wp_Gc13_zbs_contacts  
❌ wp_Gc13_zbs_customfields  
❌ wp_Gc13_zbs_dbmigration_meta  
❌ wp_Gc13_zbs_dbmigration_posts  
❌ wp_Gc13_zbs_event_reminders  
❌ wp_Gc13_zbs_events  
❌ wp_Gc13_zbs_externalsources  
❌ wp_Gc13_zbs_forms  
❌ wp_Gc13_zbs_invoices  
❌ wp_Gc13_zbs_lineitems  
❌ wp_Gc13_zbs_logs  
❌ wp_Gc13_zbs_meta  
❌ wp_Gc13_zbs_notifications  
❌ wp_Gc13_zbs_object_links  
❌ wp_Gc13_zbs_quotes  
❌ wp_Gc13_zbs_quotes_templates  
❌ wp_Gc13_zbs_security_log  
❌ wp_Gc13_zbs_segments  
❌ wp_Gc13_zbs_segments_conditions  
❌ wp_Gc13_zbs_settings  
❌ wp_Gc13_zbs_sys_cronmanagerlogs  
❌ wp_Gc13_zbs_sys_email  
❌ wp_Gc13_zbs_sys_email_hist  
❌ wp_Gc13_zbs_tags  
❌ wp_Gc13_zbs_tags_links  
❌ wp_Gc13_zbs_tax_table  
❌ wp_Gc13_zbs_temphash  
❌ wp_Gc13_zbs_tracking  
❌ wp_Gc13_zbs_transactions  
❌ wp_Gc13_zbscrm_api_keys  

---

```wpstg0``` looks like it was created by a staging plugin ❌ em all.

wpstg0_actionscheduler_actions  
wpstg0_actionscheduler_claims  
wpstg0_actionscheduler_groups  
wpstg0_actionscheduler_logs  
wpstg0_advps_optionset  
wpstg0_advps_thumbnail  
wpstg0_aioseo_cache  
wpstg0_aioseo_notifications  
wpstg0_aioseo_posts  
wpstg0_awpcp_ad_regions  
wpstg0_awpcp_adfees  
wpstg0_awpcp_admeta  
wpstg0_awpcp_ads  
wpstg0_awpcp_categories  
wpstg0_awpcp_credit_plans  
wpstg0_awpcp_media  
wpstg0_awpcp_payments  
wpstg0_awpcp_tasks  
wpstg0_bp_activity  
wpstg0_bp_activity_meta  
wpstg0_bp_friends  
wpstg0_bp_groups  
wpstg0_bp_groups_groupmeta  
wpstg0_bp_groups_members  
wpstg0_bp_messages_messages  
wpstg0_bp_messages_meta  
wpstg0_bp_messages_notices  
wpstg0_bp_messages_recipients  
wpstg0_bp_notifications  
wpstg0_bp_notifications_meta  
wpstg0_bp_user_blogs  
wpstg0_bp_user_blogs_blogmeta  
wpstg0_bp_xprofile_data  
wpstg0_bp_xprofile_fields  
wpstg0_bp_xprofile_groups  
wpstg0_bp_xprofile_meta  
wpstg0_bv_activities_store  
wpstg0_ce4wp_abandoned_checkout  
wpstg0_ce4wp_contacts  
wpstg0_commentmeta  
wpstg0_comments  
wpstg0_cpk_wpcsv_export_queue  
wpstg0_cpk_wpcsv_log  
wpstg0_crw_crosswords  
wpstg0_crw_editors  
wpstg0_crw_projects  
wpstg0_em_bookings  
wpstg0_em_events  
wpstg0_em_locations  
wpstg0_em_meta  
wpstg0_em_tickets  
wpstg0_em_tickets_bookings  
wpstg0_flag_album  
wpstg0_flag_comments  
wpstg0_flag_gallery  
wpstg0_flag_pictures  
wpstg0_frm_fields  
wpstg0_frm_forms  
wpstg0_frm_item_metas  
wpstg0_frm_items  
wpstg0_gf_addon_feed  
wpstg0_gf_addon_payment_callback  
wpstg0_gf_addon_payment_transaction  
wpstg0_gf_draft_submissions  
wpstg0_gf_entry  
wpstg0_gf_entry_meta  
wpstg0_gf_entry_notes  
wpstg0_gf_form  
wpstg0_gf_form_meta  
wpstg0_gf_form_revisions  
wpstg0_gf_form_view  
wpstg0_gf_rest_api_keys  
wpstg0_gg_folders  
wpstg0_gg_galleries  
wpstg0_gg_galleries_excluded  
wpstg0_gg_galleries_resources  
wpstg0_gg_photos  
wpstg0_gg_photos_pos  
wpstg0_gg_photos_settings  
wpstg0_gg_settings_presets  
wpstg0_gg_settings_sets  
wpstg0_gg_stats  
wpstg0_gg_tags  
wpstg0_ig_actions  
wpstg0_ig_blocked_emails  
wpstg0_ig_campaigns  
wpstg0_ig_contact_meta  
wpstg0_ig_contactmeta  
wpstg0_ig_contacts  
wpstg0_ig_contacts_ips  
wpstg0_ig_forms  
wpstg0_ig_links  
wpstg0_ig_lists  
wpstg0_ig_lists_contacts  
wpstg0_ig_mailing_queue  
wpstg0_ig_queue  
wpstg0_ig_sending_queue  
wpstg0_ig_workflows  
wpstg0_ig_workflows_queue  
wpstg0_iwp_backup_status  
wpstg0_links  
wpstg0_mlw_qm_audit_trail  
wpstg0_mlw_question_terms  
wpstg0_mlw_questions  
wpstg0_mlw_quiz_theme_settings  
wpstg0_mlw_quizzes  
wpstg0_mlw_results  
wpstg0_mlw_themes  
wpstg0_ms_snippets  
wpstg0_my_calendar  
wpstg0_my_calendar_categories  
wpstg0_my_calendar_category_relationships  
wpstg0_my_calendar_events  
wpstg0_my_calendar_location_relationships  
wpstg0_my_calendar_locations  
wpstg0_my_calendar_payments  
wpstg0_options  
wpstg0_pmxe_exports  
wpstg0_pmxe_google_cats  
wpstg0_pmxe_posts  
wpstg0_pmxe_templates  
wpstg0_postmeta  
wpstg0_posts  
wpstg0_posts_backup  
wpstg0_rg_form  
wpstg0_rg_form_meta  
wpstg0_rg_form_view  
wpstg0_rg_incomplete_submissions  
wpstg0_rg_lead  
wpstg0_rg_lead_detail  
wpstg0_rg_lead_detail_long  
wpstg0_rg_lead_meta  
wpstg0_rg_lead_notes  
wpstg0_rg_stripe  
wpstg0_rg_stripe_transaction  
wpstg0_rg_userregistration  
wpstg0_rotating_ad  
wpstg0_rotating_ad_groups  
wpstg0_rs_exclude  
wpstg0_rs_folders  
wpstg0_rs_maps  
wpstg0_rs_membership_presets  
wpstg0_rs_photos  
wpstg0_rs_photos_pos  
wpstg0_rs_resources  
wpstg0_rs_settings_presets  
wpstg0_rs_settings_sets  
wpstg0_rs_sliders  
wpstg0_rs_sorting  
wpstg0_rs_stats  
wpstg0_rs_tags  
wpstg0_rs_videos  
wpstg0_shslider  
wpstg0_signups  
wpstg0_snippets  
wpstg0_taxonomymeta  
wpstg0_tec_events  
wpstg0_tec_occurrences  
wpstg0_tec_series_relationships  
wpstg0_term_relationships  
wpstg0_term_taxonomy  
wpstg0_termmeta  
wpstg0_terms  
wpstg0_tm_taskmeta  
wpstg0_tm_tasks  
wpstg0_totalsoft_fonts  
wpstg0_totalsoft_poll_answers  
wpstg0_totalsoft_poll_dbt  
wpstg0_totalsoft_poll_id  
wpstg0_totalsoft_poll_iminqu  
wpstg0_totalsoft_poll_iminqu_1  
wpstg0_totalsoft_poll_impoll  
wpstg0_totalsoft_poll_impoll_1  
wpstg0_totalsoft_poll_imwibu  
wpstg0_totalsoft_poll_imwibu_1  
wpstg0_totalsoft_poll_inform  
wpstg0_totalsoft_poll_manager  
wpstg0_totalsoft_poll_quest_im  
wpstg0_totalsoft_poll_results  
wpstg0_totalsoft_poll_stpoll  
wpstg0_totalsoft_poll_stpoll_1  
wpstg0_totalsoft_poll_stwibu  
wpstg0_totalsoft_poll_stwibu_1  
wpstg0_usermeta  
wpstg0_users  
wpstg0_wc_admin_note_actions  
wpstg0_wc_admin_notes  
wpstg0_wc_category_lookup  
wpstg0_wc_customer_lookup  
wpstg0_wc_download_log  
wpstg0_wc_order_coupon_lookup  
wpstg0_wc_order_product_lookup  
wpstg0_wc_order_stats  
wpstg0_wc_order_tax_lookup  
wpstg0_wc_product_attributes_lookup  
wpstg0_wc_product_download_directories  
wpstg0_wc_product_meta_lookup  
wpstg0_wc_rate_limits  
wpstg0_wc_reserved_stock  
wpstg0_wc_tax_rate_classes  
wpstg0_wc_webhooks  
wpstg0_wfAuditEvents  
wpstg0_wfBlockedIPLog  
wpstg0_wfBlocks7  
wpstg0_wfConfig  
wpstg0_wfCrawlers  
wpstg0_wfFileChanges  
wpstg0_wfFileMods  
wpstg0_wfHits  
wpstg0_wfHoover  
wpstg0_wfIssues  
wpstg0_wfKnownFileList  
wpstg0_wfLiveTrafficHuman  
wpstg0_wfLocs  
wpstg0_wfLogins  
wpstg0_wfls_2fa_secrets  
wpstg0_wfls_role_counts  
wpstg0_wfls_settings  
wpstg0_wfNotifications  
wpstg0_wfPendingIssues  
wpstg0_wfReverseCache  
wpstg0_wfSecurityEvents  
wpstg0_wfSNIPCache  
wpstg0_wfStatus  
wpstg0_wfTrafficRates  
wpstg0_wfWafFailures  
wpstg0_woocommerce_api_keys  
wpstg0_woocommerce_attribute_taxonomies  
wpstg0_woocommerce_downloadable_product_permissions  
wpstg0_woocommerce_log  
wpstg0_woocommerce_order_itemmeta  
wpstg0_woocommerce_order_items  
wpstg0_woocommerce_payment_tokenmeta  
wpstg0_woocommerce_payment_tokens  
wpstg0_woocommerce_sessions  
wpstg0_woocommerce_shipping_zone_locations  
wpstg0_woocommerce_shipping_zone_methods  
wpstg0_woocommerce_shipping_zones  
wpstg0_woocommerce_tax_rate_locations  
wpstg0_woocommerce_tax_rates  
wpstg0_woocommerce_termmeta  
wpstg0_wp_ada_compliance_basic  
wpstg0_wpforms_tasks_meta  
wpstg0_wplc_chat_msgs  
wpstg0_wplc_chat_sessions  
wpstg0_wplc_offline_messages  
wpstg0_wplc_webhooks  
wpstg0_wpstg_queue  
wpstg0_yoast_indexable  
wpstg0_yoast_indexable_hierarchy  
wpstg0_yoast_migrations  
wpstg0_yoast_primary_term  
wpstg0_yoast_prominent_words  
wpstg0_yoast_seo_links  
wpstg0_yoast_seo_meta  
wpstg0_zbs_admlog  
wpstg0_zbs_aka  
wpstg0_zbs_companies  
wpstg0_zbs_contacts  
wpstg0_zbs_customfields  
wpstg0_zbs_dbmigration_meta  
wpstg0_zbs_dbmigration_posts  
wpstg0_zbs_event_reminders  
wpstg0_zbs_events  
wpstg0_zbs_externalsources  
wpstg0_zbs_forms  
wpstg0_zbs_invoices  
wpstg0_zbs_lineitems  
wpstg0_zbs_logs  
wpstg0_zbs_meta  
wpstg0_zbs_notifications  
wpstg0_zbs_object_links  
wpstg0_zbs_quotes  
wpstg0_zbs_quotes_templates  
wpstg0_zbs_security_log  
wpstg0_zbs_segments  
wpstg0_zbs_segments_conditions  
wpstg0_zbs_settings  
wpstg0_zbs_sys_cronmanagerlogs  
wpstg0_zbs_sys_email  
wpstg0_zbs_sys_email_hist  
wpstg0_zbs_tags  
wpstg0_zbs_tags_links  
wpstg0_zbs_tax_table  
wpstg0_zbs_temphash  
wpstg0_zbs_tracking  
wpstg0_zbs_transactions  
wpstg0_zbscrm_api_keys




