import grpc
import metric_pb2
import metric_pb2_grpc
import metric as m
from sympy import *

from concurrent import futures
import logging

class MetricService(metric_pb2_grpc.MetricServiceServicer):
    def GetChristoffelMatrix(self, request, context):
        metricVars = []
        for var in request.variables:
            metricVars.append(Symbol(var))
        metric = m.Metric(metricVars)
        rep = zeros(4,4)
        M = Symbol('M')
        G = Symbol('G')
        rep[0,0] = -(1 - (2*G*M)/metric.variables[1])
        rep[1,1] = 1 / (1 - (2*G*M)/metric.variables[1])
        rep[2,2] = metric.variables[1]**2
        rep[3,3] = metric.variables[1]**2 * (sin(metric.variables[2]))**2
        metric.setMatrixRep(rep)
        matrix = metric.get_christoffel_matrix(0)

        return metric_pb2.GetChristoffelMatrixResponse(message=latex(matrix))
    
def serve():
    port = "50051"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    metric_pb2_grpc.add_MetricServiceServicer_to_server(MetricService(), server)
    server.add_insecure_port("[::]:" + port)
    server.start()
    print("Server started, listening on " + port)
    server.wait_for_termination()


if __name__ == "__main__":
    logging.basicConfig()
    serve()
