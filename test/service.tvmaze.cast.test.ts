
import { get } from '../src/service/tvmaze/cast'
import config from '../src/config'


describe(' get first page showsw', () => {

    it('should return first page ', async (done) => {
        
        expect.assertions(2)
        
        const show = 1, baseUrl = config.TVMAZE.URL   
        const result  = await get( show , baseUrl)
        
        expect(result).not.toBeNull()
        expect(result.length).toBeGreaterThan(0)

        done() 
    })
})
