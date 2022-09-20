import type { ObjectId } from 'mongodb';

export interface CategoryDb {
  _id?: ObjectId;
  name: string;
  modifiedAt: Date;
}
