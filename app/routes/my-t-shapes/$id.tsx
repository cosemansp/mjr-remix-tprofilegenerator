import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import ContentLayout from '~/layout/ContentLayout';
import { get } from '~/server/tProfiles';

type Params = {
  id: string;
};

export const loader = async ({ params }: { params: Params }) => {
  console.log('params', params);
  invariant(params.id, 'id is required');
  const data = {
    tProfiles: await get(params.id),
  };
  return data;
};

export default function Index() {
  const { tProfiles } = useLoaderData<typeof loader>();
  return (
    <ContentLayout title={` Edit T-Shape`}>
      <span>Not implemented yet</span>
      <div>{JSON.stringify(tProfiles)}</div>
    </ContentLayout>
  );
}
