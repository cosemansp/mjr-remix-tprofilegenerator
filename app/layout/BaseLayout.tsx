/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

type Props = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: Props) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Header />
        <div className="flex grow">
          <div className="sm:hidden lg:block">
            <Navbar />
          </div>
          <div className="grow bg-gray-50">{children}</div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay" />
        <Navbar />
      </div>
    </div>
  );
};

export default BaseLayout;
