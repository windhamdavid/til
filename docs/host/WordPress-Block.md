--- 
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# WordPress Block

**23/12/12** - Today I learned a decent approach to doing a multi-step migration from a static site to WordPress theme full site editing block theme. The notes I made along the way turned into this post so I figured I'd leave it here for posterity.

## About

The existing site was static because every website build should basically start that way in either a design file like Figma that can be converted in HTML and CSS. It's how I start all of my projects plus when published as static, they're secure, performant, and easy to maintain. I've noticed that half of the sites I have running under a content management system rarely if ever have updates or changes made to them. With the advent of online 'website builders', clients just assume that they need control so I give it to them. I've found that in order to make the mundane more fun, I usually like to challenge myself by learning something new in the process. Since I'm converting this particular site to WordPress and I know that the next phase of the Gutenberg editor is collaboration[^1], I wanted to go ahead make this site entirely block based so that I'd be up to speed on doing it with larger projects.

## Setup

<table>
<tr>
<th>Static 👉🏼</th>
<th>Hybrid 👉🏼</th>
<th>Block ✨</th>
</tr>
<tr>
<td>

```sh
┌── .config(s)
├── css/
│   ├── fonts/
│   ├── lib.css
│   ├── site.css
│   ├── css.map
│   └── site.scss
├── docs/
│   └── .pdf
├── gulpfile.js
├── img/
├── index.html
├── js/
│   ├── lib(s).js
│   ├── lib.js.map
│   ├── scripts.js
│   ├── site.js
│   └── js.map
├── node_modules/
├── package.json
├── robots.txt
└── sitemap.xml
```
</td>
<td>

```sh
┌── .configs(s)
├── _static/
├── css/
│   ├── fonts/
│   ├── lib(s).css
│   ├── site.css
│   ├── css.map
│   └── site.scss
├── docs/
│   └── .pdf
├── footer.php
├── functions.php
├── gulpfile.js 
├── header.php
├── inc/
│   └── inc(s).php
├── img/
├── index.php
├── js/
│   ├── lib(s).js
│   ├── lib.js.map
│   ├── scripts.js
│   ├── site.js
│   └── js.map
├── node_modules/
├── package.json
├── page(s).php
├── screenshot.png
└── style.css

(root)
┌── robots.txt
└── sitemap.xml

```

</td>
<td>

```sh
┌── .configs(s)
├── _static/
├── css/
│   ├── fonts/
│   ├── lib.css
│   ├── site.css
│   ├── css.map
│   └── site.scss
├── docs/
│   └── .pdf
├── functions.php
├── gulpfile.js
├── js/
│   ├── editor.js
│   ├── lib.js
│   ├── lib.js.map
│   ├── scripts.js
│   ├── site.js
│   └── js.map
├── inc/
│   └── inc(s).php
├── img/
├── index.php
├── node_modules/
├── package.json
├── parts/
│   ├── footer.html
│   ├── header.html
│   └── page.html
├── patterns/
│   ├── columns.php
│   ├── query.php
│   └── etc.php
├── screenshot.png
├── style-editor.css
├── style.css
├── templates/
│   ├── 404.html
│   ├── archive.html
│   ├── page.html
│   ├── search.html
│   └── single.html
└── theme.json

(root)
┌── robots.txt
└── sitemap.xml

```
</td>
</tr>
</table>

## Workflow

**Static 👉🏼 Hybrid**

1. Move all the static HTML files into a new directory `_static/`
2. Leave all of other assets  
  a. ( `docs/ images/` `taskrunner` `npm_modules` `css/scss/fonts/icons` `javascript` )
3. Add blank `style.css` WordPress Main Stylesheet with header.
4. Move WordPress core into the webserver root and install a local database.  
  a. add a localhost domain  
  b. load up the admin and edit the general/reading settings  
5. Add `index.php`, `functions.php`, `header.php`, `footer.php`  
  a. copy the existing HTML from the static index.html file parts  
  b. load and test until no errors
6. Test and Edit the taskrunner by reinstalling the NPM modules, rebuilding, and running.  
  a. edit the taskrunner to suit  
7. Recreate the static pages  
  a. copy/paste content into the WordPress Editor  
  b. add assets to the Media Library

( * at this point I wouldn't worry about adding any custom page templates because you'll be rewriting them into `patterns/` and `parts/` )


**Hybrid 👉🏼 Block**

