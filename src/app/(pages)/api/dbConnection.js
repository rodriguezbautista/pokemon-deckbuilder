import { MongoClient, ServerApiVersion } from 'mongodb'
require('dotenv').config()

const uri = process.env.NEXT_PUBLIC_DB_URI
console.log(uri)
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

const dbName = 'pokemon-deckbuilder'

export async function query (collectionName, callback) {
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    await callback(collection)

    // devuelvo el error a la funcion superior

    // eslint-disable-next-line
  } catch (err) {
    throw err
  } finally {
    await client.close()
  }
}
