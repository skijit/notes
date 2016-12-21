Max/MSP Jitter Tutorials
============
- Notes from working through the Jitter Tutorials in Max

## Jitter Matrix
- A Jitter Matrix can have any number of dimensions
- When the cells in the matrix have 4 different values, each value is on a different 'plane'.
- A single frame of video will be a 2x2 jitter matrix with argb values comprising 4 planes
- You can specify a variety of data types in a matrix: char (8bit), int (32bit), float (32bit), double (64bit)
- Video data, even though the data is numeric, typically only needs 8 bits for each color, so 'char' is selected as the data type over the 4 argb planes.

## Attributes
- Jitter objects typically require that a lot of attributes be set on them
- Setting attributes as arguments using '@' syntax is fine as well as changing them dynamically: just send a message with the attribute name and new value (no need for 'set')
- Most jitter objects process jitter matrix data
- Most jitter objects take 4 standard parameters that are related to the matrix they intend to process:
    - <planes_of_data> <data_type> <dim1_len> <dim2_len>
    - You need to specify your arguments/parameters before you begin setting attributes on the object statically
- THere are getters for individual cells and attributes

## Basics (1)
- Most Jitter objects communicate by only sending the names of the jitter matrix they should be operating on.
- To initialize a matrix:
    - jit.matrix <optional_name> <planes> <type> <dim1_len> ...
- When you bang on a matrix, it will return its name.
- `jit.print` will dump the contents of a matrix to the max window
- Getting Matrix Data- send it a message:
    - getcell <x> <y>
- Setting Matrix data-send it a message:
    - setcell <x> <y> val <val>
- Other messages for a jit.matrix:
    - setall <val>
    - clear

## Create a Matrix (2)
- `jit.matrix`
    - first argument is an optional name
        - then... <planes_of_data> <data_type> <dim1_len> <dim2_len> 
    - sends out its name from the left outlet name when banged
    - sends results of queries out its right outlet, e.g. from *getcell x y*
- `uzi`
    - sends a rapid fire of bangs out its left outlet
    - sends a counter int out its right outlet
    - only gets started when it receives a bang in it's left inlet

## Matrix Operations (3) 
- `jit.op` performs math operations on the entire jitter matrix, rather than 1 cell at a time.
    - you specify the math operation you want to use with the *@op* attribute.  EG *@op +*
    - operands can be matrix & scalar, or matrix & matrix
    - a scalar operand can be passed into an inlet (usually the right one), or you can specify it using the *@val* attribute.  EF *@val 3*
    - some scalar operands should be int and some should be float: it just depends on the op you use.
    - you can target individual planes of a matrix with the following syntax: *@op pass + + +*
        - assumes a 4-plane matrix
        - first plane (presumably the alpha) is 'passed'.  It is not changed.
        - The remaining rgb planes are all passed forward.
        - If you want to specify per-plane operations where the operands are scalars, pass these in a list to the right inlet.
- `jit.matrix` initializes with all zeros.
- each time you bang on a `jit.matrix` it creates a new matrix

### jit.op op values
    pass = pass left input, no operator 
    * = multiplication (also mult) 
    / = division (also div) 
    + = addition (also add) 
    - = subtraction (also sub) 
    +m = addition modulo (char only) (also addm) 
    -m = subtraction modulo (char only) (also subm) 
    % = modulo (also mod) 
    min = minimum 
    max = maximum 
    abs = absolute value (unary) 
    avg = average 
    absdiff = absolute value of difference 
    fold = folding/mirrored modulo (float only) 
    wrap = wrapping/positive modulo (float only) 
    !pass = pass right input, no operator 
    !/ = right input divided by left input (flipped) 
    !- = right input minus left input (flipped) 
    !% = right input modulo left input (flipped) 
    ignore = leave previous output value 
    Trigonometric Operators: (float32/float64 only, unary except atan2) 
    sin = sine 
    cos = cosine 
    tan = tangent 
    asin = arcsine 
    acos = arccosine 
    atan = arctangent 
    atan2 = arctangent (binary) 
    sinh = hyperbolic sine 
    cosh = hyperbolic cosine 
    tanh = hyperbolic tangent 
    asinh = hyperbolic arcsine 
    acosh = hyperbolic arccosine 
    atanh = hyperbolic arctangent 
    Bitwise Operators: (long/char only) 
    = bitwise and 
    | = bitwise or 
    ^ = bitwise xor 
    ~ = bitwise compliment (unary) 
    = right shift 
    = left shift 
    Logical operators 
    = logical and 
    || = logical or 
    ! = logical not (unary) 
    = greater than 
    = less than 
    = = greater than or equal to 
    = = less than or equal to 
    == = equal 
    != = not equal 
    > p = greater than (pass) 
    p = less than (pass) 
    =p = greater than or equal to (pass) 
    =p = less than or equal to (pass) 
    ==p = equal (pass) 
    !=p not equal (pass) 
    Exponential/Logarithmic/Other: (float32/float64 only, unary except hypot and pow) 
    exp = e to the x 
    exp2 = 2 to the x 
    ln = log base e 
    log2 = log base 2 
    log10 = log base 10 
    hypot = hypotenuse (binary) 
    pow = x to the y (binary) 
    sqrt = square root 
    ceil = integer ceiling 
    floor = integer floor 
    round = round to nearest integer 
    trunc = truncate to integer 

## Movie Playback (4)
- You can use `jit.movie` to play a movie
    - 2 ways to get successive frames:
        1. Connect it to a `qmetro`
        2. Just keep a `jit.world` (toggled on) in the patch
    - You can set looppoints
    - You can query it for all sorts of info like framerate, duration, time, vol, etc.
    - Changing the *@rate* attribute will change how quickly (and fwd/back) it plays back
    - You can jump to specific frames by sending it a *frames* message

