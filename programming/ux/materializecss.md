Materialize CSS
=============

- ```container``` class sets content to 70% (or 85% on tablet and mobile devices) of the window width
- Grid System
    - Based on 12 columns
    ```(html)
    <div class="row">
      <div class="col s1">1</div>
      <div class="col s1">2</div>
      <div class="col s1">3</div>
      <div class="col s1">4</div>
      <div class="col s1">5</div>
      <div class="col s1">6</div>
      <div class="col s1">7</div>
      <div class="col s1">8</div>
      <div class="col s1">9</div>
      <div class="col s1">10</div>
      <div class="col s1">11</div>
      <div class="col s1">12</div>
    </div>```
    - ```s1``` = 1 column on small screens
    - col divs must live inside a row div, but you don't need to have 1 row div per each 12 cols (i.e. you can have multiple rows in the same row div)
    - Offset: you can offset your rows with ```offset-s6``` (= offset by 6 cols)
    - You can push and pull columns similarly to offset (ie their order in html will not match their order in the rendered grid)
    - You can insert the grid inside a container
- Layouts
    - ```section``` class adds some top and bottom padding
    - ```divider``` class adds a 1 pixel line to help break up your content
    - Accomodating different Form Factors
    - There are 3 prefixes for column width specs which correspond to different form-factor
        - ```s```: Mobile,  <= 600px
        - ```m```: Tablets, <= 992px
        - ```l```: Desktop > 992px
        - The classes propagate upwards, unless you override them:
            - s12 = ```col s12 m12 l12```
        - Example override:
        ```(html)
        <div class="row">
            <div class="grid-example col s12"><span class="flow-text">I am always full-width (col s12)</span></div>
            <div class="grid-example col s12 m6"><span class="flow-text">I am full-width on mobile (col s12 m6)</span></div>
        </div>```
    - To conditionally show based on form factor, see helpers below
- Helpers
    - Vertically center by adding ```valign-wrapper``` and then on the inside ```valign```
    - Horizontal align: ```left-align```, ```right-align```, ```center-align```
    - Quick floats: ```left``` and ```right```
    - Conditionally Show Based on form factor:
        - ```hide```: Hidden for all Devices
        - ```hide-on-small-only```:	Hidden for Mobile Only
        - ```hide-on-med-only```: Hidden for Tablet Only
        - ```hide-on-med-and-down```: Hidden for Tablet and Below
        - ```hide-on-med-and-up```:	Hidden for Tablet and Above
        - ```hide-on-large-only```:	Hidden for Desktop Only
    - Browser Defaults
        - Many of the browser defaults (e.g. UL, SELECT) are overriden.  So you can revert to them using the ```browser-default```.
    - ```responsive-img```: sets max-width to 100% and height to auto.
    - Drop Shadows: Add ```z-depth-1```, ```z-depth-2```, up to 5
    - blockquote tags have default styling
    - ```flow-text``` tag will responsively size your font based on device size
- Colors
    - You choose a color from the material design base colors.  
    - Then you get automatically, a ```lighten``` or ```darken``` class
    - You can easily use this to set background colors or text colors with these classes.
     