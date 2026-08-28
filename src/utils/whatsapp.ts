import { CartItem, Product, QuoteFormData } from '../types';

// Default Support WhatsApp Hotline Number (configurable)
export const DEFAULT_WHATSAPP_NUMBER = '5218125729796'; // Centident Central

export function formatCartToWhatsAppMessage(
  items: CartItem[],
  clientInfo?: {
    name?: string;
    clinic?: string;
    city?: string;
    notes?: string;
    deliveryType?: string;
  },
  discount: number = 0
): string {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  let message = `🦷 *HOLA CENTIDENT | NUEVA SOLICITUD DE PEDIDO*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (clientInfo && (clientInfo.name || clientInfo.clinic)) {
    message += `👤 *DATOS DEL SOLICITANTE:*\n`;
    if (clientInfo.name) message += `• *Doctor/a:* ${clientInfo.name}\n`;
    if (clientInfo.clinic) message += `• *Clínica / Consultorio:* ${clientInfo.clinic}\n`;
    if (clientInfo.city) message += `• *Ciudad / Dirección:* ${clientInfo.city}\n`;
    if (clientInfo.deliveryType) message += `• *Tipo de Entrega:* ${clientInfo.deliveryType}\n`;
    if (clientInfo.notes) message += `• *Observaciones:* ${clientInfo.notes}\n`;
    message += `\n`;
  }

  message += `📦 *DETALLE DE PRODUCTOS (${items.reduce((acc, i) => acc + i.quantity, 0)} items):*\n`;
  items.forEach((item, index) => {
    const itemTotal = (item.product.price * item.quantity).toFixed(2);
    message += `${index + 1}. *${item.product.name}*\n`;
    message += `   └ Ref: \`${item.product.code}\` | Presentación: ${item.product.presentation}\n`;
    message += `   └ Cantidad: *${item.quantity}* x $${item.product.price.toFixed(2)} = *$${itemTotal} USD*\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💵 *Subtotal:* $${subtotal.toFixed(2)} USD\n`;
  if (discount > 0) {
    message += `🏷️ *Descuento por Volumen:* -$${discount.toFixed(2)} USD\n`;
  }
  message += `💰 *TOTAL ESTIMADO:* *$${total.toFixed(2)} USD*\n\n`;
  message += `📍 *Por favor confírmenme disponibilidad inmediata, métodos de pago y tiempo de despacho a mi clínica.* ¡Muchas gracias!`;

  return message;
}

export function formatSingleProductWhatsAppMessage(
  product: Product,
  quantity: number = 1
): string {
  const total = (product.price * quantity).toFixed(2);
  let message = `🦷 *HOLA CENTIDENT | CONSULTA DE PRODUCTO*\n\n`;
  message += `Hola, deseo consultar disponibilidad y precio para el siguiente insumo odontológico:\n\n`;
  message += `📌 *Producto:* ${product.name}\n`;
  message += `🏷️ *Código:* \`${product.code}\`\n`;
  message += `📦 *Presentación:* ${product.presentation}\n`;
  message += `🔢 *Cantidad deseada:* ${quantity} unidad(es)\n`;
  message += `💵 *Precio aproximado:* $${total} USD\n\n`;
  message += `¿Tienen stock para despacho inmediato y factura clínica? Gracias.`;
  return message;
}

export function formatCustomQuoteToWhatsAppMessage(formData: QuoteFormData, cartItems: CartItem[] = []): string {
  let message = `🦷 *HOLA CENTIDENT | SOLICITUD DE COTIZACIÓN PERSONALIZADA*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  message += `👤 *DATOS DEL PROFESIONAL:*\n`;
  message += `• *Dr./Dra.:* ${formData.doctorName}\n`;
  message += `• *Clínica / Institución:* ${formData.clinicName || 'Consultorio Particular'}\n`;
  message += `• *Teléfono / WhatsApp:* ${formData.whatsapp}\n`;
  message += `• *Ciudad / Ubicación:* ${formData.city}\n`;
  if (formData.email) message += `• *Email:* ${formData.email}\n`;
  if (formData.taxId) message += `• *NIT / RUC / Factura:* ${formData.taxId}\n`;
  
  const typeMap = {
    compra_inmediata: '⚡ Despacho Inmediato',
    cotizacion_volumen: '📦 Cotización por Volumen / Distribución',
    equipamiento_clinica: '🏥 Equipamiento de Clínica / Consultorio Completo',
  };
  message += `• *Tipo de Requerimiento:* ${typeMap[formData.orderType]}\n`;
  if (formData.isUrgent) {
    message += `🚨 *PRIORIDAD:* Pedido Urgente (Requerido en menos de 24 horas)\n`;
  }
  message += `\n`;

  if (cartItems.length > 0) {
    message += `📋 *PRODUCTOS SELECCIONADOS DEL CATÁLOGO (${cartItems.length}):*\n`;
    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. ${item.product.name} (Cant: ${item.quantity} - Ref: ${item.product.code})\n`;
    });
    message += `\n`;
  }

  message += `📝 *REQUERIMIENTOS Y NOTAS ESPECÍFICAS:*\n`;
  message += `${formData.notes || 'Solicito cotización formal con mejores descuentos para compra institucional.'}\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Quedo a la espera de su propuesta formal. Saludos cordiales.`;

  return message;
}

export function getWhatsAppUrl(phone: string, text: string): string {
  const sanitizedPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(text)}`;
}
