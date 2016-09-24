Misc (Old) Live Notes
=========

## Misc Book Notes
- Group tracks:  group individual tracks for adjusting their volume as a group (proportionally).  also useful if you're dealing with lots and lots of tracks b/c you can fold them all into one.
- Looper: good for overdubbing and layering tracks
- Native Audio slicing sounds interesting for beat-making: partitions a sound into groups based on zero crossings, then maps each chunk to a midi note.  curious…
- Send & return: group multiple tracks for processing… saves processing power.
- **Clips**:
    - 2 types: audio, midi
    - double clicking a clip opens it up in clip view (midi and audio clips have fundamentally different representations)
    - you can freely change the color or names of clips
- **Session view**:
    - default view when you start live
    - track is each vertical strip in session view- track can be renamed
    - each track is like a hallway that allows audio/midi to pass through to some final destination- usually, the master track which is on the far right.
    - clip slot grid:  the grid underneath the title of each track which allows clips to be placed inside.
    - clip/device drop area is underneath the clip slot grid.  not clear on this- need to learn more???
    - i/o section is below the clip slot grid- it might be hidden.  the hide/view buttons for track related components is in the - bottom right corner of the session view.
    - send section is below the clip slot grid and you use this to send the track's output to one of the "return tracks" which is just to the left of the master track (A Return, B Return).  These will eventually go back to the Master track, but you might - want to apply some global processing to them first (hence the send).
    - mixer section is at the bottom of the session view:
        - volume control slider
        - pan knob to place differently in the stereo mix
        - track activator to toggle on/off the track
        - solo/cue for something??
        - arm session recording button
        - track delay: if you have multiple tracks not playing in sync with each other, you can solve this with the track delay (among other ways)
        - crossfader control
- **Master track vs Return tracks (A & B)**
    - neither can host clips in their clip slots, but the master has play buttons in each slot- that is called the scene launcher and it launches an entire row of clips.
    - neither can be renamed
    - stop clips button (in return track) : will stop any and every clip in session view at the same time
- **Arrangement View**:
    - linear arrangement of clips along a timeline
    - assemble clips into arrangement view by dragging from the browser, or recording new ones or hit the Global Record button and - - record what you do in session view into arrangement view (for later tweaking, editing, overdubbing, etc)
    - top of arrangement view is the Overview, which is a condensed horizontal depiction of your arrangement: good for navigating around in big long arrangements
- **Browser**:
    - Click the show/hide button in the upper left to access this
    - browsing by type:  (use buttons in left)
        - Top button: access live devices
        - Plugin button: browse plugins
        - 1/2/3 : 3 definable places to view files
            - you can look any place in your hard drive or external hard drives, etc.
    - You can also preview and search from the browser
- **File Manager**:
    - View > File Manager
    - Allows you to take a look at your entire project's contents and move contents in and out

