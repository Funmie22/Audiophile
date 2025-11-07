import React from 'react';
import { products } from '../data/products';
import { NavigateFunction, Product } from '../types';
import Button from '../components/Button';

interface AudioPhilePageProps {
  category: string;
  navigateTo: NavigateFunction;
}

const ProductItem: React.FC<{ product: Product, navigateTo: NavigateFunction, index: number }> = ({ product, navigateTo, index }) => {
  const isEven = index % 2 === 1;
  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-32 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
      <div className="lg:w-1/2 bg-brand-gray rounded-lg flex items-center justify-center p-8">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 768px)" srcSet={product.image.tablet} />
          <img src={product.image.mobile} alt={product.name} className="w-full rounded-lg" />
        </picture>
      </div>
      <div className="lg:w-1/2 text-center lg:text-left">
        {product.new && <p className="text-brand-orange tracking-widest-lg uppercase mb-4">New Product</p>}
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider-lg leading-tight">{product.name}</h2>
        <p className="text-black text-opacity-50 my-6">{product.description}</p>
        <Button onClick={() => navigateTo('product', { productSlug: product.slug })}>See Product</Button>
      </div>
    </div>
  );
};

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

const AudioPhilePage: React.FC<AudioPhilePageProps> = ({ category, navigateTo }) => {
  const categoryProducts = products.filter(p => p.category === category);

  return (
    <div>
      <header className="bg-brand-black text-white py-16 md:py-24">
        <h1 className="text-center text-4xl font-bold uppercase tracking-wider-lg">{category}</h1>
      </header>
      <main className="container mx-auto px-6 lg:px-8 py-16 lg:py-32 space-y-24">
        {categoryProducts.map((product, index) => (
          <ProductItem key={product.id} product={product} navigateTo={navigateTo} index={index} />
        ))}
      </main>

      <section className="pt-20 lg:pt-40 pb-10">
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4 lg:gap-8">
          <CategoryLink title="Headphones" image="../images/assets/shared/desktop/image-category-thumbnail-headphones.png" onClick={() => navigateTo('category', { category: 'headphones' })} />
          <CategoryLink title="Speakers" image="../images/assets/shared/desktop/image-category-thumbnail-speakers.png" onClick={() => navigateTo('category', { category: 'speakers' })} />
          <CategoryLink title="Earphones" image="../images/assets/shared/desktop/image-category-thumbnail-earphones.png" onClick={() => navigateTo('category', { category: 'earphones' })} />
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 text-center lg:text-left">
          <div className="lg:w-1/2 rounded-lg overflow-hidden">
            <picture>
              <source media="(min-width: 1024px)" srcSet="https://raw.githubusercontent.com/murtazajoo/audiophile-ecommerce/main/public/assets/shared/desktop/image-best-gear.jpg" />
              <source media="(min-width: 768px)" srcSet="https://raw.githubusercontent.com/murtazajoo/audiophile-ecommerce/main/public/assets/shared/tablet/image-best-gear.jpg" />
              <img src="https://raw.githubusercontent.com/murtazajoo/audiophile-ecommerce/main/public/assets/shared/mobile/image-best-gear.jpg" alt="Man with headphones" className="w-full h-full object-cover" />
            </picture>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider-lg max-w-md mx-auto lg:mx-0">Bringing you the <span className="text-brand-orange">best</span> audio gear</h2>
            <p className="text-black text-opacity-50 mt-8 max-w-md mx-auto lg:mx-0">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AudioPhilePage;
