import { Readable } from 'node:stream'

import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

@Injectable()
export class StorageService {
  constructor(@Inject(Logger) private readonly logger: LoggerService, private readonly config: ConfigService, private readonly s3Client: S3Client) {}

  async upload(key: string, data: string | Buffer) {
    const bucketName = this.config.get('AWS_S3_BUCKET_NAME', 'bucket')
    const prefix = this.config.get('AWS_S3_PREFIX', 'csv')

    const result = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: [prefix, key].join('/'),
        Body: data,
        Tagging: 'csv',
        ContentType: 'text/csv; charset=utf-8',
      })
    )

    this.logger.log({ message: `Uploaded file to S3 bucket(${bucketName}) - ${key}`, bucketName, key })

    return result
  }

  async download(key: string): Promise<Readable> {
    const bucketName = this.config.get('AWS_S3_BUCKET_NAME', 'bucket')
    const prefix = this.config.get('AWS_S3_PREFIX', 'csv')

    const result = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: [prefix, key].join('/'),
      })
    )

    this.logger.log({ message: `Downloaded file from S3 bucket(${bucketName}) - ${key}`, bucketName, key })

    return result.Body as Readable
  }
}
