import { IUser ,UserModel } from '../../../model'

interface UserState {
    User : IUser,
    loading:boolean,
    isFollow :boolean,
    isFollowLoading :boolean,
    isFollowERROR :boolean
}

export { UserState ,UserModel ,IUser }