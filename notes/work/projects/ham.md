# The Ham



## Log

- 24/02/05 - updated notes
- 23/11/12 - started page


## About

( 23/11/12 ) This project started as a conversation between a couple friends about an old meetup group we called "The No Bullshit Club". Unsure of specifics at this point. I need to make some notes here on broadcasting equipment and workflow.  I'd also like to consolidate my old http://radio.davidawindham.com project into it while I'm moving it from [Woozer](/docs/computers/woozer) to [Woozie](/docs/computers/woozie). I'm calling the project [The Ham](https://the-ham.org) for now as a reference to my last name and HAM radio. 

I added a multi-track setup a new microphone this week that'll allow me to record each channel separately and then polish them down in Audition. I also figured out how to use a new VOIP application ( Murmur/Mumble ) so that I don't have to pipe your audio in via a phone call or other application. This will give me very high-quality audio from your microphones with low latency. It'll also give spacial audio to each microphone so that one is on the left, the right and the center. I'll need to show you how to install and connect to my VOIP server. It'll also free up my line to call other guests. I'd like to test this out with y'all live sometime in the next week so y'all are pumped about it before LEAF.

I've got an RMTP server so that I can schedule streams to all providers ( twitch, fb, yt, spotify, apple music, etc.. ) on a schedule. I've had a lot of thought about the on-demand idea of podcasting vs. live broadcasting and I'm strongly leaning towards pre-recording, mixing, and then streaming it on a schedule that kinda mirrors when they were recording. Gotta take all of the pressure off of us to make it fun. Live is tougher in that it makes people change their personalities and makesfor mistakes.

If it works, I'll pitch in the $500 to add an audio board to make the real-time mix easier than working on the screen. If that works, I'm gonna pitch in a grand to license ASCAP, BMI, & South Exchange so we can play whatever we'd like without being sued or shut down by distributors.  Only a couple of rules will apply like we won't be able to play more than 4 songs from one artist within a three-hour timeline. I'll also have to do reporting on our listenership to my licensing accounts. No specified format, but likely an hour and a half with at least a third to half music.

The only other thing is to publish a domain and a show name. No bullshit can be a segment, but I'm not too keen on it in a domain. I've got one that I think will work. the-ham.org because of the connection to ham radio and 'ham it up'. I previously owned a couple of international .am and .fm domains but I prefer short top-level domains.

## Notes

( 24/02/05 ) I'm adding some additional notes to this page so that I can use it to help communicate to a couple other folks I'm dragging into the conversation. Because one of our most cherished local oldies format radio stations got sold to a Christian Broadcasting company, I'm now exploring FM broadcasting for our local market as well although I'm still pretty convinced that a newer model exists.


## Todo

- set it up
   - business accounts
   - software equipment
   - licensing
- people  
  - Woody
  - attorney
  - local personalities
  - Gary - festival
- orgs
  - chamber
  - city

## Licensing and Regulatory Compliance

- Business structure
  - 501c3 status as non-profit
  - attorney / accountant
  - document some similar models
- ASCAP, BMI, SESEC
  - playback/listener reporting
- FCC Low Power FM
  - channel placement


## Publishing

- content management
 - domain
- supporter platform
  - payments billing/subscription
  - advertising placement
- charts / stats
- on-air realtime feedback

## Studio

- Tascam Mix
- Roland SR-20HD Direct Streaming A/V Mixer
- [Murmur/Mumble](https://wiki.mumble.info/wiki/Main_Page)
- Adobe Audition - mixing recording
- Rogue Ameoba - Audio Hijack / Loopback
- video - cameras/remote broadcast
- lavalier mics
- moveable phone line

## Broadcasting

- 10,000W FM Transmitter
- FM Antenna

## Streaming

- Nginx RMTP - [https://github.com/arut/nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)
  - modules for multi-platform simulcast
- Icecast-kh  - [https://github.com/karlheyes/icecast-kh](https://github.com/karlheyes/icecast-kh)
- Android/iOS app - custom/prebuilt?
- Programming software


---

## References

- https://www.linode.com/docs/guides/set-up-a-streaming-rtmp-server/
- https://www.digitalocean.com/community/tutorials/how-to-set-up-a-video-streaming-server-using-nginx-rtmp-on-ubuntu-20-04
- https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-web-server-and-reverse-proxy-for-apache-on-one-ubuntu-18-04-server
- https://tariosultan.com/blog/how-to-make-circle-webcam-in-obs
- https://github.com/videojs/video.js
- https://github.com/videojs/http-streaming
- https://github.com/silvermine/videojs-airplay
- https://developer.apple.com/streaming/
- https://www.npmjs.com/package/m3u8-parser
- https://serverfault.com/questions/1019317/receiving-rtmps-stream-on-nginx-rtmp
