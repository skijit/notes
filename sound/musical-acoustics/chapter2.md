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
- Quick Trig Reminder:
    - ![trig](/resources/images/music/trig1.gif)
- Basic sinuoid equation: ```- x(t) = a \cdot \cos(2 \pi ft + \phi_0) ```
    - ```- a ``` : amplitude
    - ```- f ``` : frequency 
        - units typically radians per unit of ```- t ``` 
    - ```- \phi_0 ``` : initial phase offest
        - units typically radians
    - ```- t ``` : time
    - ```- x(t) ``` : instantaneous amplitude of sinusoid at time ```- t ```
- Recall some basic radians stuff:
![radians](/resources/images/music/Circle_radians.gif)
    - Radians just measure arc length on a circle relative to (i.e. divided by) the radius
    - So radius (thus circle) size is dialed out of the equation.  
    - You can compare arc lengths of different size circles without getting messed up.
- Recall also some basic radian to degree conversions:
    - ```- 2 \pi \rightarrow 360^\circ ```
    - ```- \pi \rightarrow 180^\circ ```
    - ```- \frac{\pi}{2} \rightarrow 90^\circ ```    
    - ```- \frac{3 \pi}{2} \rightarrow 270^\circ ```    
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
        - consecutive angles are supplementary
        - diagonal will split into 2 congruent triangles
- One way to imagine a sinusoid which is helpful:
    - sinusoid ```- a ``` is a ray of length ```- a ``` anchored at the origin
    - ```- a ``` rotates around the origin at ```- f ``` rad/sec
    - basically, it's a radius tracing around the origin
    - the amplitude of the sinusoid is ```- a ```, but the instantanous amplitude is given by ```- x(t) ``` which factors in ```- t ```, ```- f ```, ```- \cos ```, and ```- \phi_0 ```    
    - the horizontal axis is ```- \cos t ``` and the vertical axis is ```- sin t ```
        - interesting side note:
        - ```- a ``` is a sinusoid which means it has both cosine (horizontal) and sine (vertical) components
        - it doesn't make sense to ask whether a sinusoid is a sine or cosine
            - at any given time, it has both
            - intuitively, you just want to say it's one or the other, usually choosing sine or cosine based on it having a minimal ```- \phi_0 ```
                - in truth, it's just two sides to the same coin.
- Adding signals (**when their frequencies match**) is like adding the rays together.
![adding signals](/resources/images/music/adding-signals.png)
    - sinusoid ```- a ``` is being added to sinusoid ```- b ```, resulting in ```- c ```
    - but how do you calculate ```- c ```?
    - basically with some properties of parallelograms and the law of cosines!
    - we want: the amplitude of the new sinusoid ```- c ```
    - we know: 
        - ```- f ``` will be the same
        - the amplitudes ```- a ``` and ```- b ```
        - ```- \phi_{a0} ```, ```- \phi_{b0} ```
    - we wont bother with: the resulting ```- \phi_{c0} ``` 
    - we want to use the law of cosines to calculate c, see above.
        - ```- c^2 = a^2 + b^2 - 2ab \cos C ```
    - problem is that this our ```- C ``` is unknown.
    - but we are rescued by the parallelogram property that consecutive angles are supplementary
    - therefore ```- C = 180 - \phi_b - \phi_a ```
        - where ```- \phi_b ``` is the angle between the horizontal axis and ```- b ``` and ```- \phi_a ``` is the angle between the horizontal axis and ```- a ```
    - we also know that when you rotate a value 180 degrees, the ```- cos ``` is the same but the sign is switched.
    - so we switch the sign on the ```- \cos ``` term such that:        
        - ```- c^2 = a^2 + b^2 + 2ab \cos (\phi_b - \phi_a) ```            
    - intuitively, we know how ```- c ``` is largely dependent on phase and magnitude
        - full cancellation is possible here with phase difference of 180 degrees and equal magnitude
- Adding signals with different frequencies:
    - not that different...
    - at ```- t_0 ```, it's the same as adding signals with the same ```- f ```, like above
        - along with the amplitudes, it's dependent on ```- \phi_{a0} ``` and ```- \phi_{b0} ```
    - but then ```- \phi_b - \phi_a ``` increases at a rate of ```- f_a - f_b ```
    - the resulting sinusoid will cycle at ```- f_a - f_b ``` times the unit of time.
        - todo: unit analysis here



