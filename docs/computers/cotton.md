# Cotton 🐈

This computer is named after Cotton - [https://davidwindham.com/cotton-2/](https://davidwindham.com/cotton-2/) because it'll be right up under my feet and at my fingertips.

It seems like I stagger migrations every other year between servers.  It seems I'm always looking to up the horsepower but I think this will be the first remote machine I lease with some dedicated GPU horsepower for spitting out more complex API requests.  I've also also decided that instead of playing whack-a-mole with production server configurations, I'd just host an almost exact copy locally so that I can rsync em up anytime. Although most of my production servers are using AMD Ryzen processors, ~~I can use my old [mac mini](/docs/computers/macs) with an intel i7 as a substitute~~... after running through a quick test of the old mac mini, it seems that the old thermal paste is dried out causing too much heat and I'm worried that with a different fan control from Ubuntu I'm going to run into problems on down the road because it'll be in a cabinet alongside of an amplifier that also generates heat. I'm going with a new Ryzen 7 box instead.

## Log

- **26/07/15** - placeholder for updated server to replace [Zeke](/docs/computers/zeke)
  - Ubuntu 26.04 LTS (Resolute Raccoon) will run until 2031 or 2036 with ESM.

## Notes



## Local 



### Hardware

Beelink EQR7 Mini PC,AMD Ryzen 7 7735U - 24GB LPDDR5 RAM 500GB M.2 PCIE4.0x4 SSD Graphics 12core 2200MHz

-  "U" designation means it is a low-voltage ultra-efficient chip designed to operate between 15W to 30W TDP.
- bottom-intake silent fan means the EQR7 will run incredibly cool and virtually silent when serving up Linux containers.
- hdi-usb-c video capture dongle to use ipad as temp monitor with Orion.
- mini perixx usb keyboard
- underdesk metal mount for cabinet ( bottom airflow )


### Setup 
1. Enable Restore After Power Loss (Auto Power On)

[https://buildin.ai/lizong/share/add4cf2b-af4d-460d-a7a2-2d3adbd608a6](https://buildin.ai/lizong/share/add4cf2b-af4d-460d-a7a2-2d3adbd608a6) 
- Shut down the system completely.
- Turn it on, and immediately tap the Del key repeatedly to enter the BIOS.
- Use the arrow keys to navigate to the Advanced tab.
- Scroll down and enter AMD CBS.
- Select FCH Common options.
- Enter Ac Power Loss Options.
- Change the setting from Always Off to Always On.
- Press F4 to save your configuration and exit.

2. Enable Wake-on-LAN - The EQR7 hardware natively supports magic packets across its dual Gigabit Ethernet ports.
- In the BIOS: Navigate to the Advanced tab. 
- Look for APM Configuration or Network Stack Configuration and ensure Wake-on-LAN (or Resume By Onboard LAN) is toggled to Enabled.
- In Ubuntu Server: Linux natively controls the network interfaces. You must tell Ubuntu to listen for the magic packet before it powers down.
  - Install ethtool: ```sudo apt install ethtool```
  - Check your ethernet port name (e.g., enp2s0 or eth0): ip aEnable WOL on that port: ```sudo ethtool -s <interface_name> wol g```
  
(Note: To make this persistent in Ubuntu so it stays active after reboots, you will want to add a quick systemd service file or a cron @reboot task targeting that ethtool command).

