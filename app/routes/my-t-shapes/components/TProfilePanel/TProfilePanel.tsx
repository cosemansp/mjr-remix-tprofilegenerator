import React from 'react';
import { FaCopy, FaEdit } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import type { TProfile } from '~/models/TProfile';

interface TProfilePanelProps {
  profile: TProfile;
  readonly: boolean;
  onEdit?: (tProfile: TProfile) => void;
  onCopy?: (tProfile: TProfile) => void;
  onDelete?: (tProfile: TProfile) => void;
  onDownload?: (tProfile: TProfile) => void;
}

const TProfilePanel = ({ profile, onEdit, onCopy, onDelete, onDownload, readonly }: TProfilePanelProps) => {
  return (
    <div className="flex items-center flex-col min-w-1/3">
      <div className="p-2">{format(parseISO(profile.date), 'dd/MM/yyyy')}</div>
      <div>
        <img src="https://via.placeholder.com/250" alt="placeholder" className="w-52" />
      </div>
      {!readonly && (
        <div className="flex justify-evenly w-full p-2">
          <FaEdit
            role="button"
            aria-label="edit"
            className="cursor-pointer"
            onClick={() => onEdit && onEdit(profile)}
          />
          <FaCopy
            role="button"
            aria-label="copy"
            className="cursor-pointer"
            onClick={() => onCopy && onCopy(profile)}
          />
          <MdDelete
            role="button"
            aria-label="delete"
            className="cursor-pointer"
            onClick={() => onDelete && onDelete(profile)}
          />
          <FiDownload
            role="button"
            aria-label="download"
            className="cursor-pointer"
            onClick={() => onDownload && onDownload(profile)}
          />
        </div>
      )}
    </div>
  );
};
export default TProfilePanel;
