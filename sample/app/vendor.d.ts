import type { MongoClient } from 'mongodb';

declare global {
  var currentClient: MongoClient;
}
export {};
