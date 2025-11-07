
import React, { useState, useEffect } from 'react';
import { Product, NavigateFunction } from '../types';
import Button from '../components/Button';
import QuantitySelector from '../components/QuantitySelector';
import { useCart } from '../context/CartContext';

interface ProductDetail {
  product: Product;
  navigateTo: NavigateFunction;
}

const CategoryLink: React.FC<{ title: string; image: string; onClick: () => void; }> = ({ title, image, onClick }) => (
  <div className="relative bg-brand-gray rounded-lg pt-20 pb-5 flex flex-col items-center group cursor-pointer mt-12" onClick={onClick}>
    <img src={image} alt={title} className="w-32 h-auto absolute -top-14 transform group-hover:scale-110 transition-transform duration-300" />
    <h3 className="font-bold uppercase tracking-wide-lg text-base">{title}</h3>
    <div className="flex items-center mt-3 text-sm text-black text-opacity-50 group-hover:text-brand-orange">
      <span className="mr-2 uppercase font-bold tracking-widest text-xs">Shop</span>
      <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M1.322 1l5 5-5 5" stroke="#D87D4A" strokeWidth="2" fill="none" fillRule="evenodd" /></svg>
    </div>
  </div>
);

const ProductDetail: React.FC<ProductDetail> = ({ product, navigateTo }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  const handleGoBack = () => {
    // A simple way to go back to the previous page in a SPA without a router
    // For a more robust solution, a routing library would be better.
    navigateTo('category', { category: product.category });
  }

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8 md:py-16">
      {showToast && (
        <div className="fixed top-28 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          Added to cart!
        </div>
      )}
      <button onClick={handleGoBack} className="text-black text-opacity-50 hover:text-brand-orange mb-8">Go Back</button>

      {/* Product Details */}
      <section className="flex flex-col md:flex-row items-center gap-8 lg:gap-32 mb-24">
        <div className="md:w-1/2 bg-brand-gray rounded-lg flex items-center justify-center p-8">
          <picture>
            <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
            <source media="(min-width: 768px)" srcSet={product.image.tablet} />
            <img src={product.image.mobile} alt={product.name} className="w-full rounded-lg" />
          </picture>
        </div>
        <div className="md:w-1/2">
          {product.new && <p className="text-brand-orange tracking-widest-lg uppercase mb-4">New Product</p>}
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wider-lg leading-tight">{product.name.replace(' Headphones', '').replace(' Speaker', '').replace(' Earphones', '')}<br />{product.category.slice(0, -1).toUpperCase()}</h1>
          <p className="text-black text-opacity-50 my-6">{product.description}</p>
          <p className="text-xl font-bold tracking-wider-lg mb-8">$ {product.price.toLocaleString()}</p>
          <div className="flex items-center space-x-4">
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            <Button onClick={handleAddToCart} disabled={quantity === 0}>Add to Cart</Button>
          </div>
        </div>
      </section>

      {/* Features & In the Box */}
      <section className="flex flex-col lg:flex-row gap-20 lg:gap-32 mb-24">
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold uppercase mb-6 tracking-wider-lg">Features</h2>
          <p className="text-black text-opacity-50 whitespace-pre-line">{product.features}</p>
        </div>
        <div className="lg:w-1/3 md:flex lg:block">
          <h2 className="text-3xl font-bold uppercase mb-6 tracking-wider-lg md:w-1/2 lg:w-full">In the Box</h2>
          <ul className="space-y-2 md:w-1/2 lg:w-full">
            {product.includes.map((item, index) => (
              <li key={index} className="flex">
                <span className="text-brand-orange font-bold mr-6">{item.quantity}x</span>
                <span className="text-black text-opacity-50">{item.item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="grid md:grid-cols-5 md:grid-rows-2 gap-5 mb-24">
        <div className="rounded-lg overflow-hidden md:row-span-1 md:col-span-2">
          <picture>
            <source media="(min-width: 1024px)" srcSet={product.gallery.first.desktop} />
            <source media="(min-width: 768px)" srcSet={product.gallery.first.tablet} />
            <img src={product.gallery.first.mobile} alt="Gallery image 1" className="w-full h-full object-cover" />
          </picture>
        </div>
        <div className="rounded-lg overflow-hidden md:row-span-2 md:col-span-3">
          <picture>
            <source media="(min-width: 1024px)" srcSet={product.gallery.third.desktop} />
            <source media="(min-width: 768px)" srcSet={product.gallery.third.tablet} />
            <img src={product.gallery.third.mobile} alt="Gallery image 3" className="w-full h-full object-cover" />
          </picture>
        </div>
        <div className="rounded-lg overflow-hidden md:row-span-1 md:col-span-2">
          <picture>
            <source media="(min-width: 1024px)" srcSet={product.gallery.second.desktop} />
            <source media="(min-width: 768px)" srcSet={product.gallery.second.tablet} />
            <img src={product.gallery.second.mobile} alt="Gallery image 2" className="w-full h-full object-cover" />
          </picture>
        </div>
      </section>

      {/* You May Also Like */}
      <section>
        <h2 className="text-3xl font-bold uppercase mb-12 text-center tracking-wider-lg">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {product.others.map(other => (
            <div key={other.slug} className="flex flex-col items-center">
              <div className="bg-brand-gray rounded-lg w-full mb-8 overflow-hidden">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={other.image.desktop} />
                  <source media="(min-width: 768px)" srcSet={other.image.tablet} />
                  <img src={other.image.mobile} alt={other.name} className="w-full" />
                </picture>
              </div>
              <h3 className="text-2xl font-bold uppercase mb-6 tracking-wider-lg">{other.name}</h3>
              <Button onClick={() => navigateTo('product', { productSlug: other.slug })}>See Product</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-20 lg:pt-40 pb-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4 lg:gap-8">
          <CategoryLink title="Headphones" image="../images/assets/shared/desktop/image-category-thumbnail-headphones.png" onClick={() => navigateTo('category', { category: 'headphones' })} />
          <CategoryLink title="Speakers" image="../images/assets/shared/desktop/image-category-thumbnail-speakers.png" onClick={() => navigateTo('category', { category: 'speakers' })} />
          <CategoryLink title="Earphones" image="../images/assets/shared/desktop/image-category-thumbnail-earphones.png" onClick={() => navigateTo('category', { category: 'earphones' })} />
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
