import { ObjectId } from 'mongodb';
import type { ProductDb, Product } from '~/models';
import { getDb } from './db.server';

const productMapper = (source: ProductDb): Product => {
  const { _id, ...obj } = source;
  return {
    ...obj,
    id: _id.toHexString(),
    createdAt: new Date(source.createdAt).toISOString(),
    modifiedAt: new Date(source.modifiedAt).toISOString(),
  };
};

export const getById = async (id: string): Promise<Product | null> => {
  const item = await getDb().products.findOne({ _id: new ObjectId(id) });
  if (!item) {
    return null;
  }
  return productMapper(item);
};

export const getAll = async (): Promise<Product[]> => {
  const items: ProductDb[] = await getDb().products.find({}).toArray();
  return items.map((item) => productMapper(item));
};

export const update = async (entity: Product): Promise<void> => {
  const dbProducts = getDb().products;
  const now = new Date();
  if (entity.id) {
    await dbProducts.updateOne(
      { _id: new ObjectId(entity.id) },
      {
        $set: {
          name: entity.name,
          description: entity.description,
          price: entity.price,
          sku: entity.sku,
          modifiedAt: now,
        },
      },
    );
    return;
  }
  await dbProducts.insertOne({
    name: entity.name,
    description: entity.description,
    price: entity.price,
    sku: entity.sku,
    createdAt: now,
    modifiedAt: now,
  });
};
