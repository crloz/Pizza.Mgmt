export interface CreateCustomerInput {
  firstName: string;
  lastName: string;
  phone: string;
}

export const PizzaSize = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large',
} as const;
export type PizzaSize = (typeof PizzaSize)[keyof typeof PizzaSize];

export const PizzaType = {
  Margherita: 'Margherita',
  Pepperoni: 'Pepperoni',
  Hawaiian: 'Hawaiian',
  Vegetarian: 'Vegetarian',
} as const;
export type PizzaType = (typeof PizzaType)[keyof typeof PizzaType];

export const OrderStatus = {
  Received: 'Received',
  Preparing: 'Preparing',
  Baking: 'Baking',
  Delivering: 'Delivering',
  Delivered: 'Delivered',
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface CreateOrderInput {
  totalPrice: number;
  pizzaSize: PizzaSize;
  pizzaType: PizzaType;
  deliveryAddress: string;
  customer: CreateCustomerInput;
}
