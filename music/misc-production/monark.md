Monark
======

music/monark_1.jpg
music/monark_signal_routing.png

- Signal Path: 3 Oscs -> (optional 4th Osc) -> Filter -> Filter Env Gen -> Amp -> Env Gen -> (optional feedback to filter)
- SR needs to be 96 KHz
- Load button: Adds overdrive / saturation to the signal in the filter stage
- There are 2 kinds of feeback and 2 kinds of noise which can be generated.
    - Feedback:
        - Type A: heavily distorted
        - Type B: more subtle
    - Noise:
        - White
        - Pink
- Behavior of the filter can also depend on the signal input level.  It is more exaggerated as Load is turned up.
- Envelopes are ADS: the release phase is omitted but it can be turned on with a switch in which case it will be a fraction of the decay time.
- Keytracking can be turned off for Osc 3 (see the kt switch), a lot of times that means you want it to be a modulation source. 
- Oscillators 1-2 will respond to Modulation of Osc 3 if the Osc section MOD switch is turned on.
    - The amount is controlled by the mod wheel
    - The MOD switch in the Filter section lets you use Osc 3 to modulate filter cutoff
    - The Modulation section lets you specify:
        - How much modulation you want to apply (wheel next to PB)
        - The blending of the source from OSC3 or Noise
- Mixer section takes output from OSC, combines Noise, and possibly adds load, and then passes on to Filter section
- 3 of 4 filter types are LowPass, the other is a band-pass which will also dampen high freq content
	- the responses of the filter vary with the amount of load placed on them!
- There are 3 ways to modulate the Filter cutoff:
	1. Using Filter Envelope:
		- ADS Envelope:
			- There is no Release, but there's a Release Button that will use the Decay time as release
		- The +/- button allows you to reverse the polarity (invert) the filter envelope

	2. Changing cutoff based on Key Tracking:
		- There are 4 KT settings here, which will add to the cutoff freq (in varying amounts) as you play up the keyboard
			- KT1 and 2 both on:  Full tracking
			- KT1 on 2 off: 1/3 kt
			- KT1 off 2 on: 2/3 kt
			- KT1 and 2 off: no kt
	3. Using Modulation source:
		- You have to turn on Filter MOdulation and then it depends on the Mod wheel and it's config

-

- Lots of presets just filter on white noise, w/ no oscillators
- Preset "warp" is kinda tobacco-y
- R2D2- use a lot of resonance (you can even use it with no oscs on)
- preset caged rain has some filtered guitary qualities (a lot depends on resonance and feedback)
