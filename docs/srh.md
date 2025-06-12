# SRH

## URL Rewrite Setup for MyChart Provider Finder 

SRH wants to use a vanity URL for a third party hosted application which only presented IIS xml configuration documentation so I'm translating it here for transparency. I've included Claude.ai and Github Copilot translations from the origin 👉🏻 📄 [documentation](https://davidawindham.com/wha/srh_rewrites.pdf)

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
  <action type="Rewrite" url="https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/-/providers{R:1}?host=MySelfRegional" />
</rule>

<rule name="Vanity MyChart Redirect Example" enabled="true" patternSyntax="Wildcard" stopProcessing="true">
  <match url="MySelfRegional/*" />
    <conditions>
      <add input="{HTTP_ACCEPT}" pattern="*text/html*" />
    </conditions>
  <action type="Redirect" url="https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/{R:1}" redirectType="Found" />
</rule>

<rule name="Assets Example" enabled="true" patternSyntax="Wildcard" stopProcessing="true">
  <match url="MySelfRegional/*" />
  <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
  <action type="Rewrite" url="https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/{R:1}" />
</rule>

<rule name="MyChart Redirect Example" patternSyntax="Wildcard" stopProcessing="true">
  <match url=" MySelfRegional/*" />
    <conditions>
      <add input="{HTTP_ACCEPT}" pattern="*text/html*" />
    </conditions>
  <action type="Redirect" url=" https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/{R:1} " />
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
        rewrite ^/providers(.*)$ https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/-/providers$1?host=MySelfRegional break;
    }
    
    # Vanity MyChart Redirect Example
    location ~ ^/MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/$1;
        }
        # Assets Example (if not text/html)
        proxy_pass https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/$1;
    }
    
    # MyChart Redirect Example
    location ~ ^/\ MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/$1;
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

# Nginx configuration equivalent to IIS rules

```sh
server {
    listen 80;
    server_name your-domain.com;

    # Rule 1: Provider Finder Example
    # IIS: providers* -> rewrite to external URL with query param
    location ~* ^/providers(.*)$ {
        rewrite ^/providers(.*)$ https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/-/providers$1?host=MySelfRegional last;
    }

    # Rule 2: Vanity MyChart Redirect Example  
    # IIS: MySelfRegional/* with HTML accept header -> redirect
    location ~* ^/MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/$1;
        }
        # If not HTML request, fall through to Rule 3 (Assets Example)
        rewrite ^/MySelfRegional/(.*)$ https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/$1 last;
    }

    # Rule 4: MyChart Redirect Example (with spaces - appears to be duplicate/typo)
    # This seems to be a duplicate of Rule 2 with extra spaces, handling it as fallback
    location ~* ^/\s*MySelfRegional/(.*)$ {
        if ($http_accept ~* "text/html") {
            return 302 https://mychart-np.et1235.epichosted.com/MySRHTST/MySRHTST/$1;
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