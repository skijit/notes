Home Electrical Systems
==============
- In the US, homes have 2 hot leads that are separated by 180deg.
    - This is called **Split Single Phase**
    - Compare to 3 phase below
- Why is touching the neutral wire unlikely to shock you?
    - If you touch the hot wire, the current has to decide whether to flow in you or the device (e.g. a lamp).  In many cases, those resistances are comparable, and so the current will flow into both.
    - If you touch the neutral wire, the current has to decide whether to flow to you or back to ground.  In that case, there's much less resistance to going straight to ground, so it won't flow into you.
- There's a difference between grounding a device and having a surge protector.
    - Surge protectors only work if the grounding works.
    - If you have your device grounded, your electrical components might still be damaged.
    - The only thing the grounding will do will redirect current on the chassis to ground.
- Why is the neutral connected to Ground in the Service Panel?
    - [src](https://www.nachi.org/forum/f19/ground-and-neutral-bonded-service-box-25185/)
    - [src](http://www.esgroundingsolutions.com/why-do-you-have-to-bond-the-neutral-and-the-ground-wire-in-the-main-panel/)
    - First of all, the neutral **cannot** be bonded to the ground in a subpanel, otherwise you could get current flowing from neutral to ground to chassis of whatever appliance is plugged in.
    - At the Main service panel, the neutral is bonded to the ground to handle excess current situations:
        - This makes the ground a legit return path, but because of the high impedance of ground, very little current flows into it
        - In the event that a lot of current flows into it, this will trip circuit breakers.
            - If you have extra current running on ground, it can couple to the neutral, be sent back to the transformer, but that increase in current will be detected by the circuit breaker, causing it to stop.
        - Note also that the neutral is grounded at other places, including the transformer on the pole, and other locations.
    

- **Neutral vs Ground**
    - Under normal conditions there won't be any current flow on the ground.  It only occurs in fault conditions like when the chassis becomes electrified due to a short or voltage overload.
    - [Per here](http://electronics.stackexchange.com/questions/213479/neutral-vs-ground-wire)Say, for example, that the insulation on your hot wire gets damaged and the conductor comes into contact with the metal body of your washing machine. The current shorts through the chassis and then through the ground wire. This high current causes your circuit breaker (or fuse) to trip. If you didn't have the ground wire then the mains voltage would electrify the entire chassis. Then the next person touching it becomes the return path.
    - In products that do not have metal chassys a ground is typically not required. Further products like this are also typically double insulated.

- **3 Phase Power**
    - Rather than delivering a single AC, you get three separate AC's, each evenly spaced apart so that you have more or less constant, consistent power delivery.
    - Various motors and other (typically industrial) hardware can be designed to use much less current with 3-phase power
    - 3 phase power is also used on transmission lines in the US