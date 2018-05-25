Acoustics - Chapter 3 - Spectra
========================

- Sinusoid preserving operations:
  - Given an input sinusoid, the operation will output another sinusoid, changing at most:
    - amplitude
    - phase
  - Examples
    - The 3 fundamental operations (mix, amplify, delay)...    
    - Many Physical systems
      - Filter
- Since complex signals can be thought of as a collection sinusoids...
  - This lets you predict the affect of a physical system on more complicated input
- Spectra
  - Vertical axis is usually power rather than amplitude, in which case it is called *power spectrum*.
  - **Discrete spectrum**: when frequencies are binned into discrete, non-continuous buckets
  - **Continuous spectrum**: 
    - real signals in nature have continuous spectra
    - the area under the power spectrum is the total average power of the signal
    - so the continuous power spectrum shows how power is distributed over frequencies (units are Watts per Hz)
  - Tradeoff measuring spectra:
    - The more time you have:
      - greater spectral resolution
      - lesser temporal resolution
    - and vice versa
  - When the spectral resolution is not high, you will see sidelobes for frequencies which may not exist
- Filter
  - Frequency response, ```- g(f) ``` of a filter, describes how it's output varies with frequency
    - it basically descibes gain across a range of frequencies
    - Gain is a positive ratio between 0-1
      - Makes frequency response easy to graph
    - ```- \text{frequency response in }dB = 20 \log g(f) ```
  - common types include:
    - low pass
    - hi pass
    - bandpass / aka resonant
  - Resonant filters:
    - Can imitate physical systems (e.g. mouth)
    - select ranges of frequencies to treat in a particular way
    - have 3 parameters:
      - peak gain
      - center frequency (where there is the biggest gain)
      - bandwidth
        - how you define this is variable, but usually it means twice the distance from the center point to where it is 3 dB less
- Subtractive Synthesis
  - Start with a harmonically rich signal and then filter it down (the subtractive part) to the sound you want.
  - 

## TODO 
- https://wigglewave.wordpress.com/2014/08/16/pulse-waveforms-and-harmonics/
  - talk about period, wavelength, when things become audio

- Great links on acoustics [here](https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Critical-Bands-in-Human-Hearing/ta-p/416798)

- add in lecture notes and more stuff on hearing