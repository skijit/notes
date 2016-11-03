Electricity Fundamentals
==============
- Some [good tutorials](https://learn.sparkfun.com/tutorials/tags/concepts)

## What is Electricity
- [Source](https://learn.sparkfun.com/tutorials/what-is-electricity)
- Electricity is the flow of electric charge
- In the Bohr Model of the Atom, a stable atom will have the same number of electrons as it has protons.
- Electrons in an outer orbit of the nucleus are called **valence electrons** and with sufficient outside force, they can escape their orbit and become **free electrons**.
    - Free electrons let us move charge around, which is what electricity is all about
- Charge is a quantifiable property of matter, just like mass, density, etc.
    - Charge comes in two types: Positive (+) and Negative (-)
    - Electrons -> negative, Protons -> Positive
    - The charge type of protons and electrons is important bc this is what lets us exert a force on them
- Electrostatic Force
    - Also called Coulomb's law
    - ```- F = k_e  \frac{q_1 q_2}{r^2} ```
        - Calculates the force between two charged particles where ```- k_e``` is Coulomb's constant, ```- q_1``` and ```- q_2``` are the signed charges, and r is the distance between the charges.
    - Opposite's attract, like's repel
    - Inverse square law, like gravity
    - This force helps *glue* the atom together and also to get charge flowing...
- You can use electrostatic force to turn valence electrons into free electrons
    - Valence electrons are most easily converted to free electrons bc their outer orbit means less attraction to the nucleus than others.
    - You can free them by using other electrons to repel them, or attract them via external atom's protons
- Current is able to flow in a conductor because it doesn't hold on to it's electrons very tightly
    - Current is essentially a chain-reaction of freed electrons which bounce to another atom, in the process freeing another valence electron, and so forth.
- Examples of insualtors include glass, rubber, plastic and air
- **Static Electricity**
    - In electronics, we typically focus on a different kind of electricity: **Current Electricity**
    - Static electricity exists when there's a build up of charge on two materials separated by an insulator
    - This electricity exists **until** the charges find a way to equalize, causing a **static discharge**
        - Note the difference between static electricity and electrostatic discharge (ESD)!
    - Static discharge happens when the charge differential becomes so great the attraction can overcome the insulator's tendency to keep it's electrons.
        - When the discharge occurs across and insulator like air, the electrons in air become excited and release energy in the form of light.
    - Static electricity can be induced by rubbing two materials together: the object that loses electrons will become positively charged and the object that gains them, negatively.
    - When working with electronics, the main consideration about static electricity is to prevent a discharge:
        - You can wear ESD bracelets
        - Or add components to circuits that protect against spikes in the charge
- **Current Electricity**
    - As opposed to static electricity which is at rest, current electricity is dynamic.
    - Current electricity exists when charges are able to constantly flow
    - In order to flow, current electricity requires a circuit: a closed loop of conductive material
- **Electric Fields**
    - Electric fields often induce the flow of electrons
    - **Field**
        - A tool to model physical interaction which don't involve any observable contact
        - Just as a gravitational field exerts a force on objects of mass, electric fields exert force on objects of charge.
    - An electric field (E-Field) is just the realization in space of Coulomb's Law
        - Per Wikipedia, An electric field is a vector field that associates to each point in space the Coulomb force experienced by a test charge.
    - Any charged object will create an E-field (proton or electron)
    - The idea of a test charge is this:
        - To determine the direction of force in an E-Field, you imagine dropping a positively charged (but the charge has to be infinitely small) into a field and you imagine the direction the charge would move.
- **Electric Potential Energy**
    - stored energy of a circuit is it's electric potential energy
    - a charge has electric potential energy as you (doing work) move it counter to the direction of the E-Field it's in:
        - moving a proton away from a field electrons
        - pushing a proton into a field of other protons
        - etc.
    - so, electric potential energy is based on the direction of the E-field and it is presumably zero'd out based on Coulomb's force being zero, which is dependent on the distance and charges of the objects.
- **Electric Potential**
    - Different from Electric Potential Energy
    - Electric Potential Energy includes the charges and position in a field, HOWEVER...
    - Electric Potential takes the charge quantity out of the equation by dividing electric potential energy by the charges
    - It tells us how much potential energy specific areas of the electric field may provide
    - Unit of measurement is the Volt
    - In any electrical field, there are 2 main points of interest:
        - point of high electric potential
        - point of low electric potential
    - Voltage is the difference in electric potential between two points in an electric field
        - It tells us how much pushing force (or pressure?) an electric field has
- **Putting it Together**
    - Charges in a circuit are propelled by an electric field
        - Electric field is the realization in space of electrostatic force (Coulomb's Law), aggregated across all charges 
        - The field exists in all space surrounding the charges, regardless of material
        - Remember that with conductors, it just takes less energy to free those electrons
        - We need a source of electric potential (Voltage) which (does work) pushes electrons from a low potential to a high potential.
        - A battery will create voltage because one end is highly positively charged, whereas the other is highly negatively charged.
        - The E-Field created from this difference is sufficiently powerful to move elctrons in the circuit
    - Typically, an electric circuit will transfer electric energy into some other form of energy: light, heat, motion, etc.

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
        - Volts (V): (Joule/Coulomb)
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
- Other Analogies
    - The water tank analogy makes it hard to visualize the difference between current and voltage.
    - **Highway Analogy**
        - Conductor: Highway
        - Resistance: width of highway (number of lanes)
        - Current: Amount of cars passing a point in the highway per sec
        - Voltage: Speed of the cars
        - **Problems**:
            - Density of electrons is always the same
            - Speed of electrons is always the same
    - **Improved Highway Analogy**
        - Bumper cars (electrons) on a highway that is filled with trees
        - Cars are pulled through the highway by a battery at the end via bungee cords (electrostatic)
        - Voltage is the tension in the bungee cord.  Cars will always goes the same speed (speed of light in the given substrate), but the force of the collision is stronger.
        - resistance: the width of the highway
        - Current: amount of cars passing a point per sec
### Resistance
- Ohm's Law states the relationship between Volts, Current, and Resistance
```+ V = I \cdot R```
- Voltage (V) is proportional to Current (I), mediated by Resistance (R)
- But since Current and Resistance are on the same side of the equation, all things being equal, they will be inversely proportional
- **Common Application in Electronics**:
    - Components, such as LED's, etc., will have a currrent rating (e.g. 20 mA or 0.020 amps).  You'll need to add the proper resistor (graded in Ohms) to bring the current into the proper range.  
        - This can be calculated, of course, with Ohm's Law
        - The resistor will affect R of the whole circuit, and in many cases, where it is placed (i.e. before or after a particular component) is not so important.  BUT, in some circuits, it does matter where you place the component.  For more information, look into **[Kirchoff's Voltage Laws](http://www.facstaff.bucknell.edu/mastascu/elessonshtml/basic/basic5kv.html)**
- Impedance vs Resistance
    - Both Resistance and Impedance are measured in Ohms
    - Both Resistance and Impedance measure the opposition to electrical flow
    - In an AC circuit, there are two categories for opposition to current: Resistance and Reactance.
    - In an AC circuit, Impedance is the combinatino of Resistance and Reactance
    - DC, has no reactance, so they'll just measure it as Resistance

    

## Electric Power
- [source](https://learn.sparkfun.com/tutorials/electric-power)
- Power is the energy transfer/transform over time
- Example energy transfers in a circuit:
    - Lighting LED's: electric -> electromagnetic energy
    - Spinning motor: electric -> mechanical energy
    - Soundin a buzzer: electric -> sound energy
    - Battery power: chemical -> electric energy
- Energy is measured in Joules (J)
- Power is measured in Watts (W).
    - ```- W = J / sec```
- Unit analysis:
![electrical power unit analysis](/resources/images/programming/electrical-power-unit-analysis.png)
- ```- P = V \cdot I```
- V and I both relate to Coulomb (Charge).  
    - Power puts I and V together to abstract away from charge and to see the amount of work that can be done over time.
- Another way to look at it is to start with I (the current flowing through the circuit), now you want to characterize that by the pressure (V) in the system.
- Resistor transforms electric energy into heat
    - if you know the voltage of the power source and the resistance of the resistor, you can calculate I
    - then you can calculate power, which is the amount of electrical energy transformed as heat by the resistor every second
- Other derivations of Power formula:
- ```- P = V^2 / R```
- ```- P = I^2 \cdot R```
- **Power Ratings**
    - the purpose of electrical components is to transfer energy from one type (electrical) to another:
        - Resistors convert electrical energy to heat
        - LED's convert to light
        - etc.
    - most electrical components have a rating for the maximum amount of power they can dissipate before failing (i.e. getting burned out).
    - Resistors are good for dropping voltage, as per Ohm's Law
    - Resistors are rated as per the maximum power they can handle
    - This means you have to calculate what the power loss associated with the voltage drop will be. 
        - You'll know the resistance (in Ohm's) of the desired resistor
        - You can calculate the Voltage drop with Ohm's Law
        - Power loss can be calculated from the voltage drop
        - Then you have to make sure the resistor (of that particular resistance) is able to handle that wattage

## AC vs DC
- [source](https://learn.sparkfun.com/tutorials/alternating-current-ac-vs-direct-current-dc)
- Direct Current (DC): current only flows in 1 direction
- Alternating Current (AC): periodic changes in direction of current flow (and thus sign of voltage)
- AC
    - Generated by an **altnernator**
        - A coil of wires spinning inside a magnet
        - Spinning can be driven by wind turbine, steam turbine, flowing water, etc.
        - Voltage and current alternates as it spins
        - Continuing with the water analogy from earlier...
            ![alternator analogy](/resources/images/programming/alternator-analogy.gif)
            - notice that the resistor applies resistance in either direction of current
    - AC in homes has it's voltage following a sine wave (60 Hz), with a peak to peak voltage of 170 V, whose RMS is 120V
        - RMS is the Root of the average of squared values
    - AC is better for power transmission because at high voltages you can reduce the current, which means less heat loss.
        - Also AC voltages are more easily converted (by transformers)
    - Easily converted to DC 
        - Note that AC Adapters often step down the voltage (so the device doesn't have to do it) AND they use a rectifier which converts from AC to DC
- DC
    - Most digital electronics use DC
    - Batteries provide DC
    - Unidirectional: Voltage and current may vary, but the direction will not
- Historically, Edison was a big proponent of DC, but he couldn't get it generated to sufficient voltages to power over long distances.  Transmission distance was approx 1 mi per power station, which was a dealbreaker for a largely rural population.  Tesla invented the AC generator, purchased by Westinghouse, and this corrected this downside.


## What is a circuit
- [source](https://learn.sparkfun.com/tutorials/what-is-a-circuit)
- Electricity needs to flow to do work
    - ```- P = V \cdot I```
- Electricity needs to flow from a higher voltage to a lower voltage
    - Or moves from a charge surplus to a charge deficiency
- Every electrical source has two sides:
    - Wall Outlets have 2 (or more) holes
    - Batteries have two terminals
    - Each side is either:
        - Positive (+) : Higher voltage
        - Negative (-) : Lower voltage
- Electricity flows from the postive side to the negative side
    - THIS IS ACTUALLY WRONG, BUT... we just stuck with it for historic reasons.
    - In his electrical experiments, Ben Franklin's assumption about the directional flow of electricity was inverted.  He assumed it was going from positive to negative, and that is why we say electrons have a negative charge: he figured they don't have a lack of charge.  
    - Positive and Negative are purely nominal.  It could as easily be Black and White.
    - Franklin meant Postive -> surplus of charge, Negative -> deficiency of charge
    - He was right in that electricity moves from charge surplus to charge deficiency: he just didn't realize that the thing he called 'negative' was actually the charge surplus. 
    - Because it doesn't really matter as long as we're consistent, we typically follow a convention of notating electrical current as flowing from positive to negative, even though we know now that at the atomic level this is wong.
    - Non-polarized components are electrical components that work irrespective of current direction
    - Polarized devices also exist (usually semiconductor based)
- We typically say the negative side is 0 volts and the positive side is however many volts are available (given the source)
- Circuit is a loop
- 'Load' is a component in a circuit that does work (e.g. a motor)
- Its possible to overload and underload a component
- 2 Degenerate Circuit types
    - Short Circuit:
        - Connect a wire to each end of a battery (don't actually), and since there's no load or resistance to regulate flow, the power source will deliver all the current it can, which could produce some bad results like burning a wire, etc.
    - Open Circuit:
        - When there's a break in the circuit.  Electricity will not flow.

## Batteries
- [source](https://learn.sparkfun.com/tutorials/what-is-a-battery)
- 3 parts
    - Anode: the - side
    - Cathode: the + side
    - Electrolyte: substance (in the middle) that chemically reacts with the anode and cathode
- Anode and cathode are both **Electrodes**: conductors that allow electricity to enter or leave in a circuit
- Electrons flow out from the anode electrode (although in conventional notation, this means current flows into it)
- The chemical reaction between the electrolyte and anode builds up electrons in the anode end, which want to flow to the cathode side and they're prevented from passing through the electrolyte to get to the cathode.
- Called a 'redox' reaction because electrons are transferred between chemicals.
- **Anode Oxidation** 
    - Produces electrons, and possibly ions
    - Ions may pass through the electrolyte, but electrons cannot
- **Cathode Reduction**
    - Ions may be produced or consumed during this reaction
- Some of these chemical rxns occur even if the battery is not connected to a circuit- this can affect shelf life.
    - But they only occur full force when the battery is connected to a circuit.
- Nominal voltage:
    - Voltage stated by manufacturer
    - AA batteries -> 1.5V
- Battery capacities are usually stated in miliAmp / hours
- You can increase the voltage by putting batteries in series
- You can increase the capacities of batteries by putting them in parallel
- Sometimes you wire batteries in both series and parallel
- If you're battery voltage is too high, you might need a DC/DC converter

    
## Capacitors
- [source](https://learn.sparkfun.com/tutorials/capacitors)
- One of the three fundamental passive components:
    1. Capacitors
    2. Inductors
    3. Resistors
- Basic functions
    - Local energy storage
    - voltage spike suppression
    - Complex signal filtering
        - Crossover circuits for speakers
        - Hi-pass filtering
- Capacitor Symbols
    ![capacitor symbols](/resources/images/electronics/capacitor-symbols.png)
- The capacitance of a capacitor tells you how much charge it can store
    - Unit is called the *Farad* (F)
    - 1 Farad is actually huge
- The capacitor is made of two metal plates connected to each terminal, with an insulator (called a *dielectric*) of some type between them.
    - The size and materials all exert an influence on the capacitance of the capacitor
- Behavior
    - When current flows into a capacitor, the plate on the input side will build up a negative charge.
    - This creates an E-Field that pushes away like charges on the other plate, making it postively charged.
    - This creates a strong field of attraction between the two plates, which stores the charge (like a battery) bc they're unable to resolve the attraction because of the insulating dielectric in the middle. 
    - When the charge reaches it's capacitance, it will repel any new electrons
    - If another path in the circuit becomes available, like via a switch, that allows the charges on the plates to find each other, then the capacitor will discharge.
    ![capacitor symbols](/resources/images/electronics/Capacitor-discharge.gif)
    - ```- Q = CV```
        - The charge stored in a capacitor (Q) is the product of it's capacitance (C - which is a property of it's specific physical design) and the Voltage (V) applied to it.
        - Thus more voltage, more charge.  Less voltage, less charge.
        - Remeber Volts is the Potential Energy difference in Joules per Coulomb.  
    - Current (I) through a capacitor depends on it's capacitance (C) and how quickly the voltage is rising or falling.
        - If the current is unchanging, no current can get through it.
- Characteristics
    - Size: physical size and capacitance are usually correlated
    - Maximum voltage
    - Leakage Current: all capacitors have some amount of leakage across the dielectric
    - Tolerance : Their ratings aren't perfect
    - Equivalent Series Resistance (ESR): resistance- since they're not perfect conductors there will be some heat/power loss.
- Types of capacitors:
    - Ceramic
        - Most common
        - Small size and capacity
        - Close to ideal behavior (regarding resistance and leakage)
    - Electrolytic
        - Lot of capacitance in a small volume
        - look like little tin cans
        - have high maximum voltage ratings
        - high leakage
        - polarized: if you reverse the direction, they'll pop and short-circuit
    - Supercapacitors:
        - very high capacities, but low voltage ratings
        - they're usually wired in series to achieve a higher voltage rating
- Wiring in series / parallel
    - You can put them in parallel and their total capacity will be the sum of all capacities
    - If you put them in series, their sum capacity is the inverse of the sum of inverses of each capacities (```- 1 / C_{tot} = 1/C_1 + 1/C_2 + ... + 1/C_N```)


## Resistors
- [source](https://learn.sparkfun.com/tutorials/resistors)
- Passive components that have a static electrical resistance
    - Passive components: only consume power, cannot generate it.
- Often added to circuits where there are active components like op-amps, microcontrollers, and integrated circuits.
- Common Uses:
    - **Limit Current**
        - E.G. Placed in a series with LED to prevent it from blowing up
        - When figuring out the resistance you need, check the LED's typical forward voltage and its maximum forward current 
    - **Voltage Dividing**
        - Wiring up resistors in series will produce a voltage drop which can then be a suitable voltage for sensors and other components.
        - How does this work?
            - Adding resistors will first impact the current
            - Remember:
                - Voltage is based on the electrostatic force between two points
                    - But voltage is not constant across a circuit!
                - The load determines how many amps are pulled.
                    - Load = components with resistance.
                    - Components can mean resistors or motors  
                    - The Load is the resistance.
                    - If there was no load, then all available amps would be pushed through, perhaps creating too much heat in the wires and a short-circuit.
            - New current will be given by: ```- I = \frac{V_{in}}{R_1 + R_2}
            - See [here](https://learn.sparkfun.com/tutorials/voltage-dividers/extra-credit-proof) for a simple derivation of how this works.                    
    - **Pull Up I/O Lines**
        - Biases the input pin to a MCU (microcontroller unit) so that its always predictable - not *floating*
        - see [here](https://learn.sparkfun.com/tutorials/pull-up-resistors)
- Unit of resistance is the Ohm (```- \Omega```) defined as resistance between two points wher 1 Volt of applied potential energy will push 1 Amp (A) of current.
- Symbols:
    ![resistor symbols](/resources/images/electronics/resistor-symbols.png)
- In schematics, resistor symbols have:
    - Name: Letter and Number combination usually (e.g. R2)
    - Number: Resistance value
- Types of resistors
    1. Through Hole (PTH - Plated through hole)
        - Good for prototyping
        - Can be soldered to board, PCB, or stuck to a breadboard
        - Size is relative to it's power rating
        ![resistor type 1](/resources/images/electronics/through-hole-resistors.png)
    2. Surface Mount (SMD/SMT - sufface mount technology or device)
        - Shiny black rectangles
        - Sit on PCB's, soldered by robots
        ![resistor type 2](/resources/images/electronics/surface-mount-resistors.jpg)
- Resistor composition
    - Filled with a thin, somewhat-conductive film wrapped in a helix around which is covered by an insulating material
- Other Resistor Packages
    - rheostats: resistors which can be adjusted internally between a range of values
    - potentiometer: connect two resistors in series and allow you to adjust a center tap between them creating an adjustable voltage divider.  Used for knobs and stuff.
- Reading Through Hole Resistor Color Codes
![resistor color coding](/resources/images/electronics/resistor-color-codes.png)
- SMD resistors have their own coding conventions (E24, E96, perhaps more)
- Power Ratings
    - You want to keep the input power to a resistor below it's maximum rating, otherwise heat/fire risks
    - Typically between 0.125W and 1W
    - Through hole resistors usually come in 1/4 W or 1/2 W ratings, consistent with their size
    - Power resistors might list their power rating on their side
    - SMD power ratings can usually also be judged by their size
        - Both 0402 and 0603-size resistors are usually rated for 1/16W, and 0805’s can take 1/10W.
- Measuring Power Across a Resistor
    - We can combine Ohm's Law (V = IR) with our Power Formula ( P = IV) to get:
        - ```- P = I^2 \cdot V```
        - ```- P = V^2 / R```
- Resistors in Series and Parallel
    - Series: ```- R_{tot} = R_1 + R_2 + ... + R_N```
    - Parallel: ```- 1/R_{tot} = 1/R_1 + 1/R_2 + ... + 1/R_N```
        - Just FYI: The inverse of resistance is called *conductance*
        - Or if there are just two: ```- R_{tot} = \frac{R_1 \cdot R_2}{R_1 + R_2}
        - A shorthand way of saying two resistors are in parallel is by using the parallel operator: ||
- Calculating a network of resistors in series and parallel
    - Find all the groups of resistors in series and calc resistance
    - Then calc the rest as parallel resistances

## Series vs Parallel
- [source](https://learn.sparkfun.com/tutorials/series-and-parallel-circuits)

## Diodes
- [source](https://learn.sparkfun.com/tutorials/diodes)

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

## Integrated circuits
- [source](https://learn.sparkfun.com/tutorials/integrated-circuits)

## Selecting the Right Motors
- [source](https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one)

## TODOS - Clarify
- LED's are *non-ohmic*.  Current flowing through it does not follow Ohm's law because a resitance is not constant.  In a motor, as the load increases, it will pull more current, because the resistance goes down.  [see here](http://electronics.stackexchange.com/questions/95874/when-people-talk-about-a-device-drawing-current-what-do-they-mean-why-do-dev)  - How does a load only pull what it needs?  
- Why do circuits need to be closed?
- See note above about Kirchoff's Voltage Laws
- Passive vs Active components, and other component types