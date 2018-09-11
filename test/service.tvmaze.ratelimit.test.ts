import { get, rateErrorHandler, RATELIMITERR}  from './../src/service/tvmaze/cast'
import axios from 'axios'
import sinon from 'sinon'


it(" should recall  get function while get ratelimit error ", async (done) => {   
     
       expect.assertions(2);       

       let request = sinon.stub( axios, 'request' )

       let responseData = { data:[{id:1},{id:2}] }
       let error = {response:{ status: RATELIMITERR}}

       let rnum = 0
       request.onCall(rnum++).throws(error)  
       request.onCall(rnum++).throws(error)         // should be called
       request.onCall(rnum++).returns(responseData) // should be called
       request.onCall(rnum++).throws(error)         // shouldn't be called

       let result = await get(1,'/' )

       expect(result).toEqual(responseData.data);
       expect(request.callCount).toEqual(3);

       done() 

});
