
import React from 'react'
import { Dispatch } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { PagerInfo } from '../../utility/pagerUtility'
import { Pagination } from 'react-bootstrap'
import { MapActions } from '../../state'

type Props = {
  pagerInfo: PagerInfo
}
type DispatchProps = {
  setPage: (n: number) => void
}

const PagerComponent = (props: Props & DispatchProps) => {

  let p = props.pagerInfo
  
  return (
    <nav aria-label="Pagination" className="">
      <Pagination size="sm" className="justify-content-center">
        {/* previous page */}
        <Pagination.Prev
          disabled={p.currentPage === 1}
          onClick={() => props.setPage(p.currentPage - 1)}
        />
        {/* first page */}
        {p.startPage > 1 &&
          <Pagination.Item 
            onClick={() => props.setPage(1)}>
            {1}
          </Pagination.Item>
        }
        {/* '...' unless redundant */}
        {p.startPage > 2 &&
          <Pagination.Ellipsis disabled />
        }
        {/* range of pages, e.g. 3, 4, 5, 6, 7 */}
        {p.pages.map(n =>
          <Pagination.Item
            key={n}
            active={n === p.currentPage}
            onClick={() => props.setPage(n)}>
            {n}
          </Pagination.Item>
        )}
        {/* '...' unless redundant */}
        {p.endPage < p.totalPages - 1 &&
          <Pagination.Ellipsis disabled />
        }
        {/* last page */}
        {p.endPage < p.totalPages &&
          <Pagination.Item
            onClick={() => props.setPage(p.totalPages)}>
            {p.totalPages}
          </Pagination.Item>
        }
        {/* next page */}
        <Pagination.Next
          disabled={p.currentPage === p.endPage}
          onClick={() => props.setPage(p.currentPage + 1)}
        />
      </Pagination>
    </nav>
  )
}

export const Pager = reduxConnect(
  null,
  (d: Dispatch): DispatchProps => ({
    setPage: (n: number) => { d(MapActions.setPage(n))}
  })
)(PagerComponent)
