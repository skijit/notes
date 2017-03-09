Life of a Pixel
=================

- browser render pipeline: Html (parsing, etc) -> javascript -> Layout -> Paint -> Compositing
- pixel = (r,g,b) tuple
- compositing: treat memory as frames of smaller arrays which can be overlayed (composited)
    - those frames are textures
- GPU shaders let us rotate, transform, scale, blend, etc.
- this is all way faster than repainting pixels
- these GPU operations can also be executed in parallel 
- 1000s of shader units: execution threads running on the GPU
- so: repainting means changing graphics memory and that's expensive.  GPU's can do this in parallel, and they also use compositing which is a faster way to copy
    - so you paint textures once, then move them around on the GPU : that's less work than copying memory
- layout and paint have to run after each javascript execution
- browser painting does not use the compositing methods you see in the GPU - its not treating elements as textures
    - it only compsites for stuff it KNOWS its going to change
    - textures/layers/compositing only involve:
        - video / canvas tag
        - 3d transforms
             - translate, sclae, rotate 
        - perspective
        - opacity
        - cursor
        - resize
        - composite-only css animation
        - will-change property
- painting: bad, compositing: good 
- don't overuse layers though- its expensive esp mobile
- canvas and webgl
    - canvas is a layer
    - once you have ~200 objects in canvas, it can no longer render at 25 FPS
    - webgl 
        - bypasses the same pipeline, works on GPU
        - but no interaction
    - svg vs canvas: svg lets you do declarative animations
    
 