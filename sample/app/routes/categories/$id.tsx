import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useCatch, useLoaderData, useParams } from '@remix-run/react';
import { getDb, SafeObjectId } from '~/server/db.server';

export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  const category = await getDb().categories.findOne({ _id: new SafeObjectId(id) });
  if (!category) {
    throw json({ status: 404, statusText: 'Not Found' });
  }

  return json({ category });
};

export default () => {
  let { id } = useParams();
  const { category } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>My Category: {id}</h2>
      <code>
        <pre>{JSON.stringify(category, null, 2)}</pre>
      </code>
      <Link to="/categories">Back to categories</Link>
    </div>
  );
};

export function CatchBoundary() {
  const { data } = useCatch();
  return (
    <div>
      <p>Resources not found [{data.status}]</p>
    </div>
  );
}
