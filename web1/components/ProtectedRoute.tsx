'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredLevel?: number; // Nivel mínimo requerido
}

export default function ProtectedRoute({ children, requiredLevel = 0 }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // No está autenticado, redirigir al login
        router.push('/login');
        return;
      }

      if (requiredLevel > 0 && user && user.nivel < requiredLevel) {
        // No tiene el nivel requerido
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredLevel, router]);

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya se redirigió)
  if (!isAuthenticated) {
    return null;
  }

  // Si no tiene el nivel requerido, no mostrar nada (ya se redirigió)
  if (requiredLevel > 0 && user && user.nivel < requiredLevel) {
    return null;
  }

  return <>{children}</>;
}
