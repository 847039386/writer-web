import { IUser ,UserModel } from '../../../model'

interface UserState {
    User : IUser,
    loading:boolean
}

export { UserState ,UserModel ,IUser }