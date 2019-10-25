
import { parseCollectionName } from './collectionUtility'

describe('parseCollectionName specs', () => {
  
  test('should handle standard collection name', () => {
  
    let parsed = parseCollectionName(`scotland-gov/lidar/phase-1/dsm`)
  
    expect(parsed.owner).toBe('scotland-gov')
    expect(parsed.group).toBe('lidar/phase-1')
    expect(parsed.dataset).toBe('lidar/phase-1/dsm')
  })
  
  test('should handle longer collection name just in case', () => {
    
    let parsed = parseCollectionName(`scotland-gov/lidar/phase-1/dsm/something-else`)
  
    expect(parsed.dataset).toBe('lidar/phase-1/dsm/something-else')
  })

  test('should throw when collection name too short', () => {

    expect(() => {
      parseCollectionName(`scotland-gov/dsm`)
    }).toThrow()
  })
  
})
