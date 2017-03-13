Demystifying WebGL
=========

- upload vertices into buffers, make draw calls and have shaders process the data for the final frame
    - making vertices is what happens in the javascript
- using triangles as a primitive shape is very flexible
- vertex: a point that connects two lines
- face: list of vertices which are connected
    - basically, a triple of vertices (assuming triangles are your primitives)
- buffer: a piece of memory on the graphics cards
- shader: program that runs on GPU
    - functions that take data from buffers, and change it
    - highly parallelizable since vertices don't depend on each other
    - vertex shader: changes the geometry.  takes some input coordinates, generates output coordinates.
    - fragment shader: gets positions, and produces color information { r,g,b,a,d} (d=depth)
 - gpu has 1000s of shader units: executable threads
 - shaders
    - check out shaderpad
    - runs for each pixel
    - programs are super-verbose- mostly due to boilerpate setup
        - libraries can help: three.js, blend4web (based on blender), babylon.js
    - to animate it, you just process based on the existing position
- shininess uses Phuong material
- You could possibly use shaders from three.js in an OpenGL context
    - Need confirmation
- [talk notes](bit.ly/confoo-WebGL)
