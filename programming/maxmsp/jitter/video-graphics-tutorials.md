Video and Graphics Tutorial
===================
- note that playback/functionality is buggy on a windows surface

## Tutorial 1 - Displaying a Video
- `jit.world` 
    - will create a separate display window
    - outputs video when connected to a toggle - doesn't seem to require a metro
        - there are lots of attributes, like: FPS which handles autorendering
    - can take a `playlist` or a `jit.movie` as input
    - second outlet emits a bang whenever a frame is rendered
    - first argument is the *world* (e.g. `jit.world myworld`) or *context* which is a useful handle for later operations
        - be careful not to reuse/change names of the contexts (they have to be global and if you change it, you might have to re-opn your patch)
- `jit.movie` available for lower level playback
    - it can be attached to a `jit.pwindow` or a `jit.world`

## Tutorial 2 - Live Capture
- `jit.fpsgui` displays the current fps coming out of a `jit.pwindow`
- `jit.grab` lets you specify an input device (video camera or web cam?)
    - it will return a jitter matrix, which you can pass into jitter effects or `jit.world`

## Tutorial 3 - Controlling Jitter With Messages
- `attrui` objects are useful for:
    - knowing the available attributes which can be set
    - knowing each attribute's range
- `jit.fluoride` : adds a neon glow
- `jit.slide` : settings for video delay / reverb / smoothing
- `swatch` object is good for visually picking out colors

## Tutorial 4 - Adding 3D Objects
- `jit.gl.gridshape` lets you draw a 2d or 3d shape into a context
    - *lighting_enable* adds shading which makes it look less flat
    - *smooth_shading* interpolates values to smooth
    - *position* - moves the shape around in the context
    - *shape* - changes the shape
- To see the specific message being sent by an `attrui`, check the corresponding object's value in the inspector and press alt (or option) while dragging it into the patching window.
- `jit.gl.model` lets you import an 3d model into the drawing context.
    - From there, you have the same types of controls over the model as with gridshape
    - You can view a couple built-in 3d models (extension .dae) from the FIle Browser -> Kinds -> OpenGL -> filter on DAE

## Tutorial 5 - Jitter Matrix operations
- you can load a still image into a `jit.movie`
- sending a *planemap* message into a `jit.matrix` allows you to reorder the planes in a matrix
- `jit.cellblock` lets you view the contents (and filter by plane and perhaps more) of the `jit.matrix`
- `jit.unpack` lets you create a new jitter matrix from the plane of an existing matrix
- `jit.pack` lets you pack up multiple matrices by plane. 

## Tutorial 6 - More Jitter Matrix operations
- `jit.noise` generates a matrix of any number of planes and any size
- `jit.expr` lets you build an expression targeting matrices. You can use:
    - operators from `jit.op`
        - recall `jit.op` was where you specify various mathematical operations in combining the planes of multiple matrices
    - functors from `jit.bfg`
    - jitter MOPS (?)
    - fixed variables include:
        - `in[0]` : the first input, i.e. if you pass multiple matrices in
        - `cell[0]` : the cell number
        - `norm[0]` : generates normalized values across the first dimension (horizontal)
    - various mathematical constants
- you can target specific regions of a source or destination matrix for copying using these messages to `jit.matrix`, while passing a reference to another (the source matrix) in the leftmost inlet:
    - usesrcdim 1 : enables copying selected region from the source matrix
    - srcdimstart <x> <y> 
    - srcdimend <x> <y>
    - usedstdim 1 : lets you specify a region in the destination matrix to copy to
    - dstdimstart <x> <y>
    - dstdimend <x> <y>
    - interp 1 : will interpolate, which smooths things out when you have scaling/distortion

## Tutorial 7 - Generating Geometry
- Typically, jit.gl.* objects will simply render their outputs.  
- But you can also reconfigure them (@matrixoutput 1) to output a jitter matrix
    - Instead of a 3 or 4 plane (A)RGB matrix of char data, they'll contain 12 plane floating point geometric data
    - The first 3 planes are the most important, as they define a point in XYZ space
- You can then manipulate the matrix of geometries as you would with any other matrix 
- Then you can input that to another gl object for rendering, such as `jit.gl.mesh`
- `jit.gl.mesh` takes in a floating point 3+ plane matrix and interprets them as OpenGL shapes
    - See the **draw_mode** attribute for understanding how it can interpret this data
- You can generate geometery data just like any other matrix: just make it 3+ planes and floating point.
    - So you could use `jit.noise` and then pass that to `jit.gl.mesh`
    - `jit.gen` is another populate option for generating geometry data.
- `jit.map` is like the `scale` object, but for jitter matrices

## Tutorial 8 - Audio into a matrix
- `jit.transpose` is pretty simple: it just transposes rows and columns.
- `jit.*` is just a shorthand for `jit.op` where the operation is multiplication.
    - the *val* attribute can be used to specify a scalar value as the multiplier (rather than another matrix)
- `jit.graph` takes floating point data (audio is often used as an example) and graphs it into a 2D plot
- `jit.catch~` will grab MSP signal/audio data and convert it into a stream of jitter matrices
    - then you can use these matrices as a modifier against some source matrix 
- `peakamp~` will send you the peak amplitude since it's last bang interval
- This tutorial had 3 examples:
    - Capturing the peak amplitude of a sound and making it drive the brightness of grabbed video
    - Splitting the sound into 3 bands and then using that to scale a geometry in different directions
    - Converting audio into a matrix:
        - Transpose or not
        - Visualize the matrix as grayscale
        - Convert the matrix into a graph and visualize that
        - Use that matrix as a modifier of a geometry via various ops

## Tutorial 9 - Building Live Video effects
- the standard matrix effect objects aren't super high-performance, so using the gl objects (particularly `jit.gl.pix` and `jit.gl.slab`) is often better.
- instead of working on matrix data, most gl objects work on a different data structure called a **texture**, which is handled by the GPU.
    - 'shaders' and 'textures' are basically the same thing
- to get jitter objects like `jit.movie` and `jit.grab` to output a texture instead of a matrix, you need to set the attribute **@output_texture 1**.
- `jit.gl.pix` is a based on `gen`, and it allows you to process textures using the performant, low level gen-patching contructs.
    - Reminders about `gen`:
        - there are a whole other set of gen-related objects
        - gen patches are compiled into low-level C code
        - gen patches can be embedded or saved separately, as a .genjit file
        - to load a separately saved genjit patch, use: `jit.gl.pix @gen <nameOfPatchWithoutExtension>`
    - There are standard genjit patchers available, corresponding to many of the matrix-based jitter objects, to make use of.
        - 
    - `attrui` works with standard genjit patchers!  
        - they're usually at the very bottom with lowercase names
    - `jit.gl.pix` processes RGBA planes instead of ARGB
    - last such object in the chain should output to `jit.world`
- To find all the genjit shaders, go to the Max file browser -> Cycling 74 -> Gen
    - There are about 20 such objects
- `jit.gl.slab` (short for 'shader-lab')
    - similar to `jit.gl.pix` insofar as they're made to process on the GPU
    - different insofar as `jit.gl.pix` is for generating your shaders via gen's patching mechanism, whereas `jit.gl.slab` lets you run shaders directly on the GPU
        - There are tons of Shader files (which basically encapsulate some type of graphical transformation) available from the Max file Browser: Cycling 74 -> Jitter -> Shaders
    - load a shader like this: `jit.gl.slab @file td.mirror.jxs`
- Using shader files:
    - .jxs is a jitter-based xml syntax
    - double click the `jit.gl.slab` that's hosting the shader and you'll see the shader code
    - Getting/Setting Parameters: 
        - `attrui` doesn't work
        - parameters you can set are `bind` nodes and the name of the param is under the `param` property
            - `<bind param="origin" program="fp" />`
        - Or you can send it a `getparamlist` message and print out the result from its right outlet
        - To set an attribute, use the following message syntax: `param <attribute name> <value(s)>`

## Tutorial 10 - Composing the Screen
- An OpenGL scene can have any number of video and geometry elements together in a scene
- `jit.gl.videoplane` is how you display a video in an openGL render world
    - send it a `layer <int>` message to set it front/back.  Higher values move it to the front.
    - Attribute **blend_enable** lets you blend various layers
    - by default, the blend is driven by the alpha channel, but there is also a jit.gl.pix patch (alphy) that will let you substitute any plane for the alpha. 
- **luminance** is the avg of R, G, and B

## More information
- [Article on building your own video system in Jitter](https://cycling74.com/2008/12/22/the-video-processing-system-part-1/)
- [Article- Your First Shader](https://cycling74.com/2007/05/23/your-first-shader/)

