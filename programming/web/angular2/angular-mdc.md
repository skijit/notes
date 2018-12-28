Angular MDC
==========================

- **MDC**: Material Design Components - a variety of platform-specific UI's implementing the Material Design Spec
- **MDC Web**: The Web-specific MDC Library (also the successor to the Material Design Lite library)  
  - Vanilla JS
  - Built with various integration points for wrapping with higher-level JS libraries (e.g. Angular, React, etc.)
- **Angular MDC**: Angular wrappers for the MDC Library
  - Completely different from Angular Material, though they both aim at realizing Material Design Components through Angular
- See my [Material Design Color System Notes](/programming/ux/material-design#color-system) for useful info on theming
- MDC-Web Links
  - https://material.io/develop/web/components/animation/
  - https://material-components.github.io/material-components-web-catalog/#/  
- Angular-MDC Links
  - https://github.com/trimox/angular-mdc-web
  - https://trimox.github.io/angular-mdc-web/#/tabs-demo


## MDC vs Angular MDC
- Very good compatibility...
  - [Theming methodology](#customizing-in-mdc-web) between angular-mdc and mdc-web is the **SAME**
  - If there's a gap between MDC and Angular MDC, you can easily create a simple angular wrapper for the MDC component

## Angular MDC Setup
- follow these instructions: https://trimox.github.io/angular-mdc-web/#/getting-started
- make sure to also import the MdcButtonModule to the app module or it won't rended
- i had to add these to the main template:
  - `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
  - `<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">`
- add a semicolon after the @import statement in the styles.scss file

## Wrapping MDC Web Components in Custom Angular Components Directly
- In case there are gaps between Angular-MDC and MDC-Web, it's good to know you can fall back to the MDC-Web usage
- The integration between the custom component and angular won't be as slick as with Angular-MDC because they use the adapters
- Basically, there are 2 ways to wrap MDC components in higher-level web frameworks.  [Ref](https://material.io/develop/web/docs/framework-integration/)
- Simple Wrapping Procedure
  - SCSS
    - Best to use the mdc scss that is embedded and automatically exposed through angular-mdc
      - I've found re-importing them at the top level problematic due to some type of webpack linkage issue.
      - call structure to embedded versions:
        - angular app 
          - styles.scss -> @angular-mdc/theme/material.scss (`@import "~@angular-mdc/theme/material";`)
          - @angular-mdc/theme/material.scss -> 
            - material-components-web.scss (`@import "material-components-web";`)
              - includes all the material components for web
            - lots of package-specific control extensions:
              - mdc-button.scss (`@import "extend/mdc-button";`)
              - many more
  - JS
    - follow the angular mdc documentation
    - install the appropriate npm module for the components you want to use
      - e.g. `npm install --save @material/tab-bar`
    - update your angular component template with approprirate html
    - instantiate the MDC component in the angular component's On-Init

## Customizing in MDC Web
- See my [Material Design Color System Notes](/programming/ux/material-design#color-system) for useful info on theming
- Primarily accomplished with
  - CSS Helper classes
  - Sass Variables
  - Sass Mixins
  - CSS Custom Properties

### CSS Helper Classes
- To ovveride the colors in a section, apply these css classes to the elements:
  - `mdc-theme--primary` Sets the text color to the theme primary color.
  - `mdc-theme--primary-bg`	Sets the background color to the theme primary color.
  - `mdc-theme--on-primary`	Sets the text color to the color configured for text on the primary color.
  - `mdc-theme--secondary`	Sets the text color to the theme secondary color.
  - `mdc-theme--secondary-bg`	Sets the background color to the theme secondary color.
  - `mdc-theme--on-secondary`	Sets the text color to the color configured for text on the secondary color.
  - `mdc-theme--surface`	Sets the background color to the surface background color.
  - `mdc-theme--on-surface`	Sets the text color to the color configured for text on the surface color.
  - `mdc-theme--background`	Sets the background color to the theme background color.
  - And these classes figure out whether white or black should be used on a color background:
    - `mdc-theme--on-primary`	Set text to suitable color for text on top of a theme primary color background.
    - `mdc-theme--on-secondary`	Set text to suitable color for text on top of a theme secondary color background.
    - `mdc-theme--on-surface`	Set text to suitable color for text on top of a theme surface color background.

### Sass Variables    
- Here is a list of the Sass variables you can override to set your theme:
  - $mdc-theme-primary
  - $mdc-theme-secondary
  - $mdc-theme-surface
  - $mdc-theme-background
  - $mdc-theme-error
  - these are set programmatically, so prolly not worth changing:
    - $mdc-theme-on-primary
    - $mdc-theme-on-secondary
    - $mdc-theme-on-surface
    - $mdc-theme-on-error
  - FYI, they're set here: `\@angular-mdc\theme\scss\theme\_variables.scss` (obv this is the embedded angular mdc version)

### Sass Mixins      
- Mixins let us alter appearance or behavior of components that might map to more than a single property.
- Each MDC Web Component has a list of Mixins which you may call in a custom class and then assign to the component to achieve a higher level override.
- Example:
  - In the [MDCTabIndicator docs](https://github.com/material-components/material-components-web/tree/master/packages/mdc-tab-indicator#sass-mixins), the following Mixin is listed:
    - `mdc-tab-indicator-underline-color($color)`:	Customizes the color of the underline.
    - So I'll create this custom class:

    ```(scss)
    @import "~@angular-mdc/theme/scss/tab-indicator/_mixins";
    @import "~@angular-mdc/theme/scss/theme/_color-palette";

    /* nested under app-root for increased specificity - placed in component scss */
    app-root {
      mdc-tab-indicator.mdc-tab-indicator { 
        @include mdc-tab-indicator-underline-color($material-color-light-green-700);
      }
    }
    ```

### CSS Custom Properties
- Sass lets you define one global theme, but CSS Custom Properties allow you to have multiple themes (local) or even switch between themes (dynamic)
- Each Sass property above will have a corresponding CSS Custom Property and that CSS Custom Property is used in the various MDC css classes:
  - `$mdc-theme-primary` -> `--mdc-theme-primary` -> `var(--mdc-theme-primary)` is used in all the various css classes
  - Since CSS Custom Properties are cascading, you can make a local theme like so:
  
  ```(css)
  .someCustomClass {
    --mdc-theme-primary: var(somecolor);
    --mdc-theme-secondary: var(somecolor);
    --mdc-theme-surface: var(somecolor);
    --mdc-theme-background: var(somecolor);
    --mdc-theme-error: var(somecolor);
  }
  ```

  - **Gotcha**, Sass can programmatically determine the *On-* colors, but css cannot. So if you make customizations like above, you should also consider updating these custom css properties manually:
    - There are a lot of these: *On-* colors, and text on (background, dark, and light backgrounds):
    - `--mdc-theme-on-primary`
    - `--mdc-theme-on-secondary`
    - `--mdc-theme-on-surface`
    - `--mdc-theme-text-primary-on-<background	| light | dark>`
    - `--mdc-theme-text-secondary-on-<background	| light | dark>`
    - `--mdc-theme-text-hint-on-<background	| light | dark>`
    - `--mdc-theme-text-disabled-on-<background	| light | dark>`
    - `--mdc-theme-text-icon-on-<background	| light | dark>`
    - **Important**: typically though, you'll use this last group for getting values to assign to the top 3.
      - e.g. `--mdc-theme-on-primary: var(--mdc-theme-text-primary-on-light);`
  - You can use this strategy as the basis for applying different themes at runtime.
    - Just define the various themes (via CSS Custom Properties) in scope of a css class, and then apply that a root element  

### Other Methods
- To go off-theme but stay in the MD palette-universe, there are Sass variables for every color here:
  - `\@angular-mdc\theme\scss\theme\_color-palette.scss` (obv this is the embedded angular mdc version)
  - Ex: $material-color-teal-50: #e0f2f1;
      
- Usageof Dark and Light Variants
  - This is a key tenet of the MD color system but MDC web doesn't seem to support it very well
  - There are probably a few ways to solve this, but the following methods come to mind:
    1. Sass -> CSS classes
      - define Sass variables for Primary/Secondary Light/Dark variants based on the MD color-palette SAS variables mentioned above
      - define CSS classes to assign/override various colors
      - **pro**: easy
      - **con**: not compatible with local/dynamic theming provided by custom css classes
    2. Sass -> New CSS Properties -> Overwrite standard CSS properties in local classes
      - if you look in the code at `@angular-mdc\theme\scss\theme\mdc-theme.scss`, you can see how they add their custom Sass variables to a map (kv pairs) and dynamically build out a list of custom css properties. Just steal that code and do the same thing.
      - then you can write CSS classes which overwrite (limited scope) the appropriate standard custom property (--mdc-theme-primary) with the new guy (e.g. `--mdc-theme-primary: var(--my-custom-property))
      - **pro**: runtime, allows you to upfront define your **entire palette** (including darks and light variants)
      - **con**: more work
    3. There are probably other ways where you derive the dark and light variants from a Sass (mix) or Css function...

## Angular-MDC and View Encapsulation
- **Best Practice**: Set ViewEncapsulation to None on your Angular components which wrap Angular MDC components
- Problem Description
  - The view encapsulation strategy of emulated (default) tries to limit the scope of the styles it writes to the document head by including angular-specific properties into (eg `_ngcontent-c0`) the selectors, but those properties are not present in the full structure of the rendered html.
    - rendered html
    
    ```(html)
    <mdc-tab _ngcontent-c0="" class="mdc-tab" icon="person" label="Person" role="tab" ng-reflect-label="Person" ng-reflect-icon="person">
      <div class="mdc-tab__content">
        <!--bindings={"ng-reflect-ng-if": "person"}-->
        <mdc-icon class="mdc-tab__icon ng-mdc-icon material-icons" aria-hidden="true" role="img">person</mdc-icon>
        <!--bindings={"ng-reflect-ng-if": "Person"}-->
        <span class="mdc-tab__text-label">Person</span>
        <!--bindings={"ng-reflect-ng-if": "false"}-->
      </div>
      ...
    </mdc-tab>
    ```

    - one of the selectors in the document head: `app-root[_ngcontent-c0]   .mdc-tab[_ngcontent-c0]   .mdc-tab__text-label[_ngcontent-c0]`
    - **Cause**: _ngcontent-c0 is not applied to .mdc-tab__text-label[_ngcontent-c0].  Probably becuase the anguular-mdc component which renders this part has a view encapsulation strategy of none.
- **Solution**: set view encapsulation strategy to none on the parent components too. Then be sure that the selector rules are more specific than from angular.  Then they will take precedence, even though they're applied earlier.
