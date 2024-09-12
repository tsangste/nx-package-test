import { Reflector } from '@nestjs/core'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  UnauthorizedException
} from '@nestjs/common'

import { Request } from 'express'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(Logger) private readonly logger: LoggerService, private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const allowUnauthorizedRequest =
      this.reflector.get<boolean>('allow-anonymous', context.getHandler()) ||
      this.reflector.get<boolean>('allow-anonymous', context.getClass())

    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user

    if (!allowUnauthorizedRequest && !user) {
      this.logger.warn('unauthorized user')
      throw new UnauthorizedException()
    }

    return true
  }
}
