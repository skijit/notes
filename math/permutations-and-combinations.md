Permutations and Combinations
===========

- **High-Level**
	- Big decisions:
		- Is it ordered?
		- Can you have repetition?
	- Permutation = ORDERED
	- Combination = NOT ORDERED
	- So, 1 Combination can have many Permutations
		- Combination: 1,2,3  (1 total)
		- Permutations: {1,2,3}, {2,3,1}, {3,1,2}, {3,2,1}, {2,1,3}, {1,3,2} (6 total)	
	- For this reason, Combinations are simpler (?)	
	- General form of these types of problems is:
		- Some Representation on the Number of Things to Choose From Based on Stipulations / Some Representation on the Number of Choices Based on Stipulations
		- **OR**
		- Multiply me some some stuff / No so fast, buddy
		
- **Language**:
	- Count the variations of "n things to choose from and r choices".
		- Big stipulations are:
			- Order: Does the order of each item in the variation matter?
				- Ordered: "Permutation"
				- Unordered: "Combination"
			- Repetition: For each choice, in each variation, do our options stay the same (ie repeition is fine) or become less (no repetition)
	
- **Permutations**:
	- 2 Types:
		- Repetition
		- No repetition
	- W Repetition:
		- At each choice r_1, r_2, ..., we still have n things to choose from
			- Exponent-driven
			- `- n^r ` choices 
	- No Repetion:
		- At each choice r_1, r_2, ..., we have progressively less options to choose from
			- Factorial-driven
			- n!			
		- If you don't want to calculate the factorial all the way down to 1, divide by the lower limit factorial
			- **Ex**: 16! / 12! = 16\*15\*14\*13
		- General form:
			- n! / (n-r)! of n things to choose from, you have r choices
			- another way of notating this: P(n,r) = n!/(n-r)!
				- note that as r gets bigger, so does P because it makes the denominator bigger, and, as you imagine: having lengthier amounts of choices increases variations
		
- **Combinations**		
	- Order doesn't matter	
	- Combinations without repetition like a special case of Permutations without repetitions, except that we have to reduce the number by a factor of 1/r!
		- n! / r!(n-r)!
		- This is also called a binomial coefficient or sometimes "n choose r"
	- Remember how I said, "No-repetition permutations are factorial-driven".  Well, Combinations with repetition also use factorials, but:
		- we increase the number of things to choose from from n to n + r - 1, which increases the numerator
		- we change the number of choices from r to (n-1)!, which probably increases (since r <= n) the denominator becomes 
		- they're also increasing the number of choices from n! to (n + r -1)! / r!(n-1)!.
		
