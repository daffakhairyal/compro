// Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between p-3">
        <div className="text-lg font-bold">Brand</div>
        <div className='flex space-x-6'>
          <a href="" target='_blank'>Home</a>
          <a href="" target='_blank'>About</a>
          <a href="" target='_blank'>Products</a>
          <a href="" target='_blank'>Contacts</a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
