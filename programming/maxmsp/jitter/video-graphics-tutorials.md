Video and Graphics Tutorial
===================
- note that playback/functionality is buggy on a windows surface

## Displaying a Video (1)
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

## Live Capture (2)
- `jit.fpsgui` displays the current fps coming out of a `jit.pwindow`
- `jit.grab` lets you specify an input device (video camera or web cam?)
    - it will return a jitter matrix, which you can pass into jitter effects or `jit.world`

## Controlling Jitter With Messages (3)
- `attrui` objects are useful for:
    - knowing the available attributes which can be set
    - knowing each attribute's range
- `jit.fluoride` : adds a neon glow
- `jit.slide` : settings for video delay / reverb / smoothing
- `swatch` object is good for visually picking out colors

## Adding 3D Objects (4)
- `jit.gl.gridshape` lets you draw a 2d or 3d shape into a context
    - *lighting_enable* adds shading which makes it look less flat
    - *smooth_shading* interpolates values to smooth
    - *position* - moves the shape around in the context
    - *shape* - changes the shape
- To see the specific message being sent by an `attrui`, check the corresponding object's value in the inspector and press alt (or option) while dragging it into the patching window.
- `jit.gl.model` lets you import an 3d model into the drawing context.
    - From there, you have the same types of controls over the model as with gridshape
    - You can view a couple built-in 3d models (extension .dae) from the FIle Browser -> Kinds -> OpenGL -> filter on DAE

## Jitter Matrix operations (5)
- you can load a still image into a `jit.movie`
- sending a *planemap* message into a `jit.matrix` allows you to reorder the planes in a matrix
- `jit.cellblock` lets you view the contents (and filter by plane and perhaps more) of the `jit.matrix`
- `jit.unpack` lets you create a new jitter matrix from the plane of an existing matrix
- `jit.pack` lets you pack up multiple matrices by plane. 

## More Jitter Matrix operations (6)
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

## Generating Geometry (7)
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

## Audio into a matrix (8)
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

## Building Live Video effects (9)
- the standard matrix effect objects aren't super high-performance, so using the gl objects (particularly `jit.gl.pix` and `jit.gl.slab`) is often better.
- instead of working on matrix data, most gl objects work on a different data structure called a **texture**, which is handled by the GPU.
- to get jitter objects like `jit.movie` and `jit.grab` to output a texture instead of a matrix, you need to set the attribute **@output_texture 1**.
- `jit.gl.pix` is a based on `gen`, and it allows you to process textures using the performant, low level gen-patching contructs.
    - Reminders about `gen`:
        - there are a whole other set of gen-related objects
        - gen patches are compiled into low-level C code
        - gen patches can be embedded or saved separately, as a .genjit file
        - to load a separately saved genjit patch, use: `jit.gl.pix @gen <nameOfPatchWithoutExtension>`
    - There are standard genjit patchers available, corresponding to many of the matrix-based jitter objects, to make use of.
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

## Composing the Screen (10)
- An OpenGL scene can have any number of video and geometry elements together in a scene
- `jit.gl.videoplane` is how you display a video in an openGL render world
    - send it a `layer <int>` message to set it front/back.  Higher values move it to the front.
    - Attribute **blend_enable** lets you blend various layers
    - by default, the blend is driven by the alpha channel, but there is also a jit.gl.pix patch (alphy) that will let you substitute any plane for the alpha.
    - `jit.gl.videoplane` doesn't need to be connected to a `jit.world` to render.    
- **luminance** is the avg of R, G, and B
- `jit.gl.texture` will take generate a buffer of image data used in drawing a 3d geometry that resides on the graphics card.  It's like the `jit.matrix` of open gl data.
    - Sometimes you'll want to create a new texture, which you'll name with *@name*, and recall later, like for putting on the surface of a `jit.gl.gridshape`
- `jit.gl.camera` will move the position, characteristics of the camera in the virtual space.
    - looklock attribute will keep the gaze on the same object, while just moving the position of the camera.
- `jit.gl.node` 
    - lets us render an entire scene as a texture, which can be processed or reused in a number of ways.
    - it's like a child context.
    - *@capture 1* renders the output as a texture
    - gl objects (videoplane, gridshape, etc.) connected to the middle outlet of `jit.gl.node` are associated with that node's <context></context>
- `jit.gl.cornerpin` lets you map textures in a window.  
    - you can arrange their position with 4 corner pins that get drawn to the screen.
    - in many ways it like taking a whole gl context and flattening it into a plane and then manipulating it in another context.
    - not sure if you can make it a 3d context.

