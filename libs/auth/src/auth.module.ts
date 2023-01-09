import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { AuthGuard } from './guards/auth.guard'
import { UserDecodeMiddleware } from './middleware/user-decode.middleware'

@Global()
@Module({
  providers: [
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