## ARGB Color (5)
- `jit.pack` and `jit.unpack` handle different planes of a matrix
- char data (8 bits) is usually sufficient for each plane: it gives you ```- 2^24 ``` different colors!

## Adjust Color Levels (6)
- `jit.scalebias` to scales (multiply) or biases (add) values in a matrix
- the operands you send for the scale and bias operations will be between 0-1.  `jit.scalebias` will do the necessary conversion and return a matrix whose values are still char (0-255).
- you can target individual color channels for scaling or biasing with messages like *gbias*, *bscale*, etc.
- you can swap color channels by sending a `jit.matrix` a message like 'planemap 0 3 2 1' which will swap red and blue planes


## Image Level Adjustment (7)
- `jit.brcosa`
    - Changing brightness is equivalent to scaling (ie multiplying) all the values by a number
    - Contrast:
        - Increasing (above 1.0) is a dynamic expansion:
            - Cell values above the avg luminousity are increased
            - Cell values below the avg luminousity are decreased  
            - At full constrast, pixels will be pulled to either 0 or 255          
        - Decreasing (below 1.0) is a dynamic compression:
            - Cell values above the avg luminousity are decreased
            - Cell values below the avg luminousity are increased
            - When you get to 0, you'll end up with only the avg grey luminousity
        - Avg_Lum = .299*Avg_Red_Plane_Vals + .587*Avg_Green_Plane_Vals + .114*Avg_Blue_Plane_Vals
            - The coefficients are driven by our relative sensitivities to these different colors (ie we are most sensitive to various shades of green!)
        - Negative values increase the contrast only after inverting the image
    - Saturation:
        - Same as contrast, except it compares against the luminousity of the cell, not the avg luminosity of the entire photo/frame.
        - Decreasing will lead to a grayscale
        - Increasing will lead to a polarization to 0, 255
- `jit.hue` lets you change hue for each pixel by specifying an angle with which to shift the input pixels hue on the color wheel

## Simple Mixing (8)
- You can mix two photos/movies together by adding them
- You can crossfade them by adding two photos/movies scaled up/down by equal proportion
- The scaling of both is very important, bc you want to maintain a consistent level of brightness
    - otherwise you would possibly end up with a blended photo/movie that is lighter than the original
- `jit.xfade` takes a float argument between 0.0-1.0 that is used to scale each movie (by argument and 1-argument) before adding the two photos/movies 

## More Mixing (9)
- You can manually crossfade with `jit.scalebias` (to set the scaling), and `jit.op` (to do the fading)
- By using `jit.op`, you can specify a different operator (other than the standard +) on how to generate/choose the new pixel value.
+ Add the values of B to A.
    - *-m*: Subtract the values of B from A, then perform a modulo operation to wrap the result back into the desired range.
    - *max*:  Use whichever value is greater, A or B.
    - *absdiff*: Subtract the values of B from A, then use the absolute value of that difference.
    - *|*: (Bitwise Or) using binary number values, whenever a bit is 1 in either A or B, set it to 1 in the result.
    - *^*: (Bitwise Exclusive Or); using binary number values, whenever the bits of A and B are not the same, set that bit to 1 in the result, otherwise set the bit to 0.
    - *>*: If the value in A is greater than the value in B, set the result to 1 (or char 255), otherwise set it to 0.
    - *<*: If the value in A is less than the value in B, set the result to 1 (or char 255), otherwise set it to 0.
    - *>p*: If the value in A is greater than the value in B, use the A value in the result, otherwise set it to 0.
    - *<p*: If the value in A is less than the value in B, use the A value in the result, otherwise set it to 0.
- Even though `jit.scalebias` does the same as `jit.op *`, the latter is only able to take values in the range 0.0 - 1.0, whereas `jit.scalebias` does not have this problem.

## Chromakeying (10)
- `suckah` gets placed over a `pwindow` and clicking it lets you find out the color of the pixel
- `jit.chromakey` lets you do a green-screen effect between 2 matrices
    - setting *tol* effects its tolerance
    - you can use the *minkey* and *maxkey* properties to invert the keyed section, or to make a black/white silouhette of the first matrix.
    - *fade* will do some interpolation around the border 

## Lists and Matrices (11)
- you can pass a list to `jit.fill` and it will create it into a named matrix
    - if you send it the message *offset <number>*, it will use that offset amount from the beginning of the matrix to fill
    - you can pass a multislider output into `jit.fill` as well
    - you can use `zl.group` to collect a certain amount of messages, and then input them into `jit.fill`
    - only works for 1D and 2D matrices
- you can dynamically re-dimension a matrix
- `jit.spill` is like the opposite of `jit.fill`: it will take the matrix as an input and return a list

## Color Lookup Tables (12)
- Common objects to tables / lookups: `funbuff`, `table`, and `buffer~`, and `jit.charmap`
- `jit.charmap` lets you reassign particular char (color plane intensities) to new values.
- `jit.charmap` builds its output matrix by using the values in the input (left) matrix to point to positions in the (right) matrix and copying the value found there
    - given a cell in the left matrix of (70, 100, 23, 45), `jit.charmap` will check  the cells of the lookup (right) matrix in cells 70, 100, 23, and 45.  Then it will use these values.  
- Lookup tables for `jit.charmap` should be one-dimensional matrices of 256
    - Sine there are only 256 different char values.
- `jit.gradient` also lets you create lookup tables
    - `jit.gradient` generates single dimension char matrices that transition smoothly between two specified cell values
    - you send it start and end messages to define the gradient.  
        - start 0 1.0 1.0 1.0, end 0. 0. 0. 0.
    - takes a *cheby* message, followed by a list of 8 floats.  These correspond to the coefficients in a chebyshev polynomial, which specy the curve to follow when mapping from the start to end point.

