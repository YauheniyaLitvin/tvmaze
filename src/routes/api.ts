import {Request, Response, NextFunction} from 'express'
import * as dbInstance from './../dbInstance'
import { getStrict }  from '../storage/mongo/show'
import {validateQuety} from './validator'
import config from '../config'

export async function get(req:Request, res:Response, next:NextFunction) {

  try {   
   
    if( !validateQuety(req.query) ) throw new Error('invalid query params')
      
    const {limit = config.PAGELIMIT, page = config.PAGENUM} = req.query;          
    const db = await dbInstance.get()
    const shows = await getStrict(db , +page, +limit)
    res.status(200).json( shows )

  } catch (err) {
    next(err);
  }

}


