Logarithms
=========================== 
**Status**: Needs more graphs, explanations, and examples.  

## Why have logarithms?

- Logarithms count the order of magnitude.
	- It is more convenient to say a "6-figure salary", than 100,000 to 999,999
	- If you move from an 8-bit computer architecture to a 16-bit architecture, you get 8 more bits.  Each additional bit is an extra order of magnitude, but an additional '8-bits' is preferable to saying '256 times larger' \\( 2^8 = 256 \\).
* Logarithms help us find a 'cause' for an 'effect' in an exponential relationship.
	* __Ex__: How do you explain having $100 grow to $150 in 5 years?
		* Since we know interest is a primarily exponential function, we get:  \\( \ln {\frac{150 / 100}{5}} = 8.1\%  \\) growth.
* Logarithms help us __count steps__ in an exponential growth scenario:
	* 10 grew to 1,000 in 2 steps because `-  \log_{10} 1000  - \log_{10} 10 = 3 - 1 = 2 `   
	* Another way to say this is that logs are helping us count _steps of multiplication_.
* Helps us address human _number blindness_ for large numbers.
	* `- 0 = \log_{10} 1 `
	* `- 80 = \log_{10} 10^{80} ` [ which equals the number of molecules in the universe ]
	* So a 0-80 range is more easy to understand
* Some common scales which are logarithmic:
	* Decibels
	* Richter
	* Google Page Rank
* Graphs which use logarithmic scales make an exponential curve linear.
![enter image description here](https://github.com/skijit/Notes/blob/master/resources/images/math/image002.jpg?raw=1)
* Simplified large multiplication back in the day, b/c you could decompose it into an expression where the terms were mostly logs, which could be evaluated by checking a table.
* Algorithm complexity analysis:
	* __Binary Sort__ is O(log n) because the number of operations is, at worst, proportional to the order of magnitude of the size of the input (assuming base 2).
		* Recall: You take a sorted array, check the middle element.  Then if the target is larger, take the middle element of the top half, repeat.
	* __Merge Sort__ is O(n log n) because as a divide and conquer algorithm, it's divide step is proportional to the order of magnitude of n (again, base 2) and each conquer/merge/recombine step (of which there are log n) is linearly proportional to n.  So you have O(n log n).
	![enter image description here](https://github.com/skijit/Notes/blob/master/resources/images/math/Merge_sort_algorithm_diagram.svg.png?raw=1)
* References:
	* [Better Explained](http://betterexplained.com/articles/using-logs-in-the-real-world/)

## Some Interesting Facts
* If "6-figure" usually implies 100,000, what logarithm would describe 500,000?
	* Intuitively, you might want to say 6.5 since that's half-way between 6 and 7 (and thus 100,000 and 500,000).  __But it's wrong!__
	* In logarithmic terms, the .5 means square root, not divide by 2.  
	* If you calculate the log, it turns out \\( \log_{10} 500,000 = 5.7 \\) !
* Interesting Property:
	- `- \log_x y * \log_y x = 1 `
		- **Ex 1**:  `- x = 2, y = 3 `
			- `- \log_2 {8} = 3 `
			- `- \log_8 {2} = 1/3 `
			- `- 3 * 1/3 = 1 `
		- **Ex 2**:  \\( x = 5, y = 103 `
			- `- \log_5 10 = 1.43068 `
			- `- \log_{10} 5 = 0.69897 `
			- `- 1.43068 * 0.69897 = 1 `


