import { useLoaderData, useSubmit } from '@remix-run/react';
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
  const id = formData.get('id') as string;
  const intent = formData.get('intent') as string;
  switch (intent) {
    case 'delete':
      await deleteProfile(id);
      return redirect('/my-t-shapes');
    case 'copy':
      await copyProfile(id);
      return redirect('/my-t-shapes');
  }
};

export default function Index() {
  const { tProfiles } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const handleCopy = (tProfile: TProfile) => {
    const data = new URLSearchParams(`intent=copy&id=${tProfile.id}`);
    submit(data, {
      method: 'post',
    });
  };

  const handleDelete = (tProfile: TProfile) => {
    const data = new URLSearchParams(`intent=delete&id=${tProfile.id}`);
    submit(data, {
      method: 'post',
    });
  };

  const handleEdit = (tProfile: TProfile) => {
    submit(null, {
      method: 'get',
      action: `/my-t-shapes/${tProfile.id}`,
    });
  };

  return (
    <ContentLayout title="My T-Shapes">
      <form method="get" action="/my-t-shapes/new">
        <div className="flex flex-col">
          <button type="submit" className="btn btn-primary mb-2 self-start">
            New
          </button>
          <TProfiles tProfiles={tProfiles} onDelete={handleDelete} onCopy={handleCopy} onEdit={handleEdit} />
        </div>
      </form>
    </ContentLayout>
  );
}
