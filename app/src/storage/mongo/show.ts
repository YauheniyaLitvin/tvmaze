import * as m from 'mongodb'
import config from '../../config'

export async function get(db: m.Db, page:number, limit:number){
    let skip:number = (page)*limit
    const projection = {_id:0, id:1, name:1,'cast.id':1,'cast.name':1, 'cast.birthday':1 , 'image.medium':1, 'cast.character.name':1  }
    const cursor = coll(db).find({},{skip,limit ,sort:{id:1}, projection})
    const data =  await cursor.toArray()
    return data
}
function coll(db: m.Db, collName : string = config.get('DB_SHOWCOLLECTION')) : m.Collection {
     return db.collection(collName)
}