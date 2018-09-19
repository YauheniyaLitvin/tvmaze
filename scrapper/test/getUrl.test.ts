
import { getUrl as getCastUrl } from '../src/cast'

describe('GET /api', () => {
  it(' get ok url cast', (done) => {
    expect(getCastUrl(1)).toBe('http://api.tvmaze.com/shows/1/cast')
    done()
  })

})
