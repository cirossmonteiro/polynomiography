# polynomiography
Polynomiography tools

******************************************************* README **************************************************************
*****************************************************************************************************************************

"Polynomiography is the art and science of visualizing approximation of the zeros of complex polynomials." [1]

The Polynomiography app provides an interface to generate polynomiographs, based on user-defined parameters. For simplicity, all fields display default values when the app is launched.

The GUI can be directly launched by running PolynomiographyGUI.pyw from within a Python interpreter. A Python 3 installation with Numpy and Matplotlib is required.

*PARAMETERS

1-Input method: the user must choose between roots and coefficients. The values must be typed in the corresponding entry box, separated by comma, using standard Python notation for complex numbers. E.g.: 1+1j,1-1j

An error dialog is displayed when bad input is provided. If the option 'roots' is chosen, the app will generate the polynomial

                                             f(x) = (x-r1)(x-r2)...(x-rn),

where r1,r2,...,rn are the roots provided by the user. If the option 'coefficients' is chosen, the polynomial will be given by

                                   f(x) = a_n.x^n + a_{n-1}x^{n-1} + ... + a_1x + a_0,

where a_0,a_1,...,a_n are the coefficients typed by the user.

2-Plot settings: these parameters define the plotting area. The x-coordinates range from xmin to xmax, and the y-coordinates range from ymin to ymax. The 'step' parameter defines the minimum distance between the points of the grid (only applicable for the 'Plot basins of attraction' function). 

3-Iteration function order (m>=2): the order of the iteration function used to plot the polynomiograph. The iteration function is given by

                                       B(m,f,a) = a - f(a) D_{m-2}(a)/D_{m-1}(a),

where D_{m-2}(a) and D_{m-1}(a) are the determinants of certain matrices. (See [1] for further details). Essentially, B is a function that approximates a zero of polynomial f, given an initial point a. For m>=2, it describes a family of functions, called 'basic family'. For instance, m=2 corresponds to Newton's approximation method, while m = 3 yields Halley's method.

4-Number of sequence terms(n>0): the number of terms that are computed for each basic sequence/orbit. Basic sequences at a point 'a' are given by

                                              {B(m,f,a)}_{m = 2}^{n}.

Orbits are sequences given by

                                               a_{k+1} = B(m,f,a_k),

for a fixed value of m, starting from a given point a_0.

*FUNCTIONS

1-Plot basins of attraction: plots the basins of attraction (regions of the complex plane where the orbits converge to a root of the given polynomial - see [1] for further details). The plotting method consists of computing the orbit of each point on the grid X,Y, and then checking whether the last term is sufficiently close to a root of the polynomial. If so, the corresponding entry of an array Z, which represents a function g of X and Y, receives the modulus of that last sequence term. Otherwise, it receives 0. The plot is a visualization of the levels of the function Z = g(X,Y).

2-Plot basic sequences: interactive plotting of the basic sequences. Plots the first n terms of the basic sequence at the point where the user clicked.

3-Plot orbits: interactive plotting of the orbits. Plots the first n terms of the orbit at the point where the user clicked.

4 - Reset: reset all fields to default values.

*ERROR CODES
Bad input:
1 - invalid input for the parameter m;
2 - invalid input for the parameter n;
3 - invalid input for the parameter step;
4 - invalid input for the parameter xmin;
5 - invalid input for the parameter xmax;
6 - invalid input for the parameter ymin;
7 - invalid input for the parameter ymax;
8 - invalid input for the roots entry box;
9 - invalid input for the coefficients entry box;
10 - value of parameter m is less than 2;
11 - value of parameter 0 is less than 1.

*ISSUES
-Plotting the basins of attraction may take several minutes if the value of 'step' parameter is too small.

-In some cases, matplotlib raises an error of maximum recursion depth exceeded while executing 'Plot basic sequences' and 'Plot orbits'. Trying to fix it.

REFERENCES:
[1] KALANTARI, B. Polynomiography and applications in art, education and science. Proceedings of the ACM SIGGRAPH 2003 Educators Program, p. 1-5,San Diego, California, 2003.
