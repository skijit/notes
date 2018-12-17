Intro to Python (for Data Science)
========================

- [how to use kaggle kernels](https://www.kaggle.com/docs/kernels)
- [main ref](https://www.kaggle.com/learn/python)
- [wtop](https://www.kaggle.com/sohier/whirlwind-tour-of-python-index/)

## Python Basics

- variable type declaration not needed before using
- no trailing semicolons
- conditional expression ends with a colon

```(python)
if blah > 0:
  print("this is printed")
```
- colon indicates a new code block
  - **indentation matters bigtime**: subsequent lines which are indendented are part of that code block
- strings can be marked by single or double quotes
- example of python operator overloading

```(python)
# will print "this is my string this is my string this is my string "
# + is string concatenation
print("this is my string " * 3)

# print with segments
print("Height in meters =", total_height_meters, "?")

print(min(1, 2, 3))

print(abs(32))

# casting example
print(float(10))
print(int(3.33))
print(bool("1"))
print(str(1.0))
# They can even be called on strings!
print(int('807') + 1)

# a and b will have the same memory address
a = b = 0
```

- types:
  - int
  - float
  - use `types(varName)` to get a type
- other numerical operations
  - `//`: floor division.  removes fractional part (remainder)
  - `%`: modulo.  just the remainder
  - `a ** b`: exponentiation.  a to the power of b

```(python)
import random
n = random.randint(2, 20)
```

- printing help: 
```(python)
# print info about this function
help(abs)
```

- example of python function

```(python)
def least_difference(a, b, c):
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    return min(diff1, diff2, diff3)
```

- docstring: to expose descriptions for user-defined function to the `help()` function, use a triple-double-quote:

```(python)
def least_difference(a, b, c):
    """Return the smallest difference between any two numbers
    among a, b and c.
    
    >>> least_difference(1, 5, -5)
    4
    """
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    return min(diff1, diff2, diff3)
```

- a function which returns no value will have a return value of `None` (like null)
- named parameters are ok:

```(python)
print(1, 2, 3, sep=' < ')
```

- default parameter values are ok too
```(python)
def greet(who="Colin"):
    print("Hello,", who)
```

- function pointers are easy

```(python)
def call(fn, arg):
    """Call fn on arg"""
    return fn(arg)
```

- lambda one-liners are ok
```(python)
mod_5 = lambda x: x % 5
abs_diff = lambda a, b: abs(a-b)

print('101 mod 5 =', mod_5(101))
```

- after you begin a block of code, python requires at least one line
  - `pass` is a keyword you can use that does nothing
  - it's just a placeholder

- bool values: `True` and `False`
- bool operators: `and` and `or` and `not`
- if else

```(python)
if x == 0:
  print(x, "is zero")
elif x > 0:
  print(x, "is positive")
elif x < 0:
  print(x, "is negative")
else:
  print(x, "is unlike anything I've ever seen...")
```

- when casting to a bool, empty sequences are usually false

- one-liner conditional expressions:

```(python)
outcome = 'failed' if grade < 50 else 'passed'
```

- example lists

```(python)
primes = [2, 3, 5, 7]
planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
hands = [['J', 'Q', 'K'], ['2', '2', '2'], ['6', 'A', 'K']]
my_favourite_things = [32, 'raindrops on roses', help]

# zero indexed
planets[0]

# reverse (from the end) index references
planets[-1]

# slices
planets[0:3]
# reformulation of the last statement (ie they're equal)
planets[:3]
# All the planets except the first and last
planets[1:-1]
# The last 3 planets
planets[-3:]
# you can do in place modifications of lists on selected slices
planets[:4] = ['Mercury', 'Venus', 'Earth', 'Mars',]
# returns True
"Earth" in planets
```

- list functions
  - len
  - sorted
  - sum
  - append
  - pop: removes / returns last element
  - index : like js indexOf()
  - 
- tuples
  - differences from lists:
    - use parens instead of square brackets
    - are immutable
  - good for return values in functions
    - let's you do this:

    ```(python)
    numerator, denominator = x.as_integer_ratio()

    # or try this method for swapping
    a, b = b, a
    ```

- loop examples

```(python)
planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
for planet in planets:
    print(planet, end=' ') # print all on same line

# you can also loop over each character in a string with the in operator

# enumerate returns the index and value
for i, num in enumerate(nums):
  if num % 2 == 1:
    nums[i] = num * 2

while i < 10:
  print(i, end=' ')
  i += 1

```
- the `list()` function will print out the contents of the list parameter
- concept of List Comprehensions include filtering and projecting over a list

```(python)
# projection
# squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
squares = [n**2 for n in range(10)]

# projection
# short_planets = ['Venus', 'Earth', 'Mars']
short_planets = [planet for planet in planets if len(planet) < 6]

# projection and filtering
# loud_short_planets = ['VENUS!', 'EARTH!', 'MARS!']
loud_short_planets = [planet.upper() + '!' for planet in planets if len(planet) < 6]
```

- triple quote syntax for strings lets us include newlines literally

```(python)
triplequoted_hello = """hello
world"""
```

- all of the list operations seen before are valid on strings
  - also have:
    - startswith
    - endswith
- string formatting

```(python)
"{}, you'll always be the {}th planet to me.".format(planet, position)

# 2 decimal points   3 decimal points, format as percent     separate with commas
# Output: Pluto weighs about 1.3e+22 kilograms (0.218% of Earth's mass). It is home to 52,910,390 Plutonians.
"{} weighs about {:.2} kilograms ({:.3%} of Earth's mass). It is home to {:,} Plutonians.".format(
    planet, pluto_mass, pluto_mass / earth_mass, population,
)
```

- dictionaries are key/value pairs

```(python)
numbers = {'one':1, 'two':2, 'three':3}

# returns 1
numbers['one']

numbers['eleven'] = 11

# converting from list to dictionary
# output: {'Earth': 'E','Jupiter': 'J', 'Mars': 'M', ... }
planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
planet_to_initial = {planet: planet[0] for planet in planets}

# in operator lets you know if a key exists in the dictionary
'Saturn' in planet_to_initial

# you can also use in to loop over a dictionaries keys
for k in numbers:
    print("{} = {}".format(k, numbers[k]))

# to access all keys or values, call .keys() or .values()

# .items() lets you get both kv pairs at the same time
for planet, initial in planet_to_initial.items():
    print("{} begins with \"{}\"".format(planet.rjust(10), initial))
```

- `import` lets you access a module's namespace / members
- `dir(moduleName)`: to view the available items in a namespace
- `import math as m`: alias the module  (e.g. `m.log()` instead of `math.log()`)
- `from math import *`: if you want to access the members without a namespace (e.g. `log()` instead of `math.log()`)
- `from math import log, pi` to pull in just the items you want, and reference without a namespace

- numpy arrays have a lot of operator overloading that make working with them different form your usual list
- methods that start and end with double underscores have a special meaning in python
  - could be operator overloading
  

- everything in python is an object



