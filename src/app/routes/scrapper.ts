import {Router} from 'express'
import {start , resume , stop } from '../../scrapper/controller'
import { isNotInteger } from '../../utils'


const router = Router()

router.get('/start', ( req, res , next)=>{

    let {page} = req.query
    if ( isNotInteger(page) ) throw new Error('invalid query params') 

    const started = start( +page )
    res.json({started}).end()
    
})

router.get('/resume', ( req, res , next)=>{
    const resumed = resume()
    res.json({resumed}).end()
  
})

router.get('/stop', ( req, res , next)=>{ 
    const stoped = stop()
    res.json({stoped}).end()
  
})


export default router