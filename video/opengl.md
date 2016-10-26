Intro to OpenGL
====================
- [source video from siggraph](https://www.youtube.com/watch?v=6-9XFm7XAT8)

- TODO: Review Pipeline after the specific examples
- Since each OS has a different windowing system, it uses a platform-independent library called `freeglut`
- Library called GLEW (openGL Extension Wrangler) will manage only the extensions that are available to different platforms

- Fundamental geometric objects are the **vertices**
- A vertex is a location in space
- A vertex has:
    - positional coordinates
        - 4 'homogenous coordinates' dimensions
        - X, Y, Z, W
        - W : 
            - if a point, the W = 1
            - if a vector, the W = 0
            - this makes the 
        - If you specify only 2 coordinates (a 2D object), it will make Z = 0, W = 1        
    - color
    - texture coordinates
    - lighting
    - any other data you want to store
- Vertex -> VBO -> VBA
    - Vertex data is stored in vertex buffer objects (VBO's)
    - VBO's are stored in vertex array objects (VAO's)
    - A big point of these container structures is that you can get them all to the GPU, and then swap them out without having to recopy (as this is an expensive operation)
- OpenGL Geometric Primitives
    - ![opengl primitives](/resources/images/programming/opengl_primitives.png)
    - These are the things OpenGL knows how to render your vertices as any of the following...
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
- Rendering a cube Example
    - Build each cube face from individual triangles
    ```(c++)
    const int NumVertices = 36; // 6 faces * 2 triangles per face * 3 vertices per triangle```
    - to simplify geometric objects in C++...
    ```(c++)
    typedef vec4 point4;
    typedef vec4 color4;```
        - this will also give greater affinities to GLSL, the C-like shading language
    - The cube has 2 attributes per vertex:
        - Position
        - Color
    - Create 2 arrays to hold the VBO data
    ```(c++)
    point4 vPositions[NumVertices];
    color4 vColors[NumVertices];
    
    //initialize
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
    
    int Index = 0; //index for VBO array
    
    //modelling convenience function: 
    //since each cube as 6 faces, why not just define each face of the cube (1 for each line)
    //ie each call    
    void quad(int a, int b, int c, int d) 
    {
        vColors[Index] = colors[a]; vPositions[Index] = positions[a]; Index++;
        vColors[Index] = colors[b]; vPositions[Index] = positions[b]; Index++;
        vColors[Index] = colors[a]; vPositions[Index] = positions[c]; Index++;
        vColors[Index] = colors[a]; vPositions[Index] = positions[a]; Index++;
        vColors[Index] = colors[c]; vPositions[Index] = positions[c]; Index++;
        vColors[Index] = colors[d]; vPositions[Index] = positions[d]; Index++;
        
        // sim. 4 more lines
    }
    
    void colorcube()
    {
        quad(1,0,3,2);
        quad(2,3,7,6);
        quad(3,0,4,7);
        quad(6,5,1,2);
        quad(4,5,6,7);
        quad(5,4,0,1);
    }
    
    //by default, we'll just connect these as triangles, but for a more complex
    //surface you'll want to use a triangle_strip or triange_fan
     
    ```
    
    1206
    modelling
        also use for simulation
        3d scanning hsppens
        
         
51:27