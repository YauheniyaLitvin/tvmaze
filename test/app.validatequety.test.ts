import {validateQuety} from '../src/routes/validator'

describe('test quyry params', () => {
    
    it(' send string value', () => {            
        expect( validateQuety({limit:'r1', page:'1'}) ).toBe(false)        
    })

    it(' send null ', () => {            
        expect( validateQuety({limit:'null', page:'1'}) ).toBe(false)        
    })

    it(' send negative number', () => {            
        expect( validateQuety({limit:'-4', page:'1'}) ).toBe(false)        
    })

    it(' send 0', () => {            
        expect( validateQuety({limit:'0', page:'1'}) ).toBe(false)        
    })

    it(' without params ', () => {            
        expect( validateQuety({}) ).toBe(true)        
    })

    it(' valid params ', () => {            
        expect( validateQuety({ limit:'1', page:'2'}) ).toBe(true)        
    })

}); 

