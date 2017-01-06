A Collection Of CSS Notes
==============

- Pseudo-Elements vs Pseudo-Classes
    - Pseudo-classes help selecting an existing element whereas pseudo-elements allow you to use CSS(3) to insert elements into the document
        - Pseudo-elements typically have the a `content` property, as that tells them what to insert
    - Common Pseudoclasses
        - :link
        - :visited
        - :hover
        - :active
        - :focus
        - :enabled
        - :disabled
        - :checked
        - :first-child
        - :nth-child(n)
        - :nth-last-child(n)
        - :nth-of-type(n)
        - :nth-last-of-type(n)
        - :last-child
        - :first-of-type
        - :last-of-type
        - :only-child
        - :only-of-type
        - :root
        - :empty
        - :not(x)
        - :target
        - :lang(language)
    - Common Pseudoelements
        - ::before
        - ::after
        - ::first-letter
        - ::first-line
        - **Note**: the second colon was introduced in CSS3 so that you can easily distinguish between pseudoclasses (:) and pseudo-elements (::)
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
- Box Shadows
```(css)
div {
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
    //horizontal shadow: 1px
    //vertical shadow: 2px
    //blur amt: 4px
    //color of shadow: rgba(0, 0, 0, .5)
}```
    - [this(http://www.w3schools.com/css/css3_shadows.asp)] has some decent examples to get started