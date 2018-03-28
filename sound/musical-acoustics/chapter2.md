Acoustics - Chapter 2 - Sinusoids
==================

## Sinusoids

- 3 reasons Sinusoids are Important
    1. They occur in nature        
    2. They behave in predictable ways, particularly to elemental operations:
        - amplify
        - mixing
        - delay
    3. Per Fourier, one can add sinusoids to make arbitray signals
- TODO: Add a gif of unit circle
- Basic sinuoid equation: ```- x(t) = a \cdot \cos(2 \pi ft + \phi_0) ```
    - ```- a ``` : amplitude
    - ```- f ``` : frequency 
        - units typically radians per unit of ```- t ``` 
    - ```- \phi_0 ``` : initial phase offest
        - units typically radians
    - ```- t ``` : time
    - ```- x(t) ``` : instantaneous amplitude of sinusoid at time ```- t ```
- Recall some basic radian to degree conversions:
    - ```- 2 \pi \rightarrow 360 ```
    - ```- \pi \rightarrow 180 ```
    - ```- \frac{\pi}{2} \rightarrow 90 ```    
- Amplifying a sinusoid: ```- x(t) = g a \cdot \cos(2 \pi ft + \phi_0) ```
    - ```- g ``` is linear gain
- If gain is specified in dB, you get: ```- g = 10^\frac{g_{dB}}{20} ```
    - **Proof**:
        - ```- g = \frac{a}{a_{ref}} ```
        - ```- g_{dB} = 20 \log{g} ```
        - ```- \frac{g_{dB}}{20} = \log{g} ```
        - ```- 10^\frac{g_{dB}}{20} = g ```
- Delaying a sinusoid:
    - ```- x(t - \tau) = a \cdot \cos (2 \pi f(t - \tau) + \phi_0) = a \cdot \cos (2 \pi f t + ( \phi_0 - 2 \pi \tau f))```
    - in other words, you still get a sinuoid but it is delayed by a constant amount - basically treated like a phase shift

## Mixing Frequencies
- Mixing frequencies is slightly more complicated than applying (linear) gain and delay
- Some basic math we'll need:
    - Law of Cosines
    ![law of cosines](/resources/images/music/law_of_cosines.gif)
        - Basically a generalization of pythagorean theorem
        - Cosine of 90 degrees (i.e. a right triangle, opposite the hypotenuse) is 0
    - Some interesting facts about parallelogram diagonals
    ![parallelogram diagonals](/resources/images/music/rhombus_diagonals.jpg)
        - Opposite angles off the diagonal are equal




