import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import BaseLayout from './layout/BaseLayout';
import styles from './styles/app.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen flex-col">
          <BaseLayout>
            <div className="p-3 prose">
              <Outlet />
            </div>
          </BaseLayout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="m-4">
        <h1 className="text-2xl">Something went wrong!</h1>
        <p>{error.message}</p>
        <Scripts />
      </body>
    </html>
  );
}

// export function CatchBoundary() {
//   const caught = useCatch();
//   return (
//     <html>
//       <head>
//         <title>Oops!</title>
//         <Meta />
//         <Links />
//       </head>
//       <body className="prose">
//         <h1>Oops</h1>
//         <p>
//           {caught.status}: {caught.statusText}
//         </p>
//         <Scripts />
//       </body>
//     </html>
//   );
// }