1. Create `templates/` directory and copy WordPress PHP pages into and change extension to .html  
  a. `404.html`, `archive.html`, `page.html`, `search.html`, `single.html`  
  b. Change HTML/PHP markup to WordPress block Markup e.g. -`<!-- wp:site-title {"level":0} /-->` - most difficult 🔥 part because you'll have to use a reference to hand write or use the block editor to create pages and then copy/paste from the Code Editor  
  c. Add references to template parts e.g. - `<!-- wp:template-part {"slug":"header","tagName":"header"} /-->`
3. Create `parts/` directory  
  a. add `header.html` and `footer.html`  
3. Add `theme.json` file  
  a. style the block editor to match theme.
4. Add `patterns/` directory  
  a. identify any recurring or unique design patterns from the static site  
  b. build them into PHP pattern files. 

### Local

#### Task Runner

I always use task runners to make local development fast and consistent. It also gives me the ability to bundle, keep track of, and update third party dependencies by adding them to my `package.json` file. The core WordPress develop repo uses Grunt but I prefer Gulp and I can still match the default Webpack/babel presets for bundling.

##### Browser-sync

To save time, I configure browser-sync to not only save on code changes but also refresh on the WordPress editor actions in `functions.php`. ( * Note: `.ovid` is my localhost and I always prefix my `functions` with the project acronym and date )

```php
// CORS for port #
function add_cors_http_header(){
  header('Access-Control-Allow-Origin: https://gwp.ovid:333');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Allow-Headers: X-WP-Nonce', false );
}
add_action('init','add_cors_http_header');
// refresh browsers on saves
function gwp24_browsersync_save() {
  $args = [
    'blocking' => false,
    'sslverify' => false
  ];
  $request = wp_remote_get('https://gwp.ovid:333/__browser_sync__?method=reload', $args);
}
add_action('rest_after_insert_page', 'gwp24_browsersync_save', 10, 3);
add_action('rest_after_insert_post', 'gwp24_browsersync_save', 10, 3);
add_action('customize_save_after', 'gwp24_browsersync_save', 10, 3);
add_action('wp_update_nav_menu', 'gwp24_browsersync_save', 10, 3);
add_action('updated_option', 'gwp24_browsersync_save', 10, 3);
```

##### Bundle

Even though WordPress now has built in a pretty robust CSS framework to make the Gutenberg editor feature rich, I still often use other frameworks ( Bootstrap/Tailwind/Bulma/Foundation ) because either they are more customizable, have more features, or because the site has some prior dependency.

:::info[Idea 💡]

I think WordPress should include a .scss file to make the Gutenberg Block editor `:root` css variables more customizable alongside a decent reference.  And while we're at it, let's talk about customizing the Gutenberg editor experience as well starting with `@media (prefers-color-scheme: dark)` since the white is almost blinding. I'm pretty sure I'm not the only one who thinks this.

:::

Bundle Bootstrap (generic) and icons into `gulpfile.js`: ( recommend only adding the parts you need )

```js
function copy(cb) {
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js.map'
  ]) 
    .pipe(gulp.dest('./js/'));
  gulp.src([
    './node_modules/animate.css/animate.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css.map',
    './node_modules/bootstrap-icons/font/bootstrap-icons.css'
  ])
    .pipe(gulp.dest('./css/'));
  gulp.src([
    './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff',
    './node_modules/bootstrap-icons/font/fonts/bootstrap-icons.woff2',
  ])
    .pipe(gulp.dest('./css/fonts/'));
  console.log("Copy assets 📦 ");
  cb();
}
```

##### Build

```js
// gulpfile.js
function mixin() {
  return gulp.src('./css/*.scss', { sourcemaps: true })
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
}
function build(cb) {
  gulp.src([
    './css/styles.css',
    './css/custom.css'
  ])
    .pipe(concat('site.css'))    
    .pipe(gulp.dest('./css/'));
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    './js/scripts.js'
  ])
    .pipe(concat('site.js'))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(webpack(require("./webpack.config.js")))
    .pipe(gulp.dest('./js/'));
  console.log("Assets built 🔧 ");
  cb();
}

// webpack.config.js
const path = require("path")
module.exports = {
  entry: {
    main: "./js/site.js",
  },
  output: {
    filename: "site.min.js",
    path: path.resolve(__dirname, "js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
}
```

#### Enqueue

I enqueue the assets into the site and editor

