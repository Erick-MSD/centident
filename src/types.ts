export type ProductCategory = 
  | 'todos'
  | 'instrumental'
  | 'restauracion'
  | 'orto-endo'
  | 'bioseguridad'
  | 'equipos'
  | 'desechables';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  presentation: string; // e.g., "Caja x 100", "Jeringa 4g", "Pieza individual"
  brand: string;
  code: string;
  shortDescription: string;
  fullDescription: string;
  specs: { [key: string]: string };
  bulkDiscounts?: { minQty: number; discountPercent: number }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  clinic: string;
  city: string;
  avatar: string;
  comment: string;
  rating: number;
  specialty: string;
  verified: boolean;
  date: string;
}

export interface QuoteFormData {
  doctorName: string;
  clinicName: string;
  whatsapp: string;
  city: string;
  email: string;
  orderType: 'compra_inmediata' | 'cotizacion_volumen' | 'equipamiento_clinica';
  taxId?: string; // NIT o RUC
  notes: string;
  isUrgent: boolean;
}
