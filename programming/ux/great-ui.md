The Science Great UI
===========

- Minimize Cost of Interaction
    - Keystrokes
        - Some keys are harder to use than others.
            - E.g. Spacebar = Easy, curly brackets = hard
    - Mouse travel
    - Gaze Shift
    - Cost of switching from mouse to keyboard and vice versa is high

- Minimize Mental Interaction
    - Time and effort to:
        - Understand new info
        - Consistent Rules
    - Guidance / Friction of going to HELP

- Discoverability

- AntiPatterns
    - Stacked UI's:
        You get a modal, but then you need to access in the background
    - Over-reliance on the ScrollBar
        - Anytime you force the user to remember where in the scrollbar to go to find the data you need.
    - Too many different colors, frivolous use

- Useful book:
    - Visual Explanations: Images and Quantities, Evidence and Narrative
    - Smallest Effective Difference:
        - Why go with something high contrast, when it's not necessary?
    - Information in Parallel vs Serial:
        - Parallel means you give the info all at once and let the user absorb at their own pace.
        - Serial is where the app controls the pace and shows information step-by-step.
        - Parallel is better!
    - Reducing Noise:
        - Repeated words which add no new information
        - Try to avoid showing a lot of text at once though (otherwise, they'll say "i agree")
        - Important text should have higher contrast

- Tools of Graphic Designers
    - Contrast
        - Should fit the information relevance.
        - Example:
            - The lines around the table cell should be super-low contrast and the values should be high-contrast!
    - Size
        - Make it bigger if...
            - Used Frequently
            - Important
        - If you want the user to acknowledge the information once, and then move on (e.g. table headers)...
            - Make it big BUT low-contrast!
    - Color
        - For color-blind users, it's better to differentiate with red and blue instead of red and green.
        - Use HSL instead of RGB
            - This is more useful for creating a good pallete of colors
            - General technique is to keep the Hue at one level and then to adjust the saturation and lightness.
            - Two good color-pallete-selection tools:
                - [kuler.adobe.com](https://color.adobe.com/create/color-wheel/)
                - [material pallete](http://www.materialpalette.com/) (this is part of material design)
                - good tool to create a color pallete                
            - Use saturation like contrast: more important info should have a higher saturation
        - Work with a very limited pallete
    - Motion
    - Shape
    - Opacity
    - Shadow
    - Gradient
    - Proximity
        - Don't force the user to make lots of visual round trips to find out what corresponds with what?

- Clarity: Adjust these to match information relevance...
    - Size
    - Contrast
    - Saturation
    - Opacity
    - Example:
        - make the labels more low-contrast than the actual value
        - make keywords bold


