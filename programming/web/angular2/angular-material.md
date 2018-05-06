Angular Material
============

## Getting Started
- Project preparation
    - Create a dedicated module to import angular material components - just the ones you plan on using
    - This module should also have a component that lets you sample various angular material components
    - You'll want to import this bundled angular material module into your other modules
    - Plan on using a default theme for starters

- Install npm packages for angular material and the component developer kit.
    - `npm install --save @angular/material @angular/cdk`
- Install animations module OR install a no-op version so you don't break stuff
    - `npm install --save @angular/animations`
    - This uses the web animation api which, if you want to support older browsers, requires a polyfill:
    - `npm install --save web-animations-js`
        - also go to the polyfills.ts file in your project and make sure the corresponding line is commented out.
    - If you do use animations, make sure you include it in your module:

    ```(typescript)
    import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

    @NgModule({
    ...
    imports: [BrowserAnimationsModule],
    ...
    })
    export class PizzaPartyAppModule { }
    ```

    - If you choose not to include animations, you need to import angular's `NoopAnimationsModule` instead of `BrowserAnimationsModule` - otherwise the above snipped is the same.
- Import components into your module
    - 2 approaches:
        - direct: import whatever components you want into a specific module
        - bundle: import all the components you plan on using into one module, and import that module as needed in your app
    - **Warning**: Import the angular material modules AFTER angular's `BrowserModule` : remember order matters!
- Adding a theme
    - add a prebuilt theme to your styles.css: `@import "~@angular/material/prebuilt-themes/indigo-pink.css";`
        - or for custom theming, look [below](#Theming)
    - these are the prebuilt themes:
        - deeppurple-amber.css
        - indigo-pink.css
        - pink-bluegrey.css
        - purple-green.css
- Adding gesture support
    - Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures.
    - `npm install --save hammerjs`
    - import it on your app's entry point (e.g. src/main.ts): `import 'hammerjs';`
- Add material icons
    - Add this to your layout `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
    - [Info](https://google.github.io/material-design-icons/) on material icons

    
## Theming
- Links
    - [Angular Material Theming guide](https://material.angular.io/guide/theming)
    - [Material design theming](https://material.google.com/style/color.html#color-color-palette)
    - [Material Design Color tool](https://material.io/color)
    - [Excellent blog post summing all of this up](https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1)
- High-level
    - Theming only involves colors
    - Theming requires using SASS
    - For non-color-related CSS, you can still you SASS if you want

### Theme components
- **3 Palettes**
    - **Primary palette**: colors most widely used across all screens and components.             
    - **Accent palette**: colors used for the floating action button and interactive elements.
    - **Warn palette**: colors used to convey error state.        
    - To get a list of the material design colors, you can go [here](https://material.io/guidelines/style/color.html#color-color-palette)
    - To refer to a color, you'll use two things:
        1. Reference the angular-material `mat-palette()` mixin
            - parameters:
                1. angular material color alias (see below)
                2. (optional) default variant (e.g. 500) (again see the [material design colors link](https://material.io/guidelines/style/color.html#color-color-palette))
                3. (optional) lighter variant (e.g. 100) (again see the [material design colors link](https://material.io/guidelines/style/color.html#color-color-palette))
                4. (optional) darker variant (e.g. 900) (again see the [material design colors link](https://material.io/guidelines/style/color.html#color-color-palette))
        2. Reference the angular-material alias for the color: 
            - *Indigo* -> *mat-indigo*
            - *Pink* -> *mat-pink*
            - etc.
        So a reference will look like this: 

        ```(scss)
        $candy-app-accent:  mat-palette($mat-pink, A200, A100, A400);
        ```

        - Here, we're creating a variable, $candy-app-accent, and assigning it to the material design Pink color.
            
- **SASS file**
    - This will be a single file which you'll add a reference to in the `"styles"` property of you angular-cli.json.  
        - e.g. my-global-custom-them.scss
    - Will have some material framework boilerplate in it
    - Will define your primary, accent, and warn palette variables and make the call to `mat-palette()`
    - Will call either `mat-light-theme()` or `mat-dark-theme()` to create the material theme, and then register it with ``
        - `mat-light-theme()` uses the info on the other palettes to create an appropriate palette for foreground (w dark colors) and background (w light colors) 
        - `mat-dark-theme()` does the same but with a light foreground and a dark background

    ```(scss)
    @import '~@angular/material/theming';
    // Plus imports for other components in your app.

    // Include the common styles for Angular Material. We include this here so that you only
    // have to load a single css file for Angular Material in your app.
    // Be sure that you only ever include this mixin once!
    @include mat-core();

    // Define the palettes for your theme using the Material Design palettes available in palette.scss
    // (imported above). For each palette, you can optionally specify a default, lighter, and darker
    // hue. Available color palettes: https://www.google.com/design/spec/style/color.html
    $candy-app-primary: mat-palette($mat-indigo);
    $candy-app-accent:  mat-palette($mat-pink, A200, A100, A400);

    // The warn palette is optional (defaults to red).
    $candy-app-warn:    mat-palette($mat-red);

    // Create the theme object (a Sass map containing all of the palettes).
    $candy-app-theme: mat-light-theme($candy-app-primary, $candy-app-accent, $candy-app-warn);

    // Include theme styles for core and each component used in your app.
    // Alternatively, you can import and @include the theme mixins for each component
    // that you are using.
    @include angular-material-theme($candy-app-theme);
    ```

### Multiple Themes
- You can define multiple themes, but using a css *namespace*, as below

```(scss)
@import '~@angular/material/theming';
// Plus imports for other components in your app.

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// **Be sure that you only ever include this mixin once!**
@include mat-core();

// Define the default theme (same as the example above).
$candy-app-primary: mat-palette($mat-indigo);
$candy-app-accent:  mat-palette($mat-pink, A200, A100, A400);
$candy-app-theme:   mat-light-theme($candy-app-primary, $candy-app-accent);

// Include the default theme styles.
@include angular-material-theme($candy-app-theme);


// Define an alternate dark theme.
$dark-primary: mat-palette($mat-blue-grey);
$dark-accent:  mat-palette($mat-amber, A200, A100, A400);
$dark-warn:    mat-palette($mat-deep-orange);
$dark-theme:   mat-dark-theme($dark-primary, $dark-accent, $dark-warn);

// Include the alternative theme styles inside of a block with a CSS class. You can make this
// CSS class whatever you want. In this example, any component inside of an element with
// `.unicorn-dark-theme` will be affected by this alternate dark theme instead of the default theme.
.unicorn-dark-theme {
  @include angular-material-theme($dark-theme);
}
```

- note that it may be difficult to embed certain components (e.g. the overlay containers which are used by menu, select, dialog components) in a particular class (e.g. .unicorn-dark-them) bc they are global.  The followin code can be used in that case.

```(typescript)
import {OverlayContainer} from '@angular/cdk/overlay';

@NgModule({
  // ...
})
export class UnicornCandyAppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}
```

- To dynamically switch themes, you'd probably want to make use of the `[class]` binding in angular.  Possibly on the `<body>` tag.

- Theming Custom Components
    - This is covered really well [here](https://medium.com/@tomastrajan/the-complete-guide-to-angular-material-themes-4d165a9d24d1)
