import { Test, TestingModule } from '@nestjs/testing'
import { Logger } from '@nestjs/common'

import { createRequest, createResponse } from 'node-mocks-http'

import { User } from '../interfaces/user.interface'

import { UserDecodeMiddleware } from './user-decode.middleware'

describe('UserDecodeMiddleware', () => {
  let middleware: UserDecodeMiddleware

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger, UserDecodeMiddleware],
    }).compile()

    module.useLogger(false)

    middleware = module.get<UserDecodeMiddleware>(UserDecodeMiddleware)
  })

  it('should call next() with user on request when user-data header is set', done => {
    const user = { first_name: 'Johnny', last_name: 'Wong', email: 'jwong@wong.com' } as User
    const req = createRequest({
      headers: {
        'user-data': Buffer.from(JSON.stringify(user)).toString('base64'),
      },
    })
    const res = createResponse()

    middleware.use(req, res, () => {
      expect(req.user).toBeDefined()
      expect(req.user.email).toStrictEqual(user.email)
      expect(req.user.first_name).toStrictEqual(user.first_name)
      expect(req.user.last_name).toStrictEqual(user.last_name)
      done()
    })
  })
})
