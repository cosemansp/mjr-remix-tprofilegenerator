import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getDb } from '~/server/db.server';

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const query = search.get('query') || '';
  const categories = await getDb().categories.find({}).toArray();
  const filteredCategories = categories.filter((item) => item.name.includes(query));
  return json({ categories: filteredCategories, filter: query });
};

export default () => {
  const { categories, filter } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Category list</h2>
      <Link to="/categories/new" className="btn btn-primary">
        New category
      </Link>
      <form method="get">
        <input className="input input-bordered" type="text" name="query" placeholder="Search" defaultValue={filter} />
      </form>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`/categories/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <hr></hr>
    </div>
  );
};
