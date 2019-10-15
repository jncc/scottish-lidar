
import React from 'react'
import _ from 'lodash'
import { State } from '../../state'

type Props = {
  collections: State['collections']
}

export const DatasetList = (props: Props) => {

  let datasetGroupElements = _(props.collections)
  .groupBy(c => c.name.Group)
  .keys()
  .map(key => <div key={key}>{key}</div>)
  .value()

  return (
    <div>
      {datasetGroupElements}
    </div>
  )
}
