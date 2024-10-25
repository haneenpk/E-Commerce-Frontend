import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#003135] text-white py-4 px-6 flex justify-center items-center">
      <p className="text-center">&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
    </footer>
  );
};

export default Footer;