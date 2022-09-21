import type { ObjectId } from 'mongodb';

export interface ProductDb {
  _id?: ObjectId;
  title: string;
  name: string;
  description: string;
  discountPercentage: number;
  price: number;
  brand: string;
  sku: string;
  category: ObjectId;
  rating: number;
  createdAt: Date;
}
