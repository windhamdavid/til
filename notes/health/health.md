# Health

## TOC 

[diet](diet.md) |
[health](health.md) |
[mental](mental.md)


## Log

- 25/05/08 - talked with a fella recently who had prostate cancer. considering my doc has only prescribed one medicine in the last ten years for an enlarged prostate, I wanted to make a note about new PSA ( prostate-specific antigen ) tests available so I could follow up on my next appointment. 
- 24/12/16 - added an Apple Watch mainly for biometric feedback. will [figure out an easy way](#parsing-apple-health-data) to automate and export every so often so I can store it here. 
- 24/12/07 - hip injury ( IT band muscles / labral ) likely related to playing [tennis](/notes/play/tennis) - need to consider a more wholistic and low impact regular excersize routine like walking, swimming, pilates, & yoga. 
- 23/12/17 - added a [Diet](/notes/health/diet) log.
- 23/12/17 - added a ^ sleep log.
- 23/12/17 - bout that time of year to start thinking about losing weight so I spent some time this morning converting my health status downloads to a decent format and I figured I'd update this page and figure out a way to keep them in sync. 

> ^ keeping some items private via `draft` status and `.gitignore` ( No worries, I'm pretty sure my health insurer is getting a pretty good deal anyway )

## Todo

- lose 15 lbs
- Shingles Vaccine
- ask about regular PSA tests

## Status

- **Age**: 50
- **Medications**: none ✅ ( trying to keep it this way )
  - occasionally take aspirin
- **Weight**: Current: 190 lbs ( Healthy BMI is 130-175 / Ideal - 160 ❌ Target 🎯 - 175)
- **Blood Pressure**: 110/70 (23/10/31 - good ✅ )
- **HDL** cholesterol: 38mg/dL ( Low ❌ 40-60 mg/dL ) Ratio 4.1 ( Normal ✅ < 4.5 )
  - lose weight 😢 < 15lbs / exercise more
  - more fish/flax/greens & less sugar/carbs
  - possible familial mixed hyperlipidemia ( inherited )
- **LDL** cholesterol: Calculated 89 ( Normal ✅ < 129mg/dL )
- **Cholesterol**: Calculated - 150 ( Normal ✅ < 200mg/dL )
- **Triglycerides**: 130  ( Normal ✅ < 150mg/dL )
- **TSH**: 1.654 ( Normal )
- **Urinalysis**: ( Normal  ✅ 0.550 - 4.780 uIU/mL )
- **Blood** Other:
  - previously had high C-reactive proteins indicating inflammation/infection
- **Skin**: Too much sun from tennis via dermatologist
- **Colon**: clear ✅ 23/05/20 ( doc recommended early since family history )

( Last Metabolic Panel 23/05/18 )

### Genetic

- Age-related macular degeneration ( DNA test )
- diabetes ( dad's )
- colon/intestine ( mom's )

## TOC

### Physical

[Diet](/notes/health/diet) | exercise | sleep | genetics

#### Environment

house | weather | air quality | clothing | shoes

### Mental

mindset | play | learn | social | meditation | spirit

## About

23/12/17 - I'd just like to keep some notes along the way so I have a reference. I'm just like everyone else about this time of year. I have a pretty holistic sorta mindset on health even though I've found myself with some weaknesses over the years. I smoked cigarettes in college and for a few years following. I'm in pretty good shape right now, but I come from a long line of plump little Welshmen so I'm privy to indulge. My eyes have suffered in recent years from screen time and the only DNA marker risk I have is macular degeneration. My dad and a couple of his brothers have onset diabetes so I'm going to try and avoid it altogether with exercise and diet. In regards to wholistic, I find it odd that folks will wear a device to track the thirty minutes of steps they do a day and ignore the other 1410 minutes. Aside from genetics, I think the most important impact on health is your routine, especially lifestyle, diet, sleep, and exercise so I'll start by logging some of those.

### Sync

I noticed a project not too long ago on Github that allows for an open-source export of your medical data from MyChart and others. Would like to explore that at some point so I could just sync the blood, lipid panel, and other tests... so I can move that data around at will mainly because I like the control and I think there will end up being decent AI diagnostic tools available in the future.

related 
- Mere Medical - https://github.com/cfu288/mere-medical
- https://github.com/k0rventen/apple-health-grafana

#### Parsing Apple Health data

If you’ve ever wanted to analyze your own health data, here’s how.

###### Exporting as XML

1. Open the [Health app](https://www.apple.com/ca/ios/health/).
1. Tap on your profile in the top right.
1. Tap Export All Health Data.
1. Share the archive with yourself (e.g. via AirDrop, Files, Mail, etc.).

Within the archive, you’ll find `export.xml`. This is where the main metrics are stored.

##### Converting to JSON

If you open `export.xml`, you'll see most of the interesting data is contained in the attributes of `Record` elements.
So let's make a small Python script to convert those attributes to JSON.

Save the following to a file called `parse.py`:

```python
import json
import sys
from xml.etree.ElementTree import iterparse

for _, elem in iterparse(sys.argv[1]):
    if elem.tag == "Record":
        print(json.dumps(elem.attrib))
```

Then run:

```shell
python parse.py export.xml
```

You should immediately start seeing the data in your terminal.

###### Converting to CSV

Using jq, we can convert the JSON to CSV:

```shell
python parse.py export.xml | jq -r '[.endDate, .type, .unit, .value] | @csv'
```

If you prefer TSV (e.g. for processing with `cut`), replace `@csv` by `@tsv`.

Save the data to a file and analyze with your favorite software.



