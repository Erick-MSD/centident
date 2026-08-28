import React, { useState } from 'react';
import { MessageCircle, ShoppingCart, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppFloatButtonProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const WhatsAppFloatButton: React.FC<WhatsAppFloatButtonProps> = ({
  cartItems,
  onOpenCart,
}) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleFloatingClick = () => {
    const text = `Hola Centident, estoy navegando en su página web y deseo consultar disponibilidad de suministros odontológicos.`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Desktop & Tablet Floating WhatsApp Bubble */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col items-end gap-2">
        {showTooltip && (
          <div className="relative bg-white text-slate-800 text-xs px-3 py-1.5 rounded-lg shadow-md border border-[#cee0ed] flex items-center gap-2 max-w-xs animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-700 text-[11px]">
              ¿Deseas cotizar o asesoría clínica?
            </span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <button
          id="floating-whatsapp-trigger-btn"
          onClick={handleFloatingClick}
          className="relative w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer group border-2 border-white"
          aria-label="Abrir WhatsApp Centident"
        >
          <MessageCircle className="w-6 h-6 fill-white/20" />
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#f18641] border-2 border-white" />
        </button>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Optimized for fast mobile checkout) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#cee0ed] p-2 px-3 shadow-lg flex items-center justify-between gap-2">
        {/* Cart Quick Summary */}
        <button
          id="mobile-bottom-cart-btn"
          onClick={onOpenCart}
          className="flex items-center gap-2 text-left shrink-0 bg-slate-100 hover:bg-slate-200 p-1.5 px-2.5 rounded-lg border border-[#cee0ed] transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4 text-[#173d6d]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#f18641] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <div>
            <span className="block text-[9px] text-slate-500 font-semibold leading-none">
              {totalItemsCount > 0 ? 'En Carrito' : 'Carrito'}
            </span>
            <span className="text-xs font-bold text-[#173d6d]">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </button>

        {/* WhatsApp Checkout / Hotline Button */}
        <button
          id="mobile-bottom-whatsapp-btn"
          onClick={totalItemsCount > 0 ? onOpenCart : handleFloatingClick}
          className="flex-1 py-2 px-3 rounded-lg bg-[#f18641] text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wide"
        >
          <MessageCircle className="w-4 h-4 text-white shrink-0" />
          <span className="truncate">
            {totalItemsCount > 0 ? 'Finalizar por WhatsApp' : 'Cotizar por WhatsApp'}
          </span>
        </button>
      </div>
    </>
  );
};
