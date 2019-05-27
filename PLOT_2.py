import matplotlib.pyplot as plt
import math
import numpy as np
import time
import POLYNOMIOGRAPHY as POLY

#########################################################################

def polygon(N,r = 1):
    """polygon(N,r = 1)-> Returns a list containing the vertices
of a regular N-side polygon with radius r. The vertices are
points on the complex plane."""
    
    V = []
    for i in range(N+1):
        V.append(r*math.e**(2*i*math.pi*1j/N))
    return V

#########################################################################

def plotBasicSeq(f, V, n, xmin = -5, xmax = 5, ymin = -5, \
                 ymax = 5):
    """plotBasicSeq(f, V, n, xmin = -5, xmax = 5, ymin = -5,
ymax = 5)-> plots the first n-2 points of the basic sequence
of f at each point of list V."""
    
    plt.axis([xmin,xmax,ymin,ymax])
    for a in V:
        L = POLY.BasicSeq(f,a,n)
        for z in L:
            plt.plot(z.real,z.imag,'bo',markeredgewidth = 0.0)
    plt.show()

#################################################################

def plotOrbit(f, V, m, n, xmin = -5, xmax = 5, ymin = -5,\
                  ymax = 5):
    """plotOrbit(f, V, m, n, xmin = -5, xmax = 5, ymin = -5,
ymax = 5) -> Plots the first n terms of the orbits of the
points contained in the list V."""
    
    plt.axis([xmin,xmax,ymin,ymax])
    for a in V:
        L = POLY.orbit(f,m,a,n)
        for z in L:
            plt.plot(z.real,z.imag,'go',markeredgewidth = 0.0)
    plt.show()

#################################################################

def linesBasicSeq(f, V, n, xmin = -5, xmax = 5, ymin = -5, \
                  ymax = 5):
    """linesBasicSeq(f, V, n, xmin = -5, xmax = 5, ymin = -5,
ymax = 5)-> The points of the basic sequence of f, for each
point in V, are connected by a line."""
    
    plt.axis([xmin,xmax,ymin,ymax])
    X = []
    Y = []
    for a in V:
        L = POLY.BasicSeq(f,a,n)
        for z in L:
            X.append(z.real)
            Y.append(z.imag)
    plt.plot(X,Y)
    plt.show()

#################################################################
    
def linesOrbit(f, V, m, n, xmin = -5, xmax = 5, ymin = -5, \
               ymax = 5):
    """ linesBasinAttr(f, V, m, n, xmin = -5, xmax = 5,
ymin = -5, ymax = 5) -> The points of the orbits of each point
in V are connected by a line."""
    
    plt.axis([xmin,xmax,ymin,ymax])
    X = []
    Y = []
    for a in V:
        L = POLY.orbit(f,m,a,n)
        for z in L:
            X.append(z.real)
            Y.append(z.imag)
    plt.plot(X,Y)
    plt.show()

#################################################################

def f(z):
    x = z.real
    y = z.imag
    r = 0
    for i in range(10):
        a = math.floor((x-math.floor(x))*10)
        b = math.floor((y-math.floor(y))*10)
        r = r + a/(10**(i+1)) + b/(10**(i+2))
        x = x*10
        y = y*10
    return r*10
    
def basinAttr(R, m, n, xmin = -3, xmax = 3, ymin = -3, \
                  ymax = 3, step = 0.04):
    """BasinAttr(f, m, n, xmin = -3, xmax = 3, ymin = -3,
ymax = 3, step = 0.05) ->  plots the basins of attraction of
each polynomial root given in the list R."""
    
    f = POLY.poly([1])
    print("Roots: ",R)
    for z in R:
        f = f*POLY.poly([1,-z])
        plt.plot(z.real,z.imag,'ko')
    X = np.arange(xmin,xmax,step)
    Y = np.arange(ymin,ymax,step)
    X,Y = np.meshgrid(X,Y)
    Z = []
    for i in range(len(X)):
        Z.append([])
        for j in range(len(X[i])):
            z = complex(X[i][j],Y[i][j])
            L = POLY.orbit(f,m,z,n)
            w = L[-1]
            if POLY.mod(np.polyval(f,w)) < 0.1:
                for k in range(len(R)):
                    if POLY.mod(w-R[k]) < 0.1:
                        Z[i].append(k+1)
                        break
                #Z[i].append(POLY.mod(L[-1]))
            else:
                Z[i].append(0)
    plt.contourf(X,Y,Z)
    #plt.colorbar()
    plt.show()

