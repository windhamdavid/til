# Greenwood Calendar

## Log 

- **25/05/28** 
  - accepted tech admin account on bluehost
  - modified existing user to administrator
  - inventoried site
  - inspected logs
  - installed query monitor to inspect performance and errors
  - billed two(2) hours

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

Since you mentioned that you installed w3 total cache as the last step before the noticeable slowdown, I would recommend disabling it as a good start. You're also likely seeing slowness from the shared hosting downgrade. You might consider rebuilding the database using imports and reversing out all existing plugins to eliminate errors. Considering your budget and the lifespan of the project, but for now you could start backing out some of the unused plugins and database tables as a more simple method of improving performance. 

I could test some some minor changes in about ```5``` **hours**, but it would take me ```20+``` **hours** to get it tuned up. The database cleanup is mostly manual and I'd need to run a localhost version to test the plugin and theme dependencies as I clean them. Your site theme is also no longer available via [Envato](https://themeforest.net/item/the-issue-most-versatile-magazine-theme/23448818) -  [(author)](https://themeforest.net/user/fuelthemes/portfolio) which means it's not being updated and will likely incure more errors. To have it back in tip top shape with a new theme it's likely ```40+``` hours of work. 



:::

You can now inspect the load times, errors, and performance on each page using the query monitor tool.  
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

wp-user: admin/cejsip-8vInxa-jipciz
ID: 3197



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

### Database

- db: greenwx6_greenwood_calendar2013
- prefix: wp_Gc13_
- size: 1.12GB
- Majority of tables are formatted with MyISAM --> Need to be converted to InnoDB
- Duplicated sets of tables: other prefix wpstg0, 
- unused tables - old gravity forms, BuddyPress, IG contacts, MLW quizzes, totalsoft, etc. 
- unused databases: 

slow queries:
```sql
SELECT P.ID
FROM wp_Gc13_posts AS P
WHERE P.post_type IN ('post', 'page', 'attachment', 'eventbrite_events', 'facebook_events', 'tribe_events', 'jetpack-portfolio', 'jetpack-testimonial')
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
AND P.post_type IN ('post', 'page', 'attachment', 'eventbrite_events', 'facebook_events', 'tribe_events', 'jetpack-portfolio', 'jetpack-testimonial')
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
ORDER BY priority ASC, ctime DESC	2	0.0018	W3TC\DbCache_WpdbNew->default_query
2 calls
wordfence::admin_menus
1 call
wordfence::admin_menus_20
1 call
SELECT name, val, autoload
FROM wp_Gc13_wfConfig
WHERE name = 'onboardingAttempt3'	10	0.0054	W3TC\DbCache_WpdbNew->default_query
10 calls
wfOnboardingController::shouldShowAttempt1
5 calls
wfOnboardingController::shouldShowAttempt2
5 calls
SELECT name, val, autoload
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

I think you could get rid of the Bakery, Boost, W3 Cache, Social Settings, Cloudflare, Jetpack, wp-Optimize, & image optimizer without sacrificing functionality or impacting performance. 

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




