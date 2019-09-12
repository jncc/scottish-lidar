
import * as React from 'react'
import { useBasket } from '../../basket'

type Props = {
} 

export const DownloadScreen = (props: Props) => {
  
  let [basket] = useBasket()

  let basketItemElements = basket.items.map(item =>
    <li>
      {item.productId}
    </li>  
  )

  return (
    <div>
      <h1>Download</h1>
      <ul>
        {basketItemElements}
      </ul>
    </div>
  )
}
