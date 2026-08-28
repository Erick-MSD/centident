import React from 'react';
import { CentidentLogo } from './CentidentLogo';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  CreditCard, 
  Heart,
  Truck,
  FileText
} from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const handleWhatsAppClick = () => {
    const text = `Hola Centident, me gustaría recibir más información sobre sus servicios de distribución odontológica.`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#173d6d] text-white pt-10 pb-20 sm:pb-10 border-t border-[#0e2645]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-3">
            <CentidentLogo textColor="light" size="md" />
            <p className="text-xs text-[#cee0ed] leading-relaxed max-w-sm">
              Distribuidora líder de suministros, instrumental quirúrgico y equipamiento de alta precisión para odontólogos, especialistas y clínicas.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                id="footer-whatsapp-btn"
                onClick={handleWhatsAppClick}
                className="px-3.5 py-1.5 rounded-lg bg-[#f18641] hover:bg-[#e0732d] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wide"
              >
                <MessageCircle className="w-3.5 h-3.5 text-white" />
                <span>Atención en WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Suministros Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white border-b border-[#225390] pb-1.5">
              Líneas de Suministros
            </h4>
            <ul className="space-y-1.5 text-xs text-[#cee0ed]">
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Instrumental & Cirugía Oral</a></li>
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Resinas Nanohíbridas & Adhesivos</a></li>
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Ortodoncia, Brackets & Arcos</a></li>
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Limas Rotatorias NiTi Gold</a></li>
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Bioseguridad & Guantes de Nitrilo</a></li>
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Turbinas LED & Lámparas</a></li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white border-b border-[#225390] pb-1.5">
              Navegación
            </h4>
            <ul className="space-y-1.5 text-xs text-[#cee0ed]">
              <li><a href="#top" className="hover:text-[#f18641] transition-colors">Inicio</a></li>
              <li><a href="#catalogo" className="hover:text-[#f18641] transition-colors">Catálogo de Productos</a></li>
              <li><a href="#categorias" className="hover:text-[#f18641] transition-colors">Categorías</a></li>
              <li><a href="#testimonios" className="hover:text-[#f18641] transition-colors">Testimonios Clínicos</a></li>
              <li><a href="#cotizacion" className="hover:text-[#f18641] transition-colors">Cotizador Personalizado</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white border-b border-[#225390] pb-1.5">
              Contacto & Soporte
            </h4>
            <ul className="space-y-2 text-xs text-[#cee0ed]">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#f18641] shrink-0 mt-0.5" />
                <span>Lunes a Sábado: 8:00 am - 7:00 pm</span>
              </li>
              <li className="flex items-start gap-2">
                <Truck className="w-3.5 h-3.5 text-[#f18641] shrink-0 mt-0.5" />
                <span>Despacho Express en 24-48 hrs</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#f18641] shrink-0 mt-0.5" />
                <span>Facturación Electrónica Oficial</span>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#f18641] shrink-0 mt-0.5" />
                <span>WhatsApp Oficial Inmediato</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Trust */}
        <div className="pt-6 border-t border-[#225390] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <p>© {new Date().getFullYear()} Centident Suministros Odontológicos. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Calidad ISO 13485</span>
            <span>•</span>
            <span>Registro Sanitario Oficial</span>
            <span>•</span>
            <span>Pagos Seguros</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
