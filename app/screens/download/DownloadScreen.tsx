
import * as React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { connect as reduxConnect } from 'react-redux'

import { DownloadItem } from './DownloadItem'
import { State, DispatchProps, AppActions } from '../../state'

type StateProps = State

const DownloadScreenComponent = (props: StateProps & DispatchProps) => {

  let [downloadingAll, setDownloadingAll] = React.useState(false)
 
  // experimental...
  // React.useEffect(() => {
  //   if (downloadingAll) {
  //     let downloadFirstProductAndThenTheRest = (items: BasketItem[]) => {
  //       if (items.length) {
  //         window.location.assign(items[0].url) // causes browser to download the resource
  //         setTimeout(() => {
  //           // let's get recursive
  //           downloadFirstProductAndThenTheRest(items.slice(1))
  //         }, 1000)
  //       }
  //     }
  //     downloadFirstProductAndThenTheRest(basket.items)
  //   }
  // }, [downloadingAll])

  let basketItemElements = _(props.basket)
    .orderBy(item => item.name)
    .map(item => <DownloadItem key={item.id} item={item} downloaded={false}/>)
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
          <div>
            <Link to={{ pathname: '/map' }} className="btn btn-primary mr-1">
              Add more products
            </Link>

            <Button onClick={() => AppActions.removeAll()} variant="secondary">Clear basket</Button>
          </div>
          {/* <div>
            {downloadingAll
              ? <Button onClick={() => setDownloadingAll(false)} variant="danger">Cancel</Button>
              : <Button onClick={() => setDownloadingAll(true)}>Download all</Button>
            }
          </div> */}
        </div>
  
      </div>
    )  
  }
}

export const DownloadScreen = reduxConnect(
  (s: State): StateProps => {
    return s
  }
)(DownloadScreenComponent)
