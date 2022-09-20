import React from 'react';
import { NavLink } from '@remix-run/react';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  to: string;
  icon: React.ReactNode;
};

const NavbarLink = ({ to, icon, children }: Props) => {
  const activeStyles = `bg-neutral text-neutral-content`;

  return (
    <NavLink to={to} prefetch="intent">
      {({ isActive }) => (
        <div
          className={clsx(
            'flex items-center gap-2 rounded-lg p-2 hover:bg-accent hover:text-accent-content',
            isActive ? activeStyles : '',
          )}
        >
          {icon && icon}
          <span>{children}</span>
        </div>
      )}
    </NavLink>
  );
};

export default NavbarLink;
