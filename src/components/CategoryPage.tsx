import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORY_COLLECTION } from './CategoryCarousel';
import { 
  ArrowLeft, 
  PackageCheck, 
  Sparkles, 
  ArrowUpDown, 
  Search, 
  MessageCircle, 
  FileQuestion,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

interface CategoryPageProps {
  category: ProductCategory;
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onBackToHome: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

const CATEGORY_DETAILS: Record<string, { subtitle: string; specsSummary: string; image: string }> = {
  instrumental: {
    subtitle: 'Acero inoxidable alemán AISI 420/440 con certificación quirúrgica ISO 13485.',
    specsSummary: 'Autoclavable 134°C • Acabado mate antirreflejo • Garantía de filo de 1 año',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
  },
  restauracion: {
    subtitle: 'Resinas nanohíbridas de alta estética, adhesivos universales y cementos duales.',
    specsSummary: 'Mínima contracción de polimerización • Pulido duradero • Radiopacidad superior',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
  },
  'orto-endo': {
    subtitle: 'Brackets cerámicos/metálicos, arcos Niti térmicos y limas rotatorias Gold/Blue.',
    specsSummary: 'Memoria elástica garantizada • Resistencia a la fatiga cíclica • Conicidades precisas',
    image: 'https://images.unsplash.com/photo-1588776813677-77aaf5595b83?auto=format&fit=crop&w=800&q=80',
  },
  bioseguridad: {
    subtitle: 'EPP de alta resistencia, barreras de protección física y desinfectantes hospitalarios.',
    specsSummary: 'Nitrilo libre de polvo • Normas AQL 1.5 • Aprobación para procedimientos invasivos',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
  },
  equipos: {
    subtitle: 'Piezas de mano neumáticas, turbinas LED autoiluminadas y micromotores clínicos.',
    specsSummary: 'Rodamientos cerámicos alemanes • Sistema Push Button • Triple spray irrigador',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
  },
  desechables: {
    subtitle: 'Insumos de un solo uso para máxima asepsia: eyectores, agujas dentales y pastas.',
    specsSummary: 'Esterilidad certificada • Siliconado suave • Compatibilidad con unidades estándar',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
  },
};

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  products,
  cartItems,
  onAddToCart,
  onQuickView,
  onBackToHome,
  onSelectCategory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const currentCatMeta = useMemo(() => {
    return CATEGORY_COLLECTION.find((c) => c.id === category) || {
      id: category,
      name: 'Línea de Suministros Odontológicos',
      description: 'Suministros clínicos y biomateriales',
      image: '',
    };
  }, [category]);

  const detailMeta = CATEGORY_DETAILS[category] || {
    subtitle: 'Suministros odontológicos especializados con certificación clínica.',
    specsSummary: 'Garantía sanitaria • Registro oficial • Despacho inmediato',
    image: currentCatMeta.image,
  };

  const cartProductIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.product.id));
  }, [cartItems]);

  // Filter products EXCLUSIVELY belonging to this category
  const categoryProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Must belong to this category
        if (item.category !== category) {
          return false;
        }
        // Search term
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesBrand = item.brand.toLowerCase().includes(query);
          const matchesCode = item.code.toLowerCase().includes(query);
          const matchesDesc = item.shortDescription.toLowerCase().includes(query);
          if (!matchesName && !matchesBrand && !matchesCode && !matchesDesc) {
            return false;
          }
        }
        // In stock
        if (onlyInStock && (!item.inStock || item.stockCount <= 0)) {
          return false;
        }
        // Offers
        if (onlyOffers && (!item.originalPrice || item.originalPrice <= item.price)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, category, searchTerm, onlyInStock, onlyOffers, sortBy]);

  const handleCategoryWhatsAppInquiry = () => {
    const text = `Hola Centident, me encuentro en la sección de ${currentCatMeta.name}. Deseo cotizar un pedido institucional o consultar disponibilidad de referencias específicas.`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-[80vh] bg-slate-50/70 pb-16">
      
      {/* Top Breadcrumbs & Back Navigation Bar */}
      <div className="bg-white border-b border-[#cee0ed] sticky top-14 sm:top-16 z-20 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 font-bold text-[#173d6d] hover:text-[#f18641] transition-colors cursor-pointer bg-slate-100 hover:bg-[#cee0ed]/40 px-2.5 py-1 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Inicio</span>
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-slate-500 font-medium hidden sm:inline">Líneas</span>
            <span className="text-slate-400 hidden sm:inline">/</span>
            <span className="font-bold text-[#173d6d] truncate max-w-[180px] sm:max-w-none">
              {currentCatMeta.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCategoryWhatsAppInquiry}
              className="px-3 py-1 bg-[#f18641] hover:bg-[#e0732d] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wide"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cotizar Esta Línea en WhatsApp</span>
              <span className="sm:hidden">Cotizar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Header Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-[#cee0ed] shadow-xs overflow-hidden"
        >
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-2.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-wider rounded">
                  Categoría Clínica Seleccionada
                </span>
                <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded">
                  {categoryProducts.length} productos disponibles
                </span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#173d6d]">
                {currentCatMeta.name}
              </h1>

              <p className="font-subheading text-sm sm:text-base text-slate-600 leading-relaxed">
                {detailMeta.subtitle}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-600 bg-[#cee0ed]/20 px-3 py-1.5 rounded-lg border border-[#cee0ed] max-w-xl">
                <ShieldCheck className="w-4 h-4 text-[#f18641] shrink-0" />
                <span className="font-subheading">{detailMeta.specsSummary}</span>
              </div>
            </div>

            {/* Circular Category Thumbnail matching CeraDirect avatar */}
            <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#173d6d] shadow-sm bg-slate-100 hidden md:block">
              <img
                src={currentCatMeta.image}
                alt={currentCatMeta.name}
                className="w-full h-full object-cover"
              />
            </div>

          </div>

          {/* Quick Category Switcher Pills at the bottom of the banner */}
          <div className="bg-slate-50/80 px-4 sm:px-6 py-3 border-t border-[#cee0ed] flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#173d6d]" />
              Otras Líneas:
            </span>
            <div className="flex items-center gap-1.5">
              {CATEGORY_COLLECTION.map((cat) => {
                const isActive = cat.id === category;
                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#173d6d] text-white shadow-2xs'
                        : 'bg-white text-slate-700 hover:bg-[#cee0ed]/40 border border-[#cee0ed]'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filter and Search Bar for Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#cee0ed] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Category Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Buscar en ${currentCatMeta.name}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-[#cee0ed] rounded-lg focus:outline-hidden focus:border-[#173d6d] focus:bg-white text-slate-800 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Quick Toggle Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                onlyInStock
                  ? 'bg-[#173d6d] text-white border-[#173d6d]'
                  : 'bg-white text-slate-600 border-[#cee0ed] hover:bg-[#cee0ed]/40'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Solo en Stock</span>
            </button>

            <button
              onClick={() => setOnlyOffers(!onlyOffers)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                onlyOffers
                  ? 'bg-[#f18641] text-white border-[#f18641]'
                  : 'bg-white text-slate-600 border-[#cee0ed] hover:bg-[#cee0ed]/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>En Oferta</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white border border-[#cee0ed] rounded-lg px-2.5 py-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-slate-700 outline-hidden cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: Menor a Mayor</option>
                <option value="price-desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Product Grid exclusively for this category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {categoryProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                isInCart={cartProductIds.has(product.id)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#cee0ed] max-w-md mx-auto space-y-3 my-8">
            <div className="w-12 h-12 bg-[#cee0ed] text-[#173d6d] rounded-xl flex items-center justify-center mx-auto">
              <FileQuestion className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-sm text-slate-800">
                No hay productos que coincidan con la búsqueda
              </h3>
              <p className="text-xs text-slate-500">
                Prueba borrando el término de búsqueda o consulta por WhatsApp si tenemos la referencia bajo pedido.
              </p>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setOnlyInStock(false);
                  setOnlyOffers(false);
                }}
                className="px-4 py-1.5 bg-[#173d6d] text-white text-xs font-bold rounded-lg hover:bg-[#0e2645] transition-colors cursor-pointer"
              >
                Limpiar Filtros
              </button>
              <button
                onClick={handleCategoryWhatsAppInquiry}
                className="px-4 py-1.5 bg-[#f18641] text-white text-xs font-bold rounded-lg hover:bg-[#e0732d] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Consultar por WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Category Wholesale Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="bg-[#173d6d] text-white rounded-2xl p-5 sm:p-6 border border-[#cee0ed]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="inline-block px-2 py-0.5 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-wider rounded">
              Compras Institucionales & Clínicas
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white">
              ¿Requieres dotar un consultorio completo en {currentCatMeta.name}?
            </h3>
            <p className="text-xs text-[#cee0ed] max-w-xl">
              Ofrecemos paquetes por volumen, asesoría con fichas técnicas y entrega prioritaria con factura fiscal.
            </p>
          </div>

          <button
            onClick={handleCategoryWhatsAppInquiry}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[#f18641] hover:bg-[#e0732d] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs tracking-wide uppercase"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>SOLICITAR COTIZACIÓN POR WHATSAPP</span>
          </button>
        </div>
      </div>

    </div>
  );
};
