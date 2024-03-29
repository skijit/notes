Color Spaces in Computer Graphics
=================
- [src](https://en.wikipedia.org/wiki/Comparison_of_color_models_in_computer_graphics)

## Additive vs Subtractive

- Color is a blend of visible lights
- Like any other wave, it can be deconstructed into the combination of other waves
- Primary Colors are just references to the base waves that you use
    - But different people use different primary colors...        
- Computer graphics reflect light back directly, so you can mix those primary colors together directly
    - Referred to as 'Additive Synthesis'.  You're just adding light.
- It's different for printing and painting.  The primary colors you use are **absorbing** all the other light, and only reflecting one back.
    - So when you mix R, G, B paints- the Red will absorb the green & blue, the green will absorb the red & blue, etc. until you have everything being absorbed => black
    - Even though the final mix is a blend of lights, those primary colors are interfering with each other and what light actually gets reflected.
    - This is why it's called 'Subtractive Synthesis'
- "Printer's Colors" = C, Y, M (Cyan, Yellow, Magenta)
    - As opposed to paint which is mixed together, printers put down 4 layers (Cyan, Magenta, Yellow, Black)
        - The black just darkens things up a bit
    - Each layer is basically the same thickness
    - The "intensity" is really just based on the density of dots of that color in a particulr region.
        - Your eye will naturally blend them with the underlying white paper
    - C, Y, M are used because they can isolate individual primary (R,G,B) colors to not be reflected back
        - Cyan absorbs Red
        - Magenta absorbs Green
        - Yellow absorbs Blue
- Primary colors for computer graphics are the additive primaries: R, G, B
    - So that's all that will be discussed going fwd

## Color Wheel
![color wheel](/resources/images/programming/Simple_RGB_color_wheel.png)
- note that many color wheels depict 'painter's colors'- colors which lead to a different set of hues than additive
- primary colors R, G, B at 0, 120, and 240 degrees
- secondary colors (e.g. C, Y, M) result from combining two primary colors in their full intensities
- the circumference of the color wheel shows the hues: any combination of two primary colors.
    - remember the color wheel is a cycle, so the hues just show the evolving influence of each primary color on each other.
    - secondary colors are like special cases of hues (and happen at the intersection of each of two primary colors)
- **Hue**
    - A color not modified by tinting or shading
    - Formed by combining 2 primary colors
    - In other words, the kind of color you find on a color wheel, since that is just the blending of two different adjacent color components      
- **Shade**
    - Painters refer to as 'adding black'
    - Decreasing the intensity of the color
    - Fully shaded = Black
- **Tint** 
    - Painters refer to as 'adding white'
    - Increasing the intensity of the color
    - Fully tinted = White
- **Tone**
    - Painters refer to as 'Adding gray'
    - Can reduce the 'colorfulness' of a hue

## RGB Color Model
- Used by CSS2
- Reflects the hardware design of "True Color" displays
- 32 bits per pixel: 8-Red, 8-Green, 8-Blue, 8-Alpha
- **Creating a Hue**
    - One color component has to be full intensity (255)
    - One color component has to be variable intensity
    - One color component has to be 0
- **Shading**
    - Apply this formula to each color channel: 
        - new_intensity = current_intensity * (1 - shade_factor)
        - where shade_factor is between 0 (nothing) - 1 (black)
- **Tinting**
    - Apply this formula to each color channel:
        - new_intensity = current_intensity + ((255 – current_intensity) * tint_factor)
        - where tint_factor is between (nothing) - 1 (white)
- **Tones**
    - Apply both Shade and Tint to a color
    - Order does not matter

## HSL Color Model
- [src](https://www.youtube.com/watch?v=aYJTfGsi_mA)
- Hue, Saturation, and Lightness (aka Luminance)
- Used by CSS3
- Popular because it gives you a more common-sense way to tweaking colors than with RGB
- But consider that with RGB, you are mixing 3 color components, whereas with HSL, you are start with a mixture of 2 (i.e. a hue)
- Hue
    - Corresponds with presentation in color wheel
    - Angular relationship between tones in the color wheel is easily determined
    - In CSS3, it is a value between 0-360.
        - 0: red, 120: green, 240: blue
- Saturation: 
    - 0% - 100% in CSS3
    - controls purity of color
    - Saturation = colorfulness or chroma
    - at 0% you have a level of grey that is dependent on the Lightness level
    - at 100% you have the hue at it's full intensity
- Lightness:
    - 0% - 100% in CSS3
    - typical value is 50%
    - < 50% = you are shading
    - > 50% = you are tinting
    - at 0% you have black
    - at 100% you have white
- So with HSL:
    - You start with Hue as a base
    - You apply shades / tints / tones independently
- **Shading**
    - Lightness < 50% 
- **Tinting**
    - Lightness > 50%
- **Toning**
    - 2-step process:
        1. Set the grey: Shade of gray that you add is determined by lightness
        2. Apply the grey: Incrementally apply the grey by decreasing saturation amount
- Microsoft Paint will show you both RGB and HSL values side by side, so it's a good way to get a feel for the mappings

## HSL Visualizations
- There are three values, so you might imagine it to map to a cube or a sphere BUT...
    - Usually you would use a cylinder
    - Hue / Saturation (aka chroma) needs 2-dimensions and is a cycle, so it's a circle
    - Lightness is not a cycle, it's a range, so it like stacking (above and below) a hue circle such that
        - the top is white 
        - the bottom is black
![hsl-cylinder-1](/resources/images/programming/hsl-cylinder-1.jpg)
![hsl-cylinder-2](/resources/images/programming/hsl-cylinder-2.jpg)
- But you could also see it as a cone, b/c as you proceed along the lightness range, you narrow your saturation range, until at the lightness min/max, you only have black or white.
![hsl-cylinder-3](/resources/images/programming/hsl-cylinder-3.jpg)
- Some observations about the HSL Cone
    - This seems the most accurate representation
    - Each HS circle (cross-section) should have in it's center point a grey-scale value
        - Because that's the only point in which the Chroma of each color component is balanced
        - That particular grey-scale value is set by the Luminosity (highest = white, lowest = black)
    - Saturation:
        - If you keep Lightness and Hue constant, as you move inward in the HS circle (cross-section), you decrease saturation.
        - The colorfulness or volume or intensity of that hue just scales downwards, ultimately landing on a pure grey-scale value
        - It seems a little odd that it would begin to become grey when dealing with a hue because this is the combination of 2-colors, and a pure grey-scale value involves equal parts of 3 color components.
            - **But** remember that it's just approaching the grey-scale value.  The only pure grey-scale value is the middle point.  The other points are going to be somewhat grey, somewhat that hue.  
            - And this makes sense because their individual color values are getting so close to 0, that it's like a combination of balanced colors.
    
   






