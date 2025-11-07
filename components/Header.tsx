import React, { useState, useEffect } from 'react';
import { NavigateFunction } from '../types';
import CartModal from './CartPopup';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  navigateTo: NavigateFunction;
}

const NavLinks: React.FC<{ navigateTo: NavigateFunction; onLinkClick?: () => void }> = ({ navigateTo, onLinkClick }) => (
  <>
    <a onClick={() => { navigateTo('home'); onLinkClick?.(); }} className="hover:text-brand-orange transition duration-300 tracking-wider-lg text-sm font-bold cursor-pointer">HOME</a>
    <a onClick={() => { navigateTo('category', { category: 'headphones' }); onLinkClick?.(); }} className="hover:text-brand-orange transition duration-300 tracking-wider-lg text-sm font-bold cursor-pointer">HEADPHONES</a>
    <a onClick={() => { navigateTo('category', { category: 'speakers' }); onLinkClick?.(); }} className="hover:text-brand-orange transition duration-300 tracking-wider-lg text-sm font-bold cursor-pointer">SPEAKERS</a>
    <a onClick={() => { navigateTo('category', { category: 'earphones' }); onLinkClick?.(); }} className="hover:text-brand-orange transition duration-300 tracking-wider-lg text-sm font-bold cursor-pointer">EARPHONES</a>
  </>
);

const Header: React.FC<HeaderProps> = ({ navigateTo }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItemCount } = useCart();

  useEffect(() => {
    const isOverlayOpen = isMenuOpen || isCartOpen;
    document.body.style.overflow = isOverlayOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen, isCartOpen]);

  return (
    <>
      <header className="bg-brand-black text-white relative z-30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Left section */}
            <div className="flex items-center">
              <button className="md:hidden mr-6" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                  <g fill="#FFF" fillRule="evenodd">
                    <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z" />
                  </g>
                </svg>
              </button>

              <h1 className="text-2xl font-bold tracking-wider cursor-pointer" onClick={() => navigateTo('home')}>
                audiophile
              </h1>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              <NavLinks navigateTo={navigateTo} />
            </nav>

            {/* Cart Icon */}
            <div className="relative cursor-pointer ml-4" onClick={() => setIsCartOpen(true)}>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.625 19.5C9.41424 19.5 10.0625 18.8518 10.0625 18.0625C10.0625 17.2732 9.41424 16.625 8.625 16.625C7.83576 16.625 7.1875 17.2732 7.1875 18.0625C7.1875 18.8518 7.83576 19.5 8.625 19.5Z" stroke="white" strokeWidth="1.5" />
                <path d="M19.5625 19.5C20.3518 19.5 21 18.8518 21 18.0625C21 17.2732 20.3518 16.625 19.5625 16.625C18.7732 16.625 18.125 17.2732 18.125 18.0625C18.125 18.8518 18.7732 19.5 19.5625 19.5Z" stroke="white" strokeWidth="1.5" />
                <path d="M1 1H4.53125L7.54109 13.1091C7.62507 13.4984 7.85215 13.844 8.17585 14.0759C8.49955 14.3078 8.89738 14.4087 9.29422 14.3594H18.8594C19.2562 14.4087 19.654 14.3078 19.9777 14.0759C20.3014 13.844 20.5285 13.4984 20.6125 13.1094L22.25 5.9375H5.96875" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* --- Bottom Divider Line with Left/Right Margin --- */}
        <div className="mx-6 lg:mx-8 border-b border-white border-opacity-20"></div>
      </header>

      {/* Cart Modal */}
      {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} navigateTo={navigateTo} />}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div
            className="bg-brand-white text-brand-black p-6 py-24 absolute top-24 left-0 right-0 rounded-b-lg overflow-y-scroll h-full"
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      )}
    </>
  );
};

export default Header;
