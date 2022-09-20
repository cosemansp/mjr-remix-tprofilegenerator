import React from 'react';

const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between bg-neutral px-6 py-4 text-neutral-content">
      <div className="flex items-center gap-2">
        <label htmlFor="my-drawer-3" className="btn btn-ghost btn-square lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <img src="/logo-small.svg" alt="Euricom Logo" className="w-10" />
        <h3>Remix Sampler</h3>
      </div>
    </header>
  );
};

export default Header;
