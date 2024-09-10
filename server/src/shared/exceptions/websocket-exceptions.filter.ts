import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Here you have the exception and you can check the data
    if (exception instanceof HttpException) {
      const wsException = new WsException(exception.getResponse());
      super.catch(wsException, host);
      return;
    }

    super.catch(exception, host);
  }
}
