Monark
======
- The Native Instrument MiniMoog Clone
- The upper right corner of panel A is master volume

## Signal Path & Basics

![monark-1](/resources/images/music/monark_1.jpg)

- SR needs to be 96 KHz
- 3 Normal OSCillators providing the following waveforms:
	- triangle
	- triangle sawtooth
		- this is reverse sawtooth on OSC 3
	- sawtooth
	- square
	- narrow pulse
	- very narrow pulse
- A 4th OSCillator is the Noise oscillator, which can be used as a sound or modulation source
	- You can choose between White or Pink noise
- Load button: Adds overdrive / saturation to the signal in the filter stage
	- character is dependent on the input signal level
	- authentic analog sound is without this engaged (leftmost setting)
- Feedback: Lets you draw the output of the synth just before setting master level, and feeds it back into the filter stage.  There are two types.
	- Type A: heavily distorted- very dramatic- based on MiniMoog
	- Type B: more subtle saturation can be applied here

### Modulation

- Modulation targets can be:
	1. OSC1 and OSC2
		- To activate, flip the MOD switch in the OSC section
	2. Filter Cutoff
		- To activate, flip the MOD switch in the Filter & Amp section
- Modulation Sources can be:
	- OSC 3
		- Can modulate with a fixed pitch or with key-tracking (KT) on
		- Does not self modulate
		- Can be used as a sound and modulation source at the same time if you output it's signal in the mixer section.
	- Noise Osc (in the Mixer section)
		- Supports two kids of noise:
			- white: equal energy per frequency
			- pink: equal energy per octave
		- Like OSC3:
			- Does not self modulate (not sure this would matter anyways)
			- Can be used as a sound and modulation source at the same time if you output it's signal in the mixer section.
- Modulation amount:
	- Modulation amount is set by the Modulation Bend wheel in the Controls section
	- Use the knob to blend between the Noise and OSC3 Modulation source

## Filter

- Behavior of the filter can  depend on the signal input level.  It is more exaggerated as Load is turned up.
- Filter Types:
	- MM filter is the 'MiniMoog' emulated filter.  (24db/octave LP filter)
	- LP2: 12 dB/Octave Low-pass
	- LP1: 6 dB/Octave Low-pass
	- BP: 12 dB/Octave Band-pass
- There are 3 ways to modulate the Filter cutoff:
	1. Using Filter Envelope (see filter envelope section for more info)		
	2. Changing cutoff based on Key Tracking:
		- There are 4 KT settings here, which will add to the cutoff freq (in varying amounts) as you play up the keyboard
			- KT1 and 2 both on:  Full tracking
			- KT1 on 2 off: 1/3 kt
			- KT1 off 2 on: 2/3 kt
			- KT1 and 2 off: no kt
	3. Using Modulation source:
		- You have to turn on Filter MOdulation and then it depends on the Mod wheel and it's config
- Filter resonance puts a bump in the frequencies around the cutoff
- Filter can be made to self-oscillate, basically morphing into a pure sine around the cutoff
- Contour is the amount you want to apply the filter envelope to the filter cutoff

## Envelopes

- ADS Envelope	
	- Attack: Time to reach peak value
	- Decay: Time to reach sustain value
	- Sustain: Fraction of the peak value that should be held
	- Release: There is no independent release setting, but there's a release switch that controls effective release time.
		- OFF: A fixed fraction of the decay time
		- ON: Equal to the decay Time
- Envelope Triggering Algorithm depends on whether we're talking about the filter or amp envelope.  See respective sections below.

### Filter Envelope

