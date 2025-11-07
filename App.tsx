
import React, { useState, useCallback } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/AudioPhile';
import ProductPage from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import { products } from './data/products';
import { ConvexProvider } from "convex/react";
import convex from "./lib/convex";

type Page = 'home' | 'category' | 'product' | 'checkout';
type PageParams = { category?: string; productSlug?: string };

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [pageParams, setPageParams] = useState<PageParams>({});

    const navigateTo = useCallback((page: Page, params: PageParams = {}) => {
        setCurrentPage(page);
        setPageParams(params);
        window.scrollTo(0, 0);
    }, []);

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'category':
                if (pageParams.category) {
                    return <CategoryPage category={pageParams.category} navigateTo={navigateTo} />;
                }
                return <HomePage navigateTo={navigateTo} />;
            case 'product':
                const product = products.find(p => p.slug === pageParams.productSlug);
                if (product) {
                    return <ProductPage product={product} navigateTo={navigateTo} />;
                }
                return <HomePage navigateTo={navigateTo} />;
            case 'checkout':
                return <CheckoutPage navigateTo={navigateTo} />;
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };
    
    const pageKey = `${currentPage}-${JSON.stringify(pageParams)}`;

    return (
        <ConvexProvider client={convex}>
            <CartProvider>
                <div className="bg-brand-gray-light min-h-screen flex flex-col">
                    <Header navigateTo={navigateTo} />
                    <main className="flex-grow">
                        <div key={pageKey} className="page-transition">{renderPage()}</div>
                    </main>
                    <Footer navigateTo={navigateTo} />
                </div>
            </CartProvider>
        </ConvexProvider>
    );
};

export default App;
