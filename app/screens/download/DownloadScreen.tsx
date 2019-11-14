
import * as React from 'react'
import { motion } from 'framer-motion'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { useBasket } from '../../basket'
import { formatBytesForHuman } from '../../utility/stringFormatUtility'

type Props = {
}

export const DownloadScreen = (props: Props) => {
  
  let [basket, toggleItem, removeAll] = useBasket()

  let basketItemElements = basket.items.map(item =>
    <div key={item.id} className="download-item row justify-content-end mb-2">
      <div className="download-item-title col-lg">
        <div>
          <i className="fas fa-chevron-right fa-xs mr-1"/>
          {item.title}
        </div>
        {/* <small className="text-muted">{item.name}</small> */}
        {/* <div>{item.name}</div> */}
      </div>
      <div className="col-lg-auto text-muted">
        {item.name}
      </div>

      <div className="col-auto">
        {formatBytesForHuman(item.size)} {item.type}
      </div>
      <form
        method="get"
        action={item.url}
        style={{ display: 'inline' }}
      >
        <Button type="submit">
          <i className="fa fa-download"></i> Download
        </Button>
      </form>
    </div>  
  )

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

        <div className="download-list">
          {basketItemElements}
        </div>

        <div>
          <Link to={{ pathname: '/map' }} className="btn btn-primary mr-1">
            Add more products
          </Link>

          <Button onClick={() => removeAll()} variant="secondary">Clear basket</Button>
        </div>

  <table className="table table-hover">

    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colSpan={2}>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
  
      </div>
    )  
  }
}
