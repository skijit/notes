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
  - The normal way: 
    - `- \begin{bmatrix}
      3  \\
      2
    \end{bmatrix}
    `
  - The sum of two scaled vectors:
    - `- \left( 3 \cdot \hat{i}  \right) + \left( 2 \cdot \hat{j} \right)` where `- \hat{i} = \begin{bmatrix} 1 \\ 0 \end{bmatrix} ` and `- \hat{j} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} `
    - `- \hat{i}` and `- \hat{j}` are the "basis vectors" of the coordinate system
- You can choose different basis vectors `- \vec{v} ` and `- \vec{w} ` and still reach all the points in those dimensions through linear combinations
  - Linear combinations = scaling and adding the basis vectors
  - ex: `- \left( a \cdot \vec{v} \right) + \left( b \cdot \vec{w} \right) `
  - some basis vectors are better than others (but that's a topic for later)
  - span is the set of linear combinations of basis vectors (ie all the points they can reach)
- Edge cases
  - If the basis vectors are linearly dependent then your span will be limited
- A lot of times, we think of vectors as points 
  - the point is at the tip (stem at the origin, as usual)
- In 3d space:
  - If you have 2 basis vectors, your span is a 2D plane
  - If you add a 3rd basis vector which lives in that span, your span doesn't change
  - Otherwise, you get access to all 3D space (visualize like it's like its moving around that plane in 3D space)
- Redundant vectors
  - Stuff which doesn't add to the span
  - "linearly dependent"
  - One vector can be expressed as a linear combo of the others
- Technical def of basis:
  - Set of linerarly independent vectors that span the full space

## Linear Transformation and Matrices