```php
add_action( 'wp_enqueue_scripts', 'gwp24_enqueue_assets' );
function gwp24_enqueue_assets() {
  wp_enqueue_script( 'site-js', get_template_directory_uri() . '/js/site.js' );
  wp_enqueue_style( 'site-css', get_template_directory_uri() . '/css/site.css');
}
add_action( 'after_setup_theme', 'gwp24_add_editor_styles' );
function gwp24_add_editor_styles() {
  add_theme_support( 'editor-styles' );
  add_editor_style([
    'site.css'
  ]);
}
add_action( 'enqueue_block_editor_assets', 'gwp24_block_assets' );
function gwp24_block_assets() {
  wp_enqueue_style(
    'gwp24-css',
    get_stylesheet_directory_uri() . '/style-editor.css',
    array( 'wp-edit-blocks' ),
    time()
  );
  wp_enqueue_script(
    'gwp24-js',
    get_template_directory_uri() . '/js/editor.js'
  );
}
```

### Debugging

Define these in the `wp-config.php` file. 

```php
define( 'SCRIPT_DEBUG', true );
define( 'WP_DEBUG', true );
```

I log all errors to a `_log/error.log` and I use Xdebug for `PHP`. If there are more complex functionality in the site, I'll generally use the Query Monitor plugin. 

#### JavaScript

:::danger[Issues]
The biggest challenge I had with the migration was dealing with some of the complexity of the React JavaScript errors in the console generated from Gutenberg particularly when dealing with the block validation errors. e.g.:
```js
> https://gwp.ovid:333/wp-includes/js/dist/blocks.min.js?ver=7204d43123223474471a
Block validation: Block validation failed for `core/heading` (
{name: "core/heading", icon: Object, keywords: ["title", "subtitle"], attributes: Object, providesContext: {}, …}
```
:::

### Remote

#### Database

I always keep two versions of the database alongside one another on my machine. 

#### Version Control

I don't use a build directory like I would with a other JavaScript apps and prefer to manually transfer files instead of leaving the `.git/`  directory on the server because this generally avoids permission errors.

#### Exclude Files

I configure my FTP client to exclude the following highlighted lines from the directory sync because they're not needed in production.

```sh
// highlight-next-line
┌── .configs(s)
// highlight-next-line
├── _static/
├── css/
│   ├── fonts/
// highlight-next-line
│   ├── lib.css
│   ├── site.css
│   ├── site.map
// highlight-next-line
│   └── site.scss
├── docs/
│   └── .pdf
├── functions.php
// highlight-next-line
├── gulpfile.js
├── js/
│   ├── editor.js
// highlight-next-line
│   ├── lib.js
// highlight-next-line
│   ├── lib.js.map
// highlight-next-line
│   ├── scripts.js
│   ├── site.js
│   └── site.js.map
├── inc/
├── img/
├── index.php
// highlight-next-line
├── node_modules/
// highlight-next-line
├── package.json
├── parts/
├── patterns/
// highlight-next-line
├── webpack.config.js
└── {etc...}
```

### Editor Tips

These are just some things I do to try and simplify the editor a bit and make it easier to use. 

**Disable Openverse and Remote Patterns**

```php
remove_theme_support( 'core-block-patterns' );
add_filter( 'should_load_remote_block_patterns', 'gwp24_disable_remote_patterns' );
function gwp24_disable_remote_patterns() {
  return false;
}
add_filter(
  'block_editor_settings_all',
  function( $settings ) {
    $settings['enableOpenverseMediaCategory'] = false;
    return $settings;
  }, 10
);
```

---
## Notes

- https://css-tricks.com/wordpress-global-styles-reference-tables/
- https://developer.wordpress.org/news/2023/12/a-walk-through-tutorial-on-using-create-block-theme-plugin/
- https://perko.dev/blog/post/2022-02-21-understanding-how-gutenberg-saves-data
- https://github.com/WordPress/gutenberg/issues/26544
- https://developer.wordpress.org/themes/templates/template-hierarchy/#page-hierarchy
- https://github.com/WordPress/wordpress-develop/

## References

2. Figma - https://www.figma.com/file/AlYr03vh4dVimwYwQkTdf6/Twenty-Twenty-Four?type=design&node-id=119-543&mode=design

---

[^1]: WordPress _Roadmap_ - https://wordpress.org/about/roadmap/
[^1]: Automattic - _Introducing Twenty Twenty-Four_ - https://automattic.design/2023/11/22/introducing-twenty-twenty-four/
[^2]: Bill Erickson - https://www.billerickson.net/hybrid-wordpress-theme-starter/
[^3]: https://developer.wordpress.org/block-editor/explanations/architecture/styles/
[^4]: https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/