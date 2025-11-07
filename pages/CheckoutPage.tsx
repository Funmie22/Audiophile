import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import ConfirmationModal from '../components/CheckOutModal';
import { NavigateFunction } from '../types';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';

interface FormData {
  name: string; email: string; phone: string;
  address: string; zip: string; city: string; country: string;
  paymentMethod: 'e-money' | 'cash';
  eMoneyNumber?: string; eMoneyPin?: string;
}

// Move InputField outside of CheckoutPage
const InputField: React.FC<{
  name: keyof FormData;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, label, placeholder, type = 'text', className, value, error, onChange }) => (
  <div className={className}>
    <div className="flex justify-between">
      <label htmlFor={name} className={`font-bold text-xs mb-2 block ${error ? 'text-red-500' : ''}`}>{label}</label>
      {error && <span className="font-medium text-xs text-red-500">{error}</span>}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
      className={`w-full border rounded-lg px-6 py-4 focus:outline-none focus:ring-1 focus:ring-brand-orange ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
  </div>
);

const CheckoutPage: React.FC<{ navigateTo: NavigateFunction }> = ({ navigateTo }) => {
  const { cart, total, cartItemCount } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '',
    address: '', zip: '', city: '', country: '',
    paymentMethod: 'e-money'
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const createOrder = useMutation(api.orders.createOrder);

  const shipping = 50;
  const vat = total * 0.2;
  const grandTotal = total + shipping;

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = "Can't be empty";
    if (!formData.email) newErrors.email = "Can't be empty";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Wrong format";
    if (!formData.phone) newErrors.phone = "Can't be empty";
    if (!formData.address) newErrors.address = "Can't be empty";
    if (!formData.zip) newErrors.zip = "Can't be empty";
    if (!formData.city) newErrors.city = "Can't be empty";
    if (!formData.country) newErrors.country = "Can't be empty";
    if (formData.paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber) newErrors.eMoneyNumber = "Can't be empty";
      if (!formData.eMoneyPin) newErrors.eMoneyPin = "Can't be empty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItemCount === 0) return;

    if (validate()) {
      setIsLoading(true);
      try {
        const orderData = {
          ...formData,
          items: cart.map(item => ({
            id: item.id,
            shortName: item.shortName,
            price: item.price,
            quantity: item.quantity,
            image: item.image.mobile,
          })),
          total,
          shipping,
          vat: parseFloat(vat.toFixed(2)),
          grandTotal,
        };
        await createOrder(orderData);
        setShowConfirmation(true);
      } catch (error) {
        console.error("Failed to create order:", error);
        alert("There was an issue placing your order. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-brand-gray">
      {showConfirmation && <ConfirmationModal navigateTo={navigateTo} />}
      <div className="container mx-auto px-6 lg:px-8 py-8 md:py-16">
        <button onClick={() => navigateTo('category', { category: 'headphones' })} className="text-black text-opacity-50 hover:text-brand-orange mb-8">Go Back</button>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg p-6 md:p-8 w-full lg:w-2/3">
            <h1 className="text-3xl font-bold uppercase mb-8 tracking-wider-lg">Checkout</h1>

            <fieldset className="mb-8">
              <legend className="text-brand-orange uppercase font-bold text-sm tracking-wide mb-4">Billing Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="name"
                  label="Name"
                  placeholder="Alexei Ward"
                  value={formData.name}
                  error={errors.name}
                  onChange={handleChange}
                />
                <InputField
                  name="email"
                  label="Email Address"
                  placeholder="alexei@mail.com"
                  type="email"
                  value={formData.email}
                  error={errors.email}
                  onChange={handleChange}
                />
                <InputField
                  name="phone"
                  label="Phone Number"
                  placeholder="+1 202-555-0136"
                  type="tel"
                  value={formData.phone}
                  error={errors.phone}
                  onChange={handleChange}
                />
              </div>
            </fieldset>

            <fieldset className="mb-8">
              <legend className="text-brand-orange uppercase font-bold text-sm tracking-wide mb-4">Shipping Info</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="address"
                  label="Address"
                  placeholder="1137 Williams Avenue"
                  className="md:col-span-2"
                  value={formData.address}
                  error={errors.address}
                  onChange={handleChange}
                />
                <InputField
                  name="zip"
                  label="ZIP Code"
                  placeholder="10001"
                  value={formData.zip}
                  error={errors.zip}
                  onChange={handleChange}
                />
                <InputField
                  name="city"
                  label="City"
                  placeholder="New York"
                  value={formData.city}
                  error={errors.city}
                  onChange={handleChange}
                />
                <InputField
                  name="country"
                  label="Country"
                  placeholder="United States"
                  value={formData.country}
                  error={errors.country}
                  onChange={handleChange}
                />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-brand-orange uppercase font-bold text-sm tracking-wide mb-4">Payment Details</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="font-bold text-xs md:col-start-1">Payment Method</label>
                <div className="space-y-4 md:col-start-2">
                  <label className={`w-full flex items-center border rounded-lg px-6 py-4 cursor-pointer font-bold ${formData.paymentMethod === 'e-money' ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="e-money" checked={formData.paymentMethod === 'e-money'} onChange={handleChange} className="mr-4 w-5 h-5 accent-brand-orange" />
                    e-Money
                  </label>
                  <label className={`w-full flex items-center border rounded-lg px-6 py-4 cursor-pointer font-bold ${formData.paymentMethod === 'cash' ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-gray-300'}`}>
                    <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleChange} className="mr-4 w-5 h-5 accent-brand-orange" />
                    Cash on Delivery
                  </label>
                </div>
              </div>
              {formData.paymentMethod === 'e-money' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <InputField
                    name="eMoneyNumber"
                    label="e-Money Number"
                    placeholder="238521993"
                    type="number"
                    value={formData.eMoneyNumber || ''}
                    error={errors.eMoneyNumber}
                    onChange={handleChange}
                  />
                  <InputField
                    name="eMoneyPin"
                    label="e-Money PIN"
                    placeholder="6891"
                    type="number"
                    value={formData.eMoneyPin || ''}
                    error={errors.eMoneyPin}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-8 mt-6">
                  <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg"><path d="M46.594 8.438H42.28c-.448 0-.869.213-1.134.574l-2.695 3.6a.858.858 0 01-.702.342h-3.45c-.448 0-.869.213-1.134.574l-2.695 3.6a.858.858 0 01-.702.342h-3.45c-.448 0-.869.213-1.134.574l-2.695 3.6a.858.858 0 01-.702.342h-3.45c-.448 0-.869.213-1.134.574l-2.695 3.6a.858.858 0 01-.702.342h-3.45a.858.858 0 01-.702-.342l-2.695-3.6a.858.858 0 00-1.134-.574H1.406a.858.858 0 00-.858.858v22.286c0 .474.384.858.858.858h45.188a.858.858 0 00.858-.858V9.296a.858.858 0 00-.858-.858zM24 28.5a4.286 4.286 0 110-8.572 4.286 4.286 0 010 8.572z" fill="#D87D4A" fillRule="nonzero" /></svg>
                  <p className="text-black text-opacity-50">The 'Cash on Delivery' option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
                </div>
              )}
            </fieldset>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg p-8 w-full lg:w-1/3">
            <h2 className="text-lg font-bold uppercase mb-6 tracking-wider-lg">Summary</h2>
            {cartItemCount > 0 ? (
              <>
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={item.image.mobile} alt={item.name} className="w-16 h-16 object-contain rounded-lg mr-4" />
                        <div>
                          <p className="font-bold">{item.shortName}</p>
                          <p className="text-black text-opacity-50 text-sm font-bold">$ {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-black text-opacity-50 font-bold">x{item.quantity}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-8">
                  <div className="flex justify-between"><p className="text-black text-opacity-50 uppercase">Total</p><p className="font-bold text-lg">$ {total.toLocaleString()}</p></div>
                  <div className="flex justify-between"><p className="text-black text-opacity-50 uppercase">Shipping</p><p className="font-bold text-lg">$ {shipping.toLocaleString()}</p></div>
                  <div className="flex justify-between"><p className="text-black text-opacity-50 uppercase">VAT (Included)</p><p className="font-bold text-lg">$ {vat.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p></div>
                  <div className="flex justify-between mt-4"><p className="text-black text-opacity-50 uppercase">Grand Total</p><p className="font-bold text-lg text-brand-orange">$ {grandTotal.toLocaleString()}</p></div>
                </div>
                <Button type="submit" className="w-full mt-8" disabled={isLoading || cartItemCount === 0} aria-busy={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Continue & Pay'}
                </Button>
              </>
            ) : (
              <p className="text-center py-10">Your cart is empty.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;