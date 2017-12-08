import { IUser } from '../../Models'

interface ImgRankCardProps {
  title : string,
  url :string,
  more? :string
}

interface ImgRankCardState {
  Users : IUser [],
  loading : boolean,
}

export { ImgRankCardProps ,ImgRankCardState };
