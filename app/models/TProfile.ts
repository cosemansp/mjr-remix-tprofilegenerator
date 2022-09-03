import type { ObjectId } from "mongodb";

export interface TProfile {
  _id: ObjectId;
  owner: {
    id: string;
    name: string;
  };
  date: Date;
  kind: "toBe" | "asIs";
  generalisms: {
    id: number;
    title: string;
    percentage: number;
  }[];
  specialisms: {
    id: number;
    title: string;
    percentage: number;
  }[];
  createdAt: Date;
  modifiedAt: Date;
}
