Latency
===========

- [How Audacity Latency is Tested](http://manual.audacityteam.org/man/latency_test.html)
    - Basically, playback a sound and record it at teh same time.  Then compare.
- [this artilce](https://www.presonus.com/community/Learn/The-Truth-About-Digital-Audio-Latency)
    - 3-10 ms is around the threshold of a just noticeable delay
    - Round trip latency is acoustic -> adc -> computer -> dac -> speaker latency
    - driver buffer: too small and you get drop outs, too big and you get lots of latency
    - some drivers allow you to specify input and output buffer size separately
    - what about midi latency?
    - dac / adc process can add about 0.2-1.5 ms
    - a big source of latency are the USB buffers, which are used by the drivers, but not settable by users.
        - this may add 6ms in each direction!
        - USB clock speed is 1ms: it will generate an audio interrupt at this rate
![latency-1](/resources/images/programming/LatencyChain.jpg)
The time it takes for the sound of a snare drum to reach a drummer's ears, is about 2.1 milliseconds.*
]
Delay vs Playthrough Optimization:
	-When playing back tracks, Ableton will slow down all tracks to the latency corresponding to the slowest plugin
		-this is good but this might create problems for when you're playing keyboard on an armed track and you want small latency
		-just go to options: Reduced Latency while monitoring


If two people stand at the opposite ends of a double decker bus (assuming its maximum length of 15 metres), there is a 43 millisecond delay when they speak (or shout) to each other.*

- other sources of drop-outs , performance tuning tips
- [this too](http://www.soundonsound.com/techniques/optimising-latency-pc-audio-interface)
- [this](https://help.ableton.com/hc/en-us/articles/209071469-Optimizing-Windows-for-Audio)
- is usb3 lower latency?
- what is the latency of osc messages sent over an ad hoc wireless network?
- consider audio latency vs quantization and lags
- check out latency mon
