CG Basics
===================
- Notes primarily from plurasight courses [cg101](https://app.pluralsight.com/library/search?q=cg101)


## Textures - General
- Sometimes it is wasteful to model with exhaustive polygons.
    - Ex: A bookshelf: you probably would not want to model each book with a polygon
    - An easier approach would be to model it as a single polygon and then apply a texture map of a row of books.
- Texture mapping is the process of taking a 2D image and mapping it onto a polygon in the scene.
- Instead of filling a polygon with a color, we fill the pixels of the polygon with the pixels of the texture (aka texels).
- Benefits:
    - faster
    - adds detail
    - adds 'roughness'
- Some texture maps can have transparent sections (based on a predefined color or the alpha channel)
- A technique called 'draping' lets you stretch a single texture map over multiple polygons.    
    - This is common with modelling terrains- and so it's called 'terrain mapping'
    - One of the key decisions in terrain mapping is figuring out what points on the texture will map to the which polygons/vertices
- Bump mapping is another technique that tries to map a texture onto a 3D surface, but give it better 3D detail by informing the lighting.

## Texture Process
- [From Textures class on Pluralsight CG101](https://app.pluralsight.com/library/courses/cg101-texturing-713)
1. UV mapping: 
    - This is where you unfold your 3d model (and each polygon/tile) into a flat representation, then you map a texture onto each tile segment.
    - Then the texture gets wrapped back onto the 3d model
    - Mind where you place the seams
2. Normals: 
    - Normal is an invisible vector line which points out perpandicularly from the polygon face
    - A point of these surface normals is so that the 3D program knows which is the front of your image (because it won't need to render the interior!)
    - Normals also give important lighting, camera-realted cues
3. Specularity:
    - Defines how a surface reflects light that is cast on it
    - High specularity will reflect the light - a gloss
    - Specularity gives cues about the different surface material (some are shiner than others)
4. Transparency Maps:
    - Grayscale images which use black and white values to signify transparency or opacity on an object's material.
    - Often used on intricate shapes like a feather or an insects wing, which would be time consuming to model by hand.
        - Lets you use a much simpler geometry
5. Bump Maps:
    - Helps add roughness and more detail (e.g. an orange's textured skin rather than it being flat w/ lighting)
    - Gives the illusion of depth or relief without increasing render time
    - The bump map of a texture (2d image) is grayscale data that alters the surface normals of the model
        - Dark areas are pushed in, which creates a shadow effect
        - lighter areas get pushed out
    - The problem is that it doesn't change the actual model's shape- for that use, Displacement mapping
6. Normal Maps:
    - Similar to bump maps in that they affect the normals, rather than change the polygon count in your model
    - Uses RGB channels to define the normal vector's X,Y,Z values respectively
    - Used widely in video games where simple models can appear high-resolution
7. Displacement Maps:
    - How much detail can you actually add to a model without slowing down the render time?
    - A lot of fine detail can be gained without modelling, via Displacement maps
    - Displacement Map is a 2d grayscale image that tells how to displace/push the actual geometry
    - Means less in-memory model, and render-time has to be a little more involved to push out the geopmetries 
8. Light Baking:
    - typical 3d environment workflow:
        - build model
        - Add material with specific surface attributes
        - add painted textures
        - add 3d lights to illuminate the geometry appropriately
    - light baking is taking lighting information and incorporating it into existing textures, and removing the light from the scene
        - this will be more efficient that have to re-render constantly
        - works for lights that don't change so much as the camera changes
9. Polypainting:
    - An alternative to UV mapping or other texture painting
    - Basically, you just paint over the polygons of your model with a brush
    - The colors are applied directly to the texture map
    - Resolution of the texture is dependent on the resolution of the model

## General 3d Terminology
- To create an animated sequence, assets must move through a pipeline
- Simple Pipeline Example
    - PreProduction: artwork to illustrate the artistic concept, and story boards
    - Modelling and Textures
    - Rigging: Allows for the control of the models
    - Animation
    - Layout
    - Compositing
    - Lighting and Rendering
- Virtual Sets: Digital sets for chromakeying scenarios
- Set Dressing: Adding props to a modelled (virutal) set.
    - Like furniture, etc.
- Thumbnail sketching: sketches of ideas (digital or analog)
- Storyboards: sequence of sketches that shows how things develop
- Animatics: Movie showing storyboards
- Modelling: Creating 3D assets.  
    - 3 different geometeries when creating a model
        1. Nurbs: good for smooth surfaces, but hard to use
        2. Polygon: most common, easy to use, can take a lot of work, can lead to a high polygon count
        3. Sub-Division surfaces: combines features of nurbs and polygon models- you create a polygon cage and then calculate a smooth surface on top of it
    - Will eventually recieve coloring, texturing, and possibly being rigged
- Channel Box: gives you the quickest to use menu changing important menu features (e.g. rotate X, translate y, etc.)
    - you get access to keyable attributes
- Dynamics: When you want to animate things to make interactions seem realistic.  Think physics engines.
    - ex: particle simulations, rigid/soft body simulations, cloth simulations
    - these will save you a lot of time
- Display Layers: common in 2D image application software, but you can also use it in developing 3D models too
    - In 3D context, the stacking order is not so important, it's benefit is more for grouping / organization of scenes/models
- Rendering: convert 3d scenes into 2d images.  Involves first applying lighting and shading first.
    
