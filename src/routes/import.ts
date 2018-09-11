import {Router} from 'express'
import { run as castImport } from '../import/cast'
import { run as showImport} from '../import/show'

const router = Router()

router.get('/show', ( req, res , next)=>{
    showImport()
    res.json('ok').end()
 
})

router.get('/cast', ( req, res , next)=>{
 
     castImport()
     res.json('ok').end()
  
})


export default router; 