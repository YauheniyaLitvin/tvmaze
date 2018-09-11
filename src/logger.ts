import  { createLogger, format, transports, Logger } from 'winston'
const { combine, timestamp, printf, label } = format;
import fs from 'fs'


const logdir:string = 'log'
if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir);
}


const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message} [${info.label}]` ;
});

const logger:Logger = createLogger({
    format:combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: logdir+'/error.log', level: 'error' }),
        new transports.File({ filename: logdir+'/combined.log' })
    ]
});


export default  ( callmodule:NodeModule )=> {

    return createLogger({
        format:combine(
            label({ label:  callmodule.filename }),
            timestamp(),            
            myFormat
        ),
        transports: [
            new transports.File({ filename: logdir+'/error.log', level: 'error' }),
            new transports.File({ filename: logdir+'/combined.log' })
        ]
    });

}