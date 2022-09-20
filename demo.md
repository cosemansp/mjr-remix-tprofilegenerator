# Demo

## Navigation

```
/categories
  $id.tsx
  index.tsx
  new.tsx
```

```html
<h1>Categories</h1>
<Outlet />
<p>Lets make it together</p>
```

```tsx
export default () => {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div className="bg-slate-300 p-2">
      <h2>Category list</h2>
      <Link to="/categories/new" className="btn btn-primary">
        New category
      </Link>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`/categories/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
```


```tsx
// $id.tsx
export const loader = async ({ params }: LoaderArgs) => {
  const id = params.id;
  const category = await getDb().categories.findOne({ _id: new ObjectId(id) });
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
    </div>
  );
};
```

```tsx
// new.tsx
export default () => {
  return (
    <div className="bg-gray-200 p-2">
      <h2>New Category</h2>
    </div>
  );
};
```

## Data Loading

```tsx
export const loader = async ({ request }: LoaderArgs) => {
  const categories = await getDb().categories.find({}).toArray();
  return json({ categories });
};
```

```tsx
export default () => {
  const { categories } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Category list</h2>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Search input

```tsx
export const loader = async ({ request }: LoaderArgs) => {
 const url = new URL(request.url);
  const search = new URLSearchParams(url.search);
  const query = search.get('query') || '';
  const categories = await getDb().categories.find({}).toArray();
  const filteredCategories = categories.filter((item) => item.name.includes(query));
  return json({ categories: filteredCategories, filter: query });
}
```

```tsx
export default () => {
  const { categories, filter } = useLoaderData<typeof loader>();
  return (
    <div className="bg-slate-400">
      <h2>Category list</h2>
      <form method="get">
        <input className="input" type="text" name="query" placeholder="Search" defaultValue={filter} />
      </form>
    </div>
  );
};
```

## Form

```tsx
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData) as any;
  await getDb().categories.insertOne({
    name: formPayload.name,
    modifiedAt: new Date(),
  });
  return redirect('/categories');
}
```

```html
<div className="bg-gray-200 p-2">
  <h2>New Category</h2>
  <form method="post">
      <div className="form-control">
          <input className="input input-bordered" type="text" name="name" />
      </div>
      <button className="btn mt-2" type="submit">
          Save
      </button>
  </form>
</div
```

## Form Validation

```jsx
import { z, ZodError } from 'zod';
import { useActionData } from '@remix-run/react';

export const schema = z.object({
  name: z.string().min(3).max(50),
});
type FormValues = z.infer<typeof schema>;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  try {
    const formValues = schema.parse(formPayload);
    await getDb().categories.insertOne({
      name: formValues.name,
      modifiedAt: new Date(),
    });
    return redirect('/categories');
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        errors: err.flatten().fieldErrors,
      };
    }
  }
};
```

```tsx
type ActionData = {
  errors: { name: string[] };
};

export default () => {
  const actionData = useActionData<ActionData>();
  // ...
  { 
    actionData?.errors.name && 
    <span className="text-red-600">{actionData?.errors.name[0]}</span>
  }
}

```

## ErrorBoundary

```js
const category = await getDb().categories.findOne({ _id: new SafeObjectId(id) });
if (!category) {
    throw json({ status: 404, statusText: 'Not Found' });
}
```

```js
export function ErrorBoundary({ error }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="m-4">
        <h1 className="text-2xl">Something went wrong!</h1>
        <p>{error.message}</p>
        <Scripts />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html>
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="prose">
        <h1>Oops</h1>
        <p>
          {caught.status}: {caught.statusText}
        </p>
        <Scripts />
      </body>
    </html>
  );
}

// $id.tsx
export function CatchBoundary() {
  const { data } = useCatch();
  return (
    <div>
      <p>Resources not found [{data.status}]</p>
    </div>
  );
}
```

## Final

### categories/index.tsx

```tsx
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
```

### categories/$id.tsx

```tsx
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData, useParams } from '@remix-run/react';
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
```

### categories/new.tsx

```tsx
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getDb } from '~/server/db.server';
import { z, ZodError } from 'zod';
import { useActionData } from '@remix-run/react';

export const schema = z.object({
  name: z.string().min(3).max(50),
});

type FormValues = z.infer<typeof schema>;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  try {
    const formValues = schema.parse(formPayload);
    await getDb().categories.insertOne({
      name: formValues.name,
      modifiedAt: new Date(),
    });
    return redirect('/categories');
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        errors: err.flatten().fieldErrors,
      };
    }
  }
};

type ActionData = {
  errors: { name: string[] };
};

export default () => {
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <h2>New Category</h2>
      <form method="post">
        <div className="form-control">
          <input className="input input-bordered" type="text" name="name" />
          {actionData?.errors.name && <span className="text-red-600">{actionData?.errors.name[0]}</span>}
        </div>
        <button className="btn mt-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
```