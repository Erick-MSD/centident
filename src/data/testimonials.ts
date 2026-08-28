import { Testimonial } from '../types';

export const DENTAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Dra. Valeria Montesinos',
    role: 'Especialista en Rehabilitación Oral',
    clinic: 'Clínica Dental Esthetic Plus',
    city: 'Bogotá / CDMX',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    comment: 'Llevo 3 años adquiriendo las resinas nanohíbridas y el instrumental quirúrgico en Centident. El envío por WhatsApp es inmediato, los precios para clínicas son insuperables y la calidad del acero en los fórceps no tiene comparación.',
    rating: 5,
    specialty: 'Rehabilitación & Estética',
    verified: true,
    date: 'Hace 3 días'
  },
  {
    id: 'test-02',
    name: 'Dr. Alejandro Restrepo C.',
    role: 'Cirujano Maxilofacial',
    clinic: 'Centro Quirúrgico Odontológico',
    city: 'Medellín / Guadalajara',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    comment: 'La puntualidad en la entrega de insumos de bioseguridad y limas rotatorias de endodoncia nos salva las agendas semanales. El proceso de cotización por WhatsApp con el carrito es súper ágil y transparente.',
    rating: 5,
    specialty: 'Cirugía & Implantes',
    verified: true,
    date: 'Hace 1 semana'
  },
  {
    id: 'test-03',
    name: 'Dra. Carolina Mendoza',
    role: 'Ortodoncista Clínica',
    clinic: 'OrthoSmile Especialidades',
    city: 'Lima / Santiago',
    avatar: 'https://images.unsplash.com/photo-1594824813626-d64e03d4948c?auto=format&fit=crop&w=300&q=80',
    comment: 'Los brackets metálicos de bajo perfil y los arcos de nitinol tienen un acabado pulido que mis pacientes agradecen enormemente porque no lastiman los labios. 100% recomendados.',
    rating: 5,
    specialty: 'Ortodoncia Avanzada',
    verified: true,
    date: 'Hace 2 semanas'
  },
  {
    id: 'test-04',
    name: 'Mariana Gómez (Paciente)',
    role: 'Paciente de Tratamiento Restaurador',
    clinic: 'Tratada con Insumos Centident',
    city: 'Monterrey',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    comment: 'Mi odontólogo me explicó que utilizó materiales de alta gama libres de sensibilidad para mis carillas y resinas. No sentí ninguna molestia y el color quedó natural y brillante.',
    rating: 5,
    specialty: 'Experiencia del Paciente',
    verified: true,
    date: 'Hace 3 semanas'
  },
  {
    id: 'test-05',
    name: 'Dr. Fernando Ibáñez',
    role: 'Director Médico & Docente',
    clinic: 'Instituto Dental Integral',
    city: 'Buenos Aires / Cali',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    comment: 'Equipamos las 6 unidades de nuestra clínica con las piezas de mano LED de Centident. Silenciosas, no recalientan y la luz fría integrada proporciona una visibilidad impecable.',
    rating: 5,
    specialty: 'Equipamiento & Docencia',
    verified: true,
    date: 'Hace 1 mes'
  }
];

export const TRUST_METRICS = [
  { value: '+12,500', label: 'Pedidos Entregados', description: 'Envíos rápidos a clínicas de todo el país' },
  { value: '99.4%', label: 'Satisfacción Clínica', description: 'Calificación de especialistas y odontólogos' },
  { value: '100%', label: 'Garantía Sanitaria', description: 'Materiales con registro médico y trazabilidad' },
  { value: '< 15 min', label: 'Respuesta WhatsApp', description: 'Asesoría técnica y cotización instantánea' },
];
