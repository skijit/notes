Instancing and Rendering 
===========================
- [source](https://www.derivative.ca/Events/2015/WorkshopsWestVideos/)
- Video Workshop with Matthem Ragan

## Session 1
- **Instancing** is a technique for duplicating geometries that uses the GPU instead of the CPU.
- start with `Container` the project level and 'i' into it.
- We want to begin rending stuff
    - Add a `Geometry`, `Camera` COMP, and a `Render` TOP
        - The `Geometry` COMP automatically has a `Torus` SOP in it
        - For now, we're skipping the `Light` COMP
        - At this point, the object has no lighting or material, so it's dark and useless
        - Add a `Constant` MAT to the `Geometry`, which will cause the shape to emit a constant amount of light
        - Note, there's no shading on the object
- Split screen between the `Geometry` component and the high level network
- Replace the `Torus` with a `Sphere` SOP
    - It won't, by default, show up in the rendering (at parent level) bc you need to turn on the *Render* flag (bottom right)
    - You also need to turn on the *Display* flag for it to show up
    - Set the *Primitive Type* to Polygon
- On the value of `Null`:
    - If you add another SOP and you want to display it, you need to turn on it's *Display* and *Render* flag (and turn off the `Torus`'s)
    - Alternately, you could just add a `Null` SOP and turn on it's *Display* and *Render*, and whatever connects into it will be used
    - `Null` is like the 'end of the chain'
- Instancing
    - You can make copies of SOPS witht he `Copy` SOP, but this is going to be CPU intensive.
    - There should be a way to make copies that is GPU-intensive instead.
        - It's called **Instancing**
    - Go to the `Geometry` COMP and select the parameter page 'Instance' and turn on *Instancing*
    - `Sphere` SOP -> `Null` SOP -> `SOP to` CHOP -> `Null` CHOP
    - Then back in the  `Geometry` COMP in the parameter page 'Instance', set *Instance CHOP/DAT* to the last `Null` CHOP
    - Then you'll map the various channels to the coordinate:
        - TX => tx, TY => ty, etc.
    - In the `Geometry`, select the XForm page and bring down the *Uniform Scale* parameter
    - Now you have a sphere (corresponding to the sphere in the `Geometry` COMP) being rendered at each vertex in the new `Sphere`, which is the source for instancing.
    - Instancing is just providing the coordinates for the GPU to redraw the known Geometry in a bunch of different locations
    - Then you can rotate/animate the Instancing source SOP
        - A simple way to animate is to interject a `Transform` SOP between the `Sphere` and the `NULL` and to set it's rotate property to the following expression:
        ```(python)
        absTime.frame
        ```
- The `Geometry` Component has the ability to rotate objects and this is all offloaded into the GPU- so it's more efficient
- Suppose we want to make the Instanced geometry face different direction:
    - We will import the arrangement sphere's normals in the `Sop To` CHOP.
        - Set *attribute scope* to *P N*
        - Set *rename scope* to *tx ty tz nx ny nz*
    - Now go the `Geometry` COMP and in the *Instance* page, set *Rotate To Vector X* to *nx* (etc for y and z)
    - This makes the inner geometry look like a tile for the arrangement geometry
- When you're rendering, if you take a away a MAT, then it's just black.
    - Then if you add a `Light` COMP, then it will have some type of shading
    - But when you use a MAT (at least to have a constant color associated with it), you don't need to add a light
- You can connect a `Movie File In` TOP to the `Constant` MAT and it will use that as the material.
    - You're using the `Constant`'s *Color Map* property to refer to the 'Movie File In` 
    - You might also need to set *Blending Transparency* to *On* and *Depth Test* to *Off* in the `Constant`
- To get a different effect for each image:
    - Add a `Level` and `HSV Adjust` TOP to the chain and then add a `Texture 3D` TOP
    - in the `Texture 3D` TOP, you want to set the type to *2D Texture Array*.
        - This is going to create, in a single array (which lives on the GPU), and series (number is set by *Cache Size*) of copies of the input image
        - Each frame, another one of the image *slices* is updated
        - You can access a slice with the *w* parameter
    - Now we want to use a python expresion to set the *Cache Size* to equal the number of points in the arrangment sphere.
    ```(python)
    len(op('myArrangementSphereNull').points)
    ```
    - To be able to index each slice separately, we create a `Wave` CHOP, and choose a type of *Ramp*.
        - Then set the *Period units* to *samples*, the *Period* and *Amplitude* to that same python expression above.
        - So then if you output this to a `Table` DAT, you'll get a table that counts from 0-41, all integers
        - In the `Wave`, set the *channel name* to *w* and add a `Merge` CHOP right after the `SOP TO` CHOP that gets all the arrangement sphere's points and normals.  Now you'll have even more channels available.
        - On the `Geometry` COMP Instance 2 Page, go to the *Texture Mode* parameter, and set *W* to *w*
