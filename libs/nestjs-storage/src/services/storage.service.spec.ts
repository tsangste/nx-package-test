import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'

import { S3Client } from '@aws-sdk/client-s3'

import { StorageService } from './storage.service'

describe('StorageService', () => {
  let service: StorageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        Logger,
        {
          provide: S3Client,
          useValue: {}
        }
      ],
    }).compile()

    service = module.get<StorageService>(StorageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
