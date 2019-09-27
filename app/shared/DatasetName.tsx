
import React from 'react'

type Props = {
  dataset: string
}

export const DatasetName = (props: Props) => {
  
  let segments = props.dataset.split('/')

  function* elements() {
    for (let i = 0; i < segments.length; i++) {
      
      yield <span className="dataset-name-segment">
              {segments[i]}
            </span>

      // joining slash separator, if not the last segment
      if (i !== segments.length - 1) {
        yield <span className="dataset-name-separator">
                /
              </span>
      }
    }
  }

  return (
    <span className="dataset-name">
      {Array.from(elements())}
    </span>
  )
}
