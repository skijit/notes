Electricity Fundamentals
==============
- Some [good tutorials](https://learn.sparkfun.com/tutorials/tags/concepts)

## What is Electricity
- [Source](https://learn.sparkfun.com/tutorials/what-is-electricity)

## Voltage, Current, Resistance

- [Source](https://learn.sparkfun.com/tutorials/voltage-current-resistance-and-ohms-law)
- Electricity is the movement of electrons
- Electrons create charge
- **Voltage**: the **difference** in charge between 2 points
- **Current**: the **rate** at which charge is flowing
- **Resistance**: a material's tendency to **resist** current (ie the **flow of charge**)
- So these 3 properties really involve the movement of charge
- **Circuit**: closed loop that allows charge to move from one place to another
- We put components in a circuit to control the movement of charge and let it do useful work for us
- Voltage
    - The amount of potential energy between two points on a circuit
        - In any moment, one point will have more charge than another
- Analogy to Water Tank
    ![analogy](/resources/images/programming/electricity-analogy-1.png)
    - **Charge** : Water in the tank
        - Coulomb (C)  (1 C = ```- 6.241*10^{18}``` electrons )
    - **Current** (I): The flow of water
        - Amperes (A) (Coulombs / sec passing through a point in a circuit)
    - **Voltage** (V): Pressure (at the end of the hose leading out of it)
        - Volts (V)
    - **Resistance** (R): Hose width
        - Ohm (```- \Omega```) : 1 Ohm is the resistance between 2 points in a conductor where application of 1V will push 1 Amp .
    - More water in the tank, means more charge.  And it means there's more pressure in the hose (i.e. higher voltage)
    - **Scenario 1:  Battery**:
        ![analogy](/resources/images/programming/electrical-analogy-2.png)
        - If we reduce the amount of water in the tank, that means pressure goes down.  This is like the decreasing amount of charge in a battery leads to a smaller amount of voltage, which for example, make a flashlight's bulb dim.
            - Just as a battery loses charge, it also loses voltage.
    - **Scenario 2: Current**
        ![analogy](/resources/images/programming/electrical-analogy-3.png)
        - Take two tanks with the same amount of water, but different sized hoses.
        - Pressure (Voltage) is the same
        - Flow (current) will be less in the narrow hose
        - To equalize flow (current) between the two, you'll need to increase the amount of water (charge) in the tank with the narow hose.
            - This increases pressure (voltage) which increases flow (current)
        - Typically: Higher pressure means higher flow (and vice versa)
    - **Scenario 3: Resistance**
        - Restricting the width of the hose is like adding resistance to the circuit

### Resistance
- Ohm's Law states the relationship between Volts, Current, and Resistance
```+ V = I \cdot R```
-  Voltage (V) is proportional to Current (I)
- But since Current and Resistance are on the same side of the equation, all things being equal, they will be inversely proportional
- **Common Application in Electronics**:
    - Components, such as LED's, etc., will have a currrent rating (e.g. 20 mA or 0.020 amps).  You'll need to add the proper resistor (graded in Ohms) to bring the current into the proper range.  
        - This can be calculated, of course, with Ohm's Law
        - The resistor will affect R of the whole circuit, and in many cases, where it is placed (i.e. before or after a particular component) is not so important.  BUT, in some circuits, it does matter where you place the component.  For more information, look into **[Kirchoff's Voltage Laws](http://www.facstaff.bucknell.edu/mastascu/elessonshtml/basic/basic5kv.html)**

## Electric Power
- [source](https://learn.sparkfun.com/tutorials/electric-power)

## What is a circuit
- [source](https://learn.sparkfun.com/tutorials/what-is-a-circuit)

## Series vs Parallel
- [source](https://learn.sparkfun.com/tutorials/series-and-parallel-circuits)

## Batteries
- [source](https://learn.sparkfun.com/tutorials/what-is-a-battery)

## AC vs DC
- [source](https://learn.sparkfun.com/tutorials/alternating-current-ac-vs-direct-current-dc)

## Polarity
- [source](https://learn.sparkfun.com/tutorials/polarity)

## Switches
- [source](https://learn.sparkfun.com/tutorials/switch-basics)

## Voltage Dividers
- [source](https://learn.sparkfun.com/tutorials/voltage-dividers)

## PCB Basics
- [source](https://learn.sparkfun.com/tutorials/pcb-basics)

## Pulse Width Modulation
- [source](https://learn.sparkfun.com/tutorials/pulse-width-modulation)

## Accelerometers
- [source](https://learn.sparkfun.com/tutorials/accelerometer-basics)

## Selecting the Right Motors
- [source](https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one)

## TODOS - Clarify
- LED's are *non-ohmic*.  Current flowing through it does not follow Ohm's law.  It induces a *Voltage Drop* (?) 
- See note above about Kirchoff's Voltage Laws