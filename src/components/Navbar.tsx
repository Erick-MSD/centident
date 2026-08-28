import React, { useState, useEffect } from 'react';
import { CentidentLogo } from './CentidentLogo';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  PhoneCall, 
  MessageCircle, 
  Sparkles,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { CartItem } from '../types';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onGoHome?: () => void;
  onSelectCategory?: (category: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  searchTerm,
  onSearchChange,
  onGoHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalItemsCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Categorías', href: '#categorias' },
    { name: 'Testimonios', href: '#testimonios' },
    { name: 'Cotizador', href: '#cotizacion' },
    { name: 'Garantía & FAQ', href: '#garantia' },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onGoHome) {
      e.preventDefault();
      onGoHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavLinkClick = (href: string) => {
    if (onGoHome) {
      onGoHome();
    }
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleWhatsAppQuickChat = () => {
    const text = `Hola Centident, estoy visitando su página web y deseo consultar sobre suministros odontológicos disponibles.`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#173d6d] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-[#cee0ed]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#f18641]" />
              <span className="hidden sm:inline">Distribuidor Autorizado de</span> Suministros Odontológicos Certificados
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-[#cee0ed]">
              <Clock className="w-3.5 h-3.5 text-[#f18641]" />
              Lun - Sáb (8:00am - 7:00pm)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="header-top-whatsapp-btn"
              onClick={handleWhatsAppQuickChat}
              className="flex items-center gap-1.5 text-[#cee0ed] hover:text-[#f18641] transition-colors font-medium cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Directo</span>
            </button>
            <span className="text-[#cee0ed]/40 hidden sm:inline">|</span>
            <span className="text-[#cee0ed] hidden sm:inline font-semibold text-[11px]">
              Envíos 24/48h a Clínicas
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-2.5 border-b border-[#cee0ed]'
            : 'bg-white py-3 border-b border-[#cee0ed]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a
            href="#top"
            id="brand-logo-link"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group focus:outline-hidden cursor-pointer"
          >
            <CentidentLogo size="md" />
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                id="header-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar instrumental, resinas, turbinas, fresas..."
                className="w-full bg-[#f8fafc] hover:bg-white focus:bg-white text-slate-800 text-xs rounded-lg pl-9 pr-8 py-2 border border-[#cee0ed] focus:border-[#173d6d] focus:ring-1 focus:ring-[#173d6d] transition-all outline-hidden font-medium"
              />
              <Search className="w-4 h-4 text-[#173d6d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchTerm && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavLinkClick(link.href);
                }}
                className="text-[#173d6d] hover:text-[#f18641] transition-colors py-1 relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f18641] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action Buttons: WhatsApp & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              id="mobile-search-toggle"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-[#cee0ed]/30 border border-[#cee0ed] transition-colors"
              aria-label="Buscar productos"
            >
              <Search className="w-4 h-4 text-[#173d6d]" />
            </button>

            {/* Quick Quote Hotline Button */}
            <button
              id="quick-whatsapp-quote-btn"
              onClick={handleWhatsAppQuickChat}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#f18641] hover:bg-[#e0732d] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-all hover:shadow-xs cursor-pointer tracking-wide"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Cotizar</span>
            </button>

            {/* Cart Trigger Button in High Density Pill */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#cee0ed] hover:bg-[#173d6d] text-[#173d6d] hover:text-white px-3 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer border border-[#cee0ed]"
              aria-label="Ver Carrito de Compras"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>CARRITO ({totalItemsCount})</span>
              {totalItemsCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="bg-[#f18641] text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full"
                >
                  ${cartSubtotal.toFixed(0)}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#173d6d] hover:bg-[#cee0ed]/30 border border-[#cee0ed] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="lg:hidden px-4 pt-2 pb-3 bg-white border-t border-[#cee0ed]">
            <div className="relative">
              <input
                id="mobile-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar instrumental, resinas, turbinas..."
                className="w-full bg-[#f8fafc] text-slate-800 text-xs rounded-lg pl-9 pr-8 py-2 border border-[#cee0ed] focus:border-[#173d6d] outline-hidden"
                autoFocus
              />
              <Search className="w-4 h-4 text-[#173d6d] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchTerm && (
                <button
                  id="clear-mobile-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-1 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#cee0ed] px-4 py-4 space-y-3 shadow-md">
            <div className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    handleNavLinkClick(link.href);
                  }}
                  className="px-3 py-2 text-[#173d6d] hover:text-[#f18641] hover:bg-[#cee0ed]/30 rounded-lg transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#cee0ed] flex flex-col gap-2">
              <button
                id="mobile-menu-whatsapp-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppQuickChat();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#f18641] text-white py-2 rounded-lg font-bold text-xs shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Asesoría por WhatsApp</span>
              </button>

              <button
                id="mobile-menu-cart-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#cee0ed] text-[#173d6d] py-2 rounded-lg font-bold text-xs border border-[#cee0ed]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Ver Carrito ({totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'})</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
