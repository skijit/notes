WebAudio API Basics
===================
- Resources
    - [Web Audio Weekly Newletter](From Chris Lowis)
    - [Web Audio Slack Channel](https://web-audio-slackin.herokuapp.com/)
    - [Short video from Chris Wilson, one of the key API designers](https://www.youtube.com/watch?v=Wvx-BWKL0u4&feature=youtu.be)
    - [GitHub Project for Web Audio and Web Midi](https://github.com/WebAudio)

## Scope - Status
- You can do realtime audio with WebAudio, but the emphasis is portability and sharing
- Integration with native environments is not supported
- Version 2 may include features for building components/plugins for other Web Audio systems, but nothing to bridge the gap into a native DAW
- Version 1 is not fully approved as of 11/10: they are reworking the AudioWorklet node which supports custom DSP (replaces the slow, deprecated ScriptProcessorNode)
- WebAudio may end up as a compile target for Juce- insofar as they compile down to AudioWorklets  

## Starters
- Great for gaming, effects
- Big improvement over HTML5 <audio> element
- Data flow
- Javascript is used to combine primitive processing nodes
- Sound Sources
    - getUserMedia WebRTC's API
    - You can connect to a nice audio interface
    - Can hook audio from any web media
    - samples which you load (async)
    - decode mp3, wav, or ogg and process them
    - web audios natively implemented oscillators
- Powerful routing and parameters  
    - oscillators can be used as LFO's
- Scheduling system
    - near real time
- Control
    - Web MIDI Api
- Works on Mobile: albeit slowly
    - Web MIDI
    - Web Audio
- Web RTC
    - Collection of communication protocols and API's to enable real-time P2P communication
    - Applications like vido conferenceing, file transfer, chat, and deskotp sharing can be supported without plugins  
- Custom DSP
    - Currently, Web Audio lets you use JavaScript to combine native-dsp code (nodes) into a graph
    - Now deprecated, the ScriptProcessorNode let you manipulate a buffer with custom JavaScript
        - it was too slow
        - I think this was the reason WebPD was temporarily abandoned
    - The new way to do custom DSP is with the [AudioWorklet Interface](https://webaudio.github.io/web-audio-api/#AudioWorklet)
        - Executes on the Audio Rendering Thread, which makes the execution synchronous with other built-in AudioNodes
- Use Cases
    - Non-realtime
    - Sequencers
- Integration with DAWs
    - This really makes you appreciate what native plugins do, what with exposing controls, sharing buffers, etc.
    - Audio: 
        - DAW -> Browser:
        - Browser -> DAW:
    - MIDI
        - DAW -> Browser:
        - Browser -> DAW:
- Integration with Hardware (IE MIDI)
    - Hardware -> Browser:
    - Browser -> Hardware:
    


## Timing and Synchronization
- [src](https://www.html5rocks.com/en/tutorials/audio/scheduling/)
- Sources of Latency
    - Computational
    - Scheduling
        - Message (MIDI) Retrieval
        - Execution of Message
            - Insufficienct Precision of JS Clock
                - Timer events from setTimeout(), setInterval(), etc. are NOT sample accurate
                - They only return values in milliseconds, which means at a SR of 44.1kHz you'll have 44.1 samples for each tick
            - Callback timing dependent on main thread
                - Recall that timer events are only executed when the main thread (screen/layout refresh, DOM updates, GC, etc.) is free
                - Timer event's callback execution might be delayed by 10's of milliseconds
- Audio Subsystem
    - hardware clock is sample accurate.
    - runs in a separate thread
    - You can accurately schedule audio events using the audio clock in advance, but once they're scheduled, you cannot change them.
        - This means you have a problem if there is some intervening change which would require some alterations (e.g. Tempo Shift, Control parameter change, etc.)
- Proposed solution is a combination of using setTimeout on a 'lookahead interval' which schedules upcoming audio events at each time

    