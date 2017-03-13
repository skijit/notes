JavaScript Speech Recognition
========================

## High-Level Process

- Digitize, find word endpoints, cut up into phonemes, phonemic recognition (to determine word), output confidence weighted results
    - English has 44 phonemes, french and german are in the 30s
    - Most language: 112 phonemes, Least language: 11 phonemes
- Phonemic recognition model will look for the best matching word
- Then they're analyzed against a grammar
- Confidence weighted results

## Status 
- Recognition rates between humans speaking same language is 97%
    - Anything less than 97% drives people nuts
    - Best speech recognition rate is about 92% currently
- Why so hard?
    - Vocabulary size
    - homophony
    - initiated vs spontaneous speech (isolated means you prompt the system before speaking)
    - adverse conditions (noise)
- Some packages a speaker-dependent and some are speaker-independent
- Mobile Speech Recognition
    - Andoid - Gooogle Now - Java API
    - iOS - SIRI - SPSpeechRecognizer API (iOS 10+)
- W3C Speech API Spec
    - only implemented by Chrome and FF
    - 3 methods
        - start
        - stop
        - abort
    - Values / configs
        - Grammars
        - language
        - continuous
        - interimResults : give the intermediate results, which it may go back and fix
        - maxAlternatives (between 3-7 is best)
            - You might want to look at the 2nd or 3rd result in case your first choice isn't expected
        - serviceURI : for vendor-provided functionality 
    - Events
        - onstart/end
        - onaudiostart/end
        - onsoundstart/end
        - onspeechstart/end
        - onresult
        - onnomatch
        - onerror
- Some recognizers work online and some offline
- he connected his dictated questions to wolfram alpha
- Speech Synthesis SPEC
    - All browsers have implemented
    - offline
    - C++ package
- Speech recognition engine biased towards men
- Annyang - library for continuous speech
    - You can set it up with a command grammar
- There are plugins to use speech apis in mobile
