
export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: Size[];
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
