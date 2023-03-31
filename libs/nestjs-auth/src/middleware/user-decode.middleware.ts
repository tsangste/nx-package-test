import { Injectable, NestMiddleware } from '@nestjs/common'

import { NextFunction, Request, Response } from 'express'

@Injectable()
export class UserDecodeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userData = req.headers['user-data'] as string

    if (userData) {
      const buffer = Buffer.from(userData, 'base64')
      req.user = JSON.parse(buffer.toString('ascii'))
    }

    next()
  }
}
