
import { get } from '../src/service/tvmaze/get'
import {pageUrl} from '../src/scrapper/show'
import config from '../src/config'


describe(' get first page showsw', () => {

    it('should return first page ', async (done) => {
        
        expect.assertions(2)
        
        const show = 1, baseUrl = config.TVMAZE.URL   
        const result:any = await get(  pageUrl( show ) )        
        expect(result).not.toBeNull()
        expect(result.length).toBeGreaterThan(0)

        done() 
    })
})
