Acoustics - Chapter 2 - Sinusoids
==================

## Math which will be useful

- Basic Trig:
![trig](/resources/images/music/trig1.gif)
    - This gif illustrates the relationship of sine to cosine in a unit circle
        - Cosine is the horizontal axis
        - Sine is the vertical axis
        - sine = cosine offset by 90 degrees (the 90 degrees of the inner right triangle)
        - the sin x + cos x always is the same.  It show the tradeoff of horizontal to vertical components as a radius traces through a circle.    
- Radians:
![radians](/resources/images/music/Circle_radians.gif)
    - Radians measure angles
        - the angle is obtained by measuring the the arc length in units of the radius.
        - Since it's in units of the radius, the actual radius doesn't matter, and thus circle size doesn't matter.
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

- 3 reasons Sinusoids are important
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
    - the horizontal axis is ```- \cos t ``` and the vertical axis is ```- \sin t ```
    - Analog to a sinusoid:
        - The peak amplitude of the sinusoid is given by the length of ray
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
        - the horizontal ( ```- \cos ```) and vertical (```- \sin ```) components of the sinusoid.        
        - the way the sinusoid as a whole maintains balance while it's position shifts (bc ```- \sin + \cos = 1 ```)    
    - I wonder how this translates into higher dimensions.
    
## Operations on Sinusoids

### Gain
- In the context of a sinusoidal function, gain is a multiplier:
    - ```- x(t) = g a \cdot \cos(2 \pi ft + \phi_0) ```
    - ```- g ``` is linear gain
- It's not a relative level measurement, like ```- L ```
- In electronics, gain is a ratio of an input to an output measurement.
    - Power gain: ```- \text{gain}_{dB} = 10 \log \frac{p_{out}}{p_{in}}```
- For acoustics, it's analogous:
    - it's a ratio of *strengths*- new over old - of a wave/sinusoid
    - Finding the right way to characterize *strength* will occupy a big part of this chapter.
        - Short version is we want to use average power instead of peak or instantaneous amplitude (or instanteous amplitude squared)
- There are two types of gain:
    - ```- g ``` which is plugged into the instanteous amplitude function, ```- x(t) ```, is the **linear gain**.
        - ```- g = \frac{a_{new}}{a_{old}} ``` 
        - ```- g = \frac{P_{new}}{P_{old}}``` (we'll learn about ```- P ``` and why it's different soon...)
        - ```- x(t) = g \cdot \cos(2 \pi f t + \phi_0) ```
    - ```- g_{dB} ``` is gain in decibels.  
        - ```- g_{dB} = 20 \log \frac{a_{new}}{a_{old}} ```
        - ```- g_{dB} = 10 \log \frac{P_{new}}{P_{old}} ```
        - ```- g_{dB} = 20 \log g ```
        - ```- g_{dB} = L_{new} - L_{old} ```
- **Question**: Do you plug in regular *strength* values to gain, or do you convert them to dB first?
    - **Answer**: Regular values: don't convert *strength* values (like power or peak ampltitude) to dB.  That is more for ```- L ``` and ```- g ```.
- **QUestion**: Is ```- g_{dB} ``` additive?  (i.e. ```- g_{dB_{new}} = g_{dB_1} + g_{dB_2}  ``` )
    - **Answer**: Nope.  Since the logarithmic scale is non-linear, it's not additive in that sense.
    - Remember decibels can simplify some calculations but this is not in that way.
    - They even can replace multiplicative operations with additive ones, but in a different way:
        - Example: rather than multiplying a sinusoid by 1/2 to see what it's new strength is, you can just subtract 6 dB.  [Proof](/sound/emsd/chapter1)
- If gain is specified in dB, you get: ```- g = 10^\frac{g_{dB}}{20} ```
    - **Proof**:
        - ```- g = \frac{a}{a_{ref}} ```
        - ```- g_{dB} = 20 \log{g} ```
        - ```- \frac{g_{dB}}{20} = \log{g} ```
        - ```- 10^\frac{g_{dB}}{20} = g ```
