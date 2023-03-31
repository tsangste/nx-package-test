import { Module } from '@nestjs/common'

import { AuthModule } from '@tsangste/nestjs-auth'
import { LoggerModule } from '@tsangste/nestjs-logger'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [AuthModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
