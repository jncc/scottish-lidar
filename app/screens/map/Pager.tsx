
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { PagerInfo } from '../../utility/pagerUtility'
import { Pagination } from 'react-bootstrap'
import { MapActions, DispatchProps } from '../../state'

type Props = {
  pagerInfo: PagerInfo
}

const PagerComponent = (props: Props & DispatchProps) => {

  let p = props.pagerInfo
  
  return (
    <nav aria-label="Pagination" className="">
      <Pagination size="sm" className="justify-content-center">
        {/* previous page */}
        <Pagination.Prev
          disabled={p.currentPage === 1}
          onClick={() => props.dispatch(MapActions.setPage(p.currentPage - 1))}
        />
        {/* first page */}
        {p.startPage > 1 &&
          <Pagination.Item 
            onClick={() => props.dispatch(MapActions.setPage(1))}>
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
            onClick={() => props.dispatch(MapActions.setPage(n))}>
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
            onClick={() => props.dispatch(MapActions.setPage(p.totalPages))}>
            {p.totalPages}
          </Pagination.Item>
        }
        {/* next page */}
        <Pagination.Next
          disabled={p.currentPage === p.endPage}
          onClick={() => props.dispatch(MapActions.setPage(p.currentPage + 1))}
        />
      </Pagination>
    </nav>
  )
}

export const Pager = reduxConnect()(PagerComponent)
