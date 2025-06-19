---
draft: false
---

# SRH

## URL Rewrite Setup for MyChart Provider Finder 

SRH wants to use a vanity URL for a third party hosted application which only presented IIS xml configuration documentation so I'm translating it here for transparency. I've included Claude.ai and Github Copilot translations from the original 👉🏻 📄 [documentation](https://davidawindham.com/wha/srh_rewrites.pdf)

## Variables

- CustomDomain: https://providers.selfregional.org
- CustomProviderFinder: providers
- CustomHostID: MySelfRegional
- MyChartDomain: https://mychart-np.et1235.epichosted.com/MySRHTST/
- MyChartSiteName: MySRHTST

## IIS Rules

```html
<rule name="Provider Finder Example" enabled="true" patternSyntax="Wildcard" stopProcessing="true">
  <match url="providers*" />
  <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
  <action type="Rewrite" url="https://mychart-np.et1235.epichosted.com/MySRHTST/-/providers{R:1}?host=MySelfRegional" />
</rule>

<rule name="Vanity MyChart Redirect Example" enabled="true" patternSyntax="Wildcard" stopProcessing="true">
  <match url="MySelfRegional/*" />
    <conditions>
      <add input="{HTTP_ACCEPT}" pattern="*text/html*" />
    </conditions>
  <action type="Redirect" url="https://mychart-np.et1235.epichosted.com/MySRHTST/{R:1}" redirectType="Found" />
</rule>

<rule name="Assets Example" enabled="true" patternSyntax="Wildcard" stopProcessing="true">
  <match url="MySelfRegional/*" />
  <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
  <action type="Rewrite" url="https://mychart-np.et1235.epichosted.com/MySRHTST/{R:1}" />
</rule>

<rule name="MyChart Redirect Example" patternSyntax="Wildcard" stopProcessing="true">
  <match url=" MySelfRegional/*" />
    <conditions>
      <add input="{HTTP_ACCEPT}" pattern="*text/html*" />
    </conditions>
  <action type="Redirect" url=" https://mychart-np.et1235.epichosted.com/MySRHTST/{R:1} " />
</rule>

<rule name="Hosted Provider Finder Example" preCondition="Hosted Provider Finder Precondition" enabled="true" patternSyntax="Wildcard">
  <match filterByTags="Area, Base, Form, Frame, Head, IFrame, Img, Input, Link, Script, CustomTags" customTags="Hosted Provider Finder Collection" pattern="/MySRHTST/*" negate="false" />
  <action type="Rewrite" value="/MySelfRegional/{R:1}" />
</rule>

<preCondition name="Hosted Provider Finder Precondition">
  <add input="{REQUEST_URI}" pattern="/-/providers" />
  <add input="{QUERY_STRING}" pattern="host=" />
</preCondition>
<customTags>
  <tags name="Hosted Provider Finder Collection">
      <tag name="meta" attribute="content" />
      <tag name="use" attribute="xlink:href" />
  </tags>
</customTags>

<rule name="Provider Finder Canonical URL Rewrite Example" preCondition="Provider Finder Canonical URL Precondition">
  <match filterByTags="Link" pattern="^https?:\/\/[^ ]*(app\/providers|\/-\/providers)([^ ]*)/" />
  <action type="Rewrite" value="https://providers.selfregional.org/providers {R:2}" />
 </rule>

<preCondition name="Provider Finder Canonical URL Precondition" logicalGrouping="MatchAny">
  <add input="{REQUEST_URI}" pattern="(\/app\/providers|\/-\/providers)" />
  <add input="{QUERY_STRING}" pattern="host=" />
</preCondition>
```


---

### CoPilot Translation

```sh
# Provider Finder Example
    location ~ ^/providers(.*)$ {
        rewrite ^/providers(.*)$ https://mychart-np.et1235.epichosted.com/MySRHTST/-/providers$1?host=MySelfRegional break;
    }
    
    # Vanity MyChart Redirect Example
    location ~ ^/MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
        }
        # Assets Example (if not text/html)
        proxy_pass https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
    }
    
    # MyChart Redirect Example
    location ~ ^/\ MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
        }
    }
    
    # Hosted Provider Finder Example
    # Note: This rule is complex and might need custom Nginx modules for HTML parsing
    # The following is a simplified approximation
    location ~ ^/-/providers {
        if ($args ~* "host=") {
            sub_filter "/MySRHTST/" "/MySelfRegional/";
            sub_filter_once off;
        }
    }
    
    # Provider Finder Canonical URL Rewrite
    # Note: This requires more complex HTML parsing that's not standard in Nginx
    # Consider using a JavaScript solution or Nginx with Lua module
    location ~ ^/(app/providers|/-/providers) {
        set $do_rewrite 0;
        
        if ($uri ~* "(\/app\/providers|\/-\/providers)") {
            set $do_rewrite 1;
        }
        
        if ($args ~* "host=") {
            set $do_rewrite 1;
        }
        
        if ($do_rewrite = 1) {
            # Would need ngx_http_subs_filter_module or Lua for HTML tag manipulation
            # This is a placeholder - actual implementation requires more advanced modules
            rewrite ^.*(app\/providers|\/-\/providers)(.*)$ https://providers.selfregional.org/providers$2 break;
        }
    }
```

---

### Claude Translation 

#### Nginx configuration equivalent to IIS rules

```sh
server {
    listen 80;
    server_name your-domain.com;

    # Rule 1: Provider Finder Example
    # IIS: providers* -> rewrite to external URL with query param
    location ~* ^/providers(.*)$ {
        rewrite ^/providers(.*)$ https://mychart-np.et1235.epichosted.com/MySRHTST/-/providers$1?host=MySelfRegional last;
    }

    # Rule 2: Vanity MyChart Redirect Example  
    # IIS: MySelfRegional/* with HTML accept header -> redirect
    location ~* ^/MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
        }
        # If not HTML request, fall through to Rule 3 (Assets Example)
        rewrite ^/MySelfRegional/(.*)$ https://mychart-np.et1235.epichosted.com/MySRHTST/$1 last;
    }

    # Rule 4: MyChart Redirect Example (with spaces - appears to be duplicate/typo)
    # This seems to be a duplicate of Rule 2 with extra spaces, handling it as fallback
    location ~* ^/\s*MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
        }
    }

    # Provider Finder with host parameter handling
    location ~* ^/-/providers {
        if ($args ~* "host=") {
            # This handles the precondition logic for provider finder
            rewrite ^/-/providers(.*)$ /MySelfRegional/$1 last;
        }
    }

    # Provider Finder Canonical URL handling
    # This is more complex in Nginx as it involves response body modification
    # You would typically use nginx's sub_filter module for this:
    location ~* ^/(app/providers|/-/providers) {
        if ($args ~* "host=") {
            # Enable response body modification
            sub_filter_once off;
            sub_filter_types text/html text/css text/xml application/javascript;
            sub_filter 'https://[^ ]*(app/providers|/-/providers)([^ ]*)/' 'https://providers.selfregional.org/providers$2';
        }
        # Continue processing the request normally
        try_files $uri $uri/ =404;
    }
}
```

### Additional configuration notes:

1. The IIS "Hosted Provider Finder" rule with filterByTags is complex
   In Nginx, you'd need to use the sub_filter module or a Lua script
   to modify response content based on HTML tags
2. For response body modification (Rules 5-7), you may need:
   - nginx sub_filter module (basic text replacement)
   - nginx-lua module (for complex logic)
   - Or handle this at the application level
3. Make sure to enable these modules if needed:
   load_module modules/ngx_http_sub_filter_module.so;
4. The stopProcessing="true" behavior is handled by using 'last' flag
   in rewrite rules and proper location block ordering


Here are the key differences and considerations when translating from IIS to Nginx:
Important Notes:

1. Rule Processing Order: Nginx processes location blocks in a specific order (exact match → longest prefix → regex). The IIS stopProcessing="true" is handled by the last flag in rewrites.

2. Wildcard vs Regex: IIS uses wildcard patterns (*), while Nginx uses regex. I've converted providers* to ^/providers(.*)$.

3. Complex Response Modification: Rules 5-7 in your IIS config involve modifying response content based on HTML tags. This requires additional Nginx modules:
- sub_filter module for basic text replacement
- nginx-lua module for complex logic
- Or handle at the application level

4. Conditional Logic: IIS conditions become Nginx if statements, though Nginx's if is generally discouraged except for simple cases like checking headers.

5. External Rewrites: Your rules rewrite to external URLs, which Nginx handles well with the rewrite directive.


---

<div><br/><br/></div>

## CURRENT CONFIG

**note** the ```underscores_in_header``` directive is required and the ```sub_filter``` module is not available in the current nginx build. 

```sh
underscores_in_headers on;

location / {
  rewrite ^/(.*)$ /MySRHTST/-/providers/$1?host=MySelfRegional break;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header RequestVerificationToken $http_requestverificationtoken;
  proxy_pass https://mychart-np.et1235.epichosted.com;
}

# Vanity MyChart Redirect Example
location ~ ^/MySelfRegional/(.*)$ {
  # Assets Example (if not text/html)
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header RequestVerificationToken $http_requestverificationtoken;
  proxy_pass https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
}

# MyChart Redirect Example
location ~ ^/\ MySelfRegional/(.*)$ {
  if ($http_accept ~* "text/html") {
    return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
  }
}

# Hosted Provider Finder Example
location ~ ^/-/providers {
  if ($args ~* "host=") {
    # Implementation needed
  }
}

# Canonical URL Rewrite (modified to not use providers)
location ~ ^/(app/providers|/-/providers) {
  set $do_rewrite 0;
  if ($uri ~* "(\/app\/providers|\/-\/providers)") {
    set $do_rewrite 1;
  }
  if ($args ~* "host=") {
    set $do_rewrite 1;
  }
  if ($do_rewrite = 1) {
    # Modified to use domain root instead of /providers
    rewrite ^.*(app\/providers|\/-\/providers)(.*)$ https://providers.selfregional.org$2 break;
  }
}
```

this was the original test run under the ```/providers``` subdirectory


```sh
underscores_in_headers on;

# Provider Finder Example
location ~ ^/providers(.*)$ {
	rewrite ^/providers(.*)$ /MySRHTST/-/providers$1?host=MySelfRegional break;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header RequestVerificationToken $http_requestverificationtoken;
	proxy_pass https://mychart-np.et1235.epichosted.com;
}

# Vanity MyChart Redirect Example
location ~ ^/MySelfRegional/(.*)$ {

	# Assets Example (if not text/html)
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header RequestVerificationToken $http_requestverificationtoken;
	proxy_pass https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
}

# MyChart Redirect Example
location ~ ^/\ MySelfRegional/(.*)$ {
	if ($http_accept ~* "text/html") {
		return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$1;
	}
}

# Hosted Provider Finder Example
# Note: This rule is complex and might need custom Nginx modules for HTML parsing
# The following is a simplified approximation
location ~ ^/-/providers {
	if ($args ~* "host=") {

	}
}

# Provider Finder Canonical URL Rewrite
# Note: This requires more complex HTML parsing that's not standard in Nginx
# Consider using a JavaScript solution or Nginx with Lua module
location ~ ^/(app/providers|/-/providers) {
	set $do_rewrite 0;

	if ($uri ~* "(\/app\/providers|\/-\/providers)") {
		set $do_rewrite 1;
	}

	if ($args ~* "host=") {
		set $do_rewrite 1;
	}

	if ($do_rewrite = 1) {
		# Would need ngx_http_subs_filter_module or Lua for HTML tag manipulation
		# This is a placeholder - actual implementation requires more advanced modules
		rewrite ^.*(app\/providers|\/-\/providers)(.*)$ https://providers.selfregional.org/providers$2 break;
	}
}
```

---

<div><br/><br/></div>

## DEBUG LINK ERROR

Epic team found an error where the "bio links from the slots are incorrect" ( the popup window links for each provider above the scheduling time ). The current error is from a redirect loop causing a ```499``` 'Client Closed Request' error. I found that even before the proxy, the url is change and replaces the ```CustomHostID``` with the ```MyChartSiteName``` ( ```MySelfRegional``` -> ```MySRHTST``` ) e.g.:  

https://mychart-np.et1235.epichosted.com/MySelfRegional/app/providers/details?id=WP-24ZbgpnUzW4-2B-2Fz8NuLocNwBA-3D-3D-24sJ0udur53-2FhX6H4Z4O26dH2yxiAz4AP1Nk8QQ7Vkiug-3D  
👇🏼 ♻️  
https://mychart-np.et1235.epichosted.com/MySRHTST/app/providers/details?id=WP-24ZbgpnUzW4-2B-2Fz8NuLocNwBA-3D-3D-24sJ0udur53-2FhX6H4Z4O26dH2yxiAz4AP1Nk8QQ7Vkiug-3D


I also noticed that even when the link switches out the ```CustomHostID``` with the ```MyChartSiteName``` it still does not function and only functions when the ```CustomHostID``` is completely removed. e.g.:  

https://providers.selfregional.org/MySelfRegional/app/providers/details?id=WP-24ZbgpnUzW4-2B-2Fz8NuLocNwBA-3D-3D-24sJ0udur53-2FhX6H4Z4O26dH2yxiAz4AP1Nk8QQ7Vkiug-3D  
👇🏼 ❌  
https://providers.selfregional.org/MySRHTST/app/providers/details?id=WP-24ZbgpnUzW4-2B-2Fz8NuLocNwBA-3D-3D-24sJ0udur53-2FhX6H4Z4O26dH2yxiAz4AP1Nk8QQ7Vkiug-3D  
👇🏼 ✅  
https://providers.selfregional.org/app/providers/details?id=WP-24ZbgpnUzW4-2B-2Fz8NuLocNwBA-3D-3D-24sJ0udur53-2FhX6H4Z4O26dH2yxiAz4AP1Nk8QQ7Vkiug-3D


So we need to remove ```/MySelfRegional/``` from the 'bio link in slots' ( the ```.providerBioLink``` class ). I suspect the 'Hosted Provider Finder' and 'Canonical URL' translations are the culprit since it's designed to replace the ```CustomHostID``` with the ```MyChartSiteName``` for certain HTML tags. The 'Canonical URL' rule is explicitly set to rewrite links via ```filterByTags="Link"```. Here are the two IIS rules from the documentation:

```xml
<rule name="Hosted Provider Finder Example" preCondition="Hosted Provider Finder Precondition" enabled="true" patternSyntax="Wildcard">
  <match filterByTags="Area, Base, Form, Frame, Head, IFrame, Img, Input, Link, Script, CustomTags" customTags="Hosted Provider Finder Collection" pattern="/MyChartSiteName/*" negate="false" />
  <action type="Rewrite" value="/CustomHostID/{R:1}" />
</rule>
<preCondition name="Hosted Provider Finder Precondition">
  <add input="{REQUEST_URI}" pattern="/-/providers" />
  <add input="{QUERY_STRING}" pattern="host=" />
</preCondition>
<customTags>
  <tags name="Hosted Provider Finder Collection">
      <tag name="meta" attribute="content" />
      <tag name="use" attribute="xlink:href" />
  </tags>
</customTags>

<rule name="Provider Finder Canonical URL Rewrite Example" preCondition="Provider Finder Canonical URL Precondition">
  <match filterByTags="Link" pattern="^https?:\/\/[^ ]*(app\/providers|\/-\/providers)([^ ]*)/" />
  <action type="Rewrite" value=" CustomDomain/CustomProviderFinder {R:2}" />
 </rule>
<preCondition name="Provider Finder Canonical URL Precondition" logicalGrouping="MatchAny">
  <add input="{REQUEST_URI}" pattern="(\/app\/providers|\/-\/providers)" />
  <add input="{QUERY_STRING}" pattern="host=" />
</preCondition>
```

As noted in the original translation, these rules depend on a custom nginx module. So I recompiled nginx with the ```--with-http_sub_module``` in order to use the ```sub_filter``` module to test. Here's the build:

```sh
************@mdev:~ » nginx -V
nginx version: nginx/1.26.3
built with OpenSSL 3.0.7 1 Nov 2022 (running with OpenSSL 3.2.2 )
TLS SNI support enabled
configure arguments: --prefix=/usr/share --sbin-path=/usr/sbin/nginx 
--conf-path=/etc/nginx/nginx.conf --modules-path=/usr/share/nginx/modules 
--error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log 
--lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body 
--http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy 
--http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi 
--user=nginx --group=nginx --with-file-aio --with-compat 
--with-ld-opt=-L/var/jenkins/workspace/unix/plesk/packages/brotli/brotli.files/usr/lib64
--with-http_ssl_module --with-http_realip_module 
// highlight-next-line
--with-http_sub_module 
--with-http_dav_module --with-http_gzip_static_module --with-http_stub_status_module 
--with-http_v2_module --with-http_v3_module --add-dynamic-module=mod_brotli 
--add-dynamic-module=mod_passenger/src/nginx_module --add-dynamic-module=mod_pagespeed
--add-dynamic-module=mod_security --add-dynamic-module=mod_geoip2
```



I translated the rule again several times, tested, and discovered:

- Nginx's ```sub_filter``` module cannot target specific HTML tags or attributes like IIS
- Can NOT wrap the ```sub_filter``` in an ```if``` statement
- In order to use tag/attribute-specific replacements, we would need Nginx with the Lua module (OpenResty) or a
a proxy layer that can modify HTML like Node.js




```sh
location ~ ^/(app/providers|/-/providers)(.*)$ {
    # Apply to HTML
    sub_filter_types text/html;
    # Apply sub_filter for all requests to this location
    sub_filter '/MySelfRegional/' '/MySRHTST/';
    # Repeat for all instances
    sub_filter_once off;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_pass https://mychart-np.et1235.epichosted.com;

}
```

In order to use tag/attribute-specific replacements, we would need Nginx with the Lua module (OpenResty) or a
a proxy layer that can modify HTML (like Node.js middleware) Here's an example rule:

```sh
# Using OpenResty/Nginx+Lua for more precise filtering

# Define lua function for HTML transformation
init_by_lua_block {
    function modify_provider_urls(content)
        -- Use regex to find and modify only URLs in link tags
        return string.gsub(content, '<link[^>]+href="(https?://[^"]*)(app/providers|/-/providers)([^"]*)"', 
                                    '<link href="https://providers.selfregional.org%3"')
    end
}

map $request_uri$query_string $provider_finder_condition {
    "~(\/app\/providers|\/-\/providers)" 1;
    "~host=" 1;
    default 0;
}

location ~ ^/(app/providers|/-/providers) {
    proxy_pass https://mychart-np.et1235.epichosted.com;
    
    header_filter_by_lua_block {
        if ngx.var.provider_finder_condition == "1" and 
           ngx.header.content_type and 
           string.find(ngx.header.content_type, "text/html") then
            ngx.header.content_length = nil
        end
    }
    
    body_filter_by_lua_block {
        if ngx.var.provider_finder_condition == "1" and 
           ngx.header.content_type and 
           string.find(ngx.header.content_type, "text/html") then
            local chunk = ngx.arg[1]
            local modified_chunk = modify_provider_urls(chunk)
            ngx.arg[1] = modified_chunk
        end
    }
}
```


## FINAL FINAL CONFIG

```sh
underscores_in_headers on;

location / {
	rewrite ^/(.*)$ /MySRHTST/-/providers/$1?host=MySelfRegional break;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header RequestVerificationToken $http_requestverificationtoken;
	proxy_pass https://mychart-np.et1235.epichosted.com;
}

location ~ ^/MySelfRegional/(.*)$ {
	set $subpath $1;
	if ($http_accept ~* "text/html") {
		return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/$subpath$is_args$args;
	}
	rewrite ^ /MySRHTST/$subpath break;
	proxy_pass https://mychart-np.et1235.epichosted.com;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
}
```

