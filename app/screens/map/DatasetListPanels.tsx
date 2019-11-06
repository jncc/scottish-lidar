
import React from 'react'
import _ from 'lodash'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'

import { CollectionTuple, State, MapActions } from '../../state'
import { DatasetListItem } from './DatasetListItem'
import { splitVerticalSpace } from '../../utility/verticalSpaceUtility'

type Props = {
  collections: CollectionTuple[]
  productCountByCollection: { collectionName: string, products: number }[]
}
type StateProps = State['mapScreen']
type DispatchProps = {
  setCollection: (c: string) => void
}

export const DatasetListPanelsComponent = (props: Props & StateProps & DispatchProps) => {
  
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

  let [heightForMatching, heightForNonMatching] = splitVerticalSpace(
    matchingDatasets.length, nonMatchingDatasets.length
  ) 
  
  return <>
    <div className="panel" style={{maxHeight: heightForMatching + 'rem'}}>
      <h4>Matching datasets</h4>
      <div>{matchingDatasets.length} datasets match your query</div>
      {matchingDatasets.length > 0 && <hr />}
      <div>
        {makeDatasetListUI(props.collection, matchingDatasets)}
      </div>
    </div>
    <div className="panel" style={{maxHeight: heightForNonMatching + 'rem'}}>
      <h4 className="mr-2">Other datasets</h4>
      {nonMatchingDatasets.length === 0 &&
      <div>All available datasets match your query</div>
      }
      {nonMatchingDatasets.length > 0 &&
      <div>{nonMatchingDatasets.length} datasets don't match your query</div>
      }
      {nonMatchingDatasets.length > 0 && <hr />}
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
        <div key={key} className="mb-3">
          <h5>{key}</h5>
          {collections.map(c => <DatasetListItem
            key={c.collection.name}
            currentCollection={c}
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
  },
  (d: Dispatch): DispatchProps => ({
    setCollection: (c: string) => { d(MapActions.setCollection(c)) },
  })
)(DatasetListPanelsComponent)