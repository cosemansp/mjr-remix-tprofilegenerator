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
        formPayload,
        errors: err.flatten().fieldErrors,
      };
    }
  }
};

type ActionData = {
  formPayload: FormValues;
  errors: { name: string[] };
};

export default () => {
  const actionData = useActionData<ActionData>();
  return (
    <div>
      <h2>New Category</h2>
      <form method="post">
        <div className="form-control w-full max-w-xs">
          <input className="input input-bordered w-full max-w-xs" type="text" name="name" />
          {actionData?.errors.name && <span className="text-red-600">{actionData?.errors.name[0]}</span>}
        </div>
        <button className="btn mt-2" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
