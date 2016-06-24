A Collection Of CSS Notes
==============

- Difference between psuedo-class ```:first-of-type``` vs ```:first-child```
    - ```:first-of-type``` is more specific
    - You've also got the ```:nth-child(1)``` pseudo-class which can be used
    - These can also be used with the ```:not()``` psuedo-class
        - e.g. ```:not(:nth-child(1))```
- Relative Unit Types:
    - **em** : Relative to the font-size of the element (2em means 2 times the size of the current font)
        - Warning: Can cause problems when you're using em to set font-size in nested structures.  See the [example] (https://mindtheshift.wordpress.com/2015/04/02/r-i-p-rem-viva-css-reference-pixel/) here. 
    - **rem** : Relative to font-size of the root (<html>) element         
    - **%** :    
    - **vw** :
    - **vh** : Relative to 1% of the height of the viewport
- Absolute Units (generally should be avoided)
    - cm
    - mm
    - in
    - px (1px = 1/96th of 1 in)
    - pt: points (1pt = 1/72 of 1in)
    - pc: picas (1pc = 12 pt)