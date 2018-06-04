Acoustics - Chapter 3 - Spectra
========================

## Motivations
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

## Spectra
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

## Filters
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
## Subtractive Synthesis
  - Start with a harmonically rich signal and then filter it down (the subtractive part) to the sound you want.
  - Some good examples of harmonically rich signals to start with:
    - white noise
    - pulse train
    - any recording

## Inner Ear as a Filter Bank
- TODO: Need to spin this off as a Beginning PsychoAcoustics set of notes
- Additional source [here](https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Critical-Bands-in-Human-Hearing/ta-p/416798)
- https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Sound-Modulation-Metrics-Fluctuation-Strength-and-Roughness/ta-p/397796
- https://community.plm.automation.siemens.com/t5/Testing-Knowledge-Base/Masking/ta-p/435073
- https://en.wikipedia.org/wiki/Critical_band
- https://en.wikipedia.org/wiki/Auditory_masking
- https://ccrma.stanford.edu/CCRMA/Courses/152/combination_tones.html
- [short animation showing cochlea responding to sound](https://www.youtube.com/watch?v=gd5nSKNaHZ8)
- [audition process](https://www.youtube.com/watch?v=6GB_kcdVMQo)
- https://www.youtube.com/watch?v=fwi8p_iSMz4

- [great psychoacoustics playlist](https://www.youtube.com/channel/UCz-7EFd3_gwFfBdaiNdKeqA)
- range of hearing is a curve on spl and frequency (iso 389-7)
- masking
  - white noise, play tone inside
  - as you raise the masking noise the threshold rises across frequencies mostly linearly (10db raise in noise, 10dB raise in threshold)
    - except at lower and especially higher frequencies, it becomes a little less sensitive to the tones
    - this process is called simultaneous masking
  - what about masking with narrow band noise?
    - example: playing a band of noise centered around 1.2 kHz (range: 0.9 kHz - 1.8 kHz), then you play the main signal below rising throught that band and eventually above.
      - it is masked while in that range.
    - therefore masking is specific to the frequency of the masking signal
  - 



## TODO 

- More notes on physiology of hearing
- Add in lecture notes
- Questions
- Project