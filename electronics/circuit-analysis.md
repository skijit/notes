Circuit Analysis
===============
- [Kahn Academy Course](https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic) on analyzing and understanding circuits.

## General Approach
- We want to relate the 3 basic types of components (Resistors (R), Capacitors (C), Inductors (L)) to Voltage (V) and Current (I).
![this is the alt title](/resources/images/electronics/Components.png)
- Voltage and Current then help us relate to Energy (U) (joules) and Power (P) (watts)
    - P = IV
    - P = ```- \frac{dU}{dt} ```
    - ```- U = \int_{t_0}^{t_x} I V dt ```

## Circuit Elements
- 3 passive circuit elements and their mathematical relationship to current (I)
1. Resistor (R = Resistance)
    - ```- V = IR ``` (Ohm's Law)
2. Capacitor (C = capacitance)
    - ```- I = C \frac{dv}{dt} ```
    - Current is proportional to the rate of change of the voltage
3. Inductor (L = inductance)
    - ```- V = L \frac{di}{dt} ```
    - Voltage is proportional to the time rate of change of the current
        - Note the similarity to the capacitance equation
- We draw these all such that current flows into the positive terminal
- These are **ideal components**.  Real world will have some variance.
- **Ideal Sources**
    - Ideal Voltage Source:
        - symbol is a circle
        - is a constant voltage
        - battery is a special case, with a special symbol
            - with a battery symbol, the long line = cathode, short line = anode 
        - example of a non-battery voltage source is a power supply (use a circle to diagram this)
    - Ideal Current Source:
        - Symbol is a circle with an arrow, pointing in direction of current flow
    - IV Plot is 2d graph with V as horizontal, I as vertical axes
        - Ideal Voltage is a constant, vertical line on the IV plot (since V doesn't change)
        - Ideal current is a constant horizontal line on the IV plot
- 2 types of Circuit elements
    - Sources
        - Provide energy to a circuit.
        - 2 types:
            - Voltage source
            - Current source
    - Components
        - Resistors
        - Capacitors
        - Inductors
- Sources and components all have 2 terminals
- *emf* (electromotive force), sometimes denoted *e*, also refers to a voltage source such as a battery or generator
- Variable voltage source
    - The voltage changes over time
    - Symbol is a circle with a squiggly, sinusoid inside it
- Constant Voltage Source
    - Has a fixed voltage, regardless of current which is drawn the connected components
        - This is an idealized assumption, but ok for now. 
- Constant Current Source
    - symbol is a circle with an arrow in direction of current flow
    - the voltage becomes whatever is required to push out that constant current
        - in reality, we have restrictions here, but in an idealized scenario this is no problem
- IV graph for Ohm's Law
    - Think of R as constant
    - The relationship between I and V is linear
    - When R is big: I is small, V is big
    - When R is small: V is small, I is big
- symbol for a resistor in the US and Japan is a zigzag, but a rectangle for UK, Europe, and elsewhere
- **Proof By Unit Analysis**: P = V I
    - Power (P) is the rate at which energy (U), measured in joules/sec or watts, is transferred
    - ```- P = \frac{dU}{dt} ```
    - Voltage is the energy transfer per unit of charge: ```- V = \frac{dU}{dq} ``` where q is the total charge
    - Current is the rate of flow of charge: ```- I = \frac{dq}{dt} ```
    - ```- P = \frac{dU}{dt} =   \frac{dU}{dq} \cdot \frac{dq}{dt} = V \cdot I ```
- Power is dissipated by a resistor when current flows through it.
    - In other words, some energy is converted to heat as the electrons collide with atoms in the resistor
- The charge on a capacitor relates to the voltage across the capacitor
    - ```- Q = CV ```
    - Q is the charge (in coulombs)
    - C is a constant, the capacitance property of the capacitor measured in Farads (coulomb/volts)
    - V is voltage
- We already know that ```- I = \frac{dq}{dt} ``` (i.e. the flow of charge over time)
    - taking the derivative on both sides of ```- Q = CV ```:
        - ```- \frac{dq}{dt} = C \frac{dv}{dt} = I = C\frac{dv}{dt} ```
        - ```- I = C\frac{dv}{dt} ```
    - So the current in a capacitor is proportional to the change in voltage across a capacitor
- Capacitors are a little more tricky:
    - Compared to the resistors dependence on I and V (via Ohm's law), the capacitor cares about the rate of change!
    - Rather than relating capacitance to I, we could relate it to V:
    - ```- I = C\frac{dv}{dt} ``` so ```- \frac{dv}{dt} = \frac{1}{C} I ``` and ```- dv = \frac{1}{C} I dt ``` so...
    - ```- V = \frac{1}{C} \int_{-\infty}^{T} I dt ```
        - This means that the voltage across the capacitor depends on all the charge that has **ever** flowed across it, but practically we relate that to some known time (```- t_0 ```):
        - ```- V = \frac{1}{C} \int_{t_0}^{T} I dt + v_0 ```
- Voltage across an inductor is proportional to the rate of change of current across it:
    - ```- V = L \frac{di}{dt} ```
- The inductor stores energy in a magnetic field.  This energy can returns to the circuit by generating a current.
- L is the inductance, and the unit of inductance is called the Henry (H)
- **Parasitic Effects**
    - This is when an inductor, resistor, or capacitor displays properties of another component type- typically this a minute effect
        - Ex: A resistor showing some inductance
    - Happens bc it is impossible to construct an absolute, ideal component
    - Usually, but not always, these effects are negligible
- Inductors:
    - Electrical current running in a wire creates a magnetic field surrounding the wire.
    - If the wire is coiled up, then the field is concentrated in the interior of the coil.
    - A changing magnetic field creates an electric field, which induces current
    - So you have energy stored in a magnetic field, with current inducing a magnetic field, and vice versa.
    - ```- V = L \frac{di}{dt} ```
    - Inductors usually have to be pretty big
        - This is why you rarely see an inductor in an integrated circuit
- Circuit Terminology
    - Element includes
        - Components
        - Sources
    - Node 
        - is a junction between two (or more) components
        - Identify them by starting at the output of an element, and anywhere you can trace to without going through another element, is one node.
        - Node can involve more than 1 wire
        - You need to have the same current everywhere on the node
        - You can have a 'distributed node' which is spread out over a wide area
    - Branch connects different nodes together
        - Branch
    - Mesh
        - A mesh is a loop that has no other loops inside it.
            - Basically the simplest, atomic, loops in the circuit
        - Relating to a window screen, a mesh is like individual hole in the screen
            - Its like the windows of open space in our circuit
    - Loop:
        - intuitive notion is basically correct however...
        - a loop can visit (pass through) a node once.
        - typically refers to the loops which are not meshes
    - Reference node:
        - To measure any voltage, we pick one standard 'reference node' to measure against.
        - Typical choices for reference node are:
            - negative terminal of the voltage source
            - the node connected to the greatest number of branches
        - Reference node is generally the same as 'ground'
    - Schematic Equivalence
        - A real circuit and a schematic (or multiple schematics) are equivalent IFF:
            - Represent the same elements
            - Same number of nodes
            - Each node must be connected to the same branches
        - **HUGE GOTCHA**
            - The lines in a schematic diagram do not necessarily represent the specific point-to-point order of the connections the corresponding real circuit might have. 
            - The schematics capture the nodes and elements interconnections, but NOT the specific sequence.
- Schematic Best Practices
    - Inputs on left, outputs on right
    - Info should flow from left to right
    - Higher voltage nodes should be up top, lower towards the bottom
- Sign Convention For Passive Components
    - Passive components
        - do not create power
        - do not amplify a signal
        - Batteries are generally creating power, but they cannot amplify a signal, so we often refer to them as passive.
            - They cannot raise the voltage beyond where it is
    - There's a convention for how you apply/label the sign (positive/negative) for current and voltages values in a schematic.
        - The sign matters because it indicates the direction current is flowing or whether voltage has increased or decreased.
        - It's useful to talk about positive and negative currents and voltages
        - Ohm's law defines the relationship between current, voltage, and resistance for passive components.  But it would be a lot less useful if we could not factor the polarity of these values as well.
    - Current (i)
        - The direction of current flow is a straight arrow pointing from the positive end to the negative end
        - When you have a positive i, that means current is flowing in the direction of the arrow.
        - Converserly, negative means current is flowing in the opposite direction of the arrow.
    - Voltage (v)
        - The direction of voltage is a curved arrow from negative to positive, indicating that the positive side has a higher voltage.
        - A positive voltage amount means that the voltage at the + side is greater than the negative amount.
        - A negative voltage amount means that the voltage at the + side is less than the negative amount.
    - If you don't want to draw the arrows, you can just label each side of a component with a '+' and a '-' and that will all make sense.
    - There are different ways for labelling the current direction coming from a voltage source.
        - Probably the best is to leave that part out.
        - But if you follow the Sign Convention, don't worry if you have a negative current:
            - In a voltage source, you want current to flow OUT of the positive, which is the opposite of how other passive components are handled. 
    - Sometimes you'll analyze a circuit without knowing how to label the signs
        - That's ok!  It's only a convention.
        - *As long as you are consistent* between the schematic and how you represent it in the formulas (e.g. using Kirchoff's Voltage Laws), it will all work out.
    - **THIS MIGHT ALL MAKE MORE SENSE ONCE I START ANALYZING CIRCUITS**
    
## Resistor circuits
- [Link](https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-resistor-circuits/v/ee-series-resistors)
- **Resistors in a series** 
    - example: 3 resistors stacked head to tail
    - they share the **SAME CURRENT**
    - We don't know the individual voltage drops at each resistor
    - Can we replace the 3 resistors with a single resistor?
        - yes: we know the individual voltage drops and they add up to the voltage source:
            - ```- V_{source} = v_1 + v_2 + v_3 ```
        - each individual voltage drop is given by Ohm's law:
            - ```- v_1 = I \cdot R_1 ```
        - put these 2 facts together by applying Ohm's law to the circuit as a whole:
            - ```- V_{source} = I \cdot (R_1 + R_2 + R_3)```
        - So you can replace the series of resistors with a single resistor, given by:
            - ```- R_{S} = R_1 + R_2 + R_3 ```
    - **GOTCHA**: Consider the following-
    ![this is the alt title](/resources/images/electronics/SeriesResistorGotcha.png)
    - When you have some resistors which are in series, but there's a branch off... you don't necessarily have the same current running through each node.
        - If the same current isn't running through, then they're not in series.
    - The current is only the same if the current on each of those branches is 0 amps
        - If the impedance/resistance of that component is super-dooper high (as is often the case with sensor ports) then it's basically a zero current and so you can consider the resistors in series.

### Resistors in parallel
- Two components which share two (or more) nodes are in parallel with each other
- Regardlesss of series/parallel: voltage is uniform in a node.
![parallel-resistors-1](/resources/images/electronics/parallel-resistors-1.svg)
- Based on this parallel resistor circuit, we know:
    - The same voltage, ```- v ``` appears across each resistor
        - Applying Ohm's law to the individual voltages: 
        - ```- v = i_{R1} \cdot R1 ``` and therefore  ```- i_{R1} =  v / R1 ```
        - ```- v = i_{R2} \cdot R2 ``` and therefore  ```- i_{R2} =  v / R2 ```
        - ```- v = i_{R3} \cdot R3 ``` and therefore  ```- i_{R3} =  v / R3 ```
    - There's a different current running through each resistor
        - but because a circuit is a closed system, we know the individual currents will add up to the source's current 
        - ```- i = i_{R1} + i_{R2} + i_{R3} ```
    - Substituting a bit:
        - ```- i = v / R1 + v / R2 + v / R3 = v (1/R1 + 1/R2 + 1/R3) ```
        - We already know ```- i ``` as it is given by the current source.  So we solve for ```- v ```
        - ```- v = i \left( \frac{1}{1/R1 + 1/R2 + 1/R3}\right) ```
    - **Interesting Takeaway**
        - This last result looks like Ohm's law where ```- R_{total} = \frac{1}{1/R1 + 1/R2 + 1/R3} ```
        - For resistors in parallel, the overall resistance is the reciprocal of the sum of reciprocals of the individual resistors.
        - **Another surprise**: In general, the total resistance, ```- R_{total} ``` will be less than the smallest of the individual resistors! 
- Special case: 2 resistors in parallel:
    - ```- R_{total} = \frac{R_1 \cdot R_2}{R_1+R_2} ```
- Another special case: 2 of the **same** resistors in parallel:
    - ```- R_{total} = 1/2 \cdot R ```

- **Summary of resistor circuits**
    - series or parallel are just two special types of configurations that two (or more) connected components may have.
        - **It's not a dichotomy**: You can have connected components that are **neither serial nor parallel**
        - The significance of series and parallel is that they give us tools to decompose circuits into simpler representations (e.g. replacing multiple resistors with a single equivalent resistor.)
    - resistors in series: Same current 
    - resistors in parallel: Same voltage
    - Current is conserved due to a circuit being a closed system.
        - Current distributes among parallel resistors with the largest current flowing through the smallest resistor.  

### Parallel Conductance
- We know ```- R_{parallel} = \frac{1}{1/R1 + 1/R2 + 1/R3} ```, but this is double reciprocal thing is a pain.
    - Conductance can help...
- Ohm's Law states ```- R = \frac{v}{i} ```
- Conductance (G) is the inverse of R: ```- G = \frac{i}{v} ```
- Ohm's law restated with conductance: ```- i = v \cdot G ```
- Unit of conductance is the siemens (S)
- While resistance impedes current flow, conductance allows current to flow.
- A 1 ```- \Omega ``` resistor has a conductance of 0.01 S
- **Cutting to the chase**: Conductances in parallel are just like Resistances in series.  They add.
    - ```- G_{parallel} = G_1 + G_2 + G_3 ```


### Simplifying Resistor Networks
- Method:
    - Begin as far away from the circuit location of interest (in this case, the voltage source).
    - Moving left, replace series or parallel resistors with equivalent resistance.

![resistor-network simplification](/resources/images/electronics/resistor-network-1.svg)
- These resistors can be combined serially. Like so..
![resistor-network simplification](/resources/images/electronics/resistor-network-2.svg)
![resistor-network simplification](/resources/images/electronics/resistor-network-3.svg)
- These are two parallel, and the same values, so we can use ```- R_{total} = 1/2 \cdot R ```.
![resistor-network simplification](/resources/images/electronics/resistor-network-4.svg)
![resistor-network simplification](/resources/images/electronics/resistor-network-5.svg)
- Now another serial combination...
![resistor-network simplification](/resources/images/electronics/resistor-network-6.svg)
![resistor-network simplification](/resources/images/electronics/resistor-network-7.svg)
- Now a big parallel combination.
- ```- R_{total} = \frac{1}{1/R1 + 1/R2 + 1/R3} = \frac{1}{1/6 + 1/4 + 1/12} = \frac{1}{6/12} = 2 \Omega ``` 
![resistor-network simplification](/resources/images/electronics/resistor-network-8.svg)
![resistor-network simplification](/resources/images/electronics/resistor-network-9.svg)
- Finally, one last serial combination.
![resistor-network simplification](/resources/images/electronics/resistor-network-10.svg)
![resistor-network simplification](/resources/images/electronics/resistor-network-11.svg)
- Not all simplifications get down to a single resistor at the end.
    - Sometimes a different strategy, such as the Delta Wye Transformation, is required.

### Delta-Wye Resistor Networks
![delta-wye simplification](/resources/images/electronics/delta-wye.svg)
- The 'Delta' and 'Wye' are references to how the schematics resemble the shape of the letters ```- \Delta ``` and ```- Y ```.
- The transformation lets you replace 3 resistors in the ```- \Delta ``` formation with the ```- Y ``` shape and vice versa.
- Typically, you don't see schematics drawn this way, so an equivalent formation is the ```- \pi ``` - ```- T ``` configuration.
![pi-t simplification](/resources/images/electronics/pi-t.svg)
![delta-wye simplification](/resources/images/electronics/delta-wye-1.svg)
- The derivation for these transformation rules is based on putting 3 sets equations together, the first of which is shown here.
    - Assume no current is flowing through terminal z (on the ```- \Delta ``` and ```- Y ``` sides )
    - ```- \Delta ``` side: resistance from *x* to *y* is ```- R_c ``` in parallel with ```- R_a + R_b ```
    - ```- Y ``` side: resistance from *x* to *y* is ```- R1 + R2 ```
    - Therefore ```- R1 + R2 = \frac{R_c \left(R_a + R_b \right)}{R_c + \left(R_a + R_b \right)} ```
- ```- \Delta - Y ``` Transformation
    - Transforming from ```- \Delta ``` to  ```- Y ``` introduces one additional node.
    - ```- R1 = \frac{R_b R_c}{R_a + R_b + R_c }```
    - ```- R2 = \frac{R_a R_c}{R_a + R_b + R_c }```
    - ```- R3 = \frac{R_a R_b}{R_a + R_b + R_c }```
- ```- Y - \Delta ``` Transformation
    - Transforming from ```- \Delta ``` to  ```- Y ``` removes one additional node.
    - ```- R_a = \frac{R1 R2 + R2 R3 + R3 R1}{R1}```
    - ```- R_b = \frac{R1 R2 + R2 R3 + R3 R1}{R2}```
    - ```- R_c = \frac{R1 R2 + R2 R3 + R3 R1}{R3}```
- **Example**
![delta-wye simplification](/resources/images/electronics/delta-wye-2.svg)
- **YIKES!** There are no resistors in series OR parallel
- But we can redraw the circuit to show there are two ```- \Delta ``` formations, either of which can be converted to a ```- Y ```
![delta-wye simplification](/resources/images/electronics/delta-wye-3svg.svg)
- Now we relabel the resistors and nodes, but be careful to keep them straight
![delta-wye simplification](/resources/images/electronics/delta-wye-4.svg)
- The new node structures looks like this...
![delta-wye simplification](/resources/images/electronics/delta-wye-5.svg)
- The calculations are as follows:
    - ```- R1 = \frac{R_b R_c}{R_a + R_b + R_c } = \frac{5 \cdot 3}{4 + 5 + 3} = 1.25 \Omega ```
    - ```- R2 = \frac{R_a R_c}{R_a + R_b + R_c } = \frac{4 \cdot 3}{4 + 5 + 3} = 1 \Omega```
    - ```- R3 = \frac{R_a R_b}{R_a + R_b + R_c } = \frac{4 \cdot 5}{4 + 5 + 3} = 1.66 \Omega```
![delta-wye simplification](/resources/images/electronics/delta-wye-6.svg)
- This can be redrawn as such...
![delta-wye simplification](/resources/images/electronics/delta-wye-7.svg)
- And now it's obvious how we reduce this...
![delta-wye simplification](/resources/images/electronics/delta-wye-8.svg)
- ```- \left( \frac{4.375 \cdot 5}{4.375 + 5} \right) + 1.66 = 4 \Omega ```

### Voltage Divider
![voltage-divider-1](/resources/images/electronics/voltage-divider-1.svg)
- A voltage divider takes an input voltage and runs it through *series* (almost- read on for more) resistors to step down the voltage
    - This can then be used to bring an input voltage into better range for subsequent components
- Assume that zero current is exiting the node between the two resistors
    - Voltage divider needs to be connected to something to be useful, so it doesn't make sense to assume no current exits the node between the resistors.  **BUT** for now, we'll accept this contradiction.
![voltage-divider-1](/resources/images/electronics/voltage-divider-2.svg)
- This effectively places R1 and R2 in series, as they have the same current
- With Ohm's Law and R1&R2 in series, we can express the current as:
    - ```- i = v_{in} \frac{1}{R1 + R2} ```
- ```- v_{out} ``` is the voltage from the divider.  It can be expressed as:
    - ```- v_{out} = i R2 ```
    - We can express this in purely voltage terms:
    - ```- v_{out} = v_{in} \left( \frac{R2}{R1 + R2} \right)  ```
- So the voltage is the input voltage scaled by a ratio of the two resistors
    - The ratio is always less than once, so ```- v_{out} ``` is always less than ```- v_{in} ```
    - Hence the term *voltage divider*
- With matched resistors, the ```- v_{out} ``` will be equal to ```- 0.5v_{in} ```.
    - **Why?**
    - Remember that ```- v_{out} ``` is the voltage measured between the two nodes exiting on the right of the circuit.
    - In series, the resistances are summed, and if you measure the voltage between the the node between the resistors (which has only been through 1 resistor) against the voltage on the node which has been through 2 resistors, you'd expect there to be a 1/2 differential.
- **Back to Reality**
    - Assuming we do have a load running off the voltage divider, does the voltage divider formula (```- v_{out} = v_{in} \left( \frac{R2}{R1 + R2} \right)  ```) break down?  And if so, by how much?
![voltage-divider-1](/resources/images/electronics/voltage-divider-3.svg)
- **Case 1**: 
    - Assume: 
        - ```- R1 = R2 ```
        - ```- R_L = 10 R1 ``` 
    - ```- R_L ``` and ```- R2 ``` are in parallel with each other.  Thus...
        - ```- R_L \parallel R2 = \frac{R_L \cdot R2}{R_L + R2} = \frac{10R2 \cdot R2}{10R2 + R2} = 0.91 R2 ```
![voltage-divider-1](/resources/images/electronics/voltage-divider-4.svg)
- The 10x load has the effect of reducing R2's resistance by 91%.
- What effect does this have on the voltage divider formula?  Is it still valid?
    - ```- v_{out} = v_{in} \left( \frac{R2}{R1 + R2} \right) = v_{in} \left( \frac{0.91R2}{R1 + 0.91R2} \right) ```
    - Since ```- R1 = R2 ```, they cancel out: ```- v_{out} = v_{in} \frac{0.91}{1 + 0.91} = 0.48v_{in} ```
    - The output voltage drops from ```- 0.5v_{in} ``` to ```- 0.48v_{in} ```.  
    - 0.48/0.5 = 0.96 = 96% 
    - **THUS** 
        - The voltage divider output is 4% less with a resistance 10x the individual resistors (with matched resistors).  
        - The original voltage divider function is **Wrong** by 4%.
        - This is the behavior we expect when operating the voltage divider near it's midpoint (as ```- v_{out} / v_{in} ``` is ```- \approx ``` 0.5  )
- What about operating the voltage divider at it extremes (say, ```- v_{out} / v_{in} \approx 0.1 ``` and  ```- v_{out} / v_{in} \approx 0.9 ```  )
- **Case 2**:
    - Assume:
        - ```- R_L = 10 R1 ```
        - ```- R2 ``` does not have to be the same as ```- R1 ```
        - ```- v_{out} / v_{in} = 0.9 ```
    - ```- v_{out} = v_{in} \left( \frac{R2}{R1 + R2} \right) ```
    - ```- v_{out} / v_{in} = \frac{R2}{R1 + R2} = 0.9 ```
    - ```- 0.9R1 = R2  - 0.9R2 = 0.1R2 ```
    - ```- R2 = 9R1 ``` **So** R2 is 9x larger than R1!
    - From **case 1** which assumed ```- R_L ``` to be 10x R1, we derived that: ```- v_{out} / v_{in} = \frac{0.91R2}{R1 + 0.91R2} ```
    - Now we can sub in ```- R2 = 9R1 ```, so ```- v_{out} / v_{in} = \frac{0.91(9R1)}{R1 + 0.91(9R1)} = 0.89 ```
    - So the ideal ```- v_{out}/v_{in} = 0.9 ```, the actual ```- v_{out}/v_{in} = 0.89 ```.  0.89 / 0.9 = 1% error!
- **Case 3**
    -  Assume:
        - ```- R_L = 10 R1 ```
        - ```- R2 ``` does not have to be the same as ```- R1 ```
        - ```- v_{out} / v_{in} = 0.1 ```   
    - Following the same procedure, we get a percent error of **9% **
- **Summary**
    - With a ```- R_L = 10R1 ```:
        - At midrange (```- v_{out}/v_{in} = 0.5 ``` output), error percent approx 5%
        - At upper-range (```- v_{out}/v_{in} = 0.9 ``` output), error percent approx 1%
        - At bottom-range (```- v_{out}/v_{in} = 0.1 ``` output), error percent approx 9%
    - If you need smaller errors:
        - Increase the resistance of ```- R_L ``` relative to ```- R1 ``` and ```- R2 ```
            - Increase resistance of ```- R_L ```
            - Or decrease resistances of ```- R1 ``` and ```- R2 ```, although this will increase the power dissipation of the circuit as more amps will be flowing through it.


## DC Circuit Analysis
- Circuit analysis means determining current and voltages in circuit elements.
- Tools include:
    - Element equations (Ohms Law, etc)
        - Recall that elements = { Components, Sources }
        - Sources = { Voltage Source,  Current sources }
        - Components = { Resistors, Inductors, Capacitors }
    - Schematics (wires, nodes, branches, loops, and meshes)
    - Simplifying series and parallel resistors
    - Kirchoff's Laws for Current and Voltage
- Basic Strategy:
    - Create a set of independent equations based on elements and circuit connections
    - Solve the systems of equations (i.e. via linear algegra)
    - Solve the remaining individual element voltages and currents
- 3 separate methodologies:
    1. Direct application of Ohm's and Kirchoff's laws
        - good for simple circuits
    2. Node Voltage Method
        - less simultaneous equations than method 1
    3. Mesh Current Method 
        - Also it's cousin: Loop Current method
        - less simultaneous equations than method 1

### Kirchoff's Laws
- Kirchoff's Laws for Current (KCL) and Voltage (KVL) deal with the net input/output of current and voltage drops in a circuit's nodes or loops.
    - more specifically:
        - KCL is about nodes
        - KVL is about loops
- Kirchoff's Current Law: The sum of all currents flowing into a node is zero   
    - ```- \sum_{n} i_n = 0```
    - or you could redefine it as the sum of all currents flowing into a node equal the sum of all currents flowing out of a node.
        - ```- \Sigma i_{in} = \Sigma i_{out} ```
![kirchoff-current](/resources/images/electronics/kirchoff-current-1.svg)
- In this image, ```- i_5 ``` is going to be -6 mA.
    - Note how the current arrow directions and KCL determine whether the amp is labelled positive or negative.
    - In this example, ```- i_3 ``` must be 0 mA
![kirchoff-current](/resources/images/electronics/kirchoff-current-2.svg)
- **One way to analyze a circuit**
![kirchoff-current](/resources/images/electronics/dc-1.svg)
- In this series circuit, we can determine the current by adding the total resistance and applying Ohm's Law
- This gives us a current of 20mA
- From this we can calculate the individual voltage drops
![kirchoff-current](/resources/images/electronics/dc-2.svg)
- ```- v = i \cdot R ```
    - ```- v_{R1} = 20 \cdot 100 = +2 V ```
    - ```- v_{R2} = 20 \cdot 200 = +4 V ```
    - ```- v_{R3} = 20 \cdot 300 = +6 V ```
    - ```- v_{R4} = 20 \cdot 400 = +8 V ```
- This gives us the following, completed circuit diagram:
![kirchoff-current](/resources/images/electronics/dc-3.svg)
- **Another way to solve the circuit**
    - this leads to Kirchoff's Voltage Law (KVL)
    1. Pick a starting node
    2. Pick a direction to travel
    3. Walk around the loop:
        - Accumulate voltages
        - If you encounter a voltage rise, add it.
        - If you encounter a voltage drop, subtract it.
        - Alternately worded, you can add all the voltage changes, but just make the drops as a negative voltage rise.
    4. The sum of voltages should be zero.
![kirchoff-current](/resources/images/electronics/dc-3.svg)
- ```- V_{loop} = +20V - 2V - 4V - 6V - 8V ```
- Sometimes the voltage polarity arrows on resistors might be a little strange, but as long as you're consistent, it all works out.
- Kirchoff's Voltage Law is:
    -  ```- \sum_{n} v_n = 0```
    - The sum of voltages around a **loop** is 0
        - Of course, a circuit is a loop too.
    - Phrased differently...
        - ```- \sum v_{rise} = \sum v_{drop}```


    

- [Continue here](https://www.khanacademy.org/science/electrical-engineering/ee-circuit-analysis-topic/ee-dc-circuit-analysis/a/ee-circuit-analysis-overview)



