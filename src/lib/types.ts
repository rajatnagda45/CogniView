export type SalesOrder = {
  order_id: string;
  order_date: string;
  customer_name: string;
  email: string;
  phone: string;
  product_sku: string;
  product_name: string;
  category: string;
  unit_price_inr: number;
  quantity: number;
  total_amount_inr: number;
  city: string;
  state: string;
  pin_code: string;
  payment_method: string;
  order_status: string;
  is_repeat_customer: boolean;
};
