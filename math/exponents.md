Exponents
=====================
**Objective**: Clarify varieties of exponential growth and *e* so that it's all simple and intuitive. 
&nbsp;  
&nbsp;  
**Current Status**: Document needs a bunch of work... `IN PROGRESS!`


## Correcting Some Misconceptions

- Consider the following example:
![enter image description here](https://raw.githubusercontent.com/skijit/Notes/master/resources/images/math/LinearVsExponential.png)
    - **Burgundy:** \\( f(x) = (3/2)x + 1 \\)
    - **Blue:** \\( g(x) = 2^{x} \\)

- Notice how the exponential curve starts slowly and then overtakes the line?  I used to think there was some special property to exponential growth in the stage prior to overtaking the line.  It wasn't obvious what those properties were, but it kept me from feeling totally confident about this subject.  A lot of people have a similar intuition, but we're apparently wrong!  
- Many people will refer to an exponential function like \\( 2^{x} \\) as having an inflection point or a _knee_, when in fact, it has neither.
	1.  **Inflection Point**: This is when the curve changes concavity.  Informally, concavity can have 2 values:
		* **Concave Up**: AKA **Convex** like \\( g(x) = 2^{x} \\).  
		* **Concave Down**: Bent the other way
	    - You can detect an inflection point by determining where the second derivative is 0.
	    - \\( g(x) = 2^{x} \\) has **no inflection points**!

	2.  **Knee**: This is a visually identifiable trait where a function has a dramatic change in curvature, like suddenly becoming much steeper.  
        - The key that is has to be localized.  
        - If the curve doesn't have an inflection point, but you think there are different properties across its range, it might be knee.  
        - Knees are a less rigorously defined characteristic than an inflection point.  But alas...
		- \\( g(x) = 2^{x} \\) has **no knee either**!
		- For proof, check out [this page](http://www.abarry.org/knee.htm), which animates a zoom-out of \\( g(x) \\) in the y-axis only.  It shows that the **_knee_ is purely a function of the scale chosen**.  It does shift/translate across on the x-axis, but the shape is the same.  So clearly, **this is not a knee bc it's not localized!**

- So what's really going on?
	- The Line chosen is just a random line that happens to intersect in two locations with the exponential curve.
		- The fact that it is initially growing faster than the \\( g(x) \\) is only because \\( g(x) \\) is starting with basically no growth!  It has to _exponentially multiply to catch up_, whereas \\( f(x) \\) is given this slope from the very beginning.  
	- **It's almost a visual illusion!**
		- The shape is a function of the scale/units chosen.  Therefore the following attributes have **no special significance**:
			- When the derivative exceeds some value (e.g. 1)
			- When the curve achieves a 45 degree angle. 
		- Something about the transition from small to big makes us think the knee exists.
	- For more info, see the following links: 
		- [what-inflection-point?](http://alexmehr.com/2013/06/05/what-inflection-point/)
		- [we dont understand the exponential function](http://www.kazabyte.com/2011/12/we-dont-understand-exponential-functions.html)
		- [this is not a knee](http://www.abarry.org/knee.htm)
		
## Exponential Growth Models
### General Form
- Exponential growth is just a way of scaling some original value...
> \\( origVal \ast GrowthFactor = newVal \\)  
> where...    
> \\( GrowthFactor = GrowthBase^{GrowthExponent} \\)
	
- **GrowthBase** and **GrowthExponent** are _structural_.  Essentially, formula _placeholders_.
- 2 intuitive concepts have to be mapped to these placeholders:
    1. **GrowthRate** : e.g. _ChangeAmount_ / _TimeInterval_.
    2. **Duration**: The amount of time given for growth.  Possibly be a multiple of _TimeInterval_ or not, depending on growth model.
- How these intuitive concepts compose **GrowthFactor** is dependent on the **type** of Exponential Growth Model. 

### Growth Model Taxonomy
- Exponential Growth Models can be classified based on the _granularity_ (i.e. continuous or discrete) of 2 factors:
	1. **GROWTH**
	2. **COMPOUNDING**

- **GROWTH**
	- **Discrete Growth** is when **newVal** is updated on some discrete interval (e.g. _TimeInterval_)
	- **Continuous Growth** is when **newVal** is updated continuously
- **COMPOUNDING**
	- Compounding refers to whether updates to **newVal**, which are more recent than the last _TimeInterval_, can be included as further inputs for growth (prior to reaching the next _TimeInterval_).
	- Just like **Feedback** or rolling interest into principal.
	- **Discrete Compounding** can have a resolution between _TimeInterval_ and _Almost Continuous_.
	- **Continuous Compounding** allows new growth to immediately contribute further growth.

- **One Exception**: There is no such thing as Discrete Growth with Continuous Compounding
	- The compounding granularity cannot exceed the growth granularity.

- **What this looks like (Nutshell Version)**
	![enter image description here](https://raw.githubusercontent.com/skijit/Notes/master/resources/images/math/exp-growth/Slide1.PNG)

	- Growth is only evaluated on the multiples of *TimeInterval*
	![enter image description here](https://raw.githubusercontent.com/skijit/Notes/master/resources/images/math/exp-growth/Slide2.PNG)
	
    - Growth is updated continuously, and it is steeper as compounding frequency increases.  
	- Compounding consolidates the recent growth so that it can be the basis for still further growth (like feedback).
	![enter image description here](https://raw.githubusercontent.com/skijit/Notes/master/resources/images/math/exp-growth/Slide3.PNG)
	
    - At continuous compounding, we hit an upper limit on growth.  As you will see, this involves using **_e_** as the **_GrowthBase_**.	

## Non-Exponential Growth
- A common analogy for exponential growth is to use _Compound interest_.
- Conversely, there is the scenario of _Simple Interest_...
> _Simple Interest_ is NOT an exponential growth scenario!
 
- Simple Interest is calculated as: `- Balance = Principal \ast Rate \ast Duration `
	- Notice there is no exponent in here!
	- To put this into our original formula: **GrowthFactor** = **GrowthRate** * **Duration**
- The interest you earn is never _fed back_ or _rolled_ into the principal.
- Your balance (total money earned) keeps the same slope or trajectory throughout!
 ![enter image description here](https://github.com/skijit/Notes/blob/master/resources/images/math/simple_interest_trajectory.png?raw=true)

## Discrete Growth and Compounding

### Simple Exponential Growth
- In simple exponential growth, compounding only occurs at _TimeInterval_.
- Mapping:
	- \\( GrowthRate \rightarrow GrowthBase \\)
	- \\( Duration \rightarrow GrowthExponent \\)

- So plugging back into the original formula:	
> \\( origVal \ast GrowthFactor = newVal \\)     
> where...     
> \\( GrowthFactor = GrowthBase^{GrowthExponent} \\)
>         
> We expand \\( GrowthFactor \\) to...     
> \\( GrowthFactor = ( 1 + GrowthRate )^{Duration} \\)    
>    
> And finally get...    
> \\( origVal \ast ( 1 + GrowthRate )^{Duration} = newVal \\)


- Why the 1 in \\( GrowthBase \\)?  B/c we want to _grow_ not shrink!
- Note that you express the \\( GrowthRate\ \\) in terms of percents (typically between 0-1 for 0-100% growth).
- Examples of \\( GrowthBase \\):
	* **Ex**:  100% GrowthBase \\( = (1 + 1) \\)
	* **Ex**:  200% GrowthBase \\( = (1 + 2) \\)

> Compared to the linear equation, we've changed \\( Duration \\) from a **_multiplier_** to an **_exponent_**	


![enter image description here](https://raw.githubusercontent.com/skijit/Notes/master/resources/images/math/ReallySimpleExponentialGrowth.png)
**In this image- Various Exponential Growth:**
- Continuous growth: solid line, Discrete growth: dashed line
- Burgundy: No Growth: \\( f(x) = 1^x \\)
- Green: 50% Growth: \\( f(x) = 1.5^x \\)
- Blue: 100% Growth: \\( f(x) = 2^x \\)     
- Yellow: 200% Growth: \\( f(x) = 3^x \\)    

- How do I know it's compounding? 
	- Visually, Slope is changing
	- Logically, since \\( Duration \\) is the exponent, that means an additional *multiplication* of \\( GrowthBase \\).
	- Contrast this with a linear formula which means another *addition* of \\( GrowthBase \\).   
	- *Scales* just means *is multiplied*.  So...
		- **Exponential Growth** \\( \rightarrow GrowthFactor \\) scales by \\( GrowthBase \\) !	
		* **Linear Growth** \\( \rightarrow GrowthFactor \\) scales by \\( Duration \\) .		
- If it's not intuitive why scaling by \\( GrowthFactor \\) is better than \\( Duration \\), consider the functions:
- **TODO: Make sure marked is rendering tables correctly- see that tables: true in setOptions() and check out [this](https://guides.github.com/features/mastering-markdown/) **
> `- f(x) = 2 * x ` 
> `-( g(x) = 2^x `       
    
| _x_ | f(_x_) expanded | g(_x_) expanded | f(_x_) | g(_x_) |
| ----| ------- | -----| ---- | ---- |
| 1 | 2 \* 1  | 2  | 2  | 2  |
| 2 | 2 + 2  | 2 \* 2  | 4  | 4  |
| 3 | 2 + 2 + 2  | 2 \* 2 \* 2  | 6  | 8  |
| 4 | 2 + 2 + 2 + 2  | 2 \* 2 \* 2 \* 2  | 8  | 16  |

- Or put differently...
    - **Exponential Growth** -> stacks multiplications
    - **Linear Growth** -> stacks additions		
- And we know:
    - Addition: Stacks Counting
    - Multiplication: Stacks Addition
    - Exponents: Stack Multiplication

### Applications

- Examples where the compounding occurs at *TimeInterval* (usually yearly):
	- Annual Raises
	- Inflation
	- **TODO**: More examples...
 
## Continuous Growth and Discrete Compounding
- You can compound more frequently than *TimeInterval* to consolidate intervening growth.
- Let's see what happens to **GrowthFactor** over a single *TimeInterval* as we progressively increase compounding frequency.
- Recall our original formula:
> \\( origVal * GrowthFactor = newVal \\)    
>   
> And for Simple Compounding...    
> \\( GrowthFactor = (1 + GrowthRate)^{Duration} \\)     
>     
> Giving us...      
> \\( origVal * (1 + GrowthRate)^{Duration} = newVal \\)      
>      
- If we compound twice in \\( TimeInterval \\) , then at \\( GrowthRate \\) = 100% , we will have 2 periods of 50% growth.  However \\( GrowthExponent \\) will NOT equal \\( Duration \\) as before because we have to consolidate that growth twice in \\( TimeInterval \\).  Recall, compounding entails scaling by \\( GrowthRate \\), so we need to do that an additional time.  
> So compounding twice in \\( TimeInterval \\) , we get:    
> \\( GrowthFactor = (1 + 100\%/2)^2 \\)      
>       
> Compounding 3 times in *TimeInterval* yields:     
> \\( GrowthFactor = (1 + 100\%/3)^3 \\)    
>      
> Compounding *n* times in *TimeInvterval* yields:     
> \\( GrowthFactor = (1 + 100\%/n)^n \\)    
>    
> And we find that within a single *TimeInterval*, **GrowthFactor** converges to 2.718... (which is **_e_**) as we increase compounding frequency.

![enter image description here](https://raw.githubusercontent.com/skijit/Notes/master/resources/images/math/SimpleVsCompoundedTwice.png)
**In this image:**
- Continuous growth: solid line, `Discrete growth`: dashed line
- Burgundy: \\( f(x) = 1 * (1 + 1)^x \\)     
- Blue: \\( g(x) = 1 * (1 + 0.5)^{2x} \\)     

- **Takeaways** 
	- We get increased growth by compounding more frequently.
	- Simple Exponential Growth is like a special case of Continuous Growth with Discrete Compounding where the compounding is done on *TimeInterval*.
		- That means new Growth is only factored into 

- **Problem with my Description**
    - I think we only get a continuous curve when we're compounding continuously
	- The growth can still be continuous.  But as we increase compounding, our straight line segments just become shorter. 
	- Discrete growth is only when the value is evaluated at time interval.

**TODO** Clarify the Derivation of e

## Continuous Growth and Compounding

`- f(x) = m(x - x1) + y1 `

- **Growth Rate**: 
	- In some models of exponential growth, the growth rate is factored into the growthBase.
	- Other models factor it into the _duration_ exponent.

## e and Exponential Growth

### Simple Exponential Growth

- This is called 'Simple' bc the \\( percentGrowth \\) occurs over one increment of the duration value.
- **todo**- graphs and relate to interest

### Compounding Exponential Growth


## Some Interesting Explanations
### Why negative exponents work as they do
- If you think \\( x^2 = 1 \ast x \ast x \\), then \\( x^{-2} = 1 / x / x = 1/x^2 \\).
	- Because the inverse of multiplication is division.
	- **But wait!** The inverse of 2 is not -2 but 1/2, so shouldn't \\( x^{1/2} = 1/x^2 \\) ? 
		- There are various types of inverses:
			- Additive inverse of 2 is -2
				- _Centered_ on 0 (b/c 2 + -2 = 0)
			- Multiplicative inverse (aka reciprocal) of 2 is 1/2.
				- _Centered_ on 1 (b/c 2 * 1/2 = 1)
			- Inverse function of \\( f(x) = y \\) is \\( f^{-1}(y) = x \\)
				- **TODO**: Expand on how the inverse of a function works
			- **TODO**: Clarify this _Centered_ idea.  Is it legit way to see various types of inverses (or reciprocals)?
		- So we use the additive inverse in the exponent to produce a multiplicative inverse (reciprocal).
			- This seems pretty common: operations on exponents are additive, even though their ultimate evaluation is multiplicative in domain.

### Why fractional exponents work as they do

- This is derived from the "Law of Exponents" which tells us \\( x^4 \ast x^4 = x^8 \\) (bc we can add the exponents together)		
- Once this is established, then we can deduce that a fractional exponent is a root b/c \\( x^{1/4} \ast x^{1/4} \ast x^{1/4} \ast x^{1/4} = x^{1/1} = x \\) and so \\( x^{1/4} \\) must mean the 4th root bc that's the only number multiplied by itself 4 times that will render x.			
- But also know that \\( x^{4/3} \\) is like saying take the cube root of \\( x^4 \\).  This is proved by decomposing it into a whole number and fractional part: 
`- x^{4/3} = x^{(4 * 1/3)} = (x^4)^{1/3} `  
That is ok b/c of another law of exponents:  \\( x^{mn} = (x^m)^n \\) .

### Why the 0th Exponent is 1
- Here's a cool proof about why the 0th exponent is 1: `- 1 = 3^4 / 3^4 = 3^{(4-4)} = 3^0 `





