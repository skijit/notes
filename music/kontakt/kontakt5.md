Kontakt 5
==========
- Notes collected mainly from the manual
- Probably not good introductory material, but more useful to reinforce/refresh existing knowledge
- KSP reference [here](/music/kontakt/ksp)

## Hierarchy
- Multi (collection of instruments)
	- instrument bank : wrapper for exclusive instruments.
		- instrument 
			- group
				- zone
					- samples
- Instrument Multi : wrapper for parallel (inclusive) instruments.


## Routing
- [Good tutorial here](http://www.kontakttutorials.com/kontakt-tutorials/instrument-routing-in-kontakt-part-1/)
- ![kontakt routing diagram](/resources/images/music/kontakt-routing.png)

### Group Level Modules
- Group Insert Effects
    - You can load up preset chains
    - Affects full group
    - 8 slots: 
        - 1-6 are by default Pre-Amplifier (but in K5 and later, each of these can be configured to be post amp)
        - 7-8 are post amplifier
    - Processed in order- left to right
    - Send Effect:
        - You can assign a Group insert effect slot to a Send Effect
        - Once you have, the Effect Module's Parameters section will be empty until you enter some effect modules into the Send Effects Section.  At that point, back in the Effect Module's Parameter section for GRoup Insert effects, you will be able to set the Send Amount for each Send Effects Module, and you can even modulate this however you like.
        - Send Effects are still Instrument Specific.
        - Each Module in the Send Effect Section has a 'Return', which indicates the amount and routing of the processed signal.  You can route this either back to the Instrument Ouput or to an Aux channel.
    - Efficiency:
        Each effect chain is calculated separately depending on the amount of voices you have.  So it's often more efficient to use the Bus Insert Effects or Instrument Insert Effects.	
		- Amplifier Section:
			You can set the volume, panning, channel assignment, and stage routing before outputting to the instrument level sections of the signal path (Bus insert effects, instrument insert effects, instrument send effects, and intstrument output).  For stage routing, your options are to send to default (Instrument Effects?) or any of the Bus Insert Effect banks.

### Instrument Level Modules:
- Bus Insert Effects
    - A group of separate effects chain for all groups in the instrument 
    - BUT it's not an active path unless a Group Amplifier section routes explicitly to that Bus
    - You can use up to 16 bus banks, each of which contains a chain of 8 effect modules
    - Each bank is the same as the group insert effect (e.g. left to right, etc.), except that none can be set up Post Amp (since we're at the instrument level now)
	- Each bank is summed together and then passed to an output stage where you can control volume, panning, and routing.  
    - The default routing is to the Instrument Insert Effects, but you can choose to bypass that stage and go directly to Instrument
- Instrument Insert Effects:
    - Like the Bus Insert Effects, except that it is always active, unless an active Bus explicitly Bypasses it.
	- You can have Send Effects just like in Group Effects.
- Instrument Send
    - Each Send module is like a separate channel insofar as when sending, you specify how much of each channel to send.  
    - The output is then directed to the Instrument output stage or to some Aux channels.
- Instrument Output
    - Defined in the instrument header (just indicates the output channel and probably level)
- Output Section
    - How to route to an aux channel:
        - Click Aux on Instrument Header
        - Route any Send Effect to an Aux (instead of instrument output)
    - If you want to use a Group Send Effect as a passthrough to an Aux module, just add a Gainer module (leave db at 0 and it's basically pass-through) and set the output to the Aux channel you want.

## Loading, Saving, and File Types
- Saving and Loading Presets
    - Presets are specific to the Kontakt environment module you're using, so loading one won't affect other parts of the application.
    - Extension .nkp
    - Factory Presets (not writable normally) live here: `Macintosh HD/Library/Application Support/Native Instruments/Kontakt 5/presets`
    - User Presets live here: `Macintosh HD/Users/[username]/Documents/Native Instruments/Kontakt 5/presets`
- Extensions:
    - .nki : instrument
    - .nkm : multi
    - .nkb : instrument bank
    - .nkg : group
- Saving an Instrument Patch:
    - In the Instrument Header, there is a toggle for Information (i) view and Snapshot (camera) view.  Click the Snapshot view and then click the '+' on the disk to save the snapshot (essentially you're current patch)
- Saving an instrument:
    - Patch + Samples: Save a "Samples" folder in same location as the .nki file
    - Monolith: Save everything to a single file (good for redist)
    - [More instructions for saving an instrument](http://www.native-instruments.com/en/support/knowledge-base/show/1034/where-should-i-save-my-custom-kontakt-5-instruments/)

## Interface Sections                           
- Custom Performance Views:
    - You need to use KSP (scripting language) to build these           
- Edit Window Sections:
    - Script Editor
    - Group Editor
    - Mapping Editor
    - Wave Editor: create loops, zone envelopes, slice markers, etc.
    - Source Module: sets sample playback for a group (ex: tuning , tracking, release trigger, etc.)
    - Source Modulation Router: Modulation assignemnts which change parameters of source module over time
    - Group Insert Effects      
    - Amplifier Module
    - Modulation Sources
- External Windows:
    - Mapping Editor and Wave Editor can be opened in larger, external windows by clicking the arrow next to their buttons in the toggle row
- Quick Load Catalog / Browser:
    - You can create a hierarchical bookmarking system for instruments, banks, etc. with quick load catalog
    - To access the quick load catalog, open the quick load browser by right clicking on empty space in the rack
    - There are various places in the interface that allow you to load from the quick load catalog.  E.g. "New Instrument From List"

## Group Editor
- You can export/import groups to/from different instruments
- 4 sections:
    1. Control Header:
        - **Edit All Groups Button**: will check all group checkboxes in group list
            - Avoid using this button.  Remember that group defines the signal processing path, so if you have this 'select all', then you go down to the Group Insert Effects section and make a change, it will be applicable to all Groups.
        - Group selector
        - Actions (default: 'edit'):  Options include Edit, Delete, copy, duplicate, etc.
        - Group solo
        - Select By Midi: If this button is enabled, you can select groups by playing the Notes on your keyboard    
    2. Groups List
        - The monitor tab in the browser window can also represent groups nicely       
    3. Voice group options:
        - Assigns each group to one of 128 predefined 'Voice Groups', which defines how many voices can be played at once (1 = ~choke group)
        - Another way to get 'Choke Group' functionality is the 'Exclusive Group' button on the right- this provides 16 predefined groups to assign each group to, which will make them exclusive across groups.
        - The other buttons in here just refer to how to handle events with too many sounding voices.                   
    4. Group Start Options:
        - Allows you to set up conditions for activating the group including round robin usage, key switches, or other triggers to switch groups (e.g. sustain pedal)
        - Start On Key: sets up a key switch
            - Note that some keyswitches are in negative octaves: EG C-2, so you may not see the keyswitch in the default keyboard
            - Example: Piano range starts at A0, but Midi range starts at C-2
        - Start on Controller: Midi CC-based switch
        - Cycle Round Robin or Cycle Random 
            - if there are multiple active groups with this group start option and containing zones which match the key and velocity range, they'll be cycled.

## Mapping Editor:
- 3 sections:
    - Control strip with 2 rows of buttons
    - Status line to display the parameters of the currently selected zone
    - Zone grid
- Zone Grid:
    - horizontal defines key range, vertical is velocity range
    - zoom either dimension with scrollbars and buttons
    - "rubber band" view: click alt and drag over what you want to zoom into
- Manually Creating Zones
    - Dragging a single sample from browser:
        - Will span entire velocity range
        - Mouse at bottom of grid will assign to a single key, at top, will assign to more keys
        - Dragging multiple samples:
            - Will create non-overlapping zone whose key range depends on how high your mouse is.
            - If you drag them onto a specific key in the keyboard, it will partition the samples by velocity on that key.
- Mapping Samples Automatically:
    - Drag all your samples onto the grid, then select them all.  Then in the edit menu, select 'Auto map- Setup' and it will parse the filenames into segments, which you can use to specify how it should be handled.
- Editing Zones
    - Using the status line:
        - You can change a zone's parameters in the status line (once it is selected in the grid)
    - Directly in the grid:
        - Move around the zone as you see fit... some more interesting changes are below:
            - Clicking on the yellow key in the keyboard will change the zone's root key
            - Ctrl click on the border of a zone will create a zone crossfade
            - To access zones which are hidden underneath, press Command-click and it will cycle through the stacked zones
            - You can select multiple zones at once and apply the various changes
    - Using Midi:
        - Select the zone in the grid, then in the control strip, select either of the midi buttons (one with horizontal and one with vertical arrows) to change the key or velocity range
- Control Strip
    - Edit and Batch functions drop down: Lots of stuff in here for creating/cloning/moving zones/groups
    - Batch functions which let you move root keys to upper/lower borders and also creating crossfades by key or velocity
    - Select zone via MIDI button
    - Lots of functions for partitioning, managing overlaps of zones or selecting zones via group or vice versa
                   
## Wave Editor
- 5 basic functions available in the wave editor:
    1. View/audition samples
    2. Create/Edit loops
    3. Slice zones
    4. Zone Envelopes: draw envelopes right on top of sample
    5. Destructive sample editing
- Displays the sample corresponding to the currently selected zone.  So keep the mapping editor open along with the wav.

### Interface
- Top Section
    - Tool Bar for common functions (top row)
        - Magnify Tool: Press this button then highlight some area in the waveform to zoom in.  Or if this button is not highlighted, press alt and highlight some region.  Press mouse anywhere to zoom back out.
        - Jump to Zone Start
        - Jump to Loop Start
        - Zoom on loop
        - Jump to Loop End
        - Jump to Zone End
        - Snap Loop: two options, after selecting one you'll need to manually move the loop start and end points to take effect
            - Snap to Zero Crossing: 
            - Snap to Value Crossing: match the value and direction of the other loop end point
        - Commands (there are a bunch of other less useful functions):
            - Find Loop End (short) [when loop region is selected]: looks locally for a good loop end point
            - Find Loop End (long) [when loop region is selected]: looks broader for a good loop end point
            - DC Removal
        - Auto Pre Listen: auto-play whatever region you click on in the sample editor
    - Status bar (bottom row)
        - Sample Filename
        - Sample Start: is shown by vertical green line
        - Sample Modulation Range: is shown by a horizontal green range to both sides of the start marker
            - You still need to add a modulator to the sample start: try using Random Unipolar (External Mods section), drag it to the Tune knob in the Source section, then change the assignment to sample start!
- Middle Section
    - Waveform view
        - Green vertical line: start position
        - Red vertical line: end position
        - Loop region will be denoted by a dashed horizontal line.  It shows up more clearly when the sample loop tab is selected.
- Bottom Section
    - Grid panel: 
        - Grid panel controls a lot of functionality in the 4 adjacent tabs.
        - It allows you to create slices (using markers).
            - Things that can snap to slices: loop regions, zone envelopes, destructive editing
            - You can also trigger the regions independently
        - Turning on Grid: Power button in upper left
        - 2 methods for Slice marker placement (which correspond to the tabs in the Grid panel)
            - Fix mode: for rhtymically accurate music
                - Sets the signature and BPM in the bottom and slice width (16th note default) above
                - If it doubles or halves the length of your slice, goto Sync/Slice tab and change the tempo with the +/- buttons next to it
            - Auto Mode:
                - There's a slider to set peak threshold for transient detection
            - Manually editing slices: use the toolbar in the far right of the grid panel
                - The + button lets you add new markers
                - The - button lets you remove new markers
                - The lock button, locks all markers from change
    - 4 tabs for common functions:
        1. Sample Loop:
            - To turn on, click the power button
            - You can select up to 8 loops in a zone.  Each of the 8 buttons may have one of 3 states, indicated by color:
                - Dark blue: not defined, or disabled
                - Yellow: active and currently highlighted
                - Light blue: active but not currently highlighted
                - **Why are there 8 loops?  How do they get triggered?**
                    - Each loop will somehow correspond to a slice in your sample, and can be triggered independently.
                    - This lets you chop up your samples... which is something you'd probably do in your DAW, but you can do it here too.  (Maybe there are some benefits to using Kontakt-- I don't know yet)
            - Various buttons are mostly self-explanatory
            - Loop Edit button: Helps you find perfectly matched loop points by splitting the screen into a left/right side:
                - Left side: waveform just before loop endpoint
                - Right side: wavefrom just after loop startpoint
                - You can then drag graphically to find a suitable start/endpoint 
            - Tune: Change the tuning once it starts looping
            - Count: How many times to loop.  0 means loop forever.
            - Loop Mode: Options include:
                - Until End: Play loop in a forward direction, even during release phase
                - Until End <->: Play fwd/back, even during release phase
                - Until Release: Fwd loop until release phase
                - Until Release <->: Fwd/Back loop until release phase
                - One shot: just play it once all the way through (don't use with a volume envelope on your group)
                - Note: If you want to play the samples in reverse, you go to the **Source section** of the group and select the 'Reverse' button
        2. Sync/Slice:
            - Remember to set up your grid before using any of these functions
            - To turn this tab on, you need to select whether you're using 'Beat Machine' or 'Time Machine Pro'
            - There are 4 approaches to getting playback independent of original tempo or sequence:
                1. Using Beat Machine:  use for percussive material
                2. Using Time Machine Pro: use for tonal material 
                    - you don't need slices for this- but you do need to specify bpm or length of sample)	
                3. Map Slices to Midi (manually)
                    - Select the slices you want and then drag them into the mapping editor- it will create new zones for each slice
                4) Map Slices to Midi (automatically create zones for all slices and a midi sequence with appropriate timing)
                    - Setting AutoFade Time will create a zone envelope with a fade-in/out corresponding to this amount
                    - Mapping Base key is where to place the first note and auto-find empty keys will skip keys if collisions w/ existing zones are found.
                    - To execute the automapping, click the Drag N Drop MIDI button and it will map the zones and add a midi file which you can drag to your desktop or drop in your DAW
        3. Zone Envelopes
            - Envelopes, just like LFO's, are a good way to modulate some parameters
            - Typically, envelope-based modulations come from an envelope-generator and are applied to an entire group
            - Sometimes though, it's nice to have a zone-specific envelope and since it is sample-specific, you can draw it right on top of the waveform in the sample view
            - First step is to select which parameter you want to modulate.  There are 3 buttons:
                - Volume
                - Pan
                - Add last touched: allows you to select any parameter appearing in the group-level module, just click that control and it should populate
            - You can add as many zone-envelopes as you like, although it will only show you one at a time.  To select a different one, click the drop-down button
            - Editing the envelope is done by right-clicking to get breakpoints in the envelope (do the same to remove them), and then moving them around or affecting the curve.
            - If you want to affect one section differently, you can put a Send module in the Group insert effects and then modulate the send level with a zone envelope.  (ex getting reverb on a dub beat snare hit).
            - Pencil tool allows you to create discrete/stepwise changes between slices.  The Randomize Envelope button lets you randomize this.  (grid needs to be on, of course)
            - You can cut/copy/paste envelopes.
            - Looping the Envelope: You can create an envelope loop!  If you want it to correspond to a looped portion of the sample, select that loop in the Loop tab, then go back to Zone-envelope and click 'Copy Current Sample Loop'
            - The 'Envelope follows playback speed' makes sure that the envelope will stay in sync with the play speed of the waveform (for instance in Sampler or DFD mode since it might play faster if you are playing it an octave up).  Otherwise the envelope follows the base-speed.
        4. Sample Editor
            - Cut, paste, add fades, remove dc bias,
            - You can REVERSE here
            - Has undo/redo buttons
            - Destructive editing, but Only is effective once you save!

## Script Editor
- When you open the Script section (pressing the script button), there are 5 slots.  
- These process L to R, so it's like a chain of scripts.
- To access existing scripts, open up one of the slots and select 'presets'
- You can save script presets (the macro settings)
- The script is where you make controls available in performance view 
- The other use case is for programmatically changing parameters or the incoming MIDI

## Source Module
- Start the signal flow (set per Group) and provides different sample playback engines:
    - Sampler: All data kept in Ram
    - DFD: Stream from disk
    - Tone Machine: Change pitch and formants independent from playback speed (using granular synthesis)
        - This can really change the sound of your samples, so if you're interested in realism, you might want to use a different source.
        - Given the other time-stretching source options, I think this one is more a sound-design/effect
    - Time Machine (I and II): Time warp your samples without changing pitch.  
        - TMII is optimized for percussive material.
    - Time Machine Pro: High quality warping
        - MUCH more realistic for tonal stuff than tone machine.
    - Beat Machine: Drum loops with slices/markers which can be tempo-matched
        - Dont select this option in the source module- you should do it int he Sync/Slice tab of the wav editor instead
    -S1200: emulate old MPC sampler from 80s with 12 bit, 26 khZ
    -MP60: another MPC emulation at a slightly higher quality
                               
## Amplifier Module                                          
- Adjust volume and pan before passing to Instrument Level
- Change routing: instead of passing to instrument inserts, you can pass to instrument bus effects
- Modulate it: particularly volume modulation
    - Why: b/c it's not going to scale the volume by velocity (unless you're crossfading on velocity) for the specific sample
        - [REVISIT this](http://www.kontakttutorials.com/kontakt-tutorials/how-to-modulate-volume-with-velocity-and-ahdsr/)
        - Seems like for Volume Envelopes, you must need to apply them in the amplifier section?
    - Still a Group level element- as such it applies to all zones in the group.  If you want to affect just one zone, use Zone Envelopes

## Signal Processors In Kontakt
- Difference between Insert and Sends: Sends get a variable amount of input on the signal              
- Difference between Instrument Bus and Instrument Insert Effects : Bus is only active if a group routes to it (in the group amplifer output section)
- If you want to effect output across multiple instruments, you can use inserts or sends, in the Output section:
    - Sends across multiple instruments are generally called 'Aux'
    - See manual for how to use these

## Effects
- Drag from Modules tab of Browser into a free effects slot
- AET Filter
- Compressor
- Solid Bus Compressor : modelled after a classic analog compressor
- Limiter:
- Transient Master: Basically reshapes the envelope by bringing up/down the attack (which is useful for positioning in room: up=bring to front, down=set back), or up/down the sustain.  Good for material with fast attacks like drums, pianos, etc.
- Tape Saturator
- Distortion
- LoFi: adds quantization noise or aliasing
- Saturation
- Cabinet:
- Skreamer: warmer and smooterh overdirve than Distortion effects
- Twang: tube guitar amp sound
- Rotator: Leslie-like effect
- Surround Panner:
- Delay
- Chorus
- Flanger
- Phaser
- Convolution- reverb
- Reverb
- Gainer: has 2 purposes: 
    1. add additional gain, 
    2. use to send to an Aux channel, and specify the return
- Inverter
- Send Levels

## Filters
- Bandpass filter: attenuates signals above and below the cutoff
- Peak filter: a very narrow bandpass filter
- Notch Filter: only removes frequency around the cutoff
- Low Shelf is like the opposite of a hi-pass filter, and vice versa
- Categories of filters:
    - State Variable (SV): new in Kontakt, clean, suitable for all audio
    - Legacy: old algorithm, use SV instead of these
    - Adaptive Resonance (AR): scale the Q b the inverse of amplitude so nasty peaks are avoided.  Good for drums, loops, full mix. **TODO: clarify the AR filter type**
    - Ladder: based on classic synthesizers
    - Daft: Taken from Massive filter collection.  It is a more agressive synth filter design.
    - Pro 53: simulate analog synth from 80s
- Solid G-EQ: 4 band parametric eq based on analog circuitry  
- AET filters are filters which boost/attenuate frequencies in one sample according to the timbral characteristics of another.
	- could be very useful for swells.
	- i dl'ed some tutorials in this same directory (in pdf's)- check for more info
  

## Modulation Routing and Control
- Modulation Sources:
    - Envelopes
    - LFO's
    - External Sources: incoming MIDI data (e.g. CC or velocity) or contant or random values
        - Others: like step sequencers or envelope followers
- Modulation is possible most Group level modules' parameters.  
    - Outside the group level, (instrument inserts, send effects, etc) cannot be modulated.  
    - However, you can have the same modulation source for any number of parameters.
- 2 Methods for Adding modulation:
    1. Right click on the knob you want to modulate, then select the existing modulation source or pick a new one
    2. In browser, select Modules tab, then select Modulators.  Drag and drop onto parameter you want to modulate.
- Modulation sources are at the bottom of the rack
- Modulation router table is specific to each Group-level module and it indicates the parameters that are specific to that parameter being modulated 
    - b/c even if two parameters may be modulated by the same source, there might be differences in how those sources fully affect the parameter.  
    - These are called the Assignment Controls in the Modulation Router.
- Modulation Router table
    - Modulation Source
    - Quick Jump button: sends you to the modulation source module (if applicable)
    - MIDI CC Number: which CC# to listen to (if the modulation source is MIDI CC)
    - MIDI CC Default value (if the modulation source is MIDI CC): default value since the position won't be known until the knob/slider changes
    - Modulation Shaper allows two modes for drawing envelopes for how the modulation source might affect the parameter (ENVELOPE TO A MODULATION, LIKE AN LFO)
    - Invert button: inverts the direction of modulation for the specific parameter.  (THIS COULD BE NEAT FOR DOING COMPLEMENTARY MODULATION FOR 2 PARAMTERS FROM A SINGLE SOURCE)
    - Modulation Intensity Slider: how much the parameter values will respond to the given source
    - Lag/Smoothing:  This displays the amount of time it should take to go from a modulation source's initial value to it's new value.  B/c sometimes there can be big jumps (e.g. MIDI CC data) which you might want to smooth.  You could also use this to simulated a 'slurred' rectangle or sawtooth modulation.

## Modulation Sources
- Envelopes:
    - AHDSR: Attack, Hold, Decay, Sustain, Release
        - AHD only button: Good for drums and percussion, this eliminates the sustain and release.  So it is independent of how long you hold down the key.
        - Retrigger button: retrigger for each new note.  This matters when you have overlapping notes and there's a question of whether the envelope should keep it's current position or reset upon the second note (i.e. retrigger).
    -DBD: one shot envelope that rises or falls from 0, goes to an adjustable level, then returns to 0
        - Decay 1: time it takes to go from 0 to breakpoint
        - Break: Level of breakpoint (could be pos or neg)
        - Decay 2: time it takes to go from breakpoint back to 0                                                                   
    - Flexible Envelope:
        - Takes up to 32 breakpoints
        - Works just like Zone envelopes
        - Right click to zoom in and out if you need more time.
        - Mode button allows 'SLD' (moving one breakpoint will affect all the others too) or 'Fix' (breakpoint positions are totally independent)
        - The first 8 breakpoints of a flexible envelope can be modulated!
        - The big 'H' that is drawn on the envelope denote the envelope's sustain phase:
            - If there are no breakpoints in the H, the envelope value will freeze when it reaches the end of the 'H', until the sustain phase is exited.
            - If there are other breakpoints in the H, it will loop over them until the sustain phase is exited, at which point it jumps to the next value.
        - Tempo Sync: will make everything follow the timing
- LFO's:
    - Freqs range from 0.01 Hz to 210 Hz and can be tempo synced.
    - Waveforms available: Sine, triangle, rectangle, sawtooth, RANDOM, and multi (which is a mixuture of other waveforms)
    - Fade in: wait a certain amount of time (up to 5 seconds) after the key is depressed to start the oscillator.  Maybe an alternative to using the modulation shaper.
- Other Modulators: (pretty self explanatory)
    - 32 step modulator
    - Envelope Follower
    - Glide: you can apply to pitch or volume (or maybe other parameters?)
- External Sources (basically MIDI messages of various sorts):
    - Pitch Bend  (you might want to reduce the intensity on the affected parameters, because midi sends this in pretty high resolution)
    - Poly/Mono Aftertouch
    - MIDI CC
    - Key Position: like using the pitch of the pressed key to control filter cutoff in synths
    - Velocity

## Notes from creating patches
- Zone doesn't sound until the first time you've saved it, it seems
- Tone machine 'legato' doesn't do glide.  It just doesn't reset the play head when a new note played.
- Glide modulation on the Pan control is kinda neat.
- To get glide on pitch, just add modulation in the source control by selecting 'add modulator', select 'glide', and the default modulated parameter will be pitch.
- Unison midi script will set up a detune effect!
- Changing source to Tone Machine really changes the sound of the sample- even on the home key!
- You can also use the Unison/Portamento MIDI script to get portamento.  To make it only glide on adjacent notes, make sure that Portamento Mode is set to 'Auto'
- There are a bunch of scripts on the internet to do portamento, but with crossfades.  I think sometimes the glide isn't triggering new zones, so this addresses that.
- Running a loop through beat machine and with tracking can give you some interesting results (not exactly like filtering, but making it feel 'off')
- Release Trigger lets you specify a time: basically when you play the note on, it starts counting down then gets the 0 and captures the current notes velocity which will be used as a modulation source (most likely the volume parameter) for the release trigger so that the volume is proportional to the original note velocity
- Latch midi script will turn a note into a toggle so you can loop forever!
- Zone Envelopes are ok, but you don't have the amount which you can apply with regular modulation
- Switching from HZ/MS units to Tempo units: just click on the unit displayed and you can usually change this!
- **For GOD'S SAKE: DO NOT EDIT ALL GROUPS!**
- There is a 'quick save' button for when you're in instrument edit mode.  see the bar that says 'Instrument Edit Mode'.
- On a modulator without retrigger, the fade value doesn't seem to work
- When you get NO OUTPUT:
    - Verify that the VOLUME slider is not turned all the way down in the header section!!!!
    - It seems to have something to do with the OUTPUT that is specified in the Instrument header.  In fact, if you go to the Amplifier section, you might be able to route to a different location and hear some audio.  It looks like this is a good workaround: 
        - Go to header, ouput section, select 'Create Separate Master Output Channel'.  Then you can follow instructions for this [link](http://www.native-instruments.com/en/support/knowledge-base/show/2456/configuring-the-audio-settings-in-kontakt/), if necessary.        
- What about creating a flexible envelope and using it twice for the two different groups, but inverted on one?
- Or use a CC to do the crossfade and let the envelope?
- ideal kontakt sample folder structure:
    - instrument folder
        - patches:
            *.nki
        - samples:
            - whatever
    - Save as Patch only

## Usage Notes
- You might not want to have a separate Kontakt instance for each sample library in your set since this wastes resources.
    - To address this, here's how to control multiple instruments separately in a single Kontakt instance?  
        - External Instrument!  [see this](http://music.tutsplus.com/tutorials/how-to-create-a-kontakt-multi-channel-preset-in-ableton-live--audio-14495) 
        - but note that this won't work with macro controls!
    - With an otherwise empty project, I can add 20 kontakt instances and be about 37% on my CPU
- SIPS
    - Be sure to bypass and then renable these scripts if you get some funky behavior like inverting the release trigger.