## Scissors and Glue (13)
- `jit.scissors` cuts a matrix into equally sized smaller matrices
- `jit.glue` pastes multiple matrices into 1 matrix
- `jit.scissors @rows 2 @columns 2` will split the incoming matrix into 4 submatrices
- these are not dynamic objects: the number of rows/counts for both `jit.glue` and `jit.scissors` is defined at object creation time.
- `router` lets you (re)assign any inlet to a different outlet number

## Matrix Positioning (14)
- you can get a lot of mileage simply from isolating a region of a matrix, resizing it, then putting it at a different location in another matrix.
    - includes techniques such as stretching, pixelation, and blurring
- to pixellate a matrix, send in another matrix, but reduce the receiving matrix's size using a message *dim x y*
- there are 2 places you can interpolate a pixellated matrix:
    - in the matrix (send it mesg *interp 1*): interpolates values in the matrix resolution
    - in the window (send it mesg *interp 1*): will display at the windows resolution, with interpolation
- you identify parts to pull out of the source matrix and parts to put into the destination matrix with:
    - *usedstdim 1*, *dstdimstart 0 0*, *dstdimend 0 0*
    - *usesrcdim 1*, *srcdimstart 0 0*, *srcdimend 0 0*
    - what you specify in *dstdimstart* and *dstdimend* only affects where the data gets copied to in the destination matrix: it doesn't resize the matrix.  
        - you can only resize the matrix by changing the *dim* attribute
    - if you are only copying into a particular region, then you should send the dst matrix a *clear* message regularly
    - you can reverse or flip the movie/image by starting a higher number and proceeding to a lower number
- getting a window in fullscreen:
    - send message *fullscreen 1*
    - send a message *floating 1* (so the file menu goes away)

## Image Rotation (15)
- `jit.rota` lets you rotate and/or zoom a matrix
    - message *theta x* (where x is a float, in radians) revolves the image/movie around a central point
    - *anchor_x* and *anchor_y* define the point that you rotate around
    - *offset_x* and *offset_y* let you reposition the matrix **after** the rotation or zooming has taken place 
    - messages *zoom_x* and *zoom_y* specify the zoom amount.
        - consider setting *interp 1* on `jit.rota` when zooming 
    - `jit.rota` keeps the original dimensions of the matrix, regardless of rotation or zoom
    - when rotating or zooming, there might be a bunch of dead-space in the matrix and you can tell `jit.rota` how to handle that with the *boundmode* setting:
        - 0: Ignore, leave old cells whatever they were previously
        - 1: Clear, set all outlying to 0
        - 2: wrap
        - 3: Clip, (re)use the values of the boundary cells
        - 4: Fold, repeat the image, flipped back in the other direction
    

- `accum` lets you accumulate (via addition or multiplication, depending on which inlet you use) a number until it receives a bang in its leftmost inlet.
- reminder: the number entered in a `metro` is the period between bangs in milliseconds
- reminder: you can also use `pvar` to set values in objects when the message sent into `pvar` is *setname anchor_x, 160*, then you need to have an object whose script name is *anchor_x*

## Tutorial 16 & 17
- there's a `jit.conway` to model the game of life

## Matrix Resampling (18)
- to make matrix dimensions adaptable, based on input, set @adapt 1
- `drunk` parameters: maxValue and maxStepSize
- you can downsample a matrix by passing the old one into a new `jit.matrix` and then send it a *dim* message, making it smaller
    - upsample procedure is the same
    - downsampling is a good for:
        - pixellation effects
        - perform an algorithm more efficiently
        - then you can composite the two matrixes together with `jit.op` or `jit.xfade` or whatever!
- `jit.streak` lets you set a probability that one cells value will be copied into another's
    - *direction* attribute tells you which direction a streaked cell should be copied
    - *scale* attribute determines the brightness of the cell relative to the original

## Position Tracking in Movie (19)
- `jit.robcross` is a simple edge detector
- `jit.record` lets you record matrix changes (either in real-time or in an offline render)
    - The *write* message puts jit.record into a record-enabled mode.
        - optional arguments include: file name, frame rate, codec type, codec quality, codec timescale
        - *write 15. jpeg* specifies a frame rate of 15 (ie 15 Hz) and a codec type of Photo-JPEG
        - using the event-driven recording model, you want the metro to match the designated frame rate or you will get time compression or expansion
- with `jit.matrix thru 0`, the default *@thru* value of 1 is set to 0.  That means the matrix will only output a new matrix when it gets banged, not when it receives a new matrix (the latter of which is the default behavior)
- to record / capture from jitter:
    - start probably using syphon (syphon recorder and external), assuming you're using OpenGL textures.  Syphon is able to share OpenGL textures.
    - maybe (less likely) `jit.record` as this is really to record jitter matrices
    - to record audio and video, try `jit.vcr`
- `jit.gl.hap` encodes and decodes the HD QT HAP codec, and it outputs the data as a texture
    - there's even a [HAP engine](https://cycling74.com/forums/topic/announcing-hap-video-engine/) now to decode natively (ie wo FFMPEG)
- `jit.hatch` divides a matrix into a grid and just shows the color along the intersections

## Tutorial 20
- the *importmovie* and *exportmovie* (to `jit.matrix`) are used to import and export a single matrix (ie frame from a movie)

## Tutorial 21
- `jit.qt.videoout` lets you send data to an output device.
    - you specify the quality, codec, etc.
    - it can be queried, much like the `jit.grab`

## Tutorial 25
- `jit.findbounds` lets you find a particular color in video (4-plane, 2-dimensional matrix) or any other matrix configuration
    - you specify two colors as *min* and *max* attributes and then it will return a bounding region within which the values appear in the matrix.
- use `suckah` to find the color you want to track.

## Audio Control of Video (28)
- Some useful ways to track amplitude:
    - `snapshot~` will get the instantaneous amplitude of the audio
    - `avg~` gets average magnitude since last bang
    - `peakamp~` lets you see the maximum amplitude since the last bang (or it could be put on abn interval in ms)
