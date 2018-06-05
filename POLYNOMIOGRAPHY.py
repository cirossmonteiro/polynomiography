import numpy as np
import math

#########################################################################

def poly(coef):
    """poly(coef)-> Returns a polynomial from a given list of
coefficients, in decreasing order of degrees."""
    
    f = np.poly1d(coef)
    return f

#########################################################################

def mod(z):
    """mod(z)-> Returns the squared modulos of complex number z."""
    
    return math.sqrt((z*z.conjugate()).real)

#########################################################################

def D(m,f,x):
    """D(m,f,x)-> Returns a list that represents the m-th iteration
function matrix (m >= 1) for the polynomial f at point x. """
    
    if m == 1:
        return 1
    L = [[0 for j in range(m-1)] for i in range(m-1)]
    u = np.polyval(f,x)
    q = f
    h = 1
    i = 0
    while i < m-2:
        L[i][i+1] = u
        q = q.deriv()
        h = h*(i+1)
        v = np.polyval(q,x)/h
        for j in range(i,m-1):
            L[j][j-i] = v
        i = i + 1
    q = q.deriv()
    h = h*(i+1)
    v = np.polyval(q,x)/h
    for j in range(i,m-1):
        L[j][j-i] = v
    return L

#########################################################################

def B(m,f,x):
    """B(m,f,x)-> Returns the m-th iteration function (m >= 2) of
polynomial f, evaluated at point x."""
    
    A1 = D(m,f,x)
    B1 = np.matrix(A1)
    d1 = np.linalg.det(B1)
    if m == 2:
        d2 = 1
    else:
        A2 = A1[:-1]
        for i in range(len(A2)):
            A2[i] = A2[i][:-1]
        B2 = np.matrix(A2)
        d2 = np.linalg.det(B2)
    return x - np.polyval(f,x)*(d2/d1)

#########################################################################

def BasicSeq(f,a,n):
    """Basicseq(f,a,n)-> Computes the n-2 first terms of the basic
sequence of polynomial f at point a."""
    
    L = [a]
    for m in range(2,n):
        L.append(B(m,f,a))
    return L

#########################################################################

def orbit(f,m,a,n):
    """orbit(f,m,a,n)-> returns the sequence L[0],L[1],...,L[n],
where L[0] = a and L[k+1] = B(m,f,L[k]) for k>0, called the orbit
of a. The regions of the complex plane where these sequences converge
to a root of f are called basins of attraction. As we increase the
value of m, the basins ofattraction converge to the Voronoi regions
of the roots of f."""
    
    L = [a]
    x = a
    for i in range(n):
        x = B(m,f,x)
        L.append(x)
    return L

#########################################################################
