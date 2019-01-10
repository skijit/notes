Information Theory and Information Entropy
======================================

- source is a cool series of videos from 'art of the problem'.
- [intro](https://www.youtube.com/watch?v=p0ASFxKS9sg), [1](https://www.youtube.com/watch?v=69-YUSazuic), [2](https://www.youtube.com/watch?v=MM6BrZwkBRA), [3](https://www.youtube.com/watch?v=musBo7Kafic) [4](https://www.youtube.com/watch?v=WrNDeYjcCJA), [5](https://www.youtube.com/watch?v=3QLnosS853Q), [6](https://www.youtube.com/watch?v=8jlMuBn6Zow), [7](https://www.youtube.com/watch?v=xcjgm6ctzAw), [8](https://www.youtube.com/watch?v=Cc_Y2uP-Fag), [9](https://www.youtube.com/watch?v=X40ft1Lt1f0), [10](https://www.youtube.com/watch?v=o-jdJxXL_W4), [11](https://www.youtube.com/watch?v=3pRR8OK4UfE), [12](https://www.youtube.com/watch?v=R4OlXb9aTvQ)

- information takes a specialized meaning in this context:
  - refers to the signal used to communicate an idea to another person or device
    - 'signal' = some representation of an idea
  - does NOT refer to semantic content
  - information theory refers to the symbolic aspects of information
- information, no matter the form, can be measured using a fundamental unit: bit
  - the bit can be thought of as the answer to a yes/no question
- that information can be characterized by entropy and then compared across sets with varying amounts of data (bits)
- information theory discusses these things and whether information has a maximum rate or 'speed limit'

## Invention of the Alphabet
- In any language, messages can be formed by arranging symbols in some specific patterns
- Key insight is the development of symbol sets which are:
  - Smaller in size
  - Faster to write
  - Portable from one language to another (because they represent sounds)
  - One of the driving factors was invention of a more portable medium than stone: paper (or papyrus)!

- pictogram: a drawing which represents a *physical object*
- ideogram: a drawing which represents an *abstract idea*
- Rebus principle: when you represent a word with a combination of drawings of objects whose names combine to form the word
  - heiroglphyics often used this approach

- Historical Progression of Symbol Sets
  - heiroglyphics (3200 BC)
    - symbol set used...
      - word signs
        - thousand of these
      - sound signs
        - 140 total, with only 33 distinct phonemes represented
      - 1500 total synmbols
    - medium advances leading to innovation in symbol sets
      - originally stone
      - then papyrus
        - at which point the technology trickled down to normal people, not just the scribe/priestly/govt class.
        - then a new, faster, cursive developed called *heiratic*.        
          - 700 total symbols
        - then a new script with even less symbols developed: *demotic*
          - it focused on almost exclusively sound symbols
          - closed to 70 symbols
  - cuneiform (3500 BC)
    - used by sumerians
    - originally > 2000 symbols
      - mixture of word and sound signs
    - new language developed: acadian
      - they reduced the symbol set to 600 by selecting primarily sound signs
  - phonecian alphabet (1000 BC)
    - maritime, mediterranean culture
    - symbol space 22
    - 1 sign represents one consonant
      - symbols were borrowed from hieroglypics but the first sound of the word was used to represent the consonant
    - then the real innovation:
      - this alphabet was adapted to other languages across the world!
    - source for greek and roman alphabets we know today

## Signal-Based Communication
- Signals
  - A signal is a message over some medium
  - Some communication media require more complex signalling methods than other
    - Easy: Paper
      - At a physical level, it's alphabetic characters written over a clean medium
    - Hard: Digital communications
      - At a physical level, it's pulses of voltage over a line
  - The benefit of some of these harder signalling methods is that we can communicate:
    - Faster
    - Over broader distances

- Design Decisions / Trade-offs
  - Physical Considerations: medium-related
    - SNR: Find a signalling method with a good signal to noise ratio, given the inherent noise in the medium
    - Capacity: (aka symbol rate) the maximum speed at which you can send successfully messages due to limitations of the medium or sending/receiving methodology
  - Discrete Source: The symbol set you select to represent decoded messages
  - Coding Considerations: the method you use to encode (map) signals to the discrete source
    - Probabalistic Encoding
      - If there is no fixed "cost" for each messaging, then some messages will take more time than other
      - You want to minimize the total amount of time for signalling
      - If there's a non-uniform statistical distribution to the frequency of some messages, you would map those messages to the lowest cost (i.e. fastest signals)

- Historical Signalling Methods
  - Signal Fire
    - Switch between two states
    - Message space is small
  - Torch methods where length of illumination denoted some fixed message associated with the time of illumination
  - Two sets of torches where the illuminated one in each set indicates a column or row to some matrix of fixed messages
    - 2 symbols, each with 5 values
    - Allows 5 x 5 messages
  - Francis Bacon 
    - Given X y/n questions there are 2^X possible answer sequences
  - Development of telescopes really improved signalling methods
  - Shutter Telegraph
    - 6 rotating shutters
      - each has 2 states: open or closed
    - Thus 2^6 possible differences (or messages)
      - That's enough for all letters and more
    - messages could be carried great distances by being relayed over sequential beacons
  - Telegraphs
    - The discovery of static electricity led to experiments which demonstrated a charge could be transmitted over a copper wire
    - Original telegraph had 26 wires: one for each alphabetic character
    - See 'Leyden Jar' for some interesting static electricity experiements
    - The discovery of current electricity, particularly Volta and his proto-battery, Voltaic Pile, led to innovations which resulted in the discovery that current running through a wire could influence a compass
    - In 1832, Gauss and weber designed a newer telegraph system based on a galvanometer (a compass inside a coil of wire).  
      - The circuit had 2 symbols corresponding to the polarity of the current (as this would send the needle in different directions)
      - The encoded messages with these symbols corresponding the frequency of various alphabetic characters
        - e.g. A -> single right, E -> single left, K -> 3 right deflections
      - signal rate was 9 letters per minute
    - This led to the formation of the Electric Telegraph company, formed in 1846 in Europe
      - They purchased all the telegraph patents of the time
      - signal rate was still limited to 60 letters per minute and the cost was quite high
    - Samuel Morse was an american portrait painter who felt he could improve the signal rate to telegraphs
      - He threw out the needle-based method and instead focused on how a current could be interrupted.
        - His designs got pretty good when he collaborated with Albert Vail        
      - The pattern of those interruptions could be a meaningful coding.
        - These were essentially 'pulse widths'
          - Short pulse: dot
            - also dot is the the basic time unit 
          - 3 unit pulse: dash
          - delimter: 3 unit pause
      - He also developed the sending and receiving hardware.
        - the receiving hardware created sounds driven by an electromagnet responding to the interruptions of flow electricity.
      - Morse encoding is gaussian based on character frequency
      - Price came down, signal rate went up
      - As more people used them, a code-book was developed where certain words became shorthand for common longer messages
        - this introduced a business problem since they charged per letter.  What is the best way to charge for information?
          - for an answer, skip to the "quantifying information" section
- Pulse Rate
  - The speed at which we could transmit data in early telegraph systems was the minimum pulse rate (i.e. the pause between pulses)
    - Remember at the lowest level this is just a binary encoding (current or interruption) in a sequence divided by some clock
    - However the limiting speed was not the clock
    - It was limited by the minimum spaces between impulses
    - That's because the message you recieve over time will not be an exact replica, but a slightly distorted, smoothed out shape where if the pulses are too close, they just bleed together in an indeterminable shape.
      - This is called the symbol rate
- Edison's innovation - the quadriplex teleegraph
  - Since basic telegraphs were just using 2 symbols, they developed an innovation where you could have signals of different strengths and polarity to give you more symbols in the signal. 
  - So now you have 4 different pulse types: +3, -3, +1, -1
  - But there's only so far you can go with this approach in electrical systems because you have limitation of eletrical noise
- communication system's capacity emerges as:
  - symbol rate: (baud) n
  - number of differences: (symbol space) s
- capacity unit is "message space"
  - It's essentially how many different things you *could* say
  - The message space can be thought of as a decision tree whose structure is determined by the symbol space and the symbol rate
  - The number of symbols is the number of edges radiating from any node
  - The depth of the tree is the symbol rate
  - The message space are all the leaves
  - message space = s^n

## Quantifying Information
- How much should you charge for sending a message?
  - You should charge for however long it takes you to send it.
  - But there can totally differnt types of messages - you'd need a common unit for measuring the message size.
- Recall that all messages transmitted thus far have been based on 1 or more differences (fire on/off, voltage on/off, etc.)
- What are the minimum number of y/n questions do you need to ask to determine the message?
  - n = number of questions, message space = 2^n
- What is the expected number of questions given a message space of 26?
  - log2 26 = 4.7
  - 4.7 splits to represent a character
- "split" = y/n question
- number of splits = bits
- in the 1920's, Hartley (who worked with Nyquist) provided a quantitative measure of information in "The Transmission of Information"
  - information = H
  - H = n log s
    - n = number of symbols
    - s = number of symbols available at each selection point
  - alternately formulated, H = log s^n
  - essentially, this is the log of the number of possible symbol sequences (ie log of the message space)
- new problem: if we can devise encodings (ie thru compression) that provide the same message space but with less total questions, does this not change the definition of H?

## Probabilities and Markov Chains

- Weak Law of Large Numbers
  - If you randomly sample from some distribution, over time you'll converge upon the actual distribution
  - Bernoulli example: mixing 2 different color beads into a jar in some fixed ratio (e.g. 2/3), and the randomly sampling one at a time and noting the probability

- 2 related observations about probabilities
  - Measurements will converge on the actual average
  - The variation from those averages also follow familiar distribution
- The binomial distribution
  - If you look at a large number of random trials, you often observe this distribution
  - Central Limit Theorem: events will converge on predictable distributions
- Independent Varaibles vs Dependent Variables
  - Nekrasov claimed distributions only make sense given independent trials, but that the world is based on dependent phenomena
  - Markov disagreed.  He sought out to prove that the Law of Large Numbers can apply to Dependent variables.
    - He devised a thought experiment similar to Bernoulli's
    - In one jar you have a 50/50 mix of light and dark beads
    - In another jar you have more dark vs light beads
    - There are rules for selecting which jar you choose from
      - If a dark previously occured, pick from jar 0
      - If a light previously occured, pick from jar 1
    - Then you run the machine, peforming the samples from whichever jar
    - The probability of a light vs dark are clearly dependent
    - However: as you record the frequency of picking from each jar, as the sample size increases, the machine settles to an equilibrium that represents a specific ratio.
    - So, again even with dependence, you converge upon some common distribution.
    - This kind of machine is known as a Markov Chain
- Claude Shannon's Famous Markov Chain
  - Showed how you can create a markov chain (of increasing complexity) to approximate the appearance of valid english
  - Inherent in the design of language is a certain statistical dependence of letters on their predecessors (and some randomness)
  - Thought Experiment:
    - Imagine a toy language that is just a sequence of A, B, and C characters
    - Given an example sequence, you notice that A's clump together, whereas B's and C's do not
    - You can design a markov chain to generate similar looking text
      - zeroth order approximation: randomly select A, B, or C where they have equal probability
        - equal to a 1 state machine with a single A, B, and C characters
        - result: doesn't look like the sequence
      - 1st order approximation: same as 0th order, but select each character with the probability of their occurence in the original sequence 
        - so they're no longer equally probable.  The relative number of characters in the jar represent their frequencies in the original sequence.
        - result: follows the relative probability, but doesn't capture the structure (i.e. clumps)
      - 2nd order approximation: begin considering the probabilities of 2-lenght sequences.
        - create 3 states: 
          - state 1: All 2-length sequences that begin with A
          - state 2: All 2-length sequences that begin with B
          - state 3: All 2-length sequences that begin with C
          - each pair in the given states has the probability as what was observed in the original sequence.
        - result: more improvement. the structure is starting to emerge because this captures the dependence of each character.
      - 3rd order approximations: 
        - considers all sequences of length 3 (tri-grams)
        - requires 9 states.  all trigrams that begin with (AA, AB, AC, BA, BB, BC, CA, CB, CC)
        - result: even better
    - You can use this same procure with:
      - Sequence of letters in english
        - produces stuff that looks like english, even though many words are made up
      - Sequences of words in english
    - So these machines produce (usually) meaningless english but with an equivalent statistical structure as english      
  - Conclusion: A quantitative measure of information in a message must be associated in the design of the machine which could be used to generate such sequences

- Information Entropy
  - Consider 2 sequence-generating-machines of 4 characters
    - Machine 1: Everything is equally probable
    - Machine 2: A mixture of probabilities
      - P(A) = 0.5, P(B) = 0.125, P(C) = 0.125, P(D) = 0.25
  - Which machine produces more information?
    - If you had to predict the next symbol from each machine, what is the minimum number of y/n questions you would ask?
  - Number of questions = P(A)*number_questions_to_get_to_A + P(B)*number_questions_to_get_to_B + P(C)*number_questions_to_get_to_C + P(D)*number_questions_to_get_to_D
  - Machine 2 has less number of questions than Machine 1
    - Machine 2 is producing less information because there is less uncertainty about it's output
  - Entropy is defined as the average uncertainty
    - Entropy is max (1) when all outcomes are equally likely
    - Entropy is min (0) when the probability for some outcome is 1 (ie no uncertainty)
    - there's a nifty graph showing this for two outcomes
    - More complex machine = more entropy = more surprise = more information = less "purity" for a data set
    - Less complex machine = less entropy = more certainty = less information = more "purity" for a data set
    - Unit of uncertainty is the bit
    - H = Sum(p_i * num_questions_i)
    - num_questions_i = log2(number_outcomes_i)
    - number_outcomes_i = 1/P_of_that_outcome
    - number_questions_i = log2(1/P) <=== this is most interesting part
      - for a single random variable, the reciprocal of a probability is the 1-in-n scale of probabilities
        - e.g. if P = 0.01, then 1/P = 100, and the event has a 1 in 100 chance of happening
        - and notice, if P(A) < P(B), then 1/P(A) > 1/P(B)
      - we also know that log2 of a message space tells us the number of levels in a (binary) decision tree which can cover all values
        - e.g. 26 chars, log2 26 = 4.7, if there were 32 (2^5) characters, log2 32 = 5, and there would be 5 levels in the decision tree
        - each level is like a question that is required to get to a leaf
      - but here's we're not dealing with a message space, we're dealing with a 1-in-n probability
        - but that n is a lot like the message space, because that's the number of test cases we expect to run before we see this value 
      - so we're figuring out how many questions (bits) are required to cover the number of test cases in which we expect to see i    
    - H = sum(p_i*log2(1/P_i))
    - H = - sum(p_i*log2(P_i))

    

## Further Study
- Markov Chains vs Decision Trees
















      


    




    



