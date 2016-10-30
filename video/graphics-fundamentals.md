Graphics Fundamentals
======================
- Very high level discussion of computer graphics from Siggraph 2015
- [Source Video](https://www.youtube.com/watch?v=7Hn5qUmL-Q8)
- [Resources](http://web.engr.oregonstate.edu/~mjb/fundsem/)
    
## Intro to Graphics Process
 - Three primary components of Computer Graphics Process
    1. Modelling
        - Make Geometries
    2. Rendering
        - Make pictures of the geometries
    3. Animation
        - Make it move
- Instead of a detailed Computer graphics pipeline, you could zoom out and think of it like this...
- ![graphics process](/resources/images/programming/graphics-process.png)

- **Modelling**
    - Possible Inputs for 3d Geometric modelling
        - 3D scanning
        - Interactive Geometric modelling
            - Software like Blender, Maya, etc.
        - Model Libraries
        - Displacement Mapping
        - Material properties
    - Output goes to a rendering stage 
- **Animation**
    - Different Methods for Animation
        - keyframe animation is where you smoothly interpolate movement
        - Physics motion computation
        - Motion capture (very common)
    - output goes to a rendering stage 
- **Textures**
    - taking a pattern / image and stretching it over a piece of geometry
    - Input methods:
        - Scanned image textures
        - Procedural (computed) textures
        - Painted Textures
            - Like the sky in video games, is typically a single polygon with a painted sky
    - Output to rendering
- **Surface Information**
    - Alpha Blended Transparency
    - Refractive transparency
    - Reflectivity
    - Subsurface scattering
- **Lighting**
    - Types of lighting (point, directional, spot)
    - Light positions
    - Light Colors
    - Light intensities
    - Output to rendering
- **Rendering** 
    - Putting it all together and making an image or images
- **Image storage and display**
    - What you do with the content
    - Compositing
    
## Graphics Hardware 
- ![graphics process](/resources/images/programming/graphics-hardware.png)

- **Frame Buffer**
    - a 2d Array
    - uses Additive colors (RGB)
        - Cyan = Green + Blue
        - Magenta = Red + Blue
        - Yellow = Red + Green
        - White = Red + Green + Blue
        - If you have a blue dot and you put it next to a green dot, and then you back up, it will appear cyan
            - think old tvs
    - the memory sitting behind each pixel is separated out into R,G,B and then you need to determine the word size for each R,G, and B value
        - larger word size equals more discrete intensities of that color light
        - low end systems might have 8-bits of color for each (256 intensities) whereas high end systems might have 36 bits (2^36 intensities)
    - our eyes are most sensitive to the shades of green, then red, and lastly, blue
    - A 24-bit frame-buffer means you have 8 bit color for each color component
    - A lot of systems are using floating point instead of integers, and for some algorithms doing computation on these color values, it is best to have floating point
        - But the display often can't display all that color resolution
    - Transparency Value (alpha)
        - 0 is invisible, 1 is opaque
        - 8-32 bits floating point
    - Z component:
        - Used for hidden surface removal.
        - IE If you add a depth value to what you render, then determining what to show and what to hide is easy 
    - Double-buffered:
        - To keep playback smooth, there are 2 buffer:
            - One is actively being rendered into
            - During which the other has been sent to the screen for output
            - When the first buffer being written to fully rendered, each frame buffer swaps role, and so forth
        - Screen has a given refresh rate, like 60 hz
        - Make sure when you buy a graphics card that it's double buffered
    - Video Driver is what sucks the data out of the frame buffer and sends it to the monitor
- **Display**
    - On LCD monitors
        - A matrix of R,G,B patterns
        - Light behind it, which shines through them
        - A shutter which changes the intensities of each
    - Plasma monitors are not so popular any more
    - **Resolution**
        - 4096 is 4096 x 2160
        - Common pixel resolutions: 1280x1024
    - Screens are historically wider than tall bc our eyes are separated horizontally and thus we can see more in the horizontal range
- **Fragment Processor**
    - Right before goin to the frame buffer
    - Fragments and pixels are similar
        - Fragment = 'pixel to be'
            - You've got all the info, you just haven't computed the RGB yet
        - Pixel = has a final R,G,B
    - Includes lighting, textures, other algorithsm to determine the final pixel RGB
- **Rasterizer**
    - Takes vertex coordinates and maps them onto the grid of pixels
    - Typically involes lots of triangle interpolation
    - Aliased lines will have a stair-steppy quality to them    
    - Anti-aliasing
        - I think the technique is to change the color values of boundaries to be a blend of both colors (at varying levels)
        - Is often handled in the hardware now 
    - Can smooth out and interpolate alpha, z-values, etc.
- **Texture Mapping**
    - aka pixel shaders or fragment shaders
- **Vertex Processor**
    - Rotating, Scaling, projecting, moving around vertices
    - You can write your own vertex shaders which define how you project something

## Modelling
- The model should be a complete representation of the geometry of an object
- Typically made of triangles
    - Data structure is a list of vertices, colors, and connections
    - ![graphics data structures](/resources/images/programming/graphics-data-structures.png)
- Coordinates, connections, and colors go into the model
- There are higher level constructs available than just using triangles
    - Boolean Geometries: Union, Intersection, Differences of known solids        
    - Curve Sculpting: Bezier Curve
        - You can do the same with Bezier (3D) surfaces
    - But even with these techniques, this will, at a lower level, still get rendered with triangles
    - Simulation

## Rendering
- Creating an image of a geometric model
- Parameters/Questions
    - How realistic it should be?
    - How much compute time is available?
    - Lighting scenario
    - Local or global illumination
    - Shadows?
    - Reflection and refraction?
- **Lighting**
    - Objects have an inherent color
        - Based on what color they reflect
    - Lights have a color
    - So you have to put these two factors togehter:
        - What wavelengths are coming in and what wavelengths can this thing bounce out?
    - ![graphics data structures](/resources/images/programming/why-lighting.png)

- **Lighting Environment**
    - You need to know the geometery of the scene to illuminate it properly
    - Ambient: Light that's everywhere
    - Diffuse: The angle between the incoming light and the perpandicular of the surface of the object
        - If that angle is 0, its a spotlight
    - Specular
        - Like the 'shininess'
        - How close your eye is to the angle of reflection from the diffuse lighting
    - ![graphics data structures](/resources/images/programming/Lighting-types.png)

    - Hardware can calculate these things pretty well for us, but it gets very complicated 
- **Light types**
    - Point : Light is just spreading out from the point
    - Parallel
    - Spot
    - ![graphics data structures](/resources/images/programming/light-sources.png)

- Two Types of Rendering
    1. Start at the Object
        - On Graphics Hardware
        - Render pixels and z-buffer
    2. Start at the Eye
        - Ray-tracing
            - Good for reflection and refraction
            - Real-time ray tracing is become a more hardware supported option
        - Subsurface scattering: models how light bounces around within an object
            - Good for skin, wax, milk, etc.

## Animation
- 2 mechanical approaches
    1. Forward kinematics:
        - If I know how the object moves, and how it's linked, then I change it and see what happened. 
    2. Inverse kinematics:
        - If I know where I want it to end, what are the links necessary to get it there
- Particle Systems
    - A cross between modelling and animation?
    - Good for waterfalls
    - process: Emit LOTS of particles, have some math drive them, update the screen
- Physics modelling
    - Good when it would be too hard to manually design
    - Usage of springs
    - Cloth simulations (flags, clothing)
    - Line simulations 
- Functional Animation
    - You want to move it in a direction, but you don't want to do it manually or how it happens
    - Good for crowd modelling
    - You might use a simulation of springs or other forces (which are not specifically driven by physical laws of motion, etc.)
- Motion Capture
    - Varieties of types
        - MocapLab
        - Polhemus
        - NaturalPoint
    - Multiple cameras