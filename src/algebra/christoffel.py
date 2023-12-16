from sympy import *
init_printing(pretty_print=True)

class Metric:
    def __init__(self, variables):
        self.variables = variables
        self.matrixRep = Matrix()

    def setMatrixRep(self, matrixRep):
        self.matrixRep = matrixRep

    def get_christoffel(self, i, k, l):
        # r = Symbol('R')
        # metric = Matrix([[r**2,0],[0,(r*sin(variables[0]))**2]])
        first = derivative(self.matrixRep, lambda summation, k, l: partial_diff(self.matrixRep, summation, k, l, self.variables), i, k, l)
        second = derivative(self.matrixRep, lambda summation, k, l: partial_diff(self.matrixRep, summation, l, k, self.variables), i, k, l)
        third = derivative(self.matrixRep, lambda summation, k, l: partial_diff(self.matrixRep, k, l, summation, self.variables), i, k, l)
        return 0.5 * (first + second - third)

def partial_diff(metric, index1, index2, wrt, variables):
    return diff(metric[index1, index2], variables[wrt])

def derivative(metric, func, i, k, l):
    metricContra = metric.inv()
    sum = 0
    for summation in range(2):
        derivative = func(summation, k, l)
        sum += metricContra[i, summation] * derivative
    return sum