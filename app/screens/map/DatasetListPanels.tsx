
import React from 'react'
import _ from 'lodash'

import { CollectionTuple } from '../../state'
import { DatasetListItem } from './DatasetListItem'
import { splitVerticalSpace } from '../../utility/verticalSpaceUtility'

type Props = {
  collections: CollectionTuple[]
  productCountByCollection: { collectionName: string, products: number }[]
  collection: string
  setCollection: (collectionName: string) => void
}

export const DatasetListPanels = (props: Props) => {
  
  // join the collections with their product count for the current query
  // (should this be done at the map container level?)
  let collections = props.collections.map(c => {
    let count = props.productCountByCollection.find(x => x.collectionName === c.collection.name)
    return {
      ...c,
      productCountForCurrentQuery: count ? count.products : 0
    }
  })

  let matchingDatasets = _(collections)
    .filter(c => c.productCountForCurrentQuery > 0)
    .value()

  let nonMatchingDatasets = _(collections)
    .filter(c => c.productCountForCurrentQuery === 0)
    .value()

  let [heightForMatching, heightForNonMatching] = splitVerticalSpace(
    matchingDatasets.length, nonMatchingDatasets.length
  ) 
  
  return <>
    <div className="panel" style={{maxHeight: heightForMatching + 'rem'}}>
      <h4>Matching datasets</h4>
      <div>{matchingDatasets.length} datasets match your query</div>
      <hr />
      <div>
        {makeDatasetListUI(props, matchingDatasets)}
      </div>
    </div>
    <div className="panel" style={{maxHeight: heightForNonMatching + 'rem'}}>
      <h4 className="mr-2">Non-matching datasets</h4>
      <div>{nonMatchingDatasets.length} datasets don't match your query</div>
      <div>
        {makeDatasetListUI(props, nonMatchingDatasets)}
      </div>
    </div>
  </> 
}

let makeDatasetListUI = (
  props: Props,
  datasets: (CollectionTuple & {productCountForCurrentQuery: number})[]) => {

  return _(datasets)
    .groupBy(c => c.path.group)
    .toPairs()
    .map(g => {
      let [key, collections] = g
      return (
        <div key={key} className="mb-3">
          <h5>{key}</h5>
          {collections.map(c => {
            return <DatasetListItem key={c.collection.name}
            collection={c}
            checked={c.collection.name === props.collection}
            onCheck={props.setCollection}
            />
          })}
        </div>
      )
    })
    .value()
}
