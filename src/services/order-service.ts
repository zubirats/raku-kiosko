import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/stores/cart-store';

const RESTAURANT_ID = import.meta.env.VITE_RESTAURANT_ID;

export interface CreateOrderParams {
  items: CartItem[];
  total: number;
  loyaltyMemberId?: string | null;
  customerWhatsapp?: string;
}

export async function createKioskOrder(params: CreateOrderParams) {
  const { items, total, loyaltyMemberId, customerWhatsapp } = params;

  // Map cart items to order items format
  const orderItems = items.map((item) => ({
    menu_item_id: item.menuItemId,
    quantity: item.quantity,
    unit_price: item.price,
    subtotal: item.price * item.quantity,
    modifiers: item.modifiers,
    notes: null,
    course: 'curso_1', // All kiosk orders are single course
    status: 'pending',
  }));

  // Create the order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      restaurant_id: RESTAURANT_ID,
      order_type: 'para_llevar',
      source: 'kiosk',
      total_amount: total,
      tax_amount: 0, // Always 0% for para llevar
      loyalty_member_id: loyaltyMemberId,
      customer_whatsapp: customerWhatsapp,
      status: 'pending_payment',
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Insert order items
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(
      orderItems.map((item) => ({
        ...item,
        order_id: order.id,
        restaurant_id: RESTAURANT_ID,
      }))
    );

  if (itemsError) throw itemsError;

  // Get order number
  const { data: orderWithNumber } = await supabase
    .from('orders')
    .select('order_number')
    .eq('id', order.id)
    .single();

  return {
    orderId: order.id,
    orderNumber: orderWithNumber?.order_number || 'K000',
  };
}

export async function confirmOrderPayment(orderId: string, paymentAttemptId: string) {
  const { error } = await supabase.rpc('confirm_order_payment', {
    p_order_id: orderId,
    p_payment_attempt_id: paymentAttemptId,
  });

  if (error) throw error;
}