- Proof that ```- g_{dB} = L_{new} - L_{old} ```:
    - ```- L = 20 \log \frac{a}{a_{ref}} ```
    - ```- g_{dB} = 20 \log \frac{a_1}{a_2} ```
    - ```- L_2 - L_1 = 20 \log \frac{a_2}{a_{ref}} - 20 \log \frac{a_1}{a_{ref}} ```
    - ```- L_2 - L_1 = 20 [ \log \frac{a_2}{a_{ref}} - \log \frac{a_1}{a_{ref}}] ```
    - ```- L_2 - L_1 = 20 \log \frac{\frac{a_2}{a_{ref}}}{\frac{a_1}{a_{ref}}} ```
    - ```- L_2 - L_1 = 20 \log \frac{a_2}{a_1} = g_{dB} ```

### Delay
- ```- x(t - \tau) = a \cdot \cos (2 \pi f(t - \tau) + \phi_0) = a \cdot \cos (2 \pi f t + ( \phi_0 - 2 \pi \tau f))```
- in other words, you still get a sinuoid but it is delayed by a constant amount - basically treated like a phase shift

### Mixing
- Mixing is more complicated than applying (linear) gain and delay.  It all depends on the details of the frequencies, amplitude, and phase.

## Mixing Sinusoids...

### With matching frequencies

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

### With different frequencies
- not that different...
- at ```- t_0 ```, it's the same as adding signals with the same ```- f ```, like above
    - along with the amplitudes, it's dependent on ```- \phi_{a0} ``` and ```- \phi_{b0} ```
- but then ```- \phi_b - \phi_a ``` increases at a rate of ```- f_a - f_b ```
- the resulting sinusoid will cycle at ```- f_a - f_b ``` times the unit of time.
    - This cycle of ```- f_a - f_b ``` is called **beating**.  See below for more info.

### With equal amplitude and frequency
![adding signals with same amp and freq](/resources/images/music/add-signals-same-amp-freq.png)
- So only difference is ```- \phi_1``` and ```- \phi_2 ```
- The previous law of cosines-derived formula will undergo some simplifications to become:
- ```- c = 2a \cdot \cos(\frac{\phi_2 - \phi_1}{2}) ```
- The cool thing about this is that the initial phase ```- \phi_c ```, which was difficult to calculate in case 1, is actually the average of original 2 

### With different frequencies but the same amplitude
- We can generalize the last formula to two sinusoids with different frequencies:
- ```- a \cos (2 \pi f t) + a \cos (2 \pi g t ) = 2a \cdot \cos(2 \pi \frac{f-g}{2} t) \cos(2 \pi \frac{f+g}{2}t ) ```
- This is an important identity
    - In words, it is revealing that adding two different frequencies (of the same amplitude) is equivalent to multiplying two other frequencies (which are the average and half the difference of the original 2 frequencies).
    - It practice, it comes in handy for simplifying various math.  It also comes in handy for explaining amplitude and ring modulation (see below) 
    - Author calls this the **Fundamental Law of Electronic Music (FLEM)**

## Beating and FLEM Applications
- Beating is the resulting sinusoid of two different frequencies being super-imposed
    - You wouldn't get it if the sinusoids had the same frequency (regardless of offset)
    - the beating frequency is always ```- \lvert f-g \rvert ```
- **Case 1**: Given two sinusoids...
    - 440 Hz
    - 441 Hz
    - Beating is happening at 1 Hz
    - It basically sounds like a 1 Hz amplitude modulation
- **Case 2**: Given two sinusoids of...
    - 440.5 Hz multiplied by...
    - 0.5 Hz
    - You get the same sound (except lower amplitude) as the previous example!
    - Why?
        - Second sinusoid controls is the beating
            - it is multiplied to the first sinusoid.
            - The 0.5 (instead of 1 Hz) is because a cycle typically includes two peaks (one positive, one negative).
                - We don't care whether a peak is positive or negative, so we just halve the rate we want to modulate by.
        - first sinusoid is the interpolation (avg) of the two previous frequencies
    - Amplitude modulation in the multiplication example
- **Conclusion**: Case 1 and Case 2 is a demonstration of FLEM!
    - Case 1 refers to the additive part: ```- a \cos (2 \pi f t) + a \cos (2 \pi g t ) ```
    - Case 2 refers to the multiplicative part: ```- 2a \cdot \cos(2 \pi \frac{f-g}{2} t) \cos(2 \pi \frac{f+g}{2}t ) ```
- **Another example**:
    - Given two sinusoids of...
        - 440
        - 460
        - This will match another two sinusoids:
            - 450 being multiplied by a sinusoid of 10
