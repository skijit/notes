C++ in the Audio Industry
=====================
- Lecture notes from juce developer Timor Doumler at CppCon2015
- [Source Video](https://www.youtube.com/watch?v=boPEO2auJj4)
- [Episode II is Here](https://www.youtube.com/watch?v=2vmXy7znEzs)

## Hard Real-Time Programming
- Sound card has a quartz crystal which gives you a consistent, independent pulse, at which time it expects to receive the next buffer of audio, via callback, from the audio application.
    - The application code is the producer of the callback, which it returns to the sound card
    - The sound card is the consumer of the callback, which it executes, and injects as a parameter, the buffers it expects to have filled.

| Buffer Size | Buffer Length @ SR 44.1kHz | Buffer Length @ SR 96kHz | 
| :---: | :---: | :---: | 
| 32 samples | 0.73ms | 0.33ms |
| 64 samples | 1.45ms | 0.66ms |
| 128 samples | 2.9ms | 1.33ms |
| 1024 samples | 23.2ms | 10.7ms |

- Audio Latency
    - < 10ms : good for real-time
    - 10-30ms : noticeable
    - > 30ms : not good, unless not needing real-time
- Need to guarantee that:
    - You can fill the buffer at the required interval with valid audio data
        - Risky with complicated DSP
    - There will be no error / exception
        - Mark your callback as `noexcept`
    - You know how long all of your audio operations will take, a priori
        - Therefore any blocking operations are strictly forbidden!
- Audio dropouts are **catastrophic**
    - Just one dropout is an audible discontinuity
    - This is true whether you're inputting or outputting audio
    - Compare to other computing scenarios with less strict benchmarks, such as avg throughput.
        - Vs Preventing Even Just One Audio dropout
- You can only follow these guarantees by your coding conventions

## Non-blocking
- You cannot block on the audio thread
- Don't do anything that blocks or waits **directly**:
    - `std::mutex::lock()`
        - Depends on a different thread
    - `while (! std::mutex::try_lock()) { ...}`
        - Even worse, depends on another thread, while tying up resources
    - `std::thread::join()`
- Don't call anything that blocks **indirectly**
    - It might not be obvious if something is 
- Locks themselves are pretty fast- it's the other thread that is unknown
- Priority Inversion
    - Audio thread runs ona very high-priority system thread
    - But if you wait on another thread, it is likely to be a slower thread (which may be interrupted by other threads)
- Use Lock-Free Programming
    - don't call `new` or `delete`: they may internally lock/wait
    - 
27:45
