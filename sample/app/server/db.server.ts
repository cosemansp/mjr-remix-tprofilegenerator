import type { Collection, OptionalId } from 'mongodb';
import { ObjectId } from 'mongodb';
import type { ProductDb, CategoryDb } from '../models';
import { MongoClient } from 'mongodb';

export interface Db {
  products: Collection<OptionalId<ProductDb>>;
  categories: Collection<OptionalId<CategoryDb>>;
}

if (!global.currentClient) {
  console.log('Creating new client');
  const uri = 'mongodb://localhost:27017/samples'; // process.env.MONGO_URI;
  if (!uri) throw new Error('No Mongo URI configured (MONGO_URI)');
  global.currentClient = new MongoClient(uri);
}

export function getDb(): Readonly<Db> {
  const client = global.currentClient;
  if (!client) throw new Error('No Db connected');
  const db = client.db();
  return {
    products: db.collection('products'),
    categories: db.collection('categories'),
  };
}

export class SafeObjectId extends ObjectId {
  constructor(id: string | undefined) {
    if (id && ObjectId.isValid(id)) {
      super(id);
      return;
    }
    super('000000000000000000000000');
  }
}
