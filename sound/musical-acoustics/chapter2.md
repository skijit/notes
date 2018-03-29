Acoustics - Chapter 2 - Sinusoids
==================

## Math which will be useful

- Basic Trig:
![trig](/resources/images/music/trig1.gif)
    - This gif illustrates the relationship of sine to cosine in a unit circle
        - Cosine is the horizontal axis
        - Sine is the vertical axis
    - Why sine = cosine offset by 90 degrees
    - Those 90 degrees being the right angle of a right triangle    
- Radians:
![radians](/resources/images/music/Circle_radians.gif)
    - Radians just measure arc length on a circle relative to (i.e. divided by) the radius
    - So radius (thus circle) size is dialed out of the equation.  
    - You can compare arc lengths of different size circles without getting messed up.
    - 'Arc length' in this context, really means we're measuring the inner angle
- Recall also some basic radian to degree conversions:
    - ```- 2 \pi \rightarrow 360^\circ ```
    - ```- \pi \rightarrow 180^\circ ```
    - ```- \frac{\pi}{2} \rightarrow 90^\circ ```    
    - ```- \frac{3 \pi}{2} \rightarrow 270^\circ ```    
- Law of cosines
![law of cosines](/resources/images/music/law_of_cosines.gif)
    - Basically a generalization of pythagorean theorem
    - Cosine of 90 degrees (i.e. a right triangle, opposite the hypotenuse) is 0
- Some Parallelogram properties
![parallelogram diagonals](/resources/images/music/rhombus_diagonals.jpg)
    - Opposite angles off the diagonal are equal
    - consecutive angles are supplementary
    - diagonal will split into 2 congruent triangles

## Sinusoids

- 3 reasons Sinusoids are Important
    1. They occur in nature        
    2. They behave in predictable ways, particularly to elemental operations:
        - amplify
        - mixing
        - delay
    3. Per Fourier, one can add sinusoids to make arbitray signals
        - This makes them a sort of 'atomic unit' for signals / waves / etc.
- Basic sinuoid equation: ```- x(t) = a \cdot \cos(2 \pi ft + \phi_0) ```
    - ```- a ``` : amplitude
    - ```- f ``` : frequency 
        - units typically radians per unit of ```- t ``` 
    - ```- \phi_0 ``` : initial phase offest
        - units typically radians
    - ```- t ``` : time
    - ```- x(t) ``` : instantaneous amplitude of sinusoid at time ```- t ```
- Visualize a Sinusoid as a rotating ray:
    - Similar to the top animation...
    - The ray has a fixed base at the origin of an x-y plane
    - The ray's length is fixed and the other endpoint is rotating, tracing out a circle
    - the horizontal axis is ```- \cos t ``` and the vertical axis is ```- sin t ```
    - Analog to a sinusoid:
        - The amplitude of the sinusoid is given by the length of ray
        - The ray rotates around the origin at ```- f ``` rad/sec
        - The instantaneous amplitude of the sinusoid is given by the same function ```- x(t) ```
            - It could also be given by ```- \sin ```-based function of a wave, you just need to alter the ```- \phi_0 ``` appropriately
            - This gets to an important point...
- The '2 sides' of a Sinusoid
    - It doesn't make sense to say: 'is this sinusoid a sine or a cosine?'
    - It's both: the sine and cosine are attributes of all sinusoids.
    - The sine and cosine represent both:
        - the shifting position of sinusoid in time
        - the way the sinusoid as a whole maintains balance while it's position shifts (bc ```- \sin + \cos = 1 ```)
    
## Operations on Sinusoids

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

### Mixing Frequencies
- Mixing frequencies is slightly more complicated than applying (linear) gain and delay
- Adding signals with matching ```- f ```
    - In this case, we can just add the rays ```- a ``` and ```- b ``` together.
    ![adding signals](/resources/images/music/adding-signals.png)
    - sinusoid ```- a ``` is being added to sinusoid ```- b ```, resulting in ```- c ```
    - but how do you calculate ```- c ```?
    - basically with some properties of parallelograms and the law of cosines! (see above)
    - **we already know**: 
        - ```- f ``` will be the same
        - the amplitudes ```- a ``` and ```- b ```
        - ```- \phi_{a0} ```, ```- \phi_{b0} ```
    - **we want**: the amplitude of the new sinusoid ```- c ```    
    - we wont bother with: the resulting ```- \phi_{c0} ``` 
    - we want to use the law of cosines to calculate c, see above.
        - ```- c^2 = a^2 + b^2 - 2ab \cos C ```
        - ```- c ``` is the diagonal of the parallelogram, which creates two triangles and which can be calculated by this law.
    - **problem** : our ```- C ``` is unknown.
    - **solution**: we are rescued by the parallelogram property that consecutive angles are supplementary
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


### Periodic Tones
- Signal is periodic when there is some non-zero delay ```- \tau ``` which can be applied which makes no difference:
    - ```- f(x) = f(x - \tau)```
- The smallest value of ```- \tau ``` is the period
- Frequency is related to period such that ```- \tau = \frac{1}{f} ```
- Sinusoids are periodic, but there are many more periodic functions other than just sinusoids
- Mixtures of periodic sinusoids can be heard as separate or the same tone, depending on the circumstances.
    - **Case 1**: When the sinusoids have related frequencies
        - It's a fourier series such as ```- x(t) = a_1 \cos(2 \pi f t + \phi_1) +  a_2 \cos(4 \pi f t + \phi_2) + a_3 \cos(6 \pi f t + \phi_3) + \ldots ```
        - Each component, called a **harmonic**, is a whole-number multiple of the base frequency, ```- f ```.
        - These will be heard as a single tone when (roughly):
            - ```- f > 30 Hz ```
            - more power accumulated in the lower frequencies
            - no frequency other than ```- f ``` having an amplitude greater than the sum of all the others
            - some energy in the odd-numbered harmonics
        - This is called a **complex periodic tone**
    - **Case 2**: When the sinusoids are not based on a single frequency
        - ```- x(t) = a_1 \cos(2 \pi f_1 t + \phi_1) +  a_2 \cos(2 \pi f_2 t + \phi_2) + a_3 \cos(2 \pi f_3 t + \phi_3) + \ldots ```
        - Sometimes a mixture of (unrelated) sinusoids will still be understood by the ear as a single tone
        - individual components here are called **partials**
        - this is called a **complex inharmonic tone**
