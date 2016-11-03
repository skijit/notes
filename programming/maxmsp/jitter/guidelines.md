Jitter Guidelines
==============

## Video Engine Recommendations

- There are a variety of video engines available for dealing with video playback and processing in jitter.
- Among other objects, this will certainly affect the following objects: 
    - `jit.movie` 
    - `jit.grab`
    - `jit.record`
    - `jit.playlist`
    - `jit.matrix`
    - `jit.matrixset`
    - `jit.gl.texture`
- Mac Video Engines:
    - qt (QuickTime)
    - avf (AVFoundation)  (DEFAULT)
    - viddll
- Windows Video Engines:
    - qt
    - viddll (DEFAULT)
![video engine comparison](/resources/images/programming/VideoEngineComparison.png)
- This is as of Max 7.0 release, so it might not be up to date
- **Observations**
    - QT    
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
    - **VIDDLL**
        - no longer in Beta
        - uses ffmpeg, so it has the widest support
        - updates are distributed by package manager
        - The viddll engine is probably of most interest to windows users, especially those looking for video playback in 64 bit mode, however all Jitter users should give it a try and see what it can do for you.
    
    
