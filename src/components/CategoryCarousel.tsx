import React, { useRef } from 'react';
import { ProductCategory } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export interface CategoryItem {
  id: ProductCategory;
  name: string;
  image: string;
  description: string;
}

interface CategoryCarouselProps {
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts: Record<ProductCategory, number>;
}

export const CATEGORY_COLLECTION: CategoryItem[] = [
  {
    id: 'instrumental',
    name: 'Instrumental Quirúrgico',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    description: 'Fórceps, espejos, exploradores y sondas',
  },
  {
    id: 'restauracion',
    name: 'Resinas & Restauración',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=400&q=80',
    description: 'Nanohíbridas, adhesivos y cementos',
  },
  {
    id: 'orto-endo',
    name: 'Ortodoncia & Endodoncia',
    image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=400&q=80',
    description: 'Brackets, arcos, limas rotatorias y conos',
  },
  {
    id: 'bioseguridad',
    name: 'Bioseguridad & Asepsia',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    description: 'Guantes de nitrilo, baberos y mascarillas',
  },
  {
    id: 'equipos',
    name: 'Equipos & Turbinas LED',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
    description: 'Piezas de mano, micromotores y lámparas',
  },
  {
    id: 'desechables',
    name: 'Desechables & Profilaxis',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
    description: 'Agujas, eyectores, pastas y copas de goma',
  },
];

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  onSelectCategory,
  categoryCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="categorias" className="py-8 sm:py-10 bg-white border-b border-[#cee0ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching CeraDirect "Product Collection" style */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-widest rounded mb-1">
              Líneas Odontológicas
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Product Collection
            </h2>
            <p className="font-subheading text-xs sm:text-sm text-slate-500 mt-0.5">
              Haz clic en cualquier categoría para ingresar a su catálogo exclusivo de productos.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white border border-[#cee0ed] text-slate-700 hover:bg-[#cee0ed]/40 hover:text-[#173d6d] flex items-center justify-center shadow-2xs transition-all cursor-pointer"
              aria-label="Anterior categoría"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white border border-[#cee0ed] text-slate-700 hover:bg-[#cee0ed]/40 hover:text-[#173d6d] flex items-center justify-center shadow-2xs transition-all cursor-pointer"
              aria-label="Siguiente categoría"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Circular Categories Carousel (Only specific categories, no "Todos") */}
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x scroll-smooth"
        >
          {CATEGORY_COLLECTION.map((cat, index) => {
            const count = categoryCounts[cat.id] || 0;

            return (
              <motion.div
                key={cat.id}
                id={`cat-circle-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="flex-shrink-0 flex flex-col items-center text-center cursor-pointer group snap-start w-24 sm:w-28 md:w-32"
              >
                {/* Circular image container matching CeraDirect style */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-[#f1f3f5] p-2 flex items-center justify-center transition-all duration-300 border border-slate-200/90 shadow-2xs group-hover:shadow-md group-hover:border-[#173d6d] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full bg-[#173d6d]/0 group-hover:bg-[#173d6d]/10 transition-colors" />
                </div>

                {/* Category Name Label underneath */}
                <span className="mt-2.5 text-xs font-bold leading-tight line-clamp-2 transition-colors text-center text-slate-800 group-hover:text-[#173d6d]">
                  {cat.name}
                </span>

                <span className="text-[10px] text-slate-400 font-semibold mt-0.5 group-hover:text-[#f18641] transition-colors">
                  {count} productos →
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
