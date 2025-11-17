export interface Product {
  id: string;
  name: string;
  barcode: string;
  category: ProductCategory;
  quantity: number;
  minQuantity: number;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingListItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  completed: boolean;
  createdAt: Date;
}

export interface Statistics {
  totalProducts: number;
  lowStockProducts: number;
  expiringProducts: number;
  totalCategories: number;
}

export type ProductCategory = 
  | 'food'
  | 'cleaning'
  | 'personal_care'
  | 'beverages'
  | 'other';

export type ModalType = 
  | 'home'
  | 'add_product'
  | 'shopping_list'
  | 'statistics'
  | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalType;
}

export interface ProductFormData {
  name: string;
  barcode: string;
  category: ProductCategory;
  quantity: number;
  minQuantity: number;
  expiryDate?: string;
}

export interface ShoppingListFormData {
  productName: string;
  quantity: number;
}

export interface AppState {
  products: Product[];
  shoppingList: ShoppingListItem[];
  activeModal: ModalState;
}

export interface BarcodeScanResult {
  code: string;
  format: string;
}

export const PRODUCT_CATEGORIES = {
  food: 'Comida',
  cleaning: 'Limpieza',
  personal_care: 'Cuidado Personal',
  beverages: 'Bebidas',
  other: 'Otros'
} as const;

export type ProductCategoryLabel = typeof PRODUCT_CATEGORIES[keyof typeof PRODUCT_CATEGORIES];