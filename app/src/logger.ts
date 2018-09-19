import fs from 'fs'
import  { createLogger, format, transports } from 'winston'
const { combine, timestamp, printf, label } = format
const env = process.env.NODE_ENV || 'development'

const logdir:string = 'log'
if (!fs.existsSync(logdir)) {
    fs.mkdirSync(logdir);
}

const consoleTransport = new transports.Console({format:format.simple(), level:'debug'})
const combinedTransport = new transports.File({ filename: `${logdir}/combined.log` })
const fileFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message} [${info.label}]` ;
})

function newLogger(filename:string){

    const logger = createLogger({
        format: getFormat(filename),
        transports: [
            new transports.File({ filename: `${logdir}/error.log`, level: 'error' })
        ]
    })
    if (process.env.NODE_ENV !== 'production') {
        logger.add(consoleTransport)
        logger.add(combinedTransport)
    }
    return logger
}

function getFormat(filename:string){
    return combine(
        label({ label: filename }),
        timestamp(),
        fileFormat
    )
}

export default  (callmodule:NodeModule)=> {
    return newLogger(callmodule.filename)
}