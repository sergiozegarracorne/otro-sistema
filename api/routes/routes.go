package routes

import (
	"go-login/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// 🌐 Middleware CORS global (se queda igual)
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	r.Use(cors.New(config))

	// --- RUTAS DE LA API (SIN PREFIJO /api) ---

	// 1. Rutas de autenticación bajo /auth
	auth := r.Group("/auth")
	{
		auth.GET("/token", controllers.CSRFTokenHandler) // GET /auth/token
		auth.POST("/login", controllers.LoginHandler)    // POST /auth/login
	}

	// 2. Otras rutas (si las tienes)
	// Nota: Tenías una ruta /login suelta. Para evitar confusiones, es mejor usar solo /auth/login
	// Si necesitas una ruta /login para otra cosa, puedes descomentarla.
	// r.POST("/login", controllers.OtroLoginHandler)

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "¡API funcionando en http://localhost:9000!"})
	})

	r.GET("/me", controllers.HolaMundo) // Ejemplo de otra ruta

	return r
}
