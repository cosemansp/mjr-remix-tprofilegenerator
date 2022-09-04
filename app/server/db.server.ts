import type { Collection, OptionalId } from 'mongodb';
import type { TProfileDb } from '../models/TProfile';
import { MongoClient } from 'mongodb';

export interface Db {
  tProfiles: Collection<OptionalId<TProfileDb>>;
}

let currentClient: MongoClient | undefined;
if (!currentClient) {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('No Mongo URI configured (MONGO_URI)');
  currentClient = new MongoClient(uri);
}

export function getDb(): Readonly<Db> {
  const client = currentClient;
  if (!client) throw new Error('No Db connected');
  const db = client.db();
  return {
    tProfiles: db.collection('tProfiles'),
  };
}
