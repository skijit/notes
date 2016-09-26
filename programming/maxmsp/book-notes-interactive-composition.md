Interactive Composition
========
Notes from the Book [Interactive Composition](https://www.amazon.com/Interactive-Composition-Strategies-Using-Ableton/dp/0199973822/)

## Misc
- Keystroke / Shortcuts
    - 'n' => new object
    - 'b' => new button
    - 'i' => number box	
    - 'm' => message box
    - 't' => toggle button
    - 'c' => comment
        - you can add to presentation mode to use as a label, if an object doesn't have a label (e.g. number box)
    - 'l' => show all live ui objects which are optimized versions of max ui objects and are more easily midi/macro mapped
- `makenote`: 
    - IN: midi pitch number, velocity, duration
    - OUT: midi note-on message, or a 0-velocity message (note-off)
- `noteout`: sends midi notes out onto the channel
- `metro`: metronome object that will send bangs at a specified length of time
- `svf~` : state variable filter (can be a hp, lp, bp, or notch filter depending on inputs)
- `panel`: creates a color background
    - you can set gradients or send to back, etc.
- `omx.peaklim~` : a limiter (good to patch in when you're using feedback)
- double clicking in the design surface will bring up the object explorer
- set default amounts for ui objects with the 'initial enable' and 'initial' attributes
