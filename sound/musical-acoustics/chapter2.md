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
            - The instantaneous amplitude is a scalar value - not a coordinate, like we see when we graph the signal in a unit circle.
            - Doesn't matter: the instantaneous amplitude could be given by either ```- \sin ``` or ```- \cos ```.
                - you just need to alter the ```- \phi_0 ``` appropriately            
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
- **Adding signals with matching ```- f ```**
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
- **Adding signals with different frequencies:**
    - not that different...
    - at ```- t_0 ```, it's the same as adding signals with the same ```- f ```, like above
        - along with the amplitudes, it's dependent on ```- \phi_{a0} ``` and ```- \phi_{b0} ```
    - but then ```- \phi_b - \phi_a ``` increases at a rate of ```- f_a - f_b ```
    - the resulting sinusoid will cycle at ```- f_a - f_b ``` times the unit of time.
        - todo: unit analysis here
- **Adding signals with equal amplitude and frequency**
    ![adding signals with same amp and freq](/resources/images/music/add-signals-same-amp-freq.png)
    - So only difference is ```- \phi_1``` and ```- \phi_2 ```
    - The previous law of cosines-derived formula will undergo some simplifications to become:
    - ```- c = 2a \cdot \cos(\frac{\phi_2 - \phi_1}{2}) ```
    - The cool thing about this is that the initial phase ```- \phi_c ```, which was difficult to calculate in case 1, is actually the average of original 2 
- **Adding sinusoids of different frequencies but the same amplitude**
    - We can generalize the last formula to two sinusoids with different frequencies:
    - ```- a \cos (2 \pi f t) + a \cos (2 \pi g t ) = 2a \cdot \cos(2 \pi \frac{f-g}{2} t) \cos(2 \pi \frac{f+g}{2}t ) ```
    - This is an important identity
        - I'm a little confused as to why it doesn't include phase though
        - Author calls this the Fundamental Law of Electronic Music (FLEM)


## Periodic Tones
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

## Power

### Review of Physics terms
- **Power**: The *rate* at which work is done
    -  Unit: Watt (W)
        - 1 W = 1 Joule / sec
        - Think of it as 'Energy per Second'
- **Work**: The ability to cause a change in energy
    - Unit: Joule (J)
- **Energy**: There are tons of types of energy: Kinetic, Potential, Heat, etc.
    - Unit: Joule (J)
    - Typically only measured by observing changes in energy
- **Presure**: Force acting on a surface area, ```- P = F/A ```
    - Unit: Pascals (Pa)
        - 1 Pa = 1 N/m^2    
- **Force**: The *attempt* of energy to move another object
    - *attempt* bc a force can be applied without moving something.  EG a dam.s
    - Unit: Newtons (N)
- So to sum up power: it is Energy Transfer over time.

### Motivation

- We want to measure the strength of signals
- Peak amplitude of a sinusoid is a decent measure of overall strength but there are 3 problems:
    1. Most real life signals aren't sinusoids
    2. Non-sinusoidal signals' peak amplitudes don't give you a good idea of their strength
    3. It would be nice to have a measure of strength that is additive, such that:
        - when you add 2 signals, their strengths are added too
- A good candidate for measuring strength is concept of average power.
- Remember, we're only interested in periodic signals here

### Analogy of Electronics to Acoustics

- Ohm's law states that ```- V = IR ```
- The definition of power, P, is ```- P = VI ```
    - Unit analysis: 
    ![electrical power unit analysis](/resources/images/programming/electrical-power-unit-analysis.png)
    - Confirmed: electrical power is energy per second
- Therefore: 
    - ```- P = V^2 / R ```  (based on the last two formulae)
    - Power is proportional to the square of the voltage!
        - It's quadratic (parabolic)! 
    - It is always non-negative
- To find an analogous definition for musical signals, let's work backwards with a unit analysis:
    - Power = 'energy per second'
    - Voltage in the Electrical system is analogous to pressure in the acoustic setting
    - Pressure units are N/m^2
        - N is the unit of Force
        - So Pressure is Force over an area
    - Force times displacement is Work because work is the ability to cause a change in energy
        - Change in energy requires force
        - Change in energy also requires something to be moved (aka be displaced)
    - Displacement over time is velocity
    - So for an acoustic setting:
        - Power = force x displacement/time = force x velocity        
        - force is the pressure of the acoustic signal
        - velocity is the speed at which it moves            
        - velocity IS proportional pressure (ie amplitude)
            - note: this is velocity of air.  Not the velocity of the wave propagating.
        - we get the same result as with the electrical analogy:
            - Power is proportional to the amplitude squared (divided by the resistance)
        - We can simplify this further as a digital recording has no analog to resistance: ```- P(t) = [x(t)]^2 ```
            - That is our definition of **instantaneous power**
## Average Power

- We're more interested in average power than instantaneous power
    - Average power characterizes the average strength over some period of time
