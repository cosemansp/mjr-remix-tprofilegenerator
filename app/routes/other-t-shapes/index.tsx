import { Link, useLoaderData } from '@remix-run/react';
import { Card } from '~/components';
import ContentLayout from '~/layout/ContentLayout';
import type { TProfile } from '~/models/TProfile';
import { getAllAsIs } from '~/server/tProfiles';

/*
 * Server
 */
export const loader = async () => {
  const latestUserProfile = await getAllAsIs();
  return {
    latestUserProfile,
  };
};

/*
 * Client
 */

type GeneralismsType = TProfile['generalisms'];
type SpecialismsType = TProfile['specialisms'];

const Specialisms = ({ data }: { data: SpecialismsType }) => {
  return (
    <>
      {data.map((specialism) => (
        <div key={specialism.title}>{specialism.title}</div>
      ))}
    </>
  );
};

const Generalisms = ({ data }: { data: GeneralismsType }) => {
  return (
    <>
      {data.map((generalism) => (
        <div key={generalism.title}>{generalism.title}</div>
      ))}
    </>
  );
};

export default function Index() {
  const { latestUserProfile } = useLoaderData<typeof loader>();
  return (
    <ContentLayout title="Other T-Shapes">
      <Card>
        <div className="overflow-x-auto">
          {/* TODO: Add filter fields here */}
          <div className="rounded-t-xl border border-solid">
            <table className="table-zebra table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Generalisms</th>
                  <th>Specialisms</th>
                </tr>
              </thead>
              <tbody className="">
                {latestUserProfile.map((profile) => (
                  <tr key={profile.id}>
                    <td>
                      <Link to={`/other-t-shapes/${profile.owner.id}`} className="link">
                        {profile.owner.name}
                      </Link>
                    </td>
                    <td>
                      <Generalisms data={profile.generalisms} />
                    </td>
                    <td>
                      <Specialisms data={profile.specialisms} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </ContentLayout>
  );
}
