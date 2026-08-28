import React from 'react';
import { Product } from '../types';
import { 
  ShoppingCart, 
  MessageCircle, 
  Star, 
  Eye, 
  Check
} from 'lucide-react';
import { motion } from 'motion/react';
import { DEFAULT_WHATSAPP_NUMBER, formatSingleProductWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isInCart = false,
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = formatSingleProductWhatsAppMessage(product, 1);
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group bg-white rounded-xl border border-[#cee0ed] hover:border-[#173d6d] shadow-2xs hover:shadow-md transition-shadow flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Container matching High Density Frame */}
      <div className="relative w-full pt-[68%] bg-[#f8fafc] border-b border-[#cee0ed] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-106 transition-transform duration-300 ease-out"
          loading="lazy"
        />

        {/* Badges on Top Left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 rounded bg-[#173d6d] text-white text-[10px] font-bold tracking-wider uppercase shadow-2xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-1.5 py-0.5 rounded bg-[#f18641] text-white text-[10px] font-bold shadow-2xs">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Code Tag on Top Right */}
        <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-white/95 text-slate-600 text-[10px] font-mono font-bold border border-[#cee0ed] shadow-2xs">
          {product.code}
        </span>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none bg-slate-900/10 backdrop-blur-[1px]">
          <span className="bg-white text-[#173d6d] text-[11px] font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#cee0ed]">
            <Eye className="w-3.5 h-3.5 text-[#f18641]" />
            Ver Ficha Técnica
          </span>
        </div>
      </div>

      {/* Product Content Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        
        <div className="space-y-1">
          {/* Brand & Rating Header */}
          <div className="flex items-center justify-between text-[11px]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {product.brand}
            </p>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-heading font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#173d6d] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Presentation Tag */}
          <p className="text-[11px] text-slate-500 line-clamp-1">
            <span className="font-medium text-slate-600">Pres:</span> {product.presentation}
          </p>
        </div>

        {/* Pricing & Stock status */}
        <div className="pt-2 border-t border-[#cee0ed] space-y-2">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#f18641]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Stock: {product.stockCount}
            </span>
          </div>

          {/* Action Buttons matching High Density theme */}
          <div className="grid grid-cols-2 gap-1.5 pt-0.5">
            {/* Add to Cart Button */}
            <button
              id={`add-to-cart-btn-${product.id}`}
              onClick={handleAdd}
              className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                isInCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#cee0ed] text-[#173d6d] hover:bg-[#173d6d] hover:text-white'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>En Carrito</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Añadir</span>
                </>
              )}
            </button>

            {/* Quick WhatsApp Single Buy */}
            <button
              id={`whatsapp-buy-btn-${product.id}`}
              onClick={handleDirectWhatsApp}
              className="w-full py-1.5 px-2 rounded-lg text-xs font-bold bg-[#f18641] hover:bg-[#e0732d] text-white flex items-center justify-center gap-1 transition-all cursor-pointer shadow-2xs"
              title="Pedir o cotizar este insumo directo a WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
