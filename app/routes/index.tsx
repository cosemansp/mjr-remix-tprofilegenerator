import { useLoaderData } from "@remix-run/react";
import { getDb } from "../server/db.server";

export const loader = async () => {
  console.log(">>>>>>");
  const data = {
    profiles: await getDb().tProfiles.find({}).toArray(),
  };
  return data;
};

export default function Index() {
  const { profiles } = useLoaderData();
  return (
    <div>
      <h1 className="text-xl">Welcome to Remix</h1>
      <button className="btn btn-primary">click me</button>
      <code>
        <pre>{JSON.stringify(profiles)}</pre>
      </code>
    </div>
  );
}
