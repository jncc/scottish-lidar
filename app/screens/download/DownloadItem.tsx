
import React from 'react'
import { Button } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { connect as reduxConnect } from 'react-redux'

import { BasketItem } from '../../basket'
import { formatBytesForHuman } from '../../utility/stringFormatUtility'
import { DispatchProps, AppActions } from '../../state'

type Props = {
  item: BasketItem
}

const variants = {
  visible: { opacity: 1, y: 0 },
  invisible: { opacity: 0, y: '-100%' },
}

const DownloadItemComponent = (props: Props & DispatchProps) => {

  // let [downloaded, setDownloaded] = React.useState(props.downloaded)

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
        <Button type="submit" onClick={() => props.dispatch(AppActions.itemDownloaded(props.item))}>
          <i className="fas fa-cloud-download-alt"></i> Download
        </Button>
      </form>
      </td>
      <td className="align-middle download-item-indicator">
      <motion.div
        initial={props.item.downloaded ? 'visible' : 'invisible'}
        animate={props.item.downloaded ? 'visible' : 'invisible'}
        variants={variants}
      >
        <i className="fas fa-cloud-download-alt fa-lg"></i>
      </motion.div>
      </td>
    </tr>
  )  
}

export const DownloadItem = reduxConnect()(DownloadItemComponent)