## Main Live Screen Components:
- Arrangement/Session View
- Browser
- Groove Pool: storage location for files (.gar) which document a clips timing or feel.  the groove can also be extracted from some clip and applied to other clips.
- Info view
- Detail View : at bottom- though not the very bottom.  Gives you a more detailed view of whatever you have selected…really just depends on the context.  It's very versatile.
- Help View or File Manager
- Control Bar (Top)
    - Time Control (leftmost)  (buttons here should be mostly self-explanatory)
    - Central Control: dedicated to playback & to a lesser extent MIDI and automation
        - Follow switch : has the arrangement view scroll along during playback
        - Arrangement position : displays beat numbers and can be changed 
        - Play / Stop
        - Global record
        - Overdub switch (OVR) : really useful when you're recording MIDI clips and drum parts.
        - Back to Arrangement button : confusing… need more explanation???
        - Quantization menu : where you set the quantization for clip launching… making sure this all happens in musical time.
        - Draw mode switch : needs more explanation ???
    - Loop and Punch Control : 
        - a bunch of controls for handling looping and punch-in/out (which I don't understand???)
    - Assignment Control and System Status indicators :
        - Computer Midi Keyboard (just a software version of a keyboard midi controller)
        - Key Map mode switch : you can use this to set the computer keyboard to control aspects of the GUI
        - Key/MIDI IN/OUT indicators : top flashes when a midi instruction is sent to the software and bottom flashes when a midi - instruction is sent out
        - MIDI Map Mode switch : similar to Key Map mode switch, but this is how you set up controlling Live w/ a MIDI controller
        - CPU Load meter
        - Hard disk overload indicator
        - Midi Track i/o indicators : when Live tracks receive and send messages
    - Status Bar : at the bottom

## Live Set Project structure
- each set lives in a project folder
- each folder contains:
    - .als file : live set file
    - folder: "Ableton Project Info"
    - folder: "Samples"
        - folder: "Recorded"
        - folder: "Imported"

## Recording in Session View
- specify the Audio From chooser in the track's i/o section as 'Ext. in' (probably)
- Arm the track to start seeing the track levels respond and to be able to monitor
- Set appropriate Monitor setting (in the track i/o section)
    - IN: you can hear your input sources (even if track is not armed) but not any clips playing back (good for auditioning various sources)
    - AUTO (default): you have to arm the track to monitor input source and you won't hear anything while recording.  but after recording, you hear the clips playing back.
    - OFF: input source is never heard
    - if you're monitoring, you'll probably notice latency.  if that's an issue, you might want to use an audio interface that has direct monitoring capabilities
- Once armed, each clip slot in the track has a record button.  Hitting that record button will record into the given clip slot.
- There are a bunch of ways to stop recording but some are quantized and others are not.  If you want to loop the clip, you'll want to choose quantize.
    - Quantized:
        - Clip stop button : at bottom of track
        - Stop all clips : in master track
        - Clip launch button : stops recording and begins looped playback.
    - Unquantized:
        - Control bar stop button 
        - pressing spacebar
- Use the metronome when recording in

## Recording in Arrangement view
- i/o section configuration is the same as with session view recording
- this kind of recording is unquantized- better for longer (non-looped) parts
- arm track you wish to record in to
- press global record, then to start recording:
    - press control bar play or spacebar
- to stop recording:
    - control bar stop (or spacebar): stops recording and playback
    - turn off global record to continue playback but stop recording on all armed tracks
    - press track record switch to disable recording for the one track (but maybe other tracks (if armed) continue recording)
- **Arrangement view also allows Punch-in/Punch-out**
    - Punch-in/punch-out = you specify the spots you want to re-record (eg to correct some error) and rerecord during the playback (but only in that specified region)
    - Specify the appropriate loop bracket corresponding to punch in and out points (and disable Loop switch in punch-in/out bar (so - you don't just keep looping forever)		enable punch in and out points
    - remember to arm only the tracks you want to punch
    - then follow the instructions about for recording in arrangement view

## MIDI Clips
- 2 basic ways to produce MIDI clips:
    1. Analogous to 'recording' methodology discussed earlier
    2. Drawing the instructions in
- Setting up MIDI:
    - Preferences section:
        - Control Surfaces : performance hardware controllers
        - Midi ports : ways of moving around MIDI data for recording/production
            - Each port will have a row for configuring Input (data sent to Live) and Output (data sent out of Live).
            - For my current situation, I'm not sure when I would worry about the output configuration.
            - 3 columns of config:
                - Track: enables Live to receive input from the device for recording MIDI clips
                - Sync: If you want Live to receive MIDI synchronization data from this port.  Example- you want live to match its tempo to another computer or a drum machine.
                - Remote: This lets you control Live's on-screen controls (effects, launch clips, manage volume) with MIDI.  Great for gigging.  I think this might overlap w/ control surfaces.
                - or more simply...
                    - track - midi notes
                    - remote - cc controls
        - Once you have an input port set with Track=On.  You should be able to press keys and see that MIDI data is being received in the upper right-hand corner.
- Track Creation (recording method):
    - Create a new MIDI track
        - notice there's no Pan knob (WHY???) and the volume meter is a stack of circles (MIDI Data meter).  
        - Once you arm the track and start banging on the your MIDI keyboard, you should see the MIDI Data meter bounce around- notice it's velocity sensitive.  also, this thing only appears when there's no instrument loaded.
    - Choose an instrument:
        - Drop it into the new MIDI track
        - now it looks more like an audio track again: the volume slider, pan knob, etc. show up again.
    - When you drop the instrument in a track, you get some instrument parameter menu, and when you double click it you get the drawing-MIDI screen.
        - kinda makes sense: 1 instrument per track- with whatever parameters/settings, but then each clip in the track will have - independent stuff going on.
    - Record:
        - Session view:
            - To record:
                - Arm track, then…   (TO ARM MULTIPLE TRACKS, PRESS CTRL while arming!)
                - Click round record button in any empty clip slot
            - To stop (quantized):
                - Clip stop button
                - stop all clips
                - Clip launch button : stops recording and begins looped playback  (but this method requires knowledge of OVR)
                    - Overdub : OVR (just for MIDI)
                        - if it's enabled, you'll continue recording
                        - if it's disabled, you'll continue to hear whatever you play during playback, but it wont be recorded- giving you chances to audition ideas.
                        - with overdub, check the Notes section in the detail view will help you set up the start position and length of the clip
        - Arrangement view:
            - To record (unquantized):
                - Arm track, then…
                - Click global record, then…
                - Click play or spacebar
            - to stop recording (unquantized):
                - control bar stop (or spacebar): stops recording and playback
                - turn off global record to continue playback but stop recording on all armed tracks
                - press track record switch to disable recording for the one track (but maybe other tracks (if armed) continue recording)			
- Track Creation (Manually)
    - double click any empty clip slot in a MIDI track
- Playing MIDI intruments
    - Each midi instrument comes w/ at least 8 Macro controls to alter the character of the sound
    - Find a way to MIDI map each of the knobs on the MIDI keyboard to the macro controls for the instrument.  Make sure that Pref->Midi->Remote is enabled when midi mapping.
    - You can save presets in the upper right bar and then the presets will be available thru the device browser
    - Hot swapping: press that button, also in the upper right, then move around in the device browser and press 'return' when you want to hotswap the presets
        - press escape to exit hot swapping mode
    - Third party VST or Audio Unit plugins can also be used.
    - In arrangement view you can drag around a clip to modify it's position, you can cut/paste the whole thing or segments
    - Double click the title of the clip in arrangement view and you'll get the clip detail view populated.
    - To toggle between the Track view (where instrument and effect settings lie) and the clip view (which shows MIDI clips details) press Shift-Tab
    - In Clip detail view you can see the velocity marker
- Metronome volume: controlled by master tracks cue volume control.
- Arrangement view: pressing control bar stop button twice resets to the beginning of arrangement view (and insert marker too)

## Clip View
- Clip box
- Launch box (session view only)
- Sample box (audio clip) or Notes Box (MIDI clip)
- Envelopes box		
- Sample Box:
    - Transpose: adjusts in semitones, Detune: adjusts in cents
    - Warping: when the warp switch is on, Live will attempt to match the tempo of the clip to the master tempo.
    - Warp markers, etc
- More about Midi tracks: 
    - if you have the same notes drawn in and you want different velocities, cntrl-click the given note and set the velocity as desired.
    - another way to change the velocity of a note (other than velocity editor, is to hold command key and click on the note, then - move up or down, as appropriate)
- Clip Envelopes: making some clip parameter change automatically as the clip plays back.  typically this could be a volume envelope or pitch changes in a certain spot or pan in the stereo field.
    - make sure the envelope editor is on			
    - select the envelope you want to change, and select the appropriate device
    - draw it in!
- Using Live Devices
    1. Instruments
    2. MIDI Effects
    3. Audio Effects
- Audio Effects:
    - There are 32 audio effects plus the audio effect rack (used to combine multiple effects into mega-effects)

## Racks
- Racks allow additional (more than the default of 1) device chains to be added to each track
- Instrument and Effect racks get the same input and then they process the data serially (within each chain), but Drum racks have 1 chain per Midi Note
- Racks can be nested and any devices placed in the signal chain for a track will process the entire output of the rack
- Drum racks can contain up to 6 return chains of audio effects with independent send levels for each
- Above the chain list, you'll find Zone buttons which define the input requirements for each chain.  There are 3 types of zones: key, velocity, and chain select
    - Chain select zone is where you'll define a range, 1-127, for each chain.  The value will be set by an encoder on a control surface (you have to map)- and this value will determine which chains are active.  You can also define a "fade range" for each range so that you crossfade over the different chains.
- Drum racks display an Input/Output section that displays the midi note that each chain/drum sound responds to (Receive chooser).  - The "play" chooser sets the outgoing midi note that will be sent down the chain.  The "choke" chooser allows you to define choke groups such that any chains in the same choke group will silent the others when it is triggered.  This is good for choking open hihats when triggering other hihat sounds.
- Drum rack Pad view: 
    - almost any sample, effect, instrument, or preset can be dropped onto a pad, and it will be added to the chain, responding to the current pad's note
    - you can swap any pad with another to change the note the sample responds to
    - you can nest a chain in a pad (really no different from a nested chain)
- **Slicing w Drum Racks**
    - Ableton will automatically warp audio clips to match global settings, but you can get more control by choosing a subdivision and slicing that where each slice gets mapped to a pad/chain in a drum rack.
    - You can also use the Chooser in the Slicing menu to use warp markers or transients as slicing rules
    - When you slice to midi, a midi track gets created with each note corresponding to a slice.  the midi track plays a chromatic sequence corresponding to the slices, which opens up many resequencing possibilities.  Another option is to swap drum pads, reassigning their notes (when the chromatic sequence is played).
    - If you want to use effects on some of the slices, highlight them in the chain view, then press ctrl-g to subrack them.  then place the effects in the parent chain.

## File Management
- File browser has a bunch of columns you can choose to display
- Each browser (1-3) has a Root directory displayed at the top.  You can change this and you can bookmark any root dir, by right clicking.
- Searching includes filename, path, and metadata tags - if they exist
- Hot swapping creates a link between browser and device.  To cancel that link, click another device or press ESC
- Decoding & Web Cache: this is where Live keeps uncompressed versions of compressed files.  You can clean it up whenever you want.
- Analysis files (.asd): created the first time you bring a sample into live.  it helps optimize warping, speed up waveform display, and autodetect tempo of long files
    - Although there is a preference to deactivate this, Live will generate an asd before it lets you play a long sample for the first time.  Alternately, you can preanalyze them via the browser (right click -> analyze audio).
    - When you press the Clip 'Save' button, it will save clip settings in the analysis file as well.  This is useful for saving warp markers.  But this is different from saving your clip as a live clip.  
- MIDI files, which you can see in the browser, get pulled directly into the project- unlike audio clips
- You can also export a midi clip as a midi file.
- Live Clips
    - (sometimes) only contain references to audio on disk, so they can be very small
    - retain not only clip settings, but whatever devices were in the track
    - you can create live clips by dragging them into the browser
    - when you save live clips (by dragging them into the browser), live uses your 'Collect Files on Export' settings to determine what to do with all the associated files.  There are 3 options:
        - always (default), ask, never
    - Difference between live clips and asd:  the asd is just for general playback, but you could have a bunch of live clips using the same audio, but warped in a variety of ways.
- Live Sets
    - .als files live inside project 
    - You can use the file browser to share/import sets, individual tracks, and even clips.
    - You can drag a session view clip into some location in the browser and it will export it as a live set
    - Create a project folder by right-clicking in the browser and selecting 'Create Project'
    - When you save a live set into a new folder, Live will create a new project folder (to contain the set) for you automatically, - unless the folder selected is a pre-existing project folder.
    - Normally when you save instrument and effect presets, these become available to all in the Live Library, but there's also a 'Current Project' subfolder for every device in the Live Library- you can drag any of these presets there and they'll be specific to the project.
- **Live Library**
    - Repository of commonly used files: samples, clips, presets, etc.
    - Live Library is always available via a bookmark
    - Clips can be conveniently saved by dragging them to the Library (create whatever folder structure is convenient here)
    - Default structure:
        - Ableton Project Info : housekeeping for library.  don't mess with it.
        - Clips : live clips, example sets, etc.
        - Defaults : here's where you can set default settings for devices and actions - like splice to MIDI
        - Grooves : default Grooves
        - Lessons
        - Presets : all the factory presets for Live devices
        - Samples : all of the samples that are used by Live's presets
        - Templates
    - Don't save Live sets into the library unless they're supposed to be templates


## beat repeat
- chance vs manual repeat: manual repeat will capture and repeat at any time you want
- when connecting to launchpad, you want to use it as a Midi "momentary" button, not a "toggle" .  the momentary buttons on the launchpad are the ones on the outside perimeter (remember to use user mode 2, eg navitation, etc.).  since user mode 2 buttons are just arrays of notes, you can midi map a knob to an array (row) of notes: press midi map, select knob, press bottom range button, hold down and then press top range button.  For live settings, it's really cool to have some way to toggle between mix and insert mode.  To do this, put br in a group, then assign a macro, then midi map the macro and limit the range so that you never play the 'gate' version of the mix control.
- note that you can get beat repeat to do call & response, straight up.

## Compression Notes:
- [Source](http://tarekith.com/assets/pdfs/DynamicsControl.pdf)
- Basic idea is to take away the high amplitude content so that you can bring the rest of the signal level up.
- When you set the attack, figure out whether you want to filter out the transient or not.
- You gan use the rate at which the gain reduction is reduced to see if your release is set too high (relative to the loud parts of the track).
- If you set your mixer section big, you get the levels displayed.
- Good place to apply progressive compression: attack at max, release at min.  set thresh to 5-6 db below max level and then begin to adjust the attack/release.
- If you set compression with a really fast attack and release, you can get distortion b/c the compression will just be tracking the waveform level, rather than the musical level (if that makes sense)
- Limiters are compressors with an infinite ratio

## Misc
- fn-ctrl- f11 is toggle full-screen mode. 
- tab is toggle between session and arrangement view
- run disk utility weekly
- system prefs > energy settings > sleep > set put the hard disk to sleep = never , etc.
- Session view: empty clip each slots have a stop button that will stop playback of whatever is in the track
- Double clicking a clip anywhere except it's Launch button will open up the clip in detail view.
- Always name your tracks in session view.  Also, if you record into session view, the imported audio will use this track name as a prefix to the filename
- **Saturation Effect**
	- waveshaping tool
	- displays the transfer function
	- right click on the device to use 'Hi-Quality' mode- which reduces aliases
- **Saturator VS Overdrive VS Dynamic Tubes**
	- These are WaveShapers- they operate on the waveform, not the Volume or Frequency content
	- Saturator will add harmonics and richness
	- Dynamic tube models tube amps, and sometimes only produce distortion if the input signal remains below a given threshhold.  
	- Dynamic tube also has an envelope follower to increase distortion (bias) as you amplitude on input signals increases.
	- Overdrive is a less subtle 'give me distortion' stomp-box type effect
- Limiter
	- just a compressor with an infinite ratio, generally the point is to prevent clipping
	- you can increase the input gain going into a limiter, and this will have the effect of compressing dynamic range
	- some people advise putting these into the master track or individual tracks	


