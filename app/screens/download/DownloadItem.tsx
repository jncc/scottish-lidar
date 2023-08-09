
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

  return (
    <tr className="download-item">
      <td className="align-middle download-item-title">
        <span className="download-item-bullet me-1" aria-hidden="true">&bull;</span>
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
        <Button type="submit" onClick={() => props.dispatch(AppActions.itemDownloaded(props.item))}
          aria-label={'Download ' + props.item.name}>
          <i className="fas fa-cloud-download-alt" aria-hidden="true"></i> Download
        </Button>
      </form>
      </td>
      <td className="align-middle download-item-indicator">
      <motion.div
        initial={props.item.downloaded ? 'visible' : 'invisible'}
        animate={props.item.downloaded ? 'visible' : 'invisible'}
        variants={variants}
      >
        <i className="fas fa-cloud-download-alt fa-lg" aria-hidden="true"></i>
      </motion.div>
      </td>
    </tr>
  )  
}

export const DownloadItem = reduxConnect()(DownloadItemComponent)
