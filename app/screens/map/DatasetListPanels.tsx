
import React from 'react'
import _ from 'lodash'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State, AppActions, DispatchProps } from '../../state'
import { DatasetListItem } from './DatasetListItem'

type Props = {
  collections: CollectionTuple[]
  productCountByCollection: { collectionName: string, products: number }[]
}
type StateProps = State['mapScreen']

export const DatasetListPanelsComponent = (props: Props & StateProps) => {
  
  // join the collections with their product count for the current query
  // (should this be done at the map container level?)
  let collections = props.collections.map(c => {
    let count = props.productCountByCollection.find(x => x.collectionName === c.collection.name)
    return {
      ...c,
      productCountForCurrentQuery: count ? count.products : 0
    }
  })

  let [matchingDatasets, nonMatchingDatasets] = _(collections)
    .partition(c => c.productCountForCurrentQuery > 0)
    .value()
  
  return <>
    <div className="panel scrollable-panel" style={{maxHeight: '30rem'}}>
      <h4 className="mb-0">
        <span className="me-3 ">Matching datasets </span>
        <span className="float-right badge rounded-pill bg-primary">{matchingDatasets.length}</span>
      </h4>
      <div className="dataset-list-subheader">
        {matchingDatasets.length} datasets match your query
      </div>
      {matchingDatasets.length > 0 && <div className="mb-2" />}
      <div className="mb-3">
        {makeDatasetListUI(props.collection, matchingDatasets)}
      </div>
      <h4 className="mb-0">
        <span className="me-3">Other datasets </span>
        <span className="float-right badge rounded-pill bg-primary">{nonMatchingDatasets.length}</span>
      </h4>
      {nonMatchingDatasets.length > 0 &&
      <div className="dataset-list-subheader">
        {nonMatchingDatasets.length} datasets don't match your query
      </div>
      }
      {nonMatchingDatasets.length > 0 && <div className="mb-2" />}
      <div>
        {makeDatasetListUI(props.collection, nonMatchingDatasets)}
      </div>
    </div>
  </> 
}

let makeDatasetListUI = (
  collection: string,
  datasets: (CollectionTuple & {productCountForCurrentQuery: number})[]) => {

  return _(datasets)
    .groupBy(c => c.path.group)
    .toPairs()
    .map(g => {
      let [key, collections] = g
      return (
        <div key={key} className="mb-2">
          <h5 className="mb-1">{key}</h5>
          {collections
            .slice(0).sort((a, b) => a.path.shortName.localeCompare(b.path.shortName)) // sort alphabetically
            .map(c => <DatasetListItem
            key={c.collection.name}
            collection={c}
            checked={c.collection.name === collection}
          />)}
        </div>
      )
    })
    .value()
}

export const DatasetListPanels = reduxConnect(
  (s: State): StateProps => {
    return s.mapScreen
  })(DatasetListPanelsComponent)
