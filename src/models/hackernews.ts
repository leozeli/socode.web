import { Action, action, Thunk, thunk, Computed, computed, thunkOn, ThunkOn } from "easy-peasy"
import ky from "ky"
import dayjs from "dayjs"
import { StoreModel } from "./index"

const listHeight = window.innerHeight - 124 - 112 - 26.25 - 47.4
const responsiveCount = Math.floor(listHeight / 57)

export enum StoryType {
  Top = "top",
  New = "new",
  Best = "best",
  Ask = "ask",
  Show = "show",
  Job = "job",
  map = "map",
}

export interface Story {
  id: number
  title: string
  url: string
  score: number
  by: string
  time: number
  type: string
  descendants: number
  kids: Array<number>
}

export interface HackerNewsModel {
  loading: boolean
  setLoading: Action<HackerNewsModel, boolean>

  stories: Array<Story>
  list: Computed<HackerNewsModel, Array<Story>>
  setStories: Action<HackerNewsModel, Array<Story>>

  storyType: StoryType
  setStoryType: Action<HackerNewsModel, StoryType>

  fetchStories: Thunk<HackerNewsModel>
  expanded: boolean
  onReadMore: Action<HackerNewsModel>
  onFetchParamsChanged: ThunkOn<HackerNewsModel, void, StoreModel>
}

const hackerNewsModel: HackerNewsModel = {
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  expanded: false,

  onReadMore: action((state) => {
    if (state.expanded) {
      window.open("https://news.ycombinator.com", "_blank")?.focus()
    } else {
      state.expanded = true
    }
  }),
  list: computed((state) => (state.expanded ? state.stories : state.stories.slice(0, responsiveCount))),

  stories: [],
  setStories: action((state, payload) => {
    state.stories = payload
  }),

  storyType: StoryType.Top,
  setStoryType: action((state, payload) => {
    state.storyType = payload
  }),

  fetchStories: thunk(async (actions) => {
    actions.setLoading(true)
    try {
      const ids = await ky
        .get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
        .json<Array<number>>()
      const stories = await Promise.all(
        ids.slice(0, 30).map(async (id) => {
          const story = await ky.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).json<Story>()
          return story
        })
      )
      actions.setStories(stories)
    } catch (error) {
      console.error(error)
    }
    actions.setLoading(false)
  }),
  onFetchParamsChanged: thunkOn(
    (actions, storeActions) => [],
    (actions, target, { getState }) => {
      actions.fetchStories()
    }
  ),
}

export default hackerNewsModel
