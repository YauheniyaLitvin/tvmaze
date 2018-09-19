
import { Request, Response, NextFunction } from 'express'
import { get as getShow}  from '../storage/mongo/show'
import { isInteger } from '../utils'
import { ValidationError } from '../customErrors'
import config from '../config'
import * as dbInstance from '../dbInstance'

export async function get(req:Request, res:Response, next:NextFunction) {

  try {

    if(!validateQuety(req.query)) throw new ValidationError('invalid query params')

    const {limit = config.get('PAGELIMIT'), page = config.get('PAGENUM') } = req.query
    const db = await dbInstance.get()
    const shows = await getShow(db , +page, +limit)
    res.status(200).json(shows)

  } catch (err) {
    next(err)
  }

}

export function  validateQuety(query:any):boolean{
  let {page, limit} = query
  if (isInteger(page) && isInteger(limit)) return true
  return false
}
