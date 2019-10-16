
import React from 'react'
import _ from 'lodash'
import { CollectionTuple } from '../../state'
import { ProductCountByCollectionResult } from '../../catalog/types'

type Props = {
  collections: CollectionTuple[]
  productCountByCollectionForCurrentQuery: { collectionName: string, products: number }[]
}

export const DatasetList = (props: Props) => {

  let collectionList = props.collections.map(c => {
    let productCountResult = props.productCountByCollectionForCurrentQuery
      .find(x => x.collectionName === c.collection.name)
    let productCountForCurrentQuery = productCountResult ? productCountResult.products : 0
    return { ...c, productCount: productCountForCurrentQuery }
  })

  let datasetGroupElements = _(collectionList)
    .groupBy(c => c.name.Group)
    .toPairs()
    .map(g => {
      let [key, collections] = g
      return <div key={key}>
        
        <div>key {key}</div>
        {collections.map(c => {
          return <div key={c.collection.name}>
            <div>{c.collection.name} {c.productCount}</div>
            <div></div>
          </div>
        })}
      </div>
    })
    .value()

  return (
    <div>
      {datasetGroupElements}
    </div>
  )
}
