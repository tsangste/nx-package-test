import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common'

import { S3Client } from '@aws-sdk/client-s3'

@Injectable()
export class StorageService {
  constructor(@Inject(Logger) private readonly logger: LoggerService, private readonly s3client: S3Client) {}

  upload() {
    this.logger.debug('upload files!')
  }
}
