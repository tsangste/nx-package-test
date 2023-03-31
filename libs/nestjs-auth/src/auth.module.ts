import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { APP_GUARD, REQUEST } from '@nestjs/core'

import { Request } from 'express'

import { AuthGuard } from './guards/auth.guard'
import { UserDecodeMiddleware } from './middleware/user-decode.middleware'
import { CURRENT_USER_GETTER, UserGetter } from './providers/current-user'

@Global()
@Module({
  providers: [
    {
      provide: CURRENT_USER_GETTER,
      useFactory: (req: Request): UserGetter => {
        return () => req.user
      },
      inject: [REQUEST],
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserDecodeMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
