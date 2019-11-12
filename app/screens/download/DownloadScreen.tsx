
import * as React from 'react'
import { useBasket } from '../../basket'

import { motion } from 'framer-motion'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {
}

export const DownloadScreen = (props: Props) => {
  
  let [basket] = useBasket()

  let basketItemElements = basket.items.map(item =>
    <div key={item.id}>
      {item.size} {item.type} {item.name} {item.url}
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
        <h1>Download</h1>
        <div className="mb-3">
          You have nothing in your basket.
          Add some products with the map.
        </div>
        <div>
          <Link to={{ pathname: '/map' }} className="btn btn-primary">
            Explore the Map
          </Link>

        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container normal-page-container download-screen">
        <h1>Download</h1>
        <div>
          {basketItemElements}
        </div>
  
        {/* <table className="table table-hover">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
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
  </table> */}
  
      </div>
    )  
  }
}
