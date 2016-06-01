Generative Music
================
A workshop by [Adam Florin](mailto:adamflorin@gmail.com) about Generative Music and his M4L device, [Patter](http://adamflorin.com/work/patter-realtime-freeform-generative-music/)


## Historical Background
- Mozart played a musical dice game where they resequence measures
- ILLIAC machine- 50 years ago- composed music (did NOT perform them, btw)
- John Cage
    - Indeterminiate (**aleatoric**) music based on procedures like:
        - Coin tosses
        - Dice
        - [I Ching](https://en.wikipedia.org/wiki/Music_of_Changes) (Apparently this book has some type of numerological approach to answering a readers questions)
- Generative music coined by Brian Eno
- Current Apps:
    - Examples:
        - Nodal
        - SynthPond
        - NodeBeat
        - Game of Life (Newscool)
        - [**Rhythm Necklace**](http://rhythmnecklace.com/)
    - Characteristics
    - Good for ambient
    - Some involve geometric and/or random processes

## Patter
- Music can be chpped up into segments
- Bottom-up / Emergent
- MIDI generator
- Rhythm Area:
    - Set a distribution of durations
    - Rests have the same duration as notes
    - Set Notes per segments
    - Set rests per segment
    - So length of segment is based on:
        - Length of notes / rests
        - How many notes               
        - How many rests        
- You can have a chain of Patter instances and they will start after the previous segment ends
- There will be a free version on GitHub eventually
- Notes are quantized
- No variation on velocity
