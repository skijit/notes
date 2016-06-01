#Physical Sound#

##Elementary Physics##

###Energy (E):###
 * There are various kinds of Energy
	* Kinetic, Potential, Heat, etc.
 * Can be contained by an object, or a property of an object
 * __Unit__ = Joule (J)
	* Can only be measured by observing changes in Energy 

###Force (F):###
* A force is the attemp of energy to move
* __Unit__ = Newtons (N)
* Just because a force is exerted on an object doesn't mean any Energy changes.
	* A dam in _Equilibrium_: bc although the water exerts a force, the dam holds.

###Pressure (_p_):###
* A force acting on a surface
* __Unit__ = Pascals (Pa)
	* 1 Pa = 1 N/m<sup>2</sup>
* _p_ = F / A, where A is the Area
* At sea level on earth, there is an ambient pressure of 101325 Pa
	* Acoustic pressure is usually measured relative to this value, rather than dealing in absolutes.

###Work (W):###
* The ability to cause a change in Energy
* __Unit__ = Joules (J)
* Energy might conversely be thought of as the ability to do work
* $ W = \Delta E $

###Power:### 
* The rate at which work is done
* __Unit__ = Wass (W)
* 1 W = 1 J / sec
	* A perfect 100 W amplifier converts 100 J of electrical energy to sound each second.

###Laws of Thermodynamics and Motion:###
* Thermodynamics:
	* Second Law (Entropy)
		* Energy is always trying to go from a high state to a low one.
		* It tries to spread itself as thinly as possible in the universe.
	* Third Law (Action / Reaction)
		* If object A exerts a force on object B, object B will exert an equal and opposite reaction on A.
		* When the forces are balanced, we call it _equilibrium_
		* **TODO**: VERIFY THIS
* Motion:
	* Second Law
		* F = _ma_
	* **TODO**

###Matter and Mass:###
* Matter is a condensed form of Energy
* Has mass (M) measured in kg and has weight while in a gravitational field
* Most matter exist as compounds or molecules: groups of different atoms
	* Exception might be some monatomic crystals
* You can visualize sound propagating through matter as the result of collisions between small points of mass.

###Force, Distance, and Accelleration###
* W = F x _d_ , where _d_ is distance
* Velocity (v) is the rate of change of distance
	* __Unit__ = m/s
* Accelleration (a) is the rate of change of velocity
	* __Unit__ = ms<sup>-2</sup>  
* F = _ma_ will help:
	* Explain how air moves to create sound
	* Explain how simple hormonic motion occurs
* 1 N will accelerate a 1 kg object at 1ms<sup>-2</sup>

###Sound-Related Terms###
* We measure displacement in m, relative to an objects _rest point_ or _equilibrium position_, where it is undisturbed by any vibrations.
* _Degrees of Freedom_ refer to how many ways an object can move.
	* Translational Movement:
		* up/down
		* left/right
		* forward/backwards
	* Rotational Movement: 
		* Around one of it's 3 axes: intersecting in the object's center of gravity
			* Longitudinal axis ("front to back"): roll 
			* Perpendicular axis ("top to bottom"): yaw
			* Lateral axis ("side to side"): pitch  
* Excitation Point: where power is transmitted to an object	
	* Characteristics of both the Exciter and the Excited contribute to a sound

##Materials##
* The state or phase of matter that an object is in reflects the type of bonds that are active.
* There are lots of different kinds of bonds, with different strengths
* Each molecule is held in space by a balance of electrostatic bonding forces that mutually attract and repel it from its neighbors. 
* Sounds travels through an object as a cascade of vibrations where each point is exerting a force on its neighbors.
* Sound travels more quickly through more dense, strongly bonded material (e.g. Steel)
* Elasticity: when an object is displaced from it's equilibrium position it gains mechanical energy to help it return to it's equilibrium position.
	* This is very important to harmonic motion and ultimately sound.
* Strain: the distance a material will move elastically
* Stress: the force applied to an elastic material
* You can view some materials as relatively homogenous or heterogenous, structurally.
	* Homogenous materials (e.g. metals) tend to give purer tones
	* Heterogenous materials (e.g. wood) less pure tones
	* glass and ceramics are somewhere between metals and wood

##Waves##
* Waves are a pattern of change that propagates through a medium
	* Note that the velocity of the medium is separate from velocity of the wave.
		* e.g. water in a pool does not move at the speed of the wave.
* Compression: when pressure increases, i.e. the instantaneous amplitude of the waveform is positive.
* Rarefaction: when pressure decreases, i.e. the instantaneous amplitude of the waveform is negative.
* Sound waves are longitudinal: the compression/rarefaction occurs in the same direction as propgation
	* Like holding a slinky horizontally and pulling it back
* Transverse waves move in a direction perpendicular to propagation
	* In a solid medium, a transverse wave might also be called a '__bending wave__'
