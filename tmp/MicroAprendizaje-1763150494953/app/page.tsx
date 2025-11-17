import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'SkillBurst - Plataforma de Microaprendizaje',
  description: 'Domina nuevas habilidades con lecciones de 5 minutos. Cursos de Excel, idiomas, finanzas y más.',
  keywords: 'microaprendizaje, cursos, habilidades, lecciones, educación',
  openGraph: {
    title: 'SkillBurst - Plataforma de Microaprendizaje',
    description: 'Domina nuevas habilidades con lecciones de 5 minutos',
    type: 'website',
    locale: 'es_ES',
  },
}

interface Course {
  id: string
  title: string
  description: string
  category: string
  duration: number
  difficulty: 'principiante' | 'intermedio' | 'avanzado'
  rating: number
  progress: number
  imageUrl: string
  tags: string[]
  lessonCount: number
}

const featuredCourses: Course[] = [
  {
    id: '1',
    title: 'Excel Básico en 5 Minutos',
    description: 'Domina las funciones esenciales de Excel para el trabajo diario',
    category: 'oficina',
    duration: 18,
    difficulty: 'principiante',
    rating: 4.8,
    progress: 0,
    imageUrl: '/courses/excel-basico.jpg',
    tags: ['excel', 'oficina', 'productividad'],
    lessonCount: 4,
  },
  {
    id: '2',
    title: 'Japonés para Viajeros',
    description: 'Frases esenciales para tu primer viaje a Japón',
    category: 'idiomas',
    duration: 18,
    difficulty: 'principiante',
    rating: 4.7,
    progress: 0,
    imageUrl: '/courses/japones-viajeros.jpg',
    tags: ['japonés', 'viajes', 'idiomas'],
    lessonCount: 4,
  },
  {
    id: '3',
    title: 'Finanzas Personales Sencillas',
    description: 'Toma el control de tu dinero en minutos al día',
    category: 'finanzas',
    duration: 18,
    difficulty: 'principiante',
    rating: 4.9,
    progress: 0,
    imageUrl: '/courses/finanzas-personales.jpg',
    tags: ['finanzas', 'ahorro', 'presupuesto'],
    lessonCount: 4,
  },
  {
    id: '4',
    title: 'Meditación para Principiantes',
    description: 'Encuentra calma en 5 minutos al día',
    category: 'bienestar',
    duration: 19,
    difficulty: 'principiante',
    rating: 4.6,
    progress: 0,
    imageUrl: '/courses/meditacion-principiantes.jpg',
    tags: ['meditación', 'mindfulness', 'bienestar'],
    lessonCount: 4,
  },
]

function CourseCard({ course }: { course: Course }) {
  return (
    <Link 
      href={`/course/${course.id}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.difficulty === 'principiante' ? 'bg-green-100 text-green-800' :
            course.difficulty === 'intermedio' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(course.rating))}
              {'☆'.repeat(5 - Math.floor(course.rating))}
            </div>
            <span className="text-sm text-gray-500">({course.rating})</span>
          </div>
          <span className="text-sm text-gray-500">{course.duration} min</span>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500">{course.lessonCount} lecciones</span>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {course.category}
          </span>
        </div>
      </div>
    </Link>
  )
}

function LoadingCourseCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-video bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
      </div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Aprende habilidades nuevas en{' '}
            <span className="text-yellow-300">5 minutos</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Microlecciones diseñadas para tu vida ocupada. Domina Excel, idiomas, finanzas y más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Explorar Cursos
            </Link>
            <Link
              href="/onboarding"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Comenzar Ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryFilter() {
  const categories = [
    { id: 'all', name: 'Todos', count: featuredCourses.length },
    { id: 'oficina', name: 'Oficina', count: featuredCourses.filter(c => c.category === 'oficina').length },
    { id: 'idiomas', name: 'Idiomas', count: featuredCourses.filter(c => c.category === 'idiomas').length },
    { id: 'finanzas', name: 'Finanzas', count: featuredCourses.filter(c => c.category === 'finanzas').length },
    { id: 'bienestar', name: 'Bienestar', count: featuredCourses.filter(c => c.category === 'bienestar').length },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          className="px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm font-medium"
        >
          {category.name} ({category.count})
        </button>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cursos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros cursos más populares diseñados para aprender rápido y aplicar inmediatamente
            </p>
          </div>

          <div className="mb-8">
            <CategoryFilter />
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <LoadingCourseCard key={i} />
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </Suspense>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Ver Todos los Cursos
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb -2">Lecciones de 5 Minutos</h3>
              <p className="text-gray+600">Aprende en pequeños bloques que se adaptan a tu rutina diaria</p>
            </div>
            
            <div>
              <div className="w+16 h+16 bg-green+100 rounded+full flex items+center justify+center mx+auto mb+4">
                <svg className= "w+8 h+8 text+green+600" fill= "none" stroke= "currentColor" viewBox= "0 0 24 24">
                  <path strokeLinecap= "round" strokeLinejoin= "round" strokeWidth= {2} d= "M9+12l2+2+4+4M7.835+4.697a3.42+3.42+0+001.946+.806+3.42+3.42+0+013.138+3.138+3.42+3.42+0+00.806+1.945m.005+10.362a3.42+3.42+0+01-.806+1.945+3.42+3.42+0+01+3.138+3.138a3.42+3.42+0+001.945.806m+10.362+.005a3.42+3.42+0+001.945-.806+3.42+3.42+0+013.138+3.138a3.42+3.42+0+00.806+1.945m+10.362-.005a3.42+3.42+0+00.806+1.945a3.42+3.42+0+01+3.138+3.138a3.42+3.42+0+001.945.806m+10.362-.005a3.42+3.42+0+01-.806+1.945a3.42+3.42+0+01+3.138+3.138a3.42+3.42+0+001.945.806" />
                </svg>
              </div>
              <h3 className= "text+xl font-semibold mb -2">Progreso Visual</h3>
              <p className= "text-gray -600">Sigue tu avance con dashboards interactivos y logros desbloqueables</p>
            </div>
            
            <div>
              <div className= "w -16 h -16 bg -purple -100 rounded -full flex items -center justify -center mx -auto mb -4">
                <svg className= "w -8 h -8 text -purple -600" fill= "none" stroke= "currentColor" viewBox= "0 0 24 24">
                  <path strokeLinecap= "round" strokeLinejoin= "round" strokeWidth= {2} d= "M3 +15a4 +4 +0 +004 +4h9a5 +5 +0 +10-.1 -9.999 +5 +5 +0 +10 +9.9 +2z" />
                </svg>
              </div>
              <h3 className= "text+xl font-semibold mb -2">Modo Offline</h3>
              <p className= "text-gray -600">Descarga lecciones y aprende sin conexión a internet</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}