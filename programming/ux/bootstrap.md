BootStrap-Related Utilities and Notes
===========

## Theming
- [BootPress](https://www.bootpress.org/themeroller/) is an interactive theme-roller for bootstrap
    - Alternately, you could do this locally by customizing / recompiling the less file directly... but it may take some more time.
- [BootSwatch](http://bootswatch.com/) has a bunch of pre-rolled themes

## Refresher
- Indirect customization
    - Include precompiled bootstrap / components
    - Redefine framework styles/classes, include app-specific stuff 
- Direct Customization
- 2 direct customization methods:
    - Change core class definitions directy
        - Requires source / compile  
    - Customize (based on less variables)
        - Requires source / compile
        - Use online config roller
            - generates a config file, which you can use to download a custom build of bootstrap
- Indirect vs Direct Customization
    - Indirect:
        - PRO: Can use whatever CSS Precompiler you want on the app-specific parts
        - PRO: Simpler to program
        - PRO: Less integration and therefore more portability
        - PRO: Easier to do local patch fixes
    - Direct:
        - PRO: Faster application of styles to pages
- Packaging options
    - Source / Compile
        - grunt is the default
        - there are probably others
    - Config roller
        - generates a config file, which you can use to download a custom build of bootstrap
    - Default download
        
## Integration with Angular 2
- https://github.com/valor-software/ng2-bootstrap
    - Replaces the active javascript components with angular-2 wrappers
    - Is that a problem that needs solving though?

## CSS
- <small> can be used nested in a heading.   
    - Alternately, you can use .small
- contextual classes:
    - active
    - success
    - info
    - warning
    - danger
- There are show / hide classes based on media query which apply to different screen sizes (presumably width)
    - xs: < 768px
    - sm: >= 768px
    - med >= 992px
    - lg >= 1200px 
    - e.g. `hidden-lg`
- There are also classes for just using print
    - .visible-print-block
    - .visible-print-inline
    - .visible-print-inline-block
    - .hidden-print
- You can use a bunch of gradient mixins, inside the #gradient namespace
```(less)
#gradient > .vertical(#333; #000);
#gradient > .horizontal(#333; #000);
#gradient > .radial(#333; #000);
#gradient > .directional(#333; #000; 45deg);
#gradient > .striped(#333; 45deg);
```
- You can use a mixin to set the resizablility of a textarea
```(less)
.resizable(@direction: both) {
  // Options: horizontal, vertical, both
  resize: @direction;
  // Safari fix
  overflow: auto;
}
```
- You can toggle a progress bar with .active to make it animated

