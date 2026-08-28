import React, { useState } from 'react';
import { DENTAL_TESTIMONIALS, TRUST_METRICS } from '../data/testimonials';
import { 
  Star, 
  Quote, 
  CheckCircle, 
  Award, 
  Building, 
  UserCheck, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [filterRole, setFilterRole] = useState<'all' | 'doctors' | 'patients'>('all');

  const filteredTestimonials = DENTAL_TESTIMONIALS.filter((t) => {
    if (filterRole === 'doctors') return !t.role.includes('Paciente');
    if (filterRole === 'patients') return t.role.includes('Paciente');
    return true;
  });

  return (
    <section id="testimonios" className="py-10 bg-white border-b border-[#cee0ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 space-y-2">
          <span className="inline-block px-3 py-1 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-widest rounded">
            Confianza & Casos Reales
          </span>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#173d6d] tracking-tight">
            Testimonios de Odontólogos, Clínicas y Pacientes
          </h2>

          <p className="font-subheading text-xs sm:text-sm text-slate-600">
            Descubre por qué más de 500 clínicas especializadas y doctores confían diariamente en los suministros e instrumental de Centident.
          </p>

          {/* Filter Pills: All / Doctores / Pacientes */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setFilterRole('all')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                filterRole === 'all'
                  ? 'bg-[#173d6d] text-white border-[#173d6d] shadow-2xs'
                  : 'bg-white text-slate-600 border-[#cee0ed] hover:bg-[#cee0ed]/40'
              }`}
            >
              Todos ({DENTAL_TESTIMONIALS.length})
            </button>
            <button
              onClick={() => setFilterRole('doctors')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                filterRole === 'doctors'
                  ? 'bg-[#173d6d] text-white border-[#173d6d] shadow-2xs'
                  : 'bg-white text-slate-600 border-[#cee0ed] hover:bg-[#cee0ed]/40'
              }`}
            >
              Odontólogos & Clínicas
            </button>
            <button
              onClick={() => setFilterRole('patients')}
              className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                filterRole === 'patients'
                  ? 'bg-[#173d6d] text-white border-[#173d6d] shadow-2xs'
                  : 'bg-white text-slate-600 border-[#cee0ed] hover:bg-[#cee0ed]/40'
              }`}
            >
              Pacientes Tratados
            </button>
          </div>
        </div>

        {/* Testimonials Grid in High Density */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-4 sm:p-5 border border-[#cee0ed] hover:border-[#173d6d] shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-3 relative group"
            >
              {/* Top Rating & Date */}
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-mono font-medium">
                  {testimonial.date}
                </span>
              </div>

              {/* Comment */}
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{testimonial.comment}"
              </p>

              {/* Author Info */}
              <div className="pt-2.5 border-t border-[#cee0ed] flex items-center gap-2.5">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#cee0ed]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="font-heading font-bold text-xs text-[#173d6d] truncate">
                      {testimonial.name}
                    </h4>
                    {testimonial.verified && (
                      <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" title="Compra y uso verificado" />
                    )}
                  </div>
                  <p className="text-[10px] text-[#f18641] font-semibold truncate">
                    {testimonial.role}
                  </p>
                  <p className="text-[9px] text-slate-500 truncate">
                    {testimonial.clinic} • {testimonial.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Metrics Counter Row */}
        <div className="bg-slate-50/70 rounded-xl p-4 sm:p-6 border border-[#cee0ed]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#cee0ed]">
            {TRUST_METRICS.map((metric, idx) => (
              <div key={idx} className={`space-y-0.5 ${idx > 0 ? 'pt-3 lg:pt-0' : ''}`}>
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#173d6d] block">
                  {metric.value}
                </span>
                <span className="text-xs font-bold text-slate-800 block">
                  {metric.label}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
