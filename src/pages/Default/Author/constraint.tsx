import { IUser ,UserModel } from '../../../Models'

interface UserState {
    User : IUser,
    UserPageType :string,
    UserId :string,
    UserBodyComponent :any
}

export { UserState ,UserModel }