* Sound waves propagate through air at about 340 m/s.  It travels faster in liquids, usually (since they're denser).
* Waves on a musical instrument string are called __standing waves__
	* They're really the transverse waves you would expect, however at each boundary/terminus, the reflected wave constructively interferes with the incident wave and it results in a wave which appears not to propagate, but have some number of fixed points (depends on the number of harmonics) which stay at 0 at all times.
	* Standing waves can also occur in the air- such as in pipes.  See [this](http://www.acs.psu.edu/drussell/Demos/StandingWaves/StandingWaves.html ).
	* More related notes [here](#standingWaves)
* Phase velocity is the speed at which the wave propagates
* There is a thing called _Group Velocity_ which refers to the speed at which energy travels.
	* In most acoustic situations, group velocity is the same as phase velocity
	* Group velocity, as separate from phase velocity, can be observed in ripples in a pond when an individual wave might be faster than the rest.
* Frequency:
	* _f_ = 1 / T where T = cycle time
	* __Units__ = Hz (cycles per second)
* Basic Wave Math
	* $ c = {f}{\lambda } $
		* Where c = speed of sound and $ \lambda $ = wavelength
		* Unit analysis: $ \frac{count}{sec} \cdot \frac{meters}{1}$ 
	* $ \lambda = {c} / f $
		* Unit analysis: $ \frac{meters}{sec} \cdot \frac{sec}{count} $
	* $ f = c / \lambda $
		* Unit analysis: $ \frac{meters}{sec} \cdot \frac{1}{meters} $
	* It should make intuitive sense that the wavelength depends on frequency and speed of the wave.  
	* 20mm for highest frequencies
	* 17m for lowest frequencies

##Boundaries##
* A __boundary__ occurs when a wave propagates from one material to a different kind.
	* The resulting __boundary behavior__ depends largely on the ratio of the elasticity and density of the materials involved, called a __boundary modulus__.
	* The resulting behavior may include:
		 1.  __Reflected Wave__ (continuing through the original medium in the opposite direction)
		* If the new medium is:
				* __Flexible/Elastic__: the reflected wave will be in phase (b/c the energy will be stored as Potential Energy and released as Mechanical Energy when it restores. (Aka __Free End Reflection__)
				* __Inflexible__: the reflected wave will be out of phase (b/c the displacement at the boundary will be 0 and so an equal and opposite force will be reflected).  (Aka __Fixed End Reflection__)
		* As with light, angle of incidence = angle of reflection
		 2.  __Refracted Wave__ (i.e. Transmitted Wave), propagating through the new medium.
		* Angle of refraction will be proportional to the ratio of the speed of the sound in each medium, per __Snell's Law__.			
	* If the boundary modulus is 1 -> there is __no reflection__.
	* If the boundary modulus =! 1, there will be a __mixture__ of reflection and refraction.
		* Ex: Boundary Modulus between air and water is very high, so it's almost all reflection.  Very little sound is transmitted to the new medium.
		* There are cases where if the angle of incidence is just right (moving from air to water), there will also be no sound reflected!
* The shape of a vibrating object is in many cases more important to the ultimate sound than the materials.
	* B/c it affects the way frequencies build up and decay and which frequencies will be the strongest.
* As sounds decay, their __Entropy__ increases, until ultimately, the energy is too spread out and random to do work.


### <span id="standingWaves">Standing Waves and Modes</span>###

Natural Frequency
:   The frequency that an object vibrates at when struck.  All objects have one or more natural frequencies.
:  These frequencies are largely determined by the characteristics of the object: size and dimension may ultimately determine the wavelength(s) ($ \lambda $) and the materials may determine speed ($ c $), giving us  $ f $.

Forced Vibration
: Any time one vibrating object forces an interconnected/coupled object into vibrational motion.
:  When the object which is forced into vibration has a larger surface area than the exciting object, this causes an increase in the amplitude of the sound.  E.G. A piano's sound board, a guitar's soundbox, etc.

Resonant Forced Vibration
: Forced vibration can be induced on an object by another, even if their only coupling is the air (i.e. they don't touch), if their natural frequencies are similar.  In that case the first object creates a sound wave which in turn sets the second object into motion.

Standing Wave
: When a wave propagating through some medium encounters a boundary/terminus which causes reflection, two things can happen:
1.  A regular, standing wave
2. An irregular, non-repeating wave

*  A standing wave creates an interference pattern where certain points along the medium appear to be still, hence the term 'standing wave'.    These points are called __nodes__.
* The set of frequencies which create standing waves are known as __harmonics__ and they are whole number multiples of some base frequency.
* __Natural frequencies of an object = Harmonics which produce standing waves __

Modes
: This is just an alternate way of classifying the different standing wave patterns, like harmonics.  Each mode has a particular number of nodes.

##Analogues##
  
 


 
 