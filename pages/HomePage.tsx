
import React from 'react';
import { NavigateFunction } from '../types';
import Button from '../components/Button';

interface HomePageProps {
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

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-black">
        <div className="container mx-auto">
          <div className="relative text-center lg:text-left h-[600px] lg:h-[730px] flex items-center justify-center lg:justify-start">
            <picture className="absolute inset-0 z-0">
              <source media="(min-width: 1024px)" srcSet="../images/assets/home/desktop/image-hero.jpg" />
              <source media="(min-width: 768px)" srcSet="../images/assets/home/tablet/image-header.jpg" />
              <img src="../images/assets/home/mobile/image-header.jpg" alt="XX99 Mark II Headphones" className="w-full h-full object-cover" />
            </picture>
            <div className="relative z-10 text-white max-w-sm px-6">
              <p className="tracking-widest-lg uppercase text-white text-opacity-50 mb-4">New Product</p>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wider-lg leading-tight mb-6">XX99 Mark II Headphones</h2>
              <p className="text-white text-opacity-75 font-medium mb-8">
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </p>
              <Button onClick={() => navigateTo('product', { productSlug: 'xx99-mark-two-headphones' })}>See Product</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 lg:py-40">
        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4 lg:gap-8">
          <CategoryLink title="Headphones" image="../images/assets/shared/desktop/image-category-thumbnail-headphones.png" onClick={() => navigateTo('category', { category: 'headphones' })} />
          <CategoryLink title="Speakers" image="../images/assets/shared/desktop/image-category-thumbnail-speakers.png" onClick={() => navigateTo('category', { category: 'speakers' })} />
          <CategoryLink title="Earphones" image="../images/assets/shared/desktop/image-category-thumbnail-earphones.png" onClick={() => navigateTo('category', { category: 'earphones' })} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 lg:px-8 space-y-6 md:space-y-8 pb-20">
        {/* ZX9 Speaker */}
        <div className="bg-brand-orange rounded-lg p-8 md:p-12 lg:py-24 lg:px-16 flex flex-col lg:flex-row items-center overflow-hidden bg-no-repeat bg-[url('../images/assets/home/desktop/pattern-circles.svg')] bg-cover lg:bg-auto bg-center lg:bg-left-bottom">
          <div className="w-1/2 lg:w-2/5 mb-8 lg:mb-0 lg:self-end">
            <img src="../images/assets/home/desktop/image-speaker-zx9.png" alt="ZX9 Speaker" className="w-full" />
          </div>
          <div className="text-center lg:text-left lg:ml-24 max-w-sm">
            <h3 className="text-4xl md:text-5xl text-white font-bold uppercase tracking-wider-lg leading-tight">ZX9 Speaker</h3>
            <p className="text-white text-opacity-75 my-6">Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <Button variant="black" onClick={() => navigateTo('product', { productSlug: 'zx9-speaker' })}>See Product</Button>
          </div>
        </div>

        {/* ZX7 Speaker */}
        <div className="relative rounded-lg p-6 md:p-16 lg:p-24 flex items-center h-80 bg-cover bg-center">
          <picture className="absolute inset-0 z-0">
            <source media="(min-width: 1024px)" srcSet="../images/assets/home/desktop/image-speaker-zx7.jpg"/>
            <source media="(min-width: 768px)" srcSet="../images/assets/home/tablet/image-speaker-zx7.jpg" />
            <img src="../images/assets/home/mobile/image-speaker-zx7.jpg" alt="ZX7 Speaker" className="w-full h-full object-cover rounded-lg" />
          </picture>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold uppercase tracking-wider-lg mb-8">ZX7 Speaker</h3>
            <Button variant="secondary" onClick={() => navigateTo('product', { productSlug: 'zx7-speaker' })}>See Product</Button>
          </div>
        </div>

        {/* YX1 Earphones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-lg h-52 md:h-80">
            <img src="../images/assets/home/desktop/image-earphones-yx1.jpg" alt="YX1 Earphones" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="bg-brand-gray rounded-lg p-6 md:p-10 lg:p-24 flex flex-col justify-center h-52 md:h-80">
            <h3 className="text-3xl font-bold uppercase tracking-wider-lg mb-8">YX1 Earphones</h3>
            <Button variant="secondary" onClick={() => navigateTo('product', { productSlug: 'yx1-earphones' })}>See Product</Button>
          </div>
        </div>
      </section>

      {/* Audio Gear Section */}
      <section className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 text-center lg:text-left">
          <div className="lg:w-1/2 rounded-lg overflow-hidden">
            <picture>
              {/* <source media="(min-width: 1024px)" srcSet="" />
              <source media="(min-width: 768px)" srcSet="" /> */}
              <img src="../images/assets/man.png" alt="Man with headphones" className="w-full h-full object-cover" />
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

export default HomePage;