- Used an `LFO` CHOP to drive the Hue.
    - Use a `Math` CHOP to scale it and map to a new range from 0-360.
- When you lock an operator, you're saving it's settings right into the .toe file
- `Random` CHOP set to timeslicing will just give you a sample at a time, rather than a big array of numbers
    - For the Noise page, if you set the noise type for *sparse* to *random*, you get a much more random stream of data
- You can box-select a bunch of nodes, then right-click and select 'Collapse Selected' and it will put everything in a `Base` Component
- Connect a `Feedback` TOP to the end of a `Render`
- `Render` -> `Feedback` -> `Level` -> `Composite`
    - set the `Composite` operator to 'Add'
    - drag the `Composite` back onto `Feedback`
    - this makes everything white, but then you can turn down the *Opacity* value in the `Level` TOP

## Session 2
- When you have make a viewer active, you can *home* (h) on the shape to set the camera to the default position
    - good when you change the size or if you don't have a mouse
- You can right-click on the `Render` TOP to get the *View* option.
    - You can also select (from the upper-right corner) a *Geometry Viewer* instead of the Network Viewer.
    - The Geometry Viewer is going to show you whatever geometries exist, but the Network Viewer will be limited to whatever geometries have a *Render* flag set on them.
- `Camera` COMP has a *Path SOP* parameter that lets you plot its position
    - In this case we use a `Circle` SOP, and so we'll get the smoothest motion when we use the *Primitive Type* of *primitive* rather than *polygon*
- The Geometry Viewer lets you view both the Geometry and Camera position
- Add a `Null` COMP and then in the `Camera` COMP, set the *Look At* parameter to this new Null
    - This will give it a constant gaze as you translate the position of the camera
    - So that's an interesting use for the `Null` COMP
    - The `Null` COMP also has positional parameters like *Translate*, *Rotate*, and *Scale*, and that's one of the ways you can modify the gaze
- A good way to animate camera position:
    - Add a `Constant` CHOP -> `Speed` CHOP -> `NULL` CHOP, then export that to the `Camera` COMP's *position* parameter
    - Even though the camera is following the *Path SOP*, you can adjust it's positional parameters to provide any number of offsets
- Changing the color of each of the `Box`'s
    - `Noise` TOP with a resolution of y=1 and x=python expression for each point
        - len(op('null1').points)
    - The `Geometry` COMP has an *instance2* parameter page with *r*, *g*, *b*, *a* parameters
    - In the *Noise* page for the `Noise` TOP turn off *monochrome*
    - `Noise` TOP -> `NULL` TOP -> `TOP To` CHOP -> `Merge` CHOP which also connects to the Instance related points
    - Now you map the `Geometry` COMP's *r*, *g*, *b*, *a* parameters ( *instance2* page) with the corresponding r,g,b, and a channels
    - You can animate the color changes by going to the `Noise` TOP and then change the Translate *ty* expression `absTime.frame *`
- To get a more flat feeling, add a `Constant` Mat to the Geometry's material property
    - Then you can take out the `Light` COMP since `Constants` emit
- You can create a new `Geometry` COMP (geometry2) and then export the `Null` from the first `Geometry` COMP (geometry1)
    - It works by creating a `Select SOP` in geometry2 and referencing (by relative path) the null in geometry1
    - Add the Display & Render flags on the `Select`
    - take the same Instance values as geometry1
    - on geometry2, you'll assign a new `Wireframe` material
- *Render* parameter on `Render` TOP will let you choose which geometries (and other?) you want to render
- `Camera Blend` COMP is really good for switching (or blending) between cameras in a scene.
    - The two camera COMP's it relates to are via hierarchy (top inlet)
    - Be sure to change the render to look at `Camera Blend`
    

    





