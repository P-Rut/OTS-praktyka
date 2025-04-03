export type Entities = 'user' | 'product' | 'order';

export interface User {
  id: number;
  name: string;
  email: string;
  type: 'user';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  type: 'product';
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  type: 'order';
}
