import { Injectable } from '@nestjs/common'

import { S3Client } from '@aws-sdk/client-s3'

@Injectable()
export class StorageService {
  constructor(private readonly s3client: S3Client) {}

  upload() {
    console.log('upload files!')
  }
}
