// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // --- Estados para los campos del formulario ---
  const [ruc, setRuc] = useState("");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // --- Estados para el token CSRF y la carga ---
  const [csrfToken, setCsrfToken] = useState("");
  const [isLoadingToken, setIsLoadingToken] = useState(true);

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
        // Pedimos el token a nuestro backend
        const response = await fetch("http://localhost:9000/auth/token", { 
          method: "GET",          
          credentials: "include", // ¡Importante! para que el navegador pueda recibir la cookie
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("No se pudo obtener el token de seguridad");
        }
        const data = await response.json();
        setCsrfToken(data.token); // Guardamos el token en el estado
      } catch (error) {
        console.error("Error al obtener el token CSRF:", error);
        alert("No se pudo cargar el formulario de forma segura. Recarga la página.");
      } finally {
        setIsLoadingToken(false); // Dejamos de mostrar el mensaje de carga
      }
    };

    fetchToken();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!csrfToken) {
      alert("El token de seguridad no está listo. Espera un momento.");
      router.refresh();
      return;
    }

    try {
      // 2. URL correcta y envío de credenciales
      const apiUrl = "http://localhost:9000/auth/login";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ¡Importante! para que el navegador envíe la cookie del token CSRF
        body: JSON.stringify({
          ruc: ruc,
          usuario: usuario,
          password: password,
          csrf_token: csrfToken, // 3. Enviamos el token en el cuerpo de la petición
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login exitoso:", data);

        // Guardar el token y actualizar el estado de autenticación
        login(data.token);
        
        // Redirigir al usuario al panel de admin
        router.push("/admin");
      } else {
        const errorData = await response.json();
        console.error("Error de login:", errorData.error || errorData.message);
        alert(`Error: ${errorData.error || errorData.message || "Credenciales incorrectas"}`);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar al servidor. Intenta más tarde.");
    }
  };

  // Mientras se carga el token, mostramos un mensaje
  if (isLoadingToken) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="text-center">
          <p className="text-lg text-gray-600">Cargando formulario seguro...</p>
        </div>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 5. Campo oculto para el token CSRF */}
          <input type="hidden" name="csrf_token" value={csrfToken} />

          {/* Nuevo campo para el RUC */}
          <div>
            <label htmlFor="ruc" className="mb-1 block text-sm font-medium text-gray-700">
              RUC
            </label>
            <input
              id="ruc"
              type="text"
              placeholder="Tu RUC"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nuevo campo para el Usuario */}
          <div>
            <label htmlFor="usuario" className="mb-1 block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              id="usuario"
              type="text"
              placeholder="Tu nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo de Contraseña (se mantiene igual) */}
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Opciones extra (se mantienen) */}
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
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-base font-bold text-white shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}