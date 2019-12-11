
import React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { PagerInfo, getPageNumberFromOffset, getPagerInfo } from '../../utility/pagerUtility'
import { Pagination, Button } from 'react-bootstrap'
import { AppActions, DispatchProps } from '../../state'
import { ProductResult } from '../../catalog/types'

type Props = {
  currentPage: number
  totalItems: number
}
const SimplePagerComponent = (props: Props & DispatchProps) => {

  let p = getPagerInfo(props.currentPage, props.totalItems)
  
  return (
    <nav aria-label="Pagination" className="pager">
      <div>
        <Button
          disabled={p.currentPage <= 1}
          onClick={() => props.dispatch(AppActions.setPage(p.currentPage - 1))}
        ><i className="fas fa-chevron-left mr-1" aria-hidden="true" /> Prev</Button>
      </div>
      <div className="pager-central">
        {getProductSliceText(p)}
      </div>
      <div>
        <Button
          disabled={p.currentPage === p.endPage}
          onClick={() => props.dispatch(AppActions.setPage(p.currentPage + 1))}
        >Next <i className="fas fa-chevron-right ml-1" aria-hidden="true" /> </Button>
      </div>
    </nav>
  )
}

let getProductSliceText = (p: PagerInfo) => {

  if (p.total > 0) {
    return (
      <div>
        {p.startIndex + 1}<span className="pager-dash">-</span>{p.endIndex + 1}
        <span className="pager-of"> of </span>{p.total}
        {p.total < 1000 &&
        <span className="pager-of"> products</span>
        }
      </div>
    )    
  } else {
    return <div></div>
  }
}
export const SimplePager = reduxConnect()(SimplePagerComponent)
