import { IDrama ,DramaModel ,IEpisode ,EpisodeModel } from '../../../Models'

interface DetailsState {
  dramaBook     :IDrama,
  Episodes       :Array<any>,
  Episode : IEpisode,
  selectedEpisodeID :string, //当前选中的集数
  isLogin : boolean
}

export { DetailsState, IDrama, DramaModel ,EpisodeModel ,IEpisode }
