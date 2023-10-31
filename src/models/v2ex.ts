import { Action, action, Thunk, thunk } from "easy-peasy"
import ky from "ky"
import dayjs from "dayjs"
import Parser from "rss-parser"
import { url } from "inspector"

const listHeight = window.innerHeight - 124 - 112 - 26.25 - 47.4
const responsiveCount = Math.floor(listHeight / 57)
// Define the interface for each topic
export interface Topic {
  title: string
  link: string
  author: string
  date: string
  replyCount: number
}

// Define the model for the V2EX component
export interface V2EXModel {
  loading: boolean // A flag to indicate if the data is loading
  setLoading: Action<V2EXModel, boolean> // An action to set the loading flag

  topics: Array<Topic> // An array of topics
  setTopics: Action<V2EXModel, Array<Topic>> // An action to set the topics array

  fetch: Thunk<V2EXModel> // A thunk to fetch the data from the RSS feed
  expanded: boolean
  onReadMore: Action<V2EXModel>
  url: string
}

// Define the initial state of the model
const v2exModel: V2EXModel = {
  expanded: false,
  onReadMore: action((state) => {
    if (state.expanded) {
      window.open(state.url, "_blank")?.focus()
    } else {
      state.expanded = true
    }
  }),
  url: "https://v2ex.com",
  loading: false,
  setLoading: action((state, payload) => {
    state.loading = payload
  }),
  topics: [],
  setTopics: action((state, payload) => {
    state.topics = payload
  }),
  fetch: thunk(async (actions) => {
    // Set the loading flag to true
    actions.setLoading(true)

    try {
      // Create a new instance of rssParser
      const parser = new Parser()

      // Fetch and parse the RSS feed from V2EX
      const feed = await parser.parseURL("https://www.v2ex.com/index.xml")

      // Map each entry in the feed to a Topic object
      const topics = feed.items.map((item) => ({
        title: item.title  || "",
        link: item.link  || "",
        author: item.author,
        date: dayjs(item.pubDate).format("YYYY-MM-DD HH:mm:ss"),
        replyCount: parseInt(item["slash:comments"], 10),
      }))

      // Sort the topics by reply count in descending order
      topics.sort((a, b) => b.replyCount - a.replyCount)

      // Set the topics array with the sorted topics
      actions.setTopics(topics)
    } catch (error) {
      // Handle any errors here
      console.error(error)
    }

    // Set the loading flag to false
    actions.setLoading(false)
  }),
}
export default v2exModel
