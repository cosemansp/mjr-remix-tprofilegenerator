import { ObjectId } from 'mongodb';
import type { TProfile, TProfileDb } from '~/models/TProfile';
import { getDb } from './db.server';

const tProfileMapper = (source: TProfileDb): TProfile => {
  const { _id, ...obj } = source;
  return {
    ...obj,
    id: _id.toHexString(),
    date: new Date(source.date).toISOString(),
    createdAt: new Date(source.createdAt).toISOString(),
    modifiedAt: new Date(source.modifiedAt).toISOString(),
  };
};

export const getAllTProfileByUser = async (id: string): Promise<TProfile[]> => {
  const tProfiles = await getDb().tProfiles.find({ 'owner.id': id }).toArray();
  return tProfiles.map(tProfileMapper);
};

export const get = async (id: string): Promise<TProfile | null> => {
  const tProfile = await getDb().tProfiles.findOne({ _id: new ObjectId(id) });
  if (!tProfile) {
    return null;
  }
  return tProfileMapper(tProfile);
};

export const getAllTProfileByMe = async (): Promise<TProfile[]> => {
  const query = { 'owner.name': 'Peter Cosemans' };
  const tProfiles = await getDb().tProfiles.find(query).toArray();
  return tProfiles.map(tProfileMapper);
};

export const del = async (id: string): Promise<void> => {
  await getDb().tProfiles.deleteOne({ _id: new ObjectId(id) });
};

export const copy = async (id: string): Promise<void> => {
  const dbProfiles = getDb().tProfiles;
  const tProfile = await dbProfiles.findOne({ _id: new ObjectId(id) });
  if (!tProfile) {
    return;
  }

  const now = new Date();
  dbProfiles.insertOne({
    owner: {
      id: '2dc1c69f-6965-4892-b528-7bd3dc9e4fc2',
      name: 'Peter Cosemans',
    },
    date: now,
    kind: tProfile.kind,
    generalisms: tProfile.generalisms,
    specialisms: tProfile.specialisms,
    createdAt: now,
    modifiedAt: now,
  });
};

export const update = async (profile: TProfile): Promise<void> => {
  const dbProfiles = getDb().tProfiles;
  const now = new Date();
  if (profile.id) {
    const result = await dbProfiles.updateOne(
      { _id: new ObjectId(profile.id) },
      {
        $set: {
          date: new Date(profile.date),
          kind: profile.kind,
          generalisms: profile.generalisms,
          specialisms: profile.specialisms,
          modifiedAt: now,
        },
      },
    );
    console.log('update result', result);
    return;
  }

  const result = dbProfiles.insertOne({
    owner: {
      id: '2dc1c69f-6965-4892-b528-7bd3dc9e4fc2',
      name: 'Peter Cosemans',
    },
    date: new Date(profile.date),
    kind: profile.kind,
    generalisms: profile.generalisms,
    specialisms: profile.specialisms,
    createdAt: now,
    modifiedAt: now,
  });
  console.log('update insert', result);
};

export const getAllAsIs = async (): Promise<TProfile[]> => {
  const pipeline = [
    { $match: { kind: 'asIs' } }, // Stage 1
    {
      $sort: {
        'owner.name': 1,
        date: -1,
      },
    }, // Stage 2
    {
      $group: {
        _id: '$owner.id',
        item: { $first: '$$CURRENT' },
      },
    }, // Stage 3
    { $replaceRoot: { newRoot: '$item' } }, // Stage 4
  ];

  const tProfiles = (await getDb().tProfiles.aggregate(pipeline).toArray()) as TProfileDb[];
  return tProfiles.map(tProfileMapper);
};
