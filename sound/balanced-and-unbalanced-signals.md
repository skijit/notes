
Misc Signal Level & Type Info
==============================
- TODO:
	- How pickups work
	- Various components/types of amplifiers
	- Signal levels
	- Different DI Types
	- PA Components	

## Balanced Vs Unbalanced Connections
- **Unbalanced Signals**
	- AKA Tip-Sleeve (TS) connection
	- RCA cables are usually unbalanced as well
	- **2 wires**
		- Signal   
		- Ground
	- This is the bare minimum required to form a circuit between the two components (e.g. instrument and amp)
	- The ground wire typically wraps around the signal wire to shield it from various interference, but at larger lengths, it will still act like an antenna and pick up noise.  
- **Balanced Signals**:
	-  **3 Wires**:
		- Main Signal
		- Main Signal Inverted (180 deg)
		- Ground
	- **Purpose**: They're used when in scenarios where the Signal To Noise Ratio is high.  This can happen in two circumstances.
		- **Input Signal Level is very weak**
			- common in microphones 
			- This is a problem bc even a small amount of noise picked up from via interference (<i class="icon-help"></i>), etc. will be amplified along with signal.
		- **Line is very long** 
			- > 20 feet allowing it to pick up a lot of interference.
	- **Method:** When a balanced signal is output, the signal wires will have the same content except that one is inverted (ie. it's polarity is reversed).  Since each signal wire has the same electrical profile (circuit load is the same, etc.), they'll pick up the same noise.  When both signals are received, the ampilifier will again flip one of the signal wires, which means that the identical noise picked up on each is will now cancel each other out, leaving only the signal.
	- **2 Connection Types**
		- XLR (ie from mics)
		- 1/4" cable with a TRS (Tip-ring-sleeve) connection.  This will have the tip and two rings, as opposed to the Unbalanced TS connection which just has the tip and a single ring.


## DI Boxes
- "Direct Insertion" Box
- **3 Functions**:
    - **Connector Matching**
        - Outputs an XLR connection which is typically what you need to plug into a PA or speaker
    - **Impedance Matching**
        - Impedance is resistance to electrical flow.  
        - All instruments have an output impedance.
            - If they don't have an onboard preamp, instruments (e.g. most electric guitars) are most likely high-impedance.
            - If you have an impedance mismatch between instrument and sound reinforcement or recording equipment, you'll experience hi-frequency loss.
        - The DI box has:
            - High Impedance INPUT (to match with instrument)
            - Low Impedance OUTPUT (to match with recording/sound reinforcement technology)
		- **FACT CHECK THIS**
    - **Signal Balancing**
        - Unbalanced signals can only be transported up to 15 feet before they risk degradation through:
            - Hum / Buzz
            - Interference / Acting as an antenna
- **When to Use**:
	- Running an unbalanced signal greater than 15 feet
	- If you have a ground loop
		- Typically a 50-60 Hz hum in the line
		- Caused when the interconnected musical equipment draws power from different circuits, which have incompatible ground references.
		- The DI box contains an Audio Transformer which breaks the coupling of the different circuits.
- [Buying Guide - NEEDS REVIEW](http://thehub.musiciansfriend.com/live-sound-buying-guides/how-to-choose-the-right-direct-box)


## How Guitar Pickups work
- Magnetic pickups create an AC current
- 



