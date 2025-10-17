// app/admin/page-example.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Modal, Loading, Card } from "@/components/ui";

export default function AdminPageExample() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular una petición
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Datos enviados:", formData);
    setIsLoading(false);
    setIsModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600">Bienvenido, {user?.usuario}</p>
            </div>
            <Button variant="danger" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Card de Estadísticas */}
          <Card
            title="Usuarios Activos"
            subtitle="Total de usuarios registrados"
            variant="elevated"
            hover
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-green-600 mt-1">+12% este mes</div>
            </div>
          </Card>

          {/* Card de Ventas */}
          <Card
            title="Ventas del Mes"
            subtitle="Ingresos totales"
            variant="outlined"
            hover
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$45,678</div>
              <div className="text-sm text-gray-600 mt-1">+8% vs mes anterior</div>
            </div>
          </Card>

          {/* Card de Productos */}
          <Card
            title="Productos"
            subtitle="En inventario"
            variant="flat"
            hover
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">567</div>
              <div className="text-sm text-orange-600 mt-1">23 bajos en stock</div>
            </div>
          </Card>
        </div>

        {/* Sección de Acciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario de Contacto */}
          <Card title="Enviar Mensaje" variant="default">
            <form className="space-y-4">
              <Input
                label="Nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre completo"
                isRequired
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
                isRequired
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1"
                >
                  Enviar Mensaje
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormData({ name: "", email: "", message: "" })}
                >
                  Limpiar
                </Button>
              </div>
            </form>
          </Card>

          {/* Lista de Acciones Rápidas */}
          <Card title="Acciones Rápidas" variant="default">
            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-start"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              >
                Crear Nuevo Usuario
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                className="w-full justify-start"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
              >
                Ver Reportes
              </Button>
              
              <Button
                variant="success"
                size="lg"
                className="w-full justify-start"
                leftIcon={
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                }
              >
                Exportar Datos
              </Button>
            </div>
          </Card>
        </div>

        {/* Modal de Confirmación */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Confirmar Envío"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              ¿Estás seguro de que quieres enviar este mensaje?
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <p><strong>Nombre:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Mensaje:</strong> {formData.message}</p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="primary"
                onClick={handleSubmit}
                isLoading={isLoading}
                className="flex-1"
              >
                {isLoading ? "Enviando..." : "Confirmar Envío"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
