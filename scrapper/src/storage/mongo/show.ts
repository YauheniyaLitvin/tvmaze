import * as m from 'mongodb'

export async function paste(db: m.Db, shows: any[]) : Promise<m.InsertWriteOpResult> {
   return coll(db).insertMany(shows)
}

export async function updatePageState(db: m.Db, page:any) : Promise<m.FindAndModifyWriteOpResultObject> {
    return coll(db, 'pageState').findOneAndUpdate(
            {_id:1},
            { $set: { page } },
            {upsert:true}
    )
 }

export async function getPageState(db: m.Db) : Promise<any> {
    return coll(db, 'pageState').findOne({_id:1})
}

export function noCast(db: m.Db) {
     return coll(db).find({ cast: null },{ projection: { id: 1 },sort:{id:1} }).toArray()
}

export async function setCast(db: m.Db, showid: number, cast: any){
     return coll(db).findOneAndUpdate(
             { id: showid },
             { $set: { cast } },
             { returnOriginal: false }
     )
}

export async function createIndexes(db: m.Db){
    return coll(db).createIndex('id')
}

export async function dropCollection(db: m.Db){
    const collection = await db.listCollections({name:'show'}).next()
    if (!collection) return
    return coll(db).drop()

}

function coll(db: m.Db, collName : string = 'show') : m.Collection {
     return db.collection(collName)
}