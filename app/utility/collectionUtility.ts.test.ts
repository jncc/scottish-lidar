
import { parseCollectionName } from './collectionUtility'

describe('parseCollectionName specs', () => {
  
  test('should handle standard collection name', () => {
  
    let parsed = parseCollectionName(`scotland-gov/lidar/phase-1/dsm`)
  
    expect(parsed.Owner).toBe('scotland-gov')
    expect(parsed.Group).toBe('lidar/phase-1')
    expect(parsed.Dataset).toBe('lidar/phase-1/dsm')
  })
  
  test('should handle longer collection name just in case', () => {
    
    let parsed = parseCollectionName(`scotland-gov/lidar/phase-1/dsm/something-else`)
  
    expect(parsed.Dataset).toBe('lidar/phase-1/dsm/something-else')
  })

  test('should throw when collection name too short', () => {

    expect(() => {
      parseCollectionName(`scotland-gov/dsm`)
    }).toThrow()
  })
  
})
