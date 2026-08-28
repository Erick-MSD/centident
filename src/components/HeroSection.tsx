import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  Zap,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { CentidentLogo } from './CentidentLogo';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenQuote: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenQuote,
}) => {
  const handleQuickWhatsApp = () => {
    const text = `Hola equipo Centident, deseo información general sobre suministros odontológicos y catálogo de precios para mi clínica.`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-white border-b border-[#cee0ed]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#cee0ed]">
        
        {/* Left Column: High Density Typography & Value Proposition */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 bg-slate-50/70">
          <div className="space-y-4">
            {/* High Density Pill Badge */}
            <span className="inline-block px-3 py-1 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-widest rounded">
              Insumos Profesionales & Odontología
            </span>

            {/* High Density Headline with Helvetica Neue LT Pro 56 Italic */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173d6d] tracking-tight leading-[1.08]">
              Elevando el <span className="text-[#f18641]">Estándar</span> de su Clínica Dental.
            </h1>

            {/* Subtitle with Helvetica Neue LT Pro 36 Thin Italic */}
            <p className="font-subheading text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Distribución certificada de instrumental quirúrgico, resinas nanohíbridas, ortodoncia y turbinas LED de alta gama con entrega inmediata 24-48h.
            </p>

            {/* Feature Points Check List in High Density */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-[#cee0ed]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f18641] shrink-0" />
                <span>Despacho express a clínicas (24-48h)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-[#cee0ed]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f18641] shrink-0" />
                <span>Descuentos automáticos por volumen</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-[#cee0ed]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f18641] shrink-0" />
                <span>Garantía de autoclave 134°C</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white p-2 rounded-lg border border-[#cee0ed]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#f18641] shrink-0" />
                <span>Factura electrónica & Registro sanitario</span>
              </div>
            </div>
          </div>

          {/* Action CTAs in High Density */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreCatalog}
                className="px-5 py-2.5 bg-[#173d6d] hover:bg-[#0e2645] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs tracking-wide uppercase"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                id="hero-whatsapp-quote-btn"
                onClick={handleQuickWhatsApp}
                className="px-5 py-2.5 bg-[#f18641] hover:bg-[#e0732d] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs tracking-wide uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Solicitar por WhatsApp</span>
              </button>

              <button
                onClick={onOpenQuote}
                className="px-4 py-2.5 bg-[#cee0ed] hover:bg-[#173d6d] text-[#173d6d] hover:text-white rounded-lg text-xs font-bold transition-all border border-[#cee0ed] cursor-pointer"
              >
                Cotizador
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              ¿Compras institucionales o licitación? Finalice vía WhatsApp para precios corporativos.
            </p>
          </div>
        </div>

        {/* Right Column: High Density Card and Testimonial Feature Box */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
          
          {/* Top Brand Highlight Box */}
          <div className="border border-[#cee0ed] rounded-2xl p-5 bg-[#f8fafc] space-y-4">
            <div className="flex items-center justify-between border-b border-[#cee0ed] pb-3">
              <CentidentLogo size="md" />
              <span className="px-2.5 py-0.5 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase rounded">
                Certificación ISO 13485
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-2.5 rounded-lg border border-[#cee0ed]">
                <Award className="w-4 h-4 text-[#173d6d] mx-auto mb-1" />
                <span className="block text-xs font-bold text-[#173d6d]">Acero AISI</span>
                <span className="text-[9px] text-slate-500">Alemán 420</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#cee0ed]">
                <Truck className="w-4 h-4 text-[#f18641] mx-auto mb-1" />
                <span className="block text-xs font-bold text-[#f18641]">24-48h</span>
                <span className="text-[9px] text-slate-500">Despacho Express</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#cee0ed]">
                <HeartHandshake className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="block text-xs font-bold text-emerald-700">100%</span>
                <span className="text-[9px] text-slate-500">Garantía Directa</span>
              </div>
            </div>
          </div>

          {/* High Density Quote / Testimonial Box matching Design HTML */}
          <div className="bg-white p-5 rounded-2xl border border-[#cee0ed] shadow-2xs space-y-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#f18641]" />
              <div className="w-2 h-2 rounded-full bg-[#f18641]" />
              <div className="w-2 h-2 rounded-full bg-[#f18641]" />
              <div className="w-2 h-2 rounded-full bg-[#f18641]" />
              <div className="w-2 h-2 rounded-full bg-[#f18641]" />
            </div>
            <p className="text-xs italic text-slate-700 leading-relaxed">
              "La calidad de los composites, limas rotatorias y la rapidez de entrega han optimizado los tiempos quirúrgicos en nuestra clínica. Totalmente confiables."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-[#cee0ed]/60">
              <div className="w-9 h-9 rounded-full bg-[#cee0ed] flex items-center justify-center font-extrabold text-xs text-[#173d6d] shrink-0">
                DR
              </div>
              <div>
                <p className="text-xs font-bold text-[#173d6d]">Dr. Ricardo Méndez</p>
                <p className="text-[10px] text-slate-500 font-medium">Especialista en Rehabilitación Oral • OdontoArt</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
