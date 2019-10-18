
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'
import { DatasetListItem } from './DatasetListItem'

type Props = {
  collections: CollectionTuple[]
  productCountByCollection: { collectionName: string, products: number }[]
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

  let matchingDatasetsListUI = _(collections)
    .filter(c => c.productCountForCurrentQuery > 0)
    .groupBy(c => c.name.Group)
    .toPairs()
    .map(g => {
      let [key, collections] = g
      return (
        <div key={key}>
          <h5>{key}</h5>
          {collections.map(c => {
            return <DatasetListItem key={c.collection.name} collection={c}  />
          })}
          <hr />
        </div>
      )
    })
    .value()

  let nonMatchingDatasetsListUI = _(collections)
    .filter(c => c.productCountForCurrentQuery === 0)
    .groupBy(c => c.name.Group)
    .toPairs()
    .map(g => {
      let [key, collections] = g
      return (
        <div key={key}>
          <h5>{key}</h5>
          {collections.map(c => {
            return <DatasetListItem key={c.collection.name} collection={c}  />
          })}
        </div>
      )
    })
    .value()    
  return <>
    <div className="panel left-panel-a">
      <h4>Matching datasets</h4>
      <div>Datasets that match your query</div>
      <hr />
      <div>
        {matchingDatasetsListUI}
      </div>
    </div>
    <div className="panel left-panel-b">
      <h4>Non-matching datasets</h4>
      <div>
        {nonMatchingDatasetsListUI}
      </div>
    </div>
  </> 
}
