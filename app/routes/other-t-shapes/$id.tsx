import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import ContentLayout from '~/layout/ContentLayout';
import { getAllTProfileByUser } from '~/server/tProfiles';
import { TProfiles } from '../my-t-shapes/components/TProfiles';

type Params = {
  id: string;
};

export const loader = async ({ params }: { params: Params }) => {
  invariant(params.id, `params.id is required`);
  const tProfiles = await getAllTProfileByUser(params.id);
  if (tProfiles.length === 0) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  return {
    tProfiles,
  };
};

export default function Index() {
  const { tProfiles } = useLoaderData<typeof loader>();
  return (
    <ContentLayout title={` T-Shapes of ${tProfiles[0].owner.name}`}>
      <TProfiles tProfiles={tProfiles} readonly />
    </ContentLayout>
  );
}

export function CatchBoundary() {
  return (
    <ContentLayout title={`Not found`}>
      <span>The requested data is not found</span>
    </ContentLayout>
  );
}
