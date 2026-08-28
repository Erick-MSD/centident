import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Headphones, 
  Award, 
  RotateCcw, 
  HelpCircle,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

export const FeaturesBanner: React.FC = () => {
  const features = [
    {
      icon: Award,
      title: 'Calidad Grado Quirúrgico',
      description: 'Instrumental en acero alemán AISI 420 y biomateriales con registro sanitario oficial.',
    },
    {
      icon: Truck,
      title: 'Despacho Express a Clínicas',
      description: 'Envíos rápidos a consultorios y hospitales de todo el país en 24 a 48 horas.',
    },
    {
      icon: FileCheck,
      title: 'Facturación & Trazabilidad',
      description: 'Emitimos factura electrónica formal con certificados de lote y esterilización.',
    },
    {
      icon: Headphones,
      title: 'Asesoría de Odontólogo a Odontólogo',
      description: 'Especialistas disponibles en WhatsApp para orientarte en referencias y compatibilidad.',
    },
  ];

  const faqs = [
    {
      q: '¿Cómo se procesa el pago a través de WhatsApp?',
      a: 'Al finalizar tu carrito o enviar el formulario, se abre WhatsApp con la lista detallada. Nuestro equipo te confirma stock inmediato y te envía el link de pago seguro (Transferencia bancaria, PSE, Tarjeta de crédito o Contra Entrega según la ciudad).',
    },
    {
      q: '¿Tienen precios especiales para compras por volumen o clínicas?',
      a: 'Sí. Ofrecemos descuentos progresivos desde 5%, 10% y hasta 25% en paquetes institucionales de bioseguridad, resinas e instrumental.',
    },
    {
      q: '¿El instrumental cuenta con garantía de autoclave?',
      a: 'Todos nuestros instrumentos cuentan con 1 a 2 años de garantía contra corrosión y pérdida de filo bajo ciclos estándar de autoclave a 134°C.',
    },
    {
      q: '¿Hacen envíos urgentes para cirugías programadas?',
      a: 'Sí. Marca la opción "Pedido Urgente" en el cotizador o avísanos por WhatsApp y priorizaremos tu despacho en servicio courier express.',
    },
  ];

  const handleAskFaqWhatsApp = (question: string) => {
    const text = `Hola Centident, tengo una consulta: "${question}"`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="garantia" className="py-10 bg-white border-b border-[#cee0ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 4 Feature Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-4 border border-[#cee0ed] hover:border-[#173d6d] shadow-2xs hover:shadow-xs transition-all space-y-2.5"
              >
                <div className="w-10 h-10 rounded-lg bg-[#173d6d] text-white flex items-center justify-center shadow-2xs">
                  <Icon className="w-5 h-5 text-[#f18641]" />
                </div>
                <h3 className="font-heading font-bold text-sm text-[#173d6d]">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-widest rounded">
              Preguntas Frecuentes
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#173d6d]">
              Resolvemos tus Dudas sobre Pedidos y Envíos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50/70 rounded-xl p-4 border border-[#cee0ed] space-y-2 hover:bg-white hover:border-[#173d6d] transition-all shadow-2xs"
              >
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[#173d6d] flex items-start gap-2">
                  <span className="text-[#f18641] font-bold">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-4">
                  {faq.a}
                </p>
                <div className="pl-4 pt-1">
                  <button
                    onClick={() => handleAskFaqWhatsApp(faq.q)}
                    className="text-[11px] font-bold text-[#f18641] hover:text-[#173d6d] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>Consultar en WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
