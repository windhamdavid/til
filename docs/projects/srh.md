---
draft: false
---

# SRH

## SST Report 


### Epic Location-Department Source of Truth — Website Audit

_Cross-references `Epic Location-Department Source of Truth.xlsx` (Departments sheet, 3,482 rows) against `inc/seo/locations-nap.json` (63 locations)._

---

### Summary

| Metric | Count |
|---|---:|
| Epic Departments (all) | 3,482 |
| Epic Departments in SRH-region cities¹ | 517 |
| Epic Departments SRH-branded (name starts `SRH-` or ext-name `Self…/SRH…`) | 212 |
| NAP locations (excludes skip_format) | 59 |
| Matched (Epic → NAP by phone) | 113 |
| Real discrepancies to review | 3 |
| Structural: satellite depts (city mismatch, expected)² | 26 |
| Epic-only depts (SRH-branded, not on website) | 108 |
| NAP-only locations (no phone match in Epic) | 20 |

¹ Cities: Greenwood, Abbeville, Edgefield, Laurens, Newberry, Clinton, McCormick, Ninety Six, Saluda, Johnston, Due West, Hodges, Waterloo, Joanna, Whitmire, Prosperity, and other SRH catchment cities.  
² A clinic like Advanced Cardiology Associates has ONE NAP entry (Greenwood parent) but Epic tracks separate depts for its Saluda, Laurens, Clinton satellite offices — these show as "city mismatches" but reflect Epic's more granular structure, not errors.

---

### Relevant Fields (Excel → NAP)

Of the **209 columns** in the Departments sheet and **174 columns** in Locations, only these are meaningful for the public-facing website:

#### Departments sheet

| Excel column | Maps to NAP field | Notes |
|---|---|---|
| `DEPARTMENT_ID` | (used by Epic widgets) | The scheduling widgets on `/urgent-care/`, `/locations/*` reference these IDs via `data-additionalparams-department` |
| `DEPARTMENT_NAME` | (internal) | Internal shorthand (e.g. `SRH-UC SALUDA`) — not public-facing |
| `DEPT_ABBREVIATION` | (internal) | Ignore |
| `SPECIALTY` | `medicalSpecialty[]` | Direct match after case normalization |
| `EXTERNAL_NAME` | `name` | The customer-facing name (e.g. "Self Medical Center Saluda"). **Discrepancy source** — see below |
| `PHONE_NUMBER` | `phone` | Public phone. **Primary match key**. |
| `APPOINTMENT_PHONE` | `phone` (usually same) | Fallback if PHONE_NUMBER unset |
| `ADDRESS_HOUSE_NUM` | `address.streetAddress` (partial) | Street number only — Epic does NOT store the full street name. Not useful in isolation. |
| `ADDRESS_CITY` | `address.addressLocality` | Verify only |
| `ADDRESS_ZIP_CODE` | `address.postalCode` | Verify only (Epic uses ZIP+4 format) |
| `ADDRESS_STATE_C` | `address.addressRegion` | Numeric code (41 = SC in Epic) — need lookup table to translate |
| `RECORD_STATUS` | — | 0/1 = active. Filter to exclude deactivated depts. |
| `SERV_AREA_ID` | — | 14 = SRH service area. Useful pre-filter. |
| `EXPSCHED_ENABLED_YN` | — | Whether Epic OpenScheduling widget is enabled for the dept. Cross-reference target for Epic widget deployment. |

**Ignore** — 195+ columns of Epic-internal config: `MASTER_POOL_ID`, `COVERING_POOL_NAME`, `FLASH_CARD_PRT_ROU`, `MAR_LABEL_PRNTR_ID`, `RTLS_ARRV_EVNT_ID`, all `RPT_GRP_*` codes, etc. These are operational config with no public-website use.

#### Locations sheet

The Locations sheet is Epic's **service-area** roster, not physical clinic locations (as I'd initially expect). Rows include entities like "SELF REGIONAL HEALTHCARE FACILITY", "PRISMA HEALTH", "BAPTIST EASLEY SERVICE AREA" — mostly out-of-network reference data. **Only useful columns**:

| Excel column | Notes |
|---|---|
| `LOC_ID` | Reference key (not used by website) |
| `LOC_NAME` | Service-area name — mostly generic, not clinic-level |
| `EXTERNAL_NAME` | Rarely differs from LOC_NAME |
| `FAX_NUM` | Fax number |
| `EMERG_PHONE` | Emergency line |

