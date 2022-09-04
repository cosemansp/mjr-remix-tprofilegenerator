import * as React from 'react';
import { Card, ConfirmationDialog } from '~/components';
import { TProfilePanel } from '../TProfilePanel';
import type { TProfile } from '~/models/TProfile';

type Props = {
  tProfiles: TProfile[];
  readonly?: boolean;
  onDelete?: (tProfile: TProfile) => void;
};

export const TProfiles = ({ tProfiles, readonly = false, onDelete }: Props) => {
  const [profileToDelete, setProfileToDelete] = React.useState<TProfile | undefined>();

  const asIsProfiles = tProfiles.filter((item) => item.kind === 'asIs');
  const toBeProfiles = tProfiles.filter((item) => item.kind === 'toBe');

  const handleDelete = (p: TProfile) => {
    setProfileToDelete(p);
  };

  const handleConfirmDelete = (profileToDelete?: TProfile) => {
    if (profileToDelete) {
      onDelete && onDelete(profileToDelete);
    }
    setProfileToDelete(undefined);
  };

  return (
    <>
      {asIsProfiles.length > 0 && (
        <Card title="As-Is">
          <div className="flex flex-wrap gap-4" data-testid="AsIsWrapper">
            {asIsProfiles.map((profile) => (
              <TProfilePanel key={profile.id} profile={profile} readonly={readonly} onDelete={handleDelete} />
            ))}
          </div>
        </Card>
      )}

      {toBeProfiles.length > 0 && (
        <Card title="To-Be">
          <div className="flex flex-wrap gap-4" data-testid="ToBeWrapper">
            {toBeProfiles.map((profile) => (
              <TProfilePanel key={profile.id} profile={profile} readonly={readonly} onDelete={handleDelete} />
            ))}
          </div>
        </Card>
      )}

      {profileToDelete && (
        <ConfirmationDialog
          onConfirm={() => handleConfirmDelete(profileToDelete)}
          onCancel={() => handleConfirmDelete()}
        >
          Are you sure you want to delete this profile?
        </ConfirmationDialog>
      )}
    </>
  );
};

export default TProfiles;
