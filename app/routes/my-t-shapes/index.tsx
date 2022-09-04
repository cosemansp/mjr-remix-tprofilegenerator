import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import ContentLayout from '~/layout/ContentLayout';
import { del as deleteProfile, copy as copyProfile, getAllTProfileByMe } from '~/server/tProfiles';
import { TProfiles } from './components/TProfiles';
import type { TProfile } from '~/models/TProfile';

export const loader = async () => {
  const data = {
    tProfiles: await getAllTProfileByMe(),
  };
  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formDataObj = Object.fromEntries(formData);
  const id = formData.get('id') as string;
  const intent = formData.get('intent') as string;
  console.log('intent', { formDataObj, intent });
  switch (intent) {
    case 'delete':
      await deleteProfile(id);
      break;
    case 'copy':
      await copyProfile(id);
      break;
    case 'edit':
      return redirect(`/my-t-shapes/${id}`);
    case 'new':
      return redirect('/my-t-shapes/new');
  }
  return redirect('/my-t-shapes');
};

export default function Index() {
  const { tProfiles } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleDelete = (tProfile: TProfile) => {
    const data = new URLSearchParams(`intent=delete&id=${tProfile.id}`);
    submit(data, {
      method: 'post',
    });
  };

  return (
    <ContentLayout title="My T-Shapes">
      <Form method="post">
        <div className="flex flex-col">
          <button type="submit" className="btn btn-primary mb-2 self-start" name="intent" value="new">
            New
          </button>
          <TProfiles tProfiles={tProfiles} onDelete={handleDelete} />
        </div>
      </Form>
    </ContentLayout>
  );
}
