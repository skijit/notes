The Fencepost Problem
==================

TODO - MORE INFO / EXAMPLES / BETTER EXPLAIN THIS
[see this](https://betterexplained.com/articles/learning-how-to-count-avoiding-the-fencepost-problem/) and [this](https://en.wikipedia.org/wiki/Off-by-one_error)


- When counting, we need to determine whether we are looking for:
    - Span
    - Number of Points involved
    
- Suppose I am working from Dec 1 - Dec 3:
    - Span = 3 days
    - Points = 4 days
    - So the number of days I worked were 4
    
- This is called the Fencepost Problem
    - Imagine you need a 100 ft fence.  
        - How many posts?
        - How many spans (the things that connect the posts)?
        
    - Span = regular subtraction
    - Posts = span + 1
    
- Basic idea:
    - Are we counting distance or time?  Subtraction is a span.  Just use regular subtraction.
    - Are counting items?  Then use (b - a + 1)
    
- Example that DOESN'T work like this:

- Nights need at a hotel
    - Staying from Dec 1 - Dec 3:
        - It's 3 days, and I only need 3 nights because we only count the "interior" points

