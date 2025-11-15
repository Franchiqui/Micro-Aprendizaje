import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  avatar: z.string().url().optional(),
  interests: z.array(z.string()).default([]),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const courseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  category: z.enum(['office', 'languages', 'technology', 'hobbies', 'finance', 'wellness']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  duration: z.number().min(1),
  rating: z.number().min(0).max(5).default(0),
  thumbnail: z.string().url(),
  tags: z.array(z.string()).default([]),
  instructorId: z.string().min(1),
  published: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const lessonSchema = z.object({
  id: z.string().min(1),
  courseId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  duration: z.number().min(1).max(5),
  order: z.number().min(0),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  content: z.string().optional(),
  transcript: z.string().optional(),
  exercise: z.object({
    type: z.enum(['practice', 'quiz', 'reflection']),
    question: z.string().min(1),
    answer: z.string().optional()
  }).optional(),
  published: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const progressSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  courseId: z.string().min(1),
  lessonId: z.string().min(1),
  completed: z.boolean().default(false),
  timeSpent: z.number().min(0).default(0),
  currentTime: z.number().min(0).default(0),
  lastAccessedAt: z.date(),
  completedAt: z.date().optional()
});

export const achievementSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  type: z.enum(['streak', 'completion', 'milestone', 'speed']),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string(),
  earnedAt: z.date()
});

export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  categories: z.array(z.enum(['office', 'languages', 'technology', 'hobbies', 'finance', 'wellness'])).optional(),
  difficulties: z.array(z.enum(['beginner', 'intermediate', 'advanced'])).optional(),
  durationRange: z.tuple([z.number(), z.number()]).optional(),
  minRating: z.number().min(0).max(5).optional(),
  tags: z.array(z.string()).optional()
});

export const userPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']).default('system'),
  language: z.string().default('es'),
  autoPlayNextLesson: z.boolean().default(true),
  downloadQuality: z.enum(['low', 'medium', 'high']).default('medium'),
  notificationsEnabled: z.boolean().default(true),
  offlineModeEnabled: z.boolean().default(false)
});

export const createCourseSchema = courseSchema.pick({
  title: true,
  description: true,
  category: true,
  difficulty: true,
  tags: true,
  thumbnail: true
}).extend({
  lessons: z.array(lessonSchema.pick({
    title: true,
    description: true,
    duration: true,
    content: true,
    exercise: true
  })).min(1)
});

export const updateProgressSchema = progressSchema.pick({
  completed: true,
  timeSpent: true,
  currentTime: true
});

export const fileUploadSchema = z.object({
  file: z.instanceof(File).refine((file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'audio/mpeg'];
    return validTypes.includes(file.type);
  }, 'Tipo de archivo no válido'),
  maxSize: z.number().default(50 * 1024 * 1024)
}).refine((data) => data.file.size <= data.maxSize, 'Archivo demasiado grande');

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Nombre requerido').max(100),
  email: z.string().email('Email inválido'),
  subject: z.string().min(1, 'Asunto requerido').max(200),
  message: z.string().min(10, 'Mensaje demasiado corto').max(1000)
});

export type User = z.infer<typeof userSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type Progress = z.infer<typeof progressSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type SearchFilters = z.infer<typeof searchFiltersSchema>;
export type UserPreferences = z.infer<typeof userPreferencesSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateProgressInput = z.infer<typeof updateProgressSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const validateUser = (data: unknown): User => userSchema.parse(data);
export const validateCourse = (data: unknown): Course => courseSchema.parse(data);
export const validateLesson = (data: unknown): Lesson => lessonSchema.parse(data);
export const validateProgress = (data: unknown): Progress => progressSchema.parse(data);
export const validateSearchFilters = (data: unknown): SearchFilters => searchFiltersSchema.parse(data);
export const validateCreateCourse = (data: unknown): CreateCourseInput => createCourseSchema.parse(data);
export const validateUpdateProgress = (data: unknown): UpdateProgressInput => updateProgressSchema.parse(data);
export const validateFileUpload = (data: unknown): FileUploadInput => fileUploadSchema.parse(data);
export const validateContactForm = (data: unknown): ContactFormInput => contactFormSchema.parse(data);

export const safeParseUser = (data: unknown) => userSchema.safeParse(data);
export const safeParseCourse = (data: unknown) => courseSchema.safeParse(data);
export const safeParseLesson = (data: unknown) => lessonSchema.safeParse(data);
export const safeParseProgress = (data: unknown) => progressSchema.safeParse(data);

export const isValidEmail = (email: string): boolean => {
  return userSchema.shape.email.safeParse(email).success;
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
};

export const sanitizeSearchQuery = (query: string): string => {
  return query.trim().replace(/[<>]/g, '').substring(0, 200);
};