
import React from 'react'

type Props = {
  dataset: string
}

export const DatasetPath = (props: Props) => {
  
  let segments = props.dataset.split('/')

  function* elements() {
    for (let i = 0; i < segments.length; i++) {
      
      yield <span className="dataset-path-segment" key={i.toString()}>
              {segments[i]}
            </span>

      // joining slash separator, if not the last segment
      if (i !== segments.length - 1) {
        yield <span className="dataset-path-separator" key={i + '-separator'}>
                /
              </span>
      }
    }
  }

  return (
    <span className="dataset-path">
      {Array.from(elements())}
    </span>
  )
}
