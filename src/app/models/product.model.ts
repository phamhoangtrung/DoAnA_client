export interface Product {
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  sale: number;
  type: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export type CartProduct = Product & { quantity: number };

export interface CartAdmin {
  _id: string;
  customerId: string;
  status: string;
  total: number;
  totalProduct: number;
  createdAt: string;
  updatedAt: string;
  orderedProduct: Product[];
}
