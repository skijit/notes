B.E.M Naming Convention for CSS
=====================

- **B**lock
- **E**lement
- **M**odifier
- **The Point** Basically a naming convention for CSS that enables resolving classes to elements based on structure of/within the class name rather than the structure/nesting of the selectors (as they argue this is more rigid, and the naming convention is also more expressive).
- [reference/resource](http://getbem.com/naming/)

## Summary
- Block
  - Standalone entity that is meaningful on its own
  - Ex: header, container, menu, checkbox, input
- Element
  - A part of a block that has no standalone meaning and is semantically tied to its block.
  - Ex: list-item, menu-item, header title
- Modifier
  - A flag on a block OR element. Use them to change appearance or behavior.
  - Ex: disabled, highlighted, checked
- Syntax for css classes: 
  - delimeters are either double underscore or double dash
  - single dashes are used in place of spaces in complicated modifiers (e.g. `color-black`)
  - modifiers: 
    - on a block: `.block--modifier` 
    - on an element: `.block__elem--modifier` 
  - elements:
    - `.block__elem`    
  - Ex: `button--state-success` `block__elem`
- don't use nesting with composite css selectors (e.g. `.block .block--elem`)