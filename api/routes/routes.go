package routes

import (
	"go-login/controllers"
	"go-login/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// 🌐 Middleware CORS global - Configuración completa
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{
		"http://localhost:3000",
		"http://127.0.0.1:3000",
		"http://localhost:3001",
		"http://127.0.0.1:3001",
	}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"}
	config.AllowHeaders = []string{
		"Origin",
		"Content-Type",
		"Accept",
		"Authorization",
		"X-Requested-With",
		"X-CSRF-Token",
	}
	config.AllowCredentials = true
	config.ExposeHeaders = []string{"Content-Length"}
	config.MaxAge = 12 * 60 * 60 // 12 horas

	r.Use(cors.New(config))

	// --- RUTAS DE LA API (SIN PREFIJO /api) ---

	// 1. Rutas de autenticación bajo /auth
	auth := r.Group("/auth")
	{
		auth.GET("/token", controllers.CSRFTokenHandler) // GET /auth/token
		auth.POST("/login", controllers.LoginHandler)    // POST /auth/login
	}

	// 2. Rutas protegidas que requieren autenticación
	protected := r.Group("/api")
	protected.Use(middleware.AuthMiddleware()) // Aplicar middleware a todas las rutas /api/*
	{
		protected.GET("/me", controllers.Me)          // GET /api/me - Información del usuario
		protected.POST("/logout", controllers.Logout) // POST /api/logout - Cerrar sesión
		// Aquí puedes agregar más rutas protegidas
		// protected.GET("/dashboard", controllers.Dashboard)
		// protected.GET("/profile", controllers.Profile)
	}

	// 3. Rutas públicas
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "¡API funcionando en http://localhost:9000!"})
	})

	r.GET("/test", controllers.HolaMundo) // Ejemplo de ruta pública

	return r
}
