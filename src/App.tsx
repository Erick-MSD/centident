import React, { useState, useEffect, useMemo } from 'react';
import { Product, ProductCategory, CartItem } from './types';
import { DENTAL_PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryCarousel } from './components/CategoryCarousel';
import { ProductCatalog } from './components/ProductCatalog';
import { CategoryPage } from './components/CategoryPage';
import { TestimonialsSection } from './components/TestimonialsSection';
import { QuoteFormSection } from './components/QuoteFormSection';
import { FeaturesBanner } from './components/FeaturesBanner';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WhatsAppFloatButton } from './components/WhatsAppFloatButton';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CART_STORAGE_KEY = 'centident_cart_items_v1';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentView, setCurrentView] = useState<'home' | 'category'>('home');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('instrumental');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    showToast(`"${product.name}" agregado al carrito (+${quantity})`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateToCategory = (category: ProductCategory) => {
    setActiveCategory(category);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('catalogo');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  const scrollToQuote = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setTimeout(() => {
      const el = document.getElementById('cotizacion');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  // Count products by category
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      todos: DENTAL_PRODUCTS.length,
      instrumental: 0,
      restauracion: 0,
      'orto-endo': 0,
      bioseguridad: 0,
      equipos: 0,
      desechables: 0,
    };

    DENTAL_PRODUCTS.forEach((prod) => {
      if (counts[prod.category] !== undefined) {
        counts[prod.category]++;
      }
    });

    return counts;
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 selection:bg-[#cee0ed] selection:text-[#173d6d]">
      
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onGoHome={handleBackToHome}
      />

      {/* Dynamic Animated View Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* 1. Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroSection
                  onExploreCatalog={scrollToCatalog}
                  onOpenQuote={scrollToQuote}
                />
              </motion.div>

              {/* 2. Interactive Product Collection Circular Carousel (without "Todos") */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <CategoryCarousel
                  onSelectCategory={handleNavigateToCategory}
                  categoryCounts={categoryCounts}
                />
              </motion.div>

              {/* 3. Product Catalog (Home view: Ofertas Especiales & Más Vendidos) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCatalog
                  products={DENTAL_PRODUCTS}
                  selectedCategory="todos"
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  cartItems={cartItems}
                  onAddToCart={(product) => handleAddToCart(product, 1)}
                  onQuickView={(product) => setQuickViewProduct(product)}
                  onSelectCategory={(cat) => {
                    if (cat !== 'todos') {
                      handleNavigateToCategory(cat);
                    }
                  }}
                />
              </motion.div>

              {/* 4. Testimonials Section (Doctors & Patients) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialsSection />
              </motion.div>

              {/* 5. Custom Quote Form to WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <QuoteFormSection cartItems={cartItems} />
              </motion.div>

              {/* 6. Features, Quality Standards & FAQs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturesBanner />
              </motion.div>
            </motion.div>
          ) : (
            /* DEDICATED CATEGORY PAGE */
            <motion.div
              key={`category-view-${activeCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <CategoryPage
                category={activeCategory}
                products={DENTAL_PRODUCTS}
                cartItems={cartItems}
                onAddToCart={(product) => handleAddToCart(product, 1)}
                onQuickView={(product) => setQuickViewProduct(product)}
                onBackToHome={handleBackToHome}
                onSelectCategory={handleNavigateToCategory}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Actions: WhatsApp Button & Mobile Action Bar */}
      <WhatsAppFloatButton
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Slide-over Cart Drawer with WhatsApp Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToCatalog={scrollToCatalog}
      />

      {/* Product Quick View Modal with Fluid Spring Animations */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Subtle Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#173d6d] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-[#cee0ed]/40"
          >
            <div className="w-5 h-5 rounded-full bg-[#f18641] flex items-center justify-center text-white">
              <Check className="w-3.5 h-3.5" />
            </div>
            <span>{toastMessage}</span>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 text-[#f18641] underline hover:text-white transition-colors cursor-pointer"
            >
              Ver Carrito
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
