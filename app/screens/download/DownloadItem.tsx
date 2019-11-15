
import React from 'react'
import { Button } from 'react-bootstrap'
import { motion } from 'framer-motion'

import { BasketItem } from '../../basket'
import { formatBytesForHuman } from '../../utility/stringFormatUtility'

type Props = {
  item: BasketItem
  downloaded: boolean
}

const variants = {
  visible: { opacity: 1, y: 0 },
  invisible: { opacity: 0, y: '-100%' },
}

export const DownloadItem = (props: Props) => {

  let [downloaded, setDownloaded] = React.useState(props.downloaded)

  return (
    <tr className="download-item">
      <td className="align-middle download-item-title">
        <i className="fas fa-chevron-right fa-xs mr-1"/>
        {props.item.title}
      </td>
      <td className="align-middle download-item-name">
        {props.item.name}        
      </td>
      <td className="align-middle">
        {formatBytesForHuman(props.item.size)}
        <span className="download-item-type"> {props.item.type}</span>
      </td>
      <td className="align-middle">
      <form
        method="get"
        action={props.item.url}
        style={{ display: 'inline' }}>
        <Button type="submit" onClick={() => setDownloaded(true)}>
          <i className="fas fa-cloud-download-alt"></i> Download
        </Button>
      </form>
      </td>
      <td className="align-middle download-item-indicator">
      <motion.div
        initial="invisible"
        animate={downloaded ? 'visible' : 'invisible'}
        variants={variants}
      >
        <i className="fas fa-cloud-download-alt fa-lg"></i>
      </motion.div>
      </td>
    </tr>
  )  
}
