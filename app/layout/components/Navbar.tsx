import React from 'react';
import { FaUser, FaUserFriends, FaInfoCircle, FaHeart } from 'react-icons/fa';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  return (
    <nav className="h-full w-52 border-r-2 border-gray-200 bg-white">
      <div className="border-b-2 border-gray-200 py-4 px-6 text-center">
        <img
          src="https://mkantwerpen.be/wp-content/uploads/2020/01/placeholder.png"
          alt="profile"
          className="mx-auto mb-6 w-20 rounded-full"
        />
        <p>Peter Cosemans</p>
      </div>
      <ul className="flex flex-col gap-4 border-b-2 border-gray-200 px-6 py-10">
        <li>
          <NavbarLink text="My T-Shapes" to="my-t-shapes" icon={<FaUser />} />
        </li>
        <li>
          <NavbarLink text="Other T-Shapes" to="other-t-shapes" icon={<FaUserFriends />} />
        </li>
      </ul>
      <ul className="flex flex-col gap-4 px-6 py-10">
        <li>
          <NavbarLink text="About" to="about" icon={<FaInfoCircle />} />
        </li>
        <li>
          <NavbarLink text="Health Check" to="health-check" icon={<FaHeart />} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
