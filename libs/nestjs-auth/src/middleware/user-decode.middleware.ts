import { Inject, Injectable, Logger, LoggerService, NestMiddleware } from '@nestjs/common'

import { NextFunction, Request, Response } from 'express'

@Injectable()
export class UserDecodeMiddleware implements NestMiddleware {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userData = req.headers['user-data'] as string

    if (userData) {
      const buffer = Buffer.from(userData, 'base64')
      req.user = JSON.parse(buffer.toString('ascii'))

      this.logger.debug({ message: 'we have user!', user: req.user })
    }

    next()
  }
}
