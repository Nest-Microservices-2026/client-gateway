import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException) // this catch all exceptions with RpcException
export class RcpExceptionFilter implements RpcExceptionFilter {


    catch(exception: RpcException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const rpcError = exception.getError();

        //This function will handle all errors caught by the microservice. See the findOne service in product-ms.
        if( typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError ) {
            const status = rpcError.status;
            return response.status(status).json(rpcError)
        }
        //If an unhandled error occurs, a default response will be returned.
        response.status(400).json({
            status: 400,
            message: rpcError
        });

    }
}
