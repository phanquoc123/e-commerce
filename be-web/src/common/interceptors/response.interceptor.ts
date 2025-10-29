import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE } from '../../core/decorators/response-message.decorator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((result) => {
        const handler = context.getHandler();
        const customMessage = this.reflector.get<string>(
          RESPONSE_MESSAGE,
          handler,
        );
        return {
          data: {
            status: 200,
            message: customMessage ?? 'Success',
            success: true,
            result,
          },
        };
      }),
    );
  }
}
