import { IDrama ,DramaModel ,IChapter ,ChapterModel } from '../../../model'

interface DetailsState {
  dramaBook     :IDrama,
  Chapters       :Array<any>,
  Chapter : IChapter,
  selectedEpisodeID :string, //当前选中的集数
  isLogin : boolean,
  mainLoading : boolean,
  episodeLoading :boolean,
  isLike :boolean,
  likeLoading :boolean
}

export { DetailsState, IDrama, DramaModel ,ChapterModel ,IChapter }
