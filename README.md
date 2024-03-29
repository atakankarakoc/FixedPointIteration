﻿# Fixed Point Iteration

Write a program, which will find a root of any function by using Fixed-Point Iteration Method. 

This method is a iterative process for finding an approximation to a root of a function by repeatedly applying a transformation of that function, starting from an initial guess, until the process converges to a fixed point.

Your program should use the following inputs:
- f(x): The function to find its root
- x_0: The initial guess for iterative process
- tol: A value, which is very close to zero, to stop the iterations
- max_iter: The maximum number of iterations
  
Your program should satisfy the following requirements:

- To find the transformed function for f(x)=0 -> x=g(x)
- To converge to a root with iterations x_(n+1)=g(x_n)
- To stop if |f(x_n)|<tol or if |x_n-x_(n-1)|<tol
- To stop if n>max_iter
- To have a visual representation of the iterative process, like an animation on a plot
- To get the inputs as JSON and response as JSON, so run as an API
- To have an independent GUI to use this API
