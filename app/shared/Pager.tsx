
import React from 'react'
import { getPager, getPageNumberFromOffset } from '../utility/pagerUtility'

type Props = {
  offset: number
  total: number
  setPage: (n: number) => void
}
export const Pager = (props: Props) => {

  let currentPage = getPageNumberFromOffset(props.offset)
  let pager = getPager(currentPage, props.total)
  
  return (
    <nav aria-label="Pagination" className="results-pager">
      <ul className="pagination">
        {/* previous page */}
        {pager.currentPage === 1
          ? <li className="pagination-previous disabled">Previous <span className="show-for-sr">page</span></li>
          : <li className="pagination-previous">
              <a href="#">
                  Previous <span className="show-for-sr">page</span>
              </a>
            </li>
        }
        {/* first page */}
        {pager.startPage > 1 &&
          <li>
            <a href="#"
                aria-label="Page 1">
                1
            </a>
          </li>
        }
        {/* show the ellipsis '...' unless it would be redundant */}
        {pager.startPage !== 2 &&
          <li className="ellipsis" aria-hidden="true"></li>
        }

        {/* range of pages e.g. 3, 4, 5, 6, 7 */}
        {pager.pages.map(p => {
          let current = p === pager.currentPage

          return (
            <li className={current ? 'current' : ''}>
              <a href="#"
                aria-label={'Page ' + p}>
                {current &&                  <span className="show-for-sr">You are on page {p}</span>
                }
                {p}
              </a>
            </li>
          )
        })}

        {/* @* last page *@
        @if (Model.Pager.EndPage < Model.Pager.TotalPages) {
            // show the ellipsis '...' unless it would be redundant
            if (Model.Pager.EndPage != Model.Pager.TotalPages - 1) {
                <li class="ellipsis" aria-hidden="true"></li>
            }
            <li>
                <a href="@($"/search?q={Model.SearchParams.q}&p={Model.Pager.TotalPages}{keywordQueryString}")"
                    aria-label="Page @Model.Pager.TotalPages">
                    @Model.Pager.TotalPages
                </a>
            </li>
        }
        @* next page *@
        @if (Model.Pager.CurrentPage == Model.Pager.EndPage) {
            <li class="pagination-next disabled">Next <span class="show-for-sr">page</span></li>
        } else {
            <li class="pagination-next">
                <a href="@($"/search?q={Model.SearchParams.q}&p={Model.SearchParams.p + 1}{keywordQueryString}")">
                    Next <span class="show-for-sr">page</span>
                </a>
            </li>
        } */}
      </ul>
    </nav>
  )
}
