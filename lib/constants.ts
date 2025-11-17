export const APP_CONFIG = {
  name: 'Mi Inventario App',
  version: '1.0.0',
  description: 'App móvil para gestionar productos del hogar',
} as const;

export const COLOR_PALETTE = {
  primary: {
    turquoise: '#40E0D0',
    blue: '#1E3A8A',
    black: '#000000',
  },
  gradients: {
    main: 'linear-gradient(135deg, #40E0D0 0%, #1E3A8A 50%, #000000 100%)',
    card: 'linear-gradient(135deg, #40E0D0 0%, #1E3A8A 100%)',
    button: 'linear-gradient(135deg, #40E0D0 0%, #1E3A8A 100%)',
  },
} as const;

export const STORAGE_KEYS = {
  products: 'mi-inventario-products',
  shoppingLists: 'mi-inventario-shopping-lists',
  userPreferences: 'mi-inventario-preferences',
} as const;

export const MODAL_TYPES = {
  addProduct: 'add-product',
  shoppingList: 'shopping-list',
  statistics: 'statistics',
} as const;

export const PRODUCT_CATEGORIES = {
  food: 'food',
  cleaning: 'cleaning',
  personalCare: 'personal-care',
  other: 'other',
} as const;

export const ALERT_THRESHOLDS = {
  lowStock: 3,
  expiryWarningDays: 7,
} as const;

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Inicio', icon: 'Home' },
  { id: 'add-product', label: 'Agregar Producto', icon: 'Plus' },
  { id: 'shopping-list', label: 'Lista Compra', icon: 'ShoppingCart' },
  { id: 'statistics', label: 'Estadísticas', icon: 'BarChart' },
] as const;

export const FORM_SCHEMAS = {
  product: {
    name: { required: true, maxLength: 100 },
    barcode: { required: false, maxLength: 50 },
    category: { required: true },
    quantity: { required: true, min: 1 },
    expiryDate: { required: false },
    minStockLevel: { required: false, min: 0 },
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;