- Triggering Algorithm: It never retriggers per note.
	- An envelope will start from their previous state:
		- So if you trigger another note while a release of a previous note is in progress, the attack will start not from 0, but the current value (based on the previous note's release phase)
- Envelope Polarity (switch under filter contour knob)
	- Normally the filter envlope (positive polarity) is used to sweep the cutoff from left to right.
	- Basically, whatever the envelope value is (y-coordinate), this is added to the cutoff.
	- In a negative polarity, it sweeps the filter cutoff from right to left during attack, and then back up in the sustain phase.	
	![negative-adsr](/resources/images/music/negative-VCF-ADSR.gif)
- Put simply, most envelopes specify a start and end point (typically the same value).  This envelope can be applied to the cutoff value, describing where it starts and ends (again, typically the same location).  Contour just describes the degree to which the envelope applies.


### Amp Envelope

- Triggering Algorithm: This depends on the B Panel Keyboard/Legato section's Envelope Retriggering Phase.
	- See the notes in 'Other Stuff'
	- Note that I have a hard time aurally verifying these different settings, so for the most part envelopes aren't retriggered.  But there's definitely some variation.

## Other stuff



### Pulse Width Modulation

- From the manual:
	> While MONARK offers a small selection of different pulse widths 
	> for the pulse wave, pulse width modulation seems to be a noticeable 
	> omission. Here's a little trick, though: since the third oscillator 
	> has a reversed sawtooth you can create pulse width modulation by 
	> combining it with a sawtooth of any of the remaining two oscillators. 
	> Set the oscillators to the same range, and make sure that they have 
	> an equal output level. If you detune the oscillators slightly you 
	> get a result similar to pulse width modulation.

### Feedback and Resonance

- Filter Resonance is actually based on a feedback circuit where you subtract the filter input from output. 	- This has the ultimate effect of emphasizing the harmonic content around the cutoff
	- increasing the resonance is just blending in this feeback path
- The feedback path in the mixer section is an additive feedback where you add the the master output back into the filter section.
- You can have both of these feedback signals cancel out:
	- Bring the synth to self oscillation:
		- Turn off leakage (just for demo'ing)
		- Mute all OSC's in mixer section
		- Turn resonance up and modulate it with OSC3
		- Press a note to trigger the filter
		- If you hear a tone, this is essentially self-oscillating
	- Now slowly add back in just feedback
		- You'll get full cancellation at some point
		- Then at another point as you increase the feedback, all hell breaks loose
- Another way to get self oscillation is to turn off all the oscillators, but turn on filter-envelope key tracking.
	- This is a way to approximate a sine wave


### Glide

- Glide just means whether you gliss from one note to the next
- There are 3 master glide modes:
	- OFF: no glide
	- Legato: only glide between overlapping notes
	- Always: always glide even if adjacent notes aren't overlapping
- There are 2 glide rate settings:
	- MM: 
		- Based on the MiniMoog behavior
		- Linear rate
	- Silver:
		- Linear, then decellerates as it gets closer to the target note
	- **TIME**: This sets the relative length of glide, so you'll get different results depending on the glide rate you select.

### B Panel

- Allows you to fine tune various configurations.
- These are not saved with snapshots, so if you call a snapshot up, your previous B panel settings are retained.
- Leakage:
	- You'll hear an OSC even when everything is turned down (emulates a real analog synth)
	- You can turn this down with the **Global Leakage knob** 
- Drift:
	- Another analog characteristic is filters drifting in and out of tune somewhat.  
	- You can control this with he **Global Drift knob** 
- Glide Ramp:
	- This isn't so important.
	- Basically asks you what to do when you're gliding to a note, but the note hits the release phase before reaching the ultimate destination.
		- Free Run: Lets it continue until it gets to the final pitch destination
		- Gated: Freezes at whatever pitch it was on when release phase is entered.

### Legato

- This explains a lot of it's monosynth behavior
- Priority:
	- When two notes are triggered (i.e. played legato / overlapping), it has to decide which to play:
		- High: the higher note
		- Low: the lower note
		- Last: the most recent note
- Envelope Retrigger:
	- This tells the synth what to do when it determines it needs to play a new note (which is dependent on the legato priority setting).
	- NEVER: If the envelope is still active when the new note comes on, envelope continues and does not restart.
	- NOTE ON: It gets retriggered when the new note on message arrives
	- NOTE OFF: 
	- **WARNING**: 
		- The behavior is hard to verify.
		- Be sure to turn off the Release phase on the amplitude envelope if you want to hear more clearly.

## Ableton Integration

- Terminology Note: I say 'Preset' but actually mean 'Snapshot' which lives in the ensemble file.  
- Saving a Monark Preset
	- Create an instrument rack
	- Drop the reaktor plugin into it
	- Open reaktor, choose 'Disk' tab in the browser and find your 'local copy' of the ensemble it in the filesystem
	- For each new snapshot in the User Snapshot bank:
		- In the file menu, click 'create local copy' and overwrite your current (local)
		- Put the ensemble in edit mode (the Tree icon in the main surface)
		- Go to the snapshot mode and use the 'Append' button at the bottom
			- This will create the snapshot in the next slot
			- Once named, just press return
	- Rename and save your instrument rack to your instrument rack library
- Updating a Preset
	- You can overwrite the snapshot using the 'Store' button
- Recalling a Monark Preset
	- Once you've loaded the local copy of the ensemble, change the browser tab to snapshots and click off, and then back on to the snapshot you want- this will clear the cache (which might be old).
- Saving a Monark Track / Device / Clip
	- Once you've saved your instrument rack, you can save the whole track including:
		- device
		- clips
	- drag the track into your monark folder in ableton
- After saving- commit to the folder's git repository so info isn't lost


## Preset Notes
- Lots of presets just filter on white noise, w/ no oscillators
- *warp* is kinda tobacco-y
- R2D2- use a lot of resonance (you can even use it with no oscs on)
- *caged rain* has some filtered guitary qualities (a lot depends on resonance and feedback)
- *Blockbuster* is a good pad example.  Is a chord with long envelope.
- *Black market* has a theremin-like vibratro
- *WTFunk* has a phaser-like effect when played in the bass, similar to some funk bass

## Suggested Patches to Program

- Fat bass
- Simple sub-bass, w blend with another instr
- Funky sq wave for lead riff
- Tobacco-esque
- Hi arp, computer, calm (triangle)
- Pads aplenty
- Med-High melodic
- Video game sound effects
- Other squeaky sound effects


## TODO
- Watch [this video series](https://www.youtube.com/watch?v=4MvRQ23i8wk)
- Review more about the sound design notes in the manual
- Walk through the presets again

## Misc Observations

- easy way to get getting key clicks is with a lot of contour on 
- a fast filter oscillation sounds better with the LP2 (12db/octave0 filter)
	- see preset Classic\Glassic
- more dramatic effects on filter modulation when you have a lot of contour, fast attack/decay, and low sustain.
- mixing in very narrow pulses at a lower volume, same pipe lenth, adds an almost modulation-sounding effect, but retain the character
-  



