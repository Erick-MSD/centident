import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  MessageCircle, 
  Truck, 
  Building2, 
  MapPin, 
  User, 
  FileText, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Tag
} from 'lucide-react';
import { CentidentLogo } from './CentidentLogo';
import { DEFAULT_WHATSAPP_NUMBER, formatCartToWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onNavigateToCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToCatalog,
}) => {
  const [doctorName, setDoctorName] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [city, setCity] = useState('');
  const [deliveryType, setDeliveryType] = useState('Envío Express a Clínica (24-48 hrs)');
  const [notes, setNotes] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  if (!isOpen) return null;

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Volume discount calculation: if > 5 items or > $150, apply 5-10% discount
  let volumeDiscount = 0;
  if (totalItemsCount >= 10 || subtotal >= 300) {
    volumeDiscount = subtotal * 0.10; // 10%
  } else if (totalItemsCount >= 5 || subtotal >= 150) {
    volumeDiscount = subtotal * 0.05; // 5%
  }

  const finalTotal = Math.max(0, subtotal - volumeDiscount);

  const handleCheckoutToWhatsApp = () => {
    const message = formatCartToWhatsAppMessage(
      cartItems,
      {
        name: doctorName.trim() || undefined,
        clinic: clinicName.trim() || undefined,
        city: city.trim() || undefined,
        notes: notes.trim() || undefined,
        deliveryType,
      },
      volumeDiscount
    );

    const url = getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#cee0ed]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Drawer Header */}
        <div className="p-3.5 sm:p-4 bg-[#173d6d] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <CentidentLogo variant="icon-only" size="sm" />
            <div>
              <h2 className="font-heading font-bold text-sm sm:text-base flex items-center gap-2">
                <span>Tu Carrito Odontológico</span>
                <span className="bg-[#f18641] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {totalItemsCount}
                </span>
              </h2>
              <p className="text-[10px] text-[#cee0ed]">
                Suministros listos para cotizar y comprar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                className="text-[11px] text-slate-300 hover:text-rose-300 transition-colors p-1 cursor-pointer"
                title="Vaciar carrito"
              >
                Vaciar
              </button>
            )}
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Free Shipping / Discount Progress Bar */}
        <div className="bg-[#cee0ed]/40 px-3.5 py-1.5 text-xs border-b border-[#cee0ed]">
          {subtotal < 150 ? (
            <p className="text-[#173d6d] font-semibold text-[11px] flex items-center justify-between">
              <span>Agrega <strong>${(150 - subtotal).toFixed(2)} USD</strong> más para 5% de descuento clínico</span>
              <Tag className="w-3 h-3 text-[#f18641]" />
            </p>
          ) : (
            <p className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#f18641]" />
              ¡Felicidades! Has desbloqueado descuento especial por volumen institucional.
            </p>
          )}
        </div>

        {/* Items List Content Area */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
          {cartItems.length > 0 ? (
            <>
              {/* Product items loop */}
              <div className="space-y-2.5">
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 bg-[#f8fafc] rounded-xl border border-[#cee0ed] flex items-center gap-2.5 relative group"
                  >
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 rounded-lg object-cover border border-[#cee0ed] shrink-0 bg-white"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-start justify-between gap-1 pr-6">
                        <h4 className="font-heading font-bold text-xs text-slate-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-0.5 cursor-pointer absolute top-2 right-2"
                          title="Eliminar producto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-500">
                        {item.product.presentation} • <span className="font-mono">{item.product.code}</span>
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-extrabold text-[#173d6d]">
                          ${(item.product.price * item.quantity).toFixed(2)} USD
                          <span className="text-[10px] font-normal text-slate-500 ml-1">
                            (${item.product.price.toFixed(2)} c/u)
                          </span>
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#cee0ed] rounded-md bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-1 hover:bg-[#cee0ed]/40 text-slate-600 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-[#173d6d]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-1 hover:bg-[#cee0ed]/40 text-slate-600 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Quick Info for Checkout */}
              <div className="pt-1">
                <button
                  onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                  className="w-full text-left text-xs font-bold text-[#173d6d] hover:text-[#f18641] flex items-center justify-between p-2.5 rounded-lg bg-[#cee0ed]/25 border border-[#cee0ed] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#f18641]" />
                    {showCheckoutForm ? 'Ocultar datos de clínica / entrega' : 'Agregar datos de clínica para factura (Opcional)'}
                  </span>
                  <span className="text-[10px] font-semibold">{showCheckoutForm ? '▲' : '▼'}</span>
                </button>

                {showCheckoutForm && (
                  <div className="p-3 bg-white rounded-lg border border-[#cee0ed] mt-2 space-y-2 text-xs animate-fade-in">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">
                        Doctor(a) o Contacto:
                      </label>
                      <input
                        type="text"
                        value={doctorName}
                        onChange={(e) => setDoctorName(e.target.value)}
                        placeholder="Ej. Dr. Carlos Silva"
                        className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-[#cee0ed] focus:border-[#173d6d] outline-hidden text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">
                        Nombre de la Clínica / Consultorio:
                      </label>
                      <input
                        type="text"
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="Ej. Clínica Dental Sonrisas"
                        className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-[#cee0ed] focus:border-[#173d6d] outline-hidden text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">
                        Ciudad / Dirección de Despacho:
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ej. Bogotá, Chapinero / CDMX, Del Valle"
                        className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-[#cee0ed] focus:border-[#173d6d] outline-hidden text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">
                        Tipo de Entrega:
                      </label>
                      <select
                        value={deliveryType}
                        onChange={(e) => setDeliveryType(e.target.value)}
                        className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-[#cee0ed] focus:border-[#173d6d] outline-hidden text-xs"
                      >
                        <option value="Envío Express a Clínica (24-48 hrs)">Envío Express a Clínica (24-48 hrs)</option>
                        <option value="Despacho Urgente Mismo Día">Despacho Urgente Mismo Día</option>
                        <option value="Retiro en Sucursal Central">Retiro en Sede Distribuidora</option>
                        <option value="Envío Nacional Transportadora">Envío Nacional por Transportadora</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-0.5">
                        Notas / Indicaciones Especiales:
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Ej. Requiero factura electrónica NIT..."
                        className="w-full bg-white px-2.5 py-1.5 rounded-lg border border-[#cee0ed] focus:border-[#173d6d] outline-hidden text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 bg-[#cee0ed] text-[#173d6d] rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-heading font-bold text-sm text-slate-800">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Explora nuestro catálogo de instrumental, resinas, turbinas y bioseguridad para equipar tu consultorio.
                </p>
              </div>
              <button
                id="cart-empty-go-to-catalog-btn"
                onClick={() => {
                  onClose();
                  onNavigateToCatalog();
                }}
                className="px-4 py-2 bg-[#173d6d] text-white text-xs font-bold rounded-lg hover:bg-[#0e2645] transition-colors cursor-pointer"
              >
                Explorar Catálogo
              </button>
            </div>
          )}
        </div>

        {/* Cart Drawer Footer & WhatsApp Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-3.5 sm:p-4 bg-white border-t border-[#cee0ed] space-y-3 shadow-sm">
            
            {/* Totals breakdown */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItemsCount} unidades):</span>
                <span className="font-semibold">${subtotal.toFixed(2)} USD</span>
              </div>

              {volumeDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Descuento por Volumen:
                  </span>
                  <span>-${volumeDiscount.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-1.5 border-t border-[#cee0ed] text-slate-900">
                <span className="font-heading font-bold text-xs sm:text-sm text-[#173d6d]">
                  Total Estimado:
                </span>
                <div className="text-right">
                  <span className="font-heading font-extrabold text-lg sm:text-xl text-[#f18641]">
                    ${finalTotal.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold ml-1">USD</span>
                </div>
              </div>
            </div>

            {/* Main Checkout WhatsApp Action Button */}
            <button
              id="whatsapp-cart-checkout-btn"
              onClick={handleCheckoutToWhatsApp}
              className="w-full py-2.5 px-4 rounded-lg bg-[#f18641] hover:bg-[#e0732d] text-white font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Finalizar Pedido por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Compra 100% segura
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#173d6d]" />
                Confirmación Inmediata
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
