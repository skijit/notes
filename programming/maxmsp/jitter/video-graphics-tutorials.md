Video and Graphics Tutorial
===================

## Tutorial 1 - Displaying a Video
- `jit.world` 
    - will create a separate display window
    - outputs video when connected to a toggle - doesn't seem to require a metro
        - there are lots of attributes, like: FPS which handles autorendering
    - can take a `playlist` or a `jit.movie` as input
    - first argument is the *world* (e.g. `jit.world myworld`) or *context* which is a useful handle for later operations
        - be careful not to reuse/change names of the contexts (they have to be global and if you change it, you might have to re-opn your patch)
- `jit.movie` available for lower level playback
    - it can be attached to a `jit.pwindow` or a `jit.world`