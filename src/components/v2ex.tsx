import React, { useEffect } from "react"
import cs from "classnames"
import Stack from "react-bootstrap/Stack"
import { useStoreActions, useStoreState } from "../Store"
import css from "./v2ex.module.scss"
import Loader from "./loader/loader1"
// Define a function component to display the V2EX component
const V2EX: React.FC = (): JSX.Element => {
  // Use the model state and actions
  const { loading, list } = useStoreState((state) => state.v2ex)
  const { fetch, onReadMore } = useStoreActions((actions) => actions.v2ex)

  // Fetch the data when the component mounts
  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <Stack gap={4}>
      <div className="p-2">
        <div className={css.header}>
          <h1>V2EX</h1>
        </div>
      </div>

      <div className="p-2">{loading && <Loader type={2} gray />}</div>
      <div className="p-2">
        {!loading && (
          <ul className={css.result}>
            {list.map((topic) => (
              <li key={topic.link} className="list-group-item">
                <a href={topic.link} target="_blank" rel="noopener noreferrer">
                  {topic.title}
                </a>
                <p className={css.description}>
                  {topic.category} on {topic.date}
                </p>
              </li>
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
export default V2EX
