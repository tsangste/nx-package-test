import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { S3Client } from '@aws-sdk/client-s3'

import { StorageService } from './services/storage.service'

@Module({
  controllers: [],
  providers: [
    {
      provide: S3Client,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new S3Client({
          region: config.get<string>('AWS_REGION', 'eu-west-2'),
          credentials: {
            accessKeyId: config.get<string>('AWS_ACCESS_KEY_ID', ''),
            secretAccessKey: config.get<string>('AWS_SECRET_ACCESS_KEY', '')
          }
        })
      }
    },
    StorageService],
  exports: [S3Client, StorageService]
})
export class StorageModule {}
