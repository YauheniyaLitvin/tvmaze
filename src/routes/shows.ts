
import {Request, Response, NextFunction} from 'express';
import { get as getShow }  from '../storage/mongo/show';
import {validateQuety} from './validator'
import * as dbInstance from './../dbInstance'

export async function get(req:Request, res:Response, next:NextFunction) {

  try {       
   
    if( !validateQuety(req.query) ) throw new Error('invalid query params')
    
    const {limit = 3,page = 1} = req.query; 
    const db = await dbInstance.get()
    const shows = await getShow(db , +page, +limit)
    res.status(200).json( shows )

  } catch (err) {
    next(err)
  }

}