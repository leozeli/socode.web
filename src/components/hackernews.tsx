import React, { useEffect } from "react"
import cs from "classnames"
import { useStoreActions, useStoreState } from "../Store"
import { StoryType } from "../models/hackernews"
import { StringEnumObjects } from "../utils/assist"
import css from "./hackernews.module.scss"
import Loader from "./loader/loader1"

const storyTypeOptions = StringEnumObjects(StoryType)

const NewHackerNews: React.FC = (): JSX.Element => {
  const { loading, stories, storyType } = useStoreState((state) => state.hackerNews)
  const { setStoryType, fetchStories, onReadMore } = useStoreActions((actions) => actions.hackerNews)

  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  // Convert the HTML string to React elements using react-html-parser

  return (
    <div className={cs(css.trending)}>
      <div className={css.container}>
        <div className={css.header}>
          <div className="navbar">
            <div className="navbar-brand">
              <h1>HackerNews</h1>
            </div>
          </div>
        </div>
        {loading && <Loader type={2} gray />}
        {/* Loop through the stories array and render each story as a div */}

        {!loading && (
          <ul className={css.result}>
            {stories.map((s, i) => (
              <div key={s.id}>
                <li>
                  <h4>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="card-link">
                      <h4 className={css.result}>
                        {i}.⛰️{s.title}
                      </h4>
                    </a>
                  </h4>
                  <div>
                    <a
                      href={`https://news.ycombinator.com/item?id=${s.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link">
                      <p className={css.description}> {s.descendants} -&gt; comments </p>
                    </a>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        )}
        {!loading && (
          <a className={css.more} onClick={() => onReadMore()}>
            READ MORE...
          </a>
        )}
      </div>
    </div>
  )
}

export default NewHackerNews
