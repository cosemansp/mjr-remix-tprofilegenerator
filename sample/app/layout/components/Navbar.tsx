import { FaFolder, FaBluetooth, FaProductHunt, FaHome } from 'react-icons/fa';
import NavbarLink from './NavbarLink';

const Navbar = () => {
  return (
    <nav className="h-full w-52 border-r-2 border-gray-200 bg-white">
      <ul className="flex flex-col gap-4 border-b-2 border-gray-200 px-6 py-4">
        <li>
          <NavbarLink to="/" icon={<FaHome />}>
            Home
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/about" icon={<FaProductHunt />}>
            About
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/products" icon={<FaProductHunt />}>
            Products
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/categories" icon={<FaFolder />}>
            Categories
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/other" icon={<FaBluetooth />}>
            Other
          </NavbarLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
