import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  ShieldCheck, 
  Check, 
  Tag, 
  Plus, 
  Minus,
  Truck,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEFAULT_WHATSAPP_NUMBER, formatSingleProductWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleAdd = () => {
    if (!product) return;
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 700);
  };

  const handleWhatsAppCheckout = () => {
    if (!product) return;
    const text = formatSingleProductWhatsAppMessage(product, quantity);
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Modal Container - Expanded size on desktop (max-w-4xl to max-w-5xl) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ 
              type: 'spring', 
              damping: 26, 
              stiffness: 320,
              mass: 0.8
            }}
            className="relative w-full max-w-lg md:max-w-4xl xl:max-w-5xl bg-white rounded-2xl shadow-2xl border border-[#cee0ed] overflow-hidden flex flex-col md:flex-row my-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              id="close-quickview-btn"
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-lg bg-white/90 hover:bg-slate-100 text-slate-600 flex items-center justify-center shadow-xs border border-[#cee0ed] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Product Image & Badges */}
            <div className="md:w-5/12 lg:w-1/2 relative bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#cee0ed]">
              <div className="relative w-full aspect-square max-w-xs sm:max-w-sm md:max-w-md rounded-2xl overflow-hidden shadow-xs border border-[#cee0ed] bg-white flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-out"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#173d6d] text-white text-[11px] font-bold px-2.5 py-1 rounded uppercase tracking-wider shadow-2xs font-brand-primary">
                    {product.badge}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-3 right-3 bg-[#f18641] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Quality Guarantee Badges below image on desktop */}
              <div className="hidden md:grid grid-cols-2 gap-3 w-full max-w-md mt-4 pt-3 border-t border-[#cee0ed]">
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">Certificación Sanitaria & Grado Quirúrgico</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-xs">
                  <Truck className="w-4 h-4 text-[#173d6d] shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">Despacho Inmediato a Todo el País</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Details & Actions */}
            <div className="md:w-7/12 lg:w-1/2 p-4 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4 overflow-y-auto max-h-[88vh]">
              
              <div className="space-y-3">
                {/* Category & Brand Header */}
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-[#cee0ed] text-[#173d6d] font-bold px-2.5 py-1 rounded text-[11px] uppercase tracking-wide">
                    {product.categoryName}
                  </span>
                  <span className="font-mono text-slate-500 text-xs font-semibold">Ref / SKU: {product.code}</span>
                </div>

                {/* Title in Helvetica Neue LT Pro 56 Italic */}
                <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold text-[#173d6d] leading-tight">
                  {product.name}
                </h2>

                {/* Subtitle / Brand info in Helvetica Neue LT Pro 36 Thin Italic */}
                <p className="font-subheading text-xs sm:text-sm text-slate-500">
                  Línea profesional fabricada por <span className="font-bold text-[#173d6d] not-italic">{product.brand}</span> para odontología de alta precisión.
                </p>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-slate-700 text-xs">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs font-subheading">({product.reviewCount} clínicas y doctores verificados)</span>
                </div>

                {/* Pricing Section */}
                <div className="flex items-baseline gap-2.5 py-1 bg-slate-50 px-3.5 rounded-xl border border-[#cee0ed]/60">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#f18641]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-slate-600 font-semibold">USD / {product.presentation}</span>
                  <span className="ml-auto text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    En Stock ({product.stockCount} unids)
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {product.fullDescription}
                </p>

                {/* Technical Specs Table */}
                <div className="bg-[#cee0ed]/20 rounded-xl p-3 sm:p-3.5 border border-[#cee0ed] space-y-1.5 text-xs">
                  <span className="font-heading font-bold text-[#173d6d] text-xs block mb-1">
                    Especificaciones Técnicas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-1 border-b border-[#cee0ed]/50 text-xs">
                        <span className="text-slate-600 font-medium font-subheading">{key}:</span>
                        <span className="text-slate-800 font-bold text-right ml-2">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bulk Discounts Notice */}
                {product.bulkDiscounts && (
                  <div className="bg-amber-50/90 rounded-xl p-3 border border-amber-200 text-xs space-y-1.5">
                    <span className="font-heading font-bold text-amber-900 text-xs flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#f18641]" />
                      Descuento por Volumen Institucional:
                    </span>
                    <div className="flex flex-wrap gap-2 text-[11px] text-amber-800">
                      {product.bulkDiscounts.map((b, i) => (
                        <span key={i} className="bg-white px-2 py-0.5 rounded-md border border-amber-200 font-bold shadow-2xs">
                          {b.minQty}+ unids = <span className="text-[#f18641]">{b.discountPercent}% OFF</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Actions: Quantity + Add to Cart + WhatsApp */}
              <div className="space-y-3 pt-3 border-t border-[#cee0ed]">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">Cantidad:</span>
                  <div className="flex items-center border border-[#cee0ed] rounded-lg bg-white shadow-2xs">
                    <button
                      onClick={handleDecrement}
                      className="w-8 h-8 hover:bg-[#cee0ed]/40 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-[#173d6d]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      className="w-8 h-8 hover:bg-[#cee0ed]/40 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Add to cart */}
                  <button
                    id="modal-add-to-cart-btn"
                    onClick={handleAdd}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wide ${
                      addedAnimation
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#173d6d] hover:bg-[#0e2645] text-white shadow-md'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Agregado al Carrito!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 text-[#cee0ed]" />
                        <span>Agregar (${(product.price * quantity).toFixed(2)} USD)</span>
                      </>
                    )}
                  </button>

                  {/* Buy Direct via WhatsApp */}
                  <button
                    id="modal-whatsapp-direct-btn"
                    onClick={handleWhatsAppCheckout}
                    className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#f18641] hover:bg-[#e0732d] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Comprar en WhatsApp</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 font-subheading">
                  Despacho express a consultorios y clínicas • Factura legal con registro sanitario oficial
                </p>

              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
