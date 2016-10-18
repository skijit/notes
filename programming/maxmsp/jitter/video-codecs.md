Misc About Video Codecs
====================
- [Comparison of Video Codecs](http://en.wikipedia.org/wiki/Comparison_of_video_codecs)
- [Comparison of Containers](http://en.wikipedia.org/wiki/Comparison_of_container_formats)

## Codecs
- Name is derived from *compression-decompression*
- Each codec has it's own set of tradeoffs involving size and playback characteristics
- The codec involves two things:
    - executable code (or just an algorithm) to manage the compression / decompression
    - the storage format for the compressed data
- Use spatial and/or temporal compression
    - spatial compression: simplify single frames (as with photos), looking for patterns, repetitions, etc.
    - temporal compression: creates a description of change between frames
        - keyframes: spatially compressed frames
        - regular frames: descibed only by their change from the previous keyframe
- Some codecs might by optimized for hardware support
- Each codec is likely to work with a variety of quality (e.g. bitrate, etc.) settings
- **H.264 / MPEG-4 AVC**
    - Most common codec used in camcorders
    - Typical *container* is AVCHD, but this is not necessary
    - Used in web video (e.g. YouTube, Flash, HTML5 Canvas), some BluRay
    - Offers high compression, good image quality, and scaleable
- **MJPEG (Motion JPEG)**
    - Used by older digital cameras/camcorders
- **DV and HDV**
    - Combination codec and container
    - Used by tape-based cameras
    - DV is standard definition
- **H.262 / MPEG-2**
    - Combination codec and container 
    - Used for DVD, early BluRay, and over-the-air HDTV
    

## Containers
- Can wrap a variety of compressed data together, perhaps from different codecs.
- Has additional metadata which is specific to the container format.
- **Advanced Systems Format (ASF)**
    - developed by microsoft
    - file extentions include .asf, .wma, .wmv
    - a wmv file is probably compressed with the wmv codec, but the container format is still asf
    - theoretically can playback files using any codec, but practically, it has problems with non-ms codecs
- **Audio Video Interleave (AVI)**
    - an older microsoft container format that nobody uses anymore
- **Quicktime**
    - Container format from Apple
    - Codec support is limited to whatever Apple supports
    - Also supports H.264
- MP4
    - Video codec is H.264
    - Audio codec can be AAC or other codecs
- AVCHD MTS
    - HD Camcorders
    - Video codec is H.264 AVC codec
    - Audio is encoded using Dolby Digital (AC3) or uncompressed
    - Has features like Menu Navigation, Slide Shows, and subtitles
- **AVCHD MTS**
    - aka MTS or TS
    - Originally designed for broadcast systems where signal degradation was likely.
    -  
        
    

## Quicktime
- [source](https://docs.cycling74.com/max5/tutorials/jit-tut/jitterappendixa.html)
- Quicktime movies are containers for tracks
    - Each track contains a particular type of media
    - Tracks types include:
        - video
        - audio
        - MIDI (called 'Music Tracks')
            - These will be routed to an internal QuickTime synth, but you can redirect them into Max if you want with IAC
        - VR Panorama 
    - Tracks define the spatial and temporal dimensions of that media
        — For instance, a QuickTime movie might be 320x240 in size, and 3 minutes in length, while one of its video tracks is 80x60 in size, and only 30 seconds long
    - Tracks might start at different points within the movie
    - Video tracks have visibility layers (values between -32768 and 32767): with the lower values being displayed on top
    - `jit.qt.movie` lets you interact with these types of tracks: query them, get data, figure out what codec they're using, etc.
- Frame-rate is based on a unique time system.
    - *Timescale* defines how many time values are available per second
    - *Interesting time* defines how many of these time values should elapse before emitting a new frame
- **Optimizations for Jitter**
    - **loadram** message to `jit.qt.movie` will copy the compressed media to RAM
    - To load uncompressed data into RAM, use `jit.matrixset`
    - Often best to used uncompressed audio (PCM) to accompany video since the size is, by comparison, small and doesn't load down the CPU in decompression (as it will with the corresponding video)
    - You might have special hardware to handle compression/decompression, but don't assume that Jitter can take advantage of that
    - Recommended Codecs: 
        - using a video codec without temporal compression, such a Photo-JPEG or Motion-JPEG 
            - Photo- and Motion-JPEG compression use the same compression method, but Motion-JPEG is optimized for special hardware support (which is probably not useful on a mac)
        - **However**: If image quality is of principle importance, the Animation codec looks better than Photo-JPEG, but creates much larger files
    - 320 x 240 movies will generally perform fine
    - Setting the framerate to 15-20 fps is usually good
        - Note: NTSC is 29.97 fps and PAL is 25 fps
- Different versions of QuickTime support different audio and video codecs

     
