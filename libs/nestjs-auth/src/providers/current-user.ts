import { Inject } from '@nestjs/common'

import { User } from '../interfaces/user.interface'

export const CURRENT_USER_GETTER = Symbol('currentusergetter')
export const CurrentUserGetter = () => Inject(CURRENT_USER_GETTER)
export type UserGetter = () => User
