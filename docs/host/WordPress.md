# WordPress

## About 
I've used WordPress for hundreds of projects and I think I owe a certain debt of gratitude. I started learning WordPress in the early days of the project. I keep a WordPress powered testing site up @ https://wp.davidwindham.com which contains my notes and code for WordPress projects.

## Log 

- 23/07/17 - fix Yoast errors from missing database table 'inclusive_language_score' -  https://wordpress.org/support/topic/inclusive-language-option/
- 23/06/20 - migrate a couple sites previously using a theme with a custom editor and a lot of custom short codes to the block editor.

## Builds

- https://wp.davidwindham.com
- https://code.davidawindham.com/david/wp
- [https://github.com/windhamdavid/wp](https://github.com/windhamdavid/wp)
- [https://github.com/windhamdavid/wordpress-develop](https://github.com/windhamdavid/wordpress-develop)

## Repos

* [https://github.com/WordPress/wordpress-develop](https://github.com/WordPress/wordpress-develop)

## Docs

* Docs - [https://developer.wordpress.com/docs/](https://developer.wordpress.com/docs/)
* Reference - [https://developer.wordpress.org/reference/](https://developer.wordpress.org/reference/)
* Block Editor - [https://developer.wordpress.org/block-editor/](https://developer.wordpress.org/block-editor/)
* API/Console - [https://developer.wordpress.com/docs/api/console/](https://developer.wordpress.com/docs/api/console/)


## Functions

#####

##### Determine the current Taxonomy and list it's children:

```php
<?php
$term = get_term_by( 'slug', get_query_var('term'), get_query_var('taxonomy') );
$queried_object = get_queried_object();
$term_id = $queried_object->term_id;
$taxonomy_name = 'location';
$term_children = get_term_children( $term_id, $taxonomy_name );
if ( !empty( $term_children ) && !is_wp_error( $term_children ) ) { ?>
  <div class="togglecontainer">

    <?php echo '<ul>';
    foreach ( $term_children as $child ) {
      $term = get_term_by( 'id', $child, $taxonomy_name );
      echo '<li><a href="' . get_term_link( $child, $taxonomy_name ) . '">' . $term->name . '</a></li>';
      echo '<li><a href="' . get_term_link( $child, $taxonomy_name ) . '">' . get_term_meta( $term->term_id, 'address', true ) . '</a></li><br />';
    }
    echo '</ul>'; ?>

  </div>
<?php } ?>
```

##### cleanup the head:
```php
<?php
remove_action('wp_head', 'index_rel_link' );
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'start_post_rel_link', 10, 0 );
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action('wp_head', 'parent_post_rel_link', 10, 0 );
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'feed_links_extra', 3 );
remove_action('wp_head', 'feed_links', 2 );
remove_action('wp_head', 'wp_oembed_add_discovery_links', 10, 0 );
remove_action('wp_head', 'wp_oembed_add_host_js', 10, 0 );

function dw_remove_wp_ver_css_js( $src ) {
    if ( strpos( $src, 'ver=' ) )
        $src = remove_query_arg( 'ver', $src );
    return $src;
}
add_filter( 'style_loader_src', 'dw_remove_wp_ver_css_js', 9999 );
add_filter( 'script_loader_src', 'dw_remove_wp_ver_css_js', 9999 );

function disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
	add_filter( 'emoji_svg_url', '__return_false' );
}
add_action( 'init', 'disable_emojis' );

```

##### add open graph meta to head:
```php
<?php

function doctype_opengraph($output) {
    return $output . '
    xmlns:og="http://opengraphprotocol.org/schema/"
    xmlns:fb="http://www.facebook.com/2008/fbml"';
}
add_filter('language_attributes', 'doctype_opengraph');

function dw_opengraph() {
    global $post;

    if(is_single()) {
        if(has_post_thumbnail($post->ID)) {
            $img_src = wp_get_attachment_image_src(get_post_thumbnail_id( $post->ID ), 'full');
			$img_src = $img_src[0];
        } else {
            $img_src = get_stylesheet_directory_uri() . '/img/opengraph_image.jpg';
        }
        if($excerpt = $post->post_excerpt) {
            $excerpt = strip_tags($post->post_excerpt);
            $excerpt = str_replace("", "'", $excerpt);
        } else {
            $excerpt = get_bloginfo('description');
        }
?>
    <meta property="og:title" content="<?php echo the_title(); ?>"/>
    <meta property="og:description" content="<?php echo $excerpt; ?>"/>
    <meta property="og:type" content="article"/>
    <meta property="og:url" content="<?php echo the_permalink(); ?>"/>
    <meta property="og:site_name" content="<?php echo get_bloginfo(); ?>"/>
    <meta property="og:image" content="<?php echo $img_src; ?>"/>
	<meta property="fb:app_id" content="203136806559589" />
	<meta name="twitter:site" content="@windhamdavid">
	<meta name="twitter:creator" content="@windhamdavid">
	<meta name="twitter:title" content="<?php echo the_title(); ?>">
	<meta name="twitter:description" content="<?php echo $excerpt; ?>">
	<meta name="twitter:image" content="<?php echo $img_src; ?>">
<?php
    } else {
        return;
    }
	 $content = do_shortcode( apply_filters( 'the_content', $post->post_content ) );
	 $media_url = get_post_meta( get_the_ID(), 'media', true );
	 $media = get_media_embedded_in_content( $content );
	 if( !empty($media) ) {
	         $video_url = $media[0];
	?>
	<meta property="og:video" content="<?php echo $media_url; ?>" />
	<meta property="og:video:secure_url" content="<?php echo $media_url; ?>" />
	<meta property="og:video:width" content="1280" />
	<meta property="og:video:height" content="720" />
	<meta property="og:video:type" content="video/mp4" />
	<meta name="twitter:card" content="player">
	<meta name="twitter:player" content="<?php echo get_permalink();?>container/" />
	<meta name="twitter:player:width" content="1280" />
	<meta name="twitter:player:height" content="720" />
	<meta name="twitter:player:stream" content="<?php echo $media_url; ?>" />
	<meta name="twitter:player:stream:content_type" content="video/mp4" />
<?php
    } else {
?>
	<meta name="twitter:card" content="summary_large_image">
<?php
    }
}
add_action('wp_head', 'dw_opengraph', 5);


function dw_read_container_endpoint(){
	add_rewrite_endpoint( 'container', EP_PERMALINK);
}
add_action( 'init', 'dw_read_container_endpoint' );

function dw_read_container_template( $template = '' ) {
    global $wp_query;
    if( ! array_key_exists( 'container', $wp_query->query_vars ) ) return $template;
    $template = locate_template( 'single-container.php' );
    return $template;
}
add_filter( 'single_template', 'dw_read_container_template' );

function dw_video_embed( $attr, $content='' ) {
  if ( ! isset( $attr['poster'] ) && has_post_thumbnail() ) {
	$poster = get_post_meta( get_the_ID(), 'media-poster', true );
    $attr['poster'] = $poster;
  }
  return wp_video_shortcode( $attr, $content );
}
add_shortcode( 'video', 'dw_video_embed' );
```


##### security tips:
* [https://github.com/ethicalhack3r/wordpress_plugin_security_testing_cheat_sheet](https://github.com/ethicalhack3r/wordpress_plugin_security_testing_cheat_sheet)

### WordPress Plugin Security Testing Cheat Sheet

This cheat sheet was compiled by [Dewhurst Security](https://dewhurstsecurity.com "Dewhurst Security") to record the knowledge gained when testing WordPress plugins for security issues for our clients. The security documentation provided by WordPress and found online for plugin security is sparse, outdated or unclear. This cheat sheet is intended for Penetration Testers who audit WordPress plugins or developers who wish to audit their own WordPress plugins.

This is a living document, feedback in the form of Issues or Pull Requests is very much welcomed.

#### Cross-Site Scripting (XSS)

Check if the following global PHP variables are echo'd to pages, or stored in the database and echo'd at a later time without first being sanitised or output encoded.

- ```$_GET```
- ```$_POST```
- ```$_REQUEST```
- ```$_SERVER['REQUEST_URI']```
- ```$_SERVER['PHP_SELF']```
- ```$_SERVER['HTTP_REFERER']```
- ```$_COOKIE```

_(Note: the list of sources above is not extensive nor complete)_

#### Cross-Site Scripting (XSS) Tips

##### Unsafe API functions

The following functions can cause XSS if not secured as they use the PHP_SELF variable:

- ```add_query_arg()```
- ```remove_query_arg()```

References:

[https://blog.sucuri.net/2015/04/security-advisory-xss-vulnerability-affecting-multiple-wordpress-plugins.html](https://blog.sucuri.net/2015/04/security-advisory-xss-vulnerability-affecting-multiple-wordpress-plugins.html)
[https://make.wordpress.org/plugins/2015/04/20/fixing-add_query_arg-and-remove_query_arg-usage/](https://make.wordpress.org/plugins/2015/04/20/fixing-add_query_arg-and-remove_query_arg-usage/)
[https://developer.wordpress.org/reference/functions/add_query_arg/](https://developer.wordpress.org/reference/functions/add_query_arg/)
[https://developer.wordpress.org/reference/functions/remove_query_arg/](https://developer.wordpress.org/reference/functions/remove_query_arg/)

##### DISALLOW_UNFILTERED_HTML

When doing dynamic testing for XSS the following setting in the wp-config.php file may reduce false positive results as it prevents administrative and editor users from being able to embed/execute JavaScript/HTML, which by default they are permitted to do.

```
define( 'DISALLOW_UNFILTERED_HTML', true );
```

### SQL Injection

Unsafe API methods (require sanitising/escaping):

- ```$wpdb->query()```
- ```$wpdb->get_var()```
- ```$wpdb->get_row()```
- ```$wpdb->get_col()```
- ```$wpdb->get_results()```
- ```$wpdb->replace()```

Safe API methods (according to WordPress):

- ```$wpdb->insert()```
- ```$wpdb->update()```
- ```$wpdb->delete()```

Safe code, prepared statement:

``` <?php $sql = $wpdb->prepare( 'query' , value_parameter[, value_parameter ... ] ); ?> ```

Note: Before WordPress 3.5 ```$wpdb->prepare``` could be used insecurely as you could just pass the query without using placeholders, like in the following example:

```$wpdb->query( $wpdb->prepare( "INSERT INTO table (user, pass) VALUES ('$user', '$pass')" ) );```

#### SQL Injection Tips

Unsafe escaping ('securing') API methods:

- ```esc_sql()``` function does not adequately protect against SQL Injection [https://codex.wordpress.org/Function_Reference/esc_sql](https://codex.wordpress.org/Function_Reference/esc_sql)
- ```escape()``` same as above
- ```esc_like()``` same as above
- ```like_escape()``` same as above

#### Displaying/hiding SQL errors:

```
<?php $wpdb->show_errors(); ?>
<?php $wpdb->hide_errors(); ?>
<?php $wpdb->print_error(); ?>
```

### File Download

- ```file()```
- ```readfile()```
- ```file_get_contents()```

### File Inclusion

- ```include()```
- ```require()```
- ```include_once()```
- ```require_once()```
- ```fread()```

### File Manipulation

- ```unlink()``` delete arbitrary files

### File Upload

- ```sanitize_file_name()``` can create valid PHP files, turns `test.(php)` into `test.php`

### PHP Object Injection

- ``` unserialize()``` any raw user input passed to this function is probably exploitable, if serialized() first, probably not vulnerable

### PHP Object Injection Tips

Use this [simple Burp Suite extention](https://gist.github.com/ethicalhack3r/7c2618e5fffd564e2734e281c86a2c9b) along with the [PHP Object Injection WordPress Plugin](https://www.pluginvulnerabilities.com/2017/07/24/wordpress-plugin-for-use-in-testing-for-php-object-injection/) created by White Fir Design.

### Command Execution

- ```system()```
- ```exec()```
- ```passthru()```
- ```shell_exec()```

### PHP Code Execution

- ```eval()```
- ```assert()```
- ```preg_replace()``` dangerous "e" flag deprecated since PHP >= 5.5.0 and removed in PHP >= 7.0.0.

### Authorization

- ```is_admin()``` does not check if the user is authenticated as administrator, only checks if page displayed is in the admin section, can lead to auth bypass if misused.
- ```is_user_admin()``` same as above
- ```current_user_can()``` used for checking authorisation. This is what should be used to check authorisation.
- ```add_action( 'wp_ajax_nopriv_``` permits non-authenticated users to use the AJAX function (https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)).

### Open Redirect

- ```wp_redirect()``` function can be used to redirect to user supplied URLs. If user input is not sanitised or validated this could lead to Open Redirect vulnerabilities.

### Cross-Site Request Forgery (CSRF)

- ```wp_nonce_field()``` adds CSRF token to forms
- ```wp_nonce_url()``` adds CSRF token to URL
- ```wp_verify_nonce()``` checks the CSRF token validity server side
- ```check_admin_referer()``` checks the CSRF token validity server side and came from admin screen

### SSL/TLS

- ```CURLOPT_SSL_VERIFYHOST``` if set to 0 then does not check name in host certificate
- ```CURLOPT_SSL_VERIFYPEER``` if set to FALSE then does not check if the certificate (inc chain), is trusted. A Man-in-the-Middle (MitM) attacker could use a self-signed certificate.
- Check if HTTP is used to communicate with backend servers or APIs. A grep for "http://" should be sufficient.

### Priviledge Escalation

- ```update_option()``` if user input is sent unvalidated, it could allow an attacker to update arbitrary WordPress options.
- ```do_action()``` if user input is sent unvalidated, it could allow an attacker to update arbitrary WordPress actions.

See: https://www.wordfence.com/blog/2018/11/privilege-escalation-flaw-in-wp-gdpr-compliance-plugin-exploited-in-the-wild/

### Automated Static Code Analysis

- ```WordPress-Coding-Standards``` contains some security rules.

Example:

```
./vendor/bin/phpcs --standard=WordPress --sniffs=WordPress.CSRF.NonceVerification,WordPress.DB.PreparedSQL,WordPress.DB.PreparedSQLPlaceholders,WordPress.DB.RestrictedClasses,WordPress.DB.RestrictedFunctions,WordPress.Security.NonceVerification,WordPress.Security.PluginMenuSlug,WordPress.Security.SafeRedirect,WordPress.Security.ValidatedSanitizedInput,WordPress.Security.EscapeOutputSniff,WordPress.WP.PreparedSQL,WordPress.XSS.EscapeOutput -p -d memory_limit=256M --colors /path/to/plugin/
```

See: https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards

##### Further reading/references:

1. [https://developer.wordpress.org/plugins/security/](https://developer.wordpress.org/plugins/security/)
2. [https://make.wordpress.org/plugins/2013/11/24/how-to-fix-the-intentionally-vulnerable-plugin/](https://make.wordpress.org/plugins/2013/11/24/how-to-fix-the-intentionally-vulnerable-plugin/)
3. [http://wordpress.tv/2011/01/29/mark-jaquith-theme-plugin-security/](http://wordpress.tv/2011/01/29/mark-jaquith-theme-plugin-security/)
4. [https://www.wordfence.com/learn/](https://www.wordfence.com/learn/)
5. https://curl.haxx.se/libcurl/c/CURLOPT_SSL_VERIFYHOST.html
6. https://curl.haxx.se/libcurl/c/CURLOPT_SSL_VERIFYPEER.html
7. https://www.owasp.org/index.php/OWASP_Wordpress_Security_Implementation_Guideline
8. http://php.net/manual/en/function.preg-replace.php
