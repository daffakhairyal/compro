// Navbar.js
import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io"; // Icon untuk tombol close

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={` p-4 w-full z-50 transition-all duration-300 ${isFixed ? 'fixed top-0 bg-white text-black bg-opacity-90' : 'absolute text-white'}`}>
      {/* Desktop Navbar */}
      <div className="container mx-auto hidden md:flex justify-between p-3">
        <div className="text-lg font-bold">Brand</div>
        <div className='flex space-x-6'>
          <a href="" target='_blank'>Home</a>
          <a href="" target='_blank'>About</a>
          <a href="" target='_blank'>Products</a>
          <a href="" target='_blank'>Contacts</a>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="container mx-auto flex justify-between p-3 md:hidden">
        <div className="text-lg font-bold">Brand</div>
        <div className='flex space-x-6'>
          <button onClick={toggleMenu} className="z-30 relative">
            {isOpen ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Curtain Menu with Slide Down Animation */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-20 flex flex-col items-center justify-center space-y-8 text-xl transition-transform transform ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        } duration-500 ease-in-out`}
      >
        <a href="" className="text-white" onClick={toggleMenu}>Home</a>
        <a href="" className="text-white" onClick={toggleMenu}>About</a>
        <a href="" className="text-white" onClick={toggleMenu}>Products</a>
        <a href="" className="text-white" onClick={toggleMenu}>Contacts</a>
      </div>
    </nav>
  );
};

export default Navbar;
