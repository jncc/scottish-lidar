
import { range } from 'lodash'

export const PAGE_SIZE = 10
export const MAX_PAGES = 5

export function getOffsetFromPageNumber(page: number) {
  return (page - 1) * PAGE_SIZE
}

export function getPageNumberFromOffset(offset: number) {
  return (offset / PAGE_SIZE) + 1
}

export function getPagerInfo(currentPage: number, total: number) {
  
  let totalPages = Math.ceil(total / PAGE_SIZE)

  // ensure current page isn't out of range
  if (currentPage < 1) {
      currentPage = 1
  }
  else if (currentPage > totalPages) {
      currentPage = totalPages
  }

  let startPage: number
  let endPage: number

  if (totalPages <= MAX_PAGES)  {
      // total pages less than max so show all pages
      startPage = 1
      endPage = totalPages
  }
  else {
      // total pages more than max so calculate start and end pages
      let maxPagesBeforeCurrentPage = Math.floor(MAX_PAGES / 2)
      let maxPagesAfterCurrentPage = Math.ceil(MAX_PAGES / 2) - 1

      if (currentPage <= maxPagesBeforeCurrentPage)  {
          // current page near the start
          startPage = 1
          endPage = MAX_PAGES
      } 
      else if (currentPage + maxPagesAfterCurrentPage >= totalPages)  {
          // current page near the end
          startPage = totalPages - MAX_PAGES + 1
          endPage = totalPages
      }
      else  {
          // current page somewhere in the middle
          startPage = currentPage - maxPagesBeforeCurrentPage
          endPage = currentPage + maxPagesAfterCurrentPage
      }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * PAGE_SIZE
  let endIndex = Math.min(startIndex + PAGE_SIZE - 1, total - 1)

  // an array of pages that can be looped over
  let pages = range(startPage, endPage + 1)

  return {
    total,
    currentPage,
    pageSize: PAGE_SIZE,
    totalPages,
    startPage,
    endPage,
    startIndex,
    endIndex,
    pages,
  }
}

export type PagerInfo = ReturnType<typeof getPagerInfo>
