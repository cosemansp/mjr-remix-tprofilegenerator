import * as React from 'react';
import { Card, ConfirmationDialog } from '~/components';
import { TProfilePanel } from '../TProfilePanel';
import type { TProfile } from '~/models/TProfile';

type Props = {
  tProfiles: TProfile[];
  readonly?: boolean;
  onDelete?: (tProfile: TProfile) => void;
  onCopy?: (tProfile: TProfile) => void;
  onEdit?: (tProfile: TProfile) => void;
};

export const TProfiles = ({ tProfiles, readonly = false, onDelete, onCopy, onEdit }: Props) => {
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

  const handleDownload = (p: TProfile) => {
    console.log('downloaded', p);
  };

  return (
    <>
      {asIsProfiles.length > 0 && (
        <Card title="As-Is">
          <div className="flex flex-wrap gap-4" data-testid="AsIsWrapper">
            {asIsProfiles.map((profile) => (
              <TProfilePanel
                key={profile.id}
                onEdit={onEdit}
                onCopy={onCopy}
                onDelete={handleDelete}
                onDownload={handleDownload}
                profile={profile}
                readonly={readonly}
              />
            ))}
          </div>
        </Card>
      )}

      {toBeProfiles.length > 0 && (
        <Card title="To-Be">
          <div className="flex flex-wrap gap-4" data-testid="ToBeWrapper">
            {toBeProfiles.map((profile) => (
              <TProfilePanel
                key={profile.id}
                onEdit={onEdit}
                onCopy={onCopy}
                onDelete={handleDelete}
                onDownload={handleDownload}
                profile={profile}
                readonly={readonly}
              />
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