- `atodb` object will convert amplitude (between 0-1) into dB
- To manually convert amplitude to dB:
    - ```- dB = 2- \cdot \log_10 \frac {A}{A_0}```
    - ```- A_0 ``` is the maximum amplitude of **1**, which equals 0 dB
- When triggering off of amplitude data, you might want to disregard soft sounds (below a certain dB threshold) and then expand the passed amplitudes into dB again.
- you can use `minimum` and `maximum` to pass only a range of values.  The left inlet is the numeric input and the right inlet sets the actual min/max.  
    - If any value is out of range, it is not passed on 
- `bline` generates a linear ramp of numbers to some target, with a predefined number of breakpoints (invdividual values in the ramp), each of which is triggered by a bang.


## Using Alpha Channel (29)
- in a jitter matrix, plane 0 is the alpha channel
- `jit.lcd`
    - only supports 4-plane char matrices
    - recieves messages in the form of QuickDraw commands, and displays them when it receives a bang
    - QuickDraw is an old 2D graphics API for Mac OS, which has since been replaced by the Quartz graphics system
    - This message: "font times 18, textface bold, brgb 255 255 255, frgb 0 0 0, clear, bang"
        - change font type
        - draw white background
        - draw black foreground
        - clear screen
        - draw!
- `jit.rgb2luma` generates a 1-plane greyscale matrix corresponding to the input matrixes luminosity
- The alpha channel of an ARGB image defines its transparency when it is composited with a second image.
    - Alpha value of 0 means it is transparent when composited with another image
        - But this might be the opposite if you're dealing with other color systems, codecs, etc.
- `jit.alphablend` uses the values stored in the alpha channel (plane 0) of the matrix arriving in the left inlet to perform a crossfade (on a cell-by-cell basis) between the matrices arriving in its two inlets.
- To get a photonegative effect, use `jit.op @op !- @val 255`

