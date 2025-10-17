'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <ProtectedRoute requiredLevel={1}>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header mejorado */}
        <nav className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                  Panel de Administración
                </h1>
                  <p className="text-sm text-gray-500">
                    Sistema de gestión empresarial
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-500">{formatTime(currentTime)}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {getGreeting()}, {user?.usuario}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          {/* Sección 1: Información del Sistema */}
          <div className="mb-8">
            {/* Banner del Sistema */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg mb-6">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white tracking-wide">SISTEMA DE GESTIÓN EMPRESARIAL</h2>
                    <p className="text-blue-100 mt-2 text-sm">Panel de Control Administrativo</p>
                  </div>
                  <div className="text-right text-white">
                    <p className="text-sm font-medium">{user?.ruc}</p>
                    <p className="text-sm text-blue-100">{user?.usuario} :: {user?.correo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards de Información del Usuario */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">ID Usuario</p>
                      <p className="text-2xl font-bold text-gray-900">{user?.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">RUC</p>
                      <p className="text-2xl font-bold text-gray-900">{user?.ruc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Usuario</p>
                      <p className="text-2xl font-bold text-gray-900">{user?.usuario}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Nivel</p>
                      <p className="text-2xl font-bold text-gray-900">{user?.nivel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección 2: Módulos Principales */}
          <div className="mb-8">
            {/* Banner de Módulos */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg mb-6">
              <div className="px-6 py-6">
                <h2 className="text-2xl font-semibold text-white tracking-wide">MÓDULOS PRINCIPALES</h2>
                <p className="text-blue-100 mt-2 text-sm">Gestión integral del sistema empresarial</p>
              </div>
            </div>

            {/* Grid de Módulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* VENTAS */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">VENTAS</h3>
                <p className="text-sm text-gray-500 mt-2">Gestión de ventas y facturación</p>
              </div>
            </div>

            {/* PRODUCTOS */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">PRODUCTOS</h3>
                <p className="text-sm text-gray-500 mt-2">Catálogo de productos y servicios</p>
              </div>
            </div>

            {/* CLIENTES */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">CLIENTES</h3>
                <p className="text-sm text-gray-500 mt-2">Base de datos de clientes</p>
              </div>
            </div>

            {/* REPORTES */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">REPORTES</h3>
                <p className="text-sm text-gray-500 mt-2">Análisis y estadísticas</p>
              </div>
            </div>

            {/* USUARIOS */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">USUARIOS</h3>
                <p className="text-sm text-gray-500 mt-2">Gestión de usuarios del sistema</p>
              </div>
            </div>

            {/* ALMACÉN */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">ALMACÉN</h3>
                <p className="text-sm text-gray-500 mt-2">Control de inventario</p>
              </div>
            </div>

            {/* PROVEEDORES */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">PROVEEDORES</h3>
                <p className="text-sm text-gray-500 mt-2">Gestión de proveedores</p>
              </div>
            </div>

            {/* CONFIGURACIÓN */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <div className="p-6 text-center">
                <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors duration-300">
                  <svg className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors duration-300">CONFIGURACIÓN</h3>
                <p className="text-sm text-gray-500 mt-2">Ajustes del sistema</p>
              </div>
            </div>
            </div>
          </div>

          {/* Sección 3: Paneles de Información */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Panel de Información del Usuario */}
            <div className="bg-white shadow-lg rounded-lg border border-gray-200">
              {/* Header del Panel */}
              <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h2 className="text-lg font-semibold">Información del Usuario</h2>
                </div>
              </div>
              
              {/* Contenido del Panel */}
              <div className="p-6">
                <dl className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{user?.id}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">RUC</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{user?.ruc}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">Usuario</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{user?.usuario}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">Correo</dt>
                    <dd className="text-sm text-gray-900 font-semibold">{user?.correo}</dd>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <dt className="text-sm font-medium text-gray-500">Nivel de Acceso</dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Nivel {user?.nivel}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Panel de Acciones Rápidas */}
            <div className="bg-white shadow-lg rounded-lg border border-gray-200">
              {/* Header del Panel */}
              <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h2 className="text-lg font-semibold">Acciones Rápidas</h2>
                </div>
              </div>
              
              {/* Contenido del Panel */}
              <div className="p-6">
                <div className="space-y-4">
                  <a
                    href="/admin/change-password"
                    className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 group"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-200">
                        p
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-900">
                        Cambiar Contraseña
                      </h3>
                      <p className="text-sm text-gray-500">
                        Actualiza tu contraseña de acceso
                      </p>
                    </div>
                    <div className="ml-auto">
                      <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gray-400 rounded-lg flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        Reportes (Próximamente)
                      </h3>
                      <p className="text-sm text-gray-400">
                        Genera reportes del sistema
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 bg-gray-400 rounded-lg flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">
                        Configuración (Próximamente)
                      </h3>
                      <p className="text-sm text-gray-400">
                        Configuración del sistema
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Accesos Rápidos */}
          <div className="mt-8">
            <div className="bg-white shadow-lg rounded-lg border border-gray-200">
              {/* Header del Panel */}
              <div className="bg-blue-600 text-white px-6 py-4 rounded-t-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h2 className="text-lg font-semibold">Accesos Rápidos</h2>
                </div>
              </div>
              
              {/* Contenido del Panel */}
              <div className="p-6">
                {/* Primera fila de botones */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <button className="flex flex-col items-center p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-sm font-medium">Apps</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="text-sm font-medium">Bookmarks</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium">Users</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">Notes</span>
                  </button>
                </div>

                {/* Segunda fila de botones */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <button className="flex flex-col items-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-sm font-medium">Reports</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm font-medium">Comments</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">Photos</span>
                  </button>

                  <button className="flex flex-col items-center p-4 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="text-sm font-medium">Tags</span>
                  </button>
                </div>

                {/* Botón grande inferior */}
                <div className="mt-4">
                  <button className="w-full flex items-center justify-center p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 group">
                    <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span className="text-lg font-medium">Website</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Informativo */}
          <div className="mt-8 space-y-4">
            {/* Información del Sistema */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Sistema en línea</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Versión 1.0.0 | Última actualización: {new Date().toLocaleDateString('es-ES')}
                  </div>
                </div>
              </div>
            </div>

            {/* Banner Informativo */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl shadow-lg">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-white font-medium">
                      Sistema de Gestión Empresarial - Panel de Administración
                    </p>
                  </div>
                  <div className="text-blue-200 text-sm">
                    Acceso seguro y encriptado
                  </div>
                </div>
              </div>
            </div>

            {/* Información del Desarrollador */}
            <div className="bg-gray-50 rounded-xl border border-gray-200">
              <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Desarrollado por: Sistema de Gestión Empresarial
                  </div>
                  <div className="text-sm text-gray-500">
                    © 2025 - Todos los derechos reservados
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