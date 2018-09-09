

import express from "express";
import bodyParser from "body-parser";

import {Application} from "express"
import config from "./config"
import router from "./router"
import * as dbInstance from './dbInstance'

class App {

    constructor () {
        this.app = express();
        this.config();
    }

    public app:Application;

    private config():void{        
            
        this.app.use(express.static('public'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.set("port", process.env.PORT || config.port );         
        this.app.use( '/', router)
     
    }
    
}

export default new App().app