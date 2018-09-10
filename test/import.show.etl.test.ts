import {etl}  from '../src/import/show'
import { Db } from 'mongodb'

import sinon from "sinon"
const num = 1
let db:Db;

describe("get and save show ", () => {

  it(" didn't get page => no save page", async (done) => {
    
    
        let getPage = sinon.stub().throws();    
        let pastePage = sinon.spy()
 

        expect.assertions(3);
        let result  = await etl(num, db, getPage, pastePage);
    
        expect(result).toBe(false);
        expect(getPage.called).toBe(true);
        expect(pastePage.called).toBe(false);
        done() 

  });

  it(" get page => save page", async (done) => {
    
    
        let getPage = sinon.spy(()=> [])  
        let pastePage = sinon.spy( )

        expect.assertions(3);
        let result  = await etl(num, db, getPage, pastePage);

        expect(result).toBe(true);
        expect(getPage.called).toBe(true);
        expect(pastePage.called).toBe(true);
        done() 
  });

}); 
