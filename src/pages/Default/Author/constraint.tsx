import { IUser ,UserModel } from '../../../Models'

interface UserState {
    User : IUser,
    loading:boolean
}

export { UserState ,UserModel }