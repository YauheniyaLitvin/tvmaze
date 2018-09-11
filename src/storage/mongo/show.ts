import * as m from 'mongodb'

export async function paste( db: m.Db, shows: any[] ) : Promise<m.InsertWriteOpResult> {
    return coll(db).insertMany( shows )
}
 
export function noCast( db: m.Db ) : m.Cursor {
     return coll(db).find({ cast: null },{ projection: { id: 1 },sort:{id:1} } )
}
 
export async function setCast( db: m.Db, show: any, cast: any ){
     return coll(db).findOneAndUpdate(
             { _id: show._id },
             { $set: { cast } },
             { returnOriginal: false }
     )
 }
export async function get(  db: m.Db, page:number=1, limit:number=10 ){ 
    let skip:number = (page-1)*limit
    const cursor = coll(db).find({},{skip,limit ,sort:{id:1}})
    const data =  await cursor.toArray()
    return data 
}

export async function getStrict(  db: m.Db, page:number=1, limit:number=10 ){ 
    let skip:number = (page-1)*limit
    const cursor = coll(db).find({},{skip,limit, projection:{id:1,name:1, 'cast.id':1,'cast.name':1, 'cast.birthday':1}})
    const data =  await cursor.toArray()
    return data 
}
export async function createIndexes(db: m.Db){

    return coll(db).createIndex('id')

}
function coll( db: m.Db, collName : string = 'show') : m.Collection {
     return db.collection( collName )
}