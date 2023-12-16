# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import metric_pb2 as metric__pb2


class MetricServiceStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetChristoffelMatrix = channel.unary_unary(
                '/MetricService.MetricService/GetChristoffelMatrix',
                request_serializer=metric__pb2.GetChristoffelMatrixRequest.SerializeToString,
                response_deserializer=metric__pb2.GetChristoffelMatrixResponse.FromString,
                )


class MetricServiceServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetChristoffelMatrix(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_MetricServiceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetChristoffelMatrix': grpc.unary_unary_rpc_method_handler(
                    servicer.GetChristoffelMatrix,
                    request_deserializer=metric__pb2.GetChristoffelMatrixRequest.FromString,
                    response_serializer=metric__pb2.GetChristoffelMatrixResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'MetricService.MetricService', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class MetricService(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetChristoffelMatrix(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/MetricService.MetricService/GetChristoffelMatrix',
            metric__pb2.GetChristoffelMatrixRequest.SerializeToString,
            metric__pb2.GetChristoffelMatrixResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
