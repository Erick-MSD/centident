import React, { useState } from 'react';
import { QuoteFormData, CartItem } from '../types';
import { 
  MessageCircle, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER, formatCustomQuoteToWhatsAppMessage, getWhatsAppUrl } from '../utils/whatsapp';

interface QuoteFormSectionProps {
  cartItems: CartItem[];
}

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({ cartItems }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    doctorName: '',
    clinicName: '',
    whatsapp: '',
    city: '',
    email: '',
    orderType: 'cotizacion_volumen',
    taxId: '',
    notes: '',
    isUrgent: false,
  });

  const [includeCart, setIncludeCart] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof QuoteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.doctorName.trim()) {
      setErrorMessage('Por favor ingresa el nombre del profesional o doctor.');
      return;
    }
    if (!formData.whatsapp.trim()) {
      setErrorMessage('Por favor ingresa tu número de WhatsApp para contacto.');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMessage('Por favor especifica la ciudad o municipio para el cálculo de despacho.');
      return;
    }

    const itemsToSend = includeCart ? cartItems : [];
    const message = formatCustomQuoteToWhatsAppMessage(formData, itemsToSend);
    const url = getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, message);

    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="cotizacion" className="py-10 bg-slate-50/70 border-b border-[#cee0ed] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header matching High Density */}
        <div className="max-w-3xl mb-8 space-y-2">
          <span className="inline-block px-3 py-1 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-widest rounded">
            Cotizador para Clínicas & Odontólogos
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#173d6d] tracking-tight">
            Cotizaciones Personalizadas con Envío Directo a WhatsApp
          </h2>

          <p className="font-subheading text-xs sm:text-sm text-slate-600">
            Completa tus requerimientos de instrumental, biomateriales o equipamiento. Al enviar, serás redirigido directamente a WhatsApp con tu cotización estructurada para atención inmediata de nuestros asesores técnicos.
          </p>
        </div>

        {/* Main Grid: Form on Left, Value Pillars on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-[#cee0ed] shadow-2xs space-y-4">
            
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Doctor & Clinic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre del Doctor(a) *
                  </label>
                  <div className="relative">
                    <input
                      id="quote-doctor-name"
                      type="text"
                      required
                      value={formData.doctorName}
                      onChange={(e) => handleChange('doctorName', e.target.value)}
                      placeholder="Ej. Dra. Marcela Ramos"
                      className="w-full bg-white text-slate-800 text-xs rounded-lg pl-8 pr-3 py-2 border border-[#cee0ed] focus:border-[#173d6d] focus:ring-1 focus:ring-[#173d6d] outline-hidden"
                    />
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nombre de la Clínica / Consultorio
                  </label>
                  <div className="relative">
                    <input
                      id="quote-clinic-name"
                      type="text"
                      value={formData.clinicName}
                      onChange={(e) => handleChange('clinicName', e.target.value)}
                      placeholder="Ej. Dental Especialistas SAS"
                      className="w-full bg-white text-slate-800 text-xs rounded-lg pl-8 pr-3 py-2 border border-[#cee0ed] focus:border-[#173d6d] focus:ring-1 focus:ring-[#173d6d] outline-hidden"
                    />
                    <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Row 2: WhatsApp & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp de Contacto *
                  </label>
                  <div className="relative">
                    <input
                      id="quote-whatsapp"
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => handleChange('whatsapp', e.target.value)}
                      placeholder="Ej. +52 55 1234 5678"
                      className="w-full bg-white text-slate-800 text-xs rounded-lg pl-8 pr-3 py-2 border border-[#cee0ed] focus:border-[#173d6d] focus:ring-1 focus:ring-[#173d6d] outline-hidden"
                    />
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ciudad / Dirección de Envío *
                  </label>
                  <div className="relative">
                    <input
                      id="quote-city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      placeholder="Ej. Guadalajara, Jalisco"
                      className="w-full bg-white text-slate-800 text-xs rounded-lg pl-8 pr-3 py-2 border border-[#cee0ed] focus:border-[#173d6d] focus:ring-1 focus:ring-[#173d6d] outline-hidden"
                    />
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Row 3: Order Type & Tax ID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tipo de Requerimiento
                  </label>
                  <select
                    id="quote-order-type"
                    value={formData.orderType}
                    onChange={(e) => handleChange('orderType', e.target.value as any)}
                    className="w-full bg-white text-slate-800 text-xs rounded-lg px-3 py-2 border border-[#cee0ed] focus:border-[#173d6d] outline-hidden cursor-pointer"
                  >
                    <option value="cotizacion_volumen">📦 Cotización por Volumen / Clínica</option>
                    <option value="compra_inmediata">⚡ Despacho Inmediato</option>
                    <option value="equipamiento_clinica">🏥 Equipamiento Integral de Consultorio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    NIT / RUC / RFC (Opcional)
                  </label>
                  <div className="relative">
                    <input
                      id="quote-tax-id"
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => handleChange('taxId', e.target.value)}
                      placeholder="Ej. 900.123.456-7"
                      className="w-full bg-white text-slate-800 text-xs rounded-lg pl-8 pr-3 py-2 border border-[#cee0ed] focus:border-[#173d6d] outline-hidden"
                    />
                    <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Notes / Special requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detalle de Insumos o Marcas Requeridas
                </label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Ej. Requiero 5 cajas de guantes de nitrilo M, 2 kits de resina nanohíbrida A2 y 1 pieza de mano LED..."
                  className="w-full bg-white text-slate-800 text-xs rounded-lg p-2.5 border border-[#cee0ed] focus:border-[#173d6d] outline-hidden resize-none"
                />
              </div>

              {/* Include Cart Items Checkbox */}
              {cartItems.length > 0 && (
                <div className="p-2.5 bg-[#cee0ed]/40 rounded-lg border border-[#cee0ed] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="quote-include-cart-check"
                      checked={includeCart}
                      onChange={(e) => setIncludeCart(e.target.checked)}
                      className="w-4 h-4 text-[#173d6d] rounded border-slate-300 focus:ring-[#173d6d]"
                    />
                    <label htmlFor="quote-include-cart-check" className="text-xs font-bold text-[#173d6d] cursor-pointer">
                      Adjuntar los {cartItems.length} productos de mi Carrito
                    </label>
                  </div>
                  <span className="text-[10px] font-bold text-[#f18641]">
                    ({cartItems.reduce((a, b) => a + b.quantity, 0)} piezas)
                  </span>
                </div>
              )}

              {/* Urgent Checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="quote-is-urgent-check"
                  checked={formData.isUrgent}
                  onChange={(e) => handleChange('isUrgent', e.target.checked)}
                  className="w-4 h-4 text-[#f18641] rounded border-[#cee0ed] focus:ring-[#f18641]"
                />
                <label htmlFor="quote-is-urgent-check" className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1">
                  <span>🚨 Marcar como <strong>Pedido Urgente</strong> (Despacho prioritario 24h)</span>
                </label>
              </div>

              {/* Submit to WhatsApp Button */}
              <button
                type="submit"
                id="submit-quote-whatsapp-btn"
                className="w-full py-3 px-5 rounded-lg bg-[#f18641] hover:bg-[#e0732d] text-white font-bold text-xs sm:text-sm shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Generar Cotización y Enviar a WhatsApp</span>
              </button>

              {submitted && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>¡Redirigiendo a WhatsApp! Si no abrió automáticamente, pulsa el botón nuevamente.</span>
                </div>
              )}

            </form>
          </div>

          {/* Right Column: Trust and Service Assurances */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-[#173d6d] text-white rounded-2xl p-5 shadow-2xs border border-[#cee0ed]/40 space-y-3">
              <div className="flex items-center gap-2 border-b border-[#cee0ed]/20 pb-2">
                <ShieldCheck className="w-4 h-4 text-[#f18641]" />
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                  Atención Directa & Rápida
                </h3>
              </div>
              <p className="text-xs text-[#cee0ed] leading-relaxed">
                Tus datos son procesados directamente por un especialista en suministros odontológicos para calcular disponibilidad, lotes y descuentos institucionales.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Asesores disponibles en línea</span>
              </div>
            </div>

            {/* Why Quote with Centident */}
            <div className="bg-white rounded-2xl p-4 border border-[#cee0ed] space-y-2.5 shadow-2xs">
              <h3 className="font-heading font-bold text-[#173d6d] text-xs uppercase tracking-wider">
                Garantías Centident Oficial:
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#f18641] font-bold">✓</span>
                  <span><strong>Asesoría Técnica Gratuita:</strong> Compatibilidad instrumental y conicidades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f18641] font-bold">✓</span>
                  <span><strong>Descuentos Escalonados:</strong> Precios preferenciales por volumen clínico.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f18641] font-bold">✓</span>
                  <span><strong>Trazabilidad & Lotes:</strong> Registro sanitario oficial en cada entrega.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f18641] font-bold">✓</span>
                  <span><strong>Despacho Seguro:</strong> Empaque con protección térmica y sellos de seguridad.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
