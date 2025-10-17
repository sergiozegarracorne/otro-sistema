// app/login/page-refactored.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button, Input, Loading } from "@/components/ui";

export default function LoginPageRefactored() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // --- Estados para los campos del formulario ---
  const [ruc, setRuc] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // --- Estados para el token CSRF y la carga ---
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  // 1. useEffect para obtener el token CSRF al cargar la página
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:9000/auth/token", { 
          method: "GET",          
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("No se pudo obtener el token de seguridad");
        }
        
        const data = await response.json();
        setCsrfToken(data.token);
      } catch (error) {
        console.error("Error al obtener el token CSRF:", error);
        setErrors({ general: "No se pudo cargar el formulario de forma segura. Recarga la página." });
      } finally {
        setIsLoadingToken(false);
      }
    };

    fetchToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (!csrfToken) {
      setErrors({ general: "El token de seguridad no está listo. Espera un momento." });
      setIsSubmitting(false);
      return;
    }

    try {
      const apiUrl = "http://localhost:9000/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ruc: ruc,
          usuario: usuario,
          password: password,
          csrf_token: csrfToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);
        login(data.token);
        router.push("/admin");
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.error || errorData.message || "Credenciales incorrectas" });
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrors({ general: "No se pudo conectar al servidor. Intenta más tarde." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mientras se carga el token, mostramos un loading
  if (isLoadingToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <Loading 
          size="lg" 
          text="Cargando formulario seguro..." 
          variant="spinner"
        />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Mostrar error general */}
        {errors.general && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-red-600">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campo oculto para el token CSRF */}
          <input type="hidden" name="csrf_token" value={csrfToken} />

          {/* Campo RUC */}
          <Input
            label="RUC"
            type="text"
            placeholder="Tu RUC"
            value={ruc}
            onChange={(e) => setRuc(e.target.value)}
            error={errors.ruc}
            isRequired
            leftIcon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />

          {/* Campo Usuario */}
          <Input
            label="Usuario"
            type="text"
            placeholder="Tu nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            error={errors.usuario}
            isRequired
            leftIcon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          {/* Campo Contraseña */}
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            isRequired
            showPasswordToggle
            leftIcon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          {/* Opciones extra */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          {/* Botón de Entrar */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Iniciando sesión..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
