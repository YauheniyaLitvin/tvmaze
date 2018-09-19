import * as m from 'mongodb'
import config from '../../config'

export async function connect(url : string  = config.get('DB_URI')) : Promise<m.MongoClient>{
    return m.MongoClient.connect(url, { useNewUrlParser: true})
}

export async function close(client : m.MongoClient) : Promise<any> {
    if (!client) return new Promise((resolve, reject)=>{
        resolve()
    })
    return client.close()
}

export function db(client: m.MongoClient, dbname = config.get('DB_NAME')){
    return client.db(dbname)
}
