import { Product } from '../types';

export const DENTAL_PRODUCTS: Product[] = [
  // INSTRUMENTAL
  {
    id: 'inst-01',
    name: 'Kit de Exploración Dental Diagnóstico Premium (Set x 4)',
    category: 'instrumental',
    categoryName: 'Instrumental & Quirúrgico',
    price: 34.50,
    originalPrice: 42.00,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 48,
    inStock: true,
    stockCount: 65,
    badge: 'Más Vendido',
    presentation: 'Estuche autoclavable c/ 4 piezas',
    brand: 'Centident Pro',
    code: 'CD-INST-401',
    shortDescription: 'Acero inoxidable alemán quirúrgico grado AISI 420. Incluye espejo #5 c/ mango, explorador 23/17, pinza algodonera y sonda periodontal Williams.',
    fullDescription: 'Set instrumental fundamental para diagnóstico y evaluación clínica. Fabricado en aleación de acero quirúrgico templado que garantiza una resistencia superior a la corrosión y soporta más de 1,000 ciclos de autoclave a 134°C sin perder filo ni brillo.',
    specs: {
      'Material': 'Acero Inoxidable Quirúrgico AISI 420',
      'Esterilización': 'Autoclave hasta 135°C / Óxido de etileno',
      'Acabado': 'Satinado antireflectivo para luz clínica',
      'Garantía': '2 Años contra defectos de fábrica'
    },
    bulkDiscounts: [
      { minQty: 5, discountPercent: 8 },
      { minQty: 12, discountPercent: 15 }
    ]
  },
  {
    id: 'inst-02',
    name: 'Juego de Fórceps de Extracción Adulto Ergonómico (Set x 7)',
    category: 'instrumental',
    categoryName: 'Instrumental & Quirúrgico',
    price: 185.00,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    stockCount: 18,
    badge: 'Grado Quirúrgico',
    presentation: 'Caja metálica organizadora + 7 fórceps',
    brand: 'MasterDent Germany',
    code: 'MD-FORC-700',
    shortDescription: 'Set completo para molares, premolares, incisivos superiores e inferiores y raíces con grip moleteado antideslizante.',
    fullDescription: 'Diseñados con mordazas anatómicas que ofrecen una retención óptima sobre la corona y el cuello dental, reduciendo el riesgo de fractura radicular durante luxaciones y exodoncias complejas.',
    specs: {
      'Material': 'Acero Martensítico Alemán',
      'Ergonomía': 'Mango moleteado anatómico con resortes de precisión',
      'Incluye': 'Fórceps #1, #17, #18R, #18L, #150, #151 y #222',
      'Certificación': 'ISO 13485 / CE Medical Device'
    },
    bulkDiscounts: [
      { minQty: 3, discountPercent: 10 }
    ]
  },
  {
    id: 'inst-03',
    name: 'Espátula para Composite de Titanio con Recubrimiento Dorado',
    category: 'instrumental',
    categoryName: 'Instrumental & Quirúrgico',
    price: 26.00,
    originalPrice: 32.00,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    stockCount: 42,
    badge: 'Anti-adherente',
    presentation: 'Pieza individual c/ capuchón protector',
    brand: 'Centident Pro',
    code: 'CD-TIT-09',
    shortDescription: 'Punta ultrafina flexible tratada con nitruro de titanio antiadherente para modelado estético de resinas anteriores y posteriores.',
    fullDescription: 'Evita que el composite se pegue a las puntas activas, permitiendo un esculpido y caracterización anatómica precisa de cúspides y vertientes oclusales.',
    specs: {
      'Tratamiento': 'Nitruro de Titanio (TiN) Gold',
      'Peso': 'Ultraligero 16g',
      'Puntas': 'Doble extremo (Espátula fina + condensador cónico)',
      'Limpieza': 'Apta ultrasonido y autoclave'
    }
  },

  // RESTAURACIÓN & RESINAS
  {
    id: 'rest-01',
    name: 'Resina Nanohíbrida Estética Universal Nano-Fil (Kit 4 Jeringas)',
    category: 'restauracion',
    categoryName: 'Restauración & Resinas',
    price: 68.00,
    originalPrice: 85.00,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 74,
    inStock: true,
    stockCount: 80,
    badge: 'Top Estética',
    presentation: 'Kit 4 jeringas x 4g (A1, A2, A3, B2) + Adhesivo 5ml',
    brand: 'AcroDent Labs',
    code: 'AD-RES-400',
    shortDescription: 'Nanorelleno de circonio y silicio con alto pulido, baja contracción volumétrica (<1.8%) y efecto camaleónico.',
    fullDescription: 'Composite fotopolimerizable universal de última generación indicado para restauraciones directas de Clase I a V. Su tamaño de partícula submicrónica proporciona brillo duradero similar al esmalte dental natural.',
    specs: {
      'Relleno': '79% en peso partículas nano-cerámicas',
      'Tiempo de Curado': '20 seg con lámpara LED estándar (>1000 mW/cm²)',
      'Radiopacidad': '240% Al para contraste radiográfico nítido',
      'Contracción': 'Inferior a 1.8%'
    },
    bulkDiscounts: [
      { minQty: 4, discountPercent: 12 },
      { minQty: 10, discountPercent: 20 }
    ]
  },
  {
    id: 'rest-02',
    name: 'Sistema Adhesivo Universal 8va Generación Monocomponente (6ml)',
    category: 'restauracion',
    categoryName: 'Restauración & Resinas',
    price: 38.50,
    originalPrice: 46.00,
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 51,
    inStock: true,
    stockCount: 55,
    badge: 'Libre de Sensibilidad',
    presentation: 'Frasco gotero 6ml',
    brand: 'AcroDent Labs',
    code: 'AD-ADH-008',
    shortDescription: 'Compatible con técnicas de grabado total, grabado selectivo y autograbado con monómero 10-MDP puro.',
    fullDescription: 'Fuerza de unión superior a 35 MPa en dentina y esmalte. Previene de forma efectiva la sensibilidad postoperatoria gracias al sellado hermético de los túbulos dentinarios.',
    specs: {
      'Componente Activo': 'Monómero funcional 10-MDP original',
      'Compatibilidad': 'Composites, zirconio, disilicato de litio y metales',
      'Solvente': 'Etanol / Agua (fórmula sin acetona irritante)'
    }
  },
  {
    id: 'rest-03',
    name: 'Cemento de Ionómero de Vidrio para Restauración y Base',
    category: 'restauracion',
    categoryName: 'Restauración & Resinas',
    price: 42.00,
    originalPrice: 49.00,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 22,
    inStock: true,
    stockCount: 34,
    badge: 'Liberador de Flúor',
    presentation: 'Polvo 15g + Líquido 10ml + Cuchara dosificadora',
    brand: 'Centident Pro',
    code: 'CD-IONO-015',
    shortDescription: 'Autopolimerizable con alta biocompatibilidad, adhesión química a la estructura dental y liberación sostenida de flúor.',
    fullDescription: 'Ideal para restauraciones Clase V, base cavitaria protectora y odontopediatría. Proporciona protección cariostática peridental permanente.',
    specs: {
      'Tiempo de Trabajo': '2 min 30 seg',
      'Tiempo de Fraguado': '4 min 30 seg',
      'Resistencia Compresiva': '180 MPa'
    }
  },

  // ORTODONCIA & ENDODONCIA
  {
    id: 'orto-01',
    name: 'Limas Rotatorias NiTi Gold para Endodoncia (Set x 6 surtidas)',
    category: 'orto-endo',
    categoryName: 'Ortodoncia & Endodoncia',
    price: 36.00,
    originalPrice: 45.00,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 63,
    inStock: true,
    stockCount: 90,
    badge: 'Tratamiento Térmico Gold',
    presentation: 'Blister x 6 limas (SX, S1, S2, F1, F2, F3 / 25mm)',
    brand: 'EndoFlex Pro',
    code: 'EF-GOLD-25',
    shortDescription: 'Aleación Níquel-Titanio con memoria de forma mejorada para conductos curvos complejos sin deformación ni escalones.',
    fullDescription: 'Tratamiento térmico Gold patentado que triplica la resistencia a la fatiga cíclica frente a las limas de NiTi tradicionales, reduciendo a cero el riesgo de fractura instrumental en conductos estrechos.',
    specs: {
      'Longitud': '25 mm (Disponible también en 21mm y 31mm)',
      'Velocidad Recomendada': '300-350 RPM / Torque 2.0-3.0 N.cm',
      'Conicidad': 'Variable progresiva'
    },
    bulkDiscounts: [
      { minQty: 5, discountPercent: 10 },
      { minQty: 15, discountPercent: 20 }
    ]
  },
  {
    id: 'orto-02',
    name: 'Kit de Brackets Metálicos Roth / MBT 0.022 con Ganchos 3-4-5',
    category: 'orto-endo',
    categoryName: 'Ortodoncia & Endodoncia',
    price: 18.50,
    originalPrice: 24.00,
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 45,
    inStock: true,
    stockCount: 120,
    badge: 'Oferta Clínica',
    presentation: 'Caso completo 1 paciente (20 brackets)',
    brand: 'OrthoMaster USA',
    code: 'OM-BRK-022',
    shortDescription: 'Microinyección de metal MIM con base de malla calibre 80 para una adhesión mecánica impecable y fácil descementado.',
    fullDescription: 'Línea de torque y angulación precisa con perfil ultra bajo que maximiza la comodidad del paciente, evitando laceraciones en la mucosa y facilitando la higiene oral.',
    specs: {
      'Prescripción': 'Roth 0.022 / MBT 0.022 a elección',
      'Base': 'Malla 80 mesh anatómica contorneada',
      'Ganchos': 'En caninos y premolares (3, 4 y 5)'
    },
    bulkDiscounts: [
      { minQty: 10, discountPercent: 15 },
      { minQty: 25, discountPercent: 25 }
    ]
  },
  {
    id: 'orto-03',
    name: 'Puntas de Gutapercha Estandarizadas Calibradas (Caja x 120)',
    category: 'orto-endo',
    categoryName: 'Ortodoncia & Endodoncia',
    price: 12.00,
    originalPrice: 15.00,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 38,
    inStock: true,
    stockCount: 75,
    presentation: 'Caja organizadora x 120 puntas (Calibres 15 al 40)',
    brand: 'Centident Pro',
    code: 'CD-GUTA-02',
    shortDescription: 'Conicidad .02 / .04 / .06 con marcas de profundidad milimetradas a 16, 18, 19, 20, 22 y 24 mm.',
    fullDescription: 'Gutapercha pura homogénea con alta radiopacidad y excelente flexibilidad para obturación termoplastificada y técnica de condensación lateral.',
    specs: {
      'Conicidad': '.02 regular (Disponible en .04 y .06)',
      'Codificación': 'Por color según norma ISO'
    }
  },

  // BIOSEGURIDAD & ESTERILIZACIÓN
  {
    id: 'bio-01',
    name: 'Guantes de Nitrilo Quirúrgico Texturizados Sin Polvo (Caja x 100)',
    category: 'bioseguridad',
    categoryName: 'Bioseguridad & Esterilización',
    price: 9.80,
    originalPrice: 13.00,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 110,
    inStock: true,
    stockCount: 350,
    badge: 'Esencial Clínica',
    presentation: 'Caja dispensadora x 100 unidades (Tallas XS, S, M, L)',
    brand: 'SafeGuard Dental',
    code: 'SG-NIT-100',
    shortDescription: 'Color azul cobalto / violeta, microtexturizado en yemas de dedos para agarre seguro en húmedo. 100% libre de látex.',
    fullDescription: 'Barrera de protección biológica de alta resistencia a pinchazos y rasgaduras. Su formulación hipoalergénica evita dermatitis y fatiga muscular durante jornadas clínicas extensas.',
    specs: {
      'Espesor': '3.5 milésimas en palma / 4.0 en dedos',
      'Normativas': 'ASTM D6319, EN 455 partes 1-4',
      'Tallas': 'XS, S, M, L disponibles en stock'
    },
    bulkDiscounts: [
      { minQty: 10, discountPercent: 12 },
      { minQty: 30, discountPercent: 22 }
    ]
  },
  {
    id: 'bio-02',
    name: 'Rollos de Mangas para Esterilización con Indicador Químico (200m)',
    category: 'bioseguridad',
    categoryName: 'Bioseguridad & Esterilización',
    price: 24.50,
    originalPrice: 30.00,
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 34,
    inStock: true,
    stockCount: 60,
    presentation: 'Rollo continuo 200m (Anchos: 7.5cm / 10cm / 15cm)',
    brand: 'SterilMax Pro',
    code: 'SM-ROLL-100',
    shortDescription: 'Papel médico grado 60g/m² laminado con film transparente de alta resistencia al desgarro y sellado térmico triple.',
    fullDescription: 'Incorpora testigos de viraje químico para vapor y gas ETO que confirman visualmente el ciclo de esterilización exitoso en el autoclave.',
    specs: {
      'Certificación': 'ISO 11607 y EN 868-5',
      'Sellado': 'Triple costura longitudinal',
      'Apertura': 'Pelable sin desprendimiento de fibras'
    }
  },
  {
    id: 'bio-03',
    name: 'Desinfectante Enzimático Cuaternario de Alto Nivel para Instrumental (1 Galón)',
    category: 'bioseguridad',
    categoryName: 'Bioseguridad & Esterilización',
    price: 32.00,
    originalPrice: 39.00,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 28,
    inStock: true,
    stockCount: 45,
    badge: 'Acción Rápida',
    presentation: 'Galón concentrado 3.8 Litros (Rinde 120 litros)',
    brand: 'Centident Pro Clean',
    code: 'CD-ENZ-GAL',
    shortDescription: 'Fórmula multi-enzimática cuádruple (Proteasa, Amilasa, Lipasa y Celulasa) con pH neutro no corrosivo.',
    fullDescription: 'Disuelve en 5 minutos residuos orgánicos, sangre coagulada, biofilms y saliva de instrumental quirúrgico, turbinas e implantes sin manchar ni corroer los aceros.',
    specs: {
      'Rendimiento': 'Dilución 1:30 con agua corriente',
      'Biodegradable': '100% amigable con el drenaje clínico',
      'pH': 'Neutro 7.0 - Seguro para ópticas y plásticos'
    }
  },

  // EQUIPAMIENTO & TURBINAS
  {
    id: 'eq-01',
    name: 'Pieza de Mano Alta Velocidad LED con Triple Spray e Irrigación',
    category: 'equipos',
    categoryName: 'Equipamiento & Turbinas',
    price: 95.00,
    originalPrice: 130.00,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 57,
    inStock: true,
    stockCount: 25,
    badge: 'Generador LED Integrado',
    presentation: 'Caja protectora c/ accesorios de mantenimiento',
    brand: 'AeroDent Tech',
    code: 'AD-TURB-LED',
    shortDescription: 'Generador de luz LED autónomo por flujo de aire, cabezal estándar Push Button, rodamientos cerámicos alemanes.',
    fullDescription: 'Silenciosa (<65 dB) y con torque de 22W para cortes rápidos en esmalte y zirconio. La iluminación LED de 25,000 lux no proyecta sombras sobre el campo operatorio.',
    specs: {
      'Conexión': '2 orificios (Borden) o 4 orificios (Midwest)',
      'Velocidad': '380,000 - 420,000 RPM',
      'Rodamientos': 'Cerámicos de alta durabilidad',
      'Garantía': '1 Año con servicio técnico oficial'
    },
    bulkDiscounts: [
      { minQty: 2, discountPercent: 10 }
    ]
  },
  {
    id: 'eq-02',
    name: 'Lámpara de Fotocurado Inalámbrica BroadBand LED 1-Sec (2500 mW/cm²)',
    category: 'equipos',
    categoryName: 'Equipamiento & Turbinas',
    price: 110.00,
    originalPrice: 145.00,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    stockCount: 19,
    badge: 'Curado en 1 Segundo',
    presentation: 'Base de carga + 2 guías ópticas + pantalla protectora',
    brand: 'LuxCure Dental',
    code: 'LC-FOTO-2500',
    shortDescription: 'Amplio espectro de longitud de onda (385 - 515 nm) capaz de polimerizar todos los fotoiniciadores del mercado (Canforquinona, TPO, Ivocerin).',
    fullDescription: 'Cuerpo de aluminio aeroespacial ergonómico con batería de ion-litio de larga duración (más de 800 ciclos de 10 seg por carga completa). Programas de pulso, rampa y ultra potencia.',
    specs: {
      'Potencia': 'Hasta 2500 mW/cm²',
      'Batería': '2600 mAh recargable vía USB-C / Base magnética',
      'Cabezal': 'Giro de 360° para molares posteriores'
    }
  },
  {
    id: 'eq-03',
    name: 'Micromotor Neumático con Contra-Ángulo Push Button y Punta Recta',
    category: 'equipos',
    categoryName: 'Equipamiento & Turbinas',
    price: 88.00,
    originalPrice: 115.00,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 30,
    inStock: true,
    stockCount: 22,
    presentation: 'Kit 3 piezas (Micromotor + Contra-ángulo + Recta)',
    brand: 'AeroDent Tech',
    code: 'AD-MICRO-SET',
    shortDescription: 'Transmisión 1:1, giro bidireccional horario y antihorario hasta 22,000 RPM, bajo nivel de vibración para laboratorio y clínica.',
    fullDescription: 'Ideal para pulido de prótesis, tallado estético, profilaxis y ortodoncia. Compatible con todas las marcas estándar ISO.',
    specs: {
      'Conexión': 'Midwest 4 vías o Borden 2 vías',
      'Esterilización': 'Totalmente autoclavable a 135°C',
      'Presión de Trabajo': '0.30 MPa - 0.35 MPa'
    }
  },

  // DESECHABLES & PROFILAXIS
  {
    id: 'des-01',
    name: 'Eyectores de Saliva Desechables Transparentes c/ Hilo de Cobre (Paquete x 100)',
    category: 'desechables',
    categoryName: 'Desechables & Profilaxis',
    price: 4.80,
    originalPrice: 6.50,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 95,
    inStock: true,
    stockCount: 400,
    badge: 'Alta Demanda',
    presentation: 'Bolsa termosellada x 100 unidades',
    brand: 'Centident Pro',
    code: 'CD-EYEC-100',
    shortDescription: 'Punta suave redondeada fija que no irrita los tejidos blandos bucales, con alambre de cobre flexible que mantiene la forma sin estrangular el flujo.',
    fullDescription: 'Material PVC atóxico 100% virgen grado médico. Evita traumatismos en el suelo de boca y asegura un campo operatorio seco y despejado en todo momento.',
    specs: {
      'Longitud': '15 cm de largo estándar',
      'Color': 'Transparente con punta azul / rosa / verde',
      'Material': 'PVC grado médico libre de ftalatos'
    },
    bulkDiscounts: [
      { minQty: 10, discountPercent: 10 },
      { minQty: 30, discountPercent: 25 }
    ]
  },
  {
    id: 'des-02',
    name: 'Kit de Fresas de Diamante Quirúrgicas para Tallado y Preparación (Set x 10)',
    category: 'desechables',
    categoryName: 'Desechables & Profilaxis',
    price: 19.50,
    originalPrice: 26.00,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 68,
    inStock: true,
    stockCount: 85,
    badge: 'Grano Seleccionado',
    presentation: 'Caja organizadora autoclavable c/ 10 fresas FG',
    brand: 'DiaMax Swiss',
    code: 'DM-FRE-10',
    shortDescription: 'Diamante natural galvanizado de corte rápido con vástago de acero suizo concéntrico sin vibración para turbina FG 1.6mm.',
    fullDescription: 'Contiene las formas más requeridas en prótesis fija y operatoria: redondas, troncocónicas de punta redondeada, llama y rueda para reducción oclusal homogénea.',
    specs: {
      'Grano': 'Grueso (Verde), Medio (Azul) y Fino (Rojo)',
      'Vástago': 'FG Standard 1.6mm para alta velocidad',
      'Durabilidad': 'Alta retención de partículas de diamante'
    },
    bulkDiscounts: [
      { minQty: 5, discountPercent: 12 }
    ]
  },
  {
    id: 'des-03',
    name: 'Baberos Clínicos Impermeables 3 Capas 2+1 (Caja x 500)',
    category: 'desechables',
    categoryName: 'Desechables & Profilaxis',
    price: 17.50,
    originalPrice: 22.00,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 40,
    inStock: true,
    stockCount: 110,
    presentation: 'Caja x 500 baberos (Medida: 33 x 45 cm)',
    brand: 'SafeGuard Dental',
    code: 'SG-BAB-500',
    shortDescription: 'Dos capas de celulosa pura absorbente + una capa de polietileno hidrófugo impermeable que no deja pasar líquidos.',
    fullDescription: 'Protección integral para la vestimenta de los pacientes frente a sprays de agua, soluciones antisépticas, sangre o materiales de grabado ácido.',
    specs: {
      'Colores': 'Azul Marino, Celeste Pastel, Verde Menta, Lila',
      'Medidas': '33 cm x 45 cm',
      'Gramaje': 'Alto poder de absorción'
    },
    bulkDiscounts: [
      { minQty: 4, discountPercent: 10 }
    ]
  }
];

export const CATEGORIES_LIST = [
  { id: 'todos', name: 'Todos los Suministros', count: 18, icon: 'LayoutGrid' },
  { id: 'instrumental', name: 'Instrumental Quirúrgico', count: 3, icon: 'Scissors' },
  { id: 'restauracion', name: 'Restauración & Resinas', count: 3, icon: 'Sparkles' },
  { id: 'orto-endo', name: 'Ortodoncia & Endodoncia', count: 3, icon: 'Activity' },
  { id: 'bioseguridad', name: 'Bioseguridad & Asepsia', count: 3, icon: 'ShieldCheck' },
  { id: 'equipos', name: 'Equipos & Turbinas', count: 3, icon: 'Zap' },
  { id: 'desechables', name: 'Desechables & Profilaxis', count: 3, icon: 'Package' },
];