- From a synthesis point of view, this multiplicative component is very similar to amplitude modulation and in particular, ring modulation.
    - Multiplying two frequencies ```- f ```, ```- g ```, together will produce two different frequencies (the additive part of FLEM) based on:
        - ```- f - g ```
        - ```- f + g ```
    - Ring modulation is basically amplitude modulation at an audible rate.  
        - It will apply a modulation to each component sinusoid in a sound and it will break any harmonic relationship that they have creating a funky sound.        
        - TODO: discuss ring modulation in more detail

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
        - FLEM with ```- g = 0 ```: ```- a \cdot \cos(2 \pi f t) + a = 2a \cdot \cos^2(2 \pi f t) ```  
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
- If average power is half the square of the peak amplitude, what do we know about squaring a cosine wave?
    1. Trig Identity: ```- \cos \alpha \cos \beta = \frac{1}{2} [ \cos(\alpha + \beta) + \cos(\alpha - \beta)] ```
    2. So squaring ```- \cos \alpha ``` gives us: ```- \cos^2 \alpha = \frac{1}{2} \cos(2 \alpha) + \frac{1}{2}``` 
    3. **Conclusions** 
        - The frequency doubles (moves up an octave) 
        - The amplitude is halved
        - The sinusoid is shifted upwards by a half (so it can never be negative)

### Additivity of Average Power

- **Case 1**: Adding Signals with same frequency and different amplitudes
    - We already know from our law of cosines derivation that the resulting amplitude ```- c ``` is given by: ```- c^2 = a^2 + b^2 + 2ab \cos ( \phi_2 - \phi_1) ```
    - And we know that ```- P_{a_{avg}} = \frac{a^2}{2} ``` and so on...
    - So if we multiply both sides of the first formula by ```- 1/2 ```, we get:
        - ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} + ab \cos(\phi_2 - \phi_1) ```
    - Conclusion: The powers are somewhat additive, but ultimately dependent on the phase relationship of the 2 signals
        - Note: when the cosine argument is a variable, then we can assume it will average to 0.  When it is a constant (as in this case above), we cannot make that assumption.
- **Case 2**: Adding Signals with different frequencies:
    - This is simlar to the above, but here the phase difference changes in time based on the difference between the two frequencies
    - ```- c^2 = a^2 + b^2 + 2ab \cos (\lvert f - g \rvert t (\phi_2 - \phi_1)) ```
    - Since the cosine argument is not a constant, but something changing in time, we can assume it averages to zero
    - Conclusion: Power is additive in this case.  ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} ```
