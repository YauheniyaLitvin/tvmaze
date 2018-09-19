import express, {Request, Response, NextFunction, Application} from 'express'
import bodyParser from 'body-parser'
import config from './config'
import router from './router'
import IError from './interfaces/error'
import {NotFoundError} from './customErrors'

class App {

    constructor () {
        this.app = express();
        this.config();
    }

    public app:Application

    private errorHandler(err:IError, req:Request, res:Response, next:NextFunction){
            res.status((err.code) ?err.code:500);
            res.json({ error: (err)?err.message:'server error' })
    }

    private config():void{

        this.app.use(express.static('public'))
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.set('port',config.get('PORT'))
        this.app.use('/', router)
        this.app.use((req:Request,res:Response, next:NextFunction)=>{
            next(new NotFoundError('not found'))
        })
        this.app.use(this.errorHandler)
    }

}

export default new App().app