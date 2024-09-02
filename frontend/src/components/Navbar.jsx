// Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between">
        <div className="text-lg font-bold">Brand</div>
        <div>
          <ul className="flex space-x-4">
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
