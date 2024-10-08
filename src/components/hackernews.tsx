import React, { useEffect } from "react"
import cs from "classnames"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
import { useStoreActions, useStoreState } from "../Store"
import { StoryType } from "../models/hackernews"
import { StringEnumObjects } from "../utils/assist"
import css from "./hackernews.module.scss"
import Loader from "./loader/loader1"

const storyTypeOptions = StringEnumObjects(StoryType)

const NewHackerNews: React.FC = (): JSX.Element => {
  const { loading, list, storyType } = useStoreState((state) => state.hackerNews)
  const { setStoryType, fetchStories, onReadMore } = useStoreActions((actions) => actions.hackerNews)

  useEffect(() => {
    fetchStories()
  }, [fetchStories])

  // Convert the HTML string to React elements using react-html-parser

  return (
    <Stack gap={4} >
      <div className="p-2">
        <div className={css.header}>
          <h1>HackerNews</h1>
        </div>
      </div>
      <div className="p-2">{loading && <Loader type={2} gray />}</div>
      <div className="p-2">
        {!loading && (
          <ul className={css.result}>
            {list.map((s, i) => (
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
      </div>
      <div className="p-2">
        {!loading && (
          <a className={css.more} onClick={() => onReadMore()}>
            READ MORE...
          </a>
        )}
      </div>
    </Stack>
  )
}

export default NewHackerNews
