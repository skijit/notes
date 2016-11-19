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

## Tutorial 3 
- `jit.op` performs math operations on the entire jitter matrix, rather than 1 cell at a time.
    - you specify the math operation you want to use with the *@op* attribute.  EG *@op +*
    - operands can be matrix & scalar, or matrix & matrix
    - a scalar operand can be passed into an inlet (usually the right one), or you can specify it using the *@val* attribute.  EF *@val 3*
    - some scalar operands should be int and some should be float: it just depends on the op you use.
    - you can target individual planes of a matrix with the following syntax: *@op pass + + +*
        - assumes a 4-plane matrix
        - first plane (presumably the alpha) is 'passed'.  It is not changed.
        - The remaining rgb planes are all passed forward.
        - If you want to specify per-plane operations where the operands are scalars, pass these in a list to the right inlet.
- `jit.matrix` initializes with all zeros.
- each time you bang on a `jit.matrix` it creates a new matrix

### jit.op op values
    pass = pass left input, no operator 
    * = multiplication (also mult) 
    / = division (also div) 
    + = addition (also add) 
    - = subtraction (also sub) 
    +m = addition modulo (char only) (also addm) 
    -m = subtraction modulo (char only) (also subm) 
    % = modulo (also mod) 
    min = minimum 
    max = maximum 
    abs = absolute value (unary) 
    avg = average 
    absdiff = absolute value of difference 
    fold = folding/mirrored modulo (float only) 
    wrap = wrapping/positive modulo (float only) 
    !pass = pass right input, no operator 
    !/ = right input divided by left input (flipped) 
    !- = right input minus left input (flipped) 
    !% = right input modulo left input (flipped) 
    ignore = leave previous output value 
    Trigonometric Operators: (float32/float64 only, unary except atan2) 
    sin = sine 
    cos = cosine 
    tan = tangent 
    asin = arcsine 
    acos = arccosine 
    atan = arctangent 
    atan2 = arctangent (binary) 
    sinh = hyperbolic sine 
    cosh = hyperbolic cosine 
    tanh = hyperbolic tangent 
    asinh = hyperbolic arcsine 
    acosh = hyperbolic arccosine 
    atanh = hyperbolic arctangent 
    Bitwise Operators: (long/char only) 
    = bitwise and 
    | = bitwise or 
    ^ = bitwise xor 
    ~ = bitwise compliment (unary) 
    = right shift 
    = left shift 
    Logical operators 
    = logical and 
    || = logical or 
    ! = logical not (unary) 
    = greater than 
    = less than 
    = = greater than or equal to 
    = = less than or equal to 
    == = equal 
    != = not equal 
    p = greater than (pass) 
    p = less than (pass) 
    =p = greater than or equal to (pass) 
    =p = less than or equal to (pass) 
    ==p = equal (pass) 
    !=p not equal (pass) 
    Exponential/Logarithmic/Other: (float32/float64 only, unary except hypot and pow) 
    exp = e to the x 
    exp2 = 2 to the x 
    ln = log base e 
    log2 = log base 2 
    log10 = log base 10 
    hypot = hypotenuse (binary) 
    pow = x to the y (binary) 
    sqrt = square root 
    ceil = integer ceiling 
    floor = integer floor 
    round = round to nearest integer 
    trunc = truncate to integer 

## Tutorial 4
- You can use `jit.movie` to play a movie
    - 2 ways to get successive frames:
        1. Connect it to a `qmetro`
        2. Just keep a `jit.world` (toggled on) in the patch
    - You can set looppoints
    - You can query it for all sorts of info like framerate, duration, time, vol, etc.
    - Changing the *@rate* attribute will change how quickly (and fwd/back) it plays back
    - You can jump to specific frames by sending it a *frames* message

## Tutorial 5
- `jit.pack` and `jit.unpack` handle different planes of a matrix
- char data (8 bits) is usually sufficient for each plane: it gives you ```- 2^24 ``` different colors!

## Tutorial 6
- you can use `jit.scalebias' to scale (multiply) or bias (add) to the values in a jitter matrix
- the operands you send for the scale and bias operations will be between 0-1.  `jit.scalebias` will do the necessary conversion and return a matrix whose values are still char (0-255).
- you can target individual color channels for scaling or biasing with messages like *gbias*, *bscale*, etc.
- you can swap color channels by sending a `jit.matrix` a message like 'planemap 0 3 2 1' which will swap red and blue planes


## Tutorial 7
- `jit.brcosa`
    - Changing brightness is equivalent to scaling (ie multiplying) all the values by a number
    - 




