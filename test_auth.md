# 🧪 Guía de Pruebas del Sistema de Autenticación

## Pasos para Probar el Sistema

### 1. Iniciar el Backend
```bash
cd api
go run main.go
```

**Verificaciones esperadas:**
- ✅ Conectado a MySQL correctamente
- ✅ Tabla 2025_sessions creada/verificada correctamente
- ✅ Servidor corriendo en http://localhost:9000

### 2. Iniciar el Frontend
```bash
cd web1
npm run dev
```

**Verificaciones esperadas:**
- ✅ Servidor corriendo en http://localhost:3000
- ✅ Sin errores de CORS

### 3. Probar el Flujo Completo

#### Paso 1: Acceder a la página de login
- Ve a: http://localhost:3000/login
- **Esperado:** Página de login se carga sin errores

#### Paso 2: Hacer login
- Ingresa credenciales válidas
- **Esperado:** 
  - Token se crea en la base de datos
  - Usuario es redirigido a /admin
  - No hay errores de "Token inválido"

#### Paso 3: Verificar autenticación
- Ve a: http://localhost:3000/admin
- **Esperado:** 
  - Página de admin se carga
  - Información del usuario se muestra
  - No hay errores de autenticación

#### Paso 4: Probar logout
- Haz clic en "Cerrar Sesión"
- **Esperado:** 
  - Sesión se elimina de la base de datos
  - Usuario es redirigido a /login

### 4. Verificar en la Base de Datos

```sql
-- Ver sesiones activas
SELECT * FROM 2025_sessions WHERE expires_at > NOW();

-- Ver usuarios
SELECT * FROM tbl_user_2025;
```

### 5. Logs de Depuración

En la consola del backend deberías ver:
- `✅ [AUTH] Token válido para usuario ID: X` (cuando el token es válido)
- `🔍 [AUTH] Token inválido: X` (cuando el token no es válido)

## Problemas Comunes y Soluciones

### Error: "Token inválido o expirado"
- **Causa:** El token no existe en la base de datos
- **Solución:** Verificar que el login esté creando la sesión correctamente

### Error: "Failed to fetch"
- **Causa:** Problema de CORS o servidor no corriendo
- **Solución:** Verificar configuración CORS y que ambos servidores estén corriendo

### Error: "No se pudo crear la sesión"
- **Causa:** Tabla 2025_sessions no existe
- **Solución:** Verificar que las migraciones se ejecutaron correctamente
