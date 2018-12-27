Material Design
============

## Summary
- Design Guidelines for cross-platform UI's
- 3 Basic Concepts
    1. UI should be inspired by physical material, and adhere to it's rules and characteristics to create 
    2. Follow print-based design in terms of use of typography, space, color, etc, bc aside from being aesthetically pleasing, they suggest meaning
    3. User actions should initiate motion as this also coneys meaning
- Graphical Elements should appear 3-d and have drop shadows.
    - When you stack them, you convey height via the shadow
- Different shadows created by key point-sources of light vs ambient light
- Materials can change size and shape, but do not bend or fold it
- When you interact with material, it should appear to come forward (via shadows)
- motion used should resemble physical characteristcs of motion
- Color Pallete and Intentions:
    - Primary Color: Most widely used
    - Secondary Color: Indicate action or information.  Contrasts with Primary.
    - Accent Color: Use for floating action buttons and interactive elements
    - See [this](http://www.materialpalette.com/yellow/indigo) pallete builder
- Use Text Opacity to convey importance  (eg 87%, 54%, 38%, ...)
    - Fonts should be black or white, and you vary the opacity
    - Don't use grey fonts: they don't show up well in certain backgrounds.
- Snackbars instead of toast
- [MD icons](https://design.google.com/icons/)
- Examples of MD-Conforming UI Component are [here](https://material.google.com/components/bottom-navigation.html)

## Material Design Frameworks
- [MaterializeCSS](http://materializecss.com/)
    - [Wiki Page](https://github.com/Dogfalo/materialize/wiki)

## Color System 

### Material Colors System and Application
- [ref](https://material.io/design/color/the-color-system.html#)
- **Primary Color**
  - Displayed most often - the *root* color
- **Light and Dark Primary Color Variants**
  - Creates contrast between UI elements
  - Example: Use a primary color variant to differentiate the app top bar (primary) with the system bar (primary variant)
- **Secondary Color**
  - Used more sparingly - provides *accent*
  - Examples:
    - Floating Action button
    - Selection controls
    - hightlighting text
    - Progress bars
    - Links and Headlines
- **Light and Dark Secondary Color Variants**
- **Surface**
  - These represent the background (*surfaces*) of various components, such as cards, sheets, and menus
- **Background**
  - This is the color that shows up behind scrollable content
- **Error**
- On Colors
  - Each prior color has a corresponding *On-color* applied to text/iconography that appears in/on it.
  - **On Primary**
  - **On Secondary**
  - **On Surface**
  - **On Background**
  - **On Error**
- [Example Theme](https://storage.googleapis.com/spec-host-backup/mio-design%2Fassets%2F1hg4iTKzTMMgtJRx7bhaE2kSYR5BRYz1g%2Fcolor-colorsystem-schemecreation-theme.png)
- [Examples and UX/Color Best Practices](https://material.io/design/color/applying-color-to-ui.html)

### Palette Selection Tools
- [Material Theme Selection Tool](https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=6002ee)
- [Material Design Palette](https://www.materialpalette.com/)
