from __future__ import print_function

import logging

import grpc
import metric_pb2
import metric_pb2_grpc

def run():
    # NOTE(gRPC Python Team): .close() is possible on a channel and should be
    # used in circumstances in which the with statement does not fit the needs
    # of the code.
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = metric_pb2_grpc.MetricServiceStub(channel)
        request = metric_pb2.GetChristoffelMatrixRequest()
        request.variables.extend(["t", "r", "th", "p"])
        response = stub.GetChristoffelMatrix(request)
    print("Client received: " + response.message)


if __name__ == "__main__":
    logging.basicConfig()
    run()