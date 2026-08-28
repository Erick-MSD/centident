import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Sparkles, 
  Flame, 
  ArrowUpDown, 
  PackageCheck, 
  MessageCircle, 
  FileQuestion, 
  ArrowRight, 
  RotateCcw,
  Tag,
  Award
} from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER, getWhatsAppUrl } from '../utils/whatsapp';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: ProductCategory;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

const CATEGORY_NAMES: Record<ProductCategory, string> = {
  todos: 'Todos los Suministros',
  instrumental: 'Instrumental Quirúrgico',
  restauracion: 'Resinas & Restauración',
  'orto-endo': 'Ortodoncia & Endodoncia',
  bioseguridad: 'Bioseguridad & Asepsia',
  equipos: 'Equipos & Turbinas LED',
  desechables: 'Desechables & Profilaxis',
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  searchTerm,
  onSearchChange,
  cartItems,
  onAddToCart,
  onQuickView,
  onSelectCategory,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyOffers, setOnlyOffers] = useState(false);
  const [viewAllCatalog, setViewAllCatalog] = useState(false);

  const cartProductIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.product.id));
  }, [cartItems]);

  // Discounted products for the Home Page
  const discountedProducts = useMemo(() => {
    return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
  }, [products]);

  // Best sellers & popular products for the Home Page
  const bestSellerProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.badge === 'Más Vendido' ||
        p.badge === 'Grado Quirúrgico' ||
        p.badge === 'Alta Demanda' ||
        p.rating >= 4.9
    );
  }, [products]);

  // Filtered products when in dedicated category / search / full view
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
          return false;
        }
        // Search term filter
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
        // Only in stock
        if (onlyInStock && (!item.inStock || item.stockCount <= 0)) {
          return false;
        }
        // Only offers
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
  }, [products, selectedCategory, searchTerm, onlyInStock, onlyOffers, sortBy]);

  const isHomeView = selectedCategory === 'todos' && !searchTerm && !viewAllCatalog;

  const handleCustomSupplyWhatsApp = () => {
    const text = `Hola Centident, busco un insumo o equipo odontológico específico que no encontré en el catálogo web: "${searchTerm || 'Suministro específico'}". ¿Me podrían indicar si lo tienen bajo pedido?`;
    window.open(getWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, text), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="catalogo" className="py-8 sm:py-10 bg-slate-50 border-b border-[#cee0ed] scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* VIEW 1: HOME PAGE VIEW (Shows Discounted Items & Offers) */}
        {isHomeView ? (
          <div className="space-y-8">
            
            {/* SECTION: OFERTAS ESPECIALES & DESCUENTOS */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#cee0ed] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#f18641] text-white flex items-center justify-center shadow-2xs">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-lg sm:text-xl font-bold text-[#173d6d]">
                        Ofertas Especiales & Descuentos
                      </h2>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Hasta 20% OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-subheading">
                      Precios promocionales por tiempo limitado en insumos de alta rotación clínica
                    </p>
                  </div>
                </div>

                <button
                  id="view-all-offers-btn"
                  onClick={() => {
                    setOnlyOffers(true);
                    setViewAllCatalog(true);
                  }}
                  className="text-xs font-bold text-[#f18641] hover:text-[#173d6d] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Ver todas las ofertas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of Discounted Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {discountedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    isInCart={cartProductIds.has(product.id)}
                  />
                ))}
              </div>
            </div>

            {/* Banner to explore full catalog with category pills */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#cee0ed] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-[#173d6d]">
                  ¿Buscas una categoría o insumo específico?
                </h3>
                <p className="text-xs text-slate-500 font-subheading mt-0.5">
                  Accede al catálogo completo con más de 20 referencias odontológicas con filtros por stock y precio.
                </p>
              </div>
              <button
                id="explore-full-catalog-home-btn"
                onClick={() => setViewAllCatalog(true)}
                className="px-5 py-2.5 bg-[#173d6d] hover:bg-[#0e2645] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 uppercase tracking-wide shadow-2xs"
              >
                Ver Catálogo Completo ({products.length} Productos)
              </button>
            </div>

          </div>
        ) : (
          /* VIEW 2: DEDICATED CATEGORY OR SEARCH OR FULL CATALOG VIEW */
          <div className="space-y-6">
            
            {/* Category / Search Header Banner */}
            <div className="bg-white p-4 rounded-xl border border-[#cee0ed] shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                
                {/* Title & Back Button */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <button
                      id="back-to-home-catalog-btn"
                      onClick={() => {
                        onSelectCategory('todos');
                        onSearchChange('');
                        setViewAllCatalog(false);
                        setOnlyOffers(false);
                      }}
                      className="text-xs font-bold text-[#f18641] hover:text-[#173d6d] flex items-center gap-1 cursor-pointer transition-colors bg-[#cee0ed]/40 px-2 py-1 rounded"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Volver a Ofertas & Populares</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <h2 className="font-heading font-extrabold text-lg sm:text-xl text-[#173d6d]">
                      {searchTerm
                        ? `Resultados para: "${searchTerm}"`
                        : selectedCategory !== 'todos'
                        ? `Colección: ${CATEGORY_NAMES[selectedCategory]}`
                        : 'Catálogo Completo de Suministros'}
                    </h2>
                    <span className="text-[10px] bg-[#cee0ed] text-[#173d6d] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {filteredProducts.length} insumos
                    </span>
                  </div>
                </div>

                {/* Filter and Sort Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* In Stock toggle */}
                  <button
                    id="filter-toggle-stock"
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

                  {/* Offers toggle */}
                  <button
                    id="filter-toggle-offers"
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
                      id="sort-products-select"
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

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                    isInCart={cartProductIds.has(product.id)}
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-2xl p-8 text-center border border-[#cee0ed] max-w-md mx-auto space-y-3">
                <div className="w-12 h-12 bg-[#cee0ed] text-[#173d6d] rounded-xl flex items-center justify-center mx-auto">
                  <FileQuestion className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-sm text-slate-800">
                    No encontramos productos en esta categoría o búsqueda
                  </h3>
                  <p className="text-xs text-slate-500">
                    Intenta restableciendo los filtros o solicita el insumo bajo pedido.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                  <button
                    onClick={() => {
                      onSearchChange('');
                      onSelectCategory('todos');
                      setOnlyInStock(false);
                      setOnlyOffers(false);
                      setViewAllCatalog(false);
                    }}
                    className="px-4 py-1.5 bg-[#173d6d] text-white text-xs font-bold rounded-lg hover:bg-[#0e2645] transition-colors cursor-pointer"
                  >
                    Restablecer Filtros
                  </button>
                  <button
                    onClick={handleCustomSupplyWhatsApp}
                    className="px-4 py-1.5 bg-[#f18641] text-white text-xs font-bold rounded-lg hover:bg-[#e0732d] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Consultar en WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Custom Order Callout Banner matching High Density Theme */}
        <div className="bg-[#173d6d] text-white rounded-2xl p-5 sm:p-6 border border-[#cee0ed]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="inline-block px-2 py-0.5 bg-[#cee0ed] text-[#173d6d] text-[10px] font-bold uppercase tracking-wider rounded">
              Cotización Personalizada
            </span>
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white">
              ¿Requieres un instrumental o insumo que no ves en lista?
            </h3>
            <p className="text-xs text-[#cee0ed] max-w-xl">
              Complete el requerimiento y finalice vía WhatsApp para descuentos corporativos en más de 5,000 referencias.
            </p>
          </div>

          <button
            id="catalog-whatsapp-inquiry-btn"
            onClick={handleCustomSupplyWhatsApp}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[#f18641] hover:bg-[#e0732d] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs tracking-wide uppercase"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>SOLICITAR POR WHATSAPP</span>
          </button>
        </div>

      </div>
    </section>
  );
};
