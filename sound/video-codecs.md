Misc About Video Codecs
====================
- [Comparison of Video Codecs](http://en.wikipedia.org/wiki/Comparison_of_video_codecs)
- [Comparison of Containers](http://en.wikipedia.org/wiki/Comparison_of_container_formats)

## Codecs
- Name is derived from *compression-decompression*
- The codec involves two things:
    - executable code (or just an algorithm) to manage the compression / decompression
    - the storage format for the compressed data
- Each codec has it's own set of tradeoffs
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
- AVCHD
    - Video codec is H.264 AVC codec
    - Audio is encoded using Dolby Digital (AC3) or uncompressed


## Quicktime

