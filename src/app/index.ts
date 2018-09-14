import app from '../app/app'
import Logger from '../logger'
const logger = Logger(module)

app.listen( app.get('port'), (err:string) => {
  if (err) {
    return logger.error(err)
  }
  return logger.info( `server is listening on ${app.get('port')}`) 
})