import { Outlet, useCatch } from '@remix-run/react';

const Categories = () => {
  return (
    <div>
      <h1>Categories</h1>
      <Outlet />
      <p>Lets make it together</p>
    </div>
  );
};

export default Categories;

// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <div>
//       <h1>Error</h1>
//       <p>{error.message}</p>
//       <p>The stack trace is:</p>
//       <pre>{error.stack}</pre>
//     </div>
//   );
// }
