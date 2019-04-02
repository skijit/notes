Push 2 Notes
=====================

- Setup Notes
  - Have MIDI tracks listening to specific devices (not all)
  - Don't have any other software using the asio audio driver at the same time (might conflict with audio)
  - If MIDI signals act weird, re-plug in

- Issue: 
  - Somtimes the audio is going out then the clip doesn't accept input.
  - Workaround: refresh selecting audio driver and replug in push
  - Driver Type: Asio
  - Audio Device: Focusrite USB Asio

- Pad Button Colors
  - In a drum rack, they'll follow whatever track color you have
  - Special modes:
    - White when selected
    - Green when playing
  - If not selected and not playing - whatever you're set up as
  - To change a pad color:
    - `Select` button
    - Press `Shift`+`Pad`, holding down shift and select a color in the perimeter color wheel



## Step Sequencing

### Getting started
- Click `Add Device`, select a drum kit, and press the `Load` button on the right
- This loads a Device Chain
- Pad grid is divided into 3 sections
  - Top 4 rows: 32-step sequencer
  - Bottom left: 16 drum sounds
  - Bottom right: Loop selector section (TODO: more info??)
- To get the step sequencer going:
  - Select a drum sound
  - Start adding to the sequencer pads (this will engage the transport)
- To stop:
  - Transport is in the bottom left
- `Duplicate` button clones the clip and plays the new one
- To select a sound without playing it:
  - `Select` + `Pad`
- To delete all of a sound:
  - `Delete` (hold) + `Pad`
- To temporarily mute a sound:
  - `Mute` (hold) + `Pad`
- To temporarily solo a sound:
  - `Solo` (hold) + `Pad`
- Clip view: `Clip`
  - To select a sound (midi lane): `Select` (hold) + `Pad`
- To adjust a particular sequenced sound:
  - (in clip view): `Step Pad` (HOLD) then adjust Nudge / Length / Velocity
  - This works for multiple steps at the same time too
- If the clip is playing, the Arrow buttons will move you from one clip to the next playing (legato mode!)
- `Double loop` doubles the length of the loop
- The loop length controls lets you fixate on one page of the sequence by clicking on that page.
  - To re-engage 'follow' mode: press and hold the `Page` button 
  - You can click on a page outside that loop and it will take you there- looping.  There might be nothing there though.
  - To loop only over one section of the loop selector, double click that 
  - To (overlay) copy a page: `Duplicate` (HOLD) + `source page` + `destination page`
    - To not overlay, delete the destination page first: `Delete` (hold) + `destination page`
- To Add Swing to the entire loop: 
  - `Quantize` (hold) + change settings : To enable them, press quantize again.

## Recording Drum 
- Set Metronome volume: `Shift` (hold) + `Master`
- Setting clip length before you record: `Fixed Length` (hold) + `whatever length in display`
  - Then click the `Fixed Length` once, making it blink
  - Then you press `record`
- `Repeat` button (when flashing), lets you keep pressing stuff down (note: still velocity sensitive)
  - You can affect the swing on the repeat using the encoder right above the metronome
- `Accent` lets you record a pad at a fixed high velocity
- To play drums with 16 fixed velocities:
  - Press the `Layout` button.  Now the loop selector section will be a grid of 16 velocities for the selected pad.
  - This works with repeat mode too
  - You can also use this to enter specific velocities into the step sequencer

## Navigating in the Menu
- When you click a pad, the buttons below the 8 encoders give you access to the various stages of the rack, where you can change settings.  For example, you can select:
  - Rack macros
  - Drum rack settings
  - Simpler settings
  - etc.

- to delete an automation, just hold `Delete` + the tap the corresponding encoder

## Melodic step sequencer
- Rows are notes, Columns are steps
- Uses whatever scale you've selected
- Clip view works as expected
  - select + hold the pad(s) you want to adjust
  - Setting note length here could be very useful (there's anothe way too- see below)
- Setting note length:
  - hold down the pad and press the same pad where you want it to end
- You can copy individual notes (or assign to differnt position / pitches)
- To change the loop length:
  - Clip view + `Shift` (hold) + encoders to change the loop length
  - You can also change the starting position!
- Device view works with automation
- `Shift` (hold) + `Layout` gives you the loop selector on the top row

## 32-Note melodic step sequencer
- to get started, you press the `layout` twice
- bottom half is note entry
- note entry:
  - method 1: hold the sequence slot and press the pad(s) you want inserted there
  - method 2: press the note pad(s) and then click the sequence slot you want that at
- there's no loop selector bc it steps across successive rows in the top half
- `Shift` (hold) + layout will give you loop selector  at the 4th row.  So you can add more than 32 steps.


## questions
- does the loop length adjustment work on the normal step sequencer too?


  