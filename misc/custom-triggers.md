Creating Custom Triggers
======================

- Midi Triggers vs Piezo/Contact Mics
- Hardware vs Software solutions

&nsbp;  
&nsbp;  

http://www.soundonsound.com/sound-advice/making-your-own-drum-triggers

&nsbp;  
&nsbp;  

- I don't want to buy a really expensive sound card, and I don't really need to have audio data.
- Maybe a good solution would be to add accelerometers to the sticks, send that via USB to an Arduino that has multiple inputs (for different sticks) and then it sends a midi out for each one.
    - [example](http://www.instructables.com/id/Arduino-Air-Drums/)
    - [This](https://hackaday.io/project/9350-exadrums) guy uses a RBP!

&nsbp;  
&nsbp;  

- [Arduino Getting Started Guide](http://www.makeuseof.com/tag/getting-started-with-arduino-a-beginners-guide/)
- Arduino Uno
    - Processor: 16 Mhz ATmega328
    - Flash memory: 32 KB
    - Ram: 2kb
    - Operating Voltage: 5V
    - Input Voltage: 7-12 V
    - Number of analog inputs: 6
    - Number of digital I/O: 14 (6 of them pwm)
    

&nsbp;  
&nsbp;  

- On Latency and Gamelan/Accelerometer
    - Maybe some good news:
        - If the strikes follow a somewhat uniform pattern and you detect with an accelerometer...
        - You don't have to wait for the hammer to strike- you can trigger at the beginning of the strike!  
    
