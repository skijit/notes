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

## Analog vs Digital Circuits
- [Source](https://learn.sparkfun.com/tutorials/analog-vs-digital/all)
- Analog Circuits
    - Basic components like resistors, capacitors, inductors, diodes, transistors, and op amps require analog circuitry
    - They're harder to design
    - More susceptible to noise 
- Digital Circuits
    - Use discrete, digital signals rather than analog, continuous voltages
    - Involve combinations of transistors, logic gates, microcontrollers
- Combinations of both are not uncommon
    - DAC and ADC
    - Pulse Width Modulation

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
    - Electric field (E-Field) or static electric field is different from an electromagnetic field!
    - This creates a strong field of attraction between the two plates, which stores the charge (like a battery) bc they're unable to resolve the attraction because of the insulating dielectric in the middle. 
    - When the charge reaches it's capacitance, it will repel any new electrons
    - If another path in the circuit becomes available, like via a switch, that allows the charges on the plates to find each other (via the alternate path), and the capacitor will discharge.
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
- The idea that current takes the path of least resistance is **NOT TRUE**
    - Current will flow from a high voltage to a low voltage
    - Some amount of current will flow through every path it can take to get to an area of lesser voltage
- Nodes:
    - Any circuit can be deconstructed into one or more nodes
    - A node is a stretch of any wire between some components
    - If you imagine the wire as a path, it's anywhere you can walk without bumping into a component
    - Below there are 4 nodes (colored different)
    - You can name a node by the component endpoints (e.g. VS-R1, R2-R3-R4, etc.)
    ![nodes in a circuit](/resources/images/electronics/circuit_nodes.png)

- **Series Circuit**
    - Def: Two nodes are in series if they share a common node and if the same current flows through them
    - Have the same current running through them
    - To calculate total resistance, just sum each individual resistor together: ```- R_{tot} = R_{1} + R_{2} + ... + R_{n} ```

- **Parallel Circuit**
    - Def: If components have 2 common nodes and there are multiple distinct paths the current can take to get from high to voltage
    - Have the same voltage drop
    - Example:
    ![parallel resistance example](/resources/images/electronics/parallel_resistance.png)
        - With a 10 k```- \Omega``` resistor and a 10V power supply we can calculate the current will be 1mA.
        - Since there are 2 resistors, we know they'll pull cumulatively 2mA
        - But if you plug in a 2mA current with a 10V power supply, we see that these 2 10 k```- \Omega``` resistors in parallel create a circuit with overall 5 k```- \Omega``` resistance.
    - Total resistance for a parallel circuit:
    ```+ \frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_{n}} ``` 
- Tips
    - To get a very specific resistance: ```- R_{total} = R / N ``` where R = resistance of each component (must be the same), N = number of components in parallel
    - If you're combining resistors, be sure to factor in their individual tolerances
    - The combined resistance of two resistors (in parallel) of different values is always less than the smallest value resistor. 
- Series and Parallel Capacitors
    - in many ways, just opposite of resistance in series and parallel
    - recall capacitor design has two plates separated by an insulator.
        - if you increase the size of the plates, you increase capacitance b/c there's more room to hold a bunch of electrons
        - if you increase the distance between the plates, you decrease capacitace b/c there's less force to attract
    - capacitors in series:
        - capacitance goes down: it's like spacing the plates further apart
            - ```- \frac{1}{C_{total}} = \frac{1}{C_1} + \frac{1}{C_2} + ... + \frac{1}{C_N} ```
            - same a calculating resistance in parallel circuit
        - voltages add up - like with batteries
    - capacitance in parallel:
        - capacitances add up
    
## Ground
- [src](http://www.learningaboutelectronics.com/Articles/Why-does-a-circuit-always-have-to-have-ground)
- On the power distribution grid, 'ground' is literally the earth
- The planet is a good conductor and so it makes a handy return path for electrons
- Because of its huge size, it is able to dissipate the excess electricity safely
- Utility poles have a wire running down into the ground: this connects the electrical ground line to actual ground line
- Near the power meter at your house, there is also a long copper rod running into the ground
    - All the neutral and ground plugs eventually attach to this rod
- The point is safely dissipate any excess voltage that is not safely contained in the loop
- Just like humans want to be at rest / not stressed, charge seeks equilibrium
- Having the wrong number of valence electrons will create charge
- Charge won't move unless you give it a path to what it wants (which is ground)
- Electrical circuits are kinda like the carrot you put on a stick attached to a rabbit
    - The rabbit is never going to get that carrot just like charge is not going to get fully discharged (to ground), because first we want to route it and make it do things for us.
- "Ground is a reference point"
    - means that ground is where electricity wants to be
    - on a multimeter, the black probe is the 'reference probe'
- Ground on a circuit is typically a screw or screw hole
- Circuit needs an earth ground or a floating ground to work
    - Earth Ground
        - for AC circuits (like in the home)
        - uses the 3rd prong / wire
    - Floating Ground
        - Used in battery and low voltage applications where there is no risk of serious shock
        - Serves as the 0V reference point
        - Serves as the return path to the negative side of the power supply
- Voltage is always measured with respect to the ground (0V)
    - This is what is meant as the 'reference point'


## Rossman videos
- [Playlist called 'guide to basic electronics: unprofessional edition](https://www.youtube.com/playlist?list=PLkVbIsAWN2ltOWmriIdOc5CtiZqUTH7GT)
    - pretty entertaining descriptions of electronics concepts
- capacitors are typically connected to ground on one side, so that they can attract charge
- AC is able to pass through capacitors, DC not
    - The behavior is clearly complicated as capacitors also have leakiness and other characteristics
- When looking at Ohm's Law scenarios, remember that Current is really just a function of the circuits resistance
- Impedance (in addition to applying to AC) is often applied to the circuit as a whole, not individual components
- speakers need AC.  DC will fix them at one position and eventually blow the coil.
- short to ground in motherboard repair often happens when one component goes bad, and becomes a 0 ohm load (essentially like a wire), and goes to ground (prematurely)
- inductor is like the opposite of a capacitor: 
    - good at passing DC but not AC
    - resists quick changes in **current**
- Compare:
    - capacitors 
        - resist sudden changes in voltage 
        - store energy in the form of a static charge
    - inductors
        - resist sudden changes in current
        - store energy in the form of a magnetic 
- inductor is a coil of wire, such that when current flows through it, it builds up a magnetic field which store the energy.
    - when current stops flowing into an inductor, the magnetic field breaks down anad it will release the current
    - it takes a certain amount of time to release all the current in an inductor
- inductors have lots of applications including:
    - Voltage boosting
    - Lowpass filtering
- transistors
    - is a resistor insofar as it keeps voltage the same, but passes less current
    - allow a small electrical current to control a much larger one
    - there are high-power and low-power types depending on the application / input signals
    - vacuum tubes used to be used for similar situations (but they were expensive, needed to be replaced, and very hot)
    - FET Field effect transistor
        - controlled by voltage, use almost no input current
        - JFET, MosFET are types of FETs
- pull up resistor
    - data line is a communication line between two different circuits/component
    - data line work by sending a current which is then interrupted (short to ground) at times (like morse code)
        - maybe it's PWM?
    - 





## Diodes
- [source](https://learn.sparkfun.com/tutorials/diodes)

## Polarity
- [source](https://learn.sparkfun.com/tutorials/polarity)

## Switches
- [source](https://learn.sparkfun.com/tutorials/switch-basics)

## Voltage Dividers
- [source](https://learn.sparkfun.com/tutorials/voltage-dividers)
- [short video](https://www.youtube.com/watch?v=EQtwsWJuUPs&t=15s)
- Voltage drop is just the Voltage between two points which are typically not the start/endpoints.  
    - But you could say the voltage drop of the whole circuit is the same as the battery
- Problem: You want to plug a 9V battery into the input pins in an Arduino.  But the max voltage for these pins (not the power supply) is 6V. 
- Solution: you can first run it through 2 resistors (in series) on a breadboard, creating a voltage divider.
- Calculating Voltage Drops:
    - Scenario 1: 
        - 10V battery with two resistors in series, R1 and R2 (both 10 Ohms)
        - Calculate Current: I = V / R = 10V / 20 ```- \Omega ``` = 500mA
        - Calculate Voltage drop of each resistor (using Ohm's law):
            - ```- V_{R1} = R1 * I_{Total} = 10\Omega * 500mA = 5V ```
            - ```- V_{R2} = R2 * I_{Total} = 10\Omega * 500mA = 5V ```
        - **So:**: 
            - In a series circuit the Voltage drops add up to the original voltage
            - The current is always the same
    - Scenario 2:
        - 10V battery with two resistors in series, R1 (10 Ohms) and R2 (100 Ohms)
        - Calculate current: I = V / R = 10V / 110 ```- \Omega``` = 91mA
        - Voltage drops:
            - ```- V_{R1} = R1 * I_{Total} = 10\Omega * 0.091A = 0.91V ```
            - ```- V_{R2} = R2 * I_{Total} = 100\Omega * 0.091A = 9.1V ```
            - Voltage drop is 10X bigger for R2 b/c the resistance of R2 is 10X bigger than R1.
- Quick formula for voltage out:
    - ```- V_{out} = \frac{R_2}{R_1 + R_2} \cdot V_{in} ```
- I think we like to say voltage dividers because:
    - 1 resistor in series: gotta have it (to prevent a short)
    - 2 resistors in series: produce a drop in current and ultimately in voltage (in fact it's like its being divided)

## Voltage Drops
- Not the same thing as voltage
- Voltage Drop: The energy (volts) a component uses when current flows
- There is only a voltage drop when current is flowing
- Calculate the current in the circuit from the Voltage Source and the cumulative resistance.
    - Then you calculate the individual voltage drop for each component using Ohm's law, the known current (as this doesn't change), and the component's individual resistance.
- All the voltages have to add up to the total voltage : ie all voltage has to go away
- Only components that have a load (resistance) ) (the stuff that does work) have a voltage drop



## PCB Basics
- [source](https://learn.sparkfun.com/tutorials/pcb-basics)

## Pulse Width Modulation
- [source](https://learn.sparkfun.com/tutorials/pulse-width-modulation)
- Its a digital signal that has a variety of applications
- Though digital, it has analog qualities: but the continuous parameter is the width of the pulse (aka duty cycle) rather than the voltage level (i.e. in analog signals)
- You set a fixed period and then you vary the length of time the signal is full-on or full-off
![duty cycles](/resources/images/programming/duty_cycle.jpg
- Applications:
    - By changing the pulse width, you can give the impression of dimming LED's
        - But the period of the signal has to be sufficiently high, or you'll just give the impression of flickering
    - Each position in a servo corresponds to a particular pulse width.  So if you want it to move, you just change the pulse width.

## Pull-Up Resistors
- [source](https://www.youtube.com/watch?v=wxjerCHCEMg)
- [see also](https://www.arduino.cc/en/Tutorial/DigitalPins)
- [this too](https://learn.sparkfun.com/tutorials/pull-up-resistors)
- [lastly, this one](http://www.resistorguide.com/pull-up-resistor_pull-down-resistor/)
- [and this post](https://forum.arduino.cc/index.php?topic=435495.0)
- [youtube](https://www.youtube.com/watch?v=BxA7qwmY9mg)
- [this](http://www.learningaboutelectronics.com/Articles/Why-does-a-circuit-always-have-to-have-ground)
- Scenario: you have a microcontroller (MCU) with an input PIN that reads voltage (perhaps connected ultimately to some sensor value).
- There are 3 potential voltages which can be read:
    - High  (actionable!)
    - Low (actionable!)
    - Floating (indeterminate!)
        - aka a 'High-Impedance' state or 'Disconnected' 
- This floating state results from any number of things: stray current, leftover capacitance in the wire, current induced by magnetic fields, etc.
- The problem with floating is it will read high and low, switching randomly.  You need to connect that input to a known voltage state.
- You can solve this problem with a pull up resistor (R1 in diagram below)
![pull-up resistor](/resources/images/electronics/pull-up-resistor.jpg)
- When switch is open, voltage will be pulled up to Vcc.  When switch is closed, voltage will be pulled to 0.
- **Details**
    - First, the MCU input is known as high-impedance.  It has very high resistance - perhaps around 1M```- \Omega``` .
        - That means when the switch is open, the only path to ground will be through the MCU and due to the high-impedance, will only draw a very small amount of current.
    - When the switch is closed, then all that current will prefer to flow to ground directly.
    - Besides pulling the voltages to a known level, the pull-up resistor will avoid a short when the switch is closed.
    - The input pin senses voltage, but more specifically, **it is sensing the voltage drop across R1.** 
    - **Example**
        - R1 is 10K```- \Omega ```
        - Input is 10M```- \Omega ```
        - Vcc is 5V
        - When switch is open:
            - Only path to ground is through MCU, so we need to factor Input impedance into the circuit's total resistance:
            - ```- R_{total} = ``` 1,000,000 + 10,000 = 1,010,000
            - I = V / R = 5 / 1,010,000 = 0.00495 mA  (that's a very small amount of current!)
            - Voltage Drop Across R1 (i.e. what the input reads):
                - V = I x R = 0.00000495 * 10,000 = 9.9 mV
                - So the input pin will read 5V - 0.0099V = 4.99V
                - So it is pulled high to a known voltage
        - When switch is closed:
            - Path to ground is doesn't go through input pin.
            - Only resistance in the circuit is from R1, which means the voltage drop across R1 will be to 0V
- **Pull Down Resistor**
![pull down resistor](/resources/images/electronics/220px-Pulldown_Resistor.png)
- Without the resistor, the circuit is floating- any stray current is able to freely move around because there is no resistance to impede the current.
- When the switch is open:
    - The circuit's current is now more restricted (thanks to R1), and since there is no voltage drop across a component when there is no current, and thus the input reads 0. 
- When the switch is closed:
    - The current will primarily run through the resistor to ground, rather than through the high-impedance input.
    - So the voltage drop across the resistor will be based on current pulled primarily by the resistor, and this will be Vcc.
- **Choosing these resistor values**
    - Sometimes you want more or less of a pull-up or down.  
    - Generally, you want the resistor to be an order of magnitude smaller than the high impedance input's resistance, so that the voltage drop when the switch closes is not so dramatic.
        - A lot depends on the variation of Vcc (since that's coming from a sensor with whatever sensitivities / characteristics) and how far you're willing to pull it up or down
            - When there's high variation in Vcc, you probably want a lower-resistance R1 so you don't pull it too far
    - You also want it to be high enough so that it doesn't just waste current when the switch is open.
    

## Accelerometers
- [source](https://learn.sparkfun.com/tutorials/accelerometer-basics)

## Integrated circuits
- [source](https://learn.sparkfun.com/tutorials/integrated-circuits)

## Transistors
- [source](https://learn.sparkfun.com/tutorials/transistors)

## Using a multimeter
- [src](https://learn.sparkfun.com/tutorials/how-to-use-a-multimeter)
- Measures:
    - voltage
    - resistance
    - current
    - continuity
- They all have:
    - display
    - dial
    - ports
- Black probe touches the neutral wire, and it always plugged in on the COM (for common) port
- Red probe can switch depending on whether you're testing:
    - Ohms/Voltage
    - Current 
        - There's often a separate port for large currents
- Different dial depending on whether you're measuring DC or AC (AC is the wave, DC is the straight/dotted line)
- If you hook up your test leads the wrong way, the voltage displayed will be negative- which makes sense
- Hold: means keep the reading value displayed
- Non-contact voltage: detects electric fields, so you dont actually have to touch the lead to, say, an outlet
- For non-auto-ranging multimeters, you need to set the dial to the ceiling voltage you expect to measure.  
    - If the measured voltage exceeds that, the multimeter will say something like '1'
- Measuring current is different from measuring voltage:
    - Voltage- you can just probe the different spots, creating a parallel circuit
    - Current- You have to do this in series, physically interrupting the lines
        - Good to do this with alligator clips
- Continuity is the checking the resistance between two points in a circuit.  
    - Essentially, this makes sure they're connected
    - If they are connected, the reading should be less than a few Ohms
    - Meter will sound a tone when they ARE connected.  if the circuit is open, there is no tone.
    - Continuity symbol is usualy a diode with propagation waves around it
    - You can touch the probes together to verify that a small amount of current is allowed to pass between them
    - Turn OFF the system before checking continuity
- Typical circuit troubleshooting workflow:
    - With system on, check voltage between VCC and Ground
    - Power down and check continuity between VCC and Ground
        - If you hear a beep that means you have a short somewhere (bc there should be more significant resistance between VCC and Ground)
- When checking continuity between VCC and Ground, you might hear a beep (incidcating a short) if there's a large cap on the circuit.
    - That's just the extra capacitance (from the cap) in the circuit.




## Selecting the Right Motors
- [source](https://learn.sparkfun.com/tutorials/motors-and-selecting-the-right-one)

## TODOS - Clarify
- LED's are *non-ohmic*.  Current flowing through it does not follow Ohm's law because a resitance is not constant.  In a motor, as the load increases, it will pull more current, because the resistance goes down.  [see here](http://electronics.stackexchange.com/questions/95874/when-people-talk-about-a-device-drawing-current-what-do-they-mean-why-do-dev)  - See note above about Kirchoff's Voltage Laws
- Passive vs Active components, and other component types