**For the website, the Departments sheet is where all the useful matching happens** — the Locations sheet has little clinic-level granularity.

---

### Real Discrepancies to Review

#### 🚨 Saluda Urgent Care phone mismatch (highest priority)

- **NAP** (`saluda` entry): `+1-864-725-5355`
- **Epic** (dept 140006889 `SRH-UC SALUDA`): `864-445-2173`
- **Search across all 517 SRH-region Epic depts**: NO dept has `864-725-5355` in any phone field.

This number was entered from the page content the user provided when the Saluda page was first built. It disagrees with Epic's source of truth. Epic's `864-445-2173` is the shared front-desk line for the Self Medical Center Saluda facility (used by the Family Healthcare, Radiology, and Urgent Care depts at that address).

**Action**: Verify with the clinic which number should ring the Urgent Care line. If `864-725-5355` is a newly-provisioned direct line not yet reflected in Epic, no action needed except a note. If it's a typo/wrong number, update NAP + Saluda page (`_thumbnail_id=18893` page content).

#### ZIP-code mismatches (3)

These are genuine data errors — NAP and Epic disagree on the postal code for a location the site tracks:

| NAP slug | Epic dept | Issue |
|---|---|---|
| `sports-medicine-center` | 140006853 (SRH-UC GWD) | zip: NAP=29646 vs Epic=29649 |
| `family-healthcare-west-greenwood` | 140006874 (SRH-FHC WEST GWD) | zip: NAP=29647 vs Epic=29649 |
| `sports-medicine-center` | 140006882 (SRH-UC RADIOLOGY) | zip: NAP=29646 vs Epic=29649 |

---

### Structural: Satellite Departments (Not Errors)

These 26 "city mismatches" are Epic tracking satellite clinics of multi-city practices. The NAP has one parent entry per practice; Epic has one dept per city location. Example: **Advanced Cardiology Associates** (Greenwood parent in NAP) matches Epic depts for its Saluda, Laurens, and Clinton offices.

| NAP practice | Also has Epic depts in… |
|---|---|
| `advanced-cardiology-associates` | 4 satellite dept(s) — 140006822, 140006887, 140006891, 140116002 |
| `advanced-gastroenterology` | 2 satellite dept(s) — 140006832, 140006835 |
| `advanced-obstetrics-gynecology` | 1 satellite dept(s) — 140006849 |
| `advanced-podiatry` | 2 satellite dept(s) — 140006833, 140006945 |
| `advanced-pulmonology` | 1 satellite dept(s) — 140006837 |
| `advanced-surgical-associates` | 2 satellite dept(s) — 140006832, 140006835 |
| `advanced-vascular` | 2 satellite dept(s) — 140006832, 140006835 |
| `lakelands-ear-nose-throat` | 3 satellite dept(s) — 140006895, 140006896, 140006897 |
| `lakelands-nephrology` | 1 satellite dept(s) — 140006834 |
| `orthopaedic-associates-lakelands` | 3 satellite dept(s) — 140006830, 140006831, 140006836 |
| `pain-management-center` | 2 satellite dept(s) — 140006938, 140006943 |
| `self-medical-center-laurens` | 1 satellite dept(s) — 140006980 |
| `urological-services` | 1 satellite dept(s) — 140006839 |
| `western-carolina-psychiatric-associates` | 1 satellite dept(s) — 140006840 |

**Recommendation**: leave NAP structure as-is (one entry per practice reads better as a website Location Card). If a satellite location needs its own page/card (like the Saluda urgent care we just built), promote it to a top-level NAP entry.

---

### NAP-only Locations (20)

These NAP entries don't match any Epic dept by phone. Reasons:

#### External / partner facilities (expected — no Epic dept)

| NAP slug | Reason |
|---|---|
| `abbeville-area-medical-center` | Partner hospital — separate org, no Epic dept |
| `abbeville-area-healthcare-center` | External |
| `edgefield-county-healthcare` | Partner hospital |
| `lakelands-nursing-and-rehabilitation-center` | External skilled nursing partner |

#### To verify (should have an Epic dept)

