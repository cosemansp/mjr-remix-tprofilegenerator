import React from 'react';
import { FaCopy, FaEdit } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import type { TProfile } from '~/models/TProfile';

interface TProfilePanelProps {
  profile: TProfile;
  readonly: boolean;
  onDelete?: (tProfile: TProfile) => void;
}

const TProfilePanel = ({ profile, onDelete, readonly }: TProfilePanelProps) => {
  return (
    <div className="flex items-center flex-col min-w-1/3">
      <input type="hidden" name="id" value={profile.id} />
      <div className="p-2">{format(parseISO(profile.date), 'dd/MM/yyyy')}</div>
      <div>
        <img src="https://via.placeholder.com/250" alt="placeholder" className="w-52" />
      </div>
      {!readonly && (
        <div className="flex justify-evenly w-full p-2">
          <button type="submit" name="intent" value="edit">
            <FaEdit role="button" aria-label="edit" className="cursor-pointer" />
          </button>
          <button type="submit" name="intent" value="copy">
            <FaCopy role="button" aria-label="copy" className="cursor-pointer" />
          </button>
          <button type="button" name="intent" value="delete" onClick={() => onDelete && onDelete(profile)}>
            <MdDelete role="button" aria-label="delete" className="cursor-pointer" />
          </button>
          <button type="submit" name="intent" value="download">
            <FiDownload role="button" aria-label="download" className="cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
};
export default TProfilePanel;
