import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getDb } from '~/server/db.server';
// import { typedjson as json, useTypedLoaderData as useLoaderData } from 'remix-typedjson';

// run on server
export const loader = async ({ request }: LoaderArgs) => {
  const data = {
    products: await getDb().products.find({}).toArray(),
  };
  return json(data);
};

// renders on client
const Products = () => {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Products</h1>
      <code>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </code>
    </div>
  );
};

export default Products;