| NAP slug | NAP phone | Notes |
|---|---|---|
| `womens-health-of-the-lakelands` | 864-725-5100 | Check Epic for a dept with this exact phone number |
| `lakelands-plastic-surgery` | 864-223-0505 | Check Epic for a dept with this exact phone number |
| `occupational-health-services` | 864-223-6625 | Check Epic for a dept with this exact phone number |
| `advanced-cardiothoracic-surgery` | 864-725-7900 | Check Epic for a dept with this exact phone number |
| `wound-healing-institute` | 864-725-4138 | Check Epic for a dept with this exact phone number |
| `advanced-emergency-physicians` | 864-725-4799 | Check Epic for a dept with this exact phone number |
| `neonatology-specialists` | 864-725-4449 | Check Epic for a dept with this exact phone number |
| `advanced-radiation-oncology` | 864-725-4741 | Check Epic for a dept with this exact phone number |
| `anesthesiology-services` | 864-227-8242 | Check Epic for a dept with this exact phone number |
| `imaging-center` | 864-725-7150 | Check Epic for a dept with this exact phone number |
| `bariatric-services` | 864-725-4911 | Check Epic for a dept with this exact phone number |
| `edgefield-community-pharmacy` | 803-384-4140 | Check Epic for a dept with this exact phone number |
| `saluda` | 864-725-5355 | Check Epic for a dept with this exact phone number |

---

### Epic-only SRH Departments (108)

Epic tracks 108 SRH-branded depts that don't appear in the website's NAP. Most are:

- **Sub-department of a clinic** — e.g. `SRH-CARDIOLOGY-SS` (Saluda satellite of Advanced Cardiology), `SRH-ORTHO OT` (occupational therapy sub-dept)
- **Hospital-internal** — e.g. `SRH-SURGE 4 WEST`, `SRH-VASCULAR ACCESS`, `SRH-SCOTL` (operative suites)
- **Radiology/lab sub-nodes** — `SRH-ORTHO RADIOLOGY-SS`, `NATERA LABORATORY`
- **Behavioral health sub-programs** — `SRH-BEHAVIORAL HEALTH ADOLESCENT`, `SRH-MCFM-BH`

**None of these should be added to the public NAP** — they aren't patient-facing standalone locations. The website's NAP correctly captures clinic-level entities, and Epic's finer-grained dept tracking is for operational scheduling.

Full list saved to [`/tmp/audit-crossref.json`](/tmp/audit-crossref.json) → `epic_only`.

---

### Recommendations

1. **Verify + reconcile Saluda phone**: 864-725-5355 (NAP) vs 864-445-2173 (Epic).
2. **Fix ZIP typos** in NAP for the 3 entries listed above.
3. **Verify NAP-only entries** — check with Epic admin whether the following SHOULD have Epic depts (may indicate a scheduling gap): `womens-health-of-the-lakelands`, `wound-healing-institute`, `advanced-emergency-physicians`, `imaging-center`, etc.
4. **Preserve NAP's clinic-level structure** — do not add Epic's 108 sub-depts to the website. Satellite locations get their own NAP entry only when they warrant a distinct public page (like the recent Saluda Urgent Care buildout).
5. **Consider capturing Epic `DEPARTMENT_ID` in NAP** — add an optional `epic_department_id` field so future audits are ID-matched rather than phone-matched. Would make widget deployment easier too (currently department IDs are hand-coded in page markup).

---

_Generated by cross-referencing `_claude/locations-nap.json` against the Epic Excel export._

---

<br/><br/><br/><br/>

## URL Rewrite Setup for MyChart Provider Finder 

SRH wants to use a vanity URL for a third party hosted application which only presented IIS xml configuration documentation so I'm translating it here for transparency. I've included Claude.ai and Github Copilot translations from the original 👉🏻 📄 [documentation](https://davidwindham.com/wha/srh_rewrites.pdf)

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

## Test Config

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

## Debug Link Error

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


## Final Test Config

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

## Production Config

```sh
underscores_in_headers on;
proxy_ssl_server_name off;

location / {
	rewrite ^/(.*)$ /MySRH/-/providers/$1?host=MySelfRegional break;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
	proxy_set_header RequestVerificationToken $http_requestverificationtoken;
	proxy_pass https://mychart.et1235.epichosted.com;
}

location ~ ^/MySelfRegional/(.*)$ {
	set $subpath $1;
	if ($http_accept ~* "text/html") {
		return 302 https://mychart.selfregional.org/MySRH/$subpath$is_args$args;
	}
	rewrite ^ /MySRH/$subpath break;
	proxy_pass https://mychart.et1235.epichosted.com;
	proxy_set_header Host $host;
	proxy_set_header X-Real-IP $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forwarded-Proto $scheme;
}

location ~ ^/\ MySelfRegional/(.*)$ {
	if ($http_accept ~* "text/html") {
		return 302 https://mychart.selfregional.org/mysrh/$1;
	}
}
```