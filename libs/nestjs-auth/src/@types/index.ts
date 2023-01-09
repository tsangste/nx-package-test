import { User } from '../interfaces/user.interface'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
