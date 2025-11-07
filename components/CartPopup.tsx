import React from "react";
import { useCart } from "../context/CartContext";
import Button from "./Button";
import QuantitySelector from "./QuantitySelector";
import { NavigateFunction } from "../types";

interface CartPopupProps {
  setIsCartOpen: (isOpen: boolean) => void;
  navigateTo: NavigateFunction;
}

const CartPopup: React.FC<CartPopupProps> = ({ setIsCartOpen, navigateTo }) => {
  const { cart, clearCart, total, cartItemCount, updateQuantity } = useCart();

  const handleCheckout = () => {
    if (cartItemCount > 0) {
      setIsCartOpen(false);
      navigateTo("checkout");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 z-40"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="container mx-auto px-6">
        <div
          className="absolute top-28 right-6 md:right-10 lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-full lg:max-w-4xl flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-lg">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-bold text-lg">Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-bold tracking-wider-lg uppercase">
                    Cart ({cartItemCount})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="underline text-black text-opacity-50 hover:text-brand-orange"
                  >
                    Remove all
                  </button>
                </div>

                <div className="space-y-6 max-h-60 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-brand-gray rounded-lg flex items-center justify-center mr-4">
                          <img
                            src={item.image.mobile}
                            alt={item.name}
                            className="w-10"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{item.shortName}</p>
                          <p className="text-black text-opacity-50 text-sm font-bold">
                            $ {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(newQuantity) =>
                          updateQuantity(item.id, newQuantity)
                        }
                        size="small"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-8 mb-6">
                  <p className="text-black text-opacity-50 uppercase">Total</p>
                  <p className="text-lg font-bold">
                    $ {total.toLocaleString()}
                  </p>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  disabled={cartItemCount === 0}
                >
                  Checkout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
