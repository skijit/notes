Max/MSP Gotchas and Misc Notes
=============

## JavaScript Execution
- takeaways from the following forum [thread](https://cycling74.com/forums/topic/javascript-performance-vs-max-objects/)
    - Runs on the low-priority thread along with the UI and can be blocked by UI
    - Recall JS is single-threaded
    - Cost to marshall data into and out of the JS environment
    - Cost to interpret js
    - For control-rate operations and non-performance-related functionalities, it's probably ok
    - For audio-rate stuff, dsp, etc. it is **not ok**
    

## General Performance
- See [my old thread](https://cycling74.com/forums/topic/event-scheduler-interval-vs-execution-time/) on the forum about intentional latency (e.g. I'm windowing a signal) vs computational overhead (e.g. inefficient algorithm)

