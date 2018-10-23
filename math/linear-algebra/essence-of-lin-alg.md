Essence of Linear Algebra
=====================

- Series of extremely well-reviewed YouTube tutorials covering the basic topics, [here](https://www.youtube.com/watch?v=fNk_zzaMoSs&list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)

## 1: What are Vectors
- To physics student: Arrows pointing in space
  - Has Direction
  - Has Magnitude
  - Can be in 2 or 3 dimensional space
- CS student: ordered list of numbers
  - List of numbers
  - EG each house is represented by 2 numbers, sq footage and cost.
    - This makes it 2-dimensional     
- to mathematician:
  - generalization of the physics or cs perspective
  - any number of dimensions
  - requirements
    - vectors must be able to be added together
    - you need to be able to multiply the vector by a number
- how to visualize vectors (for starters)
  - unlike the physics student where the vectors can be rooted anywhere, in math you want to think of the vectors in 2D space rooted at the origin
- adding vectors:
  - move the root of the second vector to the tip of the first and the new location of the tip of the second is now the tip of the vector that is the sum
  - this is one of the only times in linear algebra that you'll move vectors off the origin
- multiplying vector by a number = scaling
- so a number is often thought of as a scalar

## Linear Combinations, Span, and Basis Vectors
- Two ways to think about vectors:
  - `- \begin{bmatrix}
      3  \\
      2
    \end{bmatrix}
    `
  - `- \left( 3 \cdot \hat{i}  \right) + \left( 2 \cdot \hat{j} \right)` where `- \hat{i} = \begin{bmatrix} 1 \\ 0 \end{bmatrix} ` and `- \hat{j} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} `
