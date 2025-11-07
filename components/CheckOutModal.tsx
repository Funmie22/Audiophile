
import React from 'react';
import { useCart } from '../context/CartContext';
import Button from './Button';
import { NavigateFunction } from '../types';

interface CheckOutModal {
  navigateTo: NavigateFunction;
}

const CheckOutModal: React.FC<CheckOutModal> = ({ navigateTo }) => {
  const { cart, total, clearCart } = useCart();
  const firstItem = cart[0];
  const grandTotal = total + 50;

  const handleBackHome = () => {
    navigateTo('home');
    clearCart();
  };

  if (!firstItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-8 md:p-12 w-full max-w-md shadow-lg">
        <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mb-6">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.33325 12.3333L10.4226 21.4226C10.9042 21.9042 11.6957 21.9042 12.1773 21.4226L30.6666 2.93325" stroke="white" strokeWidth="4" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider-lg leading-tight mb-4 md:mb-6">THANK YOU<br />FOR YOUR ORDER</h2>
        <p className="text-black text-opacity-50 mb-6 md:mb-8">You will receive an email confirmation shortly.</p>

        <div className="rounded-lg overflow-hidden mb-6 md:mb-8">
          <div className="md:flex">
            <div className="bg-brand-gray p-6 flex-grow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={firstItem.image.mobile} alt={firstItem.name} className="w-12 h-12 object-contain rounded-md mr-4" />
                  <div>
                    <p className="font-bold">{firstItem.shortName}</p>
                    <p className="text-black text-opacity-50 text-sm font-bold">$ {firstItem.price.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-black text-opacity-50 font-bold">x{firstItem.quantity}</p>
              </div>
              {cart.length > 1 && (
                <>
                  <hr className="my-3 border-black border-opacity-10" />
                  <p className="text-center text-xs text-black text-opacity-50 font-bold">and {cart.length - 1} other item(s)</p>
                </>
              )}
            </div>
            <div className="bg-brand-black text-white p-6 md:w-48 flex flex-col justify-center rounded-b-lg md:rounded-r-lg md:rounded-bl-none">
              <p className="text-white text-opacity-50 uppercase text-sm mb-1">Grand Total</p>
              <p className="text-white font-bold text-lg">$ {grandTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Button onClick={handleBackHome} className="w-full">BACK TO HOME</Button>
      </div>
    </div>
  );
};

export default CheckOutModal;
