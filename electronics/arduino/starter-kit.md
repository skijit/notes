Arduino Starter Kit
==============
- Notes collected from the starter kit materials
- For more info, go to the [starterkit link](http://arduino.cc/starterkit)
- Datasheets for all components are linked from page above
- [Language Reference](https://www.arduino.cc/en/Reference/HomePage)

## Intro
- Simple way to think of arduino:
    - Sensors: Turn energy into electrical signals
    - Actuators: Turn signals into physical actions
    - Microcontrollers: Listen to sensors and talk to Actuators.
- You build custom circuits and interfaces for it and write code for it, to tell it what to do.

## Parts and Purposes
- Battery Snap
- Breadboard
    - Lets you build circuits
    - This kind doesn't require soldering, but some do
- Capacitors
    - Store and release electrical energy
    - If the voltage in the circuit is higher than what is stored, it allows current to flow in
    - If the voltage in the circuit is lower than what is stored, it releases it's stored charge
    - Often placed close to a sensor or motor to smooth out voltage fluctuations.
    - Examples:
    ![capacitors](/resources/images/programming/capacitors.jpg)
- DC motor
    - Coils of wire become magnetized when current flows through them, inducing it to spin
    - If the direction of electricity is reversed, the motor will spin in the opposite direction
- Diode
    - Makes sure electricity only flows in one direction
    - Semiconductor component
    - Sometimes you'll want the flow of electricity to be unidirectional
- Gels
    - Filter out colors
    - R, G, B gels are available
    - When used in conjunction with phototransistors, they cause the sensor to only react to the light (amount) of that filtered color.
- H-Bridge
    - This could be an IC, or assembled from components
    - Lets you control the polarity of the voltage applied to a load, usually placed in front of a motor
- LEDs
    - A type of diode that illuminates when electricity passes through
- LCD
- Male Header Pins
    - Fit into female sockets, like those on a breadboard
- Optocoupler
    - Aka OptoIsolator
    - Transfers electrical signals between 2 isolated circuits using light
    - When voltage is applied to the +, an internal LED illuminates which causes a photoreceptor inside to close a switch.
- Piezo
    - Component that detects vibrations and creates noises
- Phototransistor
    - Component that generates a current proportional to quantity of light absorbed
- Potentiometer
    - knob that lets you control voltage
- Pushbuttons
    - momentary switches that temporarily close a circuit when pressed
- Resistors
    - Resist the flow of electricity
- Servo motor
    - Geared motor that can rotate (only) 180 degrees.  
    - Controlled by Arduino sending pulses which tell it what position it should move to.
- Temperature Sensor
    - Changes tvoltage output depending on the temperature
- Tilt Sensor
    - switch that will open or close depending on orientation
    - has a hollow cylinder filled with a metal ball inside
- Transistor
    - Electronic switch often used to control high current / high voltage components like motors

## Parts of Arduino Board
- Reset button
- TX and RX LEDs
    - indicate serial communication between your board and the computer (transmit and receive)
- Digital Pins
    - Use digitalRead() and digitalWrite()
    - analogWrite() works on the pins with the PWM (pulse width modulation) symbol (~)
- Pin 13 LED
    - Digital pin 13 has a LED connected to it in the board, which is useful for debugging
- ATmega microcontroller
- Analog ins
    - Marked A0 - A5
- Gnd & 5V pins
    - Use these to connect power source and ground

## Project 1: Get To Know Your Tools
- Types of energy include heat, gravity, movement, light, electrical, etc.
- Transducers: convert one type of energy into another
    - Sensors: Transduce other energy into electrical
    - Actuators: Transduce electrical energy into other
- Load: something on a circuit that can do something useful with electrical energy
- Electrical flow:
    - From high PE (+) to low PE (- or ground)
    - DC- unidirectional (unlike the power coming from wall sockets)
    - If there's no path from higher PE to lower PE, the circuit will not work
- In any circuit, all of the energy will be used up
    - Each component contributes
- Flow of current at some point will always be the same going in as out
- Electricity will follow the path of least resistance to ground
    - If you connect power to ground directly with no components, the current will follow this path
        - The power source and wires will transduce the current into heat and light
        - This is a short circuit
- Breadboard
    - Each horizontal row (short - 5 holes) is connected together with conductive metal strips
        - called Terminal Strips
    - The gutter in the middle of the breadboard separates the two sides electrically
    - The vertical strips that run on the perimeter are called Power Strips
        - Have a + and - side
        - The whole strip is connected (usually) to provide flexibility
    - Breadboard Series Circuit
    ![series-breadboard](/resources/images/electronics/series-breadboard.png)
    - Breadboard Parallel Circuit
    ![parllel-breadboard](/resources/images/electronics/parallel-breadboard.png)
    - So, when you have connections on the same row, they are essentially parallel bc there are multiple paths for the currentto flow

- LED
    - It is polarized, so the electricity has to flow in the proper direction
    - Anode side (longer): Connects to power
    - Cathode side (shorter): Connects to ground
- switch
    - Will break or connect the circuit
    - 'Closed' means the circuit is connected, 'Open' means it is broken
    - Momentary switches, like in this kit, close the circuit only when pressure is applied

### Clarifications
- Consider:
    - Series circuit: 
        - Voltage will drop as you add more resistors
        - Current will be the same.
    - Parallel circuit:
        - Voltage will be the same as you add more resistors
- Why?
    - Separate the idea of the electrons (i.e. the 'charge' or current) from the energy (or force or voltage) they carry.
    - The electrons are not destroyed or transduced, but their energy is
    - Ex: Rocks tumbling down a hill
        - The rocks don't vanish / get transduced
        - They just lose their PE
        - Thus current is constant, voltage is not
        - Resistance will impede current, voltage will drop (in series)... so, just as V = IR, voltage and current will be proportional.
- Explaining why in parallel adding more resistors does not contribute to total resistance, whereas in series it does:
    - [src](http://physics.stackexchange.com/questions/190194/why-does-voltage-change-in-series-circuit-but-not-in-parallel-circuit) 
    - Assume you have four waterfalls, and they connect one river to another. The waterfalls drop by five feet. If you put the waterfalls end to end, then the second river must be 20 feet below the first river. If, however, the waterfalls get put side by side, and still connect the two rivers, the second river is just five feet below the first river.
    - Now, this is exactly the same arrangement using gravitational potential that you get with resistors. The first arrangement is series, and the second one is parallel.
- [Why Voltage is the dependent variable, not Current](http://www.evilmadscientist.com/2012/resistors-for-leds/)
    - LED's have a characteristic called a "forward voltage" (Vf) which is the amount of voltage lost/transduced when operated at a reference current (typically 0.020 mA).
    - You can calculate the amount of voltage lost
    - You have a target amount of current to drive the LED
    - Thus you just plug these into Ohm's law to figure out the ideal amount resistance you need.

## Project 2: Spaceship Interface
- Digital PINs on Arduino:
    - Can be input OR output
    - 2 state:
        - HIGH: 5V
        - LOW: 0V
    - pins 0 and 1 are used for communicating with the computer
    - the pins can be a voltage source if you configure them as output with a digitalWrite()
    
- Placement of the resistor (i.e. whether it is before or after a component) is not important: it usually affects the whole circuit.
    - There are some exceptions though: for more info, see [Kirchoff's Voltage Laws](http://www.facstaff.bucknell.edu/mastascu/elessonshtml/basic/basic5kv.html)
- **Recall**:
    - Electric Potential Energy vs Electric Potential
        - Electric Potential Energy is the energy of a charged particle(s) in an E-Field (subjected to Couloumb's law) (unit: *Joules*)
        - You increase the Electric Potential Energy as you move the charge contrary to the direction of Electrostatic forces exerted in the E-Field.
        - If you have a bigger rock you roll up a hill, you'll have more PE.  If you have a bunch of charge you move contrary to an E-Field, you have more Electric Potential Energy.
        - Electric Potential is the Electric Potential Energy divided by the charge.  
        - it divides by force (Joules) by the charge amount (Coulomb) (i.e. size of the rock) to assess the strength of the E-field independent of the charge amount.
    - Voltage is the difference in Electrical Potential between 2 points in a circuit
        - Each point is subject to different E-Fields
    - Electrons want to move from an area of high electric potential to low electric potential
        - By definition, bc low electric potential means they're not counter to the electrostatic force
    - Ground has the lowest electric potential, so that's where electricity wants to flow
        - its full of conductors, not insulators
        - it's not really charged (i.e. electrons are not super packed together)
            - if they get to close, they can move / make space for each other.
            - and there's plenty of space to move any excess charge around.
    - If you don't have any resistance, and you connect a voltage source to ground, you'll get a short circuit
        - Bc there's nothing to impede the flow of current, so it's all going to go (and possibly overwhelm the wire/conductor you're using)
        - If the wire had truly 0 Ohm resistance, then by V = I * R, voltage would be 0
        - But, there is a little resistance on the wire so voltage is actually just very low
            - Everything has a certain resistance (to electrical current)- Even conductors
            - Bc V = I * R, any time you have a resistance, you will have a voltage too
        - If there's so little voltage, why does the wire heat up?  Is that coming from Amps?
            - Power is the rate at which electrical energy is transferred: 
            - P = V * I
            - watts = joules/couloumb * couloumb/sec = joules/sec
            - tells you the amount of work that can be done over time
            - transforming current to heat is work
            - even though voltage might be low, current will be very high
            - resistors electric energy into heat (some better than others)
            - the wire gets super hot because it still has some resistance 
            - [joule heating](https://en.wikipedia.org/wiki/Joule_heating) states that the power of heating is proportional to the product of it's resistance and the square of it's current.
    - Short to ground:
        - Just means to have a direct connection to ground.
    - Ground loop means there are multiple paths to ground, and some of the electricity will form a loop.
    - Open circuit is like the opposite of a short circuit:
        - short circuit = no voltage / no resistance / full current
        - open circuit = there is a voltage, but degenerate since there's active current / infinite resistence / no current         
    - Are amps really being drawn by components:
        - I don't think so... I think they each have their resistances which limit the flow of current in the circuit
        - The current always wants to go to the area of least electric potential 
    - **Floating**
        - Floating ground: when a circuit does not have a connection to ground
        - Floating voltage: conductors have a floating voltage if they're not connected to another grounded conductor
            - In this case you have arbitrary voltage and flows being induced by electric-fields or induction instead of having it driven by the usual power source with a prescribed electric potential.
    - What happens if you have a battery connected to ground, but without a closed loop connecting back to the other battery terminal.  [answer](http://electronics.stackexchange.com/questions/268531/why-electricity-requires-a-closed-loop-to-flow)
        - Short Version: 
            - There are two bursts of current between the + term and earth: 
                1. zeros out the + term's voltage (rel to earth), and 
                2. happens as the battery works to maintain a 9V differential between + and -, resulting in the - term being -9V (rel to earth) and the + term being 0V (rel to earth). 
            - It happens very quickly, so it's more of a discharge / burst than sustained current. 
            - To get a sustained current implies creating a charge on the wire (i.e. it loses electrons) which requires a huge amount of (increasing) voltage delivered- so basically, it isn't practical.
    - Open circuit is really just a closed circuit with an extremely HIGH resistor (such as air)
    - To "pull current" is just a statement about the resistance (in an AC circuit, the impedance) of the circuit and the voltage of the power source.  Under a mechanical load, certain component's resistances might decrease, causing them pull more current.  [src](http://electronics.stackexchange.com/questions/95874/when-people-talk-about-a-device-drawing-current-what-do-they-mean-why-do-dev)
    - The role of voltage and current in a circuit:
        - The voltage is what converts into energy
            - It has the charge which is being acted on by the E-Field
        - Current
            - The amps are a function of the internal resistance / design of the motors
            - The amps are like the volt delivery system.  It shows how much charge (with some voltage) can be delivered.
            - This is borne out by P = V x I
    
## Project 3
- done: notes are in the code

## Project 4
- The digital pins can only output a high (5V) or low (0V) value
- The analog ins are good for detecting variable voltage drops
- Since the digital pins can only output high or low, it can instead use Pulse Width Modulation (PWM) to output a variable signal.
- PWM modulates from HIGH to LOW at a variable rate.  When the HIGH is equal the length of LOW, the **duty cycle** is said to be 50%.
    - The percentage of time the value stays on HIGH is the duty cycle
- Phototransistors output a current proportional to the light output.

### PhotoTransistor Resistor selection Notes
- Each phototransistor is wired up with a 10K```- \Omega ``` resistor.  Why?
- [Relevant Arduino Forum Post](http://forum.arduino.cc/index.php?topic=442070.0)
- [This also explains it very well](http://learn.parallax.com/tutorials/robot/shield-bot/robotics-board-education-shield-arduino/chapter-6-light-sensitive-11)
![phototransistor](/resources/images/electronics/phototransistor-resistor.jpg)
- [This is good too](http://learn.parallax.com/tutorials/robot/shield-bot/robotics-board-education-shield-arduino/chapter-6-light-sensitive-15)
- [PhotoTransistor Datasheet](https://www.arduino.cc/documents/datasheets/HW5P-1.pdf)        
    - Supply voltage = 3-15 V
    - The longer leg is called the **collector**- this attaches to the positive side
    - The shorter leg is called the **emitter** - this is where the current change occurs
    - Datasheet shows the configuration the component was tested in, with a 1 K resistor- but notice the Vout (presumably where they measure) is before the resistor. 
        - It says the collector photo current at 10 LUX produces a current of 60uA.
        - Why does it say that about the collector and not the emitter?  Basically bc the amount of light that it detects makes it change its resistance, so it essentially lets in less current into the collector.  Rather than restricting it's output (emitter), it restricts its input (collector).
- Using Ohm's Law, we can make some observations about resistor selection.
    - Assume a constant 60uA 
    - ```- V_{out} = I \cdot R ```
    - **1 K resistor**: 1 K * 60 uA = 0.06V
    - **10K resistor**: 10 K * 60 uA = 0.6V
        - **Trend**: Increased resistance at a constant current means more voltage (bc you need more pressure to push the same current through more resistance.)
        - Comparing these first two scenarios, how can we get a 1K resistor to result in a 0.6 V across it (same as the 10 K resistor), as this might be a preferable range?  
            - We'd have to increase the current to 6 uA, which means an increase in light.
            - This means the resistor we choose makes the phototransistor more or less sensitive to light:  
            - **More resistance = More photosensitivity**
    - **100K resistor**: 100 K * 60 uA = 6V
        -  **BUT THAT WOULDN'T MAKE SENSE AS THE INPUT VOLTAGE IS ONLY 5V**                
- So there seem to be two factors:
    - With a standard resistor, figure out the voltage range for the light levels you want to be sensitive to.
    - Then you can add or remove resitance (using Ohm's law, as above) to bring that into the ideal range given your analog in and supply voltage.     
- How does detection of a voltage drop work:
    - The phototransistor and resistor are in series.  
    - That means the current coming out of the phototransistor will be impeded immediately.
    - So you would measure before the resistor.  
    - Also, remember that voltage is a difference, and you want it to be compare the voltage to ground - but if you measured after the resistor, it would be the same as ground.    

### RGB LED Resistor selection
- [Datasheet](https://www.arduino.cc/documents/datasheets/LED(RGB).pdf)
- Remember, we're going to use PWM (between 0-5V) to adjust the intensity of each color component
- Datasheet says Forward Voltage is:
    - R: 1.8 - 2.2
    - G: 3 - 3.5
    - B: 3 - 3.5
- Forward voltage is essentially the voltage drop
- Forward current is listed as 20mA
- So we need to find a resistor to accompany:
    - V (for G, B) = 5V - 3V = 2V 
    - V (for R) = 5V - 2V = 3V 
    - I = 0.020 A
- For G, B: V = I x R; R = V / I = 2 / 0.020 = 100 Ohm
- For R: V = I x R; R = V/I - 3 / 0.020 = 150 Ohm
- resistor for each is a 220 Ohm, so it's fairly close.
- We're going to be putting in less than the 20mA- might be worth seeing how they work with 100Ohm resistors too.
    - The hard part is I've only got 220 Ohm resistors.
    - I think I might have to put a couple together in parallel to test this... (TODO)
        - Remember Total resistance for a parallel circuit:
            - ```+ \frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + ... + \frac{1}{R_{n}} ```
        - And if you have resistors of all the same resistance in parallel, you can use:
            - ```- R_{total} = R / N ```

## Project 5
- Uses servo and capacitors
- I have some [questions](http://electronics.stackexchange.com/questions/276242/basic-capacitor-discharge) about capacitors I'm still trying to understand.
- These kinds of capacitors are called *decoupling capacitors* bc they reduce changes caused by the components from the rest of the circuit.

## Project 6



