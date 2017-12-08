import { IDrama } from '../../Models'

interface RankCardProps {
  title : string,
  url :string,
  more? :string
}

interface RankCardState {
  dramaBooks : IDrama [],
  loading : boolean,
    defaultKey :string
}

export { RankCardState ,RankCardProps };
