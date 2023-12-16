from sympy import *

class Metric:
    def __init__(self, variables):
        self.variables = variables
        self.matrixRep = Matrix()

    def setMatrixRep(self, matrixRep):
        self.matrixRep = matrixRep

    def get_christoffel(self, i, k, l):
        first = derivative(self.matrixRep, lambda summation, k, l: partial_diff(self.matrixRep, summation, k, l, self.variables), i, k, l)
        second = derivative(self.matrixRep, lambda summation, k, l: partial_diff(self.matrixRep, summation, l, k, self.variables), i, k, l)
        third = derivative(self.matrixRep, lambda summation, k, l: partial_diff(self.matrixRep, k, l, summation, self.variables), i, k, l)
        return (first + second - third) / 2
    
    def get_christoffel_matrix(self, i):
        dimension = len(self.variables)
        christoffelMatrix = zeros(dimension, dimension)
        for k in range(dimension):
            for l in range(dimension):
                christoffelMatrix[k, l] += self.get_christoffel(i, k, l)
        return christoffelMatrix

def partial_diff(metric, index1, index2, wrt, variables):
    return diff(metric[index1, index2], variables[wrt])

def derivative(metric, func, i, k, l):
    metricContra = metric.inv()
    sum = 0
    for summation in range(shape(metric)[0]):
        derivative = func(summation, k, l)
        sum += metricContra[i, summation] * derivative
    return sum