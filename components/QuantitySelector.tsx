
import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  size?: 'large' | 'small';
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange, size = 'large' }) => {
  const handleDecrement = () => {
    onQuantityChange(Math.max(0, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const padding = size === 'large' ? 'px-5 py-3.5' : 'px-4 py-2';
  const textSize = size === 'large' ? 'text-sm' : 'text-xs';

  return (
    <div className="bg-brand-gray flex items-center">
      <button onClick={handleDecrement} className={`${padding} text-black text-opacity-25 hover:text-brand-orange font-bold`}>-</button>
      <span className={`${padding} font-bold w-10 text-center ${textSize}`}>{quantity}</span>
      <button onClick={handleIncrement} className={`${padding} text-black text-opacity-25 hover:text-brand-orange font-bold`}>+</button>
    </div>
  );
};

export default QuantitySelector;
