export const APP_CONFIG = {
  name: 'SkillBurst',
  description: 'Plataforma de Microaprendizaje',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

export const API_ENDPOINTS = {
  courses: '/api/courses',
  lessons: '/api/lessons',
  progress: '/api/progress',
  users: '/api/users',
  categories: '/api/categories',
} as const;

export const COURSE_CATEGORIES = {
  office: 'Oficina',
  languages: 'Idiomas',
  technology: 'Tecnología',
  hobbies: 'Hobbies',
  finance: 'Finanzas',
  wellness: 'Bienestar',
} as const;

export const DIFFICULTY_LEVELS = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
} as const;

export const LESSON_TYPES = {
  video: 'video',
  audio: 'audio',
  text: 'texto',
  interactive: 'interactivo',
} as const;

export const ACHIEVEMENT_TYPES = {
  streak: 'racha',
  completion: 'finalización',
  milestone: 'hito',
  speed: 'velocidad',
} as const;

export const STORAGE_KEYS = {
  userProgress: 'skillburst_user_progress',
  offlineLessons: 'skillburst_offline_lessons',
  userPreferences: 'skillburst_user_prefs',
  authToken: 'skillburst_auth_token',
} as const;

export const VIDEO_CONFIG = {
  maxDuration: 300,
  supportedFormats: ['mp4', 'webm'],
  qualityLevels: [360, 480, 720, 1080],
} as const;

export const PAGINATION = {
  coursesPerPage: 12,
  lessonsPerPage: 10,
  searchResultsLimit: 20,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
} as const;

export const TYPOGRAPHY = {
  fontFamily: {
    heading: 'SF Pro Display, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

export const ACCESSIBILITY = {
  focusRingOffset: '2px',
  focusRingWidth: '2px',
} as const;

export type CourseCategory = keyof typeof COURSE_CATEGORIES;
export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;
export type LessonType = keyof typeof LESSON_TYPES;
export type AchievementType = keyof typeof ACHIEVEMENT_TYPES;