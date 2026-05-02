export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type CartSummary = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  totalItems: number;
};
