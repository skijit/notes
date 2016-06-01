#Polynomials

##Basics

* __Polynomial__ means 'many terms'.

* A polynomial can have __3 parts__:
	1. Constants
	2. Variables
	3. Exponents
		* Must be constants, not variables
		* Must be >= 0

* The terms can be __joined__ by:
	1. Addition
	2. Subtraction
	3. Multiplication
	4. Division

* Two __Exceptions__:
	1.  No division by variables
	2. No negative exponents
* __Why__ These Exceptions?
	* The category for 'polynomial' is a little artificial.  It is based on grouping algebraic forms which have similar properties.  These exceptional cases vioilate those properties, so they're not considered polynomials.

----
##Properties

__Given:__   $ 4xy^{2}+{3x}-5 $
Part        | Example
--------    | -------
Terms       | $ 4xy^{2}$, $ {3x} $, $ 5 $
Constants | 4, 3, -5
Variables | x, y
Exponents | The 2 in $ y^{2} $


Monomial
:   Polynomial with 1 term

Binomial
:  Polynomial with 3 terms

A polynomial __cannot have infinite terms__

Some Non-Polynomials
Expr   |   Reason
--------- | ---------
$ 3xy^{-2} $ | Exponent not $ \geq $ 0
$ \frac{2}{(x+2)} $ | Dividing by variable
$ \sqrt{x} $ | Exponent not $ \geq $ 0 (exponent is -1/2)

__Polynomial Properties__
1.  Add Them  $ \rightarrow $ polynomial
	* *Recall*: To Add polynomials, just add the constants of 'like terms'
2. Multiply Them $ \rightarrow $ polynomial
	* *Recall*:  FOIL method
3. They have __no poles__ : no discontinuities where they go to infinity
4. They're *analytic* functions, meaning they're well defined everywhere, as are their derivatives.

__Polynomial NON-Properties__
If you divide polynomials, you might not get a polynomial
* Polynomial division can be tedious/tricky: one trick is where you factor out the numerator as a multiple of the divisor.  If that doesn't work, you need to use polynomial long division.

---

##Polynomial Degree##

There are different properties to each polynomial, depending on the degree.

Higher degree (aka order) of a polynomial generally means it's hard to solve.
*  *Solve* means the same as finding the *roots* or just finding the values where the function is 0.

__Finding the Degree__:

* If there is only 1 variable, it is the largest exponent of that variable.
* If there are multiple variables, you need to add the exponents of the each variable for each term and take the largest.
	* $ x^{2}y + x + 5 \rightarrow $ 3 because (2+1) from first term.
* If the variable occurs in division (making it not a strict polynomial), you subtract it's exponent from that term.  
* Some degrees are hard to determine and so you use a trick like dividing the log of the function with the log of the variable, and you see what value is converged upon.

Standard Form
:   Sorting the terms by their order, highest first to lowest

**Some Common Degrees**
Expression | Degree
-------------| -------------
log(x) | 0
$ e^{x} $ | $ \infty $
$ \frac{1}{x} $ | -1
$ \sqrt{x} $ | 1/2


---

###The Fundamental Theory of Algebra###
Any polynomial of *n* degrees has *n* roots.


---

TODO: Graphs of Polynomials
