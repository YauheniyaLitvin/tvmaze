import * as m from 'mongodb'

export async function paste( db: m.Db, shows: any[] ) : Promise<m.InsertWriteOpResult> {
    return coll(db).insertMany( shows )
}
 
export function noCast( db: m.Db ) : m.Cursor {
     return coll(db).find({ cast: null },{ projection: { id: 1 } } )
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
    const cursor = coll(db).find({},{skip,limit})
    const data =  await cursor.toArray()
    return data 
}

function coll( db: m.Db, collName : string = 'show') : m.Collection {
     return db.collection( collName )
}