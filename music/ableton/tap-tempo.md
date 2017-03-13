Tap Tempo in Ableton
============
- There are two parts to this problem:
    1. Tempo-Detection Device
    2. Input to the Tempo-Detection Device

## Tempo Detection
- If you use the native tap tempo in Ableton, you can get some discontinuities, esp if you mess up.
    - It's probably find for count-offs, but not for interactive modification
    - So Tap tempo will probably not work for me. 
- Better to have a device that smooths tempos, or at least removes abberations
- There are lots of ways to extract/infer tempos from audio/input, but this case, it is sufficient to have a very simple input based on a quarter-note pulse.
- [This cycling 74 forum thread](https://cycling74.com/forums/topic/how-to-create-a-tap-tempo-in-max/) gives some basic suggestions / sample code for implementing a m4l device which drives tempo changes
- There's a $29 [m4l device](https://www.ableton.com/en/packs/beatseeker/) which claims to be able to follow changes +/- 5%.
    - Basically the same as [this](https://github.com/Venetian/B-Keeper) open source project, which can be used.
    - I discussed this with Ableton support for more info:
    - **Q:** Are contact mics on the drum / snare ok?
        - **A:** Contact microphones should be okay, but you will have to experiment to make sure.
    - **Q:** If I wanted to to mic something other than drum & snare, would it be ok?
        - **A:** Theoretically, yes, this is possible. I use it on my whole drum buss.  But BeatSeeker is made to listen to kick and the snare drum mostly.
    - **Q:** How does it handle different time signatures?
        - **A:** I just tried it out again with a 7/4 meter and it worked just fine!
    - **Q:** What happens when you have a tempo discontinuity- like jumping immediately from 200bpm to 120bpm?
        - **A:** In this case it would not work, as BeatSeeker is more intended to follow the minute fluctuations that a human drummer has naturally in his playing, not sudden jumps in tempo.
    - **Q:** If you want a sequenced musical event to be tightly quantized (e.g. the downbeat of some new clip), should you toggle over to fixed tempo mode?
        - **A:** Yes in this case it would be better to put the BeatSeeker into fixed tempo mode and have the drummer follow the metronome.  You can use automation to switch between different modes of the BeatSeeker.
    - **Q:** Does it drop beats when it detects some rhythmic ambiguities (the drummer starts to play really loosely)?  If so- how easily (a subjective response here is ok, I'm just trying to get some general info)?
        - **A:** It won't drop beats per se and in fact seems to be pretty good at holding the tempo of the playback material while the drummer plays more loosely.
    - **Q:** From a max programming point of view- can I easily use the moving tempo output to drive other max parameters (like playback speed of a video)?
        - **A:** Quite honestly, my Max for Live knowledge is not so great but considering the fact that you can do so much with Max, I assume it would be possible somehow.
    - **Q:** Can you set parameters for the rate of tempo change (i.e. don't change the tempo more frequently than once every 10 seconds) or the threshold for the min noticeable tempo change (e.g. don't adjust the tempo if the drummer is calculated within a certain tolerance of the current tempo - this might be a valuable calibration to different musical or drumming styles)?
        - **A:** Again, this sounds more like something for which you would have to know Max, in order to look at the programming inside of the BeatSeeker.  Just remember to not overwrite the original BeatSeeker if you decide to change the patching!

## MIDI Foot controller
- There are a variety of MIDI footswitches out there
    - Many have momentary toggle buttons which, to me, doesn't seem ideal for tapping tempo
- Another option is an Organ bass-pedal approach
    - There are some very expensive options out there
    - There are lots of old, cheap Organ pedal boards on eBay which can be used in a DIY MIDI project
        - [here's one](http://www.instructables.com/id/Build-MIDI-Bass-Pedals-for-About-150/)
        - [another](http://midipedals.com/)
        - [more](http://www.instructables.com/id/Arduino-MIDI-Foot-Pedal-Keyboard/)        
    - This could also be useful for while playing bass
- **Current**: Looks like the easiest/cheapest option will be the [Logidy UMI3](https://www.amazon.com/Logidy-UMI3-MIDI-over-Controller/dp/B002YL81RW)
    - I asked them the following questions:
    - **Q**: I'm wondering how appropriate you think the UMI3 would be for a Tap Tempo Function.  A pad-type of button would probably be better, but the UMI3 has a nice price point and looks to have a good build quality, so I'm considering using it.  So besides needing to operate as a momentary button, I'm curious how loud the unit would be, and the level of resistance my foot would encounter as I click.  I wouldn't want to feel a two-state ('click click') type of response for every tap.
        - **A**: No click-click. The foot switch is momentary. There is no change of resistance along the entire throw. There is only the audible metallic tap at the end of the travel, which can be loud if you hit the switch hard. To give you an indication, The UMI3 works well as a pedal board to trigger sounds precisely. Of course the time measurement for the tempo will have to happen inside whatever host you are using, the UMI3 being incapable of sending MIDI clocks or time stamps, but if your tempo tapping function is mappable to MIDI CCs (as it is the case for example in Ableton Live) then it should all work fine.

