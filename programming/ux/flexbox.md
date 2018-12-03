FlexBox
=========

- [this](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is a great guide to flexbox

- Flexbox layout module is a spec approved by the W3C intended to improve the flexibility and control over layout and spacing of items.
  - The existing positioning methods posed a lot of challenges that this fixes.
- Support (as of Dec 2018):
  - most browsers support Flexbox, however IE11's support is buggy.
  - partial support on IE 11 (due to presence of many bugs) (see [caniuse](https://caniuse.com/#feat=flexbox))
  - [here's](https://github.com/philipwalton/flexbugs) a list of known isssues and (cross-browser) workarounds which could be helpful 
- Summary of how it works:
  1. You identify a container as a flex container (css)
  2. You put html block elements inside the container
  3. You assign css properties to both items and the container elements to guide the flow, spacing, layout, etc. 

## High Level Characteristics
- Focuses on organization along a single reference axis

## Container Properties
- `display: flex`
  - identifies it as a flexbox container
- `flex-direction: row | row-reverse | column | column-reverse;`
  - establishes the main axis (vertical or horizontal) and direction (r-l, l-r, up-down, down-up) of the layout 
- `flex-wrap: nowrap | wrap | wrap-reverse;`
  - by default, there's no wrapping to the next line bc flex tries to layout everything on one line.
- `flex-flow: <flex-direction> <flex-wrap>`
  - shorthand combination of `flex-direction` and `flex-wrap`
  - default is `row nowrap`
- `justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;`
  - organizes the spacing of the items
- `align-items: flex-start | flex-end | center | baseline | stretch;`
  - this is how they're aligned on the cross-axis.  
  - See the picture in the link at the top - this will explain it clearly, visually
- `align-content: flex-start | flex-end | center | space-between | space-around | stretch;`
  - handles spacing along the cross-axis when there is wrapping
  - See the picture in the link at the top - this will explain it clearly, visually

## Item Properties 
- `order: <integer>; /* default is 0 */`
  - order in which the items are presented.
  - by default, this is the order in which they appear in the document.
- `flex-grow: <number>; /* default 0 */`
  - this the proportion (multiplier) which the specifies how big the content can grow. 
  - default is 1.
  - a value of 2 will be able to be twice as large as an item whose value is 1.
- `flex-shrink: <number>; /* default 1 */`
  - inverse of `flex-grow`
- `flex-basis`
  - compicated, see docs
  - see [this](https://www.w3.org/TR/css-flexbox-1/images/rel-vs-abs-flex.svg) image
  - seems to involve growth and how content inside the item is handled?
- `flex: none | <flex-grow> <flex-shrink> | <flex-basis> `
  - shorthand for the above properties
- `align-self`
  - also complicated, see docs

## Questions
  - Question: can you have nested flexbox containers?
    - Answer: Yes!
  - Question: do items need to be block?
    - Answer: Yes (I think)