## Depth Testing vs Layering
- There are 2 primary ways to handle how overlapping objects are rendered:
    1. **Depth Testing**: this is driven by the proximity of each object to the camera such that closer stuff gets drawn on top.
    2. **Layering**: this is driven by a *layer* attribute that is associated with each object.  Objects with higher layer values are drawn on top by virtue of the fact that they're drawn later.
- Depth Testing
    - The render context relies on a *depth buffer*, which corresponds to an attribute `depthbuffer`, used by `jit.pwindow` or `jit.window` (and maybe the `jit.world`?) which is ON by default
    - Each jit.gl object has an attribute, `depth_enable` which needs to be on (also ON by default) 
- Layering
    - Make sure each jit.gl object has `depth_enable=0`
    - Driven by the `layer` attribute
- Blending
    - Layering with configurable transparency, set `blend_enable=1`
    - `blend` attribute will let you configure various transparency from a variety of sources (1 = solid, 0 = totally transparent), though by default it is set to *alphablend* which is the last value of the object's color attribute.
- Hybrid methods are OK
- The `depth_write` attribute lets you use a depth testing approach but not update the depth values for objects.

## About GL Contexts
- OpenGL rendering happens in an named context.
    - 2 approaches:
        1. `jit.gl.render` + (`jit.window` || `jit.pwindow` || `jit.matrix`
        2. `jit.world` which combines `jit.gl.render` with `jit.window`
- Jitter GL objects must be associated with a named context in order to draw
    - via context name as argument name (this is the first argument, which sets the *drawto* attribute)
    - implicitly: if you only have one render context, then you don't have to name it, and every gl object will write automatically to it.  (including subpatches)
- `jit.world` and `jit.gl.render` send signals to all associated gl objects to draw
- Shared Contexts:
    - In some situations you might want two render contexts to share the same resources (e.g. textures)
        - Ex: writing to a `jit.window` and a `jit.pwindow`
    - This can only happen if you mark each context with the *shared* attribute (value = 1)
- SubContexts:
    - you can use `jit.gl.node` to create subcontexts
    - subcontexts are good because:
        - You can manipulate their common attributes by sending the changes directly to `jit.gl.node`
        - You can output the entire context as a texture
    - to make a jit.gl object write to a subcontext, make sure to set the **@drawto** attribute.
    - A common idiom is to put a jit.gl.node object in a subpatch with other jit.gl objects, forcing them to implicitly attach to the node
- `jit.world` outputs:
    - Captured scene out the left outlet  (OR)
    - Matrix output OR
    - Texture output

## Gl Texture Output
- Jitter video object's output may include:
    - matrix (typical)
    - GL Texture
        - Supported by `jit.movie`, `jit.grab`, `jit.playlist`, and probably others
- Textures are image or other kinds of data stored and processed on your machine's GPU
- When @output_texture = 1, video frames are decoded and directly uploaded to an internal `jit.gl.texture` object
- Passing textures actually just passes a message *jit_gl_texture <internal_texture_name>*
- Texture output is faster, especially with HD content
- Other optimizations include:
    - if alpha channel is not needed, set color mode to *uyvy* instead of *argb* as it requires half the data with no loss in quality
        - note this only applies to how the image is uploaded to the GPU- it doesn't affect the color mode of the internal texture.
        - OTOH, if you use this color mode on a jitter matrix, it will literally cut the matrix size in half
- Once you get a video texture in the GPU, you want to keep it there.  So you won't want to switch back to using jitter matrices.
- Displaying video data in texture:
    - Connect to a `jit.world`
    - For more control over placement, size, and color use `jit.gl.videoplane`
        - Image skewing, mapping, etc. can be managed with `jit.gl.conerpin`
- Texture processing:
    - use `jit.gl.slab` (uses shaders) or `jit.gl.pix` (uses gen patchers)
    - Most matrix operations have a corresponding shader or genpatcher.
    - jit.op operations have corresponding shaders, each starting with the prefix *op* (e.g. op.add.jxs, op.max.jxs)
- Matrix Readback
    - This is a costly operation where you read a texture back into main memory for processing on the CPU
    - Avoid doing it!
    - Happens anytime you connect a texture output into a `jit.matrix`
    - There are some cases you might want to do it if you're performing color tracking or analysis (see `jit.findbounds` or `jit.3m`), but if you do, first downsample the texture with `jit.gl.texture` before sending it into a matrix
    


## More information
- [Article on building your own video system in Jitter](https://cycling74.com/2008/12/22/the-video-processing-system-part-1/)
- [Article- Your First Shader](https://cycling74.com/2007/05/23/your-first-shader/)

