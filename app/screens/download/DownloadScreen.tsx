
import * as React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { useBasket } from '../../basket'
import { DownloadItem } from './DownloadItem'
import { orderBy } from 'lodash'

type Props = {
}

export const DownloadScreen = (props: Props) => {
  
  let [basket, toggleItem, removeAll] = useBasket()

  let basketItemElements = _(basket.items)
    .orderBy(item => item.name)
    .map(item => <DownloadItem key={item.id}  item={item} />)
    .value()

  if (!basketItemElements.length) {
    return (
      <div className="container normal-page-container download-screen">
        <h1 className="mb-3">Download</h1>
        <div className="mb-4">
          You have nothing in your basket.
          Add some products using the map.
        </div>
        <div>
          <Link to={{ pathname: '/map' }} className="btn btn-primary">
            Explore the map
          </Link>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container normal-page-container download-screen">
        <h1 className="mb-3">Download</h1>

        <div className="table-responsive mb-2">
        <table className="table table-sm">
        <tbody className="download-list">
          {basketItemElements}
        </tbody>
        </table>
        </div>

        <div>
          <Link to={{ pathname: '/map' }} className="btn btn-primary mr-1">
            Add more products
          </Link>

          <Button onClick={() => removeAll()} variant="secondary">Clear basket</Button>
        </div>
  
      </div>
    )  
  }
}