def basinAttr2(C, m, n, xmin = -3, xmax = 3, ymin = -3, \
                  ymax = 3, step = 0.04):
    """BasinAttr(f, m, n, xmin = -3, xmax = 3, ymin = -3,
ymax = 3, step = 0.05) ->  plots the basins of attraction of
each polynomial root given in the list R."""

    f = POLY.poly(C)
    X = np.arange(xmin,xmax,step)
    Y = np.arange(ymin,ymax,step)
    X,Y = np.meshgrid(X,Y)
    Z = []
    for i in range(len(X)):
        Z.append([])
        for j in range(len(X[i])):
            z = complex(X[i][j],Y[i][j])
            L = POLY.orbit(f,m,z,n)
            w = L[-1]
            if POLY.mod(np.polyval(f,w)) < 0.01:
                Z[i].append(POLY.mod(L[-1]))
            else:
                Z[i].append(0)
    plt.contourf(X,Y,Z)
    plt.show()

class BasicSequenceBuilder:
    def __init__(self,f,n,fig,roots):
        self.cid = fig.canvas.mpl_connect('button_press_event', self)
        self.f = f
        self.n = n
        self.r = roots
        for z in self.r:
            plt.plot(z.real,z.imag,'ko')

    def __call__(self, event):
        real = event.xdata
        imag = event.ydata
        a = complex(real,imag)
        L = POLY.BasicSeq(self.f,a,self.n)
        for z in L:
            plt.plot(z.real,z.imag,'bo',markeredgewidth = 0.0)
        plt.show()

def interBasicSeq(C,n,xmin,xmax,ymin,ymax):
    f = POLY.poly(C)
    fig = plt.figure()
    ax = fig.add_subplot(111)
    plt.axis([xmin,xmax,ymin,ymax])
    seqBuilder = BasicSequenceBuilder(f,n,fig,[])
    plt.show()

def interBasicSeq2(R,n,xmin,xmax,ymin,ymax):
    f = POLY.poly([1])
    for z in R:
        f = f*POLY.poly([1,-z])
    fig = plt.figure()
    ax = fig.add_subplot(111)
    plt.axis([xmin,xmax,ymin,ymax])
    seqBuilder = BasicSequenceBuilder(f,n,fig,R)
    plt.show()

class OrbitBuilder:
    def __init__(self,f,m,n,fig,roots):
        self.cid = fig.canvas.mpl_connect('button_press_event', self)
        self.f = f
        self.m = m
        self.n = n
        self.r = roots
        for z in self.r:
            plt.plot(z.real,z.imag,'ko')

    def __call__(self, event):
        real = event.xdata
        imag = event.ydata
        a = complex(real,imag)
        L = POLY.orbit(self.f,self.m,a,self.n)
        for z in L:
            plt.plot(z.real,z.imag,'bo',markeredgewidth = 0.0)
        plt.show()

def interOrbit(C,m,n,xmin,xmax,ymin,ymax):
    f = POLY.poly(C)
    fig = plt.figure()
    ax = fig.add_subplot(111)
    plt.axis([xmin,xmax,ymin,ymax])
    seqBuilder = OrbitBuilder(f,m,n,fig,[])
    plt.show()

def interOrbit2(R,m,n,xmin,xmax,ymin,ymax):
    f = POLY.poly([1])
    for z in R:
        f = f*POLY.poly([1,-z])
    fig = plt.figure()
    ax = fig.add_subplot(111)
    plt.axis([xmin,xmax,ymin,ymax])
    seqBuilder = OrbitBuilder(f,m,n,fig,R)
    plt.show()

class RootsBuilder:
    def __init__(self,k,m,n,fig):
        self.cid = fig.canvas.mpl_connect('button_press_event', self)
        self.m = m
        self.n = n
        self.k = k
        self.r = []

    def __call__(self, event):
        real = event.xdata
        imag = event.ydata
        a = complex(real,imag)
        plt.plot(a.real,a.imag,'bo',markeredgewidth = 0.0)
        plt.show(block = False)
        self.r.append(a)
        if len(self.r) == self.k:
            basinAttr(self.r, self.m, self.n)

def drawRoots(k,m,n,xmin,xmax,ymin,ymax):
    fig = plt.figure()
    ax = fig.add_subplot(111)
    plt.axis([xmin,xmax,ymin,ymax])
    rootBuilder = RootsBuilder(k,m,n,fig)
    plt.show()
