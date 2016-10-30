
Misc Signal Level & Type Info
==============================
- TODO:
	- Signal levels
	- Signal types
	- Noise / Interference
	- Passive / Direct

## Balanced Vs Unbalanced Connections
- **Balanced Signals**:
	-  **3 components**:
		- Main Signal
		- Main Signal Inverted (180 deg)
		- Ground
	- **Purpose**: They're used when in scenarios where the Signal To Noise Ratio is high.  This can happen in two circumstances.
		- **Input Signal Level is very weak**
			- common in microphones 
			- This is a problem bc even a small amount of noise picked up from via interference (<i class="icon-help"></i>), etc. will be amplified along with signal.
		- **Line is very long** 
			- > 20 feet allowing it to pick up a lot of interference.
	- **Method:** Balanced signal is input to a _differential amplifier_ which inverts one signal and adds them together.  Assuming the noise received in each of the 2 non-ground signals is the same, the only component of the signal that is completely out-of-phase will be the noise.
	- **2 Connection Types**
		- XLR (ie from mics)
		- 1/4" cable with a TRS (Tip-ring-sleeve) connection.  This will have the tip and two rings, as opposed to the Unbalanced TS connection which just has the tip and a single ring.
- **TODO** Explain unblanaced signals


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
            -  High Impedance INPUT (to match with instrument)
            - Low Impedance OUTPUT (to match with recording/sound reinforcement technology)
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





