Basic OpenGL
====================

## Siggraph Intro Talk
- [source video from siggraph](https://www.youtube.com/watch?v=6-9XFm7XAT8)
- Since each OS has a different windowing system, OpenGL uses a platform-independent window mgmt library called `freeglut`
- Library called GLEW (openGL Extension Wrangler) will manage only the extensions that are available to different platforms

- Fundamental geometric object is the **vertex (vertices)**
- A vertex is a location in space
- A vertex has:
    - positional coordinates
        - 4 'homogenous coordinates' dimensions
        - X, Y, Z, W
        - W : 
            - if a point, the W = 1
            - if a vector, the W = 0
        - If you specify only 2 coordinates (a 2D object), it will make Z = 0, W = 1        
    - color
    - texture coordinates
    - lighting
    - any other data you want to store
- Hierarchy of Data Structures: Vertex -> VBO -> VBA
    - Vertex data is stored in vertex buffer objects (VBO's)
    - VBO's are stored in vertex array objects (VAO's)
    - A big point of these container structures is that you can get them all to the GPU, and then swap them out without having to recopy (as this is an expensive operation)
- OpenGL Geometric Primitives
![opengl primitives](/resources/images/programming/opengl_primitives.png)
    - OpenGL knows how to render your vertices as any of the following...
        - GL_POINTS
        - GL_LINES  
        - GL_LINE_STRIP
        - GL_LINE_LOOP
        - GL_TRIANGLES
        - GL_TRIANGLE_STRIP
            - Take the first 3 vertices, define a triangle.  Take the 2nd, 3rd, 4th and render another triangle, and so forth.
            - Good for surfaces
        - GL_TRIANGLE_FAN
            - the first vertex is always fixed.  1,2,3 then 1, 4, 5, then 1, 6, 7
    - Modern OpenGL really only wants to deal with triangles and basically, surfaces (for performance, and other reasons)    

### Cube Rendering Example

- Build each cube face from **individual triangles**
```(c++)
// 6 faces * 2 triangles per face * 3 vertices per triangle
const int NumVertices = 36; 
```

- to simplify geometric objects in C++...
```(c++)
typedef vec4 point4;
typedef vec4 color4; 
```
    - this will also give greater affinities to GLSL, the C-like shading language but with some extra matrix/vector-related data structures.
    - We'll have to communicate somehow with GLSL later
    - You'll often have to choose whether you want to implement certain operations like lighting in the vertex shader, fragment shader, or in the application.  If you have similar data structures between both domains, then it's easy to have more portable operations.  So, depending on where you implement this- just change the typedef.
- The cube has 2 attributes per vertex:
    - Position
    - Color
- Create and Initialize 2 arrays to hold the VBO data

```(c++)
point4 vPositions[NumVertices];
color4 vColors[NumVertices];

//the last field is the alpha channel, which will
//be ignored unless you have blending turned on.
point4 positions[8] = {
    point4( -0.5, -0.5, 0.5, 1.0),
    point4( -0.5, 0.5, 0.5, 1.0),
    point4( 0.5, 0.5, 0.5, 1.0),
    point4( 0.5, -0.5, 0.5, 1.0),
    point4( -0.5, -0.5, -0.5, 1.0),
    point4( -0.5, 0.5, -0.5, 1.0),
    point4( 0.5, 0.5, -0.5, 1.0),
    point4( 0.5, -0.5, -0.5, 1.0)        
};
color4 colors[8] = {
    color4( 0.0, 0.0, 0.0, 1.0), //black
    color4( 1.0, 0.0, 0.0, 1.0), //red
    ...
    //4th component is blending, alpha, opacity
};
```

- Assemble Each cube face with a helper

```(c++)
int Index = 0; //index for VBO array

//modelling convenience function: 
//since each cube as 6 faces, why not just define each face 
//of the cube (1 for each line) ie each call    
void quad(int a, int b, int c, int d) 
{
    vColors[Index] = colors[a]; vPositions[Index] = positions[a]; Index++;
    vColors[Index] = colors[b]; vPositions[Index] = positions[b]; Index++;
    vColors[Index] = colors[a]; vPositions[Index] = positions[c]; Index++;
    vColors[Index] = colors[a]; vPositions[Index] = positions[a]; Index++;
    vColors[Index] = colors[c]; vPositions[Index] = positions[c]; Index++;
    vColors[Index] = colors[d]; vPositions[Index] = positions[d]; Index++;

}

//create each cube face
void colorcube()
{
    quad(1,0,3,2);
    quad(2,3,7,6);
    quad(3,0,4,7);
    quad(6,5,1,2);
    quad(4,5,6,7);
    quad(5,4,0,1);
}
```

- This is just one way to do this: using triangle strips or fans would be better
- Now we need to get the vertex arrays over to the GPU... (this is about 50 min, I stopped watching...)

## OpenGL Pipeline and Shaders
- [src](https://www.quora.com/What-is-a-vertex-shader-and-what-is-a-fragment-shader)
- [another src](http://duriansoftware.com/joe/An-intro-to-modern-OpenGL.-Chapter-1:-The-Graphics-Pipeline.html)
- [src](https://www.opengl.org/wiki/Rendering_Pipeline_Overview)
![processing pipeline 1](/resources/images/programming/gl1-pipeline-01.png)
![processing pipeline 2](/resources/images/programming/gl1-pipeline-02.png)

- **Vertex Specification**
    - Host program fills OpenGL-managed memory buffers with arrays of vertices
        - These buffers are filled with *Vertex Attributes* 
        - *Vertex Attributes* are arbitrary, may contain:
            - projection coordinates
            - coordinates on the texture that should map to the current vertex
            - anything else: it's user-definable, just as the Shader code is.
        - The buffers will be packed together into what is known as the *Vertex Array*
        - Each render request will also include an *Element Array*, which contains the indexes to the Vertex Array that should be processed.
    - A set of static, read-only data is also passed into the next stage of processing called *Uniform State* 
        - Includes textures and anything else that might be useful to the shaders.
- **Vertex Processing**
    - Vertex Shaders executed
        - Processes each individual selected vertex from the vertex array
        - At a minimum, the vertex shader will project the vertices into screen space
        - Vertex shaders are user-definable code
        - Output is:
            - New Vertex data
            - Other user-definable outputs, such as color or texture coordinates
    - Optional Stages, both of which run user-definable Shader code:
        - Tesselation Shader: TODO- more info
        - Geometry Shader: TODO- more info
- **Vertex Post-Processing**
    - These are fixed function operations (i.e. non-customizable like Shaders)
    - Transform Feedback: TODO- more info
    - Clipping: Any vertices which are on the outer boundary are tidied up, prior to sending off for Primitive Assembly
- **Primitive Assembly**
    - Vertices are assembled into triangles, triangle strips, triangle fans, or other primitives as directed
    - The cool thing about triangle strips and fans is how memory efficient they are compared to rendering an independent triangle, since to get the next triangle you only need 1 (not 3) vertex.
- **Rasterization**
    - Breaks the resulting primitives into much smaller pixel-size fragments.
    - It may act upon additional output (e.g. color) furnished by the vertex shader
    - The fragment is a set of data which might be useful in processing the final pixel value
- **Fragment Processing**
    - Pixel-size fragments are assigned color and depth values, which get drawn into the framebuffer
    - Logic provided by custom **Fragment Shader** code
    - Common Fragment Processing operations are texture mapping and lighting
    - Runs independently for each pixel that gets drawn, so it can perform the most sophisticated special effects, but it's also the most performance-sensitive.
- **Per-Sample Processing**
    - Colored pixels are drawn to framebuffer
    - Framebuffers are more than just a 2d image array:
        - color buffers
        - depth buffer : fragments are tested and discarded when failing
        - stencil buffer : fragments are tested and discarded when failing
        - etc.
    - Values will be alpha-blended to the final pixel value
- **Goal of Vertex Shader**: provide the final transformation of the mesh vertices to the rendering pipeline 
- **Goal of Fragment Shader**: provide Coloring and Texture data to each pixel heading to the framebuffer


## Brief Introduction to OpenGL
- [Src - Brief Introduction to OpenGL](https://www.youtube.com/watch?v=IXxc9yNBpuo) 
- OpenGL is...
    - a C API for accessing graphics hardware
    - a low level hardware abstraction
    - Uses a polygonal rendering model (basically triangles)
    - Has a fixed or programmable pipeline
- OpenGL is not...
    - Not a game/graphics engine
    - No scene management
    - Only does rendering!
    - No raytracer, sound, physics, etc.
- OpenGL is good at...
    - Simple API for small projects (although not so great on big projects)
    - Cross platform
    - Sometimes you get vendor extensions before Direct 3D (D3D) gets them
    - Lets you choose between fixed or programmable pipelines (whereas newer libraries enforce a programmable pipeline)
    - Most of the action on OpenGL these days is on Mobile (which is supported by OpenGL ES)
- OpenGL is not great bc...
    - API is ancient, clunky
    - Windows drivers are not very good compared to D3D
    - Tooling is not as good
    - No XBox360, PS3, Wii support
- History:
    - Came out in 1992, from SGI (i.e. the only game in town for graphics devices)
    - OpenGL v3 and v4 introduced 'Core Profile' which was just the stuff that is not deprecated
        - Generally, you don't need to target Core profile explicitly bc most drivers will support both modes (exception is OSX)
- Fixed Function vs Programmable Pipelines
    - aka what's a shader?
    - Fixed Function:
        - Math for 3D rendering capabilities (e.g. lighting model, fog, textures, etc.) are FIXED
            - Features can be turned off / tweaked, but its very limited
        - Rendering process is fixed: every app must render in the same way
    - Programmable
        - Replace parts of the pipeline with user code
        - Started with lighting model (which supported cell shading, which is a cool feature)
        - Modern pipeline lets you replace almost everything with user code, encompassing features from lighting, texture effects, and even geometry modification.
        - There are still fixed function bits
            - Triangle rasterizer is baked into the hardware
            - Perspective correction
            - Texture filtering
            - etc.
    - So a shader seems to be user-code which can be added to the rendering pipeline to fulfil some graphics functionality (lighting, etc.)
- Why use fixed function today?
    - Easier
    - Support for cheaper hardware
- GLSL
    - OpenGL Shader language
    - How you write your shader
    - Shader language features are deprecated pretty rapidly, so be careful when snapping older shader code into a newer version of the API
- NVidia Cg
    - Is a meta-language that will compile down into different shader languages including GLSL, HLSL (?), and an older language called ARB.
- Using OpenGL 1
    - Which you might want to use for simple projects
    - Keep in mind, this is still fixed function
    - Create a context- which is a connection to the hardware
    - Lots of libraries to help you do this- GLUT is probably the best
    - Follows a state machine approach
- Using Modern OpenGL
    - Vertex Buffers
        - Used to use ```glBegin``` / ```glEnd``` before each draw call
        - Also, with a 3d Model, it makes sense to be able to load the geometry and keep it in the GPU's memory
        - Vertex Buffers let you do that!
        - Useful function:
            - ```glGenBuffers```  : create a vertex buffer
            - ```glDeleteBuffer``` : delete a vertex buffer
            - ```glBufferData``` : takes a pointer, uploads the data into the buffer
            - ```glVertexAttribPointer``` : this is where you tell OpenGL what kind of data is in the buffer
            - ```glDrawArrays``` : draw the vertex buffer
    - Shaders
        - Writing shaders is really GLSL coding- there's not much in there that is OpenGL
        - Shaders have 2 parts:
            - **Program** : what the hardware runs
            - **Shader** : function for a single stage (e.g. Vertex Shader, Fragment Shader, etc.)
        - Some shader functions you'll want to know:
            - ```glCreateProgram```
            - ```glCreateShader```
            - ```glCompileShader```
            - ```glAttachShader```
            - ```glLinkProgram```
            - ```glDeleteShader```
            - ```glDeleteProgram```