- **Case 3**: As long as the frequencies are different, we might conclude that always ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} ```.
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

## Summary
| Name | Abbrev | Category | Desc | Log (dB) or Linear? | Formula(e) | Notes |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Relative Level | ```- L ``` | Relative Loudness | A measurement of how loud something is relative to a **fixed** reference amplitude or power. | log (dB) | ```- L = 20 \log \frac{a_1}{a_{ref}} ``` ```+ L = 10 \log \frac{P_1}{P_{ref}} ``` | The reference strength (amplitude or power) can be an upper or lower bound.  In computer contexts, it is typically an upper bound of 1, since all audio values sent to a DAC will be between 0 and 1.  ```- L ``` in this context (also called ```- dB_{full scale} ```) will have a range of ```- - \infty ``` to 0.  Acoustic contexts often choose a lower bound for ```- a_{ref} ``` and so the range would be 0 to ```- \infty ```. |
| Linear Gain | ```- g ``` | Change in relative loudness | Measures a **change** in loudness.  Similar to ```- L ``` except that we compare the new amplitude (or power) to a previous value (rather than a fixed amount).  Also appears as a multiplier to the instantaneous amplitude function. | Linear | ```+ g = \frac{a_{new}}{a_{old}} ``` ```+ g = \frac{P_{new}}{P_{old}}``` ```+ x(t) = g \cdot \cos(2 \pi f t + \phi_0) ```  |  |
| Logarithmic Gain | ```- g_{dB} ``` | Change in relative loudness | Similar to linear gain, except we change the scale to decibels to allow a larger range. | log (dB) | ```+ g_{dB} = 20 \log \frac{a_{new}}{a_{old}} ``` ```+ g_{dB} = 10 \log \frac{P_{new}}{P_{old}} ``` ```+ g_{dB} = 20 \log g ``` ```+ g_{dB} = L_{new} - L_{old} ``` | Remember that ```- g_{dB} ``` is not additive |
| Peak Amplitude | ```- a ``` | Strength (not relative) | The sinusoid's peak (max) amplitude | linear | ```- x(t) = a \cdot \cos (2 \pi f t + \phi_0) ```  | This is an ok way to characterize strength if we're just talking about sinusoids, but it's useless once we deal with a more complicated waveform. |
| Instantaneous Amplitude | ```- x(t) ``` | Strength (not relative)| The sinusoid's value (whether we're looking at the horizontal (```- \cos ```) component or the vertical (```- \sin ```) component) as a function of time, ```- x(t) ``` | linear | ```- x(t) = a \cdot \cos (2 \pi f t + \phi_0) ``` | This changes so much that it's not really a good measurement of strength - although it has many other important uses (obvs) |
| Instantaneous Power | ```- P ``` or ```- \text{power} (t) ``` | Strength (not relative) | The power at any moment as a function of time ```- t ``` | linear | ```- \text{power} (t) = [x(t)]^2 ```  which expands to ```- \text{power} (t) = \frac{a^2}{2} \cos (2 \pi f t) + \frac{a^2}{2}```| So far, the instantaneous power function is not that useful - maybe this will change.  More importantly, we use it derive the average power function, which is easy because the term ```-  \frac{a^2}{2} \cos (2 \pi f t) ``` always averages out to 0. |
| Average Power | ```- P_{avg} ``` or ```- P_a ``` | Strength (not relative) | This is the measure of strength that we've built up to the entire chapter.  The pro's include: 1) it being useful for non-sinusoidal waves 2) having some additivity (*some restrictions apply*) 3) Being analogous to electrical power 4) Being mathematically compatible with all the formulae we've defined thus far. | linear | ```- P_{avg} = \frac{a^2}{2}``` | Average power is additive when the signals are uncorrelated (i.e. have different frequencies, or not being multiples of each other) |


## Questions
1.  **Question**:  What are the max and min peak amplitudes of the sinusoid that results from two sinusoids being mixed, both with frequencies of 440 Hz and amplitudes of 2 and 3?
    - **Answer**: 
    - ```- x(t) = 2 \cdot \cos (2 \pi \cdot 440 +  \phi_{{0}_{x}}) ```
    - ```- y(t) = 3 \cdot \cos (2 \pi \cdot 440 +  \phi_{{0}_{y}}) ```
    - Since they have the same frequency, everything really depends on their initial phases.
    - min and max *instantaneous amplitudes* would be easy b/c we can just add them with ```- \phi_{{0}_{x}} = \phi_{{0}_{y}} ``` (max) and ```- \phi_{{0}_{x}} - \pi = \phi_{{0}_{y}} ``` (min).
        - ```- \pi ``` = 180 degrees = full cancellation
    - But we want *peak* amplitude, so this is a problem like the law of cosines example:
        - ```- c^2 = a^2 + b^2 + 2ab \cos ( \phi_2 - \phi_1) ```
    - Max phase difference: ```- \phi_{{0}_{x}} - \pi = \phi_{{0}_{y}} ``` 
        - ```- c^2 = 2^2 + 3^2 + 2 \cdot 2 \cdot 3 \cdot \cos (\phi_{{0}_{x}} - \phi_{{0}_{x}} - \pi) ```
        - ```- c^2 = 4 + 9 + 12 \cdot \cos(- \pi) = 13 +12(-1) = 1 ```
        - ```- c = \sqrt{1} = 1 ```
    - Min phase difference: ```- \phi_{{0}_{x}} = \phi_{{0}_{y}} ``` 
        - ```- c^2 = 2^2 + 3^2 + 2 \cdot 2 \cdot 3 \cdot \cos(\phi_{{0}_{x}} - \phi_{{0}_{x}}) ```
        - ```- c^2 = 13 + 12 \cdot \cos(0) = 13 + 12 = 25 ```
        - ```- c = 5 ```
2. **Question**: Two sinusoids with different frequencies, whose averae powers are 3 and 4, are added.  What is the average power of the resulting digital signal?
    - **Answer**:
    - We learned that we can derive the following from the law of cosines to apply to mixing two sinusoids of the same frequency: ```- c^2 = a^2 + b^2 + 2ab \cos ( \phi_2 - \phi_1) ```
    - From this, we can also derive: ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} + ab \cos(\phi_2 - \phi_1) ```
        - because we know ```- P_{a_{avg}} = \frac{a^2}{2} ``` and we can multiply each side of the first equation by ```- 1/2 ```.
    - We can also extrapolate from the law of cosines to mixing two sinusoids of different frequencies: ```- c^2 = a^2 + b^2 + 2ab \cos (\lvert f - g \rvert t (\phi_2 - \phi_1)) ```    
        - It is essentially the same as before except the phase difference precesses at a rate of ```- \lvert f - g \rvert t ```.
        - So we can again multiply this by ```- 1/2 ``` to get the following: ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} + ab \cos(\lvert f - g \rvert t (\phi_2 - \phi_1)) ```
        - However last term, ```- ab \cos(\lvert f - g \rvert t (\phi_2 - \phi_1)) ``` is the beatin, and it averages out to 0.
        - So we get ```- P_{c_{avg}} = P_{a_{avg}} + P_{b_{avg}} ```
    - So ```- P_{c_{avg}} = 3 + 4 = 7 ```
    - **Note**: We already knew that power is additive as long as the frequencies are uncorrelated (which they are - since they're different).  So we just took the scenic route.
3. **Question**: Two sinusoids, of period 4 and 6 ms, are added.  What is the period of the resulting waveform?
    - **Answer**:
    - 2 sinusoids: ```- \tau_a ``` = 4 ms, ```- \tau_b ``` = 6 ms
    - I think this is a trick question: there will probably be 2 resulting frequencies (and thus periods)
        1. The "main" audible one
        2. The beating frequency
    - This should be given by the FLEM: ```- a \cos (2 \pi f t) + a \cos (2 \pi g t ) = 2a \cdot \cos(2 \pi \frac{f-g}{2} t) \cos(2 \pi \frac{f+g}{2}t ) ```
    - So the resulting frequencies are: ```- \frac{f - g}{2} ``` (beating) and ```- \frac{f + g}{2} ``` (audible)
    - remember: ```- \tau = \frac{1}{f} ```
        - ```- \frac{\frac{1}{4} + \frac{1}{6}}{2} = \frac{5}{24} = 0.208 \text{cycles\ms}``` and so ```- \tau = 1 / 0.208 = 4.8 \text{ms} ```
        - ```- \frac{\frac{1}{4} - \frac{1}{6}}{2} = \frac{1}{24} = 0.042 \text{cycles\ms}``` and so ```- \tau = 1 / 0.042 = 238 \text{ms} ```
4. **Question**: Two sinusoids are added.  One has a frequency of 1 kHz.  The resulting signal "beats 5 times per second.  What are the possible frequencies of the other sinusoids?
    - **Answer**:
    - ```- f_a = 1 \text{kHz} ```, and ```- f_b = x ```.
    - Resulting signal beats at 5 Hz.  In other words, ```- \frac{f_a-f_b}{2} = 5 ```
    - ```- \frac{1000-f_b}{2} = 5 ```, so ```- f_b = -990 ```
    - beat frequencies can be in the audible range (which is how a theremin works), or if they are less than the audible range, it is heard as amplitude modulation.
    - Another  possibility is that ```- f_a ``` is unknown.  In that case: ```- \frac{f_a - 1000}{2} = 5 ``` and therefore ```- f_a = 1010 ```
5. **Question**: A signal is amplified, multiplying it by 3.  By how many decibels is the level raised?
    - **Answer**:
    - ```- g_{dB} = 20 \log \frac{a}{a_{ref}} ```
    - ```- g_{dB} = 20 \log 3 = 9.54 ```
6. **Question**: What is the pitch, in octaves, of the second harmonic of a complex hamonic tone, relative to the first harmonic.
    - **Answer**:
    - Given the fundamental ```- f_0 ```, the first harmonic is```- f_1 = 2f_0 ```, the second harmonic ```- f_2 = 3f_0 ```
    - Octaves ```- I = \log_2 \frac{f_{new}}{f_{ref}}```
    - ```- I = \log_2 \frac{3f_0}{2f_0} = \log_2 \frac{3}{2} = 0.58 ```

## Project
**Comb Filter**: When combining a sinusoid with a lagged version of itself, what is the affect of the delay amount on the gain in decibels?
This can be solved experimentally and mathematically.  I'll start with the latter.
- First of all, we don't need to think so much about the delay factor since the sinusoids are the essentially the same.  
    - We'll just treat this as a difference of two phases, ```- \phi_1 ``` and ```- \phi_2 ```.
- We already know that the peak amplitude of a sinusoid added to a delayed copy of itself is given by: ```- c = 2a \cdot \cos (\frac{\phi_2 - \phi_1}{2}) ```
- This passes the first sanity check because it allows ```- 0 \leq c \leq 2a ```
- Instantaneous Power, ```- P(t) = [x(t)]^2 ```
    -  In general, ```- x(t) = a_{pk} \cos (2 \pi f t + \phi) ```
    - and we know (from the above) that ```- a_{pk} = c = 2a \cdot \cos (\frac{\phi_2 - \phi_1}{2}) ```
    - but then we don't know how to characterize ```- \phi ```
        - if we look at the drawing of two of the same sinusoid being added to itself, we see tha the resulting phase of ```- c ``` is the average of ```- \phi_2 ``` and ```- \phi_1 ```
        - ```- \phi_c = \frac{\phi_2 + \phi_1}{2} ```
    - therefore ```- x(t) = 2a \cdot \cos (\frac{\phi_2 - \phi_1}{2}) \cdot \cos(2 \pi f t + \frac{\phi_2 + \phi_1}{2}) ```
- Now the question is how do we square ```- x(t) ``` (since ```- P(t) = [x(t)]^2 ```):
    - ```- P(t) = [x(t)]^2 = 4a^2 \cos^2 (\frac{\phi_2 - \phi_1}{2}) \cos^2 (2 \pi f t + \frac{\phi_2 + \phi_1}{2}) ```
    - Remember: ```- \cos^2 \alpha = \frac{1}{2} \cos(2 \alpha) + \frac{1}{2}``` 
    - ```- P(t) = 4a^2 \cdot [\frac{1}{2} \cos ( \phi_2 - \phi_1) + \frac{1}{2} ] \cdot [\frac{1}{2} \cos (2 \cdot ( 2 \pi f t + \frac{\phi_1 + \phi_2}{2})) + \frac{1}{2}] ```
    - ```- P(t) = [ 2a^2 \cos(\phi_2 - \phi_1) + 2a^2 ] \cdot [ \frac{1}{2} \cos ( 4 \pi f t + \phi_1 + \phi_2) + \frac{1}{2}]```
    - Now let ```- \alpha = \phi_2 - \phi_1 ```, and ```- \beta = 4 \pi f t + \phi_1 + \phi_2 ```
    - ```- P(t) = [ 2a^2 \cos \alpha + 2a^2 ] \cdot [ \frac{1}{2} \cos \beta + \frac{1}{2}]```
    - ```- P(t) =  a^2 \cos \alpha cos \beta + a^2 cos \alpha + a^2 cos \beta + a^2 ```
    - ```- P(t) =  a^2 ( \cos \alpha \cos \beta + \cos \alpha + \cos \beta + 1) ```
    - Recall identity: ```- \cos \alpha \cos \beta = \frac{1}{2} [ \cos( \alpha + \beta) + \cos(\alpha - \beta)] ```
    - ```- P(t) =  a^2 [ \frac{1}{2} (\cos (\alpha + \beta) + \cos (\alpha - \beta)) + \cos \alpha + \cos \beta + 1 ]```
    - ```- P(t) =  a^2 [ \frac{1}{2} (\cos (\phi_2 - \phi_1 + 4 \pi f t + \phi_1 + \phi_2) + \cos ( \phi_2 - \phi_1 - 4 \pi f t - \phi_1 - \phi_2)) + \cos \alpha + \cos \beta + 1 ]```
    - ```- P(t) =  a^2 [ \frac{1}{2} (\cos ( 2 \phi_2 + 4 \pi f t) + \cos ( -2 \phi_1 - 4 \pi f t)) + \cos(\phi_2 - \phi_1) + cos(4 \pi f t + \phi_1 + \phi_2 ) + 1 ] ```
    - ```- P(t) =  a^2 [ \frac{1}{2} \cos ( 2 \phi_2 + 4 \pi f t) + \frac{1}{2} \cos ( -2 \phi_1 - 4 \pi f t) + \cos(\phi_2 - \phi_1) + cos(4 \pi f t + \phi_1 + \phi_2 ) + 1 ] ```
    - **So**: this is a really ugly formula to give us *instantaneous* power.  Maybe it can be simplified.  Doesn't really matter bc we are interested in *average* power, and this lets us apply some big simplifications.
        - Any ```- \cos ``` term that has a ```- t ``` in it is 0-centered and on average will be 0!
    - so...
- ```- P_{avg}(t) = a^2 [ \cos (\phi_2 - \phi_1) + 1] ```
    - **sanity check**: if both signals are 180 degrees out of phase then the ```- \phi_2 - \phi_1 = \pi ```.  ```- \cos \pi = -1```, which makes ```- P_{avg}(t) = 0 ```.  Good!
- Now let's relate delay to gain (```- g ```).
    - ```- g_{dB} = 10 \log g```
        - this is 10 because we're using power, not instantaneous amplitude, the latter of which must be squared- which introduces the ```- 2 \cdot 10 ```
    - ```- g = \frac{P_1}{P_0} ```
    - ```- P_0 = \frac{a^2}{2} ``` by definition
    - ```- P_1 =  a^2 [ \cos (\phi_2 - \phi_1) + 1]``` 
    - ```- g_{dB} = 10 \log \frac{a^2 [ \cos (\phi_2 - \phi_1) + 1]}{\frac{a^2}{2}} ```
    - ```- g_{dB} = 10 \log \frac{[ \cos (\phi_2 - \phi_1) + 1]}{\frac{1}{2}} ```
    - ```- g_{dB} = 10 \log [2 ( \cos (\phi_2 - \phi_1) + 1) ] ```
    - ```- g_{dB} = 10 \log [2\cos (\phi_2 - \phi_1) + 2 ] ```
- **Final answer**: ```- g_{dB} = 10 \log [2\cos (\phi_2 - \phi_1) + 2 ] ```
    - This makes sense.  The gain will not depend on the amplitude but only on the delay, ```- \phi_2 - \phi_1 ```
- Here is a graph of the gain response for this sinusoidal comb filter: 
![gain response for sinusoidal comb filter](/resources/images/math/sinusoidal-comb-filter-gain-response.png)
    - Notice how it goes down to ```- - \infty ``` at 180 degrees?  That's because it's trying to take the log of 0, which is undefined.

- The actual puredata script which implements this is stored in another repo.
- Table of predicted vs observed results:

| Delay Amount (rad) | Predicted ```- G_{dB} ``` Change | Observed ```- dB ``` signal 1 | Observed ```- dB ``` signal 2 | Observed ```- G_{dB} ``` | Result |
| :---: | :---: | :---: | :---: | :---: | :---: | 
| 0 | 6 | 96.98 | 103.01 | 6 | Correct |
| ```- \frac{\pi}{2} ``` | 3.01 | 96.98 | 99.99 | 3 | Correct |
| ```- \pi ``` | ``` - \infty ``` | 96.98 | 0 | 0 | Correct |
| ```- \frac{3 \pi}{2} ``` | 3.01 | 96.98 | 99.99 | 3 | Correct |

## PostScript
- We've talked about a sinusoid's average power.  But how do you calculate powers of complicated, real-world signals?
    - For that matter, how do you go about building an audio meter?
    - At least in the digital world, this is going to require a sampling window.
- There are two types of meters:
    - Peak Meters -> measures Peak Amplitude
    - RMS Meters -> measures RMS Amplitude
- RMS Amplitude
    - You take the square root of the mean of the individual values squared.
    - The squaring removes the sign and gives an approximation of magnitude, while the square root tries to remove the slight magnitude distortion introduced by squaring it.    
    - RMS estimates the amount of voltage required to drive a signal of a given magnitude.
    - The peak amplitude of a typical sign wave is 1.  The average amplitude is 0.  The RMS amplitude is 0.71.
- Some sources:
    - [link 1](https://en.wikipedia.org/wiki/Root_mean_square)
    - [link 2](http://www.open.edu/openlearn/science-maths-technology/engineering-and-technology/technology/sound-music-technology-introduction/content-section-6.3)
    - [link 3](https://support.biamp.com/General/Audio/Peak_vs_RMS_Meters)