- We can arrive at a definition for average power by:
    1. squaring the instantenous amplitude function to give us instantaneous power:
        - ```- \text{power} = a^2 \cdot \cos^2 (2 \pi f t) ```
    2. Apply the FLEM with ```- g = 0 ``` and notice that is very similar to the above equation:
        - FLEM: ```- a \cos (2 \pi f t) + a \cos (2 \pi g t ) = 2a \cdot \cos(2 \pi \frac{f-g}{2} t) \cos(2 \pi \frac{f+g}{2}t ) ```
        - FLEM with ```- g = 0 ```: ```- a \cdot \cos(2 \pi f t) + a = 2a \cdot \cos^2(\pi f t) ```  
            - since ```- \cos 0 = 1```
        - Notice how similar the right term is to the equation in 1?  So we multiply by ```- a/2 ```
        - ```- \frac{a^2}{2} \cos (2 \pi f t) + \frac{a^2}{2} = a^2 \cdot \cos^2 (2 \pi f t) ```
        - ```- \frac{a^2}{2} \cos (2 \pi f t) + \frac{a^2}{2} =  \text{power} ```        
    3. On average, the ```- \frac{a^2}{2} \cos (2 \pi f t) ``` is going to be zero (assuming the signal is zero-centered), so therefore we arrive at:
        - ```- \text{avg power} = P_{avg} = \frac{a^2}{2} ```  
        - Not surprisingly, it has nothing to do with the frequency
            - More important- it probably has nothing to with the **frequencies**
- Compare the signal to the instantaneous power and avg power
 ![electrical power unit analysis](/resources/images/music/avg-power.png)
- If average power is half the square of the peak amplitude, what do we know about squaring a cosine wave.
    1. Trig Identity: ```- \cos \alpha \cos \beta = \frac{1}{2} [ \cos(\alpha + \beta) + \cos(\alpha - \beta)] ```
    2. So squaring ```- \cos \alpha ``` gives us: ```- \cos^2 \alpha = \frac{1}{2} \cos(2 \alpha) ``` 
    3. **Conclusion**: The frequency doubles (moves up an octave) AND the amplitude is halved.

### Additivity of Average Power

- **Case 1**: Adding Signals with same frequency and different amplitudes
    - We already know from our law of cosines derivation that the resulting amplitude ```- c ``` is given by: ```- c^2 = a^2 + b^2 + 2ab \cos ( \phi_2 - \phi_1) ```
    - And we know that ```- P_{a_{avg}} = \frac{a^2}{2} ``` and so on...
    - So if we multiply both sizes of the first formula by ```- 1/2 ```, we get:
        - ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} + ab \cos(\phi_2 - \phi_1) ```
    - Conclusion: The powers are somewhat additive, but ultimately dependent on the phase relationship of the 2 signals
        - Note: when the cosine argument is a variable, then we can assume it will average to 0.  When it is a constant (as in this case above), we cannot make that assumption.
- **Case 2**: Adding Signals with different frequencies:
    - This is simlar to the above, but here the phase difference changes in time based on the difference between the two frequencies
    - ```- c^2 = a^2 + b^2 + 2ab \cos (\lvert f - g \rvert t (\phi_2 - \phi_1)) ```
    - Since the cosine argument is not a constant, but something changing in time, we can assume it is zero
    - Conclusion: Power is additive in this case.  ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} ```
- **Counterexample**: As long as the frequencies are different, we might conclude that always ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} ```.
    - This is NOT true when you add a sinusoid to itself.
    - You might expect Power to double but it actually increases by a factor of 4.
    - **Proof**:
        - given a sinusoid with amplitude ```- a ```
        - added to itself, the amplitude is now ```- 2a ```
        - In general, ```- P_{avg_a} = \frac{a^2}{2} ```
        - Average power of ```- 2a ```: ```- P_{avg_{a+a}} = \frac{(2a)^2}{2} = 4 \cdot \frac{a^2}{2} = 4 \cdot P_{avg_a} ```
- **Conclusion**:
    - When the sinusoids are **uncorrelated** their powers are additive
        - 2 sinusoids with different frequencies are uncorrelated.
    - When the sinsoids are **not uncorrelated** (ie same frequency), their powers are dependent on their phase differences.
        - 2 sinusoids with the same frequency are correlated.
    - Scaling a signal by a factor of ```- k ``` scales the average power by ```- k^2 ```
    - Adding ```- k ``` uncorrelated signals should only be expected to multiply power by ```- k ```

### Decibels and Average Power
- In the past, ```- L ``` (via decibels) has been used to compare instantaneous amplitudes.
- Now that we have a way to describe the average strength of signals, applying this to decibels might also be useful
- But first we need to verify that it is mathematically consistent with the original definition of ```- L ```.
- ```- L  = 10 \log \frac{P_{avg_1}}{P_{avg_2}} ```
- ```- L =  10 \log \frac{\frac{a^2_1}{2}}{\frac{a^2_2}{2}} = 10 \log \frac{a^2_1}{a^2_2} = 10 \log ( \frac{a_1}{a_2} )^2 = 20 \log \frac{a_1}{a_2}```
    - And this matches our original formula for ```- L ``` based on instantaneous amplitude.  
    - So yes, this is consistent



                