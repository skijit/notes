Misc Graphics Observations
====================

- OpenGL vs DirectX
    - OpenGL is platform independent
    - DirectX is windows only
    - Both support (/are designed around) hardware accelleration
- TouchDesigner uses OpenGL not DirectX, even though it is windows only
- HoloLens uses DirectX (which has a holographic API) and Unity
- Unity vs OpenGL
    - Unity is a game engine and therefore is higher-level and handles various game-management/interaction tasks
    - OpenGL concerns itself with rendering - no interaction or windowing (which is OS-specific)
- WebGL is an Web Version of OpenGL
    - Still offers hardware accelleration
    - From just a pure rendering point of view, it is probably superior to Canvas and SVG (the other graphics API's for browsers)
        - SVG is the only library where you can associate handlers with the object
        - WebGL is going to be more performant (running on GPU not CPU), complete (shaders, etc), and complicated API than Canvas
    - three.js is a javascript library wrapper around OpenGL
- Blender is an open-source, cross-platform tool to create 3D models