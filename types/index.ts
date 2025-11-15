export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  autoPlay: boolean;
  downloadQuality: 'low' | 'medium' | 'high';
  language: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  courseCount: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  categoryId: string;
  instructorId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  rating: number;
  totalStudents: number;
  price: number;
  isFree: boolean;
  tags: string[];
  objectives: string[];
  requirements: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in minutes, always 5 for microlearning
  order: number;
  videoUrl?: string;
  audioUrl?: string;
  content?: string; // HTML content for text-based lessons
  thumbnail?: string;
  resources?: LessonResource[];
  exercises?: Exercise[];
  completed?: boolean;
}

export interface LessonResource {
  id: string;
  lessonId: string;
  title: string;
  type: 'pdf' | 'link' | 'file';
  url: string;
}

export interface Exercise {
  id: string;
  lessonId: string;
  question: string;
  type: 'multiple-choice' | 'true-false' | 'text';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  progress: number; // percentage
  timeSpent: number; // in seconds
  lastPosition?: number; // video timestamp
  completedAt?: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'streak' | 'completion' | 'time' | 'milestone';
  requirement: number; // days, courses, minutes, etc.
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  earnedAt: Date;
}

export interface LearningStats {
  totalTimeLearned: number; // in minutes
  currentStreak: number; // days
  longestStreak: number; // days
  coursesCompleted: number;
  lessonsCompleted: number;
  dailyGoal: number; // minutes per day
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form types
export interface SearchFilters {
  query?: string;
  category?: string;
  difficulty?: string[];
  duration?: {
    min?: number;
    max?: number;
  };
  rating?: number;
}

export interface CourseFormData {
  title: string;
  description: string;
  categoryId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  tags: string[];
}

export interface LessonFormData {
  title: string;
  description: string;
  content?: string;
}

// UI Component props
export interface CourseCardProps {
  course: Course & {
    progress?: number;
    category?: Category;
    instructor?: User;
    isEnrolled?: boolean;
    isFavorite?: boolean;
    isDownloaded?: boolean; // for offline mode
    lastAccessed?: Date; // for resume functionality
    nextLesson?: Lesson; // for quick resume
    estimatedCompletionTime?: number; // based on user progress
    streakBonusActive?: boolean; // if user is on a learning streak
    recommended?: boolean; // if algorithm recommends this course
    trending?: boolean; // if course is trending in the platform
    newContentAvailable?: boolean; // if new lessons were added since last visit
    communityRating?: number; // aggregated from user reviews
    completionRate?: number; // percentage of enrolled users who completed
    averageTimeToComplete?: number; // in days
    supportAvailable?: boolean; // if instructor provides support
    certificateAvailable?: boolean; // if course offers certificate
    mobileOptimized?: boolean; // specifically optimized for mobile
    accessibilityFeatures?: string[]; // list of accessibility features
    downloadSize?: number; // in MB for offline mode
    prerequisites?: Course[]; // required courses to take before this one
    relatedCourses?: Course[]; // similar courses user might like
    learningPathPosition?: number; // position in a learning path sequence
    skillLevelGain?: number; // estimated skill improvement (0-100)
    practicalExercisesCount?: number; // number of hands-on exercises
    projectBased?: boolean; // if course includes a final project
    peerReviewEnabled?: boolean; // if course has peer review system
    groupLearningAvailable?: boolean; // if there are study groups for this course
    liveSessionsAvailable?: boolean; // if instructor offers live Q&A sessions
    updatedRecently?: boolean; // if content was updated in last 30 days
    popularInRegion?: boolean; // if course is popular in user's region
    languageSupport?: string[]; // available subtitle languages
    learningStyle?: ('visual' | 'auditory' | 'kinesthetic')[]; // supported learning styles
    timeCommitment?: 'light' | 'moderate' | 'intensive'; // weekly time requirement
    careerRelevance?: string[]; // relevant job roles or industries
    techRequirements?: string[]; // required software/tools
    learningOutcomesVerified?: boolean; // if outcomes are verified by platform
    instructorResponseTime?: number; // average response time in hours
    communitySize?: number; // number of active learners in this course
    discussionQuality?: number; // quality of course discussions (1-5)
    resourceQuality?: number; // quality of additional resources (1-5)
    practicalApplicationScore?: number; // how practical the skills are (1-5)
    retentionRate?: number; // percentage of users who retain knowledge after completion
    jobRelevanceScore?: number; // how relevant to job market (1-5)
    difficultyAccuracy?: number; // how accurate the difficulty rating is (1-5)
    pacingScore?: number; // how well-paced the content is (1-5)
    productionQuality?: number; // video/audio production quality (1-5)
    accessibilityScore?: number; // accessibility compliance score (1-5)
    mobileExperienceScore?: number; // mobile learning experience (1-5)
    offlineExperienceScore?: number; // offline learning experience (1-5)
    overallSatisfaction?: number; // overall user satisfaction (1-5)
    
    badges?: {
      popularNow?: boolean;      // high enrollment recently
      topRated?: boolean;        // consistently high ratings
      quickCompletion?: boolean; // high completion rate with good ratings
      expertInstructor?: boolean;// instructor with proven expertise
      updatedContent?: boolean;   // recently updated material
      communityFavorite?: boolean;// highly rated by community
      careerBoost?: boolean;     // proven career impact
      skillVerified?: boolean;   // skills can be verified/certified
      projectBased?: boolean;   // includes practical projects
      interactiveLearning?: boolean;// high engagement features
      mobileFirst?: boolean;     // optimized for mobile learning
      accessibleDesign?: boolean;// excellent accessibility features
      fastPaced?: boolean;       // quick skill acquisition focus
      comprehensiveCoverage?: boolean;// covers topic thoroughly
      beginnerFriendly?: boolean;// excellent for beginners
      advancedContent?: boolean; // includes advanced topics
      industryStandard?: boolean;// teaches industry-standard practices
      trendingSkill?: boolean;   // teaches currently in-demand skills
      freeResources?: boolean;   // includes free additional resources
      lifetimeAccess?: boolean;   // permanent access to course materials
      moneyBackGuarantee?: boolean;// satisfaction guarantee available
      certificateIncluded?: boolean;// completion certificate provided
      peerNetwork?: boolean;     // access to learner community
      mentorSupport?: boolean;   // includes mentor guidance
      jobPreparation?: boolean;   // specifically prepares for jobs/interviews
      portfolioBuilding?: boolean;// helps build work portfolio
      realWorldProjects?: boolean;// includes real-world project work
      flexibleSchedule?: boolean;// self-paced with no deadlines
      structuredPath?: boolean;   // clear learning progression path
      multimediaRich?: boolean;   // uses various media formats effectively
      gamifiedLearning?: boolean;// includes game-like elements
      progressTracking?: boolean;// detailed progress analytics available
      personalizedRecommendations?: boolean;// gets personalized suggestions based on progress
    
      streakRewardActiveToday? :boolean,// special reward available for maintaining streak today}}}