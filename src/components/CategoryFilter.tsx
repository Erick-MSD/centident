import React from 'react';
import { ProductCategory } from '../types';
import { 
  LayoutGrid, 
  Scissors, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Package 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  categoryCounts: Record<ProductCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const categories: { id: ProductCategory; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'todos', name: 'Todos los Suministros', icon: LayoutGrid },
    { id: 'instrumental', name: 'Instrumental Quirúrgico', icon: Scissors },
    { id: 'restauracion', name: 'Restauración & Resinas', icon: Sparkles },
    { id: 'orto-endo', name: 'Ortodoncia & Endodoncia', icon: Activity },
    { id: 'bioseguridad', name: 'Bioseguridad & Asepsia', icon: ShieldCheck },
    { id: 'equipos', name: 'Equipos & Turbinas LED', icon: Zap },
    { id: 'desechables', name: 'Desechables & Profilaxis', icon: Package },
  ];

  return (
    <section id="categorias" className="py-4 bg-white border-b border-[#cee0ed] sticky top-[57px] sm:top-[61px] z-30 shadow-2xs backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
          <div>
            <h2 className="text-[11px] uppercase tracking-widest font-bold text-gray-400">
              Categorías Destacadas
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-semibold">
            Mostrando: <strong className="text-[#173d6d] font-bold">{categoryCounts[selectedCategory] || 0}</strong> insumos
          </span>
        </div>

        {/* Scrollable Horizontal Category Chips matching High Density */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                id={`cat-filter-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 snap-start cursor-pointer border ${
                  isSelected
                    ? 'bg-[#173d6d] text-white border-[#173d6d] shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-[#cee0ed]/60 hover:text-[#173d6d] border-[#cee0ed]'
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-[#f18641]' : 'text-slate-500'
                  }`}
                />
                <span className="whitespace-nowrap font-semibold">{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? 'bg-[#f18641] text-white'
                      : 'bg-[#cee0ed] text-[#173d6d]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
