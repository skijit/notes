
#MIDI Playhead Project Notes#


##Assumptions##
* Launching/stopping behavior and playhead rate needs to be sample accurate.
* Buffer resolution should correspond to sample rate
* 8 Voice Polyphony per Device
* Each device allows one playhead, but multiple playheads can easily coexist on the same track with a rack.

##Basic Approach##

###Buffer Fill###
* User selects the MIDI clip, and Patch loads a *data structure* with:
	1. Note
	2. Velocity
	3. Polyphonic support
* Best data structure options:
   1. buffer~ (s)
   2. jitter matrix
* Consider these object:
	* peek~ : lets you read/write sample values
	* poke~: lets you write an audio signal into a matrix (by index)
	* buffer~ :
	* jit.matrix :
	* jit.buffer: lets you access buffer~ data using a matrix-like interface
* This data structure should be **global** so that other devices using the same source clip don't have to duplicate this data.
* If there is no note playing in the note buffer, it should be a zero value

###Accept Playback Options###
* Loop behavior, start|end
* Rate
* Lots of transformation options (shifting, etc)
* MIDI mapping the playhead and other such real-time options would be neat
* Presets should be saveable
* Define what happens if the source clip changes?
* All of this data should be local, as opposed to the global buffer

###Iterate###
* Consider these objects:
  * phasor~
  * index~
  * ...
  
###MIDI Output###
* Detect/Generate MIDI events (note on/off) using change~ or possibly edge~
* Probably only need to watch the note buffer for note off events
	* Only bother with velocity when it's a note-on event
* Be sure to have **midiflush** set up so that if iteration ends, there are no hanging notes

###Sample-Accurate Launch Behavior###
**Requires use of dummy clip to engage the playhead**

* Device goes in whatever MIDI track is desired.
* Point the device at the source midi clip.
* If the device is in the same track as the source clip, probably dont want to launch the source clip b/c otherwise you'll effectively have 2 (or more) clips playing at once on the same track.  OTOH, maybe that's fine?							* Point the device at the dummy clip (in some audio track) which will launch/stop the playhead.
* It can be a standard dummy clip where the audio is pulled from the track with the device on it or (maybe) it could just be a muted track.
	* See question below
* If you want to do dummy clip enveloping, you should do that on a separate track b/c these dummy clips are just for launching/halting clips (otherwise, when you tried to engage a new envelope, you would halt the track).
* Problem (kinda) with the dummy clip playhead approach is that means for N playhead devices, you need at most N dummy TRACKS, assuming you want the devices to be completely independent of each other (since only 1 dummy clip can be played engaged per Track).
	* On the bright side, you can have many playheads living on the same device, via a rack.

##Open Questions##
1. As a midi device, can it tap into audio from an audio clip (i.e. for the dummy-triggering approach)?
	1.1  Will this work with clip halting too?
2. Look for examples of plugsync~, which apparently might handle the sample accuracy situation.
3. Does seq~ get me what I want?
4. How do I handle any automations in the clip (i.e. clip envelopes, etc.)?

##Edge-Cases##
* Non 4/4
* Change in meter/tempo (and at various spots in the current bar)

##Next Steps##
* Get midi data from a clip and write it to a buffer
* Simple Playhead case with a few rate changes
* Sample accurate launch/stop

---------------------
##Seq~ Notes##
* [Audio Rate Sequencing Tutorial Online](https://cycling74.com/wiki/index.php?title=MSP_Sequencing_Tutorial_1:_Audio-Rate_Sequencing) has some good info
* [Online documentation](https://docs.cycling74.com/max5/refpages/msp-ref/seq~.html)
	* can support multiple sequences.  use the 'seqnum' message to set active sequence.
	* sequence events can be inserted with the **add** message
		* 'add 2 0.5 honk' will insert the message 'honk' to be played at the halway point of sequence #2
		* 'add 0 $1 $2 $3' will insert a message for sequence zero where each $1-3 are elements of a packed message.
		* also has an optional end time parameter in the message
	* any message can be sequenced, except control messages to seq~
	* 
	* has record and playback modes.  I'm probably only interested in playback mode, although record could be interesting for real-time applications.
* **Question**: How do I timestamp the note messages in a way that seq~ understands?  (0-1?)
	* seems like it has to be between 0 and 1
* **Question**: How do I store all the midi info- note, velocity, cc?
	* Should be pretty easy to test.  Try manually adding a packed message to seq~, driving it with a phasor~ then unpacking the resulting data to add to a midi generator.
* ** Question**: How do I handle event end data OR reversing playback?
* **Question**: How do I handle different start/end and loop start/end points?
	
 

