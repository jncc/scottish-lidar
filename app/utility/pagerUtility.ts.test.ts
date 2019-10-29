
import { getOffsetFromPageNumber, getPageNumberFromOffset, getPager } from './pagerUtility'

describe('getOffsetFromPageNumber specs', () => {
  
  test('should calculate page 1 correctly', () => {
    let offset = getOffsetFromPageNumber(1)
    expect(offset).toBe(0)
  })

  test('should calculate page 2 correctly', () => {
    let offset = getOffsetFromPageNumber(2)
    expect(offset).toBe(10)
  })

})

describe('getPageNumberFromOffset specs', () => {
  
  test('should calculate offset 0 correctly', () => {
    let page = getPageNumberFromOffset(0)
    expect(page).toBe(1)
  })

  test('should calculate offset 10 correctly', () => {
    let page = getPageNumberFromOffset(10)
    expect(page).toBe(2)
  })
})

describe('getPager specs', () => {
  
  test('should work for (1, 28)', () => {
    let pager = getPager(1, 28)
    expect(pager.pages.length).toBe(3)
    expect(pager.startPage).toBe(1)
    expect(pager.endPage).toBe(3)
  })

  test('should work for (2, 28)', () => {
    let pager = getPager(2, 28)
    expect(pager.pages.length).toBe(3)
    expect(pager.startPage).toBe(1)
    expect(pager.endPage).toBe(3)
  })

  test('should work for (11, 120)', () => {
    let pager = getPager(11, 120)
    expect(pager.pages.length).toBe(10)
    expect(pager.startPage).toBe(3)
    expect(pager.endPage).toBe(12)
  })

})
