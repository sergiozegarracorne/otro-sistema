'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute requiredLevel={1}>
      <main className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Panel de Administración
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Bienvenido, {user?.usuario}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Información del Usuario
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ID
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      RUC
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.ruc}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Usuario
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.usuario}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.correo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nivel de Acceso
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user?.nivel}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}