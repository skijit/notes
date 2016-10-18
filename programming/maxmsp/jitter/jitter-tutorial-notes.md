Max/MSP Jitter Tutorials
============
- Notes from working through the Jitter Tutorials in Max

## Jitter Matrix
- A Jitter Matrix can have any number of dimensions
- When the cells in the matrix have 4 different values, each value is on a different 'plane'.
- A single frame of video will be a 2x2 jitter matrix with argb values comprising 4 planes
- You can specify a variety of data types in a matrix: char (8bit), int (32bit), float (32bit), double (64bit)
- Video data, even though the data is numeric, typically only needs 8 bits for each color, so 'char' is selected as the data type over the 4 argb planes.

## Attributes
- Jitter objects typically require that a lot of attributes be set on them
- Setting attributes as arguments using '@' syntax is fine as well as changing them dynamically: just send a message with the attribute name and new value (no need for 'set')
- Most jitter objects process jitter matrix data
- Most jitter objects take 4 standard parameters that are related to the matrix they intend to process:
    - <planes_of_data> <data_type> <dim1_len> <dim2_len>
    - You need to specify your arguments/parameters before you begin setting attributes on the object statically
- THere are getters for individual cells and attributes

## Tutorial 1
- Most Jitter objects communicate by only sending the names of the jitter matrix they should be operating on.
- To initialize a matrix:
    - jit.matrix <optional_name> <planes> <type> <dim1_len> ...
- When you bang on a matrix, it will return its name.
- `jit.print` will dump the contents of a matrix to the max window
- Getting Matrix Data- send it a message:
    - getcell <x> <y>
- Setting Matrix data-send it a message:
    - setcell <x> <y> val <val>
- Other messages for a jit.matrix:
    - setall <val>
    - clear

## Tutorial 2
- `jit.matrix`
    - first argument is an optional name
        - then... <planes_of_data> <data_type> <dim1_len> <dim2_len> 
    - sends out its name from the left outlet name when banged
    - sends results of queries out its right outlet, e.g. from *getcell x y*
- `uzi`
    - sends a rapid fire of bangs out its left outlet
    - sends a counter int out its right outlet
    - only gets started when it receives a bang in it's left inlet
    
