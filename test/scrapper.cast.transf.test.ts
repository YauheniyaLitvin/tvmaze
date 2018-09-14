import { byBirthdayDesc } from '../src/scrapper/cast'

describe(' data transformation', () => {
    it('should sord array', () => {            
        expect( arr1.sort(byBirthdayDesc) ).toEqual(arr2);        
    });  
}); 

let arr1 = [
    {'id':1,'birthday': '2003-02-01'},
    {'id':2,   'birthday': '2010-02-01'},
    {'id':3,   'birthday': '2002-02-01'},
    {'id':4,   'birthday': '2001-02-01'}
]
let arr2 = [
    {'id':2,'birthday': '2010-02-01' },
    {'id':1, 'birthday': '2003-02-01'},
    {'id':3,'birthday': '2002-02-01' },
    {'id':4,'birthday': '2001-02-01' }
]    