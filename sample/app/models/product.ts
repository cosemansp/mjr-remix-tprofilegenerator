import type { ObjectId } from 'mongodb';

export interface ProductDb {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  sku: string;
  modifiedAt: Date;
}
