
import React from 'react'
import { getPagerInfo, PagerInfo, getPageNumberFromOffset } from '../utility/pagerUtility'
import { Pagination } from 'react-bootstrap'

type Props = {
  pagerInfo: PagerInfo
  setPage: (n: number) => void
}

export const Pager = (props: Props) => {

  let pager = props.pagerInfo
  
  return (
    <nav aria-label="Pagination" className="">
      <Pagination size="sm" className="justify-content-center">
        {/* previous page */}
        <Pagination.Prev
          disabled={pager.currentPage === 1}
          onClick={() => props.setPage(pager.currentPage - 1)}
        />
        {/* first page */}
        {pager.startPage > 1 &&
          <Pagination.Item 
            onClick={() => props.setPage(1)}>
            {1}
          </Pagination.Item>
        }
        {/* '...' unless redundant */}
        {pager.startPage > 2 &&
          <Pagination.Ellipsis disabled />
        }
        {/* range of pages, e.g. 3, 4, 5, 6, 7 */}
        {pager.pages.map(n =>
          <Pagination.Item
            key={n}
            active={n === pager.currentPage}
            onClick={() => props.setPage(n)}>
            {n}
          </Pagination.Item>
        )}
        {/* '...' unless redundant */}
        {pager.endPage < pager.totalPages - 1 &&
          <Pagination.Ellipsis disabled />
        }
        {/* last page */}
        {pager.endPage < pager.totalPages &&
          <Pagination.Item
            onClick={() => props.setPage(pager.totalPages)}>
            {pager.totalPages}
          </Pagination.Item>
        }
        {/* next page */}
        <Pagination.Next
          disabled={pager.currentPage === pager.endPage}
          onClick={() => props.setPage(pager.currentPage + 1)}
        />
      </Pagination>
    </nav>
  )
}
