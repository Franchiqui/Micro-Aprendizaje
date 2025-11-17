import { z } from 'zod';

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre no puede exceder 100 caracteres'),
  barcode: z.string().min(1, 'El código de barras es requerido').max(50, 'El código de barras no puede exceder 50 caracteres'),
  category: z.enum(['food', 'cleaning', 'other'], {
    errorMap: () => ({ message: 'Selecciona una categoría válida' })
  }),
  quantity: z.number().min(0, 'La cantidad no puede ser negativa').max(9999, 'La cantidad es demasiado grande'),
  minQuantity: z.number().min(0, 'La cantidad mínima no puede ser negativa').max(9999, 'La cantidad mínima es demasiado grande'),
  expirationDate: z.string().optional(),
  price: z.number().min(0, 'El precio no puede ser negativo').max(999999, 'El precio es demasiado alto').optional(),
  unit: z.string().max(20, 'La unidad no puede exceder 20 caracteres').optional(),
  notes: z.string().max(500, 'Las notas no pueden exceder 500 caracteres').optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

export const shoppingListSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre no puede exceder 100 caracteres'),
  items: z.array(z.object({
    productId: z.string().uuid(),
    name: z.string().min(1, 'El nombre del producto es requerido'),
    quantity: z.number().min(1, 'La cantidad debe ser al menos 1'),
    purchased: z.boolean().default(false)
  })).default([]),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional()
});

export const userSettingsSchema = z.object({
  notifications: z.object({
    lowStock: z.boolean().default(true),
    expiration: z.boolean().default(true),
    shoppingList: z.boolean().default(true)
  }),
  theme: z.enum(['light', 'dark', 'auto']).default('auto'),
  language: z.string().default('es'),
  autoCreateShoppingList: z.boolean().default(true),
  lowStockThreshold: z.number().min(1).max(100).default(3)
});

export const scanResultSchema = z.object({
  barcode: z.string().min(1, 'Código de barras requerido'),
  productName: z.string().optional(),
  brand: z.string().optional(),
  imageUrl: z.string().url().optional(),
  success: z.boolean(),
  error: z.string().optional()
});

export type Product = z.infer<typeof productSchema>;
export type ShoppingList = z.infer<typeof shoppingListSchema>;
export type UserSettings = z.infer<typeof userSettingsSchema>;
export type ScanResult = z.infer<typeof scanResultSchema>;

export const validateProduct = (data: unknown): Product => {
  return productSchema.parse(data);
};

export const validateShoppingList = (data: unknown): ShoppingList => {
  return shoppingListSchema.parse(data);
};

export const validateUserSettings = (data: unknown): UserSettings => {
  return userSettingsSchema.parse(data);
};

export const validateScanResult = (data: unknown): ScanResult => {
  return scanResultSchema.parse(data);
};

export const sanitizeProductInput = (data: Partial<Product>): Partial<Product> => {
  return {
    ...data,
    name: data.name?.trim(),
    barcode: data.barcode?.trim(),
    notes: data.notes?.trim(),
    unit: data.unit?.trim()
  };
};

export const isProductExpiring = (product: Product, daysThreshold: number = 7): boolean => {
  if (!product.expirationDate) return false;
  
  const expiration = new Date(product.expirationDate);
  const today = new Date();
  const diffTime = expiration.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= daysThreshold && diffDays >= 0;
};

export const isLowStock = (product: Product): boolean => {
  return product.quantity <= product.minQuantity;
};

export const generateProductId = (): string => {
  return crypto.randomUUID();
};

export const validateBarcode = (barcode: string): boolean => {
  const barcodeRegex = /^[0-9]{8,14}$/;
  return barcodeRegex.test(barcode);
};

export const calculateShoppingSuggestions = (products: Product[]): Product[] => {
  return products.filter(product => 
    isLowStock(product) || 
    (product.expirationDate && isProductExpiring(product, 3))
  );
};