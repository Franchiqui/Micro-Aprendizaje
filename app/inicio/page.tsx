import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function InicioPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-blue-400 to-gray-300 p-8">
      <div className="text-center border-4 border-red-500 rounded-2xl p-12 bg-white/10 backdrop-blur-sm">
        {/* Icono grande - usando un icono de inventario simple */}
        <div className="text-8xl mb-6 text-white">
          📦
        </div>
        
        {/* Título */}
        <h1 className="text-5xl font-bold text-white mb-8">
          Mi inventario doméstico
        </h1>
        
        {/* Botón de inventario */}
        <Link href="/">
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white text-xl px-8 py-4 rounded-lg transition-colors"
            size="lg"
          >
            Ir al Inventario
          </Button>
        </Link>
      </div>
    </div>
  );
}