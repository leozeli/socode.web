import searchModel, { SearchModel } from "./search"
import storageModel, { StorageModel } from "./storage"
import profileModel, { ProfileModel } from "./profile"
import devhintsModel, { DevhintsModel } from "./devhints"
import learnxinyModel, { LearnxinyModel } from "./learnxiny"
import awesomeModel, { AwesomeModel } from "./awesome"
import readmeModel, { ReadmeModel } from "./readme"
import devdocsModel, { DevdocsModel } from "./devdocs"
import devdocsUnitedModel, { DevdocsUnitedModel } from "./devdocs_united"
import starsModel, { StarsModel } from "./stars"
import searchKeysModel, { SearchKeysModel } from "./searchkeys"
import trendingModel, { TrendingModel } from "./trending"
import displayModel, { DisplayModel } from "./display"
import hackerNewsModel, { HackerNewsModel } from "./hackernews"
import v2exModel, { V2EXModel } from "./v2ex"

export interface StoreModel {
  search: SearchModel
  storage: StorageModel
  profile: ProfileModel
  devhints: DevhintsModel
  learnxiny: LearnxinyModel
  awesome: AwesomeModel
  readme: ReadmeModel
  devdocs: DevdocsModel
  devdocsUnited: DevdocsUnitedModel
  stars: StarsModel
  searchKeys: SearchKeysModel
  trending: TrendingModel
  hackerNews: HackerNewsModel
  display: DisplayModel
  v2ex: V2EXModel
}

const storeModel: StoreModel = {
  search: searchModel,
  storage: storageModel,
  profile: profileModel,
  devhints: devhintsModel,
  learnxiny: learnxinyModel,
  awesome: awesomeModel,
  readme: readmeModel,
  devdocs: devdocsModel,
  devdocsUnited: devdocsUnitedModel,
  stars: starsModel,
  searchKeys: searchKeysModel,
  trending: trendingModel,
  hackerNews: hackerNewsModel,
  display: displayModel,
  v2ex: v2exModel,
}

export default storeModel
