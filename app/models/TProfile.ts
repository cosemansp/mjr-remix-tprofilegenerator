import type { ObjectId } from 'mongodb';

export interface TProfileDb {
  _id: ObjectId;
  owner: {
    id: string;
    name: string;
  };
  date: Date;
  kind: 'toBe' | 'asIs';
  generalisms: {
    id: number;
    title: string;
    percentage: number;
  }[];
  specialisms: {
    id: number;
    title: string;
    percentage: number;
  }[];
  createdAt: Date;
  modifiedAt: Date;
}

export interface TProfile extends Omit<TProfileDb, '_id' | 'date' | 'createdAt' | 'modifiedAt'> {
  id: string;
  date: string;
  createdAt: string;
  modifiedAt: string;
}
