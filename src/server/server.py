import grpc
import metric_pb2
import metric_pb2_grpc
import metric as m
import sympy as sp
import sympy.parsing.latex as l

from concurrent import futures
import logging

class MetricService(metric_pb2_grpc.MetricServiceServicer):
    def GetChristoffelMatrix(self, request, context):
        metricVars = []
        for var in request.variables:
            metricVars.append(sp.Symbol(var))
        metric = m.Metric(metricVars)
        diagonalEntries = []
        for diag in request.diagonals:
            diagonalEntries.append(l.parse_latex(diag))
        rep = sp.diag(*diagonalEntries)
        metric.setMatrixRep(rep)
        matrix = metric.get_christoffel_matrix(request.matrix_identifier)
        pretty = sp.latex(matrix)
        print(pretty)

        return metric_pb2.GetChristoffelMatrixResponse(matrix=pretty)
    
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
