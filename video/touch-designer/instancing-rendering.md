Instancing and Rendering 
===========================
- [source](https://www.derivative.ca/Events/2015/WorkshopsWestVideos/)

- start with `Container` the project level and 'i' into it.
- We want to begin rending stuff
    - Add a `Geometery`, `Camera` COMP, and a `Render` TOP
        - The `Geometry` COMP automatically has a `Torus` SOP in it
        - For now, we're skipping the `Light` COMP
        - At this point, the object has no lighting or material, so it's dark and useless
        - Add a `Constant` MAT to the `Geometry`, which will cause the shape to emit a constant amount of light
        - Note, there's no shading on the object
- Split screen between the `Geometery` component and the high level network
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
    - Instancing is just providing the coordinates for the GPU to redraw the known Geometry
    - Then you can rotate/animate the Instancing source SOP
        - A simple way to animate is to interject a `Transform` SOP between the `Sphere` and the `NULL` and to set it's rotate property to the following expression:
        ```(python)
        absTime.frame
        ```