## Drawing 3D Text (30)
- `jit.gl.text3d` draws 3d text
    - you can send individual characters, a list of characters, or characters in a jitter matrix (where each row will be treated as 1 line).
    - some basic positioning properties you can set:
        - *position <x> <y> <z>*  (changing position is also called **translation**)
        - *rotate <angle-clockwise> <x-axis> <y-axis> <z-axis>*
            - The x,y,z of the rotation axis is basically a vector drawn from the origin (vertex of the object's axes)
        - *scale <x>, <y>, <z>*
            - where x, y, z are the relative amounts in each axis
            - scaling the z axis doesn't seem to give the text any more depth
    - with each redraw, the transformation order of operations are:
        - scaling
        - rotation
        - translation
- To show the text's containing axes, send it a message *axes 1*
- to make a 3d object into a 2d object, scale its z axis to 0

## Rendering Destinations (31)
- `jit.gl.render` (though usually replaced by `jit.world`) can write to any of these **named** destinations:
    - `jit.window`
    - `jit.pwindow`
    - `jit.matrix`
        - but this is slow- be sure you want to do this.
    - to change the rendering destination, just send it a message: *drawto <name>*
        - to change a GL scene to a new destination, you need to send this message to both the `jit.gl.render` as well as any other GL objects involed.

## Camera View (32)
- Camera view includes:
    - the camera's position
        - send `jit.gl.render` the message: *camera 0. 0. 2.*
    - the point at which the camera is looking
        - send message *lookat <x> <y> <z>*
    - the "up" vector
        - default up axis vector is [0.,1.,0.].  
    - the type of projection
        - default projection type is called 'perspective projection'
        - you can change to orthographic (e.g. Qbert) by sending the message *ortho 1*
    - the lens angle
        - objects will be smaller as the lens angle increases to accommodate a larger field of view. 
        - Similarly, we can change the lens angle of our perspective transformation to increase the field of view
        - change lens angle by issuing *lens_angle <angle_val_float>*
    - the clipping planes
        - clipping planes are two planes, measured in distance from the camera, that specifies the range of objects to draw.
        - objects outside the clipping planes are not rendered.
        - set *near_clip <float>* and *far_clip <float>*
        - to me, it seems to be about depth        
- setting *@depthbuffer 1* on a `jit.window` enables depth testing (i.e. the thing on top is the thing closest to the camera)
- `jit.gl.gridshape` can draw lots of shapes: spheres, tori, cylinders, cubes, planes, and circles
- when you create a plane with `jit.gl.gridshape`, you can specify if you want it filled or as a grid.
    - *poly_mode 1 1*: outlined polygons
    - *poly_mode 0 0*: filled polygons
- default camera position is at [0, 0, 2] with the focus on [0, 0, 0]
- `jit.gl.handle` will let you make a rotation around the axis (colored circle) which is closest to the camera when you start.
    - if you command-click on the object, you can drag it around the 2-d space
    - if you option-click on the object it, will move the object closer or farther from the camera
    - it will spit out the new position from it's left outlet.
    
        
## Polygon Modes, Blending, Colors (33)
- Wireframe mode for `jit.gl.gridshape`:
    - *poly_mode <front_fill> <back_fill>* where 0=fill and 1=wireframe mode
- You can select whether to display the front or back using the *cull_face <int>* message.
    - 0: Show all polygons (ie both sides)
    - 1: Hide the back-facing polygons 
    - 2: Hide the front-facing polygons
- OpenGL uses color spec of RGBA, as opposed to ARGB (which is used by jitter matrices)
    - To convert between specs: use `jit.gl.unpack`, `jit.gl.pack`, and you can also send *planemap* messages to `jit.matrix`
- Trails and Erase Color:
    - Each bang from the qmetro sends an *erase* message.  
    - You can set the erase color (ie background color) with the message: *erase_color <r> <g> <b> <a>*
    - If you set the alpha to 0.1, you'll get trails (assuming the object is moving), because when you erase, it is blending the pixel value as 10% erase color, 90% old value.
- Blending and the `jit.gl.gridshape`
    - Setting *blend_enable 1* to `jit.gl.gridshape` will make it consider the alpha value.
    - To set the blend mode, send a message *blend_mode <source_int> <dest_int>*
    - source -> new pixel value, destination -> old pixel value
    - The blend mode is a combination of how to handle the old and new pixels
    - There 11 distinct modes. 
    - The default is 6, 7  (GL_SRC_ALPHA, GL_ONE_MINUS_ SRC_ALPHA)
- Sending `jit.gl.gridshape` the message *antialias 1* will turn on anti-aliasing (due to rasterization-based aliases).
    - The performance will vary for one video card to the next, so keep in mind this might cause performance portability issues.


## Textures (34)
- `jit.gl.plato` can create platonic solids including tetrahedrons, hexahedrons (also known as cubes), octahedrons, dodecahedrons, and icosahedrons
- Without lighting turned on, and without a texture applied, a solid 3d geometery looks more like a 2d geometry
- A texture is simply an image that is overlaid on a geometry
- Jitter textures have names
- The newer way to create textures is connect a `jit.movie` into a `jit.gl.texture`, which will give the texture a name.  Then you can use that name to project it onto any `jit.gl.gridshape`.
    - the older way was to use `jit.gl.render` to create a texture.
    - for newer examples, see Video Tutorial 10
- typically, when using a video or image texture, interpolation will be on.  This might blur things, but it also means no holes in the projection.
- the open gl geometry object (`jit.gl.gridshape`, `jit.gl.plato`, etc.) will have a default algorithm for textures.  However, there are a few other options, which you can set by sending it a message: *tex_map <int>*.
    - 0: default
    - 1: object linear mode - As the object is rotated and positioned in the 3D scene, the texture mapping remains the same
    - 2: sphere map mode - assumes that the texture contains a sphere mapped image of the surrounding environment
    - 3: eye linear mode - applies the texture in a fixed manner relative to the eye's coordinate system
    - note the object linear mode and eye linear mode both have additional values which may be set: *tex_plane_s* and *tex_plane_t*, but they're fairly complicated.

## Lighting and Fog (35)
- **Specular Light**: when the light comes from a certain direction and reflects directionally off a shiny surface.  E.G. a focused beam of light bouncing off glass.
- **Diffuse Light**: similar to specular, it comes from a particular direction but scatters in all directions as it bounces off a surface.
- **Ambient Light**: Directionless.
- **Emissive Lighting**: This is used for modelling objects which are ther own light sources
- Materials vs Textures
    - [good src](http://stackoverflow.com/questions/4262503/whats-the-difference-between-material-and-texture)    
    - Materials are essentially a set of coefficients that describe how various types of lighting interact with the surface of an object.
    - Textures are bitmaps (images) that are applied to and interpolated onto a surface 
    - Note that `jit.gl.material` seems to produce shaders for materials (out of scope for this tutorial).  But you can also use the grid objects internal material algorithms (in scope for this tutorial).
- Auto_material:
    - sending the message *auto_material 1* to the shape will set lighting as such:
        - diffuse and ambient light will be set to the object's color
        - specular and emissive lighting are disbaled
    - Alternately, you can modify the material manually by changing the lighting parameters. (the rest of this tutorial)
- You can send `jit.gl.render' the message *light_position x y z r* to change it's position.
    - the value r determines the degree to which directional or positional light is used
    - if r is 0, it is directional : like the sun in that moving objects within the scene doesn't change the lighting 
    - if r is 1, it is positional : good for artificial light sources
- The diffuse and specular components of the light are combined with the diffuse and specular components of the material at each vertex according to the light and angle at which the light reflects towards the camera.
    - For this to work, each vertex needs to have a *normal* associated with it.
    - A Normal is vector that is perpendicular to the surface.
    - Most of the time, the jitter object will generate normals for you, but if you want, there's a way to pass in your own normals (see tutorial 37)
- You can have a color swatch feed into a `prepend` to send messages to `jit.gl.render` like *light_ambient a r g b*, *light_diffuse a r g b*, *light_specular a r g b*
- Likewise, you can send messages like *mat_ambient a r g b*, *mat_diffuse a r g b*, *mat_specular a r g b* to the gl object (eg `jit.gl.gridshape`)
- Sending the message *shininess <int>* to the gl object (e.g. `jit.gl.gridshape`) will specify to what degree light is diffused / spread out when it bounces off the object.  Values between 2-50 are realistic.
- When specifying colors for lighting, try to find ways of making the colors less saturated.
- 'Fog' can be applied to each object
    - You specify a color of the fog, then the objects color at each vertex will blend with the color of the fog, such that as it gets farther from the camera, it will assume the color of the fog entirely.
    - The individual fog parameters you specify (in a message) are: R, G, B, Alpha, Density, Start Distance, End Distance
- **UPDATE**: The newer way to handle all this is with `jit.gl.light`
- Types of light include:
    - **Point**: emits in all directions, like a light-bulb
    - **Spot**: a spot light
    - **Directional**: like the sun

## 3D Models (36)
- when a 3d model is read in, it may contain different nodes, which can be animated separately.
    - You can see the named nodes when you set verbose on in the `jit.gl.model`
    - You can point these names at a `jit.anim.node`
- model file may contain material definitions
- there are a variety of geometries which can be employed to spec out a 3D model.  Some newer ones might include NURBS and parametric models.  Jitter handles things like vertices, polygons, groups, materials and texture coordinates.
- Textures / Texture Mapping:
    - when you create a 3D model, you'll often specify what points should be used when wrapping a texture around it.
        - but you can also use the *tex_map* messages to specify an auto algorithm for wrapping a texture (as in tutorial 34)
    - to apply a texture to just one group, send the `jit.gl.model` this message: *texgroup <int> <texture_name>*
- Drawing Groups:
    - When there are multiple groups, you can specify that they only be drawn 1 at a time by sending the message *drawgroup <int>*.  (1- indexed)
    - *drawgroup 0* draws everything!
- You can use different *material_mode <int>* messages to determine how to handle the material:
    - 0:  don’t use materials from model file. The object’s color attribute determines the diffuse color, and the flat color if lighting is not enabled.
    - 1: Use diffuse material component from model file to determine the diffuse color or flat color of the rendered model.
    - 2: Use all material components from the model file.

## Geometry under the hood (37)
- a number of jit.gl objects support a *matrixoutput 1* mode which allow them to output their geometries as matrices instead of opengl data that will go straight to the video card.
    - you need to route these to `jit.gl.render` or `jit.world` if you do this
    - the output will be a message like 'jit.matrix u0123lkj123lkj quad_grid'
        - quad_grid is the type of drawing primitive to use.
        - you can also use: points, lines, line_strip, line_loop, triangles, tri_strip, tri_fan, quads, quad_strip, polygon, tri_grid, and quad_grid
        - you can change the drawing primitive, or even the default drawing primitive in the `jit.gl.render` using the *drawing-primitive* message.
    - you can change the dimension of the geometry, which is interesting.
- geometry matrix details:
    - Each vertex in the geometry represented as float32 data with 3, 5, 8, 12, or 13 planes
    - Planes 0-2 specify the x, y and z position of the vertex
    - Planes 3 and 4 specify the texture co-ordinates s and t
    - Planes 5-7 specify the normal vector nx, ny and nz used to calculate the effects of lighting on the geometry.
    - Planes 8-11 specify the red, green, blue, and alpha vertex color.
    - Plane 12 specifies the edge flag e
- You can use a `jit.xfade` to blend geometry matrices.  In this example, they blended with `jit.noise 12 float32 20 20`

## Basic Performance Setup (38)
- Sending messages to the `jit.window`:
    - *size 160 120* sets the size of the window (actual window size- not resolution)
    - *pos 300 400* moves the location of the window
    - *border <0 or 1>* turns the window border on or off
    - *floating <0 or 1>* makes the window float or not.
        - A floating window "floats" above all non-floating windows, and can never be sent to the back (although another floating window could cover it). Causing a window to float can help you to ensure that your video data is always visible if you have a complex patch with many windows.
    - *fullscreen <0 or 1>*
- most useful messages/setup:
    - toggle fullscreen based on keypress
    - set attribute *@fsmenubar 0* to hide the system menu bar when the window is fullscreen
- you can use `jit.displays` to get your monitors and tell you what coordinates you should place your `jit.window` in (example in the tutorial patch) 
- Anytime you are using a `jit.pwindow` which is smaller than the video being displayed on the `jit.window`, you should turn off onscreen mode (in the pwindow).  You'll get much better FPS.

## Spatial Mapping (39)
- `pictslider` lets you make an x-y slider over a user-definable background image, and the slider itself is an image you select
    - the output is the x-y pair
- you can upsample one matrix to another (ie copy it over but with larger dimensions)
    - furthermore, you can set *@interp 1* to interpolate when it copies values
- `jit.clip` will set upper and lower bounds for each cell in a matrix
- `jit.repos` takes two matrices:
    - left inlet's matrix has values
    - right inlet's matrix has slots whose values are the coordinates in the left matrix
    - the output matrix uses the slots from the right inlet to pick out corresponding values in the left matrix
    - good for producing distortions (aka funhouse mirror effects)

## Drawing in OpenGL using jit.gl.sketch (40)
- `jit.gl.sketch` lets you send messages which correspond largely with the standard functions available to the OpenGL API
    - For more info, check the [Redbook](https://www.opengl.org/sdk/docs/man4/)
- Rules for converting OpenGL constructs to `jit.gl.sketch` messages
    - All OpenGL commands are lowercase in jit.gl.sketch. Thus the OpenGL function glColor() becomes the Max message glcolor sent to jit.gl.sketch.
    - OpenGL symbolic constants, in addition to being lowercase, lose their “GL_” prefix, so that GL_CLIP_PLANE1 (in OpenGL) becomes clip_plane1 when used with jit.gl.sketch, for example.
- `jit.gl.sketch` also provides some high-level drawing constructs
- setting *@displaylist 1* will move the `jit.gl.sketch`'s commands onto the Graphics Card, but any commands added later (dynamically), will be much slower.

## Shaders (41)
- What is the difference between `jit.gl.slab` and `jit.gl.shader`?
    - They both execute shader programs
    - `jit.gl.shader` defines the name of a shader program and then you can send that reference into a gridshape.
    - `jit.gl.slab` can be used to chain sequences of shaders together.
        - Also it can output directly into `jit.world`: it doesn't need to define a texture for a 3D object (although it can do that too).
    - Per forum comments:
        - `jit.gl.shader`: vertex and fragment shaders (geometry and pixel processing)
        - `jit.gl.slab` and `jit.gl.pix`: fragment shaders only (effects on the pixels of an image). Useful for image/video processing
- When you enable "smooth shading" on your 3d object, you're using "Gouraud Shading". 
    - It was one of the first shading algorithms and is a default for many graphics cards
    - It calculates a different lighting value for each vertex and interpolates across the polygon
    - It doesn't look good if there are not many polygons (low-dimensional)
- Per-Pixel lighting
    - Another smoothing algorithm, Phong Shading, interpolates not just across the polygon, but at a lower-level: the fragment.
    - Fragments are basically pixels.
    - It's more computationally expensive, but you can implement it by writing a shader program, inputting it to `jit.gl.shader`, then applying it to the material.
- Shaders
    - A programmable graphics pipeline lets you apply custom written programs to affect the lighting/pixel value (fragment shaders), as well as the geometry (vertex shaders).
    - There are a couple different languages you can write shaders in, but GLSL is the main one.
        - Cg is another
        - RenderMan is one that was developed by Pixar

## Slab: Data Processing on the GPU (42)
- sending a *sync 1* message to `jit.window` will make sure the GPU doesn't send frames faster than the natural hardware refresh rate (60Hz)
- Changing a video to colorspace *uyvy* can make things way faster when you process them with `jit.gl.slab`.
    - It takes half the memory of an argb format
    - DV footage is decompressed more quickly in this format
    - you just set `jit.movie @colorspace uyvy`
- A quick way to tell whether you are passing matrices or textures is just to look at the message going out of an object.  It could be:
    - *jit_matrix <name>*
    - *jit_gl_texture <name>*
- `jit.gl.slab` will accept matrix or textures as input, but will output textures!
- you can apply a texture to a videoplane, a gridshape, etc.
- *Readback* means when you move a texture from video RAM (VRAM) to CPU RAM (RAM): it's usually pretty expensive, so you should avoid where possible.

## A Slab of your own (43)
- `jit.gl.slab` will execute shaders written in GLSL, CG, ARB, and NV languages
- will process fragment programs (colors) and vertex programs (geometry)
    - Sometimes (maybe always?) both are needed
- JXS file is an xml wrapper around a GLSL program that you point each slab at
- GLSL is pretty specialized- will need plenty of independent study to make sense of

## Jitter and Javascript (45)
- Things you can do:
    - Programmatically create jitter objects chains of processes
        - (they can be jit.gl objects as well as any other jittter objects
    - Jitter matrix creation and I/O
    - Receive callbacks from Jitter objects by listening to them and calling functions based on the results (e.g. triggering a new function whenever a movie loops).
- You can create patcher objects programmatically, or you can just define them local to the script.
- JavaScript is good, but look into the Java interface for this stuff too- as it is FASTER than JavaScript
- `jit.wake` does video feedback using convolution
    - It's kind of like a combination between `jit.slide` and `jit.convolve`
- Matrix operations in Jitter
```(javascript)
var myfbmatrix = new JitterMatrix(4, "char", 320, 240);
// initialize feedback matrix to all maximum values
myfbmatrix.setall(255, 255, 255, 255);
// set all the values in our matrix to 0:
mymatrix.clear();
// set the variable foo to the value of cell (40,40):
var foo = mymatrix.getcell(40,40);
// set cell (30,20) to the values (255,255,0,0):
mymatrix.setcell2d(30,20,255,255,0,0);
```
- Jitter objects
    - the properties of a `JitterObject` correspond directly to the attributes used by the Jitter object loaded into it
```(javascript)
// Jitter objects to use (also declared globally)
var myqtmovie = new JitterObject("jit.movie", 320, 240);
var myrobcross = new JitterObject("jit.robcross");
var mywake = new JitterObject("jit.wake");
var mybrcosa = new JitterObject("jit.brcosa");
myrobcross.thresh = 0.14; // set edge detection threshold
mywake.rfb = 0.455; // set wake feedback for red channel
mywake.gfb = 0.455; // set wake feedback for green channel
mywake.bfb = 0.455; // set wake feedback for blue channel
mybrcosa.brightness = 1.5; // set brightness for feedback stage
```
- Processing Data
    - Instead of having to call each internal Jitter Object's bang() message, you can use the matrixcalc() function.
```(javascript)
function bang()
// perform one iteration of the playback / processing loop
   {
      // setup

      // calculate bleed coefficients for new matrix:
      calccoeffs();

      // process

      // get new matrix from movie ([jit.movie]):
      myqtmovie.matrixcalc(mymatrix, mymatrix);

      // perform edge detection ([jit.robcross]):
      myrobcross.matrixcalc(mymatrix, mymatrix);

      // multiply with previous (brightened) output
      mymatrix.op("*", myfbmatrix);

      // process wake effect (can't process in place) ([jit.wake]):
      mywake.matrixcalc(mymatrix, mywakematrix);

      // brighten and copy into feedback matrix ([jit.brcosa]):
      mybrcosa.matrixcalc(mywakematrix,myfbmatrix);

      // output processed matrix into Max
      outlet(0, "jit_matrix", mywakematrix.name);
   }
```

## Javascript Operators (46)
- Particle systems
    - A particle system is essentially an algorithm that operates on a (often very large) number of spatial points called particles. - These particles have rules that determine how they move over time in relation to each other or in relation to other actors within the space.
    - simulate a wide variety of natural processes such as running water or smoke
    - Particle systems are widely used in computer simulations of our environment
- Much faster to process data in matrices as opposed to JS array
- The loadbang() function of JavaScript code only executes when the patcher containing the js object is opened. 
    - Does not execute when you change and recompile the JavaScript code.
- Nutshell of this tutorial: you can perform iterative cell-by-cell calculations on matrices, but it is WAY WAY faster to use embedded jitter objects that operate on the matrix as a whole, namely `jit.op` or `jit.expr`

## Jitter Callbacks in JavaScript (47)
- The point here is to "listen" to the output of Jitter objects that have been encapsulated in JavaScript in order to design functions that respond interactively to these objects.
- Jitter objects instantiated within JavaScript have no inlets and outlets per se, we need to explicitly create an object (called a JitterListener) to catch those messages and call a function (called a callback function) in response to them.
- Example of creating an array of 3d OpenGL objects:
```(javascript)
// initialize our little spheres with random colors and positions (x,y)
for(var i="0;i<OBJECT_COUNT;i++)" {
  mysphere[i] = new JitterObject("jit.gl.gridshape","ListenWindow");
  mysphere[i].shape = "sphere";
  mysphere[i].lighting_enable = 1;
  mysphere[i].smooth_shading = 1;
  mysphere[i].scale = [0.05,0.05,0.05];
  mysphere[i].color = [Math.random(),Math.random(),Math.random(),0.5] ;
  mysphere[i].position = [Math.random()*2.-1, Math.random()*2.-1];
  mysphere[i].blend_enable = 1;
}```
- Example callback scheme and redraw function (on bang)
```(javascript)
var mywindow = new JitterObject("jit.window","ListenWindow");

// create a [jit.gl.gridshape] object for use to control with the mouse
var mywidget = new JitterObject("jit.gl.gridshape","ListenWindow");

// create a JitterListener for our [jit.window] object
// the getregisteredname() method is standard on all jitter objects, and
// is just how you get the internal name, necessary to listen to changes 
// in the object.
// now whenever the jit window generates an event, the callback will be
// executed.
var mylistener = new JitterListener(mywindow.getregisteredname(), thecallback);

function thecallback(event)
// callback function to handle events triggered by mousing
// in our [jit.window]
{
	var x,y,button; // some local variables

	if (event.eventname=="mouse") {
	// we're entering, dragging within, or leaving a "mouse click" event

		// arguments are (x,y,button,cmd,shift,capslock,option,ctrl)...
		// we only care about the first three
		x = event.args[0];
		y = event.args[1];
		button = event.args[2];
		if (button) // we're clicked down
		{
			mywidget.color = [0,1,0,1]; // color our control object green
			mywidget.shape = "torus"; // change it to a donut shape
		}
		else // we've just unclicked
		{
			mywidget.color = [1,0,0,1]; // color our object red
			mywidget.shape = "sphere"; // change back to a sphere
		}
		// move our control object to the drawing context's
		// equivalent of where our mouse event occurred:
		mywidget.position = myrender.screentoworld(x,y);
	}
	else if (event.eventname=="mouseidle") {
	// we're mousing over the window with the mouse up
		x = event.args[0];
		y = event.args[1];
		mywidget.color = [1,1,1,1] ; // color our object white
		mywidget.position = myrender.screentoworld(x,y); // move our control object
	}
	else if (event.eventname=="mouseidleout") {
	// we're no longer mousing over the window
		x = event.args[0];
		y = event.args[1];
		mywidget.color = [1,1,1,0.5] ; // make our object translucent
		mywidget.position = myrender.screentoworld(x,y); // move our control object
	}
}

// don't allow this function to be called from Max
thecallback.local = 1;

function bang()
// main drawing loop... figure out which little spheres to move
// and drive the renderer
{
	// collision detection block. we need to iterate through
	// the little spheres and check their distance from the control
	// object. if we're touching we move the little sphere away
	// along the correct angle of contact.
	for(var i = 0;i<OBJECT_COUNT;i++) {
		// cartesian distance along the x and y axis
		var distx = mywidget.position[0]-mysphere[i].position[0];
		var disty = mywidget.position[1]-mysphere[i].position[1];

		// polar distance between the two objects
		var r = Math.sqrt(distx*distx+disty*disty);
		// angle of little sphere around control object
		var theta = Math.atan2(disty,distx);

		// check for collision...
		if(r<0.15)
		// control object is size 0.1, little spheres are 0.05,
		// so less than 0.15 and it's a hit...
		{
			// convert polar->cartesian to figure out x and y displacement
			var movex = (0.15-r)*Math.cos(theta);
			var movey = (0.15-r)*Math.sin(theta);

			// offset the little sphere to the new position,
			// which should be just beyond touching at the
			// angle of contact we had before. the result
			// should look like we've "pushed" it along...
			mysphere[i].position = [mysphere[i].position[0]-movex, mysphere[i].position[1]-movey];
		}
	}

	// rendering block...
	myrender.erase(); // erase the drawing context
	myrender.drawclients(); // draw the client objects
	myrender.swap(); // swap in the new drawing
}
```

## Frames of MSP Signals (48)
- Tutorial 27 covered `jit.poke~`, which copies an MSP signal sample-by-sample, into a jit.matrix
    - also saw `jit.graph` which is useful for visualizing audio and other one-dimensional data
- `jit.catch~` also moves data from signal to domain
    - Can take multiple audio signals and assign each to a matrix frame
    - mode attribute:
        - 0 : matrix size is dependent on time of last bang, output is a single dimesional matrix
        - 1 : dependent on the *@framesize*, will output multidimensional matrix such that the buffered audio will be broken into rows of framesize buffers
        - 2 : also dependent on *@framesize*, will output the most recent (since last bang) single dimensional matrix of framesize
        - 3 : lets you output a matrix whenever crossings are made- if no crossing is made, it reverts to mode 2 .
            - good for analysis of periodic data              
- `jit.release~` moves matrix data into MSP frames
    - outputs a distinct signal for each plane in the matrix
    - the tricky part is getting the latency settings right
        - bc it's being supplied with matrix data at event-rate, but it needs to output data at signal rate
        - as *@latency* increases, you reduce the probability of getting a buffer underrun
    - *@mode* attribute can be:
        - 0 : Expects a 1:1 mapping of matrix cell to output sample (make sure you're buffering enough)
        - 1 : the playback position is smoothly adjusted (i.e. the values are interpolated) based on how much data is given. 
            - put differently: If the playback time of samples stored is less than the length of the latency attribute, jit.release~ will play through the samples more slowly.
    - for more examples of using `jit.release~`, check out jit.forbidden-planet patch    
- `jit.graph`
    - takes single dimensional matrix data and rewrites it to be output to a pwindow
    - lets you specify the name of the matrix you want to output to with *@out_name*
        - you can output `jit.graph` output to `jit.pwindow`
    - *@mode* lets you specify how you want to draw the frames
    - *@clear_it* lets you specify when you clear the output matrix: useful when you want to overlay audio data
- `jit.3m` gives you min, max, & mean based on each plane of a matrix
- `bondo` synchronizes a group of messages
    - todo: compare with `pak` and `buddy`
    







