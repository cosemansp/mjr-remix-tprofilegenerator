# Welcome to Remix!

```sh
npm run dev # run dev
npm run build # build prod
npm start  # run prod build
```

## Features

- [x] add tailwindcss & daisyui
- [x] add mongodb
- [x] add base layout

## Demo's

### It's just react

Look at About

### File based routing

```
/routes
  about.tsx
  categories.tsx
  /categories
    new.tsx
    $id.tsx
    index.tsx
```

### Data Loader

```js
export const loader = async ({ request }: LoaderArgs) => {
  const data = {
    products: await getDb().products.find({}).toArray(),
  };
  return json(data);
};

export default () => {
  const { products } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-xl">Products</h1>
      <code>
        <pre>{JSON.stringify(products, null, 2)}</pre>
      </code>
    </div>
  );
};
```

Make it even better with `remix-typedjson`

```js
import { typedjson as json, useTypedLoaderData as useLoaderData } from 'remix-typedjson';

// fully typed including date, Set, Map, Error, BigInt
const { products } = useLoaderData<typeof loader>();
```

### Forms

```js
<form method="post">
  <div className="form-control w-full max-w-xs">
    <input className="input input-bordered w-full max-w-xs" type="text" name="name" />
  </div>
  <button className="btn mt-2" type="submit">
    Save
  </button>
</form>
```
Action 

```js
export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  await getDb().categories.insertOne({
    name: formPayload.name as any,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });
  return redirect('/categories');
};
```

Add validation

```js
export const formSchema = z.object({
  name: z.string().min(3).max(50),
});
type FormValues = z.infer<typeof formSchema>;

try {
  const values = schema.parse(formPayload);
  await getDb().categories.insertOne({
    name: values.name,
    modifiedAt: new Date(),
  });
  return redirect('/categories');
} catch (err) {
  if (err instanceof ZodError) {
    return {
      formPayload,
      errors: err.flatten().fieldErrors,
    };
  }
}

type ActionData = {
  formPayload: FormValues;
  errors: { name: string[] };
};

const actionData = useActionData<ActionData>();

// ...

{actionData?.errors.name && <span className="text-red-600">{actionData?.errors.name[0]}</span>}